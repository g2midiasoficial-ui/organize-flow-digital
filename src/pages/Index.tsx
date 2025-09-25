import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { KanbanBoard } from "@/components/kanban/KanbanBoard";

const Index = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <DashboardHeader />
        <StatsGrid />
        <KanbanBoard />
      </div>
    </AppLayout>
  );
};

export default Index;
