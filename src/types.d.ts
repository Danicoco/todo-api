import { Request } from 'express';
import { ObjectId, Document } from 'mongoose';

interface DefaultAttributes {
  _id?: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: string;
}

type TodoStatus = 'completed' | 'pending';

interface ITodo extends DefaultAttributes {
  title: string;
  endAt: string;
  startAt: string;
  isActive: boolean;
  status: TodoStatus;
  description: string;
}

interface TodoDocument extends ITodo, Document {}

type StatsType = 'create' | 'update' | 'delete' | 'invalidate'

interface IStats extends DefaultAttributes {
  type: StatsType;
  todoId: ObjectId;
  description: string;
}

type CreateErr = (message: string, code?: number, validations?: object) => Error;

type AppError = Error & {
  code: number;
  name?: string;
  message: string;
  validations?: object | null;
};

type Fix = any;
