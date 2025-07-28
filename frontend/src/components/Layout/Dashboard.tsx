import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import type { User } from '../../types/auth';
import Editor from '../Editor/Editor';
import AIChat from '../AI/AIChat';
import WorkspaceManager from '../Workspace/WorkspaceManager';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navigation = [
    { name: 'Editor', href: '/dashboard/editor', icon: '📝' },
    { name: 'AI Assistant', href: '/dashboard/ai', icon: '🤖' },
    { name: 'Workspace', href: '/dashboard/workspace', icon: '🏢' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <h1 className="text-xl font-bold text-gray-900">Notion AI</h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <span className="sr-only">Close sidebar</span>
            ✕
          </button>
        </div>
        
        <div className="flex flex-col flex-1 px-4 py-4">
          <nav className="flex-1 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  location.pathname.startsWith(item.href)
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="pt-4 border-t">
            <div className="flex items-center px-3 py-2">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="mt-2 w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`${isSidebarOpen ? 'lg:pl-64' : ''}`}>
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            ☰
          </button>
          
          <div className="flex-1 px-4 flex justify-between items-center">
            <div className="flex-1 flex">
              {/* You can add a search bar here */}
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Routes>
                <Route path="/editor" element={<Editor />} />
                <Route path="/ai" element={<AIChat />} />
                <Route path="/workspace" element={<WorkspaceManager />} />
                <Route path="/" element={<Editor />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;