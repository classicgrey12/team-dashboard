"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, User } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { PasswordInput } from '@/components/password-input';

export default function LoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // Check for remembered credentials
    const saved = localStorage.getItem('rememberedUser');
    if (saved) {
      const { username, password } = JSON.parse(saved);
      setCredentials({ username, password });
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (credentials.username.toLowerCase() === 'kirsten.rieger' && 
          credentials.password === 'digitalfactory') {
        if (rememberMe) {
          localStorage.setItem('rememberedUser', JSON.stringify(credentials));
        } else {
          localStorage.removeItem('rememberedUser');
        }
        localStorage.setItem('user', JSON.stringify({
          name: 'Kirsten Rieger',
          role: 'admin'
        }));
        router.push('/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-center mb-4">
            <div className="bg-blue-600 dark:bg-blue-500 p-3 rounded-xl hover:scale-105 transition-transform">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <ThemeToggle />
          </div>
          <CardTitle className="text-2xl text-center font-bold animate-slide-up">
            Digital Factory
          </CardTitle>
          <p className="text-center text-muted-foreground animate-slide-up delay-100">
            Team Management Portal
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="animate-slide-up p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950/50 border border-red-100 dark:border-red-900 rounded-lg">
                {error}
              </div>
            )}
            
            <div className="space-y-2 animate-slide-up">
              <label className="text-sm font-medium dark:text-white">
                Username
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <User className="h-5 w-5" />
                </span>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring transition-colors dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  placeholder="Enter your username"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({
                    ...prev,
                    username: e.target.value
                  }))}
                />
              </div>
            </div>

            <div className="space-y-2 animate-slide-up">
              <label className="text-sm font-medium dark:text-white">
                Password
              </label>
              <PasswordInput
                value={credentials.password}
                onChange={(value) => setCredentials(prev => ({
                  ...prev,
                  password: value
                }))}
              />
            </div>

            <div className="flex items-center animate-slide-up">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-muted-foreground dark:text-gray-300">
                Remember me
              </label>
            </div>

            <Button 
              type="submit" 
              className="w-full animate-scale bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>

            <div className="mt-6 p-4 bg-muted rounded-lg space-y-2 animate-slide-up dark:bg-slate-800 dark:text-white">
              <p className="text-sm font-medium text-center">
                Demo Credentials
              </p>
              <div className="space-y-1 text-sm text-muted-foreground dark:text-gray-300">
                <div className="flex items-center justify-center gap-1">
                  <User className="h-4 w-4" />
                  <span>Username: </span>
                  <span className="font-medium">kirsten.rieger</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <User className="h-4 w-4" />
                  <span>Password: </span>
                  <span className="font-medium">digitalfactory</span>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}