import mongoose, { Document, Schema } from "mongoose";

// 1. The TypeScript Interface
export interface ITask extends Document {
  title: string;
  description?: string;
  isCompleted: boolean;
  priority: "Low" | "Medium" | "High";
  dueDate?: Date;
  createdAt: Date;
  user: mongoose.Schema.Types.ObjectId;
}

// 2. The Mongoose Schema
const TaskSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
    },
    description: {
      type: String,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    dueDate: {
      type: Date,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<ITask>("Task", TaskSchema);
