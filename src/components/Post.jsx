import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SingleArticle from './SingleArticle'

const Post = () => {
    const [posts, setPosts] = useState(null)
    useEffect(()=>{
        const getPost = async () =>{
            await axios({
                method : 'get',
                url : 'http://127.0.0.1:8000/api/',
                headers :  {Authorization : `token ${window.localStorage.getItem('token')}`}
            }).then(response=>{
                console.log(response.data)
                setPosts(response.data)
            })
        }
        getPost()
    },[])


    return (
        <div >
           {
               posts!== null ? (
                   <>
                        {
                            posts.map((data,i)=>(
                                <SingleArticle key={i} post={data}/>
                            ))
                        }

                   </>
               ) :

               (<h1>No data</h1>)
           }
        </div>
    )
}

export default Post
