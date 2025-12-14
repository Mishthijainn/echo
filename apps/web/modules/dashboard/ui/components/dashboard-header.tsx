"use client"

import { SidebarTrigger } from "@workspace/ui/components/sidebar"

export const DashboardHeader = () => {
    return (
        <header className="flex h-16 items-center gap-4 border-b bg-background px-4">
            <SidebarTrigger />
        </header>
    )
}

