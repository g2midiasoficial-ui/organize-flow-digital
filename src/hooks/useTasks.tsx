import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  project_id?: string | null;
  assignee_id?: string | null;
  creator_id: string;
  estimated_time: number;
  time_spent: number;
  due_date?: string | null;
  started_at?: string | null;
  completed_at?: string | null;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchTasks = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks((data as Task[]) || []);
    } catch (error: any) {
      toast.error('Erro ao carregar tarefas: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const createTask = async (taskData: Partial<Task>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([{
          ...taskData,
          creator_id: user.id,
          title: taskData.title || '',
        }])
        .select()
        .single();

      if (error) throw error;
      
      setTasks(prev => [data as Task, ...prev]);
      toast.success('Tarefa criada com sucesso!');
      return data;
    } catch (error: any) {
      toast.error('Erro ao criar tarefa: ' + error.message);
      throw error;
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setTasks(prev => prev.map(task => 
        task.id === id ? { ...task, ...data as Task } : task
      ));
      
      return data;
    } catch (error: any) {
      toast.error('Erro ao atualizar tarefa: ' + error.message);
      throw error;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTasks(prev => prev.filter(task => task.id !== id));
      toast.success('Tarefa excluída com sucesso!');
    } catch (error: any) {
      toast.error('Erro ao excluir tarefa: ' + error.message);
      throw error;
    }
  };

  const moveTask = async (taskId: string, newStatus: Task['status']) => {
    const updates: Partial<Task> = { status: newStatus };
    
    if (newStatus === 'in_progress' && !tasks.find(t => t.id === taskId)?.started_at) {
      updates.started_at = new Date().toISOString();
    }
    
    if (newStatus === 'done') {
      updates.completed_at = new Date().toISOString();
    }

    await updateTask(taskId, updates);
  };

  return {
    tasks,
    loading,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
    refetch: fetchTasks,
  };
}