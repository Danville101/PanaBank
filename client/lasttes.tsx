export const getStaticPaths = async()=>{

     await fetch("http://localhost:8080/users/account",{
        headers: {
         
             'Content-Type': 'application/json',
             "User-Agent":
               "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
           },
        credentials: "include"
      }).then((res)=>{
        return res.json()
      }).then( data=>{
       return {
       path:data.account_number
     }
      })
    
   }
   
   
   
   export const getStaticProps = async()=>{
     const res = await fetch("http://localhost:8080/users/account",{
        headers: {
      
             'Content-Type': 'application/json',
             "User-Agent":
               "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
           },
        credentials: "include"
      })
      
      const data = await res.json()
   
      return{
       props:{account:data}
      }
   
   }