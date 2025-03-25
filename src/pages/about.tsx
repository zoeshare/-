'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Layout from '../components/Layout';

const AboutGongcheng = dynamic(() => import('../components/about/AboutGongcheng'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-2xl text-gray-600">加载中...</div>
    </div>
  ),
});

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <AboutGongcheng />
    </Layout>
  );
};

export default AboutPage; 