import React from 'react'
import  { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './Components'
import { Outlet } from 'react-router-dom'
// socket for later use
// import useSocketListeners from "./hooks/useSocketListeners"
// import { fetchProfile } from './store/profileSlice'


// we are going to do a conditional rendering on the app.jsx file
// while loading or interaction with server takes some time
// so we are going to set a loading state
const App = () => {
  //step1 create a loading useState
  const [loading, setLoading] = useState(true)
const dispatch=useDispatch()
 
  

  // useEffect will be used in order to automatically make state chnages
  // firstly user is get()
  //if there is non null user data then send a dsipatch to login
  // else send a dispatch of logout 
  // such that changes will be saved in context

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .catch((error) => {
      console.log("Auth check error:", error);
      dispatch(logout())
    })
    // after that whole process is done loading is done false
    .finally(()=>setLoading(false))
  
   
  }, [])

  // This hook sets up all your socket event listeners and dispatches Redux actions
  // useSocketListeners();

  return !loading ? (
    <div className='min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100'>
      <div className='w-full flex-1 flex flex-col'>
        <Header />
 
       

        <main className='flex-1'>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
