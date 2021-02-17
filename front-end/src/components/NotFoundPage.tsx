import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage: React.FC = () => {
    return (
        <div>
            <h1>Whoops!, we can’t find the page you were looking for.</h1>
            <Link to="/">Return home and try again</Link>
        </div>
    )

}

export default NotFoundPage