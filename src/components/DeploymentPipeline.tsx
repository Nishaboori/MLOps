import React, { useState } from 'react';
import { ModelInfo } from '../App';
import { Rocket, CheckCircle, ArrowRight, Server, Globe, AlertTriangle } from 'lucide-react';

interface DeploymentPipelineProps {
  models: ModelInfo[];
  onUpdateStatus: (modelId: string, status: ModelInfo['status']) => void;
}

export const DeploymentPipeline: React.FC<DeploymentPipelineProps> = ({ 
  models, 
  onUpdateStatus 
}) => {
  const [deployingModel, setDeployingModel] = useState<string | null>(null);
  const [deploymentStage, setDeploymentStage] = useState<'staging' | 'production'>('staging');
  
  const validatedModels = models.filter(m => m.status === 'validated');
  const stagingModels = models.filter(m => m.status === 'staging');
  const productionModels = models.filter(m => m.status === 'production');

  const handleDeploy = (modelId: string, environment: 'staging' | 'production') => {
    setDeployingModel(modelId);
    setDeploymentStage(environment);
    
    // Simulate deployment process
    setTimeout(() => {
      onUpdateStatus(modelId, environment === 'staging' ? 'staging' : 'production');
      setDeployingModel(null);
    }, 3000);
  };

  const deploymentSteps = [
    { id: 'build', title: 'Build Container', status: 'completed' },
    { id: 'test', title: 'Run Tests', status: 'completed' },
    { id: 'deploy', title: 'Deploy to Environment', status: 'in-progress' },
    { id: 'health', title: 'Health Check', status: 'pending' },
    { id: 'traffic', title: 'Route Traffic', status: 'pending' }
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Deployment Pipeline</h2>
        <p className="text-gray-600">Deploy validated models to staging and production environments</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Validated Models */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            Validated Models
          </h3>
          <div className="space-y-4">
            {validatedModels.map((model) => (
              <div key={model.id} className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{model.name}</h4>
                  <span className="text-sm text-gray-600">{model.version}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Accuracy: {(model.accuracy * 100).toFixed(1)}%
                </p>
                <button
                  onClick={() => handleDeploy(model.id, 'staging')}
                  disabled={deployingModel === model.id}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {deployingModel === model.id ? (
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  ) : (
                    <Server className="h-4 w-4" />
                  )}
                  <span>Deploy to Staging</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Staging Environment */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Server className="h-5 w-5 text-blue-600 mr-2" />
            Staging Environment
          </h3>
          <div className="space-y-4">
            {stagingModels.map((model) => (
              <div key={model.id} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{model.name}</h4>
                  <span className="text-sm text-gray-600">{model.version}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Testing in staging environment
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDeploy(model.id, 'production')}
                    disabled={deployingModel === model.id}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {deployingModel === model.id ? (
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    ) : (
                      <Globe className="h-4 w-4" />
                    )}
                    <span>Promote</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Production Environment */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Globe className="h-5 w-5 text-green-600 mr-2" />
            Production Environment
          </h3>
          <div className="space-y-4">
            {productionModels.map((model) => (
              <div key={model.id} className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{model.name}</h4>
                  <span className="text-sm text-gray-600">{model.version}</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="text-green-600 font-medium">Live</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Requests/min:</span>
                    <span className="font-medium">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Uptime:</span>
                    <span className="font-medium">99.9%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Deployment Progress */}
      {deployingModel && (
        <div className="mt-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Deploying to {deploymentStage === 'staging' ? 'Staging' : 'Production'}
          </h3>
          <div className="space-y-4">
            {deploymentSteps.map((step, index) => (
              <div key={step.id} className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.status === 'completed' 
                    ? 'bg-green-100 text-green-600' 
                    : step.status === 'in-progress'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {step.status === 'completed' ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : step.status === 'in-progress' ? (
                    <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                  ) : (
                    <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{step.title}</h4>
                  <p className="text-sm text-gray-600 capitalize">{step.status}</p>
                </div>
                {index < deploymentSteps.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};