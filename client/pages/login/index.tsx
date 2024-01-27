import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/router'

const Login = () => {

     
     const router = useRouter()
     const [email, setEmail]= useState("")
     const [password, setPassword]= useState("")

const loginFunc =(e:any)=>{

     e.preventDefault()
     fetch('http://localhost:8080/users/login', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }, credentials:"include",
    body: JSON.stringify({

   email:email,
  password:password,
 })
  }).then(() => {
   fetch("http://localhost:8080/users/account",{
     headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
     credentials: "include"
   }).then((res)=>{
     return res.json()
   }).then( data=>{
    router.push("/user")
    //router.push(`user/${data.account_number}`)
   })
   })
}

     
  return (
    <div className="flex flex-col lg:flex-row lg:h-screen " >

     <div className="w-[50vw] bg-hero-panda bg-no-repeat bg-cover ">


     </div>

<div className='px-6'>
     <div className="flex justify-between mt-10">
          <div className='flex'>
          <Image src={"/panda_logo.svg"} width={"60px"} height={"60px"}/>
          <div><p className="text-xl font-semibold">Panda</p>
          <p className="text-xl font-semibold">Bank</p></div>
      </div>
          <Image src={"/protected.svg"} width={"50px"} height={"50px"}/>
     </div>
  <p className='self-center mt-40 text-2xl '>Welcome to <br/> Online Banking
     </p>

<form className='flex flex-col' onSubmit={loginFunc}>
<input  onChange={(e)=>setEmail(e.target.value)} className='h-10 px-5 mb-6 border rounded-lg border-neutral-300 outline-hidden focus:outline-black' placeholder='email' type="email" value={email} />
     <input onChange={(e)=>setPassword(e.target.value)} className='h-10 px-5 mb-6 border rounded-lg border-neutral-300 outline-hidden focus:outline-black' placeholder='password' type="password" value={password}/>
     <button type="submit" className="h-10 px-5 py-2 text-white bg-black rounded-full">Log In</button>
</form>

<div className='w-full h-auto p-6 mt-40 bg-gray-100 rounded-lg'>
     <p>New customer? Apply for a Panda Bank account in minutes. You’ll need to download the app first – but there’s plenty of web-based financial fun to be had once you’re up and running.

Get started</p>
<Link href={"/signup"} >
     <p className='mt-2 text-blue-500 ' >
            Get started 
     </p>
  
</Link>
</div>


     </div>

   

     
    </div>
  )
}

export default Login