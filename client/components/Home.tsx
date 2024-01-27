import React, { useState } from 'react'
import { NextPageContext } from 'next'
import Router, { useRouter } from 'next/router'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCopy} from "@fortawesome/free-solid-svg-icons"
import Profile from './Profile'






const Home = ({account,user, entries}:any) => {


 

  const [entries_or_manage, setEntrie_or_Manage] =useState("entries")
  const [showAllEntries, setShowAllEntries] =useState(false)
  const BIC = "PANAGB3T"
  const  Address = `Panda Bank, 
  Broadway House,
  6 Cppold ST, London E40 
  QRT,United Kingdom`
  const [profile, setProfile]=useState(false)
  
  
  

  return (
    <div className='h-screen -mt-4 bg-stone-100' >
<button onClick={()=>setProfile(!profile)} className={`flex items-center justify-center w-10 h-10 rounded-full bg-black/30 absolute left-10  mt-4 ${profile?"hidden":"block"}`}>
          <div className='z-10 text-white'>
            <p>{user.first_name.toUpperCase()[0] + user.last_name.toUpperCase()[0]}</p>
          </div>
        </button>

<button onClick={()=>setProfile(!profile)} className={` absolute left-4  ${!profile?"hidden":"block"} mt-10 `}>
          Back
        </button>



<div className={` ${!profile?"hidden":"block"}  `}  ><Profile user={user}/></div>




    <div className={` ${profile?"hidden":"block"}  `}  >






    <div className="relative flex justify-center w-screen px-10 mt-4 " >



        
        
        <div className='flex flex-col items-center self-center justify-center' >
            <h1 className='mt-4 text-lg font-medium'>Current Account</h1>
            <div className="flex space-x-1"> 
             <p>{account.sort_code}</p>
             <div className='w-0.5 h-4 mt-1 bg-black/40 rounded-full'></div>
            <p>{account.account_number}</p></div>
          </div>
    </div >

    <div className="flex items-center justify-center w-screen mt-5">
      <h2>£{account.balance}.00</h2>
    </div>
    
    <div className="flex items-center justify-center w-screen px-10 mt-5">
      <div className='relative flex w-full max-w-[26rem] px-10 bg-no-repeat bg-contain h-80 bg-blank-card min-w-[26rem]'>
      <div className="flex mt-20 space-x-10 text-2xl text-white">
        <p>{account.card_number.toString().substring(0,4)}</p> 
       <p>{account.card_number.toString().substring(4,8)}</p> 
       <p>{account.card_number.toString().substring(8,12)}</p>
       <p>{account.card_number.toString().substring(12,16)}</p>   
      </div>

      <div className='mt-32 text-white -ml-[20.5rem]'>
        <p>{account.issued_date}</p>
      </div>
      
      <div className='mt-32 text-white ml-[7.3rem]'>
        <p>{account.expire_date}</p>
      </div>

      

      <div className="mt-[10rem] text-white -ml-[18rem] flex space-x-2">
       <p>{user.first_name.toUpperCase() }</p> 
       <p>{user.last_name.toUpperCase() }</p> 
      </div>
      
      <div className="mt-[11.5rem] text-white -ml-[8.4rem]">
       <p>{account.sort_code}</p> 
      </div>

      
      <div className="mt-[11.5rem] text-white ml-[7.4rem]">
       <p>{account.account_number}</p> 
      </div>
      
      </div>
      
    </div>
<div className={`overflow-hidden ${!showAllEntries?"":""} duration-700`}>
    <div className={`flex flex-col items-center justify-center w-screen px-10 border-t rounded-t-[4rem] bg-white  ${!showAllEntries?"translate-y-40":"translate-y-0"}  duration-700 `}>

      

      <button className="my-5 " onClick={()=>setShowAllEntries(!showAllEntries)}>
    <div className='flex'>
      <span className={` w-5 h-1 bg-black rounded-l-full ${ !showAllEntries && "rotate-45 translate-x-[0.34rem]"}  duration-700` }></span>
      <span className={` w-5 h-1 bg-black rounded-r-full ${ !showAllEntries && "-rotate-45 -translate-x-[0.190rem]"} duration-700` } ></span>
    </div>
      </button>


      


    <div className="w-96 h-10 bg-[#d9d9d9] rounded-full mt-2  flex justify-center items-center relative   ">
      
      <div className={`w-40 h-8 bg-white rounded-full ${entries_or_manage==="entries"?"translate-x-0":"translate-x-52"} duration-1000 z-10 -ml-52  `} ></div>
      
      <button onClick={()=>setEntrie_or_Manage("entries")} className={`flex items-center justify-center h-8   rounded-full w-44 z-50 absolute left-0 `}>
        <p>Entries</p>
      </button>

      
      <button onClick={()=>setEntrie_or_Manage("manage")} className={`flex items-center justify-center  h-8 rounded-full w-44 z-50 absolute right-0 `}>
        <p>Manage</p>
      </button>

    </div>


  

    <div className={`flex flex-col w-full pt-3 mt-10   ${entries.lenght ==0 && 'first-letter:items-center' }  ${!showAllEntries?"overflow-hidden h-[51vh]":"overflow-scroll h-[51vh]"} space-y-10 ${entries_or_manage==="entries"? 'block':"hidden"} duration-500 mb-10 z-50`}>
        { entries.lenght ==0 ? 
          <p> No Entries</p> :
          
         
        
        
        
        entries.map((e,i)=>(
          <div  className="relative flex" key={i}>

       
      <div className='flex items-center justify-center w-10 h-10 rounded-full bg-black/30'>
          <div className='z-10 text-white'>
            <p>{e.entry_first_name.toUpperCase()[0] + e.entry_last_name.toUpperCase()[0]}</p>
          </div>
        </div>
        <div className="flex-col ml-2 felx">
            <div className="flex space-x-1">
            <div>{e.entry_first_name.toUpperCase()[0]}</div>
            <div>{e.entry_last_name}</div>
            </div>
            <div className="flex space-x-1 text-xs">
            <div>{e.entry_first_name}</div>
            <div>{e.entry_last_name}</div>
            </div>
            

            
            </div>


            
            <div className='absolute right-0 top-2'>{e.amount}</div>
          </div>
        ))}
      </div>




    <div className={`flex flex-col w-full pt-3 mt-10 ${!showAllEntries?"overflow-hidden h-[55vh]":"overflow-scroll h-[55vh]"}  ${entries_or_manage==="manage"? 'block':"hidden"} duration-500  z-50`}>
   


       <p className='ml-2 text-sm text-black/40'>OVERDRAFT</p>
       <div  className="flex mb-10 " >
      <div className='relative flex items-center w-full h-12 px-2 rounded-md bg-black/5'>
         <p>Learn about overdrafts</p>
         <div className="absolute right-0 -rotate-90 "> <Image src={"/down.svg"} width={"15px"} height={"15px"}/>
</div>

        </div>
        

          </div>






        <p className='ml-2 text-sm text-black/40'>ACCOUNT DETAILS</p>
       <div  className="flex " >
      <div className='flex  flex-col w-full h-[21rem] rounded-md bg-black/5 relative px-2 mb-10'>

         
        <div className="flex py-2 border-b border-black/20" >
          <div className="flex flex-col">
            <p>Deposites are protected by the FSCS.</p>
            <p className="text-xs text-black/40" >Tap for more info</p>
          </div>
          <div className="absolute right-0"> <Image src={"/protected.svg"} height={"40px"} width={"60px"}/></div>
         
        </div>
       
        <div className="flex py-2 border-b border-black/20" >
          <div className="flex flex-col">
            <p>{account.sort_code}</p>
            <p className="text-xs text-black/40" >Sort Code</p>
          </div>
          <button className="absolute flex flex-col right-4 " onClick={()=>navigator.clipboard.writeText(account.sort_code)}>  <FontAwesomeIcon className="mt-1 text-2xl active:scale-75 text-stone-500 " icon={faCopy}/>
          <p className='text-xs '>Copy</p>
          </button>
         
        </div>
       
        <div className="flex py-2 border-b border-black/20" >
          <div className="flex flex-col">
            <p>{account.account_number}</p>
            <p className="text-xs text-black/40" >Account Number</p>
          </div>
          <button className="absolute flex flex-col right-4 " onClick={()=>navigator.clipboard.writeText(account.account_number)}>  <FontAwesomeIcon className="mt-1 text-2xl active:scale-75 text-stone-500 " icon={faCopy}/>
          <p className='text-xs '>Copy</p>
          </button>
        </div>


        <div className="flex py-2 border-b border-black/20" >
          <div className="flex flex-col">
            <p>Panda Bank, Broadway House</p>
            <p>6 Cppold ST, London E40 QRT,</p>
            <p>United Kingdom</p>
            <p className="text-xs text-black/40" >Bank Address</p>
          </div>
          <button className="absolute flex flex-col mt-4 right-4" onClick={()=>navigator.clipboard.writeText(Address)}>  <FontAwesomeIcon className="mt-1 text-2xl active:scale-75 text-stone-500 " icon={faCopy}/>
          <p className='text-xs '>Copy</p>
          </button>
        </div>
        <div className="flex py-2 border-black/20" >
          <div className="flex flex-col">
            <p>PANAGB3T</p>
            <p className="text-xs text-black/40" >BIC Number</p>
          </div>
          <button className="absolute flex flex-col right-4 " onClick={()=>navigator.clipboard.writeText(BIC)}>  <FontAwesomeIcon className="mt-1 text-2xl active:scale-75 text-stone-500 " icon={faCopy}/>
          <p className='text-xs '>Copy</p>
          </button>
        </div>
       
       
     
        </div>


          
          </div>


          <p className='ml-2 text-sm text-black/40'>NEW CARD</p>
       <div  className="flex mb-10 " >
      <div className='relative flex items-center w-full h-12 px-2 rounded-md bg-black/5'>
         <p>I need a new card</p>
         <div className="absolute right-0 -rotate-90 "> <Image src={"/down.svg"} width={"15px"} height={"15px"}/>
</div>

        </div>
        

          </div>

    

  
      </div>









      
    </div>

    </div>
   
      


        
    </div>

    </div>

    
  )
}

export default Home








