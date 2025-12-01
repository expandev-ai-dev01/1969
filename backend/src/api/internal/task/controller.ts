/**
 * @summary
 * API controller for Task entity.
 * Handles HTTP requests for task operations.
 *
 * @module api/internal/task/controller
 */

import { Request, Response, NextFunction } from 'express';
import { successResponse, errorResponse, isServiceError } from '@/utils';
import { taskCreate, taskGet, taskUpdate } from '@/services/task';

/**
 * @api {post} /api/internal/task Create Task
 * @apiName CreateTask
 * @apiGroup Task
 *
 * @apiHeader {String} x-user-id User Identifier (UUID)
 *
 * @apiBody {String} title Task title (3-100 chars)
 * @apiBody {String} [description] Task description (max 500 chars)
 * @apiBody {String} [due_date] Due date (ISO 8601, future only)
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {String} data.task_id Unique task identifier
 * @apiSuccess {String} data.user_id Owner identifier
 * @apiSuccess {String} data.title Task title
 * @apiSuccess {String|null} data.description Task description
 * @apiSuccess {String|null} data.due_date Due date
 * @apiSuccess {String} data.status Task status
 * @apiSuccess {String} data.created_at Creation timestamp
 * @apiSuccess {String} data.updated_at Last update timestamp
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (VALIDATION_ERROR | UNAUTHORIZED)
 * @apiError {String} error.message Error message
 */
export async function createHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // User ID is attached by authMiddleware
    const userId = (req as any).user.id;

    const data = await taskCreate(userId, req.body);
    res.status(201).json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {get} /api/internal/task/:id Get Task
 * @apiName GetTask
 * @apiGroup Task
 *
 * @apiHeader {String} x-user-id User Identifier (UUID)
 * @apiParam {String} id Task Identifier (UUID)
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {String} data.task_id Unique task identifier
 * @apiSuccess {String} data.user_id Owner identifier
 * @apiSuccess {String} data.title Task title
 * @apiSuccess {String|null} data.description Task description
 * @apiSuccess {String|null} data.due_date Due date
 * @apiSuccess {String} data.status Task status
 * @apiSuccess {String} data.created_at Creation timestamp
 * @apiSuccess {String} data.updated_at Last update timestamp
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (VALIDATION_ERROR | NOT_FOUND | UNAUTHORIZED)
 * @apiError {String} error.message Error message
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = (req as any).user.id;
    const data = await taskGet(userId, req.params);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {put} /api/internal/task/:id Update Task
 * @apiName UpdateTask
 * @apiGroup Task
 *
 * @apiHeader {String} x-user-id User Identifier (UUID)
 * @apiParam {String} id Task Identifier (UUID)
 *
 * @apiBody {String} title Task title (3-100 chars)
 * @apiBody {String} [description] Task description (max 500 chars)
 * @apiBody {String} [due_date] Due date (ISO 8601, future only)
 * @apiBody {String} status Task status (Pendente | Concluída)
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {String} data.task_id Unique task identifier
 * @apiSuccess {String} data.user_id Owner identifier
 * @apiSuccess {String} data.title Task title
 * @apiSuccess {String|null} data.description Task description
 * @apiSuccess {String|null} data.due_date Due date
 * @apiSuccess {String} data.status Task status
 * @apiSuccess {String} data.created_at Creation timestamp
 * @apiSuccess {String} data.updated_at Last update timestamp
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (VALIDATION_ERROR | NOT_FOUND | UNAUTHORIZED)
 * @apiError {String} error.message Error message
 */
export async function updateHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = (req as any).user.id;
    const data = await taskUpdate(userId, req.params, req.body);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}
