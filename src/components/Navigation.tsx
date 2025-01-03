import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface NavigationProps {
  disableScrollStyle?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ disableScrollStyle = false }) => {
  const router = useRouter();

  const isActive = (path: string) => {
    return router.pathname === path || (path !== '/' && router.pathname.startsWith(path));
  };

  const navigationItems = [
    { href: '/', label: '首页' },
    { href: '/introduction', label: '项目介绍' },
    { href: '/river?autoplay=true', label: '飞跃茶江' },
    { href: '/guide', label: '导览中心' },
    { href: '/planning/overview', label: '规划总览' },
    { href: '/results', label: '成果展示' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)'
    }}>
      <div className="container mx-auto px-8">
        <div className="flex items-center h-16">
          <div className="w-[200px]">
            <Link 
              href="/?skip=true"
              className="text-lg font-semibold text-white hover:text-gray-200 transition-colors duration-300"
            >
              云裳茶江
            </Link>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="flex space-x-16">
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
                href="/guide"
                className={`text-base font-medium transition-colors duration-300 ${
                  isActive('/guide') ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                规划引领
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
          </div>
          <div className="w-[200px]"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 