import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation, useMatch } from 'react-router-dom'
import slug from 'slug'
import Loading from './Loading'
import PropTypes from 'prop-types'

function CustomLink ({ to, children }) {
    const location = useLocation()
    const playerId = location.pathname.split('/')[2]
    const match = playerId === to

    return (
        <li style={{fontWeight: match ? 900 : 'normal'}}>
            <Link 
                to={{
                    pathname: to,
                    search: location.search
                }}>
                {children}
            </Link>
        </li>
    )
}

export default function Sidebar({title, list, loading}) {
    if (loading)
        return <Loading /> 
    return (
        <div>
            <h3 className='header'>{title}</h3>
            <ul className='sidebar-list'>
                {list.map((item) => console.log(slug(item)) || (
                    <CustomLink 
                        key={item}
                        to={slug(item)}  
                    >
                        {item.toUpperCase()}
                    </CustomLink>
                ))}
            </ul>
        </div>
    )
}

Sidebar.propTypes = {
    title: PropTypes.string,
    list: PropTypes.array,
    loading: PropTypes.bool.isRequired
}