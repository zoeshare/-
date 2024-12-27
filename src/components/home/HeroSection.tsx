import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const HeroSection: React.FC = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 背景图片 */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-bg.jpg"
          alt="恭城瑶乡茶江风光"
          fill
          priority
          className="object-cover"
          quality={100}
          sizes="100vw"
        />
      </div>
      
      {/* 半透明遮罩 */}
      <div className="absolute inset-0 bg-black/50" />
      
      <motion.div 
        className="text-center text-white z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-7xl font-bold mb-6 tracking-wider">云裳茶江</h1>
        <p className="text-3xl tracking-widest font-medium">探索恭城瑶乡的数字未来</p>
      </motion.div>
    </div>
  );
};

export default HeroSection; 