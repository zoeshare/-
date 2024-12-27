import React from 'react';
import GalleryViewer from '../components/planning/GalleryViewer';
import Navigation from '../components/common/Navigation';

const DisplayPage: React.FC = () => {
  return (
    <div className="relative">
      <Navigation />
      <GalleryViewer />
    </div>
  );
};

export default DisplayPage; 