import React, { useEffect, useReducer } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min'
import { getTeamNames } from '../api'
import Sidebar from './Sidebar'
import Team from './Team'

const teamsReducer = (state, action) => {
    switch(action.type) {
        case 'fetch': {
            return {
                loading: false,
                teams: action.teams
            }
        } default: throw new Error("This action is not allowed")
    }
}

export default function Teams() {
    const [state, dispatch] = useReducer(teamsReducer, {
        loading: true,
        teams: []
    })

    useEffect(() => {
        getTeamNames()
            .then((teams) => dispatch({type: 'fetch', teams}))
    }, [])

    const { teams, loading } = state;
    const { url } = useRouteMatch();

    return (
        <div className='container two-column'>
            <Sidebar title="Teams" list={teams} loading={loading} />
            <Switch>
                <Route path={`${url}/:teamId`} >
                    <Team />
                </Route>
                <Route path="*">
                    <div className='sidebar-instruction'>Please select a team</div>
                </Route>
            </Switch>
        </div> 
    )
    
}