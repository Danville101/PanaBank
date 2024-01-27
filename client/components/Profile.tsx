import  Router  from 'next/router'
import React from 'react'


const Profile = ({user}:any) => {

     const logout=()=>{
          fetch("http://localhost:8080/users/logout",{
               method:"POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, credentials:"include",
          }).then(()=>{
               Router.push("login")
          })
     }


  return (
    <div className='flex flex-col justify-center items-center pt-40 '>

<div className='flex items-center justify-center w-36 h-36 rounded-full bg-black/30 '>
          <div className='z-10 text-white text-4xl'>
            <p>{user.first_name.toUpperCase()[0] + user.last_name.toUpperCase()[0]}</p>
          </div>
        </div>

     <button className=" w-56  px-5 py-3 text-white bg-black rounded-full mt-20 " >Close Account</button>
     
     <button className="self-center w-56 px-5 py-2 mb-10 mt-6 text-black border-2 border-black rounded-full" onClick={logout}>Log Out</button>
    </div>
  )
}

export default Profile