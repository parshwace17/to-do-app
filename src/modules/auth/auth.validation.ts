import Joi from "joi";
import { password } from "../validate/custom.validation";
import { IUser } from "../user/user.interfaces";

const registerBody: Record<keyof IUser, any> = {
  email: Joi.string().required().email(),
  password: Joi.string().required().custom(password),
};

export const register = {
  body: Joi.object().keys(registerBody),
};

export const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

export const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

export const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};
