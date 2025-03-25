import React, { useRef, useEffect, useState } from 'react';

interface VideoPlayerProps {
  onEnded: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ onEnded }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      const handleLoadedData = () => {
        setIsLoading(false);
        setError(null);
      };

      const handleError = (e: Event) => {
        console.error('视频加载失败:', e);
        setError('视频加载失败，请刷新页面重试');
        setIsLoading(false);
      };

      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('error', handleError);

      video.load();
      video.play().catch(error => {
        console.error('视频播放失败:', error);
        setError('视频播放失败，请刷新页面重试');
        setIsLoading(false);
      });

      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('error', handleError);
      };
    }
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-black/50">
        <div className="text-white text-center">
          <p className="mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded transition-colors"
          >
            刷新页面
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-white">加载中...</div>
        </div>
      )}
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        autoPlay
        muted
        playsInline
        controls
        onEnded={onEnded}
      >
        <source src="/videos/river.mp4" type="video/mp4" />
        您的浏览器不支持视频播放。
      </video>
    </div>
  );
};

export default VideoPlayer; 