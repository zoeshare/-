export default function imageLoader({ src, width, quality }: { src: string; width?: number; quality?: number }) {
  // 如果是外部链接，直接返回
  if (src.startsWith('http')) {
    return src;
  }
  
  // 如果是相对路径，添加 ./ 前缀
  if (src.startsWith('/')) {
    return `.${src}`;
  }
  
  return src;
} 