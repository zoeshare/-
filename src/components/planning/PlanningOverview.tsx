import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Section {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  image: string;
  subImages?: {
    id: string;
    image: string;
    title: string;
  }[];
}

const sections: Section[] = [
  {
    id: 'scope',
    title: '一',
    subtitle: '规划范围',
    content: '规划范围北至黄家圳村、南至乐湾村、西至西岭河与恭城河交叉口、东至凤凰山、燕岩山山脚，总面积约15.11平方公里。',
    image: '/images/planning/site-scope.png'
  },
  {
    id: 'concept',
    title: '二',
    subtitle: '规划理念',
    content: '重点聚焦双城间北洞源河两岸、燕子岩、同乐洲、凤凰山、江心洲岛等非建设空间及嘉应庙（老庙）历史文化片区，在确保生态环境不被破坏的条件下，为满足居民和游客日益增长的休闲游憩需求，适当植入休闲游憩设施等公共服务功能，提升非建设空间的活力与价值，有效吸引人群，促进新老城区之间的交流与互动。',
    image: '/images/planning/concept.png'
  },
  {
    id: 'strategy',
    title: '三',
    subtitle: '整体策略',
    content: `**世界眼光：**

对标世界级休闲水岸，承接桂林世界级旅游城市。

**广西特色、桂林经典：**

对标自治区级风景名胜区建设标准。`,
    image: '/images/planning/strategy1.png',
    subImages: [
      {
        id: 'world',
        image: '/images/planning/strategy1.png',
        title: '世界眼光'
      },
      {
        id: 'local',
        image: '/images/planning/strategy2.png',
        title: '广西特色'
      }
    ]
  },
  {
    id: 'structure',
    title: '四',
    subtitle: '规划结构',
    content: `**"一江串联、四境共生、多点协同"**

**一江串联——**

茶江生态绿廊：回归自然，构建滨江生态绿野廊道。

**四境共生——**

乐活江境：回归人民，塑造多维活力的魅力生活

历史城境：回归城市，复兴多元文化的互动岸城

魅力山境：回归品质，打造彰显特色的城市地景

沉浸田境：回归田园，示范恭城农业的禀赋优势`,
    image: '/images/planning/structure1.png'
  },
  {
    id: 'industry',
    title: '五',
    subtitle: '产业图谱',
    content: '多元业态迭代助推旅游消费转型升级，基于恭城特色"文旅+"产业链，促进经济多元增长。',
    image: '/images/planning/industry.png'
  }
];

const PlanningOverview: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const newActiveSection = Math.floor((scrollPosition + windowHeight / 2) / windowHeight);
      
      if (newActiveSection >= 0 && newActiveSection < sections.length) {
        setActiveSection(newActiveSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    window.scrollTo({
      top: index * window.innerHeight,
      behavior: 'smooth'
    });
  };

  const renderContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => {
      if (paragraph.startsWith('**"')) {
        const title = paragraph.replace(/\*\*/g, '').replace(/"/g, '');
        return (
          <div key={index} className={index > 0 ? 'mt-8' : ''}>
            <h3 className="text-4xl font-bold text-red-600 mb-6">"{title}"</h3>
          </div>
        );
      } else if (paragraph.startsWith('**')) {
        const title = paragraph.replace(/\*\*/g, '');
        return (
          <div key={index} className={index > 0 ? 'mt-8' : ''}>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
          </div>
        );
      }
      return (
        <p key={index} className={`text-xl leading-relaxed text-gray-700 ${index > 0 ? 'mt-4' : ''}`}>
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 左侧导航指示器 */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 space-y-6 z-20">
        {sections.map((section, index) => (
          <button
            key={section.id}
            className="w-12 h-12 flex items-center justify-center"
            onClick={() => scrollToSection(index)}
          >
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeSection ? 'bg-gray-800 scale-150' : 'bg-gray-300 hover:bg-gray-400'
            }`} />
          </button>
        ))}
      </div>

      {/* 内容区域 */}
      <div className="relative pt-20">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className="min-h-screen w-full flex items-center"
            style={{
              scrollSnapAlign: 'start'
            }}
          >
            <div className="container mx-auto px-8 flex items-center min-h-screen pt-16">
              <div className="w-2/5 pr-8 md:block hidden">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: index === activeSection ? 1 : 0,
                    y: index === activeSection ? 0 : 20
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-5xl font-bold mb-8 text-gray-800">{section.subtitle}</h2>
                  <div className="space-y-6">
                    {renderContent(section.content)}
                  </div>
                </motion.div>
              </div>
              <div className="w-3/5 flex h-[85vh] items-center md:block hidden">
                <div className="relative flex-grow flex items-center justify-center h-full">
                  {section.subImages ? (
                    <div 
                      className="relative w-full h-full flex items-center justify-center"
                      onMouseEnter={() => setActiveImage(1)}
                      onMouseLeave={() => setActiveImage(0)}
                    >
                      {section.subImages.map((subImage, subIndex) => (
                        <motion.div
                          key={subImage.id}
                          className="absolute inset-0 flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={{ 
                            opacity: (subIndex === activeImage && index === activeSection) ? 1 : 0
                          }}
                          transition={{ duration: 0.6 }}
                        >
                          <img
                            src={subImage.image}
                            alt={subImage.title}
                            className="w-full h-full object-contain"
                          />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <motion.img
                      src={section.image}
                      alt={section.subtitle}
                      className="w-full h-full object-contain"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ 
                        opacity: index === activeSection ? 1 : 0,
                        scale: index === activeSection ? 1 : 0.95
                      }}
                      transition={{ duration: 0.6 }}
                    />
                  )}
                </div>
                {section.subImages && (
                  <div className="ml-8 flex flex-col justify-center space-y-4">
                    {section.subImages.map((subImage, subIndex) => (
                      <motion.div
                        key={`icon-${subImage.id}`}
                        className={`bg-black/50 backdrop-blur-sm rounded-lg p-3 transition-opacity duration-300 ${
                          subIndex === activeImage ? 'opacity-100' : 'opacity-50'
                        }`}
                      >
                        <div className="text-white text-sm flex items-center space-x-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
                          </svg>
                          <span>{subImage.title}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* 移动端布局 */}
              <div className="w-full md:hidden">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: index === activeSection ? 1 : 0,
                    y: index === activeSection ? 0 : 20
                  }}
                  transition={{ duration: 0.6 }}
                  className="mb-8"
                >
                  <h2 className="text-3xl font-bold mb-6 text-gray-800">{section.subtitle}</h2>
                  <div className="space-y-4">
                    {renderContent(section.content)}
                  </div>
                </motion.div>
                <div className="h-[50vh] relative">
                  {section.subImages ? (
                    <div 
                      className="relative w-full h-full flex items-center justify-center"
                      onMouseEnter={() => setActiveImage(1)}
                      onMouseLeave={() => setActiveImage(0)}
                    >
                      {section.subImages.map((subImage, subIndex) => (
                        <motion.div
                          key={subImage.id}
                          className="absolute inset-0 flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={{ 
                            opacity: (subIndex === activeImage && index === activeSection) ? 1 : 0
                          }}
                          transition={{ duration: 0.6 }}
                        >
                          <img
                            src={subImage.image}
                            alt={subImage.title}
                            className="w-full h-full object-contain"
                          />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <motion.img
                      src={section.image}
                      alt={section.subtitle}
                      className="w-full h-full object-contain"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ 
                        opacity: index === activeSection ? 1 : 0,
                        scale: index === activeSection ? 1 : 0.95
                      }}
                      transition={{ duration: 0.6 }}
                    />
                  )}
                </div>
                {section.subImages && (
                  <div className="mt-4 flex justify-center space-x-4">
                    {section.subImages.map((subImage, subIndex) => (
                      <motion.div
                        key={`icon-${subImage.id}`}
                        className={`bg-black/50 backdrop-blur-sm rounded-lg p-2 transition-opacity duration-300 ${
                          subIndex === activeImage ? 'opacity-100' : 'opacity-50'
                        }`}
                      >
                        <div className="text-white text-xs flex items-center space-x-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
                          </svg>
                          <span>{subImage.title}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx global>{`
        html {
          scroll-snap-type: y mandatory;
        }
      `}</style>
    </div>
  );
};

export default PlanningOverview; 