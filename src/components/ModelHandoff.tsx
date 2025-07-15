import React, { useState } from 'react';
import { ModelInfo } from '../App';
import { Upload, FileText, User, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

interface ModelHandoffProps {
  models: ModelInfo[];
  onAddModel: (model: Omit<ModelInfo, 'id'>) => void;
}

export const ModelHandoff: React.FC<ModelHandoffProps> = ({ models, onAddModel }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    version: '',
    framework: '',
    accuracy: '',
    submittedBy: 'Sarah Chen'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newModel: Omit<ModelInfo, 'id'> = {
      name: formData.name,
      version: formData.version,
      framework: formData.framework,
      accuracy: parseFloat(formData.accuracy),
      status: 'submitted',
      submittedBy: formData.submittedBy,
      submittedAt: new Date().toISOString()
    };

    onAddModel(newModel);
    setFormData({
      name: '',
      version: '',
      framework: '',
      accuracy: '',
      submittedBy: 'Sarah Chen'
    });
    setShowForm(false);
  };

  const submittedModels = models.filter(m => m.status === 'submitted');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Model Handoff</h2>
          <p className="text-gray-600">Data scientists submit trained models for validation</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Upload className="h-4 w-4" />
          <span>Submit Model</span>
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Submit New Model</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Model Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Version
                </label>
                <input
                  type="text"
                  value={formData.version}
                  onChange={(e) => setFormData({...formData, version: e.target.value})}
                  placeholder="e.g., v1.0.0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Framework
                </label>
                <select
                  value={formData.framework}
                  onChange={(e) => setFormData({...formData, framework: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select framework</option>
                  <option value="TensorFlow">TensorFlow</option>
                  <option value="PyTorch">PyTorch</option>
                  <option value="XGBoost">XGBoost</option>
                  <option value="Scikit-Learn">Scikit-Learn</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Accuracy
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                  value={formData.accuracy}
                  onChange={(e) => setFormData({...formData, accuracy: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Model
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {submittedModels.map((model) => (
          <div key={model.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">{model.name}</h3>
              </div>
              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                Awaiting Review
              </span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Version:</span>
                <span className="font-medium">{model.version}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Framework:</span>
                <span className="font-medium">{model.framework}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Accuracy:</span>
                <span className="font-medium">{(model.accuracy * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Submitted by:</span>
                <span className="font-medium">{model.submittedBy}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Submitted:</span>
                <span className="font-medium">
                  {new Date(model.submittedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {submittedModels.length === 0 && (
          <div className="col-span-2 text-center py-12">
            <CheckCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No pending submissions</h3>
            <p className="text-gray-600">All submitted models have been processed.</p>
          </div>
        )}
      </div>
    </div>
  );
};