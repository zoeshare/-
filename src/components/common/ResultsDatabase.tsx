import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Result {
  id: string;
  title: string;
  description: string;
  date: string;
  type: string;
  imageUrl: string;
}

const ResultsDatabase: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Result[]>([
    {
      id: '1',
      title: '茶江镇总体规划',
      description: '茶江镇总体规划设计方案及成果展示',
      date: '2023-12-01',
      type: '规划设计',
      imageUrl: '/images/gallery/master-plan.png'
    },
    // 可以添加更多示例数据
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 实现搜索逻辑
    console.log('搜索:', searchQuery);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* 搜索区域 */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">成果数据库</h2>
          <p className="mt-4 text-lg text-gray-600">
            搜索和浏览最新的规划设计成果
          </p>
        </div>

        <form onSubmit={handleSearch} className="mt-8 flex justify-center">
          <div className="w-full max-w-2xl">
            <div className="flex gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="输入关键词搜索..."
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
              >
                搜索
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* 结果展示区域 */}
      <div className="max-w-7xl mx-auto mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((result) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={result.imageUrl}
                  alt={result.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {result.title}
                  </h3>
                  <span className="text-sm text-blue-500 bg-blue-50 px-2 py-1 rounded">
                    {result.type}
                  </span>
                </div>
                <p className="mt-2 text-gray-600">{result.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">{result.date}</span>
                  <button className="text-blue-500 hover:text-blue-600 font-medium">
                    查看详情
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsDatabase; 