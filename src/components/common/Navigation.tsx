import React from 'react';
import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface NavigationProps {
  disableScrollStyle?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ disableScrollStyle = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    if (disableScrollStyle) return;
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY, disableScrollStyle]);

  return (
    <motion.nav
      className="fixed w-full z-50 transition-all duration-300 bg-gradient-to-b from-black/90 to-black/60 backdrop-blur-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="logo text-xl font-bold text-white text-shadow-xl tracking-wide">
          <a href="/" className="hover:text-blue-200 transition-colors">云裳茶江</a>
        </div>
        <div className="nav-links space-x-12 text-white text-shadow-xl font-semibold tracking-wide">
          <a href="/introduction" className="hover:text-blue-200 transition-colors">规划简介</a>
          <a href="/display" className="hover:text-blue-200 transition-colors">规划展示</a>
          <a href="/river" className="hover:text-blue-200 transition-colors">飞跃茶江</a>
          <a href="/guide" className="hover:text-blue-200 transition-colors">规划引导</a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation; 