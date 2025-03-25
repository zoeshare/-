/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // 静态资源配置
  assetPrefix: '',
  webpack: (config) => {
    // 分别处理不同类型的图片
    config.module.rules.push({
      test: /\.jpe?g$/i,
      type: 'asset/resource',
      generator: {
        filename: 'images/[name][ext]'
      }
    });

    config.module.rules.push({
      test: /\.(png|gif|svg)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/[name][ext]'
      }
    });

    // 处理视频文件
    config.module.rules.push({
      test: /\.(mp4|webm)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'videos/[name][ext]'
      }
    });

    // 确保输出路径正确
    if (process.env.NODE_ENV === 'production') {
      config.output = {
        ...config.output,
        publicPath: '/',
      };
    }

    return config;
  },
  // 基础路径配置
  basePath: '',
  // 确保路径末尾有斜杠
  trailingSlash: true,
}

module.exports = nextConfig 