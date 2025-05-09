'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const Navigation = dynamic(() => import('./Navigation'), {
  ssr: false,
});

const AIAssistant = dynamic(() => import('./common/AIAssistant'), {
  ssr: false,
});

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>{children}</main>
      <AIAssistant />
    </div>
  );
};

export default Layout;