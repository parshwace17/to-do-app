import mongoose, { Model, Document } from "mongoose";
import { QueryResult } from "../paginate/paginate";

// Define the Todo interface
export interface ITodo {
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  user: mongoose.Types.ObjectId; // Reference to the User model
}

// Extend Document to include methods
export interface ITodoDoc extends ITodo, Document {
  // Add any additional methods specific to the Todo document here
}

// Extend Model to include static methods
export interface ITodoModel extends Model<ITodoDoc> {
  // Add any static methods specific to the Todo model here
  paginate(
    filter: Record<string, any>,
    options: Record<string, any>
  ): Promise<QueryResult>;
}

// Type for creating a new todo (excluding completed)
export type NewCreatedTodo = Omit<ITodo, "completed">;

// Type for updating a todo
export type UpdateTodoBody = Partial<ITodo>;
