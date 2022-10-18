import db from "../../../databases";
import { ITodo } from "../../types";
import { ChangeStreamDocument } from 'mongodb';
import StatService from "../v1/stats/stats.service";

const { todo } = db;

(async() => {
    todo.watch().on('change', (data: ChangeStreamDocument<ITodo>) => {
        // console.log(data.options.fullDocument);
        console.log(data);
        if(data.operationType === 'insert') {
            new StatService().create({
                type: 'create',
                description: 'A new todo was created',
                todoId: data.fullDocument._id,
            })
        } else {
            console.log(data);
            new StatService().create({
                type: data?.operationType === 'update' && 'update' || data?.operationType === 'delete' && 'delete' || 'invalidate',
                description: `${data?.operationType} a todo`,
                todoId: data?.operationType === "update" && data?.documentKey._id || data?.operationType === "delete" && data?.documentKey._id,
            })
        }
    });
})()
