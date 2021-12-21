import React, { Component } from 'react'
import { getTeamNames, getTeamsArticles } from '../api'
import Team from './Team'
import slug from 'slug'
import TeamLogo from './TeamLogo'
import { Link, Redirect } from 'react-router-dom'
import Loading from './Loading'

export default class TeamPage extends Component {
    state = {
        articles: [],
        loading: true,
        teamNames: {}
    }

    componentDidMount() {
        Promise.all([
            getTeamNames(),
            getTeamsArticles(this.props.match.params.teamId)
        ]).then(([teamNames, articles]) => this.setState(() => ({articles, loading: false, teamNames})))
    }

    render() {
        const { match } = this.props
        const { loading, articles, teamNames } = this.state
        const { teamId } = match.params

        if (!loading && !teamNames.includes(teamId)) {
            return <Redirect to="/" />
        }
        return (
            <div> 
                <Team id={teamId}>
                    {(team) => (team) === null
                    ? <Loading/> 
                    : <div className='panel'>
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
                                <Link to={`${match.url}/articles/${slug(article.title)}`}>
                                    <h4 className='article-title'>{article.title}</h4>
                                    <div className='article-date'>{article.date.toLocaleDateString()}</div>
                                </Link>
                                </li>
                            ))}
                            </ul>
                        </div>
                    }
                </Team>
            </div>
        )
    }
}