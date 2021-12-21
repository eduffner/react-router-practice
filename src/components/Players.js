import { parse } from 'query-string'
import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import slug from 'slug'
import { getPlayers } from '../api'
import Loading from './Loading'
import Sidebar from './Sidebar'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

export default class Players extends Component {
    state = {
        players: [],
        loading: true
    }
    fetchPlayers = (teamId) => {
        getPlayers(teamId)
            .then((players) => this.setState(() => ({players, loading: false})))
    }

    componentDidMount() {
        const { location } = this.props
        if (location.search) {
            this.fetchPlayers(parse (location.search).teamId)
        } else 
            this.fetchPlayers()
        
    }
    render() {
        const {players, loading} = this.state;
        const {location, match} = this.props;
        return (
            <div className='container two-column'>
                <Sidebar title="Players" list={players.map(p => p.name)} loading={loading} {...this.props} />
                {!loading && location.pathname === '/players' && <div className='sidebar-instruction'>Please select a player</div> }
                <Route path={`${match.url}/:playerId`} render={({match}) => {
                    if (loading) return <Loading/>

                    const {name, position, teamId, number, avatar, apg, ppg, rpg, spg} = players.find((p) => slug(p.name) === match.params.playerId)

                    return (
                        <TransitionGroup className='panel' >
                            <CSSTransition key={location.key} classNames='fade' timeout={250}>
                                <div className='panel'>
                                    <img className='avatar' src={`${avatar}`} alt={`${name}'s avatar`}/>
                                    <h1 className='medium-header'>{name}</h1>
                                    <h3 className='header'>#{number}</h3>
                                    <div className='row'>
                                        <ul className='info-list' style={{marginRight: 80}}>
                                            <li>
                                                Team <div>
                                                    <Link to={`/${teamId}`} style={{color: '#68809a'}}>{teamId[0].toUpperCase() + teamId.slice(1)}</Link>
                                                </div>
                                            </li>
                                            <li>Position
                                                <div>{position}</div>
                                            </li>
                                            <li>PPG
                                                <div>{ppg}</div>
                                            </li>
                                        </ul>
                                        <ul className='info-list'>
                                            <li>APG
                                                <div>{apg}</div>
                                            </li>
                                            <li>SPG
                                                <div>{spg}</div>
                                            </li>
                                            <li>RPG
                                                <div>{rpg}</div>
                                            </li>
                                            </ul>
                                    </div> 
                                </div>
                            </CSSTransition>
                        </TransitionGroup>
                    )
                }}/>
            </div> 
            
        )
        }
}