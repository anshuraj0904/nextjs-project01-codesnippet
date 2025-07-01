import { Button } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

// Making it a dynamic route using disable caching(highly non-recommended):-
// Two ways:-
// 1. Using `force-dynamic`
export const dynamic = "force-dynamic" 
// 2. Using `revalidate: 0
export const revalidate = 0;


export default async function Home() {
  const snippets = await prisma.snippet.findMany();
  if (!snippets || snippets.length === 0) {
    return (
      <div className="container mx-auto p-5">
        <h1 className="text-4xl">No Snippets Found</h1>
        <Button>
          <Link href="/snippet/new">Create a Snippet</Link>
        </Button>
      </div>
    );
  }

  type Snippet = {
    id: number;
    title: string;
  }

  return (
    <div className="container mx-auto p-5">
      <div className="container mx-auto flex items-center justify-between">
      <h1 className="text-4xl">My Snippets</h1>
        <Button>
          <Link href="/snippet/new">New</Link>
        </Button>
      </div>
      {snippets.map((snippet:Snippet) => (
        <div
          key={snippet.id}
          className="bg-white flex justify-between  p-5 my-5 w-6/12 shadow-xl rounded-md"
        >
          <h2 className="text-2xl">{snippet.title}</h2>
          <Link href={`snippet/${snippet.id}`}><Button className="mt-2 hover:text-blue-400 cursor-pointer">View</Button></Link>
        </div>
      ))}
    </div>
  );
}
