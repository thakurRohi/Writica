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
  const navigate = useNavigate()

  // step 3 for items presnt in navbar we do a loop on an array 
  // of items for navigation

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'   />

              </Link>
          </div>
{/* mapped all array items along with their urls and their authStatus 
based on useState value of authentication */}
          <ul className='flex ml-auto'>
            {navItems.map((item) => 
// did a conditional rendering on the basis of their true value 
// in active status being not authenticated
//
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            )}
{/* if you are authenticated then show logout button */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header
