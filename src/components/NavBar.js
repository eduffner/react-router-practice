import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NavBar extends Component {

    render() {
        return (
            <div className='container navbar'>
                <Link to='/'>Home</Link>
                <nav className='nav-links'>
                    <Link to="/teams">Teams</Link>
                    <Link to="/players">Players</Link>
                </nav>
            </div>
        )
    }
}