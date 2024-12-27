import React from 'react';

const Legend = () => {
  return (
    <div className="absolute bottom-4 right-4 bg-white/90 p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold mb-2">图例</h3>
      <div className="space-y-2">
        <div className="flex items-center">
          <div 
            className="w-6 h-6 mr-2 rounded"
            style={{ 
              backgroundColor: 'rgba(255, 69, 0, 0.2)',
              border: '2px solid #FF4500'
            }}
          />
          <span>县城开发边界</span>
        </div>
        <div className="flex items-center">
          <div 
            className="w-6 h-6 mr-2 rounded"
            style={{ 
              backgroundColor: 'rgba(65, 105, 225, 0.2)',
              border: '2px solid #4169E1'
            }}
          />
          <span>茶江风景区</span>
        </div>
      </div>
    </div>
  );
};

export default Legend; 