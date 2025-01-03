import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import GalleryViewer from '@/components/planning/GalleryViewer';
import Layout from '@/components/Layout';

interface Hotspot {
  x: string;
  y: string;
  image: string;
  title: string;
}

const RiverPage = () => {
  const router = useRouter();
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [showGallery, setShowGallery] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [showConstruction, setShowConstruction] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const constructionContainerRef = useRef<HTMLDivElement>(null);

  const hotspots: Hotspot[] = [
    { x: '42%', y: '50%', image: '/images/river/spots/spot1.png', title: '滨水景观1' },
    { x: '46%', y: '54%', image: '/images/river/spots/spot2.png', title: '滨水景观2' },
    { x: '54.8%', y: '53%', image: '/images/river/spots/spot3.png', title: '滨水景观3' },
    { x: '56.8%', y: '50%', image: '/images/river/spots/spot4.png', title: '滨水景观4' },
    { x: '59.8%', y: '43.5%', image: '/images/river/spots/spot5.png', title: '滨水景观5' },
    { x: '52.3%', y: '35%', image: '/images/river/spots/spot6.png', title: '滨水景观6' }
  ];

  const masterPlanSpots = [
    { x: '55%', y: '25%', image: '/images/river/master plan/master-plan1.png' },
    { x: '50%', y: '55%', image: '/images/river/master plan/master-plan2.png' },
    { x: '28%', y: '50%', image: '/images/river/master plan/master-plan3.png' }
  ];

  useEffect(() => {
    if (router.query.autoplay === 'true') {
      setIsVideoPlaying(true);
      setShowGallery(false);
      setShowThumbnail(false);
      setIsPaused(false);
      setProgress(0);

      // 等待视频加载完成后播放
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        if (videoRef.current.readyState >= 2) {
          videoRef.current.play().catch(error => {
            console.error('视频播放失败:', error);
          });
        } else {
          videoRef.current.addEventListener('loadeddata', () => {
            videoRef.current?.play().catch(error => {
              console.error('视频播放失败:', error);
            });
          }, { once: true });
        }
      }
    }
  }, [router.query]);

  useEffect(() => {
    const handleVideoEnd = () => {
      setShowGallery(true);
      setIsVideoPlaying(false);
      setShowThumbnail(true);
      setIsPaused(true);
      setProgress(0);
      
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
    };

    const handleTimeUpdate = () => {
      if (videoRef.current) {
        const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
        setProgress(progress);
      }
    };

    const handleLoadedMetadata = () => {
      if (videoRef.current) {
        setDuration(videoRef.current.duration);
        videoRef.current.play().catch(error => {
          console.error('视频播放失败:', error);
        });
      }
    };

    const handlePlay = () => {
      setIsPaused(false);
    };

    const handlePause = () => {
      setIsPaused(true);
    };

    const video = videoRef.current;
    if (video) {
      video.addEventListener('ended', handleVideoEnd);
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);
    }

    return () => {
      if (video) {
        video.removeEventListener('ended', handleVideoEnd);
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
      }
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPaused(false);
      } else {
        videoRef.current.pause();
        setIsPaused(true);
      }
    }
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && videoRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      const time = (percentage / 100) * videoRef.current.duration;
      videoRef.current.currentTime = time;
      setProgress(percentage);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleThumbnailClick = () => {
    setIsVideoPlaying(true);
    setShowGallery(false);
    setShowThumbnail(false);
    setIsPaused(false);
    setProgress(0);

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      const playVideo = () => {
        videoRef.current?.play().catch(error => {
          console.error('视频播放失败:', error);
        });
      };

      if (videoRef.current.readyState >= 2) {
        playVideo();
      } else {
        videoRef.current.addEventListener('loadeddata', playVideo, { once: true });
      }
    }
  };

  const handleHotspotClick = (image: string, title: string) => {
    setSelectedImage(image);
    setSelectedTitle(title);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
    setSelectedTitle(null);
  };

  const handleCloseVideo = () => {
    setShowGallery(true);
    setIsVideoPlaying(false);
    setShowThumbnail(true);
    setIsPaused(true);
    setProgress(0);
    
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const container = constructionContainerRef.current;
      if (container) {
        const images = container.children;
        for (let i = 0; i < images.length; i++) {
          const rect = images[i].getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            setCurrentImageIndex(i);
            break;
          }
        }
      }
    };

    const container = constructionContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [showConstruction]);

  return (
    <Layout>
      <div 
        className="min-h-screen bg-black relative"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <AnimatePresence mode="wait">
          {isVideoPlaying && (
            <motion.div
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-screen flex items-center justify-center bg-black relative"
            >
              <video
                ref={videoRef}
                id="riverVideo"
                className="w-full h-full object-cover cursor-pointer"
                playsInline
                muted
                controls={false}
                preload="auto"
                onClick={togglePlay}
              >
                <source src="/videos/river.mp4" type="video/mp4" />
                您的浏览器不支持视频播放。
              </video>

              <div className="absolute top-4 right-4 z-50">
                <button
                  onClick={handleCloseVideo}
                  className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:text-blue-400 hover:bg-black/70 transition-all"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent px-4 py-3">
                <div 
                  ref={progressBarRef}
                  className="w-full h-1 bg-white/20 cursor-pointer rounded-full"
                  onClick={handleProgressBarClick}
                >
                  <div 
                    className="h-full bg-white rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                
                <div className="flex items-center mt-2">
                  <button
                    onClick={togglePlay}
                    className="text-white hover:text-blue-400"
                  >
                    {isPaused ? (
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    ) : (
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                      </svg>
                    )}
                  </button>
                  <div className="ml-3 text-white text-sm">
                    {videoRef.current && `${formatTime(videoRef.current.currentTime)} / ${formatTime(duration)}`}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {showGallery && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-white"
            >
              <div className="relative w-full h-screen flex">
                <div className="w-[30%] pl-16 pr-4 flex flex-col justify-center">
                  <div className="space-y-6 text-gray-800">
                    <p className="text-xl leading-relaxed">
                      从黄家圳村到同乐洲约4.2公里，依托茶江江岸特色打造：
                    </p>
                    <p className="text-4xl font-bold text-red-600">
                      中国·瑶乡古韵国际风情水岸
                    </p>
                    <p className="text-xl">
                      以<span className="font-bold">"国际标准，中国特色"</span>
                    </p>
                    <p className="text-xl">
                      在航线游览中感受：
                    </p>
                    <div className="text-xl font-medium space-y-2 pl-[6em]">
                      <p>国际风情</p>
                      <p>园林风采</p>
                      <p>山水瑶乡</p>
                      <p>自然风光</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 relative pl-4">
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/river/master-plan.png"
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

                      {masterPlanSpots.map((spot, index) => (
                        <motion.button
                          key={`masterplan-${index}`}
                          className="absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                          style={{ 
                            left: spot.x, 
                            top: spot.y,
                            position: 'absolute'
                          }}
                          onClick={() => handleHotspotClick(spot.image, '总平面详图')}
                          whileHover={{ scale: 1.5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <svg 
                            className="w-full h-full text-white" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2"
                          >
                            <circle cx="11" cy="11" r="8" />
                            <path d="M21 21l-4.35-4.35" />
                            <path d="M11 8v6M8 11h6" />
                          </svg>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {showThumbnail && (
          <motion.button
            className="fixed bottom-8 left-32 w-36 h-24 overflow-hidden rounded-lg cursor-pointer hover:scale-110 transition-transform"
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

        {showThumbnail && (
          <motion.button
            className="fixed bottom-8 left-8 w-24 h-24 overflow-hidden rounded-lg cursor-pointer hover:scale-110 transition-transform"
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            onClick={() => setShowConstruction(true)}
          >
            <Image
              src="/images/river/construction.png"
              alt="工程图标"
              fill
              style={{ objectFit: 'contain' }}
            />
          </motion.button>
        )}

        {showConstruction && (
          <div className="fixed inset-0 bg-white z-50 flex">
            {/* 左侧导航栏 */}
            <div className="w-12 bg-white flex items-center justify-center border-r">
              <div className="space-y-8">
                {[...Array(11)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const element = document.getElementById(`construction-image-${index}`);
                      element?.scrollIntoView({ behavior: 'smooth' });
                      setCurrentImageIndex(index);
                    }}
                    className="relative flex items-center"
                  >
                    <div className={`w-1 h-8 transition-all duration-300 ${
                      currentImageIndex === index
                        ? 'bg-blue-500'
                        : 'bg-gray-200 hover:bg-gray-400'
                    }`} />
                  </button>
                ))}
              </div>
            </div>

            {/* 主要内容区域 */}
            <div className="flex-1 relative">
              <button
                onClick={() => setShowConstruction(false)}
                className="fixed top-4 right-4 text-gray-600 hover:text-gray-900 z-10"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>

              {/* 图片展示区域 */}
              <div 
                ref={constructionContainerRef}
                className="h-screen overflow-y-auto snap-y snap-mandatory"
              >
                {[...Array(11)].map((_, index) => (
                  <div 
                    key={index}
                    id={`construction-image-${index}`}
                    className="h-screen w-full snap-start flex items-center justify-center"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={`/images/river/construction/construction${index + 1}.png`}
                        alt={`工程图片${index + 1}`}
                        fill
                        style={{ objectFit: 'contain' }}
                        priority
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedImage && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="relative w-[95vw] h-[90vh]">
              <button
                onClick={handleCloseImage}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 z-10"
              >
                关闭
              </button>
              <div className="relative w-full h-full">
                <Image
                  src={selectedImage}
                  alt={selectedTitle || '效果图'}
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RiverPage;