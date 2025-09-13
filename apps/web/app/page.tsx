"use client";
import { Authenticated, Unauthenticated } from "convex/react";
import {useMutation, useQuery} from "convex/react"
import {api} from "@workspace/backend/_generated/api"
import {Button} from "@workspace/ui/components/button"
import { SignInButton, UserButton } from "@clerk/nextjs";
export default function Page() {
  const users=useQuery(api.users.getMany);
  const addUser=useMutation(api.users.add)
  return (
    <>
    <Authenticated>
    <div className="flex items-center justify-center min-h-svh">
      <UserButton></UserButton>
      <Button onClick={()=> addUser()}>Add</Button>
      <p>web/app</p>
    </div>
    </Authenticated>
    <Unauthenticated>
      <p>Must be signed in!</p>

      <SignInButton>Sign In</SignInButton>
      </Unauthenticated>
    </>
  )
}