import React, { useState } from 'react'
import { NextPageContext } from 'next'
import Transfer from '../../components/Transfer'
//import Transfer from '../../components/transfer'
import Home from '../../components/Home'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHome, faQuestion, faChartSimple, faRightLeft} from "@fortawesome/free-solid-svg-icons"
import Profile from '../../components/Profile'


const User = ({account,user, entries, payees, favoritePayees}:any) => {  


  const [menuState, setMenuState]= useState("home")
  
  return (
    <div className='relative ' >

      
<div className={`${menuState==="home"?"block":"hidden"}  `}><  Home user={user} account={account} entries={entries}/></div>

<div className={`${menuState==="payment"?"block":"hidden"} `} ><Transfer account={account} payees={payees} favoritePayees={favoritePayees} /></div>
   
    


         <div className='fixed bottom-0 flex justify-between w-screen h-12 px-10 bg-white border-t-2 ' >
          <button onClick={()=>setMenuState("home")}> <div className="flex flex-col items-center justify-center w-10" >
            <FontAwesomeIcon icon={faHome} className={`text-lg  ${menuState=="home" ? "text-black": "text-slate-400"}`} />
             <p className={`text-xs  ${menuState=="home" ? "text-black": "text-slate-400"}`}>Home</p>
          </div></button>
          
          <button onClick={()=>setMenuState("trends")}> <div className="flex flex-col items-center justify-center w-10" >
            <FontAwesomeIcon icon={faChartSimple} className={`text-lg  ${menuState=="trends" ? "text-black": "text-slate-400"}`} />
             <p className={`text-xs  ${menuState=="trends" ? "text-black": "text-slate-400"}`}>Trends</p>
          </div></button>
          
          <button onClick={()=>setMenuState("payment")}> <div className="flex flex-col items-center justify-center w-10" >
            <FontAwesomeIcon icon={faRightLeft} className={`text-lg  ${menuState=="payment" ? "text-black": "text-slate-400"}`} />
             <p className={`text-xs  ${menuState=="payment" ? "text-black": "text-slate-400"}`}>Payment</p>
          </div></button>
          
          <button onClick={()=>setMenuState("help")}> <div className="flex flex-col items-center justify-center w-10" >
            <FontAwesomeIcon icon={faQuestion} className={`text-lg  ${menuState=="help" ? "text-black": "text-slate-400"}`} />
             <p className={`text-xs  ${menuState=="help" ? "text-black": "text-slate-400"}`}>Help</p>
          </div></button>
         
          
          


         </div>


    </div>

    
  )
}

export default User


export async function getServerSideProps(ctx: NextPageContext) {
  const cookies = ctx.req?.headers.cookie

  console.log(ctx.req?.headers)

  

  const res = await fetch(`http://${process.env.HOST}:8080/users`,{
    headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         "Cookie":`${cookies}`
        
       },
    credentials: "include",
  })

  const user = await res.json()
  
  const res2 = await fetch(`http://${process.env.HOST}:8080/users/account`,{
    headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         "Cookie":`${cookies}`
        
       },
    credentials: "include",
  })

  const account = await res2.json()

   
  const res3 = await fetch(`http://${process.env.HOST}:8080/users/account/entries`,{
    headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         "Cookie":`${cookies}`
        
       },
    credentials: "include",
  })

  const entries = await res3.json()
  
  const res4 = await fetch(`http://${process.env.HOST}:8080/users/account/payee`,{
    headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         "Cookie":`${cookies}`
        
       },
    credentials: "include",
  })

  const payees = await res4.json()


  const res5 = await fetch(`http://${process.env.HOST}:8080/users/account/payee/favourite`,{
    headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         "Cookie":`${cookies}`
        
       },
    credentials: "include",
  })

  const favoritePayees = await res5.json()




  



  

  return{props:{account, user, entries, payees, favoritePayees}}
  
}



