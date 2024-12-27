import React from 'react';
import Navigation from '../../components/common/Navigation';
import ModelViewer from '../../components/planning/ModelViewer';
import GallerySection from '../../components/planning/GallerySection';

const Planning: React.FC = () => {
  return (
    <div>
      <Navigation />
      <ModelViewer />
      <GallerySection />
    </div>
  );
};

export default Planning; 