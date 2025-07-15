import React, { useState } from 'react';
import { AlertTriangle, X, Bell } from 'lucide-react';

export const AlertsPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [alerts] = useState([
    {
      id: 1,
      type: 'warning',
      title: 'Model Drift Detected',
      message: 'Customer Churn Predictor showing 5% accuracy decline',
      timestamp: '2 minutes ago',
      severity: 'medium'
    },
    {
      id: 2,
      type: 'error',
      title: 'Deployment Failed',
      message: 'Fraud Detection Model v1.6.0 deployment to staging failed',
      timestamp: '15 minutes ago',
      severity: 'high'
    },
    {
      id: 3,
      type: 'info',
      title: 'Weekly Report Available',
      message: 'Model performance report for week ending Jan 15, 2025',
      timestamp: '1 hour ago',
      severity: 'low'
    }
  ]);

  const activeAlerts = alerts.filter(alert => alert.type === 'warning' || alert.type === 'error');

  if (!isOpen && activeAlerts.length === 0) return null;

  return (
    <>
      {/* Alert Bell */}
      {activeAlerts.length > 0 && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors"
        >
          <Bell className="h-6 w-6" />
          {activeAlerts.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {activeAlerts.length}
            </span>
          )}
        </button>
      )}

      {/* Alert Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="font-medium text-gray-900">System Alerts</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {alerts.map((alert) => (
              <div key={alert.id} className={`p-4 border-b border-gray-100 ${
                alert.type === 'error' 
                  ? 'bg-red-50 border-l-4 border-l-red-500' 
                  : alert.type === 'warning'
                  ? 'bg-yellow-50 border-l-4 border-l-yellow-500'
                  : 'bg-blue-50 border-l-4 border-l-blue-500'
              }`}>
                <div className="flex items-start space-x-3">
                  <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                    alert.type === 'error' 
                      ? 'text-red-600' 
                      : alert.type === 'warning'
                      ? 'text-yellow-600'
                      : 'text-blue-600'
                  }`} />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{alert.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-2">{alert.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};