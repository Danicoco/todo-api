import TodoService from "./todo.service";
import ErrorCodes from "../../common/errorCode";
import { catchError, success } from "../../common/utils";
import { Request, Response, NextFunction } from "express";

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description, endAt, startAt } = req.body;
  try {
    const todo = await new TodoService()
      .create({
        title,
        endAt,
        startAt,
        description,
        isActive: true,
        status: "pending",
      })
      .catch(() => {
        throw catchError("Error processing request", 500);
      });

    return res.status(201).json(success("Todo successfully created", todo));
  } catch (error) {
    next(error);
  }
};

export const editTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    body: { title, description, endAt, startAt },
    params: { taskId },
  } = req;
  try {
    const todo = await new TodoService(taskId)
      .updateTask({
        title,
        description,
        endAt,
        startAt,
      })
      .catch((e) => {
        throw catchError(
          e === ErrorCodes.NotFound()
            ? "Cannot edit invalid todo"
            : "Error processing your request"
        );
      });

    return res.status(200).json(success("Todo successfully updated", todo));
  } catch (error) {
    next(error);
  }
};

export const markComplete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { taskId } = req.params;
  try {
    const todo = await new TodoService(taskId).toggleComplete().catch(() => {
      throw catchError("Error processing your request", 500);
    });

    return res.status(200).json(success("Task marks as complete", todo));
  } catch (error) {
    next(error);
  }
};

export const deletePendingTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    params: { taskId },
  } = req;
  try {
    const todo = await new TodoService(taskId).deleteTask().catch((e) => {
      throw catchError(
        (e.message === ErrorCodes.NotFound() && "Cannot delete invalid post") ||
          (e.message === ErrorCodes.NotAllowed() &&
            "Cannot delete task that's not pending") ||
          "Error processing your request", 500
      );
    });

    return res.status(200).json(success("Task deleted successfully", todo));
  } catch (error) {
    next(error);
  }
};

export const retrieveAllTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    query: { page, limit },
  } = req;
  try {
    const todos = await new TodoService()
      .findAll(Number(page), Number(limit))
      .catch(() => {
        throw catchError("Error procesing your request");
      });

    return res.status(200).json(
      success("Todos retrieved", todos, {
        pagination: {
          prev: Number(page) === 1 ? null : Number(page) - Number(limit),
          next:
            todos?.length !== Number(limit)
              ? null
              : Number(page) + Number(limit),
        },
      })
    );
  } catch (error) {
    next(error);
  }
};
