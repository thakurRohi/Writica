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
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Password Generator
          </h1>
          <p className="text-slate-600">
            Create strong and secure passwords
          </p>
        </div>
        
        {/* Password Display Box */}
        <div className="flex gap-3 mb-8">
          <input 
            type="text" 
            value={password}
            className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50 text-slate-900 font-mono text-sm"
            placeholder="Generated Password"
            readOnly
          />
          <button 
            onClick={copyToClipboard}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm hover:shadow-md"
          >
            Copy
          </button>
        </div>

        {/* Password Length Slider */}
        <div className="mb-8">
          <div className='flex items-center justify-between mb-2'>
            <label className="text-sm font-medium text-slate-700">Password Length</label>
            <span className="text-lg font-bold text-blue-600">{passlen}</span>
          </div>
          <input 
            type="range"
            min={6}
            max={100}
            value={passlen}
            className='w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider'
            onChange={(e) => {setPasslen(e.target.value)}}
          />
        </div>

        {/* Checkboxes */}
        <div className="space-y-4 mb-8">
          <label className="flex items-center space-x-3 cursor-pointer group">
            <input 
              type="checkbox" 
              className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500 focus:ring-2"
              onChange={()=>setnumAllow((prev)=>!prev)}
            />
            <span className="text-slate-700 group-hover:text-slate-900 transition-colors">Include Numbers</span>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer group">
            <input 
              type="checkbox" 
              className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500 focus:ring-2"
              onChange={()=>setcharAllow((prev)=>!prev)}
            />
            <span className="text-slate-700 group-hover:text-slate-900 transition-colors">Include Special Characters</span>
          </label>
        </div>

        {/* Generate Button */}
        <button 
          onClick={passGen}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
        >
          Generate New Password
        </button>
      </div>
    </div>
  )
}

export default App
