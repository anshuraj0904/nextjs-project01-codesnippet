"use client";

import React, { useActionState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { prisma } from "@/lib/prisma";
// import { redirect } from "next/navigation";
import * as actions from "@/actions";

const CreateSnippetpage =  () => {

  const [formStateData, updatedAction] = useActionState(actions.snippetCreation,{ message: "" },);
  // Basic syntax of the `useActionState` hook:-
  // const [state, action] = useActionState(actionFunction, initialState);
  // Here, state is the current state of the action(of the initial state) and action is the function that will be called to update the state.
  // Note:- action is function call made fromt eh form, and, actionFunction is the actual function which will do tasks and update the state.
  // So, state -> It is the final/current returned state of initial state.
  // action is used to make the function call from the form, and it will automatically pass the form data to the action function when the form is submitted.
  // actionFunction is the actual function that will handle the form data and update the state.

  // Here, we are using the `useActionState` hook to manage the state of our form submission.
  // Also, we don't need to explicitly pass the code and the title to the action function, as the form data will be automatically passed to the action function when the form is submitted.

  // Here, we'll be using server actions for handling the form data.

  return (
    <div className="container bg-white max-h-xl p-5 max-w-2xl items-center mx-auto shadow-md rounded-md">
      <h1 className="text-4xl mb-5 text-center">Snippet</h1>
      <div className="gap-y-5 flex flex-col">
        <form action={updatedAction} className="flex flex-col gap-y-5">
          <div className="flex gap-x-2">
            <Label className="">Title:</Label>
            <Input type="text" name="title" id="title"></Input>
          </div>

          <div className="flex gap-x-2">
            <Label>Code:</Label>
            <Textarea
              name="code"
              id="code"
              className="bg-gray-900 text-green-300 font-mono text-sm p-4 rounded-lg overflow-x-auto mt-4 shadow-md"
            ></Textarea>
          </div>
          {formStateData.message && (
            <div className="p-2 text-red-500 border-red-800">
              {formStateData.message}
            </div>
          )}
          <Button className="max-w-18 cursor-pointer" type="submit">
            Create
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateSnippetpage;
