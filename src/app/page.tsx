import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
      <div>
        <h1 className="text-4xl">Home Page</h1>
        <div className="flex items-center justify-between">
           <h1>Snippets</h1>
           <Button><Link href='/snippet/new'>New</Link></Button>
        </div>
      </div>
  );
}
