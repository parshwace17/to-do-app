import Joi from "joi";
import { objectId } from "../validate/custom.validation";
import { NewCreatedTodo } from "./todo.interfaces"; // Adjust the path as necessary

const createTodoBody: Record<keyof NewCreatedTodo, any> = {
  title: Joi.string().required(),
  description: Joi.string().required(),
  dueDate: Joi.date().required(),
  user: Joi.string().custom(objectId).required(), // Assuming user is an ObjectId reference
};

export const createTodo = {
  body: Joi.object().keys(createTodoBody),
};

export const getTodos = {
  query: Joi.object().keys({
    title: Joi.string(),
    completed: Joi.boolean(),
    user: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getTodo = {
  params: Joi.object().keys({
    todoId: Joi.string().custom(objectId), // Assuming you are using `todoId` for the parameter
  }),
};

export const updateTodo = {
  params: Joi.object().keys({
    todoId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      description: Joi.string(),
      dueDate: Joi.date(),
      completed: Joi.boolean(),
    })
    .min(1), // At least one field should be present for update
};

export const deleteTodo = {
  params: Joi.object().keys({
    todoId: Joi.string().custom(objectId).required(),
  }),
};
