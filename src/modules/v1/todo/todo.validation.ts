import { body, param } from 'express-validator';

export const createTaskRule = () => [
    body('title').isString().withMessage('Enter a valid title').notEmpty(),
    body('endAt').isISO8601().withMessage('End Date must be a date').notEmpty(),
    body('startAt').isISO8601().withMessage('Start Date must be a date').notEmpty(),
    body('description').isString().withMessage('Todo description cannot be empty').notEmpty(),
]

export const updateTaskRule = () => [
    body('title').isString().withMessage('Enter a valid title').notEmpty(),
    body('endAt').isISO8601().withMessage('End Date must be a date').notEmpty(),
    body('startAt').isISO8601().withMessage('Start Date must be a date').notEmpty(),
    param('taskId').isMongoId().withMessage('Cannot update invalid todo').notEmpty(),
    body('description').isString().withMessage('Todo description cannot be empty').notEmpty(),
]

export const mongoIdRule = (type: string) => [
    param('taskId').isMongoId().withMessage(`Cannot ${type} invalid todo`).notEmpty(),
]
