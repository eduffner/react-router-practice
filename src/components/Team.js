import React, { useEffect, useReducer } from 'react'
import { getTeam } from '../api'
import { Link, useParams } from 'react-router-dom'
import Loading from './Loading'
import TeamLogo from './TeamLogo'

const teamReducer = (state, action) => {
    switch(action.type) {
        case 'fetch': {
            return {
                loading: false,
                team: action.team
            }
        } default: throw new Error("This action is not allowed")
    }
}
export default function Team() {
    const [state, dispatch] = useReducer(teamReducer, {
        loading: true,
        team: []
    })

    const { teamId } = useParams()

    useEffect(() => {
        getTeam(teamId).then((team) => dispatch({type: 'fetch', team}))
    }, [teamId])


    const { team, loading } = state

    if (loading) return <Loading/>

    return (
        <div className='panel'>
            <div style={{width: '100%'}}>
                <TeamLogo id={team.id} className='center'/>
                <h1 className='medium-header'>{team.name}</h1>
                <ul className='info-list row'>
                    <li>Established<div>{team.established}</div></li>
                    <li>Manager<div>{team.manager}</div></li>
                    <li>Coach<div>{team.coach}</div></li>
                </ul>
                <Link className='center btn-main' to={`/${teamId}`}>
                    {team.name} Team Page</Link>
            </div>
        </div>
    )
}
