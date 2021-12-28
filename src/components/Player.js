import PropTypes from 'prop-types'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import slug from 'slug'

export default function Player({ players}){
    const { playerId }  = useParams()

    const player = players.find(({name}) => slug(name) === playerId)
    const { name, position, teamId, number, avatar, apg, ppg, rpg, spg } = player

    return ( 
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
            
    )
}

Player.propTypes = {
    players: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        position: PropTypes.string,
        teamId: PropTypes.string,
        number: PropTypes.number,
        avatar: PropTypes.string,
        apg: PropTypes.number,
        ppg: PropTypes.number,
        rpg: PropTypes.number,
        spg: PropTypes.number,
    }))
}