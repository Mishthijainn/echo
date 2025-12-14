"use client"

import { api } from "@workspace/backend/_generated/api"
import { useQuery } from "convex/react"
import { Loader2Icon, PaletteIcon, SparklesIcon } from "lucide-react"
import { CustomizationForm } from "../components/customization-form"

export const CustomizationView = () => {
    const widgetSettings = useQuery(api.private.widgetSettings.getOne)
    const vapiPlugin = useQuery(api.private.plugins.getOne, { service: "vapi" })
    const isLoading = widgetSettings === undefined || vapiPlugin === undefined

    if (isLoading) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-y-4 bg-muted p-8">
                <div className="flex flex-col items-center gap-3">
                    <Loader2Icon className="size-8 animate-spin text-primary" />
                    <p className="text-muted-foreground text-sm font-medium">Loading customization settings...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen flex-col bg-muted p-6 md:p-8">
            <div className="mx-auto w-full max-w-3xl">
                <div className="mb-8 space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                            <PaletteIcon className="size-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Widget Customization</h1>
                            <p className="mt-1 text-muted-foreground">
                                Customize how your chat widget looks and behaves for your customers
                            </p>
                        </div>
                    </div>
                </div>
                <div className="animate-in fade-in-50 slide-in-from-bottom-4 duration-300">
                    <CustomizationForm
                        initialData={widgetSettings}
                        hasVapiPlugin={!!vapiPlugin}
                    />
                </div>
            </div>
        </div>
    )
}