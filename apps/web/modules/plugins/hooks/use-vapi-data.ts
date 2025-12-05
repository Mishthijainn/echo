import { api } from "@workspace/backend/_generated/api";
import { useAction } from "convex/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
type PhoneNumbers=typeof api.private.vapi.getPhoneNumbers._returnType
type Assistants=typeof api.private.vapi.getAssistants._returnType

export const useVapiAssistants=():{
    data:Assistants;
    isLoading:boolean;
    error:Error | null;
}=>{
    const [data,setData]=useState<Assistants>([]);
    const [isLoading,setIsLoading]=useState(true);
    const [error,setError]=useState<Error | null>(null);
    const getAssistants=useAction(api.private.vapi.getAssistants)
    useEffect(()=>{
        let cancellled=false
        const fetchData=async ()=>{
            try{
                setIsLoading(true)
                const result=await getAssistants()
                if(cancellled) {return}
                setData(result)
                setError(null)
            }catch(error){
                if(cancellled) {return}
                setError(error as Error)
                toast.error("Falied to fetch assistants")
            }finally{
                if(!cancellled) {setIsLoading(false)}
            }
        }
        fetchData()
        return ()=>{
            cancellled=true;
        }
    },[]) 
    return {data,isLoading,error}
    
}

export const useVapiPhoneNumbers=():{
    data:PhoneNumbers;
    isLoading:boolean;
    error:Error | null;
}=>{
    const [data,setData]=useState<PhoneNumbers>([]);
    const [isLoading,setIsLoading]=useState(true);
    const [error,setError]=useState<Error | null>(null);
    const getPhoneNumbers=useAction(api.private.vapi.getPhoneNumbers)
    useEffect(()=>{
        let cancellled=false
        const fetchData=async ()=>{
            try{
                setIsLoading(true)
                const result=await getPhoneNumbers()
                if(cancellled) {return}
                setData(result)
                setError(null)
            }catch(error){
                if(cancellled) {return}
                setError(error as Error)
                toast.error("Falied to fetch phone numbers")
            }finally{
                 if(!cancellled) {setIsLoading(false)}
            }
        }
        
        fetchData()
        return ()=>{
            cancellled=true;
        }
    },[])
    return {data,isLoading,error}
    
}