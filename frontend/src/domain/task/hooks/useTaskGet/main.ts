import { useQuery } from '@tanstack/react-query';
import { taskService } from '../../services/taskService';

export const useTaskGet = (id: string | undefined) => {
  return useQuery({
    queryKey: ['tasks', id],
    queryFn: () => taskService.get(id!),
    enabled: !!id,
  });
};
