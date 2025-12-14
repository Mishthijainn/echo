"use client"

import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { InboxIcon, LibraryBigIcon, PaletteIcon, PhoneIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export const DashboardView = () => {
    return (
        <div className="flex h-full flex-1 flex-col gap-y-4 bg-muted p-8">
            <div className="mx-auto w-full max-w-4xl">
                <div className="mb-8 flex items-center gap-x-2">
                    <Image alt="Logo" height={40} width={40} src="/logo.svg" />
                    <h1 className="text-3xl font-bold">Welcome to Echo</h1>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <InboxIcon className="size-5" />
                                Conversations
                            </CardTitle>
                            <CardDescription>
                                View and manage all your customer conversations
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild>
                                <Link href="/conversations">Go to Conversations</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <LibraryBigIcon className="size-5" />
                                Knowledge Base
                            </CardTitle>
                            <CardDescription>
                                Upload and manage your documentation for AI training
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild variant="outline">
                                <Link href="/files">Manage Files</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <PaletteIcon className="size-5" />
                                Customization
                            </CardTitle>
                            <CardDescription>
                                Customize your widget appearance and settings
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild variant="outline">
                                <Link href="/customization">Customize Widget</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <PhoneIcon className="size-5" />
                                Integrations
                            </CardTitle>
                            <CardDescription>
                                Set up integrations and embed the chat widget
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild variant="outline">
                                <Link href="/integrations">View Integrations</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

