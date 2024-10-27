"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getStatusColor, getPriorityColor, getStatusIcon } from "@/lib/status-utils";
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Coffee,
  Brain,
  Calendar,
  LineChart,
  Target,
  Clock8
} from 'lucide-react';

// Types
interface ProjectDetails {
  name: string;
  progress: number;
  status: string;
}

interface Performance {
  onTimeDelivery: number;
  taskAccuracy: number;
  collaborationScore: number;
}

interface TimeDistribution {
  development: number;
  meetings: number;
  planning: number;
  review: number;
}

interface TeamMember {
  id: number;
  name: string;
  status: string;
  task: string;
  lastUpdated: string;
  projectDetails: {
    name: string;
    priority: string;
    isOnHold: boolean;
    progress?: number;
    holdReason?: string;
  };
  stats: {
    completedTasks: number;
    totalTasks: number;
    avgCompletionTime: string;
    workload: number;
    recentProjects: ProjectDetails[];
    performance: Performance;
    timeDistribution: TimeDistribution;
  };
}

interface MemberDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  member: TeamMember;
}

export function MemberDetailDialog({ isOpen, onClose, member }: MemberDetailDialogProps) {
  const timeDistributionEntries = Object.entries(member.stats.timeDistribution) as [keyof TimeDistribution, number][];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto dark:bg-slate-900">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl font-bold dark:text-white mb-2">
                {member.name}
              </DialogTitle>
              <div className="flex gap-2">
                <Badge 
                  className={`${getStatusColor(member.status)} text-white flex items-center gap-1`}
                >
                  {getStatusIcon(member.status)}
                  {member.status}
                </Badge>
                <Badge 
                  className={`${getPriorityColor(member.projectDetails.priority)} text-white`}
                >
                  {member.projectDetails.priority} Priority
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Current Project Status */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold dark:text-white">Current Project</h3>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
              <p className="text-sm font-medium dark:text-slate-300">Task:</p>
              <p className="text-slate-900 dark:text-white mb-4">{member.task}</p>
              
              {member.projectDetails.progress !== undefined && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="dark:text-slate-300">Progress</span>
                    <span className="dark:text-white">
                      {member.projectDetails.progress}%
                    </span>
                  </div>
                  <Progress 
                    value={member.projectDetails.progress} 
                    className="h-2"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold dark:text-white">Performance Metrics</h3>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="dark:text-slate-300">On-time Delivery</span>
                  <span className="dark:text-white">{member.stats.performance.onTimeDelivery}%</span>
                </div>
                <Progress value={member.stats.performance.onTimeDelivery} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="dark:text-slate-300">Task Accuracy</span>
                  <span className="dark:text-white">{member.stats.performance.taskAccuracy}%</span>
                </div>
                <Progress value={member.stats.performance.taskAccuracy} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="dark:text-slate-300">Collaboration Score</span>
                  <span className="dark:text-white">{member.stats.performance.collaborationScore}%</span>
                </div>
                <Progress value={member.stats.performance.collaborationScore} className="h-2" />
              </div>
            </div>
          </div>

          {/* Time Distribution */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold dark:text-white">Time Distribution</h3>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 space-y-3">
              {timeDistributionEntries.map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="dark:text-slate-300 capitalize">{key}</span>
                    <span className="dark:text-white">{value}%</span>
                  </div>
                  <Progress value={value} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Projects */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold dark:text-white">Recent Projects</h3>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
              <div className="space-y-4">
                {member.stats.recentProjects.map((project: ProjectDetails, index: number) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium dark:text-white">
                        {project.name}
                      </span>
                      <Badge variant="secondary" className="dark:bg-slate-700 dark:text-white">
                        {project.status}
                      </Badge>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span className="text-sm dark:text-slate-300">Completed Tasks</span>
            </div>
            <p className="text-2xl font-bold dark:text-white">
              {member.stats.completedTasks}/{member.stats.totalTasks}
            </p>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock8 className="h-5 w-5 text-blue-500" />
              <span className="text-sm dark:text-slate-300">Avg. Completion</span>
            </div>
            <p className="text-2xl font-bold dark:text-white">
              {member.stats.avgCompletionTime}
            </p>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-purple-500" />
              <span className="text-sm dark:text-slate-300">Workload</span>
            </div>
            <p className="text-2xl font-bold dark:text-white">
              {member.stats.workload}%
            </p>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <LineChart className="h-5 w-5 text-amber-500" />
              <span className="text-sm dark:text-slate-300">Efficiency</span>
            </div>
            <p className="text-2xl font-bold dark:text-white">
              {Math.round((member.stats.performance.onTimeDelivery + 
                member.stats.performance.taskAccuracy) / 2)}%
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}