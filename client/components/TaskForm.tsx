"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");

  // 1. Get the QueryClient
  // We need this to tell React Query "The data has changed!"
  const queryClient = useQueryClient();

  // 2. Define the Mutation
  const mutation = useMutation({
    mutationFn: async (newTask: {
      title: string;
      description: string;
      priority: string;
    }) => {
      // This sends the POST request
      return await api.post("/tasks", newTask);
    },
    onSuccess: () => {
      // 3. The Magic: Invalidate the 'tasks' query
      // This forces the list to auto-refresh immediately
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      // Clear the form
      setTitle("");
      setDescription("");
      setPriority("Medium");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger the mutation
    mutation.mutate({ title, description, priority });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 p-4 border rounded bg-gray-50 text-black"
    >
      <h2 className="text-lg font-bold mb-4">Add New Task</h2>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <textarea
        placeholder="Description (Optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      <button
        type="submit"
        disabled={mutation.isPending} // Disable button while loading
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {mutation.isPending ? "Adding..." : "Add Task"}
      </button>

      {mutation.isError && (
        <p className="text-red-500 mt-2">Error adding task</p>
      )}
    </form>
  );
}
