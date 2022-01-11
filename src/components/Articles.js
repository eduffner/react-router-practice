import React, { useEffect, useReducer } from 'react'
import { Route, Routes } from 'react-router-dom'
import Sidebar from './Sidebar'
import { getTeamsArticles } from '../api'
import Article from './Article'
import Loading from './Loading'
import { useParams } from 'react-router-dom'

const articlesReducer = (state, action) => {
    switch (action.type) {
        case 'fetch': {
            return {
                loading: false,
                teamsArticles: action.articles
            }
        } default:    }
}

export default function Articles() {
    const [state, dispatch] = useReducer(articlesReducer, {
        loading: true,
        teamsArticles: []
    })
    const { teamId } = useParams()

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
            <Routes>
                <Route path=":articleId" element={<Article />} />
                <Route path="/" element={<div className='sidebar-instruction'>Please select an article</div>} />
            </Routes>
        </div>
    )

}