import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AuthForm } from '@/components/auth/AuthForm';

export default function Auth() {
  const { user, loading } = useAuth();

  if (user && !loading) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden p-4">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-gradient-primary rounded-full opacity-30 blur-3xl floating-animation"></div>
        <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-gradient-primary rounded-full opacity-20 blur-3xl floating-animation" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-primary rounded-full opacity-15 blur-3xl floating-animation" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <Card className="w-full max-w-md glass-effect animate-fade-in-up hover-lift relative z-10 shadow-elevated border-red-500/30">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow animate-pulse-glow border border-red-500/50">
            <span className="text-2xl font-bold text-white">OF</span>
          </div>
          <CardTitle className="text-3xl font-bold text-white">Organize Flow</CardTitle>
          <CardDescription className="text-lg text-gray-300">
            Plataforma moderna de organização para e-commerce
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-black/50 p-1 rounded-xl border border-red-500/30">
              <TabsTrigger value="signin" className="rounded-lg transition-all duration-300 text-white data-[state=active]:bg-gradient-primary data-[state=active]:text-white data-[state=active]:shadow-glow">
                Entrar
              </TabsTrigger>
              <TabsTrigger value="signup" className="rounded-lg transition-all duration-300 text-white data-[state=active]:bg-gradient-primary data-[state=active]:text-white data-[state=active]:shadow-glow">
                Criar Conta
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="animate-fade-in">
              <AuthForm mode="signin" />
            </TabsContent>
            
            <TabsContent value="signup" className="animate-fade-in">
              <AuthForm mode="signup" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}