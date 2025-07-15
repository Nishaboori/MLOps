import React from 'react';
import { ModelInfo } from '../App';
import { 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Users,
  Zap,
  Server
} from 'lucide-react';

interface MonitoringDashboardProps {
  models: ModelInfo[];
}

export const MonitoringDashboard: React.FC<MonitoringDashboardProps> = ({ models }) => {
  const productionModels = models.filter(m => m.status === 'production');

  const metrics = [
    {
      title: 'Total Requests',
      value: '1,247,892',
      change: '+12.3%',
      trend: 'up',
      icon: Activity
    },
    {
      title: 'Avg Response Time',
      value: '45ms',
      change: '-5.2%',
      trend: 'down',
      icon: Clock
    },
    {
      title: 'Success Rate',
      value: '99.94%',
      change: '+0.1%',
      trend: 'up',
      icon: CheckCircle
    },
    {
      title: 'Active Users',
      value: '8,234',
      change: '+8.7%',
      trend: 'up',
      icon: Users
    }
  ];

  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'High Latency Detected',
      message: 'Customer Churn Predictor response time increased by 15%',
      timestamp: '2 minutes ago',
      model: 'Customer Churn Predictor'
    },
    {
      id: 2,
      type: 'info',
      title: 'Model Performance Update',
      message: 'Weekly accuracy report available for review',
      timestamp: '1 hour ago',
      model: 'Fraud Detection Model'
    }
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Monitoring Dashboard</h2>
        <p className="text-gray-600">Track model performance and system health in real-time</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.title} className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <Icon className="h-6 w-6 text-gray-600" />
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  metric.trend === 'up' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {metric.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
              <p className="text-sm text-gray-600">{metric.title}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Model Performance */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Model Performance</h3>
          <div className="space-y-4">
            {productionModels.map((model) => (
              <div key={model.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{model.name}</h4>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                    Healthy
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="text-sm">
                    <span className="text-gray-600">Accuracy:</span>
                    <span className="ml-2 font-medium">{(model.accuracy * 100).toFixed(1)}%</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Uptime:</span>
                    <span className="ml-2 font-medium">99.9%</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Requests/min:</span>
                    <span className="ml-2 font-medium">1,247</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Latency:</span>
                    <span className="ml-2 font-medium">45ms</span>
                  </div>
                </div>
                
                <div className="bg-white rounded p-3">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Performance Trend</span>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="h-12 bg-gradient-to-r from-green-100 to-green-200 rounded flex items-end justify-between px-1">
                    {[65, 72, 68, 75, 82, 78, 85, 90, 88, 94].map((height, i) => (
                      <div 
                        key={i}
                        className="bg-green-500 w-2 rounded-t"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Alerts & Notifications</h3>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className={`rounded-lg p-4 border ${
                alert.type === 'warning' 
                  ? 'bg-yellow-50 border-yellow-200' 
                  : 'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex items-start space-x-3">
                  <div className={`p-1 rounded-full ${
                    alert.type === 'warning' 
                      ? 'bg-yellow-100 text-yellow-600' 
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {alert.type === 'warning' ? (
                      <AlertTriangle className="h-4 w-4" />
                    ) : (
                      <Activity className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{alert.title}</h4>
                    <p className="text-sm text-gray-600 mb-1">{alert.message}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Model: {alert.model}</span>
                      <span>{alert.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">System Health</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API Gateway</span>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">Operational</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">Operational</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Model Servers</span>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-yellow-600">Degraded</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};