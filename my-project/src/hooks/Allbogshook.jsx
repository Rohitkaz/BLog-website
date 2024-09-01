import React from 'react'
import { useState,useEffect } from 'react';
import axios from "axios"

export default function useAllblogs(currentpage)
{
    const [post,setPost]=useState([])
    const [removeloadmore,setRemoveloadmore]=useState(false);
    const [isLoading,setIsLoading]=useState(false);
    useEffect(()=>{
     const indexkey=`allblogs-${currentpage}`;
     setIsLoading(true);
    if(localStorage.getItem(indexkey) )
    {
        console.log("inside local storage");
        try{
        const newpost=JSON.parse(localStorage.getItem(indexkey));
      

        console.log(newpost);
        
        setIsLoading(false);
   setPost([...post,...newpost]);
   return;
        }
        catch(error)
        {
          setIsLoading(false);
        console.log(error)
        }
    }
    
    
        const fetchdata=async()=>{
        
          try {
            const res = await axios.get(`http://localhost:8000/Yourblog/${currentpage}`, {
              withCredentials: true,
            });
            const data = res.data;
            if(data.length==0 || data.length<4)
            {
              setRemoveloadmore(true);
            }
            if(data.length!==0)
            {
            localStorage.setItem(indexkey,JSON.stringify(data));
            }
            setIsLoading(false);
               setPost([...post,...data]);
               
               
            
          } catch (err) {
          console.log(err.message);
          }
        }
        
        fetchdata();
    
   },[currentpage]);
   
   return {post,removeloadmore,isLoading};

}