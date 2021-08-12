import React, { useState } from 'react'
import Axios from 'axios'
const NewPost = () => {
    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    const [image, setImage] = useState(null)
    
    const createnewpost= async()=>{
        let formField = new FormData()
        formField.append('title', title)
        formField.append('description', description)
        if(image!==null)
        {
            formField.append('image', image)
        }
        
        await Axios({
            method : 'post',
            url : 'http://127.0.0.1:8000/api/',
            headers :  {Authorization : `token ${window.localStorage.getItem('token')}`},
            data : formField,
            
        }).then(response=>{
            console.log(response.data)
            
        }).catch(_=>{
            alert('Error')
        })
    }
        
return (
<div className="container">
    <div class="form-group">
        <label>Title</label>
        <input onChange={(e)=> setTitle(e.target.value)} type="text" class="form-control" placeholder="Post title" />
    </div>
    <div class="form-group">
        <label>Description</label>
        <textarea
            onChange={(e)=> setDescription(e.target.value)} placeholder="Description" class="form-control" rows="3"></textarea>
    </div>
    <div class="form-group">
        <label>Image</label>
        <input  onChange={(e)=> setImage(e.target.files[0])} type="file" class="form-control" />
    </div>
    <p onClick={createnewpost} className="btn btn-info">New Post</p>
</div>
)
}

export default NewPost