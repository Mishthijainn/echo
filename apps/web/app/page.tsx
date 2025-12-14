import { HomePageView } from "@/modules/homepage/ui/views/homepage-view"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"

export default async function Page() {
    const { userId } = await auth()

    // If user is authenticated, redirect to dashboard
    if (userId) {
        redirect("/conversations")
    }

    return <HomePageView />
}

