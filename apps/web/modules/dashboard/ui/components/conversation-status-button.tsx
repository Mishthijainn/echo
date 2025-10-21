import { Doc } from "@workspace/backend/_generated/dataModel"
import { Button } from "@workspace/ui/components/button"
import { ArrowRightIcon, ArrowUpIcon, CheckIcon } from "lucide-react"
import{Hint} from "@workspace/ui/components/hints"

export const ConversationStatusButton=({
    status,
    onClick,
    disabled
}:{
    status:Doc<"conversations">["status"]
    onClick:()=>void,
    disabled?:boolean
})=>{
    if(status==="resolved"){
        return(
            <Hint text="Mark as unresolved">
                <Button disabled={disabled} onClick={onClick} size="sm" variant="tertiary">
                    <CheckIcon></CheckIcon>
                    Resolved
                </Button>
            </Hint>
        )
    }
    if(status==="escalated"){
        return(
            <Hint text="Mark as resolved">
                <Button disabled={disabled} onClick={onClick} size="sm" variant="warning">
                    <ArrowUpIcon></ArrowUpIcon>
                    Escalated
                </Button>
            </Hint>
        )
    }
    return(
        <Hint text="Mark as escalated">
                <Button onClick={onClick} size="sm" variant="destructive">
                    <ArrowRightIcon></ArrowRightIcon>
                    Unresolved
                </Button>
            </Hint>
    )
}