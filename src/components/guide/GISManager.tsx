import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('./MapView'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="text-gray-600">地图加载中...</div>
    </div>
  )
});

interface Layer {
  id: string;
  name: string;
  visible: boolean;
  type: 'base' | 'overlay';
  url?: string;
  file?: File;
}

const GISManager: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [layers, setLayers] = useState<Layer[]>([
    {
      id: 'tianditu-vec',
      name: '天地图矢量图层',
      visible: true,
      type: 'base'
    },
    {
      id: 'tianditu-img',
      name: '天地图影像图层',
      visible: false,
      type: 'base'
    }
  ]);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleLayerChange = (layerId: string, visible: boolean) => {
    setLayers(layers.map(layer => {
      if (layer.type === 'base') {
        return {
          ...layer,
          visible: layer.id === layerId
        };
      }
      if (layer.id === layerId) {
        return {
          ...layer,
          visible
        };
      }
      return layer;
    }));
  };

  const handleFileUpload = (file: File) => {
    const newLayer: Layer = {
      id: `file-${Date.now()}`,
      name: file.name,
      visible: true,
      type: 'overlay',
      file
    };
    setLayers([...layers, newLayer]);
  };

  if (!mounted) return null;

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-lg p-4">
        <div className="space-y-4">
          <h3 className="font-medium">图层控制</h3>
          {layers.map(layer => (
            <div key={layer.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={layer.visible}
                onChange={(e) => handleLayerChange(layer.id, e.target.checked)}
                className="rounded text-blue-500"
              />
              <span>{layer.name}</span>
            </div>
          ))}
          <div className="pt-2 border-t">
            <input
              type="file"
              accept=".geojson,.json,.kml"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleFileUpload(file);
                }
              }}
              className="text-sm"
            />
          </div>
        </div>
      </div>
      {mounted && (
        <MapView 
          layers={layers} 
          onLayerChange={handleLayerChange} 
          onFileUpload={handleFileUpload} 
        />
      )}
    </div>
  );
};

export default GISManager; 