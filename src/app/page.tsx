import { Button } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const snippets = await prisma.snippet.findMany();
  if (!snippets || snippets.length === 0) {
  }

  return (
    <div>
      <div className="flex items-center justify-between">
      <h1 className="text-4xl">My Snippets</h1>
        <Button>
          <Link href="/snippet/new">New</Link>
        </Button>
      </div>
      {snippets.map((snippet) => (
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
