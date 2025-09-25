import React from 'react';
import { FolderOpen, Plus, Calendar, Clock, Users } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function Projects() {
  // Mock projects data - replace with real data from Supabase
  const projects = [
    {
      id: '1',
      name: 'Loja Virtual Premium',
      description: 'Desenvolvimento completo da nova loja virtual com funcionalidades avançadas',
      color: '#6366f1',
      progress: 75,
      totalTasks: 24,
      completedTasks: 18,
      dueDate: '2024-12-15',
      members: 3
    },
    {
      id: '2',
      name: 'Campanha Black Friday',
      description: 'Estratégia e execução da campanha de Black Friday 2024',
      color: '#8b5cf6',
      progress: 45,
      totalTasks: 16,
      completedTasks: 7,
      dueDate: '2024-11-20',
      members: 5
    },
    {
      id: '3',
      name: 'Integração Marketplace',
      description: 'Integração com principais marketplaces: Amazon, Mercado Livre, Americanas',
      color: '#06b6d4',
      progress: 30,
      totalTasks: 12,
      completedTasks: 4,
      dueDate: '2025-01-30',
      members: 2
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getDaysUntilDue = (dateString: string) => {
    const dueDate = new Date(dateString);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FolderOpen className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Projetos</h1>
              <p className="text-muted-foreground">Gerencie seus projetos e campanhas</p>
            </div>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Projeto
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => {
            const daysUntilDue = getDaysUntilDue(project.dueDate);
            
            return (
              <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: project.color }}
                      />
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                    </div>
                    <Badge variant={daysUntilDue < 7 ? 'destructive' : 'secondary'}>
                      {daysUntilDue > 0 ? `${daysUntilDue}d restantes` : 'Atrasado'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Progresso</span>
                      <span className="text-sm text-muted-foreground">
                        {project.completedTasks}/{project.totalTasks} tarefas
                      </span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(project.dueDate)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{project.members} membros</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="flex items-center gap-3 p-6">
              <FolderOpen className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{projects.length}</p>
                <p className="text-sm text-muted-foreground">Projetos Ativos</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center gap-3 p-6">
              <Clock className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">
                  {projects.reduce((acc, p) => acc + p.totalTasks, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total de Tarefas</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center gap-3 p-6">
              <Users className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">
                  {projects.reduce((acc, p) => acc + p.members, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Membros Total</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center gap-3 p-6">
              <Calendar className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">
                  {Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length)}%
                </p>
                <p className="text-sm text-muted-foreground">Progresso Médio</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}