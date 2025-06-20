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
        <Link to={`/post/${$id}`} className="group block">
            <div className="w-full bg-white rounded-2xl p-0 shadow-md border border-slate-200 hover:shadow-xl hover:border-blue-400 transition-all duration-300 group-hover:scale-[1.03] overflow-hidden flex flex-col">
                <div className="relative w-full h-52 overflow-hidden">
                    <img 
                        src={appwriteService.getFilePreview(featuredImage)} 
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 rounded-t-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 pointer-events-none"></div>
                </div>
                <div className="flex-1 flex flex-col justify-between p-5">
                    <h2 className="text-2xl font-semibold text-slate-900 group-hover:text-blue-600 transition-colors duration-200 mb-2 line-clamp-2">
                        {title}
                    </h2>
                    {/* You can add more post info here, like author/date, if available */}
                    <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-slate-400 font-medium">Read More</span>
                        <svg className="w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </div>
                </div>
            </div>
        </Link>
      )

}

export default PostCard