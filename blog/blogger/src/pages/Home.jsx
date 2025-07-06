import React, {useEffect, useState} from 'react'
import service from "../appwrite/config";
import {Container, PostCard} from '../Components'
import conf from '../conf/conf.js'
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../store/fileThunks";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Home() {
    const dispatch = useDispatch();
    const { files: posts = [], fetchStatus, error } = useSelector((state) => state.file);

    const { status: isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();
   
    useEffect(() => {
        dispatch(fetchAllPosts());
       

    }, [dispatch])
 
    
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);
    

 

    if (fetchStatus === 'loading') {
        return <div className="w-full py-16 text-center">Loading posts...</div>;
    }
  
    if (posts.length === 0) {
        return (
            <div className="w-full py-16">
                <Container>
                    <div className="text-center">
                        <div className="max-w-md mx-auto">
                            <div className="mb-6">
                                <svg className="mx-auto h-16 w-16 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold text-slate-900 mb-2">
                                No posts yet
                            </h1>
                            <p className="text-slate-600">
                                Be the first to create an amazing post!
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-12'>
            <Container>
                <div className='mb-8'>
                    <h1 className="text-4xl font-bold text-slate-900 text-center mb-4">Latest Posts</h1>
                    <p className="text-slate-600 text-center max-w-2xl mx-auto">
                        Discover amazing stories and insights from our community
                    </p>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {posts.map((post) => (
                        <div key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
         
           
        
          


        </div>
    )
}

export default Home