import React from 'react';
import Image from 'next/image';
import Navigation from '../components/Navigation';

const IntroductionPage = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-4xl font-bold mb-12 text-center text-white">规划简介</h1>
        
        <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">地理位置</h2>
          <p className="text-gray-200 mb-8 leading-relaxed text-lg">
            恭城瑶族自治县地处桂林市东南部，位于广西'一廊两屏四区'的桂东北生态功能区。地跨海洋山与都庞岭，山脉呈南北走向，分立于西、东两侧，茶江河贯穿县境，十条主要支流纵横密布，河流沿岸有较为平坦的小冲积平地，中部形成较开阔的河谷平原，境内以山地、丘陵为主，山川形胜、风光秀丽，被誉为'南岭明珠'。整体呈现两山一川，十水汇江的地理格局。
          </p>
          
          <div className="relative w-full h-[600px] mb-8">
            <Image
              src="/images/planning/overview-map.png"
              alt="恭城瑶族自治县概况图"
              fill
              style={{ objectFit: 'contain' }}
              className="rounded-lg"
              priority
            />
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-white">规划范围</h2>
          <p className="text-gray-200 leading-relaxed text-lg">
            规划范围为全县域，面积2139.33平方公里。重点规划范围以县城为核心，北至道公山，东至高铁新区、南至犁头岩、西至东热岭，面积约35.57平方公里。
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroductionPage; 