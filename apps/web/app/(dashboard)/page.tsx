"use client";
import {useMutation, useQuery} from "convex/react"
import {api} from "@workspace/backend/_generated/api"
import {Button} from "@workspace/ui/components/button"
import { OrganizationSwitcher, SignInButton, UserButton } from "@clerk/nextjs";
export default function Page() {
  const users=useQuery(api.users.getMany);
  const addUser=useMutation(api.users.add)
  return (
    <>
    <div className="flex items-center justify-center min-h-svh">
      <UserButton></UserButton>
      <OrganizationSwitcher hidePersonal></OrganizationSwitcher>
      <Button onClick={()=> addUser()}>Add</Button>
      <p>web/app</p>
    </div>
    </>
  )
}