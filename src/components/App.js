import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Loading from './Loading'
import NavBar from './NavBar'

const Home = React.lazy(() => import('./Home'))
const Players = React.lazy(() => import('./Players'))
const Teams = React.lazy(() => import('./Teams'))
const TeamPage = React.lazy(() => import('./TeamPage'))
const Articles = React.lazy(() => import('./Articles'))

export default function App() {

  return (
    <Router>
      <div>
        <NavBar/>
        <React.Suspense fallback={<Loading />}>
          <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/players/*" element={<Players />} />
              <Route path="/teams/*" element={<Teams />} />
              <Route path="/:teamId" exact element={<TeamPage />} />
              <Route path="/:teamId/articles/*" element={<Articles />} />
              <Route path="*" element={<h1 className="text-center">404</h1>} />
          </Routes>
        </React.Suspense>
      </div>
    </Router>
      
  )
}