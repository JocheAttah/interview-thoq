"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import Router
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { ITask } from "@/types";
import TaskForm from "@/components/TaskForm";

const fetchTasks = async (): Promise<ITask[]> => {
  const { data } = await api.get("/tasks");
  return data;
};

// ... deleteTask and toggleTask functions stay the same ...
const deleteTask = async (id: string) => {
  await api.delete(`/tasks/${id}`);
};

const toggleTask = async ({
  id,
  isCompleted,
}: {
  id: string;
  isCompleted: boolean;
}) => {
  await api.put(`/tasks/${id}`, { isCompleted: !isCompleted });
};

export default function Home() {
  const router = useRouter(); // Initialize Router
  const queryClient = useQueryClient();

  // 1. Redirect if no token found
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  // 2. Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
    retry: false, // Don't retry if it's a 401 error
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const toggleMutation = useMutation({
    mutationFn: toggleTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  return (
    <main className="max-w-4xl mx-auto p-10">
      {/* Header with Logout */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">Task Manager</h1>
        <button
          onClick={handleLogout}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Logout
        </button>
      </div>

      <TaskForm />

      {isLoading && <div>Loading tasks...</div>}

      {/* If error is 401, the interceptor will handle redirect, but we can show a message */}
      {isError && <div className="text-red-500">Error: {error.message}</div>}

      <div className="space-y-4">
        {data?.map((task) => (
          <div
            key={task._id}
            className={`flex justify-between items-center p-4 border rounded shadow-sm ${
              task.isCompleted ? "bg-green-50 border-green-200" : "bg-white"
            }`}
          >
            <div>
              <h3
                className={`font-bold text-lg ${task.isCompleted ? "line-through text-gray-500" : "text-black"}`}
              >
                {task.title}
              </h3>
              <p className="text-gray-600">{task.description}</p>
              {/* ... Priority badge ... */}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() =>
                  toggleMutation.mutate({
                    id: task._id,
                    isCompleted: task.isCompleted,
                  })
                }
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                {task.isCompleted ? "Undo" : "Done"}
              </button>

              <button
                onClick={() => {
                  if (confirm("Are you sure?")) deleteMutation.mutate(task._id);
                }}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {data?.length === 0 && (
          <p className="text-center text-gray-500">No tasks found.</p>
        )}
      </div>
    </main>
  );
}
