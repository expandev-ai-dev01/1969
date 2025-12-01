import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DOMPurify from 'dompurify';
import { Button } from '@/core/components/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/core/components/form';
import { Input } from '@/core/components/input';
import { Textarea } from '@/core/components/textarea';
import { DatePicker } from '@/core/components/date-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/select';
import { updateTaskSchema } from '../../validations/task';
import type { UpdateTaskFormInput, UpdateTaskFormOutput } from '../../types';
import type { TaskFormProps } from './types';

function TaskForm({ mode, initialValues, onSubmit, isPending, onCancel }: TaskFormProps) {
  const form = useForm<UpdateTaskFormInput, any, UpdateTaskFormOutput>({
    resolver: zodResolver(updateTaskSchema),
    mode: 'onBlur',
    defaultValues: {
      title: initialValues?.title || '',
      description: initialValues?.description || '',
      due_date: initialValues?.due_date,
      status: initialValues?.status || 'Pendente',
    },
  });

  const status = form.watch('status');
  const isCompleted = status === 'Concluída';
  const isEditMode = mode === 'edit';

  const handleSubmit = (data: UpdateTaskFormOutput) => {
    const sanitizedData = {
      ...data,
      title: DOMPurify.sanitize(data.title),
      description: data.description ? DOMPurify.sanitize(data.description) : undefined,
    };

    onSubmit(sanitizedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: Comprar mantimentos"
                  disabled={isEditMode && isCompleted}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Detalhes da tarefa..."
                  className="resize-none"
                  disabled={isEditMode && isCompleted}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="due_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data de Vencimento</FormLabel>
              <FormControl>
                <DatePicker
                  date={field.value}
                  onDateChange={field.onChange}
                  placeholder="Selecione uma data"
                  disabled={isPending || (isEditMode && isCompleted)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isEditMode && (
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Pendente">Pendente</SelectItem>
                    <SelectItem value="Concluída">Concluída</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex justify-end gap-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>
              Cancelar
            </Button>
          )}
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Salvando...' : isEditMode ? 'Salvar Alterações' : 'Criar Tarefa'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export { TaskForm };
