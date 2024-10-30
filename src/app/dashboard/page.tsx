"use client"
import User from "@/models/user";
import { signOut, useSession } from "next-auth/react";

function DashboardPage() {
  const { data: session, status } = useSession()

  return (
    <div className="justify-center h-[calc(100vh-4rem)] flex flex-col gap-y-5 items-center">
      <h1 className="font-bold text-3xl">Profile</h1>
      <pre className="text-zinc-800 whitespace-normal mx-60 p-4">
        {
          JSON.stringify({
            session, status
          })
        }
      </pre>
    </div>
  )
}
export default DashboardPage;