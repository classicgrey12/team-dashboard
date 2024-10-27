"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MemberDetailDialog } from "@/components/member-detail-dialog";
import { getStatusColor, getPriorityColor, getStatusIcon } from "@/lib/status-utils";
import {
  Building2,
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
  Coffee,
  Brain,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

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
    holdReason?: string;  // Add this line
  };
  stats: {
    completedTasks: number;
    totalTasks: number;
    avgCompletionTime: string;
    workload: number;
    recentProjects: {
      name: string;
      progress: number;
      status: string;
    }[];
    performance: {
      onTimeDelivery: number;
      taskAccuracy: number;
      collaborationScore: number;
    };
    timeDistribution: {
      development: number;
      meetings: number;
      planning: number;
      review: number;
    };
  };
}
export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Example team data
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Sven',
      status: 'In Progress',
      task: 'Building the new authentication system',
      lastUpdated: '2 hours ago',
      projectDetails: {
        name: 'Authentication System',
        priority: 'High',
        isOnHold: false,
        progress: 65
      },
      stats: {
        completedTasks: 38,
        totalTasks: 45,
        avgCompletionTime: '1.8d',
        workload: 75,
        recentProjects: [
          { name: 'Payment Gateway', progress: 40, status: 'On Hold' },
          { name: 'Stripe Integration', progress: 100, status: 'Completed' },
          { name: 'PayPal Service', progress: 90, status: 'Review' }
        ],
        performance: {
          onTimeDelivery: 92,
          taskAccuracy: 95,
          collaborationScore: 88
        },
        timeDistribution: {
          development: 60,
          meetings: 20,
          planning: 10,
          review: 10
        }
      }
    },
    {
      id: 2,
      name: 'Flo',
      status: 'On Break',
      task: 'Refactoring payment integration',
      lastUpdated: '45 minutes ago',
      projectDetails: {
        name: 'Payment System',
        priority: 'Medium',
        isOnHold: true,
        progress: 40,
        holdReason: 'Waiting for API documentation'  // Example of using holdReason
      },
      stats: {
        completedTasks: 38,
        totalTasks: 45,
        avgCompletionTime: '1.8d',
        workload: 75,
        recentProjects: [
          { name: 'Payment Gateway', progress: 40, status: 'On Hold' },
          { name: 'Stripe Integration', progress: 100, status: 'Completed' },
          { name: 'PayPal Service', progress: 90, status: 'Review' }
        ],
        performance: {
          onTimeDelivery: 92,
          taskAccuracy: 95,
          collaborationScore: 88
        },
        timeDistribution: {
          development: 60,
          meetings: 20,
          planning: 10,
          review: 10
        }
      }
    },
    // ... other team members
  ];

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const filteredMembers = teamMembers.filter(member => {
    if (activeTab === 'active') return !member.projectDetails.isOnHold;
    if (activeTab === 'onhold') return member.projectDetails.isOnHold;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-600 dark:text-blue-500" />
              <h1 className="ml-3 text-xl font-semibold">
                Digital Factory
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <ThemeToggle />
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span className="font-medium">Kirsten Rieger</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-lg font-medium">
            Real-time overview of team activities
          </h2>
        </div>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger
              value="all"
              onClick={() => setActiveTab('all')}
            >
              All Projects
            </TabsTrigger>
            <TabsTrigger
              value="active"
              onClick={() => setActiveTab('active')}
            >
              Active
            </TabsTrigger>
            <TabsTrigger
              value="onhold"
              onClick={() => setActiveTab('onhold')}
            >
              On Hold
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
            <Card 
              key={member.id} 
              className="overflow-hidden hover:shadow-lg transition-all duration-200 dark:bg-slate-800/50"
              onClick={() => setSelectedMember(member)}
            >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
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
                {member.projectDetails.isOnHold && (
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-700 dark:text-white">
                    <AlertTriangle className="h-4 w-4 mr-1 text-amber-500" />
                    On Hold
                  </Badge>
                )}
              </div>
          
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    Current Task:
                  </p>
                  <p className="text-slate-900 dark:text-white">{member.task}</p>
                </div>
                {member.projectDetails.isOnHold && member.projectDetails.holdReason && (
                  <div className="text-amber-600 dark:text-amber-400 text-sm">
                    <p className="font-medium">Hold Reason:</p>
                    <p>{member.projectDetails.holdReason}</p>
                  </div>
                )}
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  Last updated: {member.lastUpdated}
                </div>
              </div>
            </CardContent>
          </Card>
          ))}
        </div>
      </div>
      
      {selectedMember && (
        <MemberDetailDialog
          isOpen={!!selectedMember}
          onClose={() => setSelectedMember(null)}
          member={selectedMember}
        />
      )}
    </div>
  );
}