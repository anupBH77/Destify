"use client"
import { useEffect, useState } from "react";

interface clientOnlyProps{
    children:React.ReactNode,
}
const ClientOnly : React.FC<clientOnlyProps>=({children})=>{
    const [isMounted,setMounted]= useState(false);
    
    useEffect(()=>{
        setMounted(true);
    },[]);
    if(!isMounted){
        return null;
    }
    return(
        <>
            {children};
        </>
    );
}
export default ClientOnly;