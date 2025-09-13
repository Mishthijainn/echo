import Vapi from "@vapi-ai/web"
import { useEffect,useState } from "react"
interface TranscriptMessage{
    role:"user"|"assistant";
    text:string;
}
export const useVapi=()=>{
    const [vapi,setVapi]=useState<Vapi|null>(null);
    const [isConnected,setIsConnected]=useState(false);
    const [isConnecting,setIsConnecting]=useState(false);
    const [isSpeaking,setIsSpeaking]=useState(false);
    const [transcript,setTranscript]=useState<TranscriptMessage[]>([]);
    useEffect(()=>{
        const vapiInstance=new Vapi("d9505bdf-9fca-42e5-9d5b-a98ec6b36aae");
        setVapi(vapiInstance);
        vapiInstance.on("call-start",()=>{
            setIsConnected(true);
            setIsConnecting(true);
            setTranscript([])
        })
        vapiInstance.on("call-end",()=>{
            setIsConnected(false);
            setIsConnecting(false);
            setIsSpeaking(false);
        })
        vapiInstance.on("speech-start",()=>{
            setIsSpeaking(true);
        })
        vapiInstance.on("speech-end",()=>{
            setIsSpeaking(false);
        })
        vapiInstance.on("error",(error)=>{
            console.log(error,"VAPI_ERROR")
            setIsConnected(false);
        })
        vapiInstance.on("message",(message)=>{
            if(message.type==="transacript" && message.transacriptType==="final"){
                setTranscript((prev)=>[
                    ...prev,
                    {
                        role:message.role==="user"?"user":"assistant",
                        text:message.transcript,
                    }
                ])
            }
        })
        return ()=>{
            vapiInstance?.stop()
        }
    },[])

    const startCall=()=>{
        setIsConnecting(true);
        if(vapi){
            vapi.start("cc418cf0-aef4-4402-a5fe-5fd6bcbad3ea")
        }
    }
    const endCall=()=>{
        if(vapi){
            vapi.stop();
        }
    }
    return{
        isSpeaking,
        isConnecting,
        isConnected,
        transcript,
        startCall,
        endCall
    }

}
