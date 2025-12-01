import { authenticatedClient } from '@/core/lib/api';
import type { CreateTaskDto, UpdateTaskDto, Task } from '../types';

export const taskService = {
  /**
   * Creates a new task
   * @param data Task creation data
   * @returns Created task
   */
  async create(data: CreateTaskDto): Promise<Task> {
    const response = await authenticatedClient.post('/task', data);
    return response.data.data;
  },

  /**
   * Gets a task by ID
   * @param id Task ID
   * @returns Task details
   */
  async get(id: string): Promise<Task> {
    const response = await authenticatedClient.get(`/task/${id}`);
    return response.data.data;
  },

  /**
   * Updates a task
   * @param id Task ID
   * @param data Task update data
   * @returns Updated task
   */
  async update(id: string, data: UpdateTaskDto): Promise<Task> {
    const response = await authenticatedClient.put(`/task/${id}`, data);
    return response.data.data;
  },
};
