import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useStateValue } from './StateProvider'
import { Link } from 'react-router-dom'

const PostDetails = () => {
    const history = useHistory()
    const[{profile}, dispatch] =useStateValue()
    const {id} = useParams()
    const [posts, setPosts] = useState(null)
    useEffect(()=>{
        const getPost = async () =>{
            await Axios({
                method : 'get',
                url : `http://127.0.0.1:8000/api/${id}/`,
                headers :  {Authorization : `token ${window.localStorage.getItem('token')}`}
            }).then(response=>{
                
                setPosts(response.data)
                //console.log(response.data)
            })
        }
        getPost()
    },[])
    const deletePost = async()=>{
        await Axios({
            method : 'delete',
            url : `http://127.0.0.1:8000/api/${id}/`,
            headers :  {Authorization : `token ${window.localStorage.getItem('token')}`}
        }).then(response=>{
            history.push('/')
        }).catch(_ =>{
            alert('something is worng')
        })
    }
    return (
        <div className="container">
           
    <article class="media content-section">
        <img class="rounded-circle article-img" src={`http://127.0.0.1:8000${posts?.user?.image}/`}/>
        <div class="media-body">
            <div class="article-metadata">
                <a class="mr-2" href="">{posts?.user?.user?.username}</a>
                <small class="text-muted">{posts?.date}</small>
                {
                    posts?.user?.id === profile?.id && (
                        <div>
                        <Link class="btn btn-secondary btn-sm mt-1 mb-1"  to={`/details/${posts?.id}/update/`}>Update</Link>
                        <Link class="btn btn-danger btn-sm mt-1 mb-1" onClick={deletePost} >Delete</Link>
                    </div>
                    )
                }

            </div>
            <h2 class="article-title">{posts?.title}</h2>
            <img className="article_content_image" src="" alt="" />
            <p class="article-content">{posts?.description}</p>
        </div>
    </article>

</div>
    )
}

export default PostDetails
