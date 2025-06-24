"use server"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

// This is a way using which we can use a server side method in a client side page. We'll use it now.

export const deleteSnippet = async (id:number)=>{
    await prisma.snippet.delete({
        where:{id}
    })

    redirect("/")
} 