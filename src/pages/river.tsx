import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Image from 'next/image';
import VideoPlayer from '../components/river/VideoPlayer';
import { motion, AnimatePresence } from 'framer-motion';

interface Hotspot {
  x: string;
  y: string;
  image: string;
  title: string;
}

const RiverPage = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [showMasterPlan, setShowMasterPlan] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [showThumbnail, setShowThumbnail] = useState(false);

  const hotspots: Hotspot[] = [
    { x: '44.3%', y: '50%', image: '/images/river/spots/spot1.jpg', title: '滨水景观1' },
    { x: '47%', y: '54%', image: '/images/river/spots/spot2.jpg', title: '滨水景观2' },
    { x: '53.2%', y: '53%', image: '/images/river/spots/spot3.jpg', title: '滨水景观3' },
    { x: '54.5%', y: '50%', image: '/images/river/spots/spot4.jpg', title: '滨水景观4' },
    { x: '56.5%', y: '43.5%', image: '/images/river/spots/spot5.jpg', title: '滨水景观5' },
    { x: '51.7%', y: '35%', image: '/images/river/spots/spot6.jpg', title: '滨水景观6' }
  ];

  const points: Hotspot[] = [
    { x: '40%', y: '45.5%', image: '/images/river/spots/point1.jpg', title: '同乐之洲娱乐度假区' },
    { x: '47.5%', y: '47%', image: '/images/river/spots/point2.jpg', title: '付家古街历史文化街区' },
    { x: '51%', y: '53.5%', image: '/images/river/spots/point3.jpg', title: '茶江之眼文化休闲街区' },
    { x: '55.3%', y: '51%', image: '/images/river/spots/point4.jpg', title: '燕岩书院研学基地' },
    { x: '58%', y: '36%', image: '/images/river/spots/point5.jpg', title: '恭城油茶共享农庄' },
    { x: '51.2%', y: '35.8%', image: '/images/river/spots/point6.jpg', title: '东门码头水运文化街区' }
  ];

  const handleVideoEnd = () => {
    setShowVideo(false);
    setShowMasterPlan(true);
    setShowThumbnail(true);
  };

  const handleThumbnailClick = () => {
    setShowVideo(true);
    setShowMasterPlan(false);
    setShowThumbnail(false);
  };

  const handleHotspotClick = (image: string, title: string) => {
    setSelectedImage(image);
    setSelectedTitle(title);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
    setSelectedTitle(null);
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      {!showVideo && !showMasterPlan && (
        <div className="flex items-center justify-center min-h-screen">
          <button
            onClick={() => setShowVideo(true)}
            className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg text-xl font-bold transition-colors"
          >
            开始飞跃
          </button>
        </div>
      )}

      <AnimatePresence>
        {showVideo && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center bg-black"
            initial={{ opacity: 1, scale: showThumbnail ? 0.2 : 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <VideoPlayer onEnded={handleVideoEnd} />
          </motion.div>
        )}
      </AnimatePresence>

      {showMasterPlan && (
        <div className="relative min-h-screen">
          <div className="relative w-full h-screen">
            <div className="relative w-full h-full">
              <Image
                src="/images/river/master-plan.jpg"
                alt="总体规划图"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
              <div className="absolute inset-0 pointer-events-none">
                {hotspots.map((hotspot, index) => (
                  <motion.button
                    key={`spot-${index}`}
                    className="absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                    style={{ 
                      left: hotspot.x, 
                      top: hotspot.y,
                      position: 'absolute'
                    }}
                    onClick={() => handleHotspotClick(hotspot.image, hotspot.title)}
                    whileHover={{ scale: 1.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image
                      src="/images/river/spot-icon.png"
                      alt="热点图标"
                      width={32}
                      height={32}
                      className="w-full h-full"
                    />
                  </motion.button>
                ))}
                {points.map((point, index) => (
                  <motion.button
                    key={`point-${index}`}
                    className="absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                    style={{ 
                      left: point.x, 
                      top: point.y,
                      position: 'absolute'
                    }}
                    onClick={() => handleHotspotClick(point.image, point.title)}
                    whileHover={{ scale: 1.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image
                      src="/images/river/point.png"
                      alt="节点图标"
                      width={32}
                      height={32}
                      className="w-full h-full"
                    />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showThumbnail && (
        <motion.button
          className="fixed bottom-8 right-8 w-24 h-16 overflow-hidden rounded-lg shadow-lg cursor-pointer hover:scale-110 transition-transform"
          initial={{ opacity: 0, scale: 0.5, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          onClick={handleThumbnailClick}
        >
          <Image
            src="/images/river/video-thumbnail.png"
            alt="视频缩略图"
            fill
            style={{ objectFit: 'contain' }}
          />
        </motion.button>
      )}

      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={handleCloseImage}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
            >
              关闭
            </button>
            <h3 className="text-white text-2xl mb-4">{selectedTitle}</h3>
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <Image
                src={selectedImage}
                alt={selectedTitle || '效果图'}
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiverPage;