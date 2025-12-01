import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { taskService } from '../../services/taskService';
import { useNavigation } from '@/core/hooks/useNavigation';
import type { CreateTaskDto } from '../../types';

export const useTaskCreate = () => {
  const queryClient = useQueryClient();
  const { navigate } = useNavigation();

  return useMutation({
    mutationFn: (data: CreateTaskDto) => taskService.create(data),
    onSuccess: () => {
      toast.success('Tarefa criada com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      navigate('/');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Erro ao criar tarefa';
      toast.error(message);
    },
  });
};
