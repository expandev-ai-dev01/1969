import { z } from 'zod';

const baseSchema = z.object({
  title: z
    .string({ required_error: 'O título é obrigatório' })
    .min(3, 'O título deve ter pelo menos 3 caracteres')
    .max(100, 'O título não pode exceder 100 caracteres'),
  description: z.string().max(500, 'A descrição não pode exceder 500 caracteres').optional(),
  due_date: z
    .date()
    .optional()
    .refine(
      (date) => !date || date >= new Date(new Date().setHours(0, 0, 0, 0)),
      'A data de vencimento não pode ser no passado'
    ),
});

export const createTaskSchema = baseSchema;

export const updateTaskSchema = baseSchema.extend({
  status: z.enum(['Pendente', 'Concluída'], { required_error: 'O status é obrigatório' }),
});
