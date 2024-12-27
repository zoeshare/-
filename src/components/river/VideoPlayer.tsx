import React, { useRef, useEffect } from 'react';

interface VideoPlayerProps {
  onEnded: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ onEnded }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(error => {
        console.error('视频播放失败:', error);
      });
    }
  }, []);

  return (
    <video
      ref={videoRef}
      className="max-w-full max-h-full"
      autoPlay
      playsInline
      controls
      onEnded={onEnded}
    >
      <source src="/videos/river.mp4" type="video/mp4" />
      您的浏览器不支持视频播放。
    </video>
  );
};

export default VideoPlayer; 