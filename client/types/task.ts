export interface ITask {
  _id?: string; // Optional because we don't have an ID before saving to DB
  title: string; // Must be text
  description?: string; // Optional text
  isCompleted: boolean; // Must be true/false
  createdAt?: string;
}
