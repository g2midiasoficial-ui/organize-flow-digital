import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { z } from 'zod';

const signInSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

const signUpSchema = signInSchema.extend({
  fullName: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
});

interface AuthFormProps {
  mode: 'signin' | 'signup';
}

export function AuthForm({ mode }: AuthFormProps) {
  const { signIn, signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const schema = mode === 'signin' ? signInSchema : signUpSchema;
      const validated = schema.parse(formData);

      if (mode === 'signin') {
        const { error } = await signIn(validated.email, validated.password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast.error('Email ou senha incorretos');
          } else if (error.message.includes('Email not confirmed')) {
            toast.error('Confirme seu email antes de fazer login');
          } else {
            toast.error('Erro ao fazer login: ' + error.message);
          }
        } else {
          toast.success('Login realizado com sucesso!');
        }
      } else {
        const { error } = await signUp(validated.email, validated.password, formData.fullName);
        if (error) {
          if (error.message.includes('User already registered')) {
            toast.error('Este email já está cadastrado');
          } else {
            toast.error('Erro ao criar conta: ' + error.message);
          }
        } else {
          toast.success('Conta criada! Verifique seu email para confirmar.');
        }
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error('Erro inesperado: ' + error.message);
      }
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {mode === 'signup' && (
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-sm font-medium text-white">
            Nome Completo
          </Label>
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
      )}
      
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-white">
          Email
        </Label>
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
        <Label htmlFor="password" className="text-sm font-medium text-white">
          Senha
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder={mode === 'signup' ? 'Mínimo 6 caracteres' : '••••••••'}
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
            <span>{mode === 'signin' ? 'Entrando...' : 'Criando conta...'}</span>
          </div>
        ) : (
          mode === 'signin' ? 'Entrar' : 'Criar Conta'
        )}
      </Button>
    </form>
  );
}
