import { useParams } from 'react-router-dom';
import { formatISO, parseISO } from 'date-fns';
import { TaskForm } from '@/domain/task/components/TaskForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/components/card';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { useTaskGet } from '@/domain/task/hooks/useTaskGet';
import { useTaskUpdate } from '@/domain/task/hooks/useTaskUpdate';
import { useNavigation } from '@/core/hooks/useNavigation';
import type { UpdateTaskFormOutput } from '@/domain/task/types';

function TaskEditPage() {
  const { id } = useParams<{ id: string }>();
  const { data: task, isLoading, isError } = useTaskGet(id);
  const { mutate: updateTask, isPending } = useTaskUpdate(id!);
  const { goBack } = useNavigation();

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center py-12">
        <LoadingSpinner className="size-8" />
      </div>
    );
  }

  if (isError || !task) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 py-12">
        <h2 className="text-xl font-semibold">Tarefa não encontrada</h2>
        <p className="text-muted-foreground">Não foi possível carregar os dados da tarefa.</p>
      </div>
    );
  }

  const handleSubmit = (data: UpdateTaskFormOutput) => {
    updateTask({
      title: data.title,
      description: data.description,
      due_date: data.due_date ? formatISO(data.due_date) : undefined,
      status: data.status,
    });
  };

  const initialValues = {
    title: task.title,
    description: task.description || '',
    due_date: task.due_date ? parseISO(task.due_date) : undefined,
    status: task.status as 'Pendente' | 'Concluída',
  };

  return (
    <div className="mx-auto max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Editar Tarefa</CardTitle>
          <CardDescription>Altere os dados abaixo para atualizar a tarefa.</CardDescription>
        </CardHeader>
        <CardContent>
          <TaskForm
            mode="edit"
            initialValues={initialValues}
            onSubmit={handleSubmit}
            isPending={isPending}
            onCancel={goBack}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export { TaskEditPage };
