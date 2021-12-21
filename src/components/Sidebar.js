import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import slug from 'slug'
import Loading from './Loading'

function CustomLink ({children, to}) {
    return (
        <Route path={to.pathname} children={(({match}) => (
            <li style={{listStyleType: 'none', fontWeight: match ? 'bold' : 'normal'} }>
                <Link to={to}>{children}</Link>
            </li>
        ))} />
    )
}

export default function Sidebar({title, list, loading, location, match}) {
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
                            pathname: `${match.url}/${slug(item)}`,
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