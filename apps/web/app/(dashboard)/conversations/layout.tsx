import { ConversationLayout } from "@/modules/dashboard/ui/layouts/conversations-layout";
export const Layout=({
    children
}:{children:React.ReactNode})=>{
    return <ConversationLayout>{children}</ConversationLayout>
}
export default Layout