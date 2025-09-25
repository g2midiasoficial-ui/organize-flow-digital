import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock events data - replace with real data from Supabase
  const events = [
    {
      id: '1',
      title: 'Reunião de planejamento',
      time: '09:00',
      type: 'meeting',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Análise de métricas',
      time: '14:00',
      type: 'task',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Call com cliente',
      time: '16:30',
      type: 'call',
      priority: 'high'
    }
  ];

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  // Generate calendar days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CalendarIcon className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Calendário</h1>
              <p className="text-muted-foreground">Gerencie seus eventos e compromissos</p>
            </div>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Evento
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{monthNames[currentMonth]} {currentYear}</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">‹</Button>
                  <Button variant="outline" size="sm">›</Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-4">
                {weekDays.map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className={`
                      aspect-square p-2 text-center text-sm cursor-pointer rounded-md
                      ${day ? 'hover:bg-muted' : ''}
                      ${day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear() 
                        ? 'bg-primary text-primary-foreground' 
                        : day 
                          ? 'text-foreground' 
                          : 'text-transparent'
                      }
                    `}
                    onClick={() => day && setSelectedDate(new Date(currentYear, currentMonth, day))}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Events List */}
          <Card>
            <CardHeader>
              <CardTitle>Eventos de Hoje</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {events.map(event => (
                <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg border bg-card">
                  <div className="text-sm font-medium text-muted-foreground min-w-[50px]">
                    {event.time}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{event.title}</div>
                    <div className="flex gap-2 mt-1">
                      <Badge variant={event.priority === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                        {event.priority === 'high' ? 'Alta' : 'Média'}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {event.type === 'meeting' ? 'Reunião' : event.type === 'call' ? 'Chamada' : 'Tarefa'}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
              
              {events.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhum evento hoje</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}