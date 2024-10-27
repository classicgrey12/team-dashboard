"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Progress } from '@/components/ui/progress';
import { ThemeToggle } from './theme-toggle';
import { User, TrendingUp, Users, Clock, AlertCircle } from 'lucide-react';

// Example data
const projectProgress = [
  { name: 'Week 1', completed: 5, total: 8 },
  { name: 'Week 2', completed: 12, total: 15 },
  { name: 'Week 3', completed: 18, total: 20 },
  { name: 'Week 4', completed: 25, total: 30 },
];

const teamActivity = [
  { day: 'Mon', tasks: 12, commits: 23 },
  { day: 'Tue', tasks: 15, commits: 18 },
  { day: 'Wed', tasks: 8, commits: 28 },
  { day: 'Thu', tasks: 10, commits: 15 },
  { day: 'Fri', tasks: 18, commits: 32 },
];

const taskDistribution = {
  backend: 35,
  frontend: 28,
  design: 20,
  testing: 17
};

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Digital Factory Analytics</h1>
            <p className="text-muted-foreground">Welcome back, Kirsten Rieger</p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span>Admin Dashboard</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="flex items-center p-6">
              <TrendingUp className="h-8 w-8 text-blue-500 mr-4" />
              <div>
                <p className="text-sm text-muted-foreground">Sprint Progress</p>
                <h3 className="text-2xl font-bold">83%</h3>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <Users className="h-8 w-8 text-green-500 mr-4" />
              <div>
                <p className="text-sm text-muted-foreground">Team Velocity</p>
                <h3 className="text-2xl font-bold">24.5</h3>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <Clock className="h-8 w-8 text-amber-500 mr-4" />
              <div>
                <p className="text-sm text-muted-foreground">Avg. Completion</p>
                <h3 className="text-2xl font-bold">2.3 days</h3>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <AlertCircle className="h-8 w-8 text-red-500 mr-4" />
              <div>
                <p className="text-sm text-muted-foreground">Open Blockers</p>
                <h3 className="text-2xl font-bold">3</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Project Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={projectProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="completed" stroke="#3b82f6" />
                    <Line type="monotone" dataKey="total" stroke="#94a3b8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={teamActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="tasks" fill="#3b82f6" />
                    <Bar dataKey="commits" fill="#94a3b8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Task Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Task Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Backend Development</span>
                  <span>{taskDistribution.backend}%</span>
                </div>
                <Progress value={taskDistribution.backend} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Frontend Development</span>
                  <span>{taskDistribution.frontend}%</span>
                </div>
                <Progress value={taskDistribution.frontend} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Design</span>
                  <span>{taskDistribution.design}%</span>
                </div>
                <Progress value={taskDistribution.design} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Testing</span>
                  <span>{taskDistribution.testing}%</span>
                </div>
                <Progress value={taskDistribution.testing} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}