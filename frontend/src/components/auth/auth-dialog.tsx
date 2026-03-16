'use client';

import { ArrowLeft, Lock, Mail, MoveRight, User } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

interface AuthDialogProps {
  trigger?: React.ReactNode;
  defaultTab?: 'login' | 'register';
  dict: {
    auth: {
      login: string;
      register: string;
      welcomeBack: string;
      loginSubtitle: string;
      createAccount: string;
      registerSubtitle: string;
      forgotPassword: string;
      forgotPasswordSubtitle: string;
      backToLogin: string;
      emailLabel: string;
      passwordLabel: string;
      nameLabel: string;
      namePlaceholder: string;
      submitLogin: string;
      submitRegister: string;
      submitForgot: string;
      forgotPasswordLink: string;
      footerText: string;
      validation: {
        invalidEmail: string;
        passwordTooShort: string;
        nameTooShort: string;
      };
    };
  };
}

export function AuthDialog({ trigger, defaultTab = 'login', dict }: AuthDialogProps) {
  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  const [isOpen, setIsOpen] = useState(false);

  const loginSchema = z.object({
    email: z.string().email(dict.auth.validation.invalidEmail),
    password: z.string().min(6, dict.auth.validation.passwordTooShort),
  });

  const registerSchema = z.object({
    name: z.string().min(2, dict.auth.validation.nameTooShort),
    email: z.string().email(dict.auth.validation.invalidEmail),
    password: z.string().min(6, dict.auth.validation.passwordTooShort),
  });

  const forgotPasswordSchema = z.object({
    email: z.string().email(dict.auth.validation.invalidEmail),
  });

  type LoginFormValues = z.infer<typeof loginSchema>;
  type RegisterFormValues = z.infer<typeof registerSchema>;
  type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

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
            {dict.auth.login} <MoveRight className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="overflow-hidden border-white/10 bg-[#161922]/95 p-0 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] backdrop-blur-xl sm:max-w-[420px]">
        <div className="mt-3 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className={cn('mb-6', activeTab === 'forgot-password' && 'hidden')}>
              <TabsList className="grid w-full grid-cols-2 bg-white/5 p-1">
                <TabsTrigger value="login">{dict.auth.login}</TabsTrigger>
                <TabsTrigger value="register">{dict.auth.register}</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="login" className="mt-0 space-y-4 border-none p-0 outline-none">
              <DialogHeader>
                <DialogTitle className="mb-2 text-2xl font-bold text-white">
                  {dict.auth.welcomeBack}
                </DialogTitle>
                <p className="text-sm text-slate-400">{dict.auth.loginSubtitle}</p>
              </DialogHeader>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-slate-300">
                    {dict.auth.emailLabel}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute top-2.5 left-3 h-4 w-4 text-slate-500" />
                    <Input
                      id="login-email"
                      placeholder="name@example.com"
                      className="border-white/10 bg-white/5 pl-10 text-white transition-colors focus:border-cyan-500/50"
                      {...loginForm.register('email')}
                    />
                  </div>
                  {loginForm.formState.errors.email && (
                    <p className="text-xs text-red-400">
                      {loginForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-password" className="text-slate-300">
                      {dict.auth.passwordLabel}
                    </Label>
                    <button
                      type="button"
                      onClick={() => setActiveTab('forgot-password')}
                      className="text-xs text-cyan-400 transition-colors hover:text-cyan-300"
                    >
                      {dict.auth.forgotPasswordLink}
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute top-2.5 left-3 h-4 w-4 text-slate-500" />
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      className="border-white/10 bg-white/5 pl-10 text-white transition-colors focus:border-cyan-500/50"
                      {...loginForm.register('password')}
                    />
                  </div>
                  {loginForm.formState.errors.password && (
                    <p className="text-xs text-red-400">
                      {loginForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 py-6 font-semibold text-white transition-opacity hover:opacity-90"
                >
                  {dict.auth.submitLogin} <MoveRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register" className="mt-0 space-y-4 border-none p-0 outline-none">
              <DialogHeader>
                <DialogTitle className="mb-2 text-2xl font-bold text-white">
                  {dict.auth.createAccount}
                </DialogTitle>
                <p className="text-sm text-slate-400">{dict.auth.registerSubtitle}</p>
              </DialogHeader>
              <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-name" className="text-slate-300">
                    {dict.auth.nameLabel}
                  </Label>
                  <div className="relative">
                    <User className="absolute top-2.5 left-3 h-4 w-4 text-slate-500" />
                    <Input
                      id="reg-name"
                      placeholder={dict.auth.namePlaceholder}
                      className="border-white/10 bg-white/5 pl-10 text-white transition-colors focus:border-cyan-500/50"
                      {...registerForm.register('name')}
                    />
                  </div>
                  {registerForm.formState.errors.name && (
                    <p className="text-xs text-red-400">
                      {registerForm.formState.errors.name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email" className="text-slate-300">
                    {dict.auth.emailLabel}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute top-2.5 left-3 h-4 w-4 text-slate-500" />
                    <Input
                      id="reg-email"
                      placeholder="name@example.com"
                      className="border-white/10 bg-white/5 pl-10 text-white transition-colors focus:border-cyan-500/50"
                      {...registerForm.register('email')}
                    />
                  </div>
                  {registerForm.formState.errors.email && (
                    <p className="text-xs text-red-400">
                      {registerForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password" className="text-slate-300">
                    {dict.auth.passwordLabel}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute top-2.5 left-3 h-4 w-4 text-slate-500" />
                    <Input
                      id="reg-password"
                      type="password"
                      placeholder="••••••••"
                      className="border-white/10 bg-white/5 pl-10 text-white transition-colors focus:border-cyan-500/50"
                      {...registerForm.register('password')}
                    />
                  </div>
                  {registerForm.formState.errors.password && (
                    <p className="text-xs text-red-400">
                      {registerForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 py-6 font-semibold text-white transition-opacity hover:opacity-90"
                >
                  {dict.auth.submitRegister} <MoveRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </TabsContent>

            <TabsContent
              value="forgot-password"
              className="mt-0 space-y-4 border-none p-0 outline-none"
            >
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className="mb-4 flex items-center gap-2 text-xs text-slate-400 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-3 w-3" /> {dict.auth.backToLogin}
              </button>
              <DialogHeader>
                <DialogTitle className="mb-2 text-2xl font-bold text-white">
                  {dict.auth.forgotPassword}
                </DialogTitle>
                <p className="text-sm text-slate-400">{dict.auth.forgotPasswordSubtitle}</p>
              </DialogHeader>
              <form
                onSubmit={forgotPasswordForm.handleSubmit(onForgotPasswordSubmit)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="forgot-email" className="text-slate-300">
                    {dict.auth.emailLabel}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute top-2.5 left-3 h-4 w-4 text-slate-500" />
                    <Input
                      id="forgot-email"
                      placeholder="name@example.com"
                      className="border-white/10 bg-white/5 pl-10 text-white transition-colors focus:border-cyan-500/50"
                      {...forgotPasswordForm.register('email')}
                    />
                  </div>
                  {forgotPasswordForm.formState.errors.email && (
                    <p className="text-xs text-red-400">
                      {forgotPasswordForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <Button variant="gradient" size="xl">
                  {dict.auth.submitForgot}
                  <MoveRight className="ml-2" />
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>

        <div className="border-t border-white/10 bg-white/5 p-4">
          <p className="text-center text-[10px] tracking-widest text-slate-500 uppercase">
            {dict.auth.footerText}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
