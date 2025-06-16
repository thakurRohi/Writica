import React, {useId} from 'react'
// using apwrite service fo rimage handling
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'


function PostCard({
    $id,// unique id for each post , $ is convention used by appwrite
    title,
    featuredImage,
    
}){

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                    className='rounded-xl' />
    
                </div>
                <h2
                className='text-xl font-bold'
                >{title}</h2>
            </div>
        </Link>
      )

}