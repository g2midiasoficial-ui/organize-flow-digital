import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { KanbanBoardReal } from "@/components/kanban/KanbanBoardReal";

const Index = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <DashboardHeader />
        <StatsGrid />
        <KanbanBoardReal />
      </div>
    </AppLayout>
  );
};

export default Index;
