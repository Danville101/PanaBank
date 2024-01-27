{entries.map((e,i)=>(
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