import React from 'react'
import { useState,useEffect , useCallback } from 'react'
const App = () => {
  const [passlen,setPasslen]=useState(8);
  const [numAllow,setnumAllow]=useState(false);
  const [charAllow,setcharAllow]=useState(false);
  const [password,setpassword]=useState("")

  const passGen=useCallback(()=>{
    let code=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllow) str += "0123456789"
    if(charAllow) str+="!@#$%^&*-_+=[]{}~`"

    for(let i=1;i<=passlen;i++){
      let char=Math.floor(Math.random()*str.length+1)
      code +=str.charAt(char)
    }

    setpassword(code)
  },[passlen, numAllow, charAllow])

  useEffect(() => {
    passGen()
  }, [passlen,numAllow,charAllow])
  

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Password Generator
        </h1>
        
        {/* Password Display Box */}
        <div className="flex gap-2 mb-6">
          <input 
            type="text" 
            value={password}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Generated Password"
            readOnly
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
            Copy
          </button>
        </div>

        {/* Password Length Slider */}
        <div className="mb-6">
        <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={passlen}
         className='cursor-pointer'
         onChange={(e) => {setPasslen(e.target.value)}}
          />
          <label>Length: {passlen}</label>
      </div>
         
        </div>

        {/* Checkboxes */}
        <div className="space-y-3 mb-6">
          <label className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              onChange={()=>setnumAllow((prev)=>!prev)}
            />
            <span className="text-gray-700">Include Numbers</span>
          </label>

          <label className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              onChange={()=>setcharAllow((prev)=>!prev)}
            />
            <span className="text-gray-700">Include Special Characters</span>
          </label>
        </div>

        
      </div>
    </div>
  )
}

export default App
