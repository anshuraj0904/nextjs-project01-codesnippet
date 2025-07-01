"use server"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache" 
// This is used to revalidate the path of the page, so that the changes are reflected on the page without refreshing it. 
// Basically, it is used for on-demand caching.

// This is a way using which we can use a server side method in a client side page. We'll use it now.

export const deleteSnippet = async (id: number) => {
    await prisma.snippet.delete({
        where: { id }
    })
    revalidatePath("/") // for revalidating the home page, so that the deleted snippet is not shown there anymore.
    redirect("/")
}


// Here, we've created a server action for creating a new snippet. We'll use this in the new page, where we'll create a form to create a new snippet.
// Also, the error handling part is taken well care of.
export async function snippetCreation(prevState: { message :string}, formData: FormData) {

    try {
        //Getting the title and the code from the formdata:-
        const title = formData.get("title")
        const code = formData.get("code")

        if (typeof title !== "string" || title.length < 4) {
            return {
                message: "Title must be a string with at least 4 characters."
            }
        }

        if (typeof code !== "string" || code.length < 10) {
            return {
                message: "Code must be a string with at least 10 characters."
            }
        }
       
        let snippet = null
        snippet = await prisma.snippet.create({
            data: {
                title: title,
                code: code
            }
        })

        if(snippet === null) {
            throw new Error("Something went wrong while creating the snippet.")
        }

    } catch (error: unknown) {
    if (error instanceof Error) {
        return { message: error.message };
    }

    // Basically, this error of type Error reaches that error.tsx, and not those others which are described above.

    return { message: "An unknown error occurred." };
}

    revalidatePath("/") // for revalidating the home page, so that the newly created snippet is shown there.
    // After creating it, we'll redirect the user to the home page.
    redirect("/");
}