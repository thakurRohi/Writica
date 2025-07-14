import React from 'react'

const MyProfile = () => {
  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white rounded-xl shadow-md p-8 flex flex-col items-center">
      {/* Profile Picture */}
      <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center mb-4 overflow-hidden">
        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 19.125a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21c-2.676 0-5.216-.584-7.499-1.875z" />
        </svg>
      </div>
      {/* Name and Email */}
      <h2 className="text-2xl font-semibold text-gray-800">John Doe</h2>
      <p className="text-gray-500 mb-2">johndoe@email.com</p>
      {/* Bio */}
      <p className="text-center text-gray-600 mb-6">Passionate blogger. Love to write about technology, travel, and food. Always learning, always growing.</p>
      {/* Stats */}
      <div className="flex justify-center gap-8 mb-6 w-full">
        <div className="text-center">
          <div className="text-xl font-bold text-gray-800">24</div>
          <div className="text-gray-500 text-sm">Posts</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-gray-800">120</div>
          <div className="text-gray-500 text-sm">Likes</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-gray-800">8</div>
          <div className="text-gray-500 text-sm">Bookmarks</div>
        </div>
      </div>
      {/* Edit Profile Button */}
      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">Edit Profile</button>
    </div>
  )
}

export default MyProfile
