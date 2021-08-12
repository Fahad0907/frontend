import React from 'react'
import { Link } from 'react-router-dom'

const SingleArticle = ({post}) => {
    return (
        <div>
            <div class="media content-section">
            <img class="rounded-circle article-img" src={`http://127.0.0.1:8000${post.user.image}/`} />
            <div class="media-body">
                <div class="article-metadata">
                <Link class="mr-2" to="">{post.user.user.username}</Link>
                 <small class="text-muted">{post.date}</small>
            </div>
            <h2><Link class="article-title" to={`details/${post.id}/`} >{post.title}</Link></h2>
            <p class="article-content">{post.description}</p>
                
        
            </div>
            </div>
        </div>
    )
}

export default SingleArticle
