import React from 'react'
import { useAuth } from '../../context/authContext'


const Navbar = () => {
    const {user, logout} = useAuth()
  return (
    <div className='flex items-center justify-between h-12 bg-gray-700 px-5'>
        <p className="text-white font-bold">Welcome {user.name}</p>
        <button className="text-white bg-red-500 px-4 py-1 rounded hover:bg-red-600 transition" onClick={logout}>Logout</button>
    </div>
  )
}

export default Navbar