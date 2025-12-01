/**
 * @summary
 * Validation schemas for Task entity.
 * Centralizes all Zod validation logic for the service.
 *
 * @module services/task/taskValidation
 */

import { z } from 'zod';
import { TASK_LIMITS, TASK_STATUS } from '@/constants/task';

/**
 * Schema for create request validation
 */
export const createTaskSchema = z.object({
  title: z
    .string({ required_error: 'O título da tarefa é obrigatório.' })
    .min(TASK_LIMITS.TITLE_MIN_LENGTH, { message: 'O título deve ter pelo menos 3 caracteres.' })
    .max(TASK_LIMITS.TITLE_MAX_LENGTH, { message: 'O título não pode exceder 100 caracteres.' }),
  description: z
    .string()
    .max(TASK_LIMITS.DESCRIPTION_MAX_LENGTH, {
      message: 'A descrição não pode exceder 500 caracteres.',
    })
    .optional()
    .nullable(),
  due_date: z
    .string()
    .datetime({
      message: 'A data de vencimento informada é inválida. Utilize o formato esperado (ISO 8601).',
    })
    .refine((date) => new Date(date) > new Date(), {
      message: 'A data de vencimento não pode ser no passado.',
    })
    .optional()
    .nullable(),
});

/**
 * Schema for update request validation
 */
export const updateTaskSchema = z.object({
  title: z
    .string({ required_error: 'O título da tarefa é obrigatório.' })
    .min(TASK_LIMITS.TITLE_MIN_LENGTH, { message: 'O título deve ter pelo menos 3 caracteres.' })
    .max(TASK_LIMITS.TITLE_MAX_LENGTH, { message: 'O título não pode exceder 100 caracteres.' }),
  description: z
    .string()
    .max(TASK_LIMITS.DESCRIPTION_MAX_LENGTH, {
      message: 'A descrição não pode exceder 500 caracteres.',
    })
    .optional()
    .nullable(),
  due_date: z
    .string()
    .datetime({
      message: 'A data de vencimento informada é inválida. Utilize o formato esperado (ISO 8601).',
    })
    .refine((date) => new Date(date) > new Date(), {
      message: 'A data de vencimento não pode ser no passado.',
    })
    .optional()
    .nullable(),
  status: z.enum([TASK_STATUS.PENDING, TASK_STATUS.COMPLETED], {
    errorMap: () => ({ message: 'Status inválido. Valores permitidos: Pendente, Concluída.' }),
  }),
});

/**
 * Schema for ID parameter validation
 */
export const taskIdParamSchema = z.object({
  id: z.string().uuid({ message: 'ID da tarefa inválido.' }),
});

/**
 * Inferred types from schemas
 */
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
