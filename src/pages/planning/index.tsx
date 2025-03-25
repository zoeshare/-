import React from 'react';
import Navigation from '@/components/Navigation';
import ModelViewer from '@/components/planning/ModelViewer';
import GallerySection from '@/components/planning/GallerySection';

const PlanningPage = () => {
  return (
    <div className="min-h-screen relative">
      <Navigation />
      <div className="pt-16">
        <ModelViewer />
        <GallerySection />
      </div>
    </div>
  );
};

export default PlanningPage; 