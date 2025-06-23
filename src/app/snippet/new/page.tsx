import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";


const CreateSnippetpage = () => {

  // Here, we'll be using server actions for handling the form data.
  async function snippetCreation(formData: FormData){
    "use server"; // Using this here to indicate that this function is a server action.

    //Getting the title and the code from the formdata:-
    const title = formData.get("title") as string;  // "title", as the name of title is title.
    const code = formData.get("code") as string;  // as string is the type assertion, as it'll not take anything other than string, so, null or undefined will not be accepted.

    const snippet = await  prisma.snippet.create({
      data:{
        title:title,
        code:code
      }
    })

    console.log(snippet)

    // After creating it, we'll redirect the user to the home page.
    redirect("/");
 }

  return (
    <div className="container bg-white max-h-xl p-5 max-w-2xl items-center mx-auto shadow-md rounded-md">
      <h1 className="text-4xl mb-5 text-center">Snippet</h1>
      <div className="gap-y-5 flex flex-col">
        <form action={snippetCreation} className="flex flex-col gap-y-5">

        <div className="flex gap-x-2">
          <Label className="">Title:</Label>
          <Input type="text" name="title" id="title"></Input>
        </div>

        <div className="flex gap-x-2">
          <Label>Code:</Label>          
          <Textarea name="code" id="code" className="bg-gray-900 text-green-300 font-mono text-sm p-4 rounded-lg overflow-x-auto mt-4 shadow-md"></Textarea>
        </div>

        <Button className="max-w-18 cursor-pointer" type="submit">Create</Button>
        </form>
      </div>
    </div>
  );
};

export default CreateSnippetpage;
