import httpStatus from "http-status-codes";
import { Request, Response } from "express";
import mongoose from "mongoose";
import catchAsync from "../utils/catchAsync";
import ApiError from "../errors/ApiError";
import pick from "../utils/pick";
import { IOptions } from "../paginate/paginate";
import * as todoService from "./todo.service";

export const createTodo = catchAsync(async (req: Request, res: Response) => {
  req.body.user = req.user["_id"];
  const todo = await todoService.createTodo(req.body);
  res.status(httpStatus.CREATED).send(todo);
});

export const getTodos = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ["title", "completed", "user"]);
  const options: IOptions = pick(req.query, [
    "sortBy",
    "limit",
    "page",
    "projectBy",
  ]);
  filter.user = req.user["_id"].toString();
  const result = await todoService.queryTodos(filter, options);
  res.send(result);
});

export const getTodo = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params["todoId"] === "string") {
    const todo = await todoService.getTodoByIdAndUser(
      new mongoose.Types.ObjectId(req.params["todoId"]),
      req.user["_id"]
    );
    if (!todo) {
      throw new ApiError(httpStatus.NOT_FOUND, "Todo not found");
    }
    res.send(todo);
  }
});

export const updateTodo = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params["todoId"] === "string") {
    const todoExist = await todoService.getTodoByIdAndUser(
      new mongoose.Types.ObjectId(req.params["todoId"]),
      req.user["_id"]
    );
    if (!todoExist) {
      throw new ApiError(httpStatus.NOT_FOUND, "Todo not found");
    }
    const todo = await todoService.updateTodoById(
      new mongoose.Types.ObjectId(req.params["todoId"]),
      req.body
    );
    res.send(todo);
  }
});

export const deleteTodo = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params["todoId"] === "string") {
    const todoExist = await todoService.getTodoByIdAndUser(
      new mongoose.Types.ObjectId(req.params["todoId"]),
      req.user["_id"]
    );
    if (!todoExist) {
      throw new ApiError(httpStatus.NOT_FOUND, "Todo not found");
    }
    await todoService.deleteTodoById(
      new mongoose.Types.ObjectId(req.params["todoId"])
    );
    res.status(httpStatus.NO_CONTENT).send();
  }
});
