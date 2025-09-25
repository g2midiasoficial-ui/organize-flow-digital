import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Task } from "./KanbanBoard";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onMove: (newStatus: Task["status"]) => void;
}

const categoryColors = {
  marketing: "bg-purple-100 text-purple-800 border-purple-200",
  vendas: "bg-green-100 text-green-800 border-green-200",
  produto: "bg-blue-100 text-blue-800 border-blue-200",
  operacional: "bg-orange-100 text-orange-800 border-orange-200",
};

const priorityColors = {
  alta: "border-l-4 border-l-red-500",
  media: "border-l-4 border-l-yellow-500",
  baixa: "border-l-4 border-l-green-500",
};

export function TaskCard({ task, onMove }: TaskCardProps) {
  const progress = (task.timeSpent / task.estimatedTime) * 100;
  
  const getNextStatus = () => {
    switch (task.status) {
      case "todo": return "em_progresso";
      case "em_progresso": return "concluido";
      default: return null;
    }
  };

  const nextStatus = getNextStatus();

  return (
    <Card className={cn(
      "p-4 cursor-pointer hover:shadow-elevated transition-smooth bg-card",
      priorityColors[task.priority]
    )}>
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <h4 className="font-medium text-card-foreground line-clamp-2">{task.title}</h4>
          <Badge className={cn("text-xs", categoryColors[task.category])}>
            {task.category}
          </Badge>
        </div>

        {/* Description */}
        {task.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Progresso</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress 
            value={progress} 
            className="h-2"
          />
        </div>

        {/* Time Info */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{task.timeSpent}min</span>
          </div>
          {task.dueDate && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{task.dueDate.toLocaleDateString()}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {task.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs px-2 py-0">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t">
          {task.assignee && (
            <div className="flex items-center gap-2 text-xs">
              <User className="w-3 h-3" />
              <span className="text-muted-foreground">{task.assignee}</span>
            </div>
          )}
          
          {nextStatus && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onMove(nextStatus)}
              className="gap-1 text-xs h-7"
            >
              <ArrowRight className="w-3 h-3" />
              {nextStatus === "em_progresso" ? "Iniciar" : "Concluir"}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}