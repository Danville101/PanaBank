import React from 'react'
import { useState } from 'react'
import { NextPageContext } from 'next'
import Router from 'next/router'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {BsFillArrowRightSquareFill} from "react-icons/bs"

import * as RA from "react-icons"


const Transfer = ({account, payees, favoritePayees}:any) => {


  const [transferFunds, setTransferFunds]=useState(false)


  const [payeeTransfer, setPayeeTransfer]=useState(false)







 const [firstName , setFirstName]=useState("")
  const [lastName , setLastName]=useState("")
  const [sortcode, setSortCode]=useState("")
  const [accounNumber, setAccountNumber]= useState("")
  const [amount, setAmount]= useState("")
  
  const transfer=(e:any)=>{

    e.preventDefault()

    fetch("http://localhost:8080/users/transfer",{
      method:"POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }, credentials:"include",
      body: JSON.stringify({
        from_sort_code:account.sort_code,
    from_account:account.account_number,
    to_first_name:firstName,
    to_last_name:lastName,
    to_sort_code:sortcode,
    to_account:Number(accounNumber),
    amount:Number(amount)
   
   })
    }).then(()=>{
      Router.replace(Router.asPath)
    })
    

  }


    const getPayeeById =( account_number:number)=>{

      fetch("http://localhost:8080/users/account/payeebyid",{
        method:"POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, credentials:"include",
        body: JSON.stringify({
          payee_id:account_number
     })
      }).then((res)=>{
        return res.json()
      }).then( data=>{
       setFirstName(data.payee_first_name)
       setLastName(data.payee_last_name)
       setSortCode(data.sort_code)
       setAccountNumber(data.account_number)
      })

      setPayeeTransfer(true)

    }


    const clearUseState=()=>{
      setFirstName("")
      setLastName("")
      setSortCode("")
      setAccountNumber("")
      setAmount("")
    }


    const back =()=>{
      setTransferFunds(false)
      setPayeeTransfer(false)
      clearUseState()
    }

  
  return (
    <div className='flex flex-col h-screen px-4 mt-0 bg-stone-100 '>
      <div className={`mt-2 ${!transferFunds?"hidden":"block"} `} onClick={back}>     
       Back</div>
       
      <div className={`mt-2  ${!payeeTransfer?"hidden":"block"}`} onClick={back}>     
       Back</div>



       
      <div className='flex'><Image src={"/blank_card.svg"} height={"60px"} width={"80px"}/>
      <div className='mt-1.5 ml-2'>
        <p>Current Account</p>
        <p className='-mt-1 text-sm text-black/60'>£{account.balance}.00</p>
      </div>
      
</div>


<div className={`mt-2 ${!transferFunds?"hidden":"block"} flex flex-col `}>


        <p className="self-center mt-20 text-xl font-semibold">Bank Transfer</p>
<div className='z-50 w-full py-10 bg-white rounded-md shadow-lg max-w' >
  <form onSubmit={transfer} className='flex flex-col items-center justify-center'>
    <input className="h-10 px-5 mb-5 border rounded-lg md:mb-5 border-neutral-300 outline-hidden focus:outline-black" type="text" placeholder="First Name" required onChange={(e)=>setFirstName(e.target.value)} value={firstName}  />
    <input className="h-10 px-5 mb-5 border rounded-lg md:mb-5 border-neutral-300 outline-hidden focus:outline-black" type="text" placeholder="Last Name" required onChange={(e)=>setLastName(e.target.value)} value={lastName} />
    <input className="h-10 px-5 mb-5 border rounded-lg md:mb-5 border-neutral-300 outline-hidden focus:outline-black" type="text" required placeholder='sort code' onChange={(e)=> setSortCode(e.target.value) } value={sortcode} />
    <input className="h-10 px-5 mb-5 border rounded-lg md:mb-5 border-neutral-300 outline-hidden focus:outline-black" type="text" inputMode="numeric" pattern="\d*" placeholder='account number'required  minLength={8} maxLength={8} onChange={(e)=>setAccountNumber(e.target.value)} value={accounNumber}/>
    <input className="h-10 px-5 mb-5 border rounded-lg md:mb-5 border-neutral-300 outline-hidden focus:outline-black" type="number" placeholder='amount' required onChange={(e)=>setAmount(e.target.value)} value={amount} />
    <button className='h-10 px-5 text-white bg-black border rounded-lg ' type="submit">Send</button>
  </form>
</div>


  
  
</div>
 
      
      
      
      
      
      <div className={`mt-2 ${!transferFunds?"block":"hidden"}  ${!payeeTransfer?"block":"hidden"}  `}>   

<div className="z-50 flex flex-col w-full h-20 px-2 bg-white rounded-lg shadow-md">
  <div className='flex justify-between mt-2'>
    <p className="font-semibold">Payment</p>
    <p className='text-sm'>Payees</p>
  </div>

  <button className="relative flex mt-2" onClick={()=>setTransferFunds(!transferFunds)} >
    <div className="flex">
    <BsFillArrowRightSquareFill className='mr-2 text-3xl text-slate-400'/>   
    <div className='flex flex-col -mt-1.5'>
      <p className='ml-1'>Pay someone</p>
      <p className='text-xs'>By bank transfer</p>
      
    </div>
    </div>

    <div className="absolute right-0 -rotate-90 "> <Image src={"/down.svg"} width={"15px"} height={"15px"}/>
</div>

  </button>

  
</div>


<p className='mt-6 ml-2 text-black/60'>FAVOURITES</p>
<div className='flex items-center w-full h-20 px-4 space-x-4 bg-white rounded-md shadow-md'>

{favoritePayees.map((e,i)=>(

<button  className="flex pb-2 hover:bg-slate-100 " key={i}  onClick={()=>getPayeeById(e.account_number)} >

       <div className='flex flex-col'>
<div className='flex items-center justify-center w-10 h-10 rounded-full bg-black/30'>
    <div className='z-10 text-white'>
      <p>{e.payee_first_name.toUpperCase()[0] + e.payee_last_name.toUpperCase()[0]}</p>
    </div>
  </div>
  <p className='self-center text-xs'>{e.payee_first_name}</p>
  
</div>

    </button>
  ))}
  
</div>
      

<p className="mt-10 ml-2 text-black/60">PAYEES</p>
<div className='flex flex-col h-auto px-4 py-4 space-y-4 bg-white rounded-lg shadow-md'>
  
  {payees.map((e,i)=>(
<button key={i} onClick={()=>getPayeeById(e.account_number)} >
<div  className="relative flex pb-2 border-b-2 hover:bg-slate-100 ">


       
<div className='flex items-center justify-center w-10 h-10 rounded-full bg-black/30'>
    <div className='z-10 text-white'>
      <p>{e.payee_first_name.toUpperCase()[0] + e.payee_last_name.toUpperCase()[0]}</p>
    </div>
  </div>
  <div className="flex-col mt-2 ml-2 felx">
      <div className="flex space-x-1">
      <div>{e.payee_first_name.toUpperCase()[0]}</div>
      <div>{e.payee_last_name}</div>
      </div>
      </div>


  
      <div className="absolute right-0 mt-4 -rotate-90"> <Image src={"/down.svg"} width={"15px"} height={"15px"}/>
</div>


    </div>
    </button>
  ))}
  
</div>

</div>


<div className={`mt-2 ${!payeeTransfer?"hidden":"block"} flex flex-col `}>


        <p className="self-center mt-20 text-xl font-semibold">Bank Transfer</p>
<div className='z-50 w-full py-10 bg-white rounded-md shadow-lg max-w' >
  <form onSubmit={transfer} className='flex flex-col items-center justify-center'>
    <input className="h-10 px-5 mb-5 border rounded-lg md:mb-5 border-neutral-300 outline-hidden focus:outline-black" type="text" placeholder="First Name" required onChange={(e)=>setFirstName(e.target.value)} value={firstName}  />
    <input className="h-10 px-5 mb-5 border rounded-lg md:mb-5 border-neutral-300 outline-hidden focus:outline-black" type="text" placeholder="Last Name" required onChange={(e)=>setLastName(e.target.value)} value={lastName} />
    <input className="h-10 px-5 mb-5 border rounded-lg md:mb-5 border-neutral-300 outline-hidden focus:outline-black" type="text" required placeholder='sort code' onChange={(e)=> setSortCode(e.target.value) } value={sortcode} />
    <input className="h-10 px-5 mb-5 border rounded-lg md:mb-5 border-neutral-300 outline-hidden focus:outline-black" type="text" inputMode="numeric" pattern="\d*" placeholder='account number'required  minLength={8} maxLength={8} onChange={(e)=>setAccountNumber(e.target.value)} value={accounNumber}/>
    <input className="h-10 px-5 mb-5 border rounded-lg md:mb-5 border-neutral-300 outline-hidden focus:outline-black" type="number" placeholder='amount' required onChange={(e)=>setAmount(e.target.value)} value={amount} />
    <button className='h-10 px-5 text-white bg-black border rounded-lg ' type="submit">Send</button>
  </form>
</div>


  
  
</div>
 



    </div>
  )
}

export default Transfer





   
   
   