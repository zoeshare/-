import React from 'react';
import Layout from '@/components/Layout';

const RiverPage = () => {
  return (
    <Layout>
      <div className="w-full h-[calc(100vh-4rem)] pt-16">
        <iframe 
          src="https://www.720yun.com/vr/537j5gmmtn9"
          className="w-full h-full border-none"
          allow="fullscreen; xr-spatial-tracking; gyroscope; accelerometer"
        />
      </div>
    </Layout>
  );
};

export default RiverPage;