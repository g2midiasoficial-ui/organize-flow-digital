import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, User, MoveRight } from "lucide-react";
import { Task } from "@/hooks/useTasks";

interface TaskCardProps {
  task: Task;
  onMove: (taskId: string, newStatus: "todo" | "in_progress" | "done") => void;
}

const categoryColors = {
  marketing: "bg-purple-100 text-purple-800 border-purple-200",
  vendas: "bg-green-100 text-green-800 border-green-200", 
  produto: "bg-blue-100 text-blue-800 border-blue-200",
  operacional: "bg-orange-100 text-orange-800 border-orange-200",
  general: "bg-gray-100 text-gray-800 border-gray-200",
};

const priorityColors = {
  low: "border-l-4 border-l-green-500",
  medium: "border-l-4 border-l-yellow-500", 
  high: "border-l-4 border-l-orange-500",
  urgent: "border-l-4 border-l-red-500",
};

export function TaskCardReal({ task, onMove }: TaskCardProps) {
  const progress = task.estimated_time > 0 ? (task.time_spent / task.estimated_time) * 100 : 0;

  const getNextStatus = (): "todo" | "in_progress" | "done" | null => {
    switch (task.status) {
      case "todo": return "in_progress";
      case "in_progress": return "done";
      default: return null;
    }
  };

  const nextStatus = getNextStatus();

  return (
    <Card 
      className={`
        p-4 cursor-pointer hover:shadow-lg transition-all
        ${priorityColors[task.priority]}
      `}
    >
      <CardHeader className="p-0 mb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-sm font-medium line-clamp-2">{task.title}</CardTitle>
          <Badge 
            className={`text-xs ${
              categoryColors[task.category as keyof typeof categoryColors] || categoryColors.general
            }`}
          >
            {task.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-0 space-y-3">
        {task.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {task.description}
          </p>
        )}

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Progresso</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>
              {task.time_spent}h / {task.estimated_time}h
            </span>
          </div>
          {task.due_date && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Prazo: {new Date(task.due_date).toLocaleDateString('pt-BR')}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-1">
          {task.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>Responsável</span>
          </div>
          
          {nextStatus && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onMove(task.id, nextStatus)}
              className="gap-1 text-xs h-7"
            >
              <MoveRight className="h-3 w-3" />
              {nextStatus === "in_progress" ? "Iniciar" : "Concluir"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}