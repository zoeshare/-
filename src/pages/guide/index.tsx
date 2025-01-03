import React, { useState } from 'react';
import Layout from '@/components/Layout';
import GISManager from '@/components/guide/GISManager';

interface DatabaseItem {
  id: string;
  title: string;
  items: {
    title: string;
    files: { name: string; path: string; }[];
  }[];
}

const databaseItems: DatabaseItem[] = [
  {
    id: 'cityCheck',
    title: '城市体检',
    items: [
      {
        title: '2023年度体检报告',
        files: [
          { name: '城市体检评估报告.pdf', path: '/database/city-check/2023/evaluation.pdf' },
          { name: '城市发展指标分析.pdf', path: '/database/city-check/2023/indicators.pdf' }
        ]
      },
      {
        title: '专项评估',
        files: [
          { name: '生态环境评估.pdf', path: '/database/city-check/special/environment.pdf' },
          { name: '交通体系评估.pdf', path: '/database/city-check/special/traffic.pdf' }
        ]
      }
    ]
  },
  {
    id: 'planning',
    title: '规划成果',
    items: [
      {
        title: '总体规划',
        files: [
          { name: '城市总体规划说明.pdf', path: '/database/planning/master/description.pdf' },
          { name: '规划图集.pdf', path: '/database/planning/master/maps.pdf' }
        ]
      },
      {
        title: '专项规划',
        files: [
          { name: '水系统规划.pdf', path: '/database/planning/special/water.pdf' },
          { name: '绿地系统规划.pdf', path: '/database/planning/special/green.pdf' }
        ]
      }
    ]
  },
  {
    id: 'gis',
    title: 'GIS数据',
    items: [
      {
        title: '基础地理数据',
        files: [
          { name: '地形数据.zip', path: '/database/gis/basic/terrain.zip' },
          { name: '行政区划.zip', path: '/database/gis/basic/admin.zip' }
        ]
      },
      {
        title: '专题数据',
        files: [
          { name: '用地现状.zip', path: '/database/gis/thematic/landuse.zip' },
          { name: '规划用地.zip', path: '/database/gis/thematic/planning.zip' }
        ]
      }
    ]
  }
];

const GuidePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);

  return (
    <Layout>
      <div className="min-h-screen flex">
        {/* 左侧数据库目录 */}
        <div className="w-[400px] bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">成果数据库</h2>
            <div className="space-y-6">
              {databaseItems.map((category) => (
                <div key={category.id} className="space-y-2">
                  <button
                    className={`w-full p-2 rounded-lg transition-colors ${
                      selectedCategory === category.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedCategory(
                      selectedCategory === category.id ? null : category.id
                    )}
                  >
                    <span className="text-lg font-medium">{category.title}</span>
                  </button>
                  
                  {selectedCategory === category.id && (
                    <div className="ml-8 space-y-4">
                      {category.items.map((item, index) => (
                        <div key={index} className="space-y-2">
                          <button
                            className={`text-left w-full p-2 rounded-lg transition-colors ${
                              selectedSubCategory === `${category.id}-${index}` 
                                ? 'bg-blue-50' 
                                : 'hover:bg-gray-50'
                            }`}
                            onClick={() => setSelectedSubCategory(
                              selectedSubCategory === `${category.id}-${index}` 
                                ? null 
                                : `${category.id}-${index}`
                            )}
                          >
                            {item.title}
                          </button>
                          
                          {selectedSubCategory === `${category.id}-${index}` && (
                            <div className="ml-4 space-y-2">
                              {item.files.map((file, fileIndex) => (
                                <a
                                  key={fileIndex}
                                  href={file.path}
                                  className="block p-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {file.name}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧天地图 */}
        <div className="flex-1 relative">
          <GISManager />
        </div>
      </div>
    </Layout>
  );
};

export default GuidePage; 