import { useState } from "react";
import { KanbanColumn } from "./KanbanColumn";
import { TaskCard } from "./TaskCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export interface Task {
  id: string;
  title: string;
  description?: string;
  category: "marketing" | "vendas" | "produto" | "operacional";
  priority: "alta" | "media" | "baixa";
  timeSpent: number; // in minutes
  estimatedTime: number; // in minutes
  status: "todo" | "em_progresso" | "concluido";
  tags: string[];
  assignee?: string;
  dueDate?: Date;
}

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Campanha Black Friday",
    description: "Criar campanhas para redes sociais e e-mail marketing",
    category: "marketing",
    priority: "alta",
    timeSpent: 120,
    estimatedTime: 180,
    status: "em_progresso",
    tags: ["urgente", "campanha"],
    assignee: "Ana Silva",
    dueDate: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "Otimizar página de produto",
    description: "Melhorar SEO e conversão da página principal",
    category: "produto",
    priority: "media",
    timeSpent: 45,
    estimatedTime: 90,
    status: "todo",
    tags: ["SEO", "conversão"],
  },
  {
    id: "3",
    title: "Análise de métricas Q4",
    description: "Relatório completo de performance do trimestre",
    category: "operacional",
    priority: "baixa",
    timeSpent: 60,
    estimatedTime: 120,
    status: "concluido",
    tags: ["relatório", "analytics"],
  },
];

export function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const getTasksByStatus = (status: Task["status"]) => {
    return tasks.filter(task => task.status === status);
  };

  const moveTask = (taskId: string, newStatus: Task["status"]) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const columns = [
    { id: "todo", title: "Para Fazer", status: "todo" as const, color: "bg-muted" },
    { id: "em_progresso", title: "Em Progresso", status: "em_progresso" as const, color: "bg-warning/10" },
    { id: "concluido", title: "Concluído", status: "concluido" as const, color: "bg-success/10" },
  ];

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Quadro Kanban</h1>
          <p className="text-muted-foreground">Gerencie suas atividades de e-commerce</p>
        </div>
        <Button variant="gradient" className="gap-2">
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
                <TaskCard
                  key={task.id}
                  task={task}
                  onMove={(newStatus) => moveTask(task.id, newStatus)}
                />
              ))}
            </div>
          </KanbanColumn>
        ))}
      </div>
    </div>
  );
}