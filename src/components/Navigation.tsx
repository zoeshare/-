import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navigation = () => {
  const router = useRouter();

  const isActive = (path: string) => {
    return router.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 z-50">
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.75) 50%, rgba(0, 0, 0, 0.45) 100%)',
        backdropFilter: 'blur(8px)'
      }} />
      <div className="relative max-w-7xl mx-auto h-full px-6">
        <div className="flex items-center justify-between h-full">
          <Link 
            href="/" 
            className="text-white text-2xl font-bold tracking-wide hover:text-gray-200 transition-colors"
            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
          >
            云裳茶江
          </Link>
          <div className="flex space-x-12">
            <Link 
              href="/introduction"
              className={`text-white text-lg tracking-wide hover:text-gray-200 transition-colors ${isActive('/introduction') ? 'font-bold' : ''}`}
              style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
            >
              规划简介
            </Link>
            <Link 
              href="/gallery"
              className={`text-white text-lg tracking-wide hover:text-gray-200 transition-colors ${isActive('/gallery') ? 'font-bold' : ''}`}
              style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
            >
              规划展示
            </Link>
            <Link 
              href="/river"
              className={`text-white text-lg tracking-wide hover:text-gray-200 transition-colors ${isActive('/river') ? 'font-bold' : ''}`}
              style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
            >
              飞跃茶江
            </Link>
            <Link 
              href="/guide"
              className={`text-white text-lg tracking-wide hover:text-gray-200 transition-colors ${isActive('/guide') ? 'font-bold' : ''}`}
              style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
            >
              规划引导
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 