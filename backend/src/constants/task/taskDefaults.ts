/**
 * @summary
 * Default values and constants for Task entity.
 * Provides centralized configuration for entity creation and validation limits.
 *
 * @module constants/task/taskDefaults
 */

/**
 * @interface TaskLimitsType
 * @description Validation constraints for Task entity fields.
 *
 * @property {number} TITLE_MIN_LENGTH - Minimum characters for title (3)
 * @property {number} TITLE_MAX_LENGTH - Maximum characters for title (100)
 * @property {number} DESCRIPTION_MAX_LENGTH - Maximum characters for description (500)
 */
export const TASK_LIMITS = {
  TITLE_MIN_LENGTH: 3,
  TITLE_MAX_LENGTH: 100,
  DESCRIPTION_MAX_LENGTH: 500,
} as const;

/** Type representing the TASK_LIMITS constant */
export type TaskLimitsType = typeof TASK_LIMITS;

/**
 * @interface TaskStatusType
 * @description Available status values for Task entities.
 */
export const TASK_STATUS = {
  PENDING: 'Pendente',
  COMPLETED: 'Concluída',
} as const;

/** Type representing the TASK_STATUS constant */
export type TaskStatusType = typeof TASK_STATUS;

/**
 * @interface TaskDefaultsType
 * @description Default configuration values.
 */
export const TASK_DEFAULTS = {
  INITIAL_STATUS: TASK_STATUS.PENDING,
  MAX_RECORDS: 1000,
} as const;
