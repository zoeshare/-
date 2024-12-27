import React from 'react';

interface SimpleImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function SimpleImage({ src, alt, className }: SimpleImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
    />
  );
} 