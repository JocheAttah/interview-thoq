export interface ITask {
  _id: string; // MongoDB generates this
  title: string;
  description?: string;
  isCompleted: boolean;
  priority: "Low" | "Medium" | "High";
  dueDate?: string; // JSON dates come back as strings
  createdAt: string;
}

export interface CreateTaskDTO {
  title: string;
  description?: string;
  priority: "Low" | "Medium" | "High";
}
