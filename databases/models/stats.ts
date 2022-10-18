import { Schema, Types } from "mongoose";
import { db } from "../connection";
import { IStats } from "../../src/types";

const StatsSchema: Schema = new Schema<IStats>(
  {
    description: {
        type: String,
    },
    type: {
        type: String,
        enum: ['create', 'delete', 'update'],
        default: 'create'
    },
    todoId: {
        type: Types.ObjectId,
        ref: 'Todo',
    }
  },
  {
    autoIndex: true,
    versionKey: false,
    collection: "stats",
  }
);

StatsSchema.set("timestamps", true);

export default db.model<IStats>("Stats", StatsSchema);
