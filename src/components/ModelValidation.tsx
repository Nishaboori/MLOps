import React, { useState } from 'react';
import { ModelInfo } from '../App';
import { CheckCircle, XCircle, AlertTriangle, FileText, TrendingUp, TestTube } from 'lucide-react';

interface ModelValidationProps {
  models: ModelInfo[];
  onUpdateStatus: (modelId: string, status: ModelInfo['status']) => void;
}

export const ModelValidation: React.FC<ModelValidationProps> = ({ 
  models, 
  onUpdateStatus 
}) => {
  const [validatingModel, setValidatingModel] = useState<string | null>(null);
  
  const submittedModels = models.filter(m => m.status === 'submitted');

  const handleValidation = (modelId: string, isValid: boolean) => {
    setValidatingModel(modelId);
    
    // Simulate validation process
    setTimeout(() => {
      onUpdateStatus(modelId, isValid ? 'validated' : 'submitted');
      setValidatingModel(null);
    }, 2000);
  };

  const validationChecks = [
    {
      id: 'performance',
      title: 'Performance Metrics',
      description: 'Accuracy, precision, recall validation',
      status: 'passed',
      icon: TrendingUp
    },
    {
      id: 'tests',
      title: 'Unit Tests',
      description: 'Model inference and data validation',
      status: 'passed',
      icon: TestTube
    },
    {
      id: 'security',
      title: 'Security Scan',
      description: 'Vulnerability and dependency check',
      status: 'warning',
      icon: AlertTriangle
    },
    {
      id: 'compliance',
      title: 'Compliance Check',
      description: 'Regulatory and ethical guidelines',
      status: 'passed',
      icon: CheckCircle
    }
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Model Validation</h2>
        <p className="text-gray-600">Verify and validate model performance before deployment</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Validation Queue */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Validation Queue</h3>
          <div className="space-y-4">
            {submittedModels.map((model) => (
              <div key={model.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <h4 className="font-semibold text-gray-900">{model.name}</h4>
                    <span className="text-sm text-gray-600">{model.version}</span>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                    {model.framework}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-600">Accuracy:</span>
                    <span className="ml-2 font-medium">{(model.accuracy * 100).toFixed(1)}%</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Submitted by:</span>
                    <span className="ml-2 font-medium">{model.submittedBy}</span>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleValidation(model.id, true)}
                    disabled={validatingModel === model.id}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {validatingModel === model.id ? (
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    ) : (
                      <CheckCircle className="h-4 w-4" />
                    )}
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => handleValidation(model.id, false)}
                    disabled={validatingModel === model.id}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    <XCircle className="h-4 w-4" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            ))}
            
            {submittedModels.length === 0 && (
              <div className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No models to validate</h3>
                <p className="text-gray-600">All submitted models have been processed.</p>
              </div>
            )}
          </div>
        </div>

        {/* Validation Checklist */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Validation Checklist</h3>
          <div className="space-y-3">
            {validationChecks.map((check) => {
              const Icon = check.icon;
              const getStatusColor = () => {
                switch (check.status) {
                  case 'passed': return 'text-green-600';
                  case 'warning': return 'text-yellow-600';
                  case 'failed': return 'text-red-600';
                  default: return 'text-gray-600';
                }
              };
              
              return (
                <div key={check.id} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon className={`h-4 w-4 ${getStatusColor()}`} />
                      <h4 className="font-medium text-gray-900">{check.title}</h4>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      check.status === 'passed' 
                        ? 'bg-green-100 text-green-800'
                        : check.status === 'warning'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {check.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{check.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};