import React, { useState } from 'react';
import { Header } from './components/Header';
import { PipelineOverview } from './components/PipelineOverview';
import { ModelHandoff } from './components/ModelHandoff';
import { ModelValidation } from './components/ModelValidation';
import { DeploymentPipeline } from './components/DeploymentPipeline';
import { MonitoringDashboard } from './components/MonitoringDashboard';
import { ExplainabilityDashboard } from './components/ExplainabilityDashboard';
import { AlertsPanel } from './components/AlertsPanel';

export type PipelineStage = 'handoff' | 'validation' | 'deployment' | 'monitoring' | 'explainability';

export interface ModelInfo {
  id: string;
  name: string;
  version: string;
  framework: string;
  accuracy: number;
  status: 'submitted' | 'validated' | 'staging' | 'production';
  submittedBy: string;
  submittedAt: string;
  validatedAt?: string;
  deployedAt?: string;
}

function App() {
  const [currentStage, setCurrentStage] = useState<PipelineStage>('handoff');
  const [models, setModels] = useState<ModelInfo[]>([
    {
      id: '1',
      name: 'Customer Churn Predictor',
      version: 'v2.1.0',
      framework: 'XGBoost',
      accuracy: 0.94,
      status: 'production',
      submittedBy: 'Sarah Chen',
      submittedAt: '2025-01-15T10:30:00Z',
      validatedAt: '2025-01-15T14:20:00Z',
      deployedAt: '2025-01-15T16:45:00Z'
    },
    {
      id: '2',
      name: 'Fraud Detection Model',
      version: 'v1.5.2',
      framework: 'TensorFlow',
      accuracy: 0.97,
      status: 'staging',
      submittedBy: 'Alex Rodriguez',
      submittedAt: '2025-01-16T09:15:00Z',
      validatedAt: '2025-01-16T11:30:00Z'
    }
  ]);

  const updateModelStatus = (modelId: string, status: ModelInfo['status']) => {
    setModels(prev => prev.map(model => 
      model.id === modelId 
        ? { 
            ...model, 
            status,
            ...(status === 'validated' && { validatedAt: new Date().toISOString() }),
            ...(status === 'production' && { deployedAt: new Date().toISOString() })
          }
        : model
    ));
  };

  const addModel = (modelData: Omit<ModelInfo, 'id'>) => {
    const newModel: ModelInfo = {
      ...modelData,
      id: (models.length + 1).toString()
    };
    setModels(prev => [...prev, newModel]);
  };

  const renderCurrentStage = () => {
    switch (currentStage) {
      case 'handoff':
        return <ModelHandoff models={models} onAddModel={addModel} />;
      case 'validation':
        return <ModelValidation models={models} onUpdateStatus={updateModelStatus} />;
      case 'deployment':
        return <DeploymentPipeline models={models} onUpdateStatus={updateModelStatus} />;
      case 'monitoring':
        return <MonitoringDashboard models={models} />;
      case 'explainability':
        return <ExplainabilityDashboard models={models} />;
      default:
        return <PipelineOverview models={models} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <PipelineOverview 
              models={models} 
              currentStage={currentStage}
              onStageChange={setCurrentStage}
            />
          </div>
          
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {renderCurrentStage()}
            </div>
          </div>
        </div>
      </div>

      <AlertsPanel />
    </div>
  );
}

export default App;