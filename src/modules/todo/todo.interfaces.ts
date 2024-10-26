import mongoose from "mongoose";

// Interface for the Todo document
export interface ITodoDoc extends mongoose.Document {
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  user: mongoose.Types.ObjectId; // Reference to the User model
}
