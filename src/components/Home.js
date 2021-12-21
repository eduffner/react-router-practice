import React, { Component } from 'react'
import TeamLogo from './TeamLogo'
import { getTeamNames } from '../api'
import { Link } from 'react-router-dom'

export default class Home extends Component {
    state = {
        teamNames: []
    }
    componentDidMount() {
        getTeamNames()
            .then((teamNames) => this.setState(() => ({teamNames}))
        )
    }
    render() {
        return (
            <div className='container'>
                <h1 className='large-header'>Hash History Basketball League</h1>
                <h3 className='header-text-center'>Select a Team:</h3>
                <div className='home-grid'>
                {this.state.teamNames.map((id) => (
                    <Link key={id} to={`/${id}`}>
                        <TeamLogo id={id} width='125px'/>
                    </Link>
                ))}
                </div> 
            </div> 
        )
        }
}