import React, { useState } from 'react';
import type { Workspace } from '../../types/workspace';

const WorkspaceManager: React.FC = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([
    {
      id: 1,
      name: 'Personal Workspace',
      description: 'My personal documents and projects',
      createdAt: new Date().toISOString(),
      members: []
    }
  ]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newWorkspace, setNewWorkspace] = useState({ name: '', description: '' });

  const handleCreateWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorkspace.name.trim()) return;

    const workspace: Workspace = {
      id: workspaces.length + 1,
      name: newWorkspace.name,
      description: newWorkspace.description,
      createdAt: new Date().toISOString(),
      members: []
    };

    setWorkspaces(prev => [...prev, workspace]);
    setNewWorkspace({ name: '', description: '' });
    setShowCreateForm(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Workspaces</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Create Workspace
        </button>
      </div>

      {/* Create Workspace Form */}
      {showCreateForm && (
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Create New Workspace</h2>
          <form onSubmit={handleCreateWorkspace} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Workspace Name
              </label>
              <input
                type="text"
                id="name"
                value={newWorkspace.name}
                onChange={(e) => setNewWorkspace(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter workspace name"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={newWorkspace.description}
                onChange={(e) => setNewWorkspace(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter workspace description"
              />
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Workspace List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workspaces.map(workspace => (
          <div key={workspace.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{workspace.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{workspace.description}</p>
              </div>
              <div className="flex space-x-2">
                <button className="text-gray-400 hover:text-gray-600">
                  ⚙️
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  👥
                </button>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="text-xs text-gray-500">
                Created {new Date(workspace.createdAt).toLocaleDateString()}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {workspace.members.length} member{workspace.members.length !== 1 ? 's' : ''}
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <button className="w-full px-3 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Open Workspace
              </button>
              <button className="w-full px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                Manage Settings
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* API Key Management Section */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">API Configuration</h2>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="openai-key" className="block text-sm font-medium text-gray-700">
                OpenAI API Key
              </label>
              <input
                type="password"
                id="openai-key"
                placeholder="sk-..."
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                Your OpenAI API key for ChatGPT integration
              </p>
            </div>
            
            <div>
              <label htmlFor="gemini-key" className="block text-sm font-medium text-gray-700">
                Google Gemini API Key
              </label>
              <input
                type="password"
                id="gemini-key"
                placeholder="AI..."
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                Your Google Gemini API key for AI integration
              </p>
            </div>
          </div>
          
          <div className="mt-6">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Save API Keys
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceManager;