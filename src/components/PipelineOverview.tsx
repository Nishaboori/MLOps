import React from 'react';
import { ModelInfo, PipelineStage } from '../App';
import { 
  Upload, 
  CheckCircle, 
  Rocket, 
  Monitor, 
  Brain,
  Clock,
  AlertTriangle
} from 'lucide-react';

interface PipelineOverviewProps {
  models: ModelInfo[];
  currentStage: PipelineStage;
  onStageChange: (stage: PipelineStage) => void;
}

export const PipelineOverview: React.FC<PipelineOverviewProps> = ({ 
  models, 
  currentStage, 
  onStageChange 
}) => {
  const stages = [
    {
      id: 'handoff' as PipelineStage,
      title: 'Model Handoff',
      icon: Upload,
      description: 'Data scientists submit trained models',
      color: 'bg-blue-500',
      count: models.filter(m => m.status === 'submitted').length
    },
    {
      id: 'validation' as PipelineStage,
      title: 'Validation',
      icon: CheckCircle,
      description: 'Verify and validate model performance',
      color: 'bg-yellow-500',
      count: models.filter(m => m.status === 'submitted').length
    },
    {
      id: 'deployment' as PipelineStage,
      title: 'Deployment',
      icon: Rocket,
      description: 'Deploy to staging and production',
      color: 'bg-purple-500',
      count: models.filter(m => m.status === 'staging').length
    },
    {
      id: 'monitoring' as PipelineStage,
      title: 'Monitoring',
      icon: Monitor,
      description: 'Track model performance metrics',
      color: 'bg-green-500',
      count: models.filter(m => m.status === 'production').length
    },
    {
      id: 'explainability' as PipelineStage,
      title: 'Explainability',
      icon: Brain,
      description: 'Model insights and transparency',
      color: 'bg-indigo-500',
      count: models.filter(m => m.status === 'production').length
    }
  ];

  const getStageStatus = (stage: PipelineStage) => {
    const stageData = stages.find(s => s.id === stage);
    if (!stageData) return 'idle';
    
    if (stageData.count > 0) return 'active';
    return 'idle';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Pipeline Overview</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>Last updated: 2 min ago</span>
        </div>
      </div>

      <div className="space-y-4">
        {stages.map((stage) => {
          const Icon = stage.icon;
          const isActive = currentStage === stage.id;
          const status = getStageStatus(stage.id);
          
          return (
            <button
              key={stage.id}
              onClick={() => onStageChange(stage.id)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                isActive 
                  ? 'border-blue-500 bg-blue-50 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${stage.color} text-white`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{stage.title}</h3>
                    <p className="text-sm text-gray-600">{stage.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {stage.count > 0 && (
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                      {stage.count}
                    </span>
                  )}
                  <div className={`h-2 w-2 rounded-full ${
                    status === 'active' 
                      ? 'bg-green-500 animate-pulse' 
                      : 'bg-gray-300'
                  }`} />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Total Models</span>
          <span className="font-semibold text-gray-900">{models.length}</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-gray-600">In Production</span>
          <span className="font-semibold text-green-600">
            {models.filter(m => m.status === 'production').length}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-gray-600">Pending Review</span>
          <span className="font-semibold text-yellow-600">
            {models.filter(m => m.status === 'submitted').length}
          </span>
        </div>
      </div>
    </div>
  );
};