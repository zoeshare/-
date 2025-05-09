'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavigationProps {
  disableScrollStyle?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ disableScrollStyle = false }) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path || (path !== '/' && pathname?.startsWith(path));
  };

  const navigationItems = [
    { href: '/about', label: '走进恭城' },
    { href: '/planning/overview', label: '规划简介' },
    { href: '/display', label: '规划展示' },
    { href: '/river', label: '飞跃茶江' }
  ];

  const menuItems = [
    { name: '走进恭城', href: '/about' },
    { name: '规划简介', href: '/planning/overview' },
    { name: '规划展示', href: '/display' },
    { name: '飞跃茶江', href: '/river' }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)'
    }}>
      <div className="container mx-auto px-8">
        <div className="flex items-center h-16 w-full">
          <div className="w-[200px] flex-shrink-0 flex items-center">
            {isCollapsed && (
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white p-2 mr-4"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
            <Link 
              href="/?skip=true"
              className="text-lg font-semibold text-white hover:text-gray-200 transition-colors duration-300"
            >
              云裳茶江
            </Link>
          </div>
          <div className="flex-1 flex items-center justify-center">
            {!isCollapsed && (
              <div className="flex space-x-16">
                <Link 
                  href="/about"
                  className={`text-base font-medium transition-colors duration-300 ${
                    isActive('/about') ? 'text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  走进恭城
                </Link>
                <Link 
                  href="/planning/overview"
                  className={`text-base font-medium transition-colors duration-300 ${
                    isActive('/planning') ? 'text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  规划简介
                </Link>
                <Link 
                  href="/display"
                  className={`text-base font-medium transition-colors duration-300 ${
                    isActive('/display') ? 'text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  规划展示
                </Link>
                <Link 
                  href="/river"
                  className={`text-base font-medium transition-colors duration-300 ${
                    isActive('/river') ? 'text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  飞跃茶江
                </Link>
              </div>
            )}
          </div>
          <div className="w-[200px] flex-shrink-0 flex justify-end items-center space-x-4">
            {isCollapsed && (
              <>
                <button className="text-white p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </button>
                {isMenuOpen && (
                  <div className="absolute top-16 left-0 bg-black/75 backdrop-blur-md p-4 flex flex-col space-y-4">
                    {menuItems.map((item) => (
                      <Link 
                        key={item.href} 
                        href={item.href}
                        className={`text-base font-medium transition-colors duration-300 ${
                          isActive(item.href) ? 'text-white' : 'text-gray-300 hover:text-white'
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 