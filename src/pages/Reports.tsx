import React from 'react';
import { BarChart3, TrendingUp, Clock, Target, Download } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function Reports() {
  // Mock data - replace with real data from Supabase
  const weeklyData = [
    { day: 'Seg', tasks: 8, hours: 6.5 },
    { day: 'Ter', tasks: 12, hours: 8.0 },
    { day: 'Qua', tasks: 6, hours: 4.5 },
    { day: 'Qui', tasks: 10, hours: 7.0 },
    { day: 'Sex', tasks: 15, hours: 9.5 },
    { day: 'Sáb', tasks: 3, hours: 2.0 },
    { day: 'Dom', tasks: 2, hours: 1.5 }
  ];

  const projectStats = [
    { name: 'Loja Virtual Premium', progress: 75, timeSpent: 84, estimate: 120 },
    { name: 'Campanha Black Friday', progress: 45, timeSpent: 32, estimate: 80 },
    { name: 'Integração Marketplace', progress: 30, timeSpent: 18, estimate: 60 }
  ];

  const categoryStats = [
    { category: 'Marketing', tasks: 24, percentage: 35, color: '#8b5cf6' },
    { category: 'Desenvolvimento', tasks: 18, percentage: 26, color: '#06b6d4' },
    { category: 'Design', tasks: 15, percentage: 22, color: '#f59e0b' },
    { category: 'Análise', tasks: 12, percentage: 17, color: '#10b981' }
  ];

  const maxTasks = Math.max(...weeklyData.map(d => d.tasks));
  const maxHours = Math.max(...weeklyData.map(d => d.hours));

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Relatórios</h1>
              <p className="text-muted-foreground">Análise de performance e produtividade</p>
            </div>
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Exportar Dados
          </Button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="flex items-center gap-3 p-6">
              <Target className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">68</p>
                <p className="text-sm text-muted-foreground">Tarefas Concluídas</p>
                <p className="text-xs text-green-600">+12% vs semana anterior</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center gap-3 p-6">
              <Clock className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">134h</p>
                <p className="text-sm text-muted-foreground">Tempo Trabalhado</p>
                <p className="text-xs text-green-600">+8% vs semana anterior</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center gap-3 p-6">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">87%</p>
                <p className="text-sm text-muted-foreground">Taxa de Conclusão</p>
                <p className="text-xs text-green-600">+5% vs semana anterior</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center gap-3 p-6">
              <BarChart3 className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">4.2h</p>
                <p className="text-sm text-muted-foreground">Tempo Médio/Tarefa</p>
                <p className="text-xs text-red-600">-3% vs semana anterior</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Activity Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Atividade Semanal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyData.map(day => (
                  <div key={day.day} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium w-10">{day.day}</span>
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <span>{day.tasks} tarefas</span>
                        <span>{day.hours}h</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-primary/20 rounded-full h-2 relative overflow-hidden">
                        <div 
                          className="bg-primary h-full rounded-full transition-all"
                          style={{ width: `${(day.tasks / maxTasks) * 100}%` }}
                        />
                      </div>
                      <div className="bg-orange-200 rounded-full h-2 relative overflow-hidden">
                        <div 
                          className="bg-orange-500 h-full rounded-full transition-all"
                          style={{ width: `${(day.hours / maxHours) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                  <span>Tarefas</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full" />
                  <span>Horas</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Categoria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {categoryStats.map(category => (
                <div key={category.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="font-medium">{category.category}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {category.tasks} tarefas
                    </div>
                  </div>
                  <Progress value={category.percentage} className="h-2" />
                  <div className="text-right text-sm text-muted-foreground">
                    {category.percentage}%
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Project Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Performance por Projeto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {projectStats.map(project => (
                <div key={project.name} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{project.name}</h4>
                    <Badge variant={project.progress > 70 ? 'default' : 'secondary'}>
                      {project.progress}% concluído
                    </Badge>
                  </div>
                  
                  <Progress value={project.progress} className="h-2" />
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Tempo Gasto</p>
                      <p className="font-medium">{project.timeSpent}h</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Estimativa</p>
                      <p className="font-medium">{project.estimate}h</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Eficiência</p>
                      <p className={`font-medium ${
                        project.timeSpent <= project.estimate ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {Math.round((project.estimate / project.timeSpent) * 100)}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}