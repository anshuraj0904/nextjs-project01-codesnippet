import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CreateSnippetpage = () => {
  return (
    <div className="container bg-white max-h-xl p-5 max-w-2xl items-center mx-auto shadow-md rounded-md">
      <h1 className="text-4xl mb-5 text-center">Snippet</h1>
      <div className="gap-y-5 flex flex-col">
        <div className="flex gap-x-2">
          <Label className="">Title:</Label>
          <Input type="text" name="title" id="title"></Input>
        </div>

        <div className="flex gap-x-2">
          <Label>Code:</Label>
          <Textarea name="code" id="code"></Textarea>
        </div>

        <Button className="max-w-18 cursor-pointer">Create</Button>
      </div>
    </div>
  );
};

export default CreateSnippetpage;
