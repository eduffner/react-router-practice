import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

export default function Loading({ text = 'Loading' }) {
    const [ content, setContent ] = useState(text)

    useEffect(() => {
        const interval = setInterval(() => {
            setContent((content) => {
                return content === `${text}...`
                    ? (text)
                    : `${content}.`
            })
        }, 300)

        return  () => clearInterval(interval)
    }, [text])
    
    return (
        <div className='container'>
            <p className='text-center'>
                {content}
            </p>
        </div>
    )
}

Loading.propTypes = {
    text: PropTypes.string,
}