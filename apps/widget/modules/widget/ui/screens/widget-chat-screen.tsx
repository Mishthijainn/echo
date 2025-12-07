"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import {z} from "zod"
import { useForm } from "react-hook-form"
import { useAtomValue, useSetAtom } from "jotai"
import { contactSessionIdAtomFamily, conversationIdAtom, organizationIdAtom, screenAtom, widgetSettingAtom } from "../../atoms/widget-atoms"
import {useInfiniteScroll} from "@workspace/ui/hooks/use-infinite-scroll"
import {InfiniteScrollTrigger} from "@workspace/ui/components/infinite-scroll-trigger"
import { WidgetHeader } from "../components/widget-header"
import { Button } from "@workspace/ui/components/button"
import { ArrowLeftIcon, MenuIcon } from "lucide-react"
import { useAction, useQuery } from "convex/react"
import {useThreadMessages,toUIMessages} from "@convex-dev/agent/react"
import { api } from "@workspace/backend/_generated/api"
import {DicebearAvatar} from "@workspace/ui/components/dicebear-avatar"
import {
    AIConversation,
    AIConversationContent,
    AIConversationScrollButton
} from "@workspace/ui/components/ai/conversation"
import{
    AIInput,
    AIInputSubmit,
    AIInputTextarea,
    AIInputToolbar,
    AIInputTools
} from "@workspace/ui/components/ai/input"
import{
    AIMessage,
    AIMessageContent
} from "@workspace/ui/components/ai/message"
import {AIResponse} from "@workspace/ui/components/ai/response"
import{
    AISuggestion,AISuggestions
} from "@workspace/ui/components/ai/suggestion"
import { Form, FormField } from "@workspace/ui/components/form"
import { useMemo } from "react"
const formSchema=z.object({
    message:z.string().min(1,"Message is required")
})
export const WidgetChatScreen=()=>{
    const setScreen=useSetAtom(screenAtom)
    const widgetSettings=useAtomValue(widgetSettingAtom)
    const setConversationId=useSetAtom(conversationIdAtom)
    const conversationId=useAtomValue(conversationIdAtom)
    const organizationId=useAtomValue(organizationIdAtom)
    const contactSessionId=useAtomValue(contactSessionIdAtomFamily(organizationId || ""))
    const conversation=useQuery(api.public.conversations.getOne,
        conversationId && contactSessionId?{
            conversationId,
            contactSessionId
        }:"skip"
    )
    const messages=useThreadMessages(
        api.public.messages.getMany,conversation?.threadId && contactSessionId?{
            threadId:conversation.threadId,
            contactSessionId
        }:"skip",
        {initialNumItems:10}
    )
    const {topElementRef,handleLoadMore,canLoadMore,isLoadingMore}=useInfiniteScroll({
        status:messages.status,
        loadMore:messages.loadMore,
        loadSize:10
    })
    type FormValues = z.infer<typeof formSchema>;

        const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: "",
        },
        }); 

    const createMessage=useAction(api.public.messages.create)
    const onSubmit=async (values:z.infer<typeof formSchema>)=>{
        if(!conversation || !contactSessionId){
            return
        }
        form.reset()
        await createMessage({
            threadId:conversation.threadId,
            prompt:values.message,
            contactSessionId:contactSessionId
        })
    }
    const onBack= ()=>{
        setConversationId(null)
        setScreen("selection")
    }
    const suggestions=useMemo(()=>{
        if(!widgetSettings){
            return [];
        }
        return Object.keys(widgetSettings.defaultSuggestions).map((key)=>{
            return widgetSettings.defaultSuggestions[
                key as keyof typeof widgetSettings.defaultSuggestions
            ]
        })
    },[widgetSettings])

    return(
        <>
        <WidgetHeader className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
                    <Button size="icon" variant="transparent" onClick={onBack}>
                        <ArrowLeftIcon></ArrowLeftIcon>
                    </Button>
                    <p>Chat</p>
                </div>
                <Button size="icon" variant="transparent">
                    <MenuIcon></MenuIcon>
                </Button>
        </WidgetHeader>
        <AIConversation>
            <AIConversationContent>
                <InfiniteScrollTrigger canLoadMore={canLoadMore}
                isLoadingMore={isLoadingMore}
                onLoadMore={handleLoadMore}
                ref={topElementRef}
                ></InfiniteScrollTrigger>
                {toUIMessages(messages.results ?? [])?.map((message)=>{
                    return(
                        <AIMessage from ={message.role==="user"?"user":"assistant"} key={message.id}>
                            <AIMessageContent>
                                <AIResponse>{message.content}</AIResponse>
                            </AIMessageContent>
                            {message.role==="assistant" && (
                                <DicebearAvatar imageUrl="/logo.svg"
                                seed="assistant" 
                                size={32}
                                >

                                </DicebearAvatar>
                            )}
                        </AIMessage>
                    )
                })}
            </AIConversationContent>
        </AIConversation>
        {toUIMessages(messages.results??[])?.length===1 &&(
        <AISuggestions classname="flex w-full flex-col items-end p-3">
            {suggestions.map((suggestion)=>{
                if(!suggestion){
                    return null
                }
                return(
                    <AISuggestion key={suggestion} onClick={()=>{
                        form.setValue("message",suggestion,{
                            shouldValidate:true,
                            shouldDirty:true,
                            shouldTouch:true,
                        })
                        form.handleSubmit(onSubmit)()
                    }} suggestion={suggestion}>

                    </AISuggestion>
                )
            })}
        </AISuggestions>)}
        <Form {...form}>
            <AIInput className="rounded-none border-x-0 border-b-0"
            onSubmit={form.handleSubmit(onSubmit)}>
                <FormField control={form.control}
                disabled={conversation?.status==="resolved"}
                name="message"
                render={({field})=>{
                    return (<AIInputTextarea disabled={conversation?.status==="resolved"}
                    onChange={field.onChange}
                    onKeyDown={(e)=>{
                        if(e.key==='Enter' && !e.shiftKey){
                            e.preventDefault();
                            form.handleSubmit(onSubmit)()
                        }
                    }}
                    placeholder={
                        conversation?.status==="resolved"?"This conversation has been resolved":"Type your message"
                    }
                    value={field.value}
                    >

                    </AIInputTextarea>
                    )
                }}
                ></FormField>
                <AIInputToolbar>
                    <AIInputTools>
                    </AIInputTools>
                    <AIInputSubmit disabled={conversation?.status==="resolved" || !form.formState.isValid}
                    status="ready"
                    type="submit"
                    ></AIInputSubmit>
                </AIInputToolbar>
            </AIInput>
        </Form>
        </>
    )
}