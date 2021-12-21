import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Sidebar from './Sidebar'
import { getTeamsArticles } from '../api'
import Article from './Article'
import Loading from './Loading'

export default class Articles extends Component {
    state = {
        teamsArticles: [],
        loading: true
    }
    componentDidMount() {
        getTeamsArticles(this.props.match.params.teamId) 
        .then((teamsArticles) => {
            this.setState(() => ({
            loading: false,
            teamsArticles: teamsArticles.map((article) => article.title)
            }))
        })
    }
    render() {
        const { loading, teamsArticles } = this.state
        const { location } = this.props
        const { params, url } = this.props.match
        const  { teamId } = params

        console.log(location.pathname)
        console.log(`${teamId}/articles`)

        return loading === true
        ? <Loading/>
        : <div className='container two-column'>
            <Sidebar
                loading={loading}
                title='Articles'
                list={teamsArticles}
                {...this.props}
            />
            {!loading && location.pathname === `/${teamId}/articles` && <div className='sidebar-instruction'>Please select an article</div>}

            <Route path={`${url}/:articleId`} render={({ match }) => (
                <Article articleId={match.params.articleId} teamId={teamId}>
                    {(article) => !article ? <Loading/> : (
                        <div className='panel'>
                        <article className='article' key={article.id}>
                            <h1 className='header'>{article.title}</h1>
                            <p>{article.body}</p>
                        </article>
                        </div>
                    )}
                </Article>
            )} />
            </div>
    }
}