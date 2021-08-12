import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

const Update = () => {
    const {id} = useParams()
    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    const [image, setImage] = useState(null)
    const [image1, setImage1] = useState(null)
    const history = useHistory()
    
    useEffect(()=>{
        const getPost = async () =>{
            await Axios({
                method : 'get',
                url : `http://127.0.0.1:8000/api/${id}/`,
                headers :  {Authorization : `token ${window.localStorage.getItem('token')}`}
            }).then(response=>{
                
                setTitle(response.data?.title)
                setDescription(response.data?.description)
                setImage(response.data?.image)
               
            })
        }
        getPost()
    },[])
    const updatePost =async()=>{
        let formfiled = new FormData()
        formfiled.append('title', title)
        formfiled.append('description', description)
        if(image1 !== null)
        {
            formfiled.append('image', image1)
        }
        await Axios({
            method : 'put',
            url : `http://127.0.0.1:8000/api/${id}/`,
            data : formfiled,
            headers :  {Authorization : `token ${window.localStorage.getItem('token')}`}
        }).then(response=>{
            //console.log(response.data,"XXXXXXXXXXXXXXXXX")
            history.push('/')
        }).catch(_ =>{
            alert('problem')
        })
    }
    return (
        <div className="container">
            <h1>Update</h1>
            <div className="p-3">
                <div class="form-group">
                    <label>Title</label>
                    <input onChange={(e) => { setTitle(e.target.value) }} type="text" class="form-control" value= {title} />
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea onChange={(e) => setDescription(e.target.value)}class="form-control" rows="3" value= {description} ></textarea>
                </div>
                <div class="form-group">
                    <img className="update__image"  src={image}  alt="" srcset="" />
                    <label>Ulpode Image</label>
                    <input  onChange={(e)=> setImage1(e.target.files[0])} type="file" class="form-control" />
                    
                </div>
            </div>
            <div>
              <p onClick={updatePost} className="btn btn-info" >Update</p>
            </div>
        </div>
    )
}

export default Update
