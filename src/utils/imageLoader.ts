export default function imageLoader({ src, width, quality }: { src: string; width?: number; quality?: number }): string {
  // 如果是外部链接，直接返回
  if (src.startsWith('http')) {
    return src;
  }
  
  // 如果是相对路径，添加正确的前缀
  if (src.startsWith('/')) {
    const prefix = process.env.NODE_ENV === 'production' ? '.' : '';
    return `${prefix}${src}`;
  }
  
  // 处理不同的图片格式
  const formats = ['avif', 'webp', 'jpg', 'jpeg', 'png'];
  const ext = src.split('.').pop()?.toLowerCase();
  
  if (ext && formats.includes(ext)) {
    const baseName = src.substring(0, src.lastIndexOf('.'));
    // 返回原始路径
    return src;
  }
  
  return src;
} 