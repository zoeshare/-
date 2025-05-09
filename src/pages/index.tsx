import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../components/Navigation';
import { useRouter } from 'next/router';

const Home: React.FC = () => {
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);
  const [startVideoEnded, setStartVideoEnded] = useState(false);
  const [startVideoError, setStartVideoError] = useState<string | null>(null);
  const [backgroundVideoError, setBackgroundVideoError] = useState<string | null>(null);
  const [startVideoLoading, setStartVideoLoading] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const startVideoRef = useRef<HTMLVideoElement>(null);
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);

  // 监听窗口大小变化
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 768); // 假设768px为小屏幕的断点
    };

    // 初始检查
    checkScreenSize();

    // 添加窗口大小变化监听
    window.addEventListener('resize', checkScreenSize);

    // 清理监听器
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    // 检查URL参数是否需要跳过开场视频
    const skipIntro = router.query.skip === 'true';
    if (skipIntro) {
      setStartVideoEnded(true);
      setShowContent(true);
    }
  }, [router.query]);

  useEffect(() => {
    // 当开场视频结束时，显示主内容
    if (startVideoEnded) {
      setShowContent(true);
    }
  }, [startVideoEnded]);

  useEffect(() => {
    if (startVideoRef.current) {
      const video = startVideoRef.current;
      
      const handleLoadedData = () => {
        console.log('视频加载完成');
        setStartVideoLoading(false);
        setStartVideoError(null);
      };

      const handleError = (e: Event) => {
        console.error('开场视频加载失败:', e);
        setStartVideoError('开场视频加载失败，请刷新页面重试');
        setStartVideoEnded(true);
        setShowContent(true);
      };

      const handleStalled = () => {
        console.warn('开场视频播放卡住');
        // 尝试重新加载视频
        video.load();
        video.play().catch(error => {
          console.error('视频重新播放失败:', error);
          setStartVideoError('视频播放卡住，请刷新页面重试');
          setStartVideoEnded(true);
          setShowContent(true);
        });
      };

      const handleWaiting = () => {
        console.warn('开场视频缓冲中');
      };

      const handleCanPlay = () => {
        console.log('视频可以播放');
        video.play().catch(error => {
          console.error('视频播放失败:', error);
          setStartVideoError('视频播放失败，请刷新页面重试');
          setStartVideoEnded(true);
          setShowContent(true);
        });
      };

      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('error', handleError);
      video.addEventListener('stalled', handleStalled);
      video.addEventListener('waiting', handleWaiting);
      video.addEventListener('canplay', handleCanPlay);

      // 预加载视频
      video.load();

      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('error', handleError);
        video.removeEventListener('stalled', handleStalled);
        video.removeEventListener('waiting', handleWaiting);
        video.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, []);

  const handleStartVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('开场视频加载失败:', e);
    setStartVideoError('开场视频加载失败，请刷新页面重试');
    setStartVideoEnded(true);
    setShowContent(true);
  };

  const handleBackgroundVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('背景视频加载失败:', e);
    setBackgroundVideoError('背景视频加载失败，请刷新页面重试');
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Navigation />
      <AnimatePresence>
        {!startVideoEnded && !startVideoError && (
          <motion.div
            className="fixed inset-0 z-40 bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {startVideoLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="text-white">加载中...</div>
              </div>
            )}
            <video
              ref={startVideoRef}
              className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 object-cover"
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={() => setStartVideoEnded(true)}
              onError={handleStartVideoError}
            >
              <source src={isSmallScreen ? "/videos/small-start.mp4" : "/videos/start.mp4"} type="video/mp4" />
              您的浏览器不支持视频播放
            </video>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 背景视频 */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {backgroundVideoError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-white text-center">
              <p className="mb-4">{backgroundVideoError}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded transition-colors"
              >
                刷新页面
              </button>
            </div>
          </div>
        ) : (
          <video
            ref={backgroundVideoRef}
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onError={handleBackgroundVideoError}
          >
            <source src={isSmallScreen ? "/videos/small-background.mp4" : "/videos/background.mp4"} type="video/mp4" />
            您的浏览器不支持视频播放
          </video>
        )}
        {/* 黑色蒙版 */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* 主内容 */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="text-center max-w-3xl mx-auto px-4">
              <motion.h1
                className="text-4xl font-bold text-white mb-12 tracking-wider md:text-6xl lg:text-8xl"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                云 裳 茶 江
              </motion.h1>
              <motion.p
                className="text-2xl text-white mb-16 leading-relaxed tracking-wider font-medium md:text-3xl lg:text-4xl"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.3 }}
              >
                瑶乡山水田园​城市
                <br className="my-4" />
                世界级休闲水岸
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home; 