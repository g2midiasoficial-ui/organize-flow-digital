import { Button } from "@/components/ui/button";
import { Calendar, Plus, Download } from "lucide-react";
import heroImage from "@/assets/hero-dashboard.jpg";

export function DashboardHeader() {
  const currentDate = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="relative rounded-2xl overflow-hidden mb-8 border border-red-500/30">
      <div 
        className="bg-gradient-primary text-white p-8"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(220, 38, 38, 0.9), rgba(127, 29, 29, 0.9)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-4xl">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <div className="space-y-1">
                <p className="text-sm opacity-90 capitalize">{currentDate}</p>
                <h1 className="text-3xl font-bold">Bom dia! 👋</h1>
              </div>
              <p className="text-lg opacity-90 max-w-2xl">
                Gerencie suas atividades de e-commerce, acompanhe métricas e acelere seus resultados.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="secondary" className="gap-2 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white">
                <Calendar className="w-4 h-4" />
                Calendário
              </Button>
              <Button variant="secondary" className="gap-2 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white">
                <Download className="w-4 h-4" />
                Relatório
              </Button>
              <Button className="gap-2 bg-white text-red-600 hover:bg-gray-100 shadow-glow border border-white/50">
                <Plus className="w-4 h-4" />
                Nova Tarefa
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}