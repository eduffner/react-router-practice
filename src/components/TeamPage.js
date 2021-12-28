import React, { useEffect, useState } from 'react'
import { getTeamNames, getTeamsArticles, getTeam } from '../api'
import slug from 'slug'
import TeamLogo from './TeamLogo'
import { Link, Redirect } from 'react-router-dom'
import Loading from './Loading'
import { useParams, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min'

export default function TeamPage() {
    const initialState = {
        articles: [],
        loading: true,
        teamNames: {},
        team: null
    }
    const [state, setState] = useState(initialState)
    const { teamId } = useParams();


    useEffect(() => {
        Promise.all([
            getTeamNames(),
            getTeamsArticles(teamId),
            getTeam(teamId)
        ]).then(([teamNames, articles, team]) => setState({articles, loading: false, teamNames, team}))
    }, [teamId])

    const { loading, articles, teamNames, team } = state
    const { url } = useRouteMatch();

    if (loading) return <Loading/> 

    if (!teamNames.includes(teamId)) {
        return <Redirect to="/" />
    }

    return (
        <div className='panel'>
            <TeamLogo id={team.id} />
            <h1 className='medium-header'>{team.name}</h1>
            <h4 style={{margin: 5}}>
            <Link
                style={{cursor: 'pointer'}}
                to={{ pathname: '/players', search: `?teamId=${teamId}` }}>
                View Roster
            </Link>
            </h4>
            <h4>Championships</h4>
            <ul className='championships'>
            {team.championships.map((ship) => <li key={ship}>{ship}</li>)}
            </ul>
            <ul className='info-list row' style={{width:'100%'}}>
                <li>Established<div>{team.established}</div></li>
                <li>Manager<div>{team.manager}</div></li>
                <li>Coach<div>{team.coach}</div></li>
                <li>Record<div>{team.wins}-{team.losses}</div></li>
            </ul>
            <h2 className='header'>Articles</h2>
            <ul className='articles'>
            {articles.map((article) => (
                <li key={article.id}>
                <Link to={`${url}/articles/${slug(article.title)}`}>
                    <h4 className='article-title'>{article.title}</h4>
                    <div className='article-date'>{article.date.toLocaleDateString()}</div>
                </Link>
                </li>
            ))}
            </ul>
        </div>
    )
}