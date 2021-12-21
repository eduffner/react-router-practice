import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import { getTeamNames } from '../api'
import Loading from './Loading'
import Sidebar from './Sidebar'
import Team from './Team'
import TeamLogo from './TeamLogo'

export default class Teams extends Component {
    state = {
        teams: [],
        loading: true
    }
    fetchTeams = () => {
        getTeamNames()
            .then((teams) => this.setState(() => ({teams, loading: false})))
    }

    componentDidMount() {
        this.fetchTeams(); 
    }

    render() {
        const {teams, loading} = this.state;
        const {match, location} = this.props;
        return (
            <div className='container two-column'>
                <Sidebar title="Teams" list={teams} loading={loading} {...this.props} />
                {!loading && location.pathname === '/teams' && <div className='sidebar-instruction'>Please select a team</div> }
                <Route path={`${match.url}/:teamId`} render={({ match }) => (
                    <div className='panel'>
                        <Team id={match.params.teamId} className='panel'>
                            {(team) => team === null
                                ? <Loading/>
                                : <div style={{width: '100%'}}>
                                    <TeamLogo id={team.id} className='center'/>
                                    <h1 className='medium-header'>{team.name}</h1>
                                    <ul className='info-list row'>
                                        <li>Established<div>{team.established}</div></li>
                                        <li>Manager<div>{team.manager}</div></li>
                                        <li>Coach<div>{team.coach}</div></li>
                                    </ul>
                                    <Link className='center btn-main' to={`/${match.params.teamId}`}>
                                        {team.name} Team Page</Link>
                                </div>
                            }
                        </Team>
                    </div>
                )} />
            </div> 
        )
    }
}