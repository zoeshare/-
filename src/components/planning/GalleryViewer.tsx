import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../common/Navigation';

const GalleryViewer = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    '/images/gallery/效果图1.png',
    '/images/gallery/效果图2.png',
    '/images/gallery/效果图3.png',
    '/images/gallery/效果图4.png',
    '/images/gallery/效果图5.png',
    '/images/gallery/效果图6.png',
    '/images/gallery/效果图7.png'
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-black relative">
      <Navigation />
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt={`Gallery image ${currentImageIndex + 1}`}
            className="max-w-full max-h-full object-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
      </div>

      <button
        onClick={previousImage}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-full hover:bg-opacity-75 transition-all"
      >
        ←
      </button>
      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-full hover:bg-opacity-75 transition-all"
      >
        →
      </button>
    </div>
  );
};

export default GalleryViewer; 