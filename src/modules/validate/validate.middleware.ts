import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import pick from "../utils/pick";
import ApiError from "../errors/ApiError";

const validate =
  (schema: Record<string, Joi.Schema>) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const validSchema = pick(schema, ["params", "query", "body"]);

    // Cast req to Record<string, unknown> to satisfy the pick function
    const object = pick(
      req as unknown as Record<string, unknown>,
      Object.keys(validSchema)
    );

    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: "key" } })
      .validate(object);

    if (error) {
      const errorMessage = error.details
        .map((details) => details.message)
        .join(", ");
      return next(new ApiError(StatusCodes.BAD_REQUEST, errorMessage));
    }

    Object.assign(req, value);
    return next();
  };

export default validate;
