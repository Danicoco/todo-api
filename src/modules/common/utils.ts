import { AppError, CreateErr } from "../../types";
import { validationResult } from "express-validator";
import { NextFunction, Response, Request } from "express";


export const catchError: CreateErr = (
  message,
  code = 403,
  validations = null
) => {
  const err = new Error(message);
  // @ts-ignore
  err.code = code;
  // @ts-ignore
  err.validations = validations;
  return err;
};

export const success = (msg: string, data: any, meta?: object) => ({
  data,
  status: true,
  message: msg,
  ...(meta && { meta }),
});

export function errorHandler(
  error: AppError,
  _req: any,
  res: Response,
  _next: any
) {
  try {
    if (error.validations) {
      return res.status(422).json({
        status: false,
        message: "All fields are required",
        data: error.validations,
      });
    }

    const code = error.code || 500;
    const msg = error.message;

    console.log(error.name || "Error", error.message);

    return res.status(code || 500).json({ status: false, message: msg });
  } catch (e) {
    return res.status(500).json({ status: false });
  }
}

export const validate = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    const error = errors.array({ onlyFirstError: true })[0].msg as string;
    const position = errors.array({ onlyFirstError: true })[0].param as string;
    const extractedError = error.includes("Invalid value")
      ? `${error} at ${position}`
      : error;

    throw catchError(extractedError, 400);
  } catch (e) {
    return next(e);
  }
};
