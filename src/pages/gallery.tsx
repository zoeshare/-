import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  { src: '/images/gallery/gallery1.jpg', title: '效果图1' },
  { src: '/images/gallery/gallery2.jpg', title: '效果图2' },
  { src: '/images/gallery/gallery3.jpg', title: '效果图3' },
  { src: '/images/gallery/gallery4.jpg', title: '效果图4' },
  { src: '/images/gallery/gallery5.jpg', title: '效果图5' },
  { src: '/images/gallery/gallery6.jpg', title: '效果图6' },
  { src: '/images/gallery/gallery7.jpg', title: '效果图7' }
];

const GalleryPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = images.length - 1;
      if (nextIndex >= images.length) nextIndex = 0;
      return nextIndex;
    });
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <div className="relative w-full h-screen flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute w-full h-full flex items-center justify-center"
          >
            <div className="relative w-full h-full">
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].title}
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-6 py-3 rounded-lg text-xl">
                {images[currentIndex].title}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full z-10"
          onClick={() => paginate(-1)}
        >
          ←
        </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full z-10"
          onClick={() => paginate(1)}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default GalleryPage; 