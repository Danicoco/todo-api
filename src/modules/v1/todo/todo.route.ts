import {
  editTask,
  createTask,
  markComplete,
  retrieveAllTask,
  deletePendingTask,
} from "./todo.controller";
import { Router } from "express";
import { validate } from "../../common/utils";
import { createTaskRule, mongoIdRule, updateTaskRule } from "./todo.validation";

const todoRouter = Router();

todoRouter.route("/").post(createTaskRule(), validate, createTask).get(retrieveAllTask);

todoRouter
  .route("/:taskId")
  .put(updateTaskRule(), validate, editTask)
  .patch(mongoIdRule('mark complete'), validate, markComplete)
  .delete(mongoIdRule('delete'), validate, deletePendingTask);

export default todoRouter;
