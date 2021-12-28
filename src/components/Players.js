import { parse } from 'query-string'
import React, { useEffect, useReducer } from 'react'
import { Route, Switch} from 'react-router-dom'
import Sidebar from './Sidebar'
import { getPlayers } from '../api'
import Player from './Player'
import Loading from './Loading'
import { useLocation, useRouteMatch } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const playersReducer = (state, action) => {
    switch(action.type) {
        case 'fetch': {
            return {
                loading: false,
                players: action.players
            }
        } default: throw new Error("This action is not allowed")
    }
}

export default function Players() {
    const [state, dispatch] = useReducer(playersReducer, {
        loading: true,
        players: []
    })

    const location = useLocation()
    const { teamId } = parse(location.search)
    const { url } = useRouteMatch()

    useEffect(() => {
        getPlayers(teamId)
            .then((players) => dispatch({type: 'fetch', players}))
    }, [teamId])

    const { players, loading } = state;
    if (loading) return <Loading/>
    return (
        <div className='container two-column'>
            <Sidebar title="Players" list={players.map(p => p.name)} loading={loading} />
        
            <TransitionGroup component={null} >
                <CSSTransition key={location.key} classNames='fade' timeout={500}>
                    <Switch location={location}>
                        <Route path={`${url}/:playerId`}>
                            <Player players={players} />
                        </Route>  
                        <Route path="*">
                            <div className='sidebar-instruction'>Please select a player</div>
                        </Route> 
                    </Switch>
                </CSSTransition>
            </TransitionGroup> 
        </div> 
    )
}