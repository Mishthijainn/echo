"use client"
import { useOrganization } from "@clerk/nextjs"
import { OrgSelectView } from "../views/org-select-view";
export const OrganizationGuard=({children}:{children:React.ReactNode;})=>{
    const {organization}=useOrganization()
    if(!organization){
        return(
            <div>
                <OrgSelectView></OrgSelectView>
            </div>
        )
    }
    return(
        <div>
            {children}
        </div>
    )
}