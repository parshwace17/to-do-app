import Joi from "joi";
import { password, objectId } from "../validate/custom.validation";
import { NewCreatedUser } from "./user.interfaces";

const createUserBody: Record<keyof NewCreatedUser, any> = {
  email: Joi.string().required().email(),
  password: Joi.string().required().custom(password),
};

export const createUser = {
  body: Joi.object().keys(createUserBody),
};

export const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};
