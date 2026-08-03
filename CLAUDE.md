import { createBrowserRouter } from 'react-router'
import Root from './Root'
import Home from './pages/Home'
import About from './pages/About'
import HowItWorks from './pages/HowItWorks'
import Team from './pages/Team'
import Report from './pages/Report'
import Animation from './pages/Animation'
import Contact from './pages/Contact'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About },
      { path: 'how-it-works', Component: HowItWorks },
      { path: 'team', Component: Team },
      { path: 'report', Component: Report },
      { path: 'animation', Component: Animation },
      { path: 'contact', Component: Contact },
    ],
  },
])
