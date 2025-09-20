"use client"
import { useAtomValue, useSetAtom } from "jotai"
import {  ChevronRightIcon, MessageSquareTextIcon } from "lucide-react"
import {contactSessionIdAtomFamily, conversationIdAtom, errorMessageAtom, organizationIdAtom, screenAtom } from "../../atoms/widget-atoms"
import { WidgetHeader } from "../components/widget-header"
import { Button } from "@workspace/ui/components/button"
import { useMutation } from "convex/react"
import { api } from "@workspace/backend/_generated/api"
import { useState } from "react"
export const WidgetSelectionScreen=()=>{
    const setScreen=useSetAtom(screenAtom)
    const organizationId=useAtomValue(organizationIdAtom)
    const contactSessionId=useAtomValue(contactSessionIdAtomFamily(organizationId || ""))
    const setErrorMessage=useSetAtom(errorMessageAtom)
    const createConversation=useMutation(api.public.conversations.create)
    const [isPending,setIsPending]=useState(false)
    const setConversationId=useSetAtom(conversationIdAtom)
    const handleNewConversations= async()=>{
        if(!organizationId){
            setScreen("error")
            setErrorMessage("Missing Organization ID")
            return
        }
        if(!contactSessionId){
            setScreen("auth")
            return
        }
        setIsPending(true)
        try{
            const conversationId=await createConversation({
                contactSessionId,
                organizationId
            })
            setConversationId(conversationId)
            setScreen("chat")
        }catch{
            setScreen("auth")

        }finally{
            setIsPending(false)
        }
    }
    return(
        <>
        <WidgetHeader>
            <div className="flex flex-col justify-between
                 gap-y-2 px-2 py-6">
                    <p className="font-semibold text-3xl">Hi there!</p>
                    <p className="font-semibold text-lg">Let&apos;s get you started
                    </p>
                </div>
        </WidgetHeader>
        <div className="flex flex-1 flex-col p-4 overflow-y-auto">
            <Button className="h-16 w-full justify-between"
            variant="outline"
            onClick={handleNewConversations}
            disabled={isPending}
            >
                <div className="flex items-center gap-x-2">
                <MessageSquareTextIcon className="size-4"></MessageSquareTextIcon>
                <span>Start Chat</span>
                <ChevronRightIcon></ChevronRightIcon>
                </div>
            </Button>

            
        </div>
        </>
    )
}