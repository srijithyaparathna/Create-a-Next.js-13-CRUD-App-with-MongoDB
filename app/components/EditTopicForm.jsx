"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditTopicForm({ id, title, description }) {
  const [newTitle, setNewTitle] = useState(title);  // Keep track of newTitle
  const [newDescription, setNewDescription] = useState(description);  // Keep track of newDescription

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const body = { title: newTitle, description: newDescription };  // Use newTitle and newDescription
  
    console.log(body, "body");  // Log the request body to check the values before sending
  
    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),  // Send the correct body with updated values
      });
  
      if (!res.ok) {
        throw new Error("Failed to update topic");
      }
  
      router.refresh();  // Refresh the current page
      router.push("/");  // Redirect to home page after updating
    } catch (error) {
      console.log(error);  // Log errors if any
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      
      {/* Display the ID */}
      <h2 className="text-lg font-semibold">Topic ID: {id}</h2>

      <input
        onChange={(e) => setNewTitle(e.target.value)}  // Update the state when input changes
        value={newTitle}  // Bind the state to the input value
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Title"
      />

      <input
        onChange={(e) => setNewDescription(e.target.value)}  // Update the state when input changes
        value={newDescription}  // Bind the state to the input value
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Description"
      />

      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Update Topic
      </button>
    </form>
  );
}
