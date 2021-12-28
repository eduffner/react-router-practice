import React, { useEffect, useReducer } from 'react'
import { Route, Switch } from 'react-router-dom'
import Sidebar from './Sidebar'
import { getTeamsArticles } from '../api'
import Article from './Article'
import Loading from './Loading'
import { useParams } from 'react-router-dom'
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min'

const articlesReducer = (state, action) => {
    switch(action.type) {
        case 'fetch': {
            return {
                loading: false,
                teamsArticles: action.articles
            }
        } default: throw new Error("This action is not allowed")
    }
}

export default function Articles() {
    const [state, dispatch] = useReducer(articlesReducer, {
        loading: true,
        teamsArticles: []
    })
    const { teamId } = useParams()
    const { path } = useRouteMatch()

    useEffect(() => {
        getTeamsArticles(teamId) 
        .then((teamsArticles) => {
            dispatch({
                type: 'fetch',
                articles: teamsArticles
            })
        })
    }, [teamId])

    const { loading, teamsArticles } = state 

    if (loading) return <Loading />
    return (
        <div className='container two-column'>
            <Sidebar
                loading={loading}
                title='Articles'
                list={teamsArticles.map((article) => article.title)}
            />
            <Switch>
                <Route path={`${path}/:articleId`} >
                    <Article />
                </Route>
                <Route path="*">
                    <div className='sidebar-instruction'>Please select an article</div>
                </Route> 
            </Switch>
        </div>
    )

}