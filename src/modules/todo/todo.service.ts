import httpStatus from "http-status-codes";
import mongoose from "mongoose";
import Todo from "./todo.model"; // Adjust the import path as needed
import ApiError from "../errors/ApiError";
import { IOptions, QueryResult } from "../paginate/paginate";
import { NewCreatedTodo, ITodoDoc } from "./todo.interfaces"; // Adjust the import paths as needed

/**
 * Create a todo
 * @param {NewCreatedTodo} todoBody
 * @returns {Promise<ITodoDoc>}
 */
export const createTodo = async (
  todoBody: NewCreatedTodo
): Promise<ITodoDoc> => {
  return Todo.create(todoBody);
};

/**
 * Query for todos
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryTodos = async (
  filter: Record<string, any>,
  options: IOptions
): Promise<QueryResult> => {
  const todos = await Todo.paginate(filter, options);
  return todos;
};

/**
 * Get todo by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<ITodoDoc | null>}
 */
export const getTodoById = async (
  id: mongoose.Types.ObjectId
): Promise<ITodoDoc | null> => {
  return Todo.findById(id);
};

/**
 * Update todo by id
 * @param {mongoose.Types.ObjectId} todoId
 * @param {Partial<ITodoDoc>} updateBody
 * @returns {Promise<ITodoDoc | null>}
 */
export const updateTodoById = async (
  todoId: mongoose.Types.ObjectId,
  updateBody: Partial<ITodoDoc>
): Promise<ITodoDoc | null> => {
  const todo = await getTodoById(todoId);
  if (!todo) {
    throw new ApiError(httpStatus.NOT_FOUND, "Todo not found");
  }
  Object.assign(todo, updateBody);
  await todo.save();
  return todo;
};

/**
 * Delete todo by id
 * @param {mongoose.Types.ObjectId} todoId
 * @returns {Promise<ITodoDoc | null>}
 */
export const deleteTodoById = async (
  todoId: mongoose.Types.ObjectId
): Promise<ITodoDoc | null> => {
  const todo = await getTodoById(todoId);
  if (!todo) {
    throw new ApiError(httpStatus.NOT_FOUND, "Todo not found");
  }
  await todo.deleteOne();
  return todo;
};
