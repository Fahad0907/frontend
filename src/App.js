import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import NewPost from "./components/NewPost";
import PostDetails from "./components/PostDetails";
import Profile from "./components/Profile";
import Register from "./components/Register";
import { useStateValue } from "./components/StateProvider";
import Update from "./components/Update";


function App() {
  
  const[{profile}, dispatch] =useStateValue()
  try
    {useEffect(()=>{
        const getPost = async () =>{
            await Axios({
                method : 'get',
                url : `http://127.0.0.1:8000/profile/`,
                headers :{
                    Authorization : `token ${window.localStorage.getItem('token')}`  //8064071e730c0370da4998f8ad2c9ce4596ea26f
                }
            }).then(response=>{
                
                dispatch({type:'addProfile', value:response.data['userdata']})
               
                

                
            })
        }
        getPost()
    })}
    catch{
      dispatch({type:'addProfile', value:null})
    }

  return (
    
    <BrowserRouter>
    
      <Navbar/>
      <Switch>
        {
            profile!== null? (
              <>
                <Route exact path = "/profile/" component={Profile}/>
                <Route exact path = "/" component={Home}/>
                <Route exact path = "/details/:id/" component={PostDetails}/>
                <Route exact path = "/details/:id/update/" component={Update}/>
                <Route exact path = "/newpost/" component={NewPost} />
              
              </>
            ):
            (
              <>
                <Route exact path = "/" component={Home}/>
                
                <Route exact path = "/login" component = {Login}/>
                <Route exact path = "/register" component = {Register}/>
              </>
            )
        }
        
        
      </Switch>
    </BrowserRouter>
  );
}

export default App;
