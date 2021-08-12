import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import Post from './Post'

const Home = () => {
    const [posts, setPosts] = useState(null)
    useEffect(()=>{
        const getPost = async () =>{
            await Axios({
                method : 'get',
                url : 'http://127.0.0.1:8000/api/'
            }).then(response=>{
                console.log(response.data)
                setPosts(response.data)
            })
        }
        getPost()
    },[])

    return (
        <main role="main" className="container">
    <div className="row">
        <div className="col-md-8">
           <h1>Data</h1>
           <Post/>
        </div>
        <div className="col-md-4">
            <div className="content-section">
                <h3>Our Sidebar</h3>
                <p className='text-muted'>You can put any information here you'd like.
                            <ul className="list-group">
                        <li className="list-group-item list-group-item-light">Latest Posts</li>
                        <li className="list-group-item list-group-item-light">Announcements</li>
                        <li className="list-group-item list-group-item-light">Calendars</li>
                        <li className="list-group-item list-group-item-light">etc</li>
                    </ul>
                </p>
            </div>
        </div>
    </div>
</main>
    )
}

export default Home
