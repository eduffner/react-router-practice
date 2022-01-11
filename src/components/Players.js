import { parse } from 'query-string'
import React, { useEffect, useReducer } from 'react'
import { Route, Routes} from 'react-router-dom'
import Sidebar from './Sidebar'
import { getPlayers } from '../api'
import Player from './Player'
import Loading from './Loading'
import { useLocation } from 'react-router-dom'
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
                    <Routes location={location}>
                        <Route path={":playerId"} element={<Player players={players} />} />
                        <Route path="/" element={<div className='sidebar-instruction'>Please select a player</div>} />
                    </Routes>
                </CSSTransition>
            </TransitionGroup> 
        </div> 
    )
}