import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Point {
  x: string;
  y: string;
  images: string[];
  title: string;
  planImage: string;
  description: string[];
  panoramaUrl?: string;
}

interface GalleryViewerProps {
  isRiverPage?: boolean;
}

const GalleryViewer: React.FC<GalleryViewerProps> = ({ isRiverPage = false }) => {
  const [currentPointIndex, setCurrentPointIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMasterPlan, setShowMasterPlan] = useState(true);
  const [showNodePlan, setShowNodePlan] = useState(false);
  const [showEffectImage, setShowEffectImage] = useState(false);
  const [showPanorama, setShowPanorama] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const [showNodes, setShowNodes] = useState(!isRiverPage);
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const points: Point[] = [
    { 
      x: '35.8%', 
      y: '47%', 
      images: [
        '/images/gallery/同乐之洲娱乐度假区1.png',
        '/images/gallery/同乐之洲娱乐度假区2.png'
      ], 
      title: '同乐之洲娱乐度假区',
      planImage: '/images/gallery/master plan-同乐之洲娱乐度假区.png',
      description: [
        '体育娱乐综合度假区',
        '· 运动天堂，水上乐园',
        '· 生态防洪，景观游憩'
      ],
      panoramaUrl: 'https://www.720yun.com/vr/575j5gkuuu6'
    },
    { 
      x: '47.5%', 
      y: '49%', 
      images: ['/images/gallery/付家古街历史文化街区.png'], 
      title: '付家古街历史文化街区',
      planImage: '/images/gallery/master plan-付家古街历史文化街区.png',
      description: [
        '"恭城之心"文化休闲街区',
        '· 文化传承城市宣传展示空间',
        '· 历史建筑改造创意策划示范点'
      ]
    },
    { 
      x: '52%', 
      y: '54%', 
      images: [
        '/images/gallery/茶江之眼文化休闲街区1.png',
        '/images/gallery/茶江之眼文化休闲街区2.png'
      ], 
      title: '茶江之眼文化休闲街区',
      planImage: '/images/gallery/master plan-茶江之眼文化休闲街区.png',
      description: [
        '茶江 · 世界级休闲水岸第一站',
        '· 微度假旅游最佳目的地',
        '· 恭城最鲜活的城市记忆馆'
      ],
      panoramaUrl: 'https://www.720yun.com/vr/667j5gkurv8'
    },
    { 
      x: '59.5%', 
      y: '52%', 
      images: ['/images/gallery/燕岩书院研学基地.png'], 
      title: '燕岩书院研学基地',
      planImage: '/images/gallery/master plan-燕岩书院研学基地.png',
      description: [
        '茶江水畔好读书 · 世界级旅游城市的研学基地',
        '· 沉浸式国学教育的先锋',
        '· 大自然的第三课堂'
      ],
      panoramaUrl: 'https://www.720yun.com/vr/184j5gkuvw0'
    },
    { 
      x: '65%', 
      y: '40%', 
      images: ['/images/gallery/恭城油茶共享农庄.png'], 
      title: '恭城油茶共享农庄',
      planImage: '/images/gallery/master plan-恭城油茶共享农庄.png',
      description: [
        '恭城油茶 · 农文旅商融合示范区',
        '· 共享农庄，农旅融合',
        '· 城市绿肺，双城融合'
      ],
      panoramaUrl: 'https://www.720yun.com/vr/68cj5gkuvO7'
    },
    { 
      x: '53%', 
      y: '37%', 
      images: ['/images/gallery/东门码头水运文化街区.png'], 
      title: '东门码头水运文化街区',
      planImage: '/images/gallery/master plan-东门码头水运文化街区.png',
      description: [
        '茶江文化展示体验区',
        '· 感知城市记忆、挖掘文化本源',
        '· 共享文化空间、营造居游共享'
      ],
      panoramaUrl: 'https://www.720yun.com/vr/e65j5gkuuv1'
    }
  ];

  const handleWheel = (e: WheelEvent) => {
    if (!showMasterPlan) return;
    e.preventDefault();
    
    const delta = e.deltaY * -0.001;
    const newScale = Math.min(Math.max(scale + delta, 1), 3);
    
    const container = containerRef.current;
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / container.offsetWidth;
    const y = (e.clientY - rect.top) / container.offsetHeight;
    
    const newPosition = {
      x: position.x - (newScale - scale) * (x - 0.5) * 100,
      y: position.y - (newScale - scale) * (y - 0.5) * 100
    };
    
    setScale(newScale);
    setPosition(newPosition);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }
  }, [scale, position, showMasterPlan]);

  const handlePointClick = (index: number) => {
    setCurrentPointIndex(index);
    if (points[index].panoramaUrl) {
      setShowPanorama(true);
      setShowMasterPlan(false);
      setShowNodePlan(false);
      setShowEffectImage(false);
    } else {
      setShowMasterPlan(false);
      setShowNodePlan(true);
      setShowEffectImage(false);
    }
    setCurrentImageIndex(0);
  };

  const handleBackClick = () => {
    setShowMasterPlan(true);
    setShowNodePlan(false);
    setShowEffectImage(false);
    setShowPanorama(false);
    setCurrentImageIndex(0);
  };

  const handleEffectClick = () => {
    setShowEffectImage(true);
    setShowNodePlan(false);
  };

  const handlePlanClick = () => {
    setShowEffectImage(false);
    setShowNodePlan(true);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      (prev + 1) % points[currentPointIndex].images.length
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      (prev - 1 + points[currentPointIndex].images.length) % points[currentPointIndex].images.length
    );
  };

  useEffect(() => {
    if (!isRiverPage) return;

    const handleVideoEnd = (event: MessageEvent) => {
      if (event.data === 'videoEnded') {
        setShowNodes(false);
      }
    };

    window.addEventListener('message', handleVideoEnd);
    return () => {
      window.removeEventListener('message', handleVideoEnd);
    };
  }, [isRiverPage]);

  return (
    <div className="min-h-screen bg-white relative">
      <AnimatePresence mode="wait">
        {showMasterPlan ? (
          <motion.div
            key="masterPlan"
            className="relative min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-white pt-16">
              {showNodes && (
                <div className="absolute left-8 lg:left-12 2xl:left-16 top-1/2 -translate-y-1/2 z-10 space-y-0.5 lg:space-y-3 2xl:space-y-4 text-black max-w-xl lg:max-w-2xl 2xl:max-w-3xl hidden lg:block">
                  {points.map((point, index) => (
                    <motion.div 
                      key={`text-${index}`} 
                      className={`space-y-[1px] lg:space-y-1 2xl:space-y-1.5 transition-all duration-300 origin-left cursor-pointer ${hoveredPoint === index ? 'text-red-600 scale-110' : ''}`}
                      onMouseEnter={() => setHoveredPoint(index)}
                      onMouseLeave={() => setHoveredPoint(null)}
                      onClick={() => handlePointClick(index)}
                    >
                      <h3 className="text-[8px] lg:text-base 2xl:text-lg font-bold">
                        {`${index + 1}、`} {point.title}
                      </h3>
                      {point.description.map((line, i) => (
                        <p key={i} className={`${i === 0 ? "font-semibold text-[7px] lg:text-sm 2xl:text-base" : hoveredPoint === index ? "text-red-500" : "text-gray-600"} text-[6px] lg:text-xs 2xl:text-sm leading-[8px] lg:leading-normal 2xl:leading-relaxed`}>
                          {line}
                        </p>
                      ))}
                    </motion.div>
                  ))}
                </div>
              )}
              <div className="absolute right-[2%] lg:right-[4%] 2xl:right-[6%] top-0 w-[96%] lg:w-[75%] 2xl:w-[70%] h-[60%] lg:h-full">
                <motion.div
                  className="relative w-full h-full"
                  style={{
                    scale,
                    x: position.x,
                    y: position.y,
                    transformOrigin: 'center center'
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Image
                    src="/images/gallery/master-plan.png"
                    alt="总体规划图"
                    fill
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                  {showNodes && (
                    <div className="absolute inset-0 pointer-events-none">
                      {points.map((point, index) => (
                        <motion.div
                          key={`point-${index}`}
                          className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                          style={{ 
                            left: point.x, 
                            top: point.y,
                            position: 'absolute'
                          }}
                          onMouseEnter={() => setHoveredPoint(index)}
                          onMouseLeave={() => setHoveredPoint(null)}
                        >
                          <motion.button
                            onClick={() => handlePointClick(index)}
                            whileHover={{ scale: 1.8 }}
                            animate={{ scale: hoveredPoint === index ? 1.8 : 1 }}
                            transition={{ duration: 0.3 }}
                            className="relative w-12 h-12"
                          >
                            <Image
                              src="/images/gallery/point.gif"
                              alt="节点图标"
                              width={48}
                              height={48}
                              className="w-full h-full"
                            />
                          </motion.button>
                          {hoveredPoint === index && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute left-1/2 transform -translate-x-1/2 mt-4 whitespace-nowrap bg-black/50 text-white px-4 py-2 rounded text-base"
                            >
                              {point.title}
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>
              {/* 移动端文字展示区域 */}
              {showNodes && (
                <div className="absolute left-0 right-0 bottom-0 h-[40%] lg:hidden overflow-y-auto px-4 py-2 bg-white/90 backdrop-blur-sm">
                  {points.map((point, index) => (
                    <motion.div 
                      key={`mobile-text-${index}`} 
                      className={`space-y-1 transition-all duration-300 origin-left cursor-pointer ${hoveredPoint === index ? 'text-red-600 scale-105' : ''}`}
                      onMouseEnter={() => setHoveredPoint(index)}
                      onMouseLeave={() => setHoveredPoint(null)}
                      onClick={() => handlePointClick(index)}
                    >
                      <h3 className="text-base font-bold">
                        {`${index + 1}、`} {point.title}
                      </h3>
                      {point.description.map((line, i) => (
                        <p key={i} className={`${i === 0 ? "font-semibold text-sm" : hoveredPoint === index ? "text-red-500" : "text-gray-600"} text-xs leading-relaxed`}>
                          {line}
                        </p>
                      ))}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ) : showNodePlan ? (
          <motion.div
            key="nodePlan"
            className="relative w-full h-screen flex items-center justify-center bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={points[currentPointIndex].planImage}
              alt={points[currentPointIndex].title}
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
            <div className="absolute top-1/2 right-12 -translate-y-1/2 flex flex-col gap-8">
              <motion.button
                onClick={handleEffectClick}
                whileHover={{ scale: 1.1 }}
                className="w-32 h-32"
              >
                <Image
                  src="/images/gallery/效果图.png"
                  alt="效果图"
                  width={128}
                  height={128}
                  className="w-full h-full"
                />
              </motion.button>
              {currentPointIndex !== 1 && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="w-32 h-32"
                >
                  <Image
                    src="/images/gallery/三维模型.png"
                    alt="三维模型"
                    width={128}
                    height={128}
                    className="w-full h-full"
                  />
                </motion.button>
              )}
            </div>
            <button
              onClick={handleBackClick}
              className="absolute top-8 left-8 bg-black/50 text-white px-6 py-3 rounded-lg hover:bg-black/75 transition-colors"
            >
              返回总图
            </button>
          </motion.div>
        ) : showPanorama ? (
          <motion.div
            key="panorama"
            className="relative w-full h-screen flex items-center justify-center bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <iframe 
              src={points[currentPointIndex].panoramaUrl}
              className="w-full h-full border-none"
              allow="fullscreen; xr-spatial-tracking; gyroscope; accelerometer"
            />
            <button
              onClick={handleBackClick}
              className="absolute top-8 left-8 bg-black/50 text-white px-6 py-3 rounded-lg hover:bg-black/75 transition-colors z-10"
            >
              返回总图
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="gallery"
            className="relative w-full h-screen flex items-center justify-center bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={points[currentPointIndex].images[currentImageIndex]}
              alt={points[currentPointIndex].title}
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-6 py-3 rounded-lg text-xl">
              {points[currentPointIndex].title}
              {points[currentPointIndex].images.length > 1 && (
                <span className="ml-4 text-gray-400">
                  {currentImageIndex + 1} / {points[currentPointIndex].images.length}
                </span>
              )}
            </div>
            <button
              onClick={handlePlanClick}
              className="absolute top-8 left-8 bg-black/50 text-white px-6 py-3 rounded-lg hover:bg-black/75 transition-colors"
            >
              返回平面图
            </button>
            {points[currentPointIndex].images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-4 rounded-full hover:bg-black/75 transition-colors text-2xl font-bold"
                >
                  ＜
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-4 rounded-full hover:bg-black/75 transition-colors text-2xl font-bold"
                >
                  ＞
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryViewer; 