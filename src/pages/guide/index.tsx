import React from 'react';
import Navigation from '../../components/common/Navigation';
import MapView from '../../components/guide/MapView';

const GuidePage = () => {
  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 z-0">
        <MapView />
      </div>
      <Navigation disableScrollStyle={true} />
    </div>
  );
};

export default GuidePage; 