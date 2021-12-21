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
            <Route  path="/" exact component={Home}/>
            <Route path="/players" component={Players}/>
            <Route path="/teams" component={Teams}/>
            <Route path="/:teamId" exact component={TeamPage} />
            <Route path="/:teamId/:articleId" component={Articles} />
          <Route render={() => <h1 className="text-center">404</h1>} />
        </Switch>
        </React.Suspense>
      </div>
    </Router>
      
  )
}