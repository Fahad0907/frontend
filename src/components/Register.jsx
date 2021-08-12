import Axios from 'axios'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
const Register = () => {
    const [username, setUsername] = useState(null)
    const [password1,  setPassword1] =  useState(null)
    const [password2,  setPassword2] =  useState(null)
    const history = useHistory()
    const registernow =()=>{
        if (password1 === password2)
        {
            Axios({
                method : 'post',
                url : 'http://127.0.0.1:8000/register/',
                data:{
                    'username' : username,
                    'password' : password1
                }
            }).then(response=>{
                if(response.data['error'])
                {
                    alert(response.data['message'])
                }
                else{
                    history.push('/login')
                }
            })
        }
        else{
            alert('password not match')
        }
    }
    return (
        <div>
            <div className="container">
    <div class="content-section">
        <fieldset class="form-group">
            <legend class="border-bottom mb-4">Register Now</legend>
            <div>
                <div class="form-group">
                    <label>Username</label>
                    <input  onChange={(e) => setUsername(e.target.value)}type="text" class="form-control" placeholder="Username" />
                </div>
                <div class="form-group">
                    <label >Password</label>
                    <input type="password" onChange={(e) => setPassword1(e.target.value)} lass="form-control" placeholder="Password" />
                </div>

                <div class="form-group">
                    <label>Confirm Password</label>
                    <input type="password" onChange={(e) => setPassword2(e.target.value)} class="form-control" placeholder="Password" />
                </div>
            </div>
        </fieldset>
        <div class="form-group">
            <p class="btn btn-outline-info" onClick={registernow} >Register</p>
        </div>
        <div class="border-top pt-3">
            <small class="text-muted">
                Have An Account?
                            <Link class="ml-2" to="/login">SignIn In Now</Link>
            </small>
        </div>
    </div>
</div >
            
        </div>
    )
}

export default Register

