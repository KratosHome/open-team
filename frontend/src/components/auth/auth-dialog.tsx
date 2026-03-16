'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MoveRight, Mail, Lock, User, ArrowLeft } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Validation Schemas
const loginSchema = z.object({
  email: z.string().email('Некоректний email'),
  password: z.string().min(6, 'Пароль має бути не менше 6 символів'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Ім\'я занадто коротке'),
  email: z.string().email('Некоректний email'),
  password: z.string().min(6, 'Пароль має бути не менше 6 символів'),
});

const forgotPasswordSchema = z.object({
  email: z.string().email('Некоректний email'),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;
type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

interface AuthDialogProps {
  trigger?: React.ReactNode;
  defaultTab?: 'login' | 'register';
}

export function AuthDialog({ trigger, defaultTab = 'login' }: AuthDialogProps) {
  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  const [isOpen, setIsOpen] = useState(false);

  // Forms
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const forgotPasswordForm = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  // Submit Handlers
  const onLoginSubmit = (data: LoginFormValues) => {
    console.log('Login submitted:', data);
    setIsOpen(false);
  };

  const onRegisterSubmit = (data: RegisterFormValues) => {
    console.log('Registration submitted:', data);
    setIsOpen(false);
  };

  const onForgotPasswordSubmit = (data: ForgotPasswordFormValues) => {
    console.log('Forgot Password submitted:', data);
    setActiveTab('login');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        {trigger || (
          <Button variant="default" className="flex items-center gap-2">
            Вхід <MoveRight className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px] p-0 overflow-hidden border-white/10 bg-[#161922]/95 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className={cn("mb-6", activeTab === 'forgot-password' && "hidden")}>
               <TabsList className="grid w-full grid-cols-2 bg-white/5 p-1">
                <TabsTrigger value="login" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">Логін</TabsTrigger>
                <TabsTrigger value="register" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">Реєстрація</TabsTrigger>
              </TabsList>
            </div>

            {/* Login Tab */}
            <TabsContent value="login" className="space-y-4 mt-0 border-none p-0 outline-none">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white mb-2">З поверненням</DialogTitle>
                <p className="text-slate-400 text-sm">Увійдіть у свій акаунт, щоб продовжити</p>
              </DialogHeader>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-slate-300">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <Input
                      id="login-email"
                      placeholder="name@example.com"
                      className="pl-10 bg-white/5 border-white/10 text-white focus:border-cyan-500/50 transition-colors"
                      {...loginForm.register('email')}
                    />
                  </div>
                  {loginForm.formState.errors.email && (
                    <p className="text-xs text-red-400">{loginForm.formState.errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-password" className="text-slate-300">Пароль</Label>
                    <button
                      type="button"
                      onClick={() => setActiveTab('forgot-password')}
                      className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      Забули пароль?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 bg-white/5 border-white/10 text-white focus:border-cyan-500/50 transition-colors"
                      {...loginForm.register('password')}
                    />
                  </div>
                  {loginForm.formState.errors.password && (
                    <p className="text-xs text-red-400">{loginForm.formState.errors.password.message}</p>
                  )}
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:opacity-90 transition-opacity text-white font-semibold py-6">
                  Увійти <MoveRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register" className="space-y-4 mt-0 border-none p-0 outline-none">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white mb-2">Створити акаунт</DialogTitle>
                <p className="text-slate-400 text-sm">Приєднуйтесь до нашої спільноти сьогодні</p>
              </DialogHeader>
              <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-name" className="text-slate-300">Ім&apos;я</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <Input
                      id="reg-name"
                      placeholder="Ваше ім'я"
                      className="pl-10 bg-white/5 border-white/10 text-white focus:border-cyan-500/50 transition-colors"
                      {...registerForm.register('name')}
                    />
                  </div>
                  {registerForm.formState.errors.name && (
                    <p className="text-xs text-red-400">{registerForm.formState.errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email" className="text-slate-300">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <Input
                      id="reg-email"
                      placeholder="name@example.com"
                      className="pl-10 bg-white/5 border-white/10 text-white focus:border-cyan-500/50 transition-colors"
                      {...registerForm.register('email')}
                    />
                  </div>
                  {registerForm.formState.errors.email && (
                    <p className="text-xs text-red-400">{registerForm.formState.errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password" className="text-slate-300">Пароль</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <Input
                      id="reg-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 bg-white/5 border-white/10 text-white focus:border-cyan-500/50 transition-colors"
                      {...registerForm.register('password')}
                    />
                  </div>
                  {registerForm.formState.errors.password && (
                    <p className="text-xs text-red-400">{registerForm.formState.errors.password.message}</p>
                  )}
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:opacity-90 transition-opacity text-white font-semibold py-6">
                  Зареєструватися <MoveRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </TabsContent>

            {/* Forgot Password Tab (Programmatic) */}
            <TabsContent value="forgot-password" className="space-y-4 mt-0 border-none p-0 outline-none">
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors mb-4"
              >
                <ArrowLeft className="h-3 w-3" /> Назад до логіну
              </button>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white mb-2">Відновлення паролю</DialogTitle>
                <p className="text-slate-400 text-sm">Введіть ваш email, щоб отримати інструкції</p>
              </DialogHeader>
              <form onSubmit={forgotPasswordForm.handleSubmit(onForgotPasswordSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="forgot-email" className="text-slate-300">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <Input
                      id="forgot-email"
                      placeholder="name@example.com"
                      className="pl-10 bg-white/5 border-white/10 text-white focus:border-cyan-500/50 transition-colors"
                      {...forgotPasswordForm.register('email')}
                    />
                  </div>
                  {forgotPasswordForm.formState.errors.email && (
                    <p className="text-xs text-red-400">{forgotPasswordForm.formState.errors.email.message}</p>
                  )}
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:opacity-90 transition-opacity text-white font-semibold py-6">
                  Надіслати інструкції <MoveRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer info */}
        <div className="bg-white/5 p-4 border-t border-white/10">
          <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest">
            OpenTeam &copy; 2026 • Платформа майбутнього
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
