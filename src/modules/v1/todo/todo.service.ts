import { ITodo } from "../../../types";
import db from "../../../../databases";
import { catchError } from "../../common/utils";
import ErrorCodes from "../../common/errorCode";

class TodoService {
  private model = db.todo;

  private id: string;

  constructor(id = "") {
    this.id = id;
  }

  public async create(params: ITodo) {
    const todo = await this.model.create(params).catch((e) => {
      throw e;
    });
    return todo;
  }

  public async findOne() {
    const todo = await this.model.findById(this.id).catch((e) => {
      throw e;
    });
    return todo;
  }

  public async updateTask(params: Partial<ITodo>) {
    const todo = await this.findOne().catch((e) => {
      throw e;
    });
    if (!todo) throw catchError(ErrorCodes.NotFound());

    todo.updateOne({ ...params }, { new: true }).catch((e) => {
      throw e;
    });

    return todo;
  }

  public async toggleComplete() {
    const todo = await this.findOne().catch((e) => {
      throw e;
    });
    if (!todo) throw catchError(ErrorCodes.NotFound());

    todo
      .updateOne({ isActive: false, status: "completed" }, { new: true })
      .catch((e) => {
        throw e;
      });

    return todo;
  }

  public async deleteTask() {
    const todo = await this.findOne().catch((e) => {
      throw e;
    });
    if (!todo) throw catchError(ErrorCodes.NotFound());

    if (todo.status !== "pending") throw catchError(ErrorCodes.NotAllowed());

    todo.delete().catch((e) => {
      throw e;
    });

    return todo;
  }

  public async findAll(page: number, limit: number) {
    const todos = await this.model
      .find({})
      .sort("-createdAt")
      .limit(limit)
      .skip(limit * (page - 1))
      .catch((e) => {
        throw e;
      });

    return todos;
  }

  public async count() {
    const docsCount = await this.model.countDocuments({}).catch((e) => {
      throw e;
    });

    return docsCount;
  }
}

export default TodoService;
