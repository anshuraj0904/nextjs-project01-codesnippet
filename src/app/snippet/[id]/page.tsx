import { prisma } from "@/lib/prisma";
import React from "react";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import Link from "next/link";

/*
// type snippetDetail = {
//     params:Promise<{id:string}>
// }

--> We can also use this one for the type definition, but it's not necessary as we can directly use the type in the function parameter.
*/

async function codeCRUD(
    
  { params }: { params: Promise<{ id: string }> } // This type is defined. 
) {
  const id = parseInt((await params).id); // Extracting the id from the params.

  const snippet = await prisma.snippet.findUnique({
    where: {
      id,
    },
  });


  const handleDeleteSnippet = async()=>{
    "use server";
    await prisma.snippet.delete({
      where: {
        id,
      },
    });

    redirect("/");
  }

  if (!snippet) {
    return (
      <div className="container mx-auto max-w-2xl p-5">
        <h1 className="text-4xl">Snippet not found</h1>
      </div>
    );
  }
  return (
    <div className="container mx-auto max-w-2xl p-5 bg-white shadow-md rounded-md">
      <h1 className="font-bold text-4xl text-center">{snippet.title}</h1>

       <div className="flex gap-x-2 mt-4">
      <Button variant={"outline"} className="cursor-pointer"><Link  href={`/snippet/${snippet.id}/edit`}>Edit</Link></Button>
      <Button variant={"destructive"} className="cursor-pointer" onClick={handleDeleteSnippet}>Delete</Button>
       </div>

      <pre className="bg-gray-900 text-green-300 font-mono text-sm p-4 rounded-lg overflow-x-auto mt-4 shadow-md">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}

export default codeCRUD;
