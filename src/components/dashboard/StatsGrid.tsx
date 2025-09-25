import { Card } from "@/components/ui/card";
import { TrendingUp, Clock, Target, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: React.ReactNode;
  color: string;
}

function StatCard({ title, value, change, trend, icon, color }: StatCardProps) {
  return (
    <Card className="p-6 shadow-soft hover:shadow-elevated transition-smooth">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <div className="flex items-center gap-1">
            <TrendingUp 
              className={cn(
                "w-4 h-4",
                trend === "up" ? "text-success rotate-0" : 
                trend === "down" ? "text-destructive rotate-180" : 
                "text-muted-foreground"
              )} 
            />
            <span className={cn(
              "text-sm font-medium",
              trend === "up" ? "text-success" : 
              trend === "down" ? "text-destructive" : 
              "text-muted-foreground"
            )}>
              {change}
            </span>
          </div>
        </div>
        <div className={cn("p-3 rounded-lg", color)}>
          {icon}
        </div>
      </div>
    </Card>
  );
}

export function StatsGrid() {
  const stats = [
    {
      title: "Tarefas Concluídas",
      value: "23",
      change: "+12% vs mês anterior",
      trend: "up" as const,
      icon: <CheckCircle className="w-6 h-6 text-success-foreground" />,
      color: "bg-success/10",
    },
    {
      title: "Tempo Médio por Tarefa",
      value: "2.3h",
      change: "-8% vs mês anterior",
      trend: "up" as const,
      icon: <Clock className="w-6 h-6 text-primary-foreground" />,
      color: "bg-primary/10",
    },
    {
      title: "Metas Atingidas",
      value: "8/10",
      change: "80% de conclusão",
      trend: "up" as const,
      icon: <Target className="w-6 h-6 text-warning-foreground" />,
      color: "bg-warning/10",
    },
    {
      title: "ROI Campanhas",
      value: "234%",
      change: "+45% vs trimestre anterior",
      trend: "up" as const,
      icon: <TrendingUp className="w-6 h-6 text-secondary-foreground" />,
      color: "bg-secondary/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}