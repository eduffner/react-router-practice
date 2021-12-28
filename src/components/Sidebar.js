import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min'
import slug from 'slug'
import Loading from './Loading'
import PropTypes from 'prop-types'

function CustomLink ({ to, children }) {
    const match = useRouteMatch(to.pathname)

    return (
        <li style={{fontWeight: match ? 900 : 'normal'}}>
            <Link to={to}>{children}</Link>
        </li>
    )
}

export default function Sidebar({title, list, loading}) {
    const location = useLocation()
    const { url }= useRouteMatch()

    if (loading)
        return <Loading /> 
    return (
        <div>
            <h3 className='header'>{title}</h3>
            <ul className='sidebar-list'>
                {list.map((item) => (
                    <CustomLink 
                        key={item}
                        to={{
                            pathname: `${url}/${slug(item)}`,
                            search: location.search
                        }}  
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