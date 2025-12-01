/**
 * @summary
 * Business logic for Task entity.
 * Handles creation of tasks with validation and default values.
 *
 * @module services/task/taskService
 */

import { randomUUID } from 'crypto';
import { taskStore } from '@/instances';
import { ServiceError } from '@/utils';
import { TASK_DEFAULTS } from '@/constants/task';
import { TaskEntity } from './taskTypes';
import { createTaskSchema, updateTaskSchema, taskIdParamSchema } from './taskValidation';

/**
 * @summary
 * Creates a new task entity with validated data.
 *
 * @function taskCreate
 * @module services/task
 *
 * @param {string} userId - The ID of the authenticated user creating the task
 * @param {unknown} body - Raw request body to validate
 * @returns {Promise<TaskEntity>} The newly created task entity
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When body fails schema validation
 */
export async function taskCreate(userId: string, body: unknown): Promise<TaskEntity> {
  const validation = createTaskSchema.safeParse(body);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Validation failed', 400, validation.error.errors);
  }

  const params = validation.data;
  const now = new Date().toISOString();
  const taskId = randomUUID();

  const newTask: TaskEntity = {
    task_id: taskId,
    user_id: userId,
    title: params.title,
    description: params.description ?? null,
    due_date: params.due_date ?? null,
    status: TASK_DEFAULTS.INITIAL_STATUS,
    created_at: now,
    updated_at: now,
  };

  taskStore.add(newTask);
  return newTask;
}

/**
 * @summary
 * Retrieves a specific task by its ID, ensuring ownership.
 *
 * @function taskGet
 * @module services/task
 *
 * @param {string} userId - The ID of the authenticated user
 * @param {unknown} params - Raw request params containing the ID to validate
 * @returns {Promise<TaskEntity>} The found task entity
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When ID parameter is invalid
 * @throws {ServiceError} NOT_FOUND (404) - When task does not exist
 * @throws {ServiceError} UNAUTHORIZED (403) - When user is not the owner
 */
export async function taskGet(userId: string, params: unknown): Promise<TaskEntity> {
  const validation = taskIdParamSchema.safeParse(params);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, validation.error.errors);
  }

  const { id } = validation.data;
  const task = taskStore.getById(id);

  if (!task) {
    throw new ServiceError('NOT_FOUND', 'Task not found', 404);
  }

  if (task.user_id !== userId) {
    throw new ServiceError('UNAUTHORIZED', 'Access denied', 403);
  }

  return task;
}

/**
 * @summary
 * Updates an existing task with validated data, ensuring ownership.
 *
 * @function taskUpdate
 * @module services/task
 *
 * @param {string} userId - The ID of the authenticated user
 * @param {unknown} params - Raw request params containing the ID to validate
 * @param {unknown} body - Raw request body to validate
 * @returns {Promise<TaskEntity>} The updated task entity
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When ID or body fails validation
 * @throws {ServiceError} NOT_FOUND (404) - When task does not exist
 * @throws {ServiceError} UNAUTHORIZED (403) - When user is not the owner
 */
export async function taskUpdate(
  userId: string,
  params: unknown,
  body: unknown
): Promise<TaskEntity> {
  const paramsValidation = taskIdParamSchema.safeParse(params);

  if (!paramsValidation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, paramsValidation.error.errors);
  }

  const bodyValidation = updateTaskSchema.safeParse(body);

  if (!bodyValidation.success) {
    throw new ServiceError(
      'VALIDATION_ERROR',
      'Validation failed',
      400,
      bodyValidation.error.errors
    );
  }

  const { id } = paramsValidation.data;
  const task = taskStore.getById(id);

  if (!task) {
    throw new ServiceError('NOT_FOUND', 'Task not found', 404);
  }

  if (task.user_id !== userId) {
    throw new ServiceError('UNAUTHORIZED', 'Access denied', 403);
  }

  const updateData = bodyValidation.data;

  const updatedTask = taskStore.update(id, {
    title: updateData.title,
    description: updateData.description ?? null,
    due_date: updateData.due_date ?? null,
    status: updateData.status,
  });

  if (!updatedTask) {
    throw new ServiceError('INTERNAL_ERROR', 'Failed to update task', 500);
  }

  return updatedTask;
}
