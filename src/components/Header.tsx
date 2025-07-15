import React from 'react';
import { Activity, Settings, User } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">MLOps Pipeline</h1>
            </div>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              v2.1.0
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>All Systems Operational</span>
            </div>
            
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
            
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
              <User className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-900">ML Engineer</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};