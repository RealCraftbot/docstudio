/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useTemplateStore } from './store/useTemplateStore';
import TemplateGallery from './components/TemplateGallery';
import DocumentEditor from './components/DocumentEditor';
import AdminDashboard from './components/AdminDashboard';
import { Settings } from 'lucide-react';

export default function App() {
  const { selectedTemplateId } = useTemplateStore();
  const [isAdmin, setIsAdmin] = useState(false);

  if (isAdmin) {
    return <AdminDashboard onBack={() => setIsAdmin(false)} />;
  }

  if (selectedTemplateId) {
    return <DocumentEditor />;
  }

  return (
    <div className="relative">
      <TemplateGallery />
      
      {/* Admin Toggle Button */}
      <button 
        onClick={() => setIsAdmin(true)}
        className="fixed bottom-8 right-8 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/20 transition-all z-50 group"
        title="Admin Dashboard"
      >
        <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
      </button>
    </div>
  );
}

