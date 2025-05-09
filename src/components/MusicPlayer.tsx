'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaMusic, FaVolumeUp, FaVolumeMute, FaPlayCircle } from 'react-icons/fa';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true); // 默认为播放状态
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [mounted, setMounted] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [autoplayFailed, setAutoplayFailed] = useState(false);
  const [showPlayTip, setShowPlayTip] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasTried = useRef(false);
  
  // App Router的usePathname
  const pathname = usePathname();

  // 获取当前路径（兼容App Router和Pages Router）
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 优先使用App Router的pathname
      if (pathname) {
        setCurrentPath(pathname);
      } else {
        // 如果没有App Router的pathname，则使用window.location.pathname
        setCurrentPath(window.location.pathname);
      }

      // 监听路径变化（适用于Pages Router）
      const handleRouteChange = () => {
        setCurrentPath(window.location.pathname);
      };

      window.addEventListener('popstate', handleRouteChange);
      return () => {
        window.removeEventListener('popstate', handleRouteChange);
      };
    }
  }, [pathname]);

  // 获取当前页面对应的音乐
  const getCurrentMusic = () => {
    // 在飞跃茶江页面播放background2.mp3
    if (currentPath && (
      currentPath === '/fly' || 
      currentPath === '/river' || 
      currentPath.includes('river') || 
      currentPath.includes('fly')
    )) {
      return '/sound/background2.mp3';
    }
    // 在其他页面播放background1.mp3
    return '/sound/background1.mp3';
  };

  // 尝试自动播放
  const tryAutoplay = async () => {
    if (!audioRef.current || hasTried.current) return;
    
    hasTried.current = true;
    
    try {
      // 先设置音量为0，避免突然的声音
      audioRef.current.volume = 0;
      
      // 尝试播放
      await audioRef.current.play();
      
      // 如果播放成功，逐渐增加音量
      let vol = 0;
      const fadeIn = setInterval(() => {
        vol += 0.05;
        if (vol >= volume) {
          audioRef.current!.volume = volume;
          clearInterval(fadeIn);
        } else {
          audioRef.current!.volume = vol;
        }
      }, 100);
      
      setIsPlaying(true);
      setAutoplayFailed(false);
    } catch (error) {
      console.info('自动播放被浏览器阻止:', error);
      setIsPlaying(false);
      setAutoplayFailed(true);
      setShowPlayTip(true);
      
      // 5秒后隐藏提示气泡
      setTimeout(() => setShowPlayTip(false), 5000);
      
      // 如果自动播放失败，监听页面交互事件，在用户交互后尝试播放
      const playOnInteraction = () => {
        if (audioRef.current && !isPlaying) {
          audioRef.current.play().catch(() => {});
          setIsPlaying(true);
          setAutoplayFailed(false);
          setShowPlayTip(false);
          
          // 移除事件监听
          ['click', 'touchstart', 'keydown'].forEach(event => {
            document.removeEventListener(event, playOnInteraction);
          });
        }
      };
      
      // 添加事件监听
      ['click', 'touchstart', 'keydown'].forEach(event => {
        document.addEventListener(event, playOnInteraction, { once: true });
      });
    }
  };

  // 仅在客户端执行，初始化音频
  useEffect(() => {
    setMounted(true);
    
    if (typeof window !== 'undefined') {
      try {
        const audio = new Audio(getCurrentMusic());
        audio.loop = true;
        audio.volume = volume;
        
        // 设置音频事件监听
        audio.addEventListener('play', () => setIsPlaying(true));
        audio.addEventListener('pause', () => setIsPlaying(false));
        audio.addEventListener('ended', () => {
          // 循环播放可能会结束，确保重新开始
          audio.currentTime = 0;
          audio.play().catch(() => {});
        });
        
        audioRef.current = audio;
        
        // 尝试自动播放
        tryAutoplay();
      } catch (error) {
        console.error('创建音频元素失败:', error);
      }
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.remove();
        audioRef.current = null;
      }
    };
  }, []);

  // 监听路径变化切换音乐
  useEffect(() => {
    if (!mounted || !audioRef.current) return;
    
    // 路径变化时切换音乐
    try {
      const newMusic = getCurrentMusic();
      if (!audioRef.current.src.endsWith(newMusic)) {
        const wasPlaying = isPlaying;
        audioRef.current.pause();
        audioRef.current.src = newMusic;
        audioRef.current.load();
        if (wasPlaying) {
          audioRef.current.play().catch(error => {
            console.info('播放切换的音乐失败:', error);
            setIsPlaying(false);
          });
        }
      }
    } catch (error) {
      console.error('切换音乐失败:', error);
    }
  }, [currentPath, mounted]);

  // 更新音量
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // 播放/暂停
  const togglePlay = () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.info('播放失败:', error);
        });
      }
      setIsPlaying(!isPlaying);
      setAutoplayFailed(false);
      setShowPlayTip(false);
    } catch (error) {
      console.error('播放控制失败:', error);
    }
  };

  // 静音/取消静音
  const toggleMute = () => {
    if (!audioRef.current) return;
    
    try {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    } catch (error) {
      console.error('静音控制失败:', error);
    }
  };

  // 调整音量
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  // 如果还没有在客户端渲染，返回null
  if (!mounted) return null;

  return (
    <div 
      className="fixed top-4 right-8 z-50 flex items-center"
      onMouseEnter={() => {
        setShowVolumeControl(true);
        if (autoplayFailed) {
          setShowPlayTip(true);
        }
      }}
      onMouseLeave={() => {
        setShowVolumeControl(false);
        if (!autoplayFailed) {
          setShowPlayTip(false);
        }
      }}
    >
      {/* 播放提示气泡 */}
      {showPlayTip && (
        <div className="absolute top-full right-0 mt-2 bg-black/70 text-white text-sm py-2 px-3 rounded-lg shadow-lg animate-fade-in-top whitespace-nowrap">
          点击图标开始播放背景音乐
          <div className="absolute top-0 right-4 transform -translate-y-2 rotate-45 w-2 h-2 bg-black/70"></div>
        </div>
      )}
      
      <div 
        className={`flex items-center transition-all duration-300 ${
          showVolumeControl ? 'opacity-100 max-w-[150px]' : 'opacity-0 max-w-0 overflow-hidden'
        }`}
      >
        <button
          onClick={toggleMute}
          className="text-white/90 hover:text-white transition mr-2"
          aria-label={isMuted ? "取消静音" : "静音"}
        >
          {isMuted ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
        </button>
        
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-16 accent-green-600"
        />
      </div>
      
      <button
        onClick={togglePlay}
        className={`ml-2 text-white/80 hover:text-white focus:outline-none transition ${isPlaying ? 'animate-pulse' : ''} ${autoplayFailed ? 'animate-bounce' : ''}`}
        aria-label={isPlaying ? "暂停音乐" : "播放音乐"}
      >
        <FaMusic size={18} />
      </button>
    </div>
  );
};

export default MusicPlayer; 