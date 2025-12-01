import { TaskForm } from '@/domain/task/components/TaskForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/components/card';
import { useTaskCreate } from '@/domain/task/hooks/useTaskCreate';
import { useNavigation } from '@/core/hooks/useNavigation';
import { formatISO } from 'date-fns';
import type { UpdateTaskFormOutput } from '@/domain/task/types';

function TaskCreatePage() {
  const { mutate: createTask, isPending } = useTaskCreate();
  const { goBack } = useNavigation();

  const handleSubmit = (data: UpdateTaskFormOutput) => {
    createTask({
      title: data.title,
      description: data.description,
      due_date: data.due_date ? formatISO(data.due_date) : undefined,
    });
  };

  return (
    <div className="mx-auto max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Nova Tarefa</CardTitle>
          <CardDescription>Preencha os dados abaixo para criar uma nova tarefa.</CardDescription>
        </CardHeader>
        <CardContent>
          <TaskForm mode="create" onSubmit={handleSubmit} isPending={isPending} onCancel={goBack} />
        </CardContent>
      </Card>
    </div>
  );
}

export { TaskCreatePage };
