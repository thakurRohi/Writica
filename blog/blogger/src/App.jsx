import React from 'react'
import  { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './Components'
import { Outlet } from 'react-router-dom'

// we are going to do a conditional rendering on the app.jsx file
// while loading or interaction with server takes some time
// so we are going to set a loading state
const App = () => {
  //step1 create a loading useState
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

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
  

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
