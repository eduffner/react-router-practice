import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
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
          <Switch>
              <Route  path="/" exact >
                <Home />
              </Route>
              <Route path="/players">
                <Players />
              </Route> 
              <Route path="/teams">
                <Teams />
              </Route>
              <Route path="/:teamId" exact>
                <TeamPage />
              </Route>
              <Route path="/:teamId/articles">
                <Articles />
              </Route>
              <Route path="*">
                <h1 className="text-center">404</h1>
              </Route>
          </Switch>
        </React.Suspense>
      </div>
    </Router>
      
  )
}