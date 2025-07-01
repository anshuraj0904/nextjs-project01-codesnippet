import { prisma } from "@/lib/prisma";
import React from "react";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import Link from "next/link";
import * as actions from "@/actions"

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

  await new Promise((resolve)=> setTimeout(resolve,2000))
  const snippet = await prisma.snippet.findUnique({
    where: {
      id,
    },
  });


  
  if (!snippet) {
    return (
      notFound()
      // We don't need to pass that as a component, we'll instead pass it as the function call, as it is a pre-defined thing. This here though, will bring the UI created by us in the not-found.tsx, a we've overridden the default one.
    );
  }
  
  const DeleteSnippetAction = actions.deleteSnippet.bind(null, id)
  // Here, in the first argument, we always pass something, whose value can be set after some actions, from the server end, as we don't need anything here, so we're passing null.  
  
  return (
    <div className="container mx-auto max-w-2xl p-5 bg-white shadow-md rounded-md">
      <h1 className="font-bold text-4xl text-center">{snippet.title}</h1>

       <div className="flex gap-x-2 mt-4">
      <Button variant={"outline"} className="cursor-pointer"><Link  href={`/snippet/${snippet.id}/edit`}>Edit</Link></Button>
      <Button variant={"destructive"} className="cursor-pointer" onClick={DeleteSnippetAction}>Delete</Button>
       </div>

      <pre className="bg-gray-900 text-green-300 font-mono text-sm p-4 rounded-lg overflow-x-auto mt-4 shadow-md">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}

export default codeCRUD;


export const generateStaticParams = async () => {
  const snippets = await prisma.snippet.findMany()

  return snippets.map((snippet)=>{
    return{
      id:snippet.id.toString()
    }
  })
}

// This function above is used to generate the static params for the dynamic route. 
// It will generate the static params for all the snippets in the database, so that the pages can be pre-rendered at build time. 
// This is useful for SEO and performance, as it reduces the load time of the page.