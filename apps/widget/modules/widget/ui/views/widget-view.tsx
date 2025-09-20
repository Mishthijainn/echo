"use client"
import { useAtomValue } from "jotai";
import { WidgetFooter } from "../components/widget-footer";
import { WidgetAuthScreen } from "../screens/widget-auth-screen";
import { screenAtom } from "../../atoms/widget-atoms";
import { error } from "console";
import { WidgetErrorScreen } from "../screens/widget-error-screen";
import { WidgetLoadingScreen } from "../screens/widget-loading-screen";
import { WidgetSelectionScreen } from "../screens/widget-selection-screen";
import { WidgetChatScreen } from "../screens/widget-chat-screen";

interface Props{
    organizationId:string | null;
}

export const WidgetView=({organizationId}:Props)=>{
    const screen=useAtomValue(screenAtom)
    const screenComponents={
        error:<WidgetErrorScreen></WidgetErrorScreen>,
        loading:<WidgetLoadingScreen organizationId={organizationId}></WidgetLoadingScreen>,
        auth:<WidgetAuthScreen></WidgetAuthScreen>,
        voice:<p>TODO:Voice</p>,
        inbox:<p>TODO:Inbox</p>,
        selection:<WidgetSelectionScreen></WidgetSelectionScreen>,
        chat:<WidgetChatScreen></WidgetChatScreen>,
        contact:<p>TODO:Contact</p>

    }
    return(
        <main className="min-h-screen min-w-screen flex h-full w-full flex-col overflow-hidden rounded=xl border bg-muted">
            {screenComponents[screen]}
        </main>
    )
}