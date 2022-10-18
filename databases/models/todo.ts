import { Schema } from "mongoose";
import { db } from "../connection";
import { ITodo } from "../../src/types";

const TodoSchema: Schema = new Schema<ITodo>(
  {
    title: {
      type: String,
    },
    endAt: {
      type: String,
    },
    startAt: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    isActive: {
      type: Boolean,
    },
  },
  {
    autoIndex: true,
    versionKey: false,
    collection: "todos",
  }
);

TodoSchema.set("timestamps", true);

export default db.model<ITodo>("Todo", TodoSchema);
