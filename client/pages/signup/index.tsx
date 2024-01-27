import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { useState } from 'react'

import  {   useRouter } from 'next/router'
import Link from 'next/link'
//import { response } from 'express'


const SignUp: NextPage = () => {

  const router = useRouter()

  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [password2,setPassword2] = useState("")


 const creatUser = (e:any)=>{
  
  e.preventDefault()
  
  fetch("http://localhost:8080/users", {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }, credentials: 'include',
    body: JSON.stringify({
      first_name:firstName,
  last_name:lastName,
   email:email,
  password:password,
  password2:password2})
  }).then(response=>{
    if(response.status <400){
    router.push('/login')}
  })
  



  
//console.log(Router.asPath)

 }
 
 

 
  

  
  return (
    <div>
    <div className="flex flex-col justify-center w-screen md:bg-singup-bg-md md:bg-no-repeat md:bg-cover h-screen items-center ">
      <div className='flex flex-col mt-20  md:-mt-20'>
        <Image src={"/panda_logo.svg"} width={"50px"} height={"50px"} alt="logo"/>
        <p className="self-center text-2xl md:text-white">Panda</p> 
        <p className="self-center text-2xl md:text-white"> Bank</p>
      </div>
    
      <form onSubmit={creatUser} className="flex flex-col items-center justify-center h-[35rem] md:bg-white md:rounded-md md:w-[40rem] md:self-center md:mb-40 md:h-[40rem] md:py-20  ">
        <input  className="h-10 px-5 mb-10 border rounded-lg md:mb-5 border-neutral-300 outline-hidden focus:outline-black " value={firstName} onChange={(e)=>setFirstName(e.target.value)} placeholder="First Name" type="text"/>
        <input  className="h-10 px-5 mb-10 border rounded-lg md:mb-5 border-neutral-300 outline-hidden focus:outline-black " value={lastName} onChange={(e)=>setLastName(e.target.value)} placeholder="Last Name" type="text"/>
        <input  className="h-10 px-5 mb-10 border rounded-lg md:mb-5 border-neutral-300 outline-hidden focus:outline-black " value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" type="email"/>
        <input  className="h-10 px-5 mb-10 border rounded-lg md:mb-5 border-neutral-300 outline-hidden focus:outline-black " value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" type="password"/>
        <input  className="h-10 px-5 border rounded-lg border-neutral-300 outline-hidden focus:outline-black" value={password2} onChange={(e)=>setPassword2(e.target.value)} placeholder="Confim Password" type="password"/>
        <button type="submit" className="w-56 px-5 py-2 mt-10 text-white bg-black rounded-full">Sign Up</button>
        <p className='mt-4 text'>OR</p>

      </form>

      <Link href={"/login"}><button className="self-center w-56 px-5 py-2 mb-10 -mt-6 md:-mt-64 text-black border-2 border-black rounded-full">Sign In</button></Link>
     
      
    </div>
    
    <footer className='bg-slate-500/20'>
      <div className="md:hidden"> <Image src={"/mobile_signup.svg"} width={"1000px"} height={"1000px"} /></div>
     
    </footer>
    </div>
    
  
  )
}

export default SignUp







