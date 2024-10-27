"use client";

import { Clock, CheckCircle2, AlertCircle, Coffee, Brain } from 'lucide-react';
import React from 'react';

export type Status = 'In Progress' | 'Available' | 'On Break' | 'Focused';
export type Priority = 'High' | 'Medium' | 'Low';

export const getStatusColor = (status: string): string => {
  const colors: { [key in Status]: string } = {
    'In Progress': 'bg-blue-500',
    'Available': 'bg-green-500',
    'On Break': 'bg-orange-400',
    'Focused': 'bg-purple-500'
  };
  return colors[status as Status] || 'bg-gray-500';
};

export const getPriorityColor = (priority: string): string => {
  const colors: { [key in Priority]: string } = {
    'High': 'bg-red-500',
    'Medium': 'bg-yellow-500',
    'Low': 'bg-green-500'
  };
  return colors[priority as Priority] || 'bg-gray-500';
};

export const getStatusIcon = (status: string) => {
  const icons = {
    'In Progress': () => <Clock className="h-4 w-4" />,
    'Available': () => <CheckCircle2 className="h-4 w-4" />,
    'On Break': () => <Coffee className="h-4 w-4" />,
    'Focused': () => <Brain className="h-4 w-4" />,
  };

  const IconComponent = icons[status as Status] || (() => <AlertCircle className="h-4 w-4" />);
  return <IconComponent />;
};