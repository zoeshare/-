import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../components/Navigation';
import { useRouter } from 'next/router';

const Home: React.FC = () => {
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);
  const [startVideoEnded, setStartVideoEnded] = useState(false);

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

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Navigation />
      <AnimatePresence>
        {!startVideoEnded && (
          <motion.div
            className="fixed inset-0 z-40 bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <video
              className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 object-cover"
              autoPlay
              muted
              playsInline
              onEnded={() => setStartVideoEnded(true)}
            >
              <source src="/videos/start.mp4" type="video/mp4" />
            </video>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 背景视频 */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <video
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/background.mp4" type="video/mp4" />
        </video>
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
                className="text-8xl font-bold text-white mb-12 tracking-wider"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                云裳茶江
              </motion.h1>
              <motion.p
                className="text-4xl text-white mb-16 leading-relaxed tracking-wider font-medium"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.3 }}
              >
                瑶乡山水田园融合的落脚点
                <br className="my-4" />
                世界级休闲水岸的核心区
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home; 