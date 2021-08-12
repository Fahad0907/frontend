import Axios from "axios"
import { useEffect, useState } from "react"
import { useStateValue } from "./StateProvider"



const Profile = () => {
    
    const[{profile}, dispatch] =useStateValue()
    const [image, setimage] = useState(null)
    const [email, setEmail] = useState(profile?.user?.email)
    const [firstname, setfirstname] = useState(profile?.user?.first_name)
    const [lastname, setlastname] = useState(profile?.user?.last_name)
    
    const changeProfilePicture = async()=>{
       
        if(image !== null){
            let takeImage = new FormData()
            takeImage.append('image', image)
            await Axios({
                method : 'put',
                url : `http://127.0.0.1:8000/profile/`,
                data :takeImage, 
                headers :{
                    Authorization : `token ${window.localStorage.getItem('token')}`  //8064071e730c0370da4998f8ad2c9ce4596ea26f
                }
                
                

            }).then(response=>{
                console.log(response.data)
            }).catch(_ =>{
                alert('Error')
            })
        }
        else{
            alert('select image')
        }
        
    }
    const userDataUpdate = async()=>{
        
        await Axios({
            method :'put',
            url : 'http://127.0.0.1:8000/updateuser/',
            headers :  {Authorization : `token ${window.localStorage.getItem('token')}`},
            data:{
                'first_name': firstname,
                'last_name' : lastname,
                'email' : email,
            }
        }).then(response =>{
            console.log(response.data)
        }).catch(_ =>{
            alert('error')
        })
    }
    
    return (
        <div>
            <div className="container">
    <div>
        <div class="content-section">
            <div class="media">
                <img class="rounded-circle account-img" src={`http://127.0.0.1:8000${profile?.image}`} />
                <div class="media-body">
                    <h2 class="account-heading">{profile?.user?.username}</h2>
                    <small class="form-text text-muted">Username name is Fiexd</small>
                    <p class="text-secondary">{profile?.user?.email}</p>
                    <p>{profile?.user?.first_name} {profile?.user?.last_name}</p>
                </div>
            </div>
            <form method="POST" enctype="multipart/form-data">

                <fieldset class="form-group">
                    <legend class="border-bottom mb-4">Profile Info</legend>
                    <div class="form-group">
                        <label>Uplode Profile Picture</label>
                        <div class="row">
                            <div class="col">
                                <input  type="file" onChange={(e)=> setimage(e.target.files[0])} class="form-control" />
                            </div>
                            <div class="col">
                                <p className="btn btn-info" onClick={ changeProfilePicture}>Upload</p>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>First Name</label>
                        <input value ={firstname} onChange={(e)=> setfirstname(e.target.value)} type="text" class="form-control"  />
                    </div>
                    <div class="form-group">
                        <label>Last Name</label>
                        <input value = {lastname} onChange={(e)=> setlastname(e.target.value)} type="text" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input value ={email} onChange={(e)=> setEmail(e.target.value)} type="email" class="form-control"/>
                    </div>
                </fieldset>
                <div class="form-group">
                    <p class="btn btn-outline-info" onClick={userDataUpdate} >Update</p>
                </div>
            </form>
        </div>
    </div>
    
</div>
        </div>
    )
}

export default Profile
