import { useEffect, useRef } from 'react'

const ANIMATION_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>I.R.I.S. — Animated Presentation</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  :root{
    --bg:#070604;--panel:#0d0b07;--line:#1e1908;--white:#f0e8cc;
    --grey:#6a5e3a;--cyan:#c9a84c;--green:#4a9e6a;--amber:#e8cd6a;
    --red:#b85040;--purple:#9a7830;--blue:#7a6030;
    --mono:'JetBrains Mono','Courier New',ui-monospace,Consolas,monospace;
    --sans:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
  }
  *{box-sizing:border-box;margin:0;padding:0;}
  html,body{width:100%;height:100%;background:var(--bg);overflow:hidden;font-family:var(--sans);color:var(--white);}
  #stage{position:relative;width:100vw;height:100vh;display:flex;align-items:center;justify-content:center;cursor:pointer;}
  .scanline{position:fixed;left:0;right:0;height:120px;top:-120px;background:linear-gradient(to bottom,transparent,rgba(201,168,76,0.04),transparent);pointer-events:none;z-index:5;animation:sweep 7s linear infinite;}
  @keyframes sweep{0%{top:-120px;}100%{top:100vh;}}
  .grain{position:fixed;inset:0;pointer-events:none;z-index:4;opacity:.02;background-image:repeating-linear-gradient(0deg,#fff 0 1px,transparent 1px 3px);}
  .bracket{position:fixed;width:32px;height:32px;border-color:var(--cyan);opacity:.35;z-index:6;transition:all .4s ease;}
  .bracket.tl{top:18px;left:18px;border-top:1.5px solid;border-left:1.5px solid;}
  .bracket.tr{top:18px;right:18px;border-top:1.5px solid;border-right:1.5px solid;}
  .bracket.bl{bottom:18px;left:18px;border-bottom:1.5px solid;border-left:1.5px solid;}
  .bracket.br{bottom:18px;right:18px;border-bottom:1.5px solid;border-right:1.5px solid;}
  body.locking .bracket{width:24px;height:24px;opacity:.7;}
  #rec{position:fixed;top:20px;left:60px;z-index:7;font-family:var(--mono);font-size:11px;letter-spacing:2px;color:var(--red);display:flex;align-items:center;gap:7px;}
  #rec .dot{width:6px;height:6px;border-radius:50%;background:var(--red);animation:blink 1.4s ease-in-out infinite;}
  #rec.ended .dot{background:var(--grey);animation:none;border-radius:2px;}
  #rec.ended{color:var(--grey);}
  @keyframes blink{0%,100%{opacity:1;}50%{opacity:.2;}}
  #timecode{position:fixed;top:20px;right:60px;z-index:7;font-family:var(--mono);font-size:11px;letter-spacing:2px;color:var(--grey);}
  #scenecount{position:fixed;bottom:20px;right:28px;z-index:7;font-family:var(--mono);font-size:10px;letter-spacing:2px;color:var(--grey);}
  #hint{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);z-index:7;font-family:var(--mono);font-size:10px;letter-spacing:2px;color:var(--grey);transition:opacity .6s ease;opacity:1;}
  #hint.hide{opacity:0;}
  .scene{position:absolute;inset:0;display:none;align-items:center;justify-content:center;flex-direction:column;opacity:0;transform:scale(1.02);transition:opacity .5s ease,transform .6s ease;}
  .scene.active{display:flex;opacity:1;transform:scale(1);}
  .rv{opacity:0;transform:translateY(14px);animation:rv .7s ease forwards;}
  @keyframes rv{to{opacity:1;transform:translateY(0);}}
  @keyframes lock{to{opacity:1;transform:scale(1);}}
  @keyframes slideL{from{opacity:0;transform:translateX(-40px);}to{opacity:1;transform:translateX(0);}}
  @keyframes slideR{from{opacity:0;transform:translateX(40px);}to{opacity:1;transform:translateX(0);}}
  @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(201,168,76,.2);}50%{box-shadow:0 0 0 12px rgba(201,168,76,0);}}
  /* SCENE 0 */
  #s0 .title{font-family:var(--mono);font-weight:700;font-size:min(11vw,110px);letter-spacing:18px;margin-left:18px;background:linear-gradient(180deg,#f0e8cc,#e8cd6a 60%,var(--cyan));-webkit-background-clip:text;background-clip:text;color:transparent;}
  #s0 .rule{width:0;height:1px;background:var(--cyan);margin-top:18px;box-shadow:0 0 6px var(--cyan);animation:draw 1s ease forwards .5s;opacity:.5;}
  @keyframes draw{to{width:min(70vw,620px);}}
  #s0 .sub{font-family:var(--mono);font-size:13px;letter-spacing:5px;color:var(--grey);margin-top:22px;opacity:0;animation:rv .8s ease forwards 1.3s;}
  #s0 .tag{font-family:var(--sans);font-size:12px;color:var(--grey);margin-top:56px;opacity:0;animation:rv .8s ease forwards 2s;}
  /* SCENE 1 */
  #s1 .monitors{display:flex;gap:12px;margin-bottom:52px;}
  #s1 .mon{width:68px;height:46px;background:#0d1016;border:1px solid var(--line);position:relative;overflow:hidden;border-radius:2px;}
  #s1 .mon::after{content:'';position:absolute;inset:0;background:repeating-linear-gradient(100deg,rgba(255,255,255,.015) 0 2px,transparent 2px 6px);animation:staticnoise 3s linear infinite;}
  #s1 .mon.alert{animation:flashred 2.6s ease-in-out .8s;}
  @keyframes staticnoise{0%{transform:translateX(0);}100%{transform:translateX(-30px);}}
  @keyframes flashred{0%,100%{border-color:var(--line);}15%,25%{border-color:var(--red);box-shadow:0 0 8px rgba(198,84,84,.35);}}
  #s1 .line1{font-family:var(--mono);font-size:19px;letter-spacing:2px;opacity:0;animation:rv .7s ease forwards .3s;}
  #s1 .line2{font-family:var(--mono);font-size:19px;letter-spacing:1px;color:var(--grey);margin-top:10px;opacity:0;animation:rv .7s ease forwards 1.2s;}
  #s1 .lens{margin-top:48px;width:58px;height:58px;border-radius:50%;border:1.5px solid var(--cyan);position:relative;opacity:0;animation:rv .6s ease forwards 2.2s,pulse 2s ease-in-out 2.8s infinite;}
  #s1 .lens::before{content:'';position:absolute;inset:12px;border-radius:50%;border:1px solid var(--cyan);opacity:.35;}
  #s1 .q{font-family:var(--mono);font-size:14px;letter-spacing:3px;color:var(--cyan);margin-top:20px;opacity:0;animation:rv .7s ease forwards 2.6s;}
  /* SCENE 2 */
  #s2 .row{display:flex;gap:22px;align-items:center;}
  #s2 .card{width:180px;height:135px;border-radius:6px;background:var(--panel);position:relative;padding:12px;opacity:0;transform:scale(1.1);animation:lock .5s ease forwards;}
  #s2 .card:nth-child(1){animation-delay:.2s;}#s2 .card:nth-child(2){animation-delay:.7s;}#s2 .card:nth-child(3){animation-delay:1.2s;}
  #s2 .cbr{position:absolute;width:12px;height:12px;}
  #s2 .cbr.tl{top:7px;left:7px;border-top:1.5px solid;border-left:1.5px solid;}
  #s2 .cbr.tr{top:7px;right:7px;border-top:1.5px solid;border-right:1.5px solid;}
  #s2 .cbr.bl{bottom:7px;left:7px;border-bottom:1.5px solid;border-left:1.5px solid;}
  #s2 .cbr.br{bottom:7px;right:7px;border-bottom:1.5px solid;border-right:1.5px solid;}
  #s2 .card.face .cbr{border-color:var(--green);}#s2 .card.weapon .cbr{border-color:var(--red);}#s2 .card.violence .cbr{border-color:var(--amber);}
  #s2 .card .glyph{position:absolute;top:36px;left:0;right:0;text-align:center;font-size:30px;}
  #s2 .card .lbl{position:absolute;bottom:16px;left:0;right:0;text-align:center;font-family:var(--mono);font-size:9px;letter-spacing:2px;}
  #s2 .card.face .lbl{color:var(--green);}#s2 .card.weapon .lbl{color:var(--red);}#s2 .card.violence .lbl{color:var(--amber);}
  #s2 .arrow-wrap{display:flex;align-items:center;margin:0 4px;opacity:0;animation:rv .5s ease forwards 1.8s;}
  #s2 .arrow{width:44px;height:1px;background:repeating-linear-gradient(90deg,var(--grey) 0 5px,transparent 5px 9px);}
  #s2 .phone{width:100px;height:140px;border:1.5px solid var(--line);border-radius:14px;opacity:0;animation:rv .6s ease forwards 2.1s;position:relative;}
  #s2 .phone .bubble{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:64px;height:64px;border-radius:50%;background:radial-gradient(circle,rgba(58,170,128,.18),transparent 70%);display:flex;align-items:center;justify-content:center;font-size:24px;}
  #s2 .phone .lbl2{position:absolute;bottom:-26px;left:50%;transform:translateX(-50%);font-family:var(--mono);font-size:9px;letter-spacing:2px;color:var(--green);white-space:nowrap;}
  /* SCENE 3 */
  #s3 .quote{font-family:var(--mono);font-weight:700;font-size:min(4.2vw,30px);letter-spacing:1.5px;text-align:center;max-width:820px;line-height:1.6;opacity:0;animation:rv .8s ease forwards .2s;}
  #s3 .quote .hi{color:var(--cyan);}
  #s3 .iconrow{display:flex;gap:34px;margin-top:52px;}
  #s3 .iconrow .ic{display:flex;flex-direction:column;align-items:center;gap:10px;opacity:0;animation:rv .6s ease forwards;}
  #s3 .iconrow .ic:nth-child(1){animation-delay:1.2s;}#s3 .iconrow .ic:nth-child(2){animation-delay:1.5s;}#s3 .iconrow .ic:nth-child(3){animation-delay:1.8s;}#s3 .iconrow .ic:nth-child(4){animation-delay:2.1s;}
  #s3 .iconrow .glyph3{font-size:24px;width:50px;height:50px;border:1px solid var(--line);border-radius:50%;display:flex;align-items:center;justify-content:center;}
  #s3 .iconrow .cap3{font-family:var(--mono);font-size:9px;letter-spacing:1.5px;color:var(--grey);}
  #s3 .sub3{margin-top:38px;font-family:var(--mono);font-size:11px;letter-spacing:3px;color:var(--grey);opacity:0;animation:rv .7s ease forwards 2.6s;}
  /* SCENE 4 */
  #s4 .wavebox{width:min(80vw,660px);height:150px;position:relative;}
  #s4 .wavebox svg{width:100%;height:100%;overflow:hidden;}
  #s4 .eq4{margin-top:18px;font-family:var(--mono);font-size:18px;letter-spacing:2px;color:var(--white);opacity:0;animation:rv .6s ease forwards 1.4s;}
  #s4 .eq4 .cy{color:var(--cyan);}
  #s4 .spectrum{margin-top:28px;width:min(80vw,660px);height:14px;border-radius:3px;background:linear-gradient(90deg,#7a56b4,#4a6fa5,#3a9e88,#c8943a,#c65454);opacity:0;animation:rv .7s ease forwards 2s;position:relative;}
  #s4 .spectrum .lbl4{position:absolute;top:20px;font-family:var(--mono);font-size:9px;color:var(--grey);}
  #s4 .spectrum .lbl4.l{left:0;}#s4 .spectrum .lbl4.r{right:0;}
  #s4 .caption4{margin-top:44px;font-family:var(--mono);font-size:11px;letter-spacing:2px;color:var(--cyan);opacity:0;animation:rv .7s ease forwards 2.5s;}
  /* SCENE 5 */
  #s5 .peflow{display:flex;align-items:center;gap:20px;}
  #s5 .pe-node{display:flex;flex-direction:column;align-items:center;gap:10px;opacity:0;animation:rv .6s ease forwards;}
  #s5 .pe-node:nth-child(1){animation-delay:.2s;}#s5 .pe-node:nth-child(2){animation-delay:.9s;}#s5 .pe-node:nth-child(3){animation-delay:1.6s;}#s5 .pe-node:nth-child(4){animation-delay:2.3s;}
  #s5 .pe-icon{width:60px;height:60px;border-radius:8px;background:var(--panel);border:1px solid var(--line);display:flex;align-items:center;justify-content:center;font-size:26px;}
  #s5 .pe-lbl{font-family:var(--mono);font-size:9px;letter-spacing:1px;color:var(--grey);text-align:center;line-height:1.4;}
  #s5 .pe-arrow{width:24px;height:1px;background:repeating-linear-gradient(90deg,var(--grey) 0 4px,transparent 4px 7px);align-self:center;margin-top:-28px;opacity:0;animation:rv .5s ease forwards 2.6s;}
  #s5 .counter{font-family:var(--mono);font-size:20px;color:var(--green);}
  #s5 .eq5{margin-top:36px;font-family:var(--mono);font-size:15px;letter-spacing:1px;opacity:0;animation:rv .7s ease forwards 3s;}
  #s5 .eq5 span{color:var(--cyan);}
  #s5 .eq5b{margin-top:8px;font-family:var(--mono);font-size:13px;letter-spacing:1px;color:var(--grey);opacity:0;animation:rv .7s ease forwards 3.4s;}
  /* SCENE 6 */
  #s6 .raybox{width:min(78vw,600px);height:185px;position:relative;opacity:0;animation:rv .6s ease forwards .2s;}
  #s6 .raybox svg{width:100%;height:100%;}
  #s6 .eq6{margin-top:18px;font-family:var(--mono);font-size:16px;letter-spacing:1px;opacity:0;animation:rv .6s ease forwards 1.6s;}
  #s6 .eq6 span{color:var(--cyan);}
  #s6 .eq6b{margin-top:10px;font-family:var(--mono);font-size:12px;color:var(--green);letter-spacing:1px;opacity:0;animation:rv .6s ease forwards 2.1s;}
  /* SCENE 7 */
  #s7 .fibrebox{width:min(78vw,600px);height:135px;position:relative;opacity:0;animation:rv .6s ease forwards .2s;}
  #s7 .fibrebox svg{width:100%;height:100%;}
  #s7 .eq7{margin-top:20px;font-family:var(--mono);font-size:16px;letter-spacing:1px;opacity:0;animation:rv .6s ease forwards 1.6s;}
  #s7 .eq7 span{color:var(--cyan);}
  #s7 .eq7b{margin-top:10px;font-family:var(--mono);font-size:12px;color:var(--green);letter-spacing:1px;opacity:0;animation:rv .6s ease forwards 2.1s;}
  /* SCENE 8 */
  #s8 .pnrow{display:flex;align-items:center;}
  #s8 .pnbox{width:160px;height:115px;background:var(--panel);border:1px solid var(--line);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;opacity:0;animation:rv .6s ease forwards;}
  #s8 .pnbox:nth-child(1){animation-delay:.2s;border-color:var(--purple);}
  #s8 .pnbox:nth-child(2){animation-delay:.8s;width:85px;border-style:dashed;}
  #s8 .pnbox:nth-child(3){animation-delay:1.4s;border-color:var(--blue);}
  #s8 .pnbox .t8{font-family:var(--mono);font-size:11px;letter-spacing:1px;}
  #s8 .pnbox .sub8{font-family:var(--mono);font-size:9px;color:var(--grey);}
  #s8 .binticker{margin-top:32px;font-family:var(--mono);font-size:20px;letter-spacing:6px;color:var(--green);opacity:0;animation:rv .6s ease forwards 2s;}
  #s8 .binticker span{display:inline-block;animation:flick 1.2s steps(2) infinite;}
  #s8 .binticker span:nth-child(2n){animation-delay:.3s;}
  @keyframes flick{50%{opacity:.15;}}
  #s8 .caption8{margin-top:14px;font-family:var(--mono);font-size:10px;letter-spacing:2px;color:var(--grey);opacity:0;animation:rv .6s ease forwards 2.4s;}
  /* SCENE 9 */
  #s9 .stackwrap{display:flex;flex-direction:column-reverse;gap:9px;width:min(78vw,600px);}
  #s9 .bar{display:flex;align-items:center;gap:14px;padding:13px 18px;background:var(--panel);border:1px solid var(--line);border-radius:4px;opacity:0;}
  #s9 .bar.l{animation:slideL .6s ease forwards;}#s9 .bar.r{animation:slideR .6s ease forwards;}
  #s9 .bar:nth-child(1){animation-delay:.2s;}#s9 .bar:nth-child(2){animation-delay:.8s;}#s9 .bar:nth-child(3){animation-delay:1.4s;}#s9 .bar:nth-child(4){animation-delay:2.0s;}
  #s9 .bar:nth-child(5){animation-delay:2.6s;border-color:var(--cyan);box-shadow:0 0 12px rgba(122,171,240,.15);}
  #s9 .bar .g{font-size:18px;width:26px;text-align:center;}
  #s9 .bar .t{font-family:var(--mono);font-size:12px;letter-spacing:2px;color:var(--white);}
  #s9 .bar:nth-child(5) .t{color:var(--cyan);}
  #s9 .caption9{margin-top:28px;font-family:var(--mono);font-size:13px;letter-spacing:3px;color:var(--cyan);opacity:0;animation:rv .7s ease forwards 3.3s;}
  /* SCENE 9B */
  #s9b .demoscreen{width:min(72vw,540px);border:1px solid var(--line);border-radius:6px;overflow:hidden;opacity:0;animation:rv .6s ease forwards .1s;background:#0d1016;}
  #s9b .demohud-top{display:flex;justify-content:space-between;gap:10px;padding:7px 12px;background:#0d1016;border-bottom:1px solid var(--line);font-family:var(--mono);font-size:9px;letter-spacing:1px;color:var(--cyan);}
  #s9b .demofeed{position:relative;height:230px;overflow:hidden;}
  #s9b .demofeed::after{content:'';position:absolute;inset:0;background:repeating-linear-gradient(100deg,rgba(255,255,255,.012) 0 2px,transparent 2px 6px);animation:staticnoise 3s linear infinite;pointer-events:none;}
  #s9b .demo-face,#s9b .demo-weapon{position:absolute;}
  #s9b .demo-face{top:32px;left:60px;width:88px;height:100px;opacity:0;animation:rv .5s ease forwards .8s;}
  #s9b .demo-weapon{top:52px;right:52px;width:76px;height:76px;opacity:0;animation:rv .5s ease forwards 2s;}
  #s9b .dcbr{position:absolute;width:13px;height:13px;border-color:var(--green);}
  #s9b .dcbr.tl{top:0;left:0;border-top:1.5px solid;border-left:1.5px solid;}
  #s9b .dcbr.tr{top:0;right:0;border-top:1.5px solid;border-right:1.5px solid;}
  #s9b .dcbr.bl{bottom:0;left:0;border-bottom:1.5px solid;border-left:1.5px solid;}
  #s9b .dcbr.br{bottom:0;right:0;border-bottom:1.5px solid;border-right:1.5px solid;}
  #s9b .dcbr.red{border-color:var(--red);}
  #s9b .demo-icon{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:36px;}
  #s9b .demo-facelbl{position:absolute;bottom:-19px;left:0;font-family:var(--mono);font-size:9px;color:var(--green);white-space:nowrap;}
  #s9b .demo-weaponlbl{position:absolute;bottom:-19px;left:0;font-family:var(--mono);font-size:9px;color:var(--red);white-space:nowrap;}
  #s9b .demo-alertbar{position:absolute;bottom:12px;left:12px;right:12px;text-align:center;padding:7px;font-family:var(--mono);font-size:9px;letter-spacing:1.5px;color:var(--red);border:1px solid rgba(198,84,84,.45);border-radius:3px;background:rgba(198,84,84,.05);opacity:0;animation:rv .4s ease forwards 3.2s,flashred2 1.6s ease-in-out 3.6s 2;}
  @keyframes flashred2{0%,100%{box-shadow:0 0 0 rgba(198,84,84,0);}50%{box-shadow:0 0 8px rgba(198,84,84,.3);}}
  #s9b .demohud-bottom{padding:6px 12px;border-top:1px solid var(--line);font-family:var(--mono);font-size:9px;letter-spacing:1px;color:var(--grey);}
  #s9b .demo-phone{margin-top:24px;display:flex;align-items:center;gap:11px;opacity:0;animation:rv .5s ease forwards 4.2s;}
  #s9b .demo-bubble{width:40px;height:40px;border-radius:50%;background:radial-gradient(circle,rgba(58,170,128,.22),transparent 70%);display:flex;align-items:center;justify-content:center;font-size:18px;}
  #s9b .demo-phonelbl{font-family:var(--mono);font-size:10px;letter-spacing:2px;color:var(--green);}
  /* SCENE 10 */
  #s10 .brainrow{display:flex;align-items:center;gap:46px;}
  #s10 .braincol{display:flex;flex-direction:column;align-items:center;gap:10px;opacity:0;animation:rv .7s ease forwards .2s;}
  #s10 .brain{font-size:56px;}
  #s10 .braincap{font-family:var(--mono);font-size:10px;color:var(--grey);letter-spacing:2px;}
  #s10 .arrow10{font-size:22px;color:var(--grey);opacity:0;animation:rv .5s ease forwards 1s;}
  #s10 .neuron{display:flex;align-items:center;gap:12px;opacity:0;animation:rv .7s ease forwards 1.4s;}
  #s10 .inputs10{display:flex;flex-direction:column;gap:10px;}
  #s10 .inputs10 .n10{width:13px;height:13px;border-radius:50%;background:var(--panel);border:1px solid var(--grey);}
  #s10 .midtxt{font-family:var(--mono);color:var(--grey);font-size:9.5px;text-align:center;}
  #s10 .sumcircle{width:42px;height:42px;border-radius:50%;border:1.5px solid var(--cyan);display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-size:14px;color:var(--cyan);}
  #s10 .outn{width:18px;height:18px;border-radius:50%;background:rgba(58,170,128,.18);border:1.5px solid var(--green);}
  #s10 .capt10{margin-top:34px;font-family:var(--mono);font-size:11px;letter-spacing:1.5px;color:var(--grey);text-align:center;max-width:580px;opacity:0;animation:rv .7s ease forwards 2.1s;}
  /* SCENE 11 */
  #s11 .row11{display:flex;gap:22px;}
  #s11 .c11{width:190px;height:175px;background:var(--panel);border:1px solid var(--line);border-radius:6px;padding:14px;position:relative;opacity:0;transform:scale(1.1);animation:lock .5s ease forwards;text-align:center;}
  #s11 .c11:nth-child(1){animation-delay:.2s;}#s11 .c11:nth-child(2){animation-delay:.9s;}#s11 .c11:nth-child(3){animation-delay:1.6s;}
  #s11 .c11 .ttl11{font-family:var(--mono);font-size:9.5px;letter-spacing:1.2px;color:var(--grey);margin-top:8px;}
  #s11 .c11 .glyph11{font-size:28px;margin-top:12px;}
  #s11 .c11 .verdict11{margin-top:12px;font-family:var(--mono);font-size:11px;letter-spacing:2px;}
  #s11 .c11.fail .verdict11{color:var(--red);}#s11 .c11.win .verdict11{color:var(--green);}
  #s11 .c11.win{border-color:var(--green);box-shadow:0 0 12px rgba(58,170,128,.18);}
  #s11 .reason11{font-family:var(--mono);font-size:8px;color:var(--grey);margin-top:8px;line-height:1.5;}
  /* SCENE 12 */
  #s12 .netbox{position:relative;width:500px;height:250px;}
  #s12 svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;}
  #s12 .node12{width:16px;height:16px;border-radius:50%;border:1.5px solid var(--grey);background:var(--panel);opacity:.5;position:absolute;}
  #s12 .node12.out12{width:22px;height:22px;border-color:var(--green);background:rgba(58,170,128,.18);box-shadow:0 0 10px rgba(58,170,128,.35);}
  #s12 .stepper12{margin-top:32px;height:20px;position:relative;width:340px;text-align:center;}
  #s12 .stepper12 span{position:absolute;left:0;right:0;font-family:var(--mono);font-size:12px;letter-spacing:1.5px;color:var(--grey);opacity:0;}
  #s12 .stepper12 span:nth-child(1){animation:stepfade 6.4s ease infinite;}
  #s12 .stepper12 span:nth-child(2){animation:stepfade 6.4s ease infinite 1.6s;}
  #s12 .stepper12 span:nth-child(3){animation:stepfade 6.4s ease infinite 3.2s;}
  #s12 .stepper12 span:nth-child(4){animation:stepfade 6.4s ease infinite 4.8s;}
  @keyframes stepfade{0%,3%{opacity:0;}8%,32%{opacity:1;}40%,100%{opacity:0;}}
  #s12 .badge12{margin-top:12px;font-family:var(--mono);font-size:11px;letter-spacing:2px;color:var(--green);opacity:0;animation:rv .5s ease forwards 3.6s;}
  /* SCENE 13 */
  #s13 .row13{display:flex;gap:56px;}
  #s13 .panel13{display:flex;flex-direction:column;align-items:center;gap:12px;opacity:0;animation:rv .6s ease forwards;}
  #s13 .panel13:nth-child(1){animation-delay:.2s;}#s13 .panel13:nth-child(2){animation-delay:.9s;}
  #s13 .facebox13{width:125px;height:125px;border:1.5px solid var(--green);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:48px;position:relative;}
  #s13 .facebox13.reject{border-color:var(--red);}
  #s13 .facebox13::after{content:'✓';position:absolute;top:-13px;right:-13px;background:var(--green);color:#0c0c14;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;}
  #s13 .facebox13.reject::after{content:'✕';background:var(--red);}
  #s13 .skinlbl13{font-family:var(--mono);font-size:10px;letter-spacing:1px;color:var(--grey);text-align:center;}
  #s13 .skinlbl13 b{color:var(--white);}
  #s13 .paramtable13{margin-top:40px;display:flex;gap:24px;opacity:0;animation:rv .6s ease forwards 1.8s;}
  #s13 .ptcell13{font-family:var(--mono);font-size:9.5px;color:var(--grey);text-align:center;}
  #s13 .ptcell13 b{display:block;color:var(--cyan);font-size:13px;margin-bottom:4px;}
  /* SCENE 14 */
  #s14 .grid14{display:grid;grid-template-columns:repeat(3,52px);grid-template-rows:repeat(3,52px);gap:3px;opacity:0;animation:rv .6s ease forwards .2s;}
  #s14 .cell14{background:var(--panel);border:1px solid var(--line);display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-size:12px;}
  #s14 .cell14.center14{border-color:var(--cyan);color:var(--cyan);}
  #s14 .cell14.bright14{color:var(--green);}#s14 .cell14.dark14{color:var(--grey);}
  #s14 .arrowd14{margin:14px 0 10px;font-size:10px;font-family:var(--mono);letter-spacing:1px;color:var(--grey);opacity:0;animation:rv .5s ease forwards 1.3s;}
  #s14 .bincode14{font-family:var(--mono);font-size:17px;letter-spacing:3px;color:var(--green);opacity:0;animation:rv .6s ease forwards 1.6s;}
  #s14 .bincode14 span{color:var(--grey);font-size:11px;letter-spacing:1px;}
  #s14 .histobars14{display:flex;align-items:flex-end;gap:3px;height:50px;margin-top:20px;opacity:0;animation:rv .6s ease forwards 2.1s;}
  #s14 .histobars14 .hb14{width:6px;background:var(--cyan);opacity:.55;}
  #s14 .distmeter14{margin-top:18px;width:260px;height:6px;background:var(--panel);border:1px solid var(--line);position:relative;opacity:0;animation:rv .6s ease forwards 2.5s;}
  #s14 .distmeter14 .needle14{position:absolute;top:-4px;width:2px;height:14px;background:var(--green);left:30%;}
  #s14 .distmeter14 .thresh14{position:absolute;top:-18px;left:52%;font-family:var(--mono);font-size:9px;color:var(--red);}
  #s14 .distmeter14 .threshline14{position:absolute;top:0;bottom:0;left:52%;width:1px;background:rgba(198,84,84,.55);}
  #s14 .resulttag14{margin-top:14px;font-family:var(--mono);font-size:11px;letter-spacing:2px;color:var(--green);opacity:0;animation:rv .6s ease forwards 2.9s;}
  /* SCENE 15 */
  #s15 .yolobox15{width:180px;height:142px;background:var(--panel);border:1.5px solid var(--red);border-radius:6px;position:relative;display:flex;align-items:center;justify-content:center;font-size:48px;opacity:0;animation:rv .6s ease forwards .2s;}
  #s15 .yolobox15 .conf15{position:absolute;bottom:7px;left:10px;font-family:var(--mono);font-size:10px;color:var(--red);}
  #s15 .yolobox15 .boxline{position:absolute;inset:16px;border:1.5px solid rgba(198,84,84,.45);border-radius:3px;}
  #s15 .ghostrow15{display:flex;gap:5px;margin-top:32px;opacity:0;animation:rv .6s ease forwards 1.2s;}
  #s15 .gframe15{width:32px;height:24px;border:1px solid var(--line);border-radius:2px;background:var(--panel);}
  #s15 .gframe15.hit15{border-color:rgba(198,84,84,.55);background:rgba(198,84,84,.1);}
  #s15 .glabel15{margin-top:11px;font-family:var(--mono);font-size:10px;letter-spacing:2px;color:var(--grey);opacity:0;animation:rv .6s ease forwards 1.6s;}
  #s15 .galert15{margin-top:20px;font-family:var(--mono);font-size:13px;letter-spacing:2px;color:var(--red);opacity:0;animation:rv .6s ease forwards 2.2s;}
  /* SCENE 16 */
  #s16 .vwrap16{display:flex;align-items:center;gap:42px;}
  #s16 .stick16{width:120px;height:200px;position:relative;opacity:0;animation:rv .6s ease forwards .2s;}
  #s16 .stick16 svg{width:100%;height:100%;}
  #s16 .rules16{display:flex;flex-direction:column;gap:10px;}
  #s16 .rulecard16{background:var(--panel);border:1px solid var(--line);border-radius:4px;padding:8px 14px;opacity:0;animation:rv .5s ease forwards;width:340px;border-left-width:2px;border-left-style:solid;}
  #s16 .rulecard16:nth-child(1){animation-delay:.6s;border-left-color:var(--red);}
  #s16 .rulecard16:nth-child(2){animation-delay:1.1s;border-left-color:var(--amber);}
  #s16 .rulecard16:nth-child(3){animation-delay:1.6s;border-left-color:var(--purple);}
  #s16 .rulecard16:nth-child(4){animation-delay:2.1s;border-left-color:var(--cyan);}
  #s16 .rulecard16 .rname16{font-family:var(--mono);font-size:10.5px;letter-spacing:1.2px;color:var(--white);}
  #s16 .rulecard16 .rformula16{font-family:var(--mono);font-size:9px;color:var(--grey);margin-top:4px;}
  /* SCENE 17 */
  #s17 .chain17{display:flex;align-items:flex-start;gap:0;position:relative;width:min(82vw,760px);justify-content:space-between;}
  #s17 .node17{display:flex;flex-direction:column;align-items:center;gap:10px;width:116px;opacity:0;animation:rv .6s ease forwards;}
  #s17 .node17:nth-child(1){animation-delay:.2s;}#s17 .node17:nth-child(2){animation-delay:.6s;}#s17 .node17:nth-child(3){animation-delay:1.0s;}#s17 .node17:nth-child(4){animation-delay:1.4s;}#s17 .node17:nth-child(5){animation-delay:1.8s;}
  #s17 .icn17{font-size:26px;}
  #s17 .lbl17{font-family:var(--mono);font-size:9px;letter-spacing:1px;color:var(--grey);text-align:center;line-height:1.5;}
  #s17 .pathline17{position:absolute;left:52px;right:52px;top:17px;height:1px;background:var(--line);z-index:-1;}
  #s17 .dot17{position:absolute;top:12px;width:7px;height:7px;border-radius:50%;background:var(--cyan);box-shadow:0 0 7px var(--cyan);animation:travel17 4.5s linear infinite 2.4s;opacity:0;}
  @keyframes travel17{0%{left:52px;opacity:1;}92%{opacity:1;}100%{left:calc(100% - 62px);opacity:0;}}
  #s17 .flash17{opacity:0;}
  #s17 .node17:last-child .icn17{position:relative;}
  #s17 .node17:last-child .flash17{animation:flashwa17 4.5s ease infinite 2.4s;}
  @keyframes flashwa17{0%,88%{opacity:0;}94%,98%{opacity:1;}100%{opacity:0;}}
  /* SCENE 18 */
  #s18 .archflow{display:flex;flex-direction:column;align-items:center;gap:11px;}
  #s18 .abar{background:var(--panel);border:1px solid var(--line);border-radius:4px;padding:10px 20px;font-family:var(--mono);font-size:10.5px;letter-spacing:1.3px;text-align:center;line-height:1.5;opacity:0;animation:rv .5s ease forwards;}
  #s18 .conn18{width:1px;height:13px;background:var(--line);opacity:0;animation:rv .4s ease forwards;}
  #s18 .abranch18{display:flex;gap:12px;}
  #s18 .abranch18 .abar{width:165px;}
  #s18 .abranch18 .abar.face18{border-color:var(--green);}
  #s18 .abranch18 .abar.weapon18{border-color:var(--red);}
  #s18 .abranch18 .abar.violence18{border-color:var(--amber);}
  /* SCENE 19 */
  #s19 .plist19{display:flex;flex-direction:column;gap:7px;width:min(86vw,700px);}
  #s19 .prow19{display:flex;align-items:center;gap:13px;background:var(--panel);border:1px solid var(--line);border-radius:4px;padding:7px 14px;opacity:0;animation:rv .5s ease forwards;}
  #s19 .prow19:nth-child(1){animation-delay:.10s;}#s19 .prow19:nth-child(2){animation-delay:.32s;}#s19 .prow19:nth-child(3){animation-delay:.54s;}#s19 .prow19:nth-child(4){animation-delay:.76s;}#s19 .prow19:nth-child(5){animation-delay:.98s;}#s19 .prow19:nth-child(6){animation-delay:1.20s;}#s19 .prow19:nth-child(7){animation-delay:1.42s;}#s19 .prow19:nth-child(8){animation-delay:1.64s;}
  #s19 .pnum19{font-family:var(--mono);font-size:10px;color:var(--grey);width:18px;flex-shrink:0;}
  #s19 .ptxt19{font-family:var(--mono);font-size:10.5px;letter-spacing:.3px;flex:1;}
  #s19 .pfix19{font-family:var(--mono);font-size:9px;color:var(--green);flex-shrink:0;}
  /* SCENE 20 */
  #s20 .rlist20{display:flex;flex-direction:column;gap:8px;width:min(84vw,660px);}
  #s20 .rrow20{display:flex;justify-content:space-between;align-items:center;background:var(--panel);border:1px solid var(--line);border-radius:4px;padding:9px 16px;opacity:0;animation:rv .5s ease forwards;}
  #s20 .rrow20:nth-child(1){animation-delay:.15s;}#s20 .rrow20:nth-child(2){animation-delay:.45s;}#s20 .rrow20:nth-child(3){animation-delay:.75s;}#s20 .rrow20:nth-child(4){animation-delay:1.05s;}#s20 .rrow20:nth-child(5){animation-delay:1.35s;}#s20 .rrow20:nth-child(6){animation-delay:1.65s;}
  #s20 .rname20{font-family:var(--mono);font-size:11px;letter-spacing:1px;}
  #s20 .rval20{font-family:var(--mono);font-size:12px;color:var(--green);}
  #s20 .obs20{margin-top:24px;font-family:var(--mono);font-size:10px;color:var(--cyan);text-align:center;max-width:640px;line-height:1.6;opacity:0;animation:rv .6s ease forwards 2.1s;}
  /* SCENE 21 */
  #s21 .clist21{display:flex;flex-direction:column;gap:11px;}
  #s21 .crow21{display:flex;align-items:center;gap:12px;font-family:var(--mono);font-size:13px;letter-spacing:.5px;opacity:0;animation:rv .5s ease forwards;}
  #s21 .crow21:nth-child(1){animation-delay:.2s;}#s21 .crow21:nth-child(2){animation-delay:.65s;}#s21 .crow21:nth-child(3){animation-delay:1.1s;}#s21 .crow21:nth-child(4){animation-delay:1.55s;}#s21 .crow21:nth-child(5){animation-delay:2.0s;}
  #s21 .check21{color:var(--green);}
  #s21 .final21{margin-top:38px;font-family:var(--mono);font-weight:700;font-size:min(3.4vw,21px);letter-spacing:2px;color:var(--cyan);text-align:center;opacity:0;animation:rv .8s ease forwards 2.6s;}
  /* SCENE 22 */
  #s22 .thanks22{font-family:var(--mono);font-weight:700;font-size:min(9vw,82px);letter-spacing:10px;color:var(--white);opacity:0;animation:rv .8s ease forwards .2s;}
  #s22 .names22{font-family:var(--sans);font-size:19px;margin-top:24px;opacity:0;animation:rv .7s ease forwards 1.1s;color:var(--white);}
  #s22 .school22{font-family:var(--mono);font-size:10px;letter-spacing:3px;color:var(--grey);margin-top:13px;opacity:0;animation:rv .7s ease forwards 1.7s;}
</style>
</head>
<body>
  <div class="scanline"></div><div class="grain"></div>
  <div class="bracket tl"></div><div class="bracket tr"></div><div class="bracket bl"></div><div class="bracket br"></div>
  <div id="rec"><span class="dot"></span>REC</div>
  <div id="timecode">00:00:00</div>
  <div id="scenecount">SCENE 1 / 24</div>
  <div id="hint">SPACE / CLICK → NEXT&nbsp;&nbsp;&nbsp;←/→ NAVIGATE&nbsp;&nbsp;&nbsp;R → REPLAY SCENE</div>
  <div id="stage">
    <section class="scene" id="s0">
      <div class="title">I.R.I.S.</div><div class="rule"></div>
      <div class="sub">INTELLIGENT&nbsp; RECOGNITION&nbsp; AND&nbsp; IMAGING&nbsp; SECURITY</div>
      <div class="tag">S.N. KANSAGRA SCHOOL, RAJKOT &nbsp;·&nbsp; PHYSICS PROJECT &nbsp;·&nbsp; 2026–27</div>
    </section>
    <section class="scene" id="s1">
      <div class="monitors"><div class="mon"></div><div class="mon alert"></div><div class="mon"></div><div class="mon"></div><div class="mon"></div></div>
      <div class="line1">MOST CAMERAS ONLY RECORD.</div>
      <div class="line2">THEY DON'T UNDERSTAND WHAT THEY SEE.</div>
      <div class="lens"></div><div class="q">WHAT IF IT COULD THINK?</div>
    </section>
    <section class="scene" id="s2">
      <div class="row">
        <div class="card face"><div class="cbr tl"></div><div class="cbr tr"></div><div class="cbr bl"></div><div class="cbr br"></div><div class="glyph">◎</div><div class="lbl">FACE RECOGNITION</div></div>
        <div class="card weapon"><div class="cbr tl"></div><div class="cbr tr"></div><div class="cbr bl"></div><div class="cbr br"></div><div class="glyph">◆</div><div class="lbl">WEAPON DETECTION</div></div>
        <div class="card violence"><div class="cbr tl"></div><div class="cbr tr"></div><div class="cbr bl"></div><div class="cbr br"></div><div class="glyph">⚡</div><div class="lbl">VIOLENCE DETECTION</div></div>
        <div class="arrow-wrap"><div class="arrow"></div></div>
        <div class="phone"><div class="bubble">💬</div><div class="lbl2">INSTANT WHATSAPP ALERT</div></div>
      </div>
    </section>
    <section class="scene" id="s3">
      <div class="quote">"BEFORE THERE WAS ANY <span class="hi">CODE</span> — THERE WAS <span class="hi">PHYSICS.</span>"</div>
      <div class="iconrow">
        <div class="ic"><div class="glyph3">〜</div><div class="cap3">EM WAVES</div></div>
        <div class="ic"><div class="glyph3">☀</div><div class="cap3">PHOTOELECTRIC</div></div>
        <div class="ic"><div class="glyph3">◯</div><div class="cap3">RAY OPTICS</div></div>
        <div class="ic"><div class="glyph3">▣</div><div class="cap3">SEMICONDUCTOR</div></div>
      </div>
      <div class="sub3">LET'S TRACE EVERY LAYER →</div>
    </section>
    <section class="scene" id="s4">
      <div class="wavebox">
        <svg viewBox="0 0 680 160" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="80" x2="680" y2="80" stroke="#1e2030" stroke-width="1"/>
          <path d="M-120,80 C -80,20 -40,20 0,80 C 40,140 80,140 120,80 C 160,20 200,20 240,80 C 280,140 320,140 360,80 C 400,20 440,20 480,80 C 520,140 560,140 600,80 C 640,20 680,20 720,80 C 760,140 800,140 800,80" fill="none" stroke="#7aabf0" stroke-width="1.8"><animateTransform attributeName="transform" type="translate" from="0 0" to="120 0" dur="2.2s" repeatCount="indefinite"/></path>
          <path d="M-120,80 C -80,140 -40,140 0,80 C 40,20 80,20 120,80 C 160,140 200,140 240,80 C 280,20 320,20 360,80 C 400,140 440,140 480,80 C 520,20 560,20 600,80 C 640,140 680,140 720,80 C 760,20 800,20 800,80" fill="none" stroke="#3aaa80" stroke-width="1.4" opacity="0.55"><animateTransform attributeName="transform" type="translate" from="0 0" to="120 0" dur="2.2s" repeatCount="indefinite"/></path>
        </svg>
      </div>
      <div class="eq4">c &nbsp;=&nbsp; f &nbsp;×&nbsp; <span class="cy">λ</span> &nbsp;=&nbsp; 3×10<sup>8</sup> m/s</div>
      <div class="spectrum"><span class="lbl4 l">400nm VIOLET</span><span class="lbl4 r">700nm RED</span></div>
      <div class="caption4">TRANSVERSE WAVE · E ⊥ B · NO MEDIUM NEEDED</div>
    </section>
    <section class="scene" id="s5">
      <div class="peflow">
        <div class="pe-node"><div class="pe-icon">☀</div><div class="pe-lbl">PHOTONS<br>E = hf</div></div>
        <div class="pe-node"><div class="pe-icon">◯</div><div class="pe-lbl">CONVEX<br>LENS</div></div>
        <div class="pe-node"><div class="pe-icon">▣</div><div class="pe-lbl">CMOS PIXEL<br>(p-n junction)</div></div>
        <div class="pe-node"><div class="pe-icon"><span class="counter">143</span></div><div class="pe-lbl">PIXEL VALUE<br>0 – 255</div></div>
      </div>
      <div class="eq5">E &nbsp;=&nbsp; h × f &nbsp;=&nbsp; h × c / <span>λ</span></div>
      <div class="eq5b">KE &nbsp;=&nbsp; hf &nbsp;−&nbsp; φ &nbsp;&nbsp;(φ = work function)</div>
    </section>
    <section class="scene" id="s6">
      <div class="raybox">
        <svg viewBox="0 0 620 190">
          <line x1="0" y1="95" x2="620" y2="95" stroke="#1e2030" stroke-width="1"/>
          <line x1="150" y1="35" x2="150" y2="150" stroke="#dde1f0" stroke-width="1.5"/><polygon points="150,35 144,47 156,47" fill="#dde1f0"/>
          <ellipse cx="310" cy="95" rx="14" ry="68" fill="none" stroke="#7aabf0" stroke-width="1.5"/>
          <line x1="150" y1="35" x2="470" y2="128" stroke="#5a6080" stroke-width="1" stroke-dasharray="3 4"/>
          <line x1="150" y1="35" x2="470" y2="112" stroke="#5a6080" stroke-width="1" stroke-dasharray="3 4"/>
          <line x1="150" y1="150" x2="470" y2="112" stroke="#5a6080" stroke-width="1" stroke-dasharray="3 4"/>
          <line x1="470" y1="95" x2="470" y2="128" stroke="#3aaa80" stroke-width="1.8"/><polygon points="470,128 464,116 476,116" fill="#3aaa80"/>
          <text x="115" y="24" fill="#5a6080" font-size="9" font-family="JetBrains Mono,Courier New">OBJECT · u = −3000mm</text>
          <text x="432" y="150" fill="#5a6080" font-size="9" font-family="JetBrains Mono,Courier New">IMAGE · v</text>
          <text x="290" y="178" fill="#5a6080" font-size="9" font-family="JetBrains Mono,Courier New">f = 3.6mm</text>
        </svg>
      </div>
      <div class="eq6">1/f &nbsp;=&nbsp; 1/v &nbsp;−&nbsp; 1/u &nbsp;&nbsp;&nbsp; <span>→ v = 3.604mm</span></div>
      <div class="eq6b">THE SENSOR SITS EXACTLY HERE, BEHIND THE LENS</div>
    </section>
    <section class="scene" id="s7">
      <div class="fibrebox">
        <svg viewBox="0 0 620 140">
          <rect x="10" y="30" width="600" height="80" fill="none" stroke="#1e2030" stroke-width="1"/>
          <text x="20" y="22" fill="#5a6080" font-size="9" font-family="JetBrains Mono,Courier New">GLASS FIBRE · n = 1.5</text>
          <polyline points="10,42 88,98 166,42 244,98 322,42 400,98 478,42 556,98 610,58" fill="none" stroke="#7aabf0" stroke-width="1.5"/>
          <circle r="4" fill="#3aaa80"><animateMotion dur="2.6s" repeatCount="indefinite" path="M10,42 L88,98 L166,42 L244,98 L322,42 L400,98 L478,42 L556,98 L610,58"/></circle>
        </svg>
      </div>
      <div class="eq7">n₁ sinθ₁ &nbsp;=&nbsp; n₂ sinθ₂ &nbsp;&nbsp;→&nbsp;&nbsp; <span>θc = 41.8°</span></div>
      <div class="eq7b">ANGLE &gt; 41.8° → LIGHT NEVER ESCAPES → TOTAL INTERNAL REFLECTION</div>
    </section>
    <section class="scene" id="s8">
      <div class="pnrow">
        <div class="pnbox"><div class="t8">P-TYPE</div><div class="sub8">Boron · Holes (+)</div></div>
        <div class="pnbox"><div class="t8" style="color:var(--cyan)">DEPLETION</div><div class="sub8">E-field here</div></div>
        <div class="pnbox"><div class="t8">N-TYPE</div><div class="sub8">Phosphorus · e⁻</div></div>
      </div>
      <div class="binticker"><span>0</span><span>1</span><span>1</span><span>0</span><span>1</span><span>0</span><span>0</span><span>1</span></div>
      <div class="caption8">BILLIONS OF SWITCHES PER SECOND = COMPUTATION</div>
    </section>
    <section class="scene" id="s9">
      <div class="stackwrap">
        <div class="bar l"><span class="g">〜</span><span class="t">ELECTROMAGNETIC WAVES</span></div>
        <div class="bar r"><span class="g">☀</span><span class="t">PHOTOELECTRIC EFFECT</span></div>
        <div class="bar l"><span class="g">◯</span><span class="t">RAY OPTICS — LENS FORMULA</span></div>
        <div class="bar r"><span class="g">▣</span><span class="t">SEMICONDUCTOR — p-n JUNCTION</span></div>
        <div class="bar l"><span class="g">◎</span><span class="t">I.R.I.S.</span></div>
      </div>
      <div class="caption9">PHYSICS IS THE BASE OF COMPUTING</div>
    </section>
    <section class="scene" id="s9b">
      <div class="demoscreen">
        <div class="demohud-top"><span>AI SECURITY SYSTEM</span><span>REC ● LIVE</span><span>FPS: 26 &nbsp; FACES: 1</span></div>
        <div class="demofeed">
          <div class="demo-face"><div class="dcbr tl"></div><div class="dcbr tr"></div><div class="dcbr bl"></div><div class="dcbr br"></div><div class="demo-icon">🙂</div><div class="demo-facelbl">HARIOM — 94%</div></div>
          <div class="demo-weapon"><div class="dcbr tl red"></div><div class="dcbr tr red"></div><div class="dcbr bl red"></div><div class="dcbr br red"></div><div class="demo-icon">🔪</div><div class="demo-weaponlbl">WEAPON — 83%</div></div>
          <div class="demo-alertbar">⚠ VIOLENCE ALERT — PUNCH DETECTED</div>
        </div>
        <div class="demohud-bottom">MONITORING: FACES &nbsp;·&nbsp; WEAPONS &nbsp;·&nbsp; VIOLENCE</div>
      </div>
      <div class="demo-phone"><div class="demo-bubble">💬</div><div class="demo-phonelbl">WHATSAPP ALERT SENT — UNDER 3 SECONDS</div></div>
    </section>
    <section class="scene" id="s10">
      <div class="brainrow">
        <div class="braincol"><div class="brain">🧠</div><div class="braincap">86 BILLION NEURONS</div></div>
        <div class="arrow10">→</div>
        <div class="neuron">
          <div class="inputs10"><div class="n10"></div><div class="n10"></div><div class="n10"></div></div>
          <div class="midtxt">× weights</div><div class="sumcircle">Σ</div><div class="midtxt">threshold</div><div class="outn"></div>
        </div>
      </div>
      <div class="capt10">AN ARTIFICIAL NEURON: MULTIPLY INPUTS BY WEIGHTS, SUM THEM, FIRE IF ABOVE THRESHOLD.</div>
    </section>
    <section class="scene" id="s11">
      <div class="row11">
        <div class="c11 fail"><div class="glyph11">🎨</div><div class="ttl11">ATTEMPT 1 — COLOUR RULES</div><div class="reason11">Walls, glass, aluminium look identical in HSV</div><div class="verdict11">✕ FAILED</div></div>
        <div class="c11 fail"><div class="glyph11">📐</div><div class="ttl11">ATTEMPT 2 — SHAPE RULES</div><div class="reason11">Shelf edges look identical to gun barrels</div><div class="verdict11">✕ FAILED</div></div>
        <div class="c11 win"><div class="glyph11">🧠</div><div class="ttl11">NEURAL NETWORK</div><div class="reason11">Learns thousands of subtle real patterns</div><div class="verdict11">✓ WORKS</div></div>
      </div>
    </section>
    <section class="scene" id="s12">
      <div class="netbox">
        <svg viewBox="0 0 520 260" preserveAspectRatio="none">
          <g stroke="#1e2030" stroke-width="1" fill="none">
            <line x1="30" y1="40" x2="250" y2="30"/><line x1="30" y1="40" x2="250" y2="90"/><line x1="30" y1="40" x2="250" y2="150"/>
            <line x1="30" y1="100" x2="250" y2="30"/><line x1="30" y1="100" x2="250" y2="90"/><line x1="30" y1="100" x2="250" y2="210"/>
            <line x1="30" y1="160" x2="250" y2="90"/><line x1="30" y1="160" x2="250" y2="150"/><line x1="30" y1="160" x2="250" y2="210"/>
            <line x1="30" y1="220" x2="250" y2="150"/><line x1="30" y1="220" x2="250" y2="210"/><line x1="30" y1="220" x2="250" y2="30"/>
          </g>
          <g stroke="#7aabf0" stroke-width="1.3" fill="none" opacity="0">
            <line x1="250" y1="30" x2="490" y2="120"><animate attributeName="opacity" values="0;1;0" dur="3.2s" repeatCount="indefinite" begin="0.2s"/></line>
            <line x1="250" y1="90" x2="490" y2="120"><animate attributeName="opacity" values="0;1;0" dur="3.2s" repeatCount="indefinite" begin="0.6s"/></line>
            <line x1="250" y1="150" x2="490" y2="120"><animate attributeName="opacity" values="0;1;0" dur="3.2s" repeatCount="indefinite" begin="1.0s"/></line>
            <line x1="250" y1="210" x2="490" y2="120"><animate attributeName="opacity" values="0;1;0" dur="3.2s" repeatCount="indefinite" begin="1.4s"/></line>
          </g>
        </svg>
        <div class="node12" style="left:14px;top:22px;"></div><div class="node12" style="left:14px;top:82px;"></div>
        <div class="node12" style="left:14px;top:142px;"></div><div class="node12" style="left:14px;top:202px;"></div>
        <div class="node12" style="left:238px;top:12px;"></div><div class="node12" style="left:238px;top:72px;"></div>
        <div class="node12" style="left:238px;top:132px;"></div><div class="node12" style="left:238px;top:192px;"></div>
        <div class="node12 out12" style="left:476px;top:106px;"></div>
      </div>
      <div class="stepper12"><span>RANDOM WEIGHTS</span><span>THOUSANDS OF EXAMPLES</span><span>ADJUST. REPEAT.</span><span>PATTERN LEARNED</span></div>
      <div class="badge12">✓ TRAINED &nbsp;—&nbsp; WEAPON DETECTED, CONFIDENCE 91%</div>
    </section>
    <section class="scene" id="s13">
      <div class="row13">
        <div class="panel13"><div class="facebox13">🙂</div><div class="skinlbl13">REAL FACE<br>SKIN TONE <b>92%</b></div></div>
        <div class="panel13"><div class="facebox13 reject">🕐</div><div class="skinlbl13">WALL CLOCK<br>SKIN TONE <b>0%</b> → REJECTED</div></div>
      </div>
      <div class="paramtable13">
        <div class="ptcell13"><b>1.05</b>scaleFactor</div><div class="ptcell13"><b>10</b>minNeighbors</div>
        <div class="ptcell13"><b>100px</b>minSize</div><div class="ptcell13"><b>28%</b>SKIN_MIN</div>
      </div>
    </section>
    <section class="scene" id="s14">
      <div class="grid14">
        <div class="cell14 bright14">130</div><div class="cell14 dark14">115</div><div class="cell14 bright14">140</div>
        <div class="cell14 dark14">108</div><div class="cell14 center14">120</div><div class="cell14 dark14">110</div>
        <div class="cell14 bright14">135</div><div class="cell14 dark14">118</div><div class="cell14 bright14">125</div>
      </div>
      <div class="arrowd14">↓ COMPARE EACH NEIGHBOUR TO THE CENTRE PIXEL</div>
      <div class="bincode14">10100110 <span>binary</span> &nbsp;=&nbsp; 166 <span>decimal</span></div>
      <div class="histobars14">
        <div class="hb14" style="height:30%"></div><div class="hb14" style="height:55%"></div><div class="hb14" style="height:20%"></div><div class="hb14" style="height:70%"></div><div class="hb14" style="height:40%"></div><div class="hb14" style="height:85%"></div><div class="hb14" style="height:15%"></div><div class="hb14" style="height:60%"></div><div class="hb14" style="height:35%"></div><div class="hb14" style="height:50%"></div><div class="hb14" style="height:25%"></div><div class="hb14" style="height:65%"></div><div class="hb14" style="height:45%"></div><div class="hb14" style="height:75%"></div><div class="hb14" style="height:10%"></div><div class="hb14" style="height:55%"></div>
      </div>
      <div class="distmeter14"><div class="needle14"></div><div class="threshline14"></div><div class="thresh14">52</div></div>
      <div class="resulttag14">DISTANCE 31 &lt; 52 → IDENTIFIED ✓</div>
    </section>
    <section class="scene" id="s15">
      <div class="yolobox15">🔪<div class="boxline"></div><div class="conf15">CONF 0.83</div></div>
      <div class="ghostrow15">
        <div class="gframe15 hit15"></div><div class="gframe15 hit15"></div><div class="gframe15"></div><div class="gframe15 hit15"></div><div class="gframe15 hit15"></div><div class="gframe15"></div><div class="gframe15 hit15"></div><div class="gframe15"></div>
      </div>
      <div class="glabel15">GHOST BUFFER — LAST 8 FRAMES</div>
      <div class="galert15">5 / 8 CONFIRMED → ALERT TRIGGERED 🚨</div>
    </section>
    <section class="scene" id="s16">
      <div class="vwrap16">
        <div class="stick16">
          <svg viewBox="0 0 130 210">
            <circle cx="65" cy="28" r="13" fill="none" stroke="#dde1f0" stroke-width="1.5"/>
            <line x1="65" y1="41" x2="65" y2="115" stroke="#dde1f0" stroke-width="1.5"/>
            <line x1="65" y1="58" x2="28" y2="86" stroke="#dde1f0" stroke-width="1.5"/><line x1="28" y1="86" x2="14" y2="124" stroke="#c65454" stroke-width="2"/>
            <line x1="65" y1="58" x2="102" y2="86" stroke="#dde1f0" stroke-width="1.5"/><line x1="102" y1="86" x2="116" y2="124" stroke="#dde1f0" stroke-width="1.5"/>
            <line x1="65" y1="115" x2="38" y2="162" stroke="#dde1f0" stroke-width="1.5"/><line x1="38" y1="162" x2="28" y2="200" stroke="#c8943a" stroke-width="2"/>
            <line x1="65" y1="115" x2="92" y2="162" stroke="#dde1f0" stroke-width="1.5"/><line x1="92" y1="162" x2="102" y2="200" stroke="#dde1f0" stroke-width="1.5"/>
            <circle cx="14" cy="124" r="5" fill="#c65454"/><circle cx="28" cy="200" r="5" fill="#c8943a"/><circle cx="65" cy="28" r="3" fill="#7aabf0"/>
          </svg>
        </div>
        <div class="rules16">
          <div class="rulecard16"><div class="rname16">PUNCH / STRIKE — VELOCITY</div><div class="rformula16">v = wrist displacement over 5 frames &nbsp;·&nbsp; alert if v ≥ 0.25</div></div>
          <div class="rulecard16"><div class="rname16">KICK — KNEE ELEVATION</div><div class="rformula16">elevation = hip_y − knee_y &nbsp;·&nbsp; alert if ≥ 0.10</div></div>
          <div class="rulecard16"><div class="rname16">CHOKE — WRIST → NECK DISTANCE</div><div class="rformula16">d = √((wx−nx)² + (wy−ny)²) &nbsp;·&nbsp; alert if d &lt; 0.10</div></div>
          <div class="rulecard16"><div class="rname16">FALL — DOWNWARD HEAD DISPLACEMENT</div><div class="rformula16">drop = nose_y(now) − nose_y(5 frames ago) &nbsp;·&nbsp; alert if &gt; 0.20</div></div>
        </div>
      </div>
    </section>
    <section class="scene" id="s17">
      <div class="chain17">
        <div class="pathline17"></div><div class="dot17"></div>
        <div class="node17"><div class="icn17">💻</div><div class="lbl17">I.R.I.S.<br>LAPTOP</div></div>
        <div class="node17"><div class="icn17">📶</div><div class="lbl17">WIFI ROUTER<br>2.4 GHz</div></div>
        <div class="node17"><div class="icn17">🔗</div><div class="lbl17">FIBRE OPTIC<br>TOTAL INTERNAL REFLECTION</div></div>
        <div class="node17"><div class="icn17">☁</div><div class="lbl17">TWILIO SERVER<br>4G / 5G OUT</div></div>
        <div class="node17"><div class="icn17">📱<span class="flash17">💬</span></div><div class="lbl17">WHATSAPP<br>ALERT RECEIVED</div></div>
      </div>
    </section>
    <section class="scene" id="s18">
      <div class="archflow">
        <div class="abar" style="animation-delay:.2s;">CCTV CAMERA &nbsp;·&nbsp; 1280×720 @ 30 FPS</div>
        <div class="conn18" style="animation-delay:.5s;"></div>
        <div class="abar" style="animation-delay:.6s;">PREPROCESSING &nbsp;·&nbsp; GRAYSCALE + CLAHE</div>
        <div class="conn18" style="animation-delay:.9s;"></div>
        <div class="abranch18">
          <div class="abar face18" style="animation-delay:1.0s;">FACE MODULE<br>Haar + LBPH</div>
          <div class="abar weapon18" style="animation-delay:1.2s;">WEAPON MODULE<br>YOLOv8 + Ghost Buffer</div>
          <div class="abar violence18" style="animation-delay:1.4s;">VIOLENCE MODULE<br>MediaPipe + Kinematics</div>
        </div>
        <div class="conn18" style="animation-delay:1.7s;"></div>
        <div class="abar" style="animation-delay:1.8s;border-color:var(--cyan);color:var(--cyan);">ALERT SYSTEM &nbsp;·&nbsp; Twilio WhatsApp + Screenshot</div>
        <div class="conn18" style="animation-delay:2.1s;"></div>
        <div class="abar" style="animation-delay:2.2s;color:var(--grey);">OPERATOR DISPLAY</div>
      </div>
    </section>
    <section class="scene" id="s19">
      <div class="plist19">
        <div class="prow19"><div class="pnum19">01</div><div class="ptxt19">cv2.face missing — LBPH not in base OpenCV</div><div class="pfix19">✓ opencv-contrib-python</div></div>
        <div class="prow19"><div class="pnum19">02</div><div class="ptxt19">HSV colour rule flagged every wall as a weapon</div><div class="pfix19">✓ switched to YOLOv8</div></div>
        <div class="prow19"><div class="pnum19">03</div><div class="ptxt19">Wall clock detected as a human face</div><div class="pfix19">✓ skin-tone + aspect filter</div></div>
        <div class="prow19"><div class="pnum19">04</div><div class="ptxt19">Camera froze 80ms during recognition</div><div class="pfix19">✓ async background thread</div></div>
        <div class="prow19"><div class="pnum19">05</div><div class="ptxt19">Violence detection silently disabled</div><div class="pfix19">✓ downloaded pose model file</div></div>
        <div class="prow19"><div class="pnum19">06</div><div class="ptxt19">opencv-python vs opencv-contrib conflict</div><div class="pfix19">✓ removed both, reinstalled one</div></div>
        <div class="prow19"><div class="pnum19">07</div><div class="ptxt19">Punch / kick thresholds too strict</div><div class="pfix19">✓ recalibrated by testing</div></div>
        <div class="prow19"><div class="pnum19">08</div><div class="ptxt19">face_labels.json corrupted — zero bytes</div><div class="pfix19">✓ defensive load + validation</div></div>
      </div>
    </section>
    <section class="scene" id="s20">
      <div class="rlist20">
        <div class="rrow20"><div class="rname20">FACE RECOGNITION ACCURACY</div><div class="rval20">~90%</div></div>
        <div class="rrow20"><div class="rname20">WEAPON DETECTION SPEED</div><div class="rval20">&lt; 1 second</div></div>
        <div class="rrow20"><div class="rname20">PUNCH / FALL DETECTION</div><div class="rval20">CONFIRMED ✓</div></div>
        <div class="rrow20"><div class="rname20">SYSTEM PERFORMANCE</div><div class="rval20">24–28 FPS</div></div>
        <div class="rrow20"><div class="rname20">WHATSAPP ALERT DELIVERY</div><div class="rval20">&lt; 3 seconds</div></div>
        <div class="rrow20"><div class="rname20">CLOCK FALSE-POSITIVE</div><div class="rval20">FIXED ✓</div></div>
      </div>
      <div class="obs20">50% LESS ROOM LIGHT → RECOGNITION ACCURACY DROPPED 90% → 60%<br>FEWER PHOTONS · WEAKER SIGNAL · THE PHOTOELECTRIC EFFECT, CONFIRMED BY TESTING</div>
    </section>
    <section class="scene" id="s21">
      <div class="clist21">
        <div class="crow21"><span class="check21">✓</span> PHOTOELECTRIC EFFECT — light becomes numbers</div>
        <div class="crow21"><span class="check21">✓</span> LENS FORMULA — the scene focuses sharply</div>
        <div class="crow21"><span class="check21">✓</span> TOTAL INTERNAL REFLECTION — the alert crosses the internet</div>
        <div class="crow21"><span class="check21">✓</span> P-N JUNCTION — every pixel and every transistor works</div>
        <div class="crow21"><span class="check21">✓</span> ELECTROMAGNETIC WAVES — carry the message to a phone</div>
      </div>
      <div class="final21">THE BASE OF ALL COMPUTING IS PHYSICS.</div>
    </section>
    <section class="scene" id="s22">
      <div class="thanks22">THANK YOU</div>
      <div class="names22">Hariom Bhimani &nbsp;&amp;&nbsp; Pratham Joshi</div>
      <div class="school22">CLASS 12-A &nbsp;·&nbsp; S.N. KANSAGRA SCHOOL, RAJKOT</div>
    </section>
  </div>
<script>
  const scenes=Array.from(document.querySelectorAll('.scene'));let i=0,startTime=Date.now();
  function show(idx){scenes.forEach(s=>s.classList.remove('active'));i=Math.max(0,Math.min(scenes.length-1,idx));const el=scenes[i];void el.offsetWidth;el.classList.add('active');replayAnimations(el);document.getElementById('scenecount').textContent='SCENE '+(i+1)+' / '+scenes.length;if(i===scenes.length-1){document.getElementById('rec').classList.add('ended');document.getElementById('rec').innerHTML='<span class="dot"></span>END';}else{document.getElementById('rec').classList.remove('ended');document.getElementById('rec').innerHTML='<span class="dot"></span>REC';}document.body.classList.add('locking');setTimeout(()=>document.body.classList.remove('locking'),350);}
  function replayAnimations(root){root.querySelectorAll('*').forEach(node=>{const a=getComputedStyle(node).animationName;if(a&&a!=='none'){node.style.animation='none';void node.offsetWidth;node.style.animation='';}});}
  function next(){if(i<scenes.length-1)show(i+1);}function prev(){if(i>0)show(i-1);}
  document.getElementById('stage').addEventListener('click',next);
  document.addEventListener('keydown',e=>{if(e.code==='Space'||e.code==='ArrowRight'||e.code==='Enter'){e.preventDefault();next();}else if(e.code==='ArrowLeft'){e.preventDefault();prev();}else if(e.key.toLowerCase()==='r')show(i);});
  setInterval(()=>{const s=Math.floor((Date.now()-startTime)/1000);document.getElementById('timecode').textContent=String(Math.floor(s/3600)).padStart(2,'0')+':'+String(Math.floor((s%3600)/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');},1000);
  setTimeout(()=>document.getElementById('hint').classList.add('hide'),5000);
  show(0);
<\/script>
</body></html>`

export default function Animation() {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: 56, paddingBottom: 80 }}>
      {/* Controls hint bar */}
      <div style={{ position: 'sticky', top: 56, zIndex: 20, padding: '8px 20px', background: 'rgba(18,18,28,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--danger)', display: 'inline-block', animation: 'pulse 1.4s infinite' }} />
          <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: 'var(--text-2)', letterSpacing: '0.08em' }}>PHYSICS PRESENTATION · 24 SCENES</span>
        </div>
        <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 10, color: 'rgba(117,120,152,0.5)', letterSpacing: '0.12em' }}>SPACE / CLICK = NEXT &nbsp;·&nbsp; ← / → = NAVIGATE &nbsp;·&nbsp; R = REPLAY</span>
      </div>

      {/* Iframe containing the full animation */}
      <iframe
        ref={iframeRef}
        srcDoc={ANIMATION_HTML}
        style={{
          width: '100%',
          height: 'calc(100vh - 56px - 80px - 40px)',
          minHeight: 520,
          border: 'none',
          display: 'block',
        }}
        title="I.R.I.S Animated Physics Presentation"
        sandbox="allow-scripts"
      />
    </div>
  )
}
