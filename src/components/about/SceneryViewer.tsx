'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Scenery {
  name: string;
  image: string;
  description: string;
}

interface SceneryViewerProps {
  sceneries: Scenery[];
  initialPage?: number;
}

const SceneryViewer: React.FC<SceneryViewerProps> = ({ 
  sceneries,
  initialPage = 0
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  
  const totalPages = sceneries.length;
  
  // 获取页面索引
  const nextPage = currentPage < totalPages - 1 ? currentPage + 1 : 0;
  const prevPage = currentPage > 0 ? currentPage - 1 : totalPages - 1;

  // 翻到下一页
  const handleNextPage = () => {
    if (isFlipping) return;
    setFlipDirection('next');
    setIsFlipping(true);
    
    setTimeout(() => {
      setCurrentPage(nextPage);
      setIsFlipping(false);
    }, 1500);
  };

  // 翻到上一页
  const handlePrevPage = () => {
    if (isFlipping) return;
    setFlipDirection('prev');
    setIsFlipping(true);
    
    setTimeout(() => {
      setCurrentPage(prevPage);
      setIsFlipping(false);
    }, 1500);
  };

  // 键盘控制翻页
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevPage();
      } else if (e.key === 'ArrowRight') {
        handleNextPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentPage, isFlipping]);

  return (
    <div className="book-container">
      <div className="book">
        {/* 左侧页面 - 文字内容 */}
        <div className="page left-page">
          <div className="page-content">
            {isFlipping && flipDirection === 'prev' ? (
              <>
                <h3 className="page-title">{sceneries[prevPage].name}</h3>
                <p className="page-description">{sceneries[prevPage].description}</p>
                <div className="page-number">{prevPage + 1} / {totalPages}</div>
              </>
            ) : (
              <>
                <h3 className="page-title">{sceneries[currentPage].name}</h3>
                <p className="page-description">{sceneries[currentPage].description}</p>
                <div className="page-number">{currentPage + 1} / {totalPages}</div>
              </>
            )}
          </div>
        </div>
        
        {/* 右侧页面 - 图片内容 */}
        <div className="page right-page">
          <div className="page-image">
            {isFlipping && flipDirection === 'next' ? (
              <Image
                src={sceneries[nextPage].image}
                alt={sceneries[nextPage].name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <Image
                src={sceneries[currentPage].image}
                alt={sceneries[currentPage].name}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>
        </div>
        
        {/* 向上一页翻转 - 左侧翻到右侧 */}
        {isFlipping && flipDirection === 'prev' && (
          <div className="flipping-page prev-flip">
            {/* 正面 - 当前页的文字 */}
            <div className="flipping-page-front">
              <div className="page-content">
                <h3 className="page-title">{sceneries[currentPage].name}</h3>
                <p className="page-description">{sceneries[currentPage].description}</p>
                <div className="page-number">{currentPage + 1} / {totalPages}</div>
              </div>
            </div>
            
            {/* 背面 - 上一页的图片 */}
            <div className="flipping-page-back">
              <div className="page-image">
                <Image
                  src={sceneries[prevPage].image}
                  alt={sceneries[prevPage].name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        )}
        
        {/* 向下一页翻转 - 右侧翻到左侧 */}
        {isFlipping && flipDirection === 'next' && (
          <div className="flipping-page next-flip">
            {/* 正面 - 当前页的图片 */}
            <div className="flipping-page-front">
              <div className="page-image">
                <Image
                  src={sceneries[currentPage].image}
                  alt={sceneries[currentPage].name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            
            {/* 背面 - 下一页的文字 */}
            <div className="flipping-page-back">
              <div className="page-content">
                <h3 className="page-title">{sceneries[nextPage].name}</h3>
                <p className="page-description">{sceneries[nextPage].description}</p>
                <div className="page-number">{nextPage + 1} / {totalPages}</div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* 翻页按钮 */}
      <button 
        className="turn-btn prev-btn" 
        onClick={handlePrevPage} 
        disabled={isFlipping}
        aria-label="上一页"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button 
        className="turn-btn next-btn" 
        onClick={handleNextPage} 
        disabled={isFlipping}
        aria-label="下一页"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
      
      <style jsx>{`
        .book-container {
          width: 100%;
          max-width: 1100px;
          height: 700px;
          margin: 0 auto;
          position: relative;
          perspective: 2500px;
          overflow: visible;
          padding: 50px 0;
        }
        
        @media (max-width: 768px) {
          .book-container {
            height: 500px;
            padding: 20px 0;
          }
          
          .book {
            transform: scale(0.8);
          }
          
          .page-title {
            font-size: 2rem;
          }
          
          .page-description {
            font-size: 1rem;
          }
          
          .turn-btn {
            width: 40px;
            height: 40px;
          }
          
          .turn-btn svg {
            width: 20px;
            height: 20px;
          }
        }
        
        @media (max-width: 480px) {
          .book-container {
            height: 400px;
            padding: 10px 0;
          }
          
          .book {
            transform: scale(0.6);
          }
          
          .page-title {
            font-size: 1.5rem;
          }
          
          .page-description {
            font-size: 0.9rem;
          }
          
          .turn-btn {
            width: 30px;
            height: 30px;
          }
          
          .turn-btn svg {
            width: 15px;
            height: 15px;
          }
        }
        
        .book {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.5s;
          border-radius: 5px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.25);
          background: linear-gradient(to right, #f9f9f9, #fff);
          display: flex;
          overflow: visible;
        }
        
        .page {
          width: 50%;
          height: 100%;
          overflow: hidden;
          position: relative;
          backface-visibility: hidden;
        }
        
        .left-page {
          border-right: 1px solid #e0e0e0;
          background: #f9f9f9;
        }
        
        .right-page {
          background: #fff;
        }
        
        .page-content {
          padding: 50px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          box-sizing: border-box;
        }
        
        .page-title {
          font-size: 2.8rem;
          font-weight: bold;
          color: #2d5e36;
          margin-bottom: 30px;
          text-align: center;
        }
        
        .page-description {
          font-size: 1.3rem;
          color: #333;
          line-height: 1.8;
          margin-bottom: 40px;
          text-align: justify;
        }
        
        .page-number {
          font-size: 1.1rem;
          color: #888;
          text-align: center;
          margin-top: auto;
        }
        
        .page-image {
          position: relative;
          width: 100%;
          height: 100%;
        }
        
        /* 翻转页面 */
        .flipping-page {
          position: absolute;
          width: 50%;
          height: 100%;
          top: 0;
          transform-style: preserve-3d;
          z-index: 100;
          animation-duration: 1.5s;
          animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1.000);
          animation-fill-mode: forwards;
          transform-origin: right center;
          overflow: visible;
        }
        
        .prev-flip {
          left: 0;
          animation-name: flipPrevPage;
        }
        
        .next-flip {
          left: 50%;
          transform-origin: left center;
          animation-name: flipNextPage;
        }
        
        @keyframes flipNextPage {
          0% { transform: rotateY(0); }
          100% { transform: rotateY(-180deg); }
        }
        
        @keyframes flipPrevPage {
          0% { transform: rotateY(0); }
          100% { transform: rotateY(180deg); }
        }
        
        .flipping-page-front,
        .flipping-page-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          background: #fff;
          overflow: hidden;
          z-index: 2;
        }
        
        .flipping-page-back {
          transform: rotateY(180deg);
        }
        
        /* 添加翻页时的阴影效果 */
        .next-flip::after,
        .prev-flip::after {
          content: '';
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, rgba(0,0,0,0.3), transparent);
          opacity: 0;
          animation: shadowAnimation 1.5s ease-in-out;
          pointer-events: none;
          z-index: 4;
        }
        
        .next-flip::after {
          left: 0;
          background: linear-gradient(90deg, rgba(0,0,0,0.3), transparent);
        }
        
        .prev-flip::after {
          right: 0;
          background: linear-gradient(-90deg, rgba(0,0,0,0.3), transparent);
        }
        
        @keyframes shadowAnimation {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
        
        /* 书籍边缘阴影 */
        .book::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          width: 1px;
          height: 100%;
          background: rgba(0,0,0,0.1);
          box-shadow: 0 0 15px rgba(0,0,0,0.15);
          z-index: 5;
        }
        
        /* 翻页按钮 */
        .turn-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(45, 94, 54, 0.8);
          border: none;
          cursor: pointer;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s, transform 0.3s;
          z-index: 10;
        }
        
        .prev-btn {
          left: -30px;
        }
        
        .next-btn {
          right: -30px;
        }
        
        .turn-btn:hover {
          background: rgba(45, 94, 54, 1);
          transform: translateY(-50%) scale(1.1);
        }
        
        .turn-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: translateY(-50%) scale(1);
        }
        
        .turn-btn svg {
          width: 30px;
          height: 30px;
        }
      `}</style>
    </div>
  );
};

export default SceneryViewer; 