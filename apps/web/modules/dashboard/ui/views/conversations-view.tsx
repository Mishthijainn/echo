"use client"

import Image from "next/image"
import { Button } from "@workspace/ui/components/button"
import { InboxIcon } from "lucide-react"
import Link from "next/link"

export const ConversationsView = () => {
    return (
        <div className="flex h-full flex-1 flex-col gap-y-4 bg-muted">
            <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
                <div className="flex items-center gap-x-2">
                    <Image alt="Logo" height={48} width={48} src="/logo.svg" />
                    <p className="font-semibold text-2xl">Echo</p>
                </div>
                <div className="flex flex-col items-center gap-4 text-center">
                    <InboxIcon className="size-12 text-muted-foreground" />
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold">No conversations yet</h2>
                        <p className="text-muted-foreground max-w-md">
                            When customers start chatting with your AI assistant, their conversations will appear here.
                        </p>
                    </div>
                    <Button asChild className="mt-4">
                        <Link href="/integrations">Set up Integration</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}