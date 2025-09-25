import { cn } from "@/lib/utils";

interface KanbanColumnProps {
  title: string;
  color: string;
  taskCount: number;
  children: React.ReactNode;
}

export function KanbanColumn({ title, color, taskCount, children }: KanbanColumnProps) {
  return (
    <div className={cn("rounded-lg border bg-card shadow-soft p-4 h-full", color)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-card-foreground">{title}</h3>
        <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
          {taskCount}
        </span>
      </div>
      <div className="h-[calc(100%-60px)] overflow-y-auto">
        {children}
      </div>
    </div>
  );
}