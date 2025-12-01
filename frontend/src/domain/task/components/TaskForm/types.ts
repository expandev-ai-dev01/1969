import type { UpdateTaskFormInput, UpdateTaskFormOutput } from '../../types';

export interface TaskFormProps {
  mode: 'create' | 'edit';
  initialValues?: Partial<UpdateTaskFormInput>;
  onSubmit: (data: UpdateTaskFormOutput) => void;
  isPending?: boolean;
  onCancel?: () => void;
}
