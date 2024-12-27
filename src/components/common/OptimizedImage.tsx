import React from 'react';
import Image from 'next/image';
import imageLoader from '@/utils/imageLoader';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

export default function OptimizedImage({ src, alt, width, height, className, priority }: OptimizedImageProps) {
  const baseName = src.substring(0, src.lastIndexOf('.'));
  const ext = src.split('.').pop()?.toLowerCase();

  if (!ext || !['jpg', 'jpeg', 'png'].includes(ext)) {
    return (
      <Image
        loader={imageLoader}
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        unoptimized
      />
    );
  }

  return (
    <picture>
      <source srcSet={imageLoader({ src: `${baseName}.avif` })} type="image/avif" />
      <source srcSet={imageLoader({ src: `${baseName}.webp` })} type="image/webp" />
      <img
        src={imageLoader({ src })}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
      />
    </picture>
  );
} 