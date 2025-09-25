import React from "react";
import { TaskCardReal } from "./TaskCardReal";
import { KanbanColumn } from "./KanbanColumn";
import { useTasks } from "@/hooks/useTasks";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function KanbanBoardReal() {
  const { tasks, moveTask, loading } = useTasks();

  const getTasksByStatus = (status: "todo" | "in_progress" | "done") => {
    return tasks.filter((task) => task.status === status);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const columns = [
    { id: "todo", title: "Para Fazer", status: "todo" as const, color: "bg-muted" },
    { id: "in_progress", title: "Em Progresso", status: "in_progress" as const, color: "bg-warning/10" },
    { id: "done", title: "Concluído", status: "done" as const, color: "bg-success/10" },
  ];

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Quadro Kanban</h1>
          <p className="text-muted-foreground">Gerencie suas atividades de e-commerce</p>
        </div>
        <Button variant="default" className="gap-2">
          <Plus className="w-4 h-4" />
          Nova Tarefa
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            title={column.title}
            color={column.color}
            taskCount={getTasksByStatus(column.status).length}
          >
            <div className="space-y-3">
              {getTasksByStatus(column.status).map((task) => (
                <TaskCardReal
                  key={task.id}
                  task={task}
                  onMove={moveTask}
                />
              ))}
            </div>
          </KanbanColumn>
        ))}
      </div>
    </div>
  );
}