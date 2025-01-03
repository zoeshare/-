import React from 'react';
import Navigation from './Navigation';
import AIAssistant from './common/AIAssistant';

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