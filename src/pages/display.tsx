import React from 'react';
import Navigation from '../components/Navigation';
import GalleryViewer from '../components/planning/GalleryViewer';

const DisplayPage: React.FC = () => {
  return (
    <div className="pt-16 relative">
      <Navigation />
      <GalleryViewer />
    </div>
  );
};

export default DisplayPage; 