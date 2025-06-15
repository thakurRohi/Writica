import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'



const Header = () => {

  // step 1 , we are checking whether the user is authenticated or not
  // and further on the basis of that we can do a conditional 
  // rendering on the logout button , whento show it
  
  //fetch auth status of current user by using useSelector method
  // of redux toolkit and store it in a variable
  const authStatus = useSelector((state)=>state.auth.status)
  // const navigate = useNavigate()

  // step 3 for items presnt in navbar we do a loop on an array 
  // of items for navigation

  return (
    <div>
      
    </div>
  )
}

export default Header
