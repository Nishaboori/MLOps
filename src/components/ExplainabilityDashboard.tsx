import React, { useState } from 'react';
import { ModelInfo } from '../App';
import { 
  Brain, 
  BarChart3, 
  PieChart,
  Lightbulb,
  FileText,
  TrendingUp,
  Users,
  Target
} from 'lucide-react';

interface ExplainabilityDashboardProps {
  models: ModelInfo[];
}

export const ExplainabilityDashboard: React.FC<ExplainabilityDashboardProps> = ({ models }) => {
  const [selectedModel, setSelectedModel] = useState<ModelInfo | null>(
    models.find(m => m.status === 'production') || null
  );

  const productionModels = models.filter(m => m.status === 'production');

  const featureImportance = [
    { feature: 'Account Balance', importance: 0.85, impact: 'High' },
    { feature: 'Transaction History', importance: 0.72, impact: 'High' },
    { feature: 'Customer Age', importance: 0.58, impact: 'Medium' },
    { feature: 'Geographic Region', importance: 0.43, impact: 'Medium' },
    { feature: 'Product Usage', importance: 0.31, impact: 'Low' }
  ];

  const modelInsights = [
    {
      title: 'Prediction Confidence',
      value: '92.4%',
      description: 'Average confidence score for predictions',
      icon: Target
    },
    {
      title: 'Feature Coverage',
      value: '15/18',
      description: 'Features actively contributing to predictions',
      icon: BarChart3
    },
    {
      title: 'Bias Detection',
      value: 'Low Risk',
      description: 'Fairness assessment across demographics',
      icon: Users
    },
    {
      title: 'Model Stability',
      value: '98.7%',
      description: 'Consistency of predictions over time',
      icon: TrendingUp
    }
  ];

  const explanations = [
    {
      id: 1,
      prediction: 'High Churn Risk',
      confidence: 0.89,
      topFactors: [
        'Low account balance (35% influence)',
        'Decreased transaction frequency (28% influence)',
        'Recent support tickets (22% influence)'
      ],
      recommendation: 'Proactive customer retention campaign recommended'
    },
    {
      id: 2,
      prediction: 'Fraud Detected',
      confidence: 0.96,
      topFactors: [
        'Unusual transaction amount (42% influence)',
        'Geographic anomaly (31% influence)',
        'Time-based pattern deviation (19% influence)'
      ],
      recommendation: 'Immediate transaction review and customer verification'
    }
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Explainability Dashboard</h2>
        <p className="text-gray-600">Understand model behavior and ensure transparency in predictions</p>
      </div>

      {/* Model Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Model for Analysis
        </label>
        <select
          value={selectedModel?.id || ''}
          onChange={(e) => setSelectedModel(productionModels.find(m => m.id === e.target.value) || null)}
          className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {productionModels.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name} ({model.version})
            </option>
          ))}
        </select>
      </div>

      {selectedModel && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Model Insights */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Model Insights</h3>
            <div className="space-y-4">
              {modelInsights.map((insight) => {
                const Icon = insight.icon;
                return (
                  <div key={insight.title} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center space-x-3 mb-2">
                      <Icon className="h-5 w-5 text-blue-600" />
                      <h4 className="font-medium text-gray-900">{insight.title}</h4>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{insight.value}</p>
                    <p className="text-sm text-gray-600">{insight.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Feature Importance */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Feature Importance</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="space-y-4">
                {featureImportance.map((feature) => (
                  <div key={feature.feature}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{feature.feature}</span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        feature.impact === 'High' 
                          ? 'bg-red-100 text-red-800'
                          : feature.impact === 'Medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {feature.impact}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${feature.importance * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {(feature.importance * 100).toFixed(1)}% importance
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Prediction Explanations */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Predictions</h3>
            <div className="space-y-4">
              {explanations.map((explanation) => (
                <div key={explanation.id} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{explanation.prediction}</h4>
                    <span className="text-sm text-gray-600">
                      {(explanation.confidence * 100).toFixed(1)}% confidence
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Top Contributing Factors:</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {explanation.topFactors.map((factor, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="h-1 w-1 bg-gray-400 rounded-full" />
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 rounded p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Lightbulb className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">Recommendation</span>
                    </div>
                    <p className="text-sm text-blue-800">{explanation.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Documentation */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <FileText className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-medium text-gray-900">Model Documentation</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Ethical Considerations</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Bias testing completed across protected attributes</li>
              <li>• Fairness metrics within acceptable thresholds</li>
              <li>• Regular audits scheduled for model drift detection</li>
              <li>• Transparent decision-making process documented</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Regulatory Compliance</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• GDPR compliance for data processing</li>
              <li>• Model interpretability meets legal requirements</li>
              <li>• Audit trail maintained for all predictions</li>
              <li>• Right to explanation implemented</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};