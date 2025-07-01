import React from "react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

type snippetType = {
params:Promise<{id:string}>
}

const editSnippetPage = async ({params}: snippetType) => {
  const id = parseInt((await params).id);

  const snippet = await prisma.snippet.findUnique({
    where: {
      id,
    },
  });


  if (!snippet) {
    return (
      <div className="container mx-auto max-w-2xl p-5">
        <h1 className="text-4xl">Snippet not found</h1>
      </div>
    );
  }

  // console.log("id", id);


  const handleEditCode = async(formData: FormData) => {
    "use server"; 

    const code = formData.get("code") as string; // Getting the code from the formdata.

    const updatedSnippet  = await prisma.snippet.update({
        where:{
            id:id,
        }, 
        data:{code:code},              
    }) 
    // Updating the code in the snippet object.

    // revalidatePath(`/snippet/${id}`);  
    // console.log("snippet", updatedSnippet);
    redirect('/'); // Redirecting to the home page after editing the code.
  }


  return (
    <div className="container mx-auto max-w-2xl p-5 bg-white shadow-md rounded-md">
        <h1 className="text-4xl text-center mb-5">Edit your code!</h1>
      <form action={handleEditCode}>
        <div className="flex gap-x-2 mb-5">
        <Label>Title: </Label>
        <Input type="text" readOnly value={snippet.title}/>
        </div>
        
        <div className="flex gap-x-2">
            <Label>Code:</Label>
            <Textarea name="code" id="code" className="bg-gray-900 text-green-300 font-mono text-sm p-4 rounded-lg overflow-x-auto mt-4 shadow-md"
            defaultValue={snippet.code} ></Textarea>
        </div>
        <Button className="mt-5 justify-center cursor-pointer items-center" type="submit" variant={"default"}>Save</Button>
      </form>
          
    </div>
  );
};

export default editSnippetPage;
