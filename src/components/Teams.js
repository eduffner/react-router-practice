import React, { useEffect, useReducer } from 'react'
import { Route, Routes } from 'react-router-dom'
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

    return (
        <div className='container two-column'>
            <Sidebar title="Teams" list={teams} loading={loading} />
            <Routes>
                <Route path={":teamId"} element={<Team />} />
                <Route path="/" element={<div className='sidebar-instruction'>Please select a team</div>} />
            </Routes>
        </div> 
    )
    
}