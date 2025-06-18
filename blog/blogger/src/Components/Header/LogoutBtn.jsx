import React from 'react'
import {useDispatch} from 'react-redux'// use dispatch service 
// of react redux toolkit in order to make state updates
import authService from '../../appwrite/auth'
// using appwrite logout
import {logout} from '../../store/authSlice'
// context logout functionality
const LogoutBtn = () => {
    // step 1 declare and initialize dispatch
    const dispatch = useDispatch()
    // step 2 on click there will be a handle logout button functionality 
     const logoutHandler=()=>{
    // step 3 extracted logout functionality from appwrite feature , as
    // return a promise so handled by .then().
        authService.logout().then(()=>{
        // step 4 dispatched to make state changes
            dispatch(logout())
        })
     }
     return (
      <button
      className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
      onClick={logoutHandler}
      >Logout</button>
    )
}

export default LogoutBtn
