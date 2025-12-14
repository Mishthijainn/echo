"use client"

import { PricingTable } from "../components/pricing-table"
import { CreditCardIcon } from "lucide-react"

export const BillingView = () => {
    return (
        <div className="flex min-h-screen flex-col bg-muted p-6 md:p-8">
            <div className="mx-auto w-full max-w-screen-lg">
                <div className="mb-8 space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                            <CreditCardIcon className="size-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Plans & Billing</h1>
                            <p className="mt-1 text-muted-foreground">
                                Choose the plan that&apos;s right for you
                            </p>
                        </div>
                    </div>
                </div>
                <div className="animate-in fade-in-50 slide-in-from-bottom-4 duration-300">
                    <PricingTable />
                </div>
            </div>
        </div>
    )
}