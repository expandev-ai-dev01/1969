/**
 * @summary
 * In-memory store instance for Task entity.
 * Provides singleton pattern for data storage without database.
 *
 * @module instances/task/taskStore
 */

import { TaskEntity } from '@/services/task/taskTypes';
import { TASK_DEFAULTS } from '@/constants/task';

/**
 * In-memory store for Task records
 */
class TaskStore {
  private records: Map<string, TaskEntity> = new Map();

  /**
   * Add new record
   */
  add(record: TaskEntity): TaskEntity {
    if (this.records.size >= TASK_DEFAULTS.MAX_RECORDS) {
      throw new Error('Maximum records limit reached');
    }
    this.records.set(record.task_id, record);
    return record;
  }

  /**
   * Get record by ID
   */
  getById(id: string): TaskEntity | undefined {
    return this.records.get(id);
  }

  /**
   * Get all records
   */
  getAll(): TaskEntity[] {
    return Array.from(this.records.values());
  }

  /**
   * Update existing record
   */
  update(id: string, data: Partial<TaskEntity>): TaskEntity | undefined {
    const existing = this.records.get(id);
    if (!existing) {
      return undefined;
    }
    const updated = { ...existing, ...data, updated_at: new Date().toISOString() };
    this.records.set(id, updated);
    return updated;
  }
}

/**
 * Singleton instance of TaskStore
 */
export const taskStore = new TaskStore();
