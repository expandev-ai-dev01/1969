import { z } from 'zod';
import { createTaskSchema, updateTaskSchema } from '../validations/task';

export type CreateTaskFormInput = z.input<typeof createTaskSchema>;
export type CreateTaskFormOutput = z.output<typeof createTaskSchema>;

export type UpdateTaskFormInput = z.input<typeof updateTaskSchema>;
export type UpdateTaskFormOutput = z.output<typeof updateTaskSchema>;

export interface Task {
  task_id: string;
  user_id: string;
  title: string;
  description: string | null;
  due_date: string | null;
  status: 'Pendente' | 'Concluída';
  created_at: string;
  updated_at: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  due_date?: string;
}

export interface UpdateTaskDto {
  title: string;
  description?: string;
  due_date?: string;
  status: 'Pendente' | 'Concluída';
}
