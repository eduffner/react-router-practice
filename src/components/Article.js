import React, { useEffect, useState } from 'react'
import { getArticle } from '../api'
import Loading from './Loading'
import { useParams } from 'react-router-dom'

export default function Article(){
    const [ article, setArticle ] = useState(null)
    const { articleId, teamId }  = useParams()

    useEffect(() => {
        setArticle(null)

        getArticle(teamId, articleId)
        .then((article) => setArticle(article))
    }, [articleId, teamId])

    if (!article) return <Loading />

    return ( 
        <div className='panel'>
            <div className='panel'>
                <article className='article'>
                    <h1 className='header'>{article.title}</h1>
                    <p>{article.body}</p>
                </article>
                </div>
        </div>
        )
}