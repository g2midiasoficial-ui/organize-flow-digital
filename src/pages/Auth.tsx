import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

export default function Auth() {
  const { user, signIn, signUp, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  });

  // Redirect if already authenticated
  if (user && !loading) {
    return <Navigate to="/" replace />;
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await signIn(formData.email, formData.password);
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Email ou senha incorretos');
        } else {
          toast.error('Erro ao fazer login: ' + error.message);
        }
      } else {
        toast.success('Login realizado com sucesso!');
      }
    } catch (error: any) {
      toast.error('Erro inesperado: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName.trim()) {
      toast.error('Nome completo é obrigatório');
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signUp(formData.email, formData.password, formData.fullName);
      if (error) {
        if (error.message.includes('User already registered')) {
          toast.error('Este email já está cadastrado');
        } else {
          toast.error('Erro ao criar conta: ' + error.message);
        }
      } else {
        toast.success('Conta criada! Verifique seu email para confirmar.');
      }
    } catch (error: any) {
      toast.error('Erro inesperado: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
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
              <form onSubmit={handleSignIn} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-white">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="h-12 px-4 bg-black/50 border-2 border-red-500/30 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-white">Senha</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="h-12 px-4 bg-black/50 border-2 border-red-500/30 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 text-white placeholder:text-gray-400"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-primary hover:shadow-glow transition-all duration-300 text-base font-semibold" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Entrando...</span>
                    </div>
                  ) : (
                    'Entrar'
                  )}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup" className="animate-fade-in">
              <form onSubmit={handleSignUp} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium text-white">Nome Completo</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Seu nome completo"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="h-12 px-4 bg-black/50 border-2 border-red-500/30 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signupEmail" className="text-sm font-medium text-white">Email</Label>
                  <Input
                    id="signupEmail"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="h-12 px-4 bg-black/50 border-2 border-red-500/30 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signupPassword" className="text-sm font-medium text-white">Senha</Label>
                  <Input
                    id="signupPassword"
                    name="password"
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    minLength={6}
                    className="h-12 px-4 bg-black/50 border-2 border-red-500/30 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 text-white placeholder:text-gray-400"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-primary hover:shadow-glow transition-all duration-300 text-base font-semibold border border-red-500/50" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Criando conta...</span>
                    </div>
                  ) : (
                    'Criar Conta'
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}