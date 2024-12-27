import React, { useRef } from 'react';
import { GISLayer } from '../../types/gis';

interface GISManagerProps {
  layers: GISLayer[];
  onLayerChange: (layers: GISLayer[]) => void;
  onFileUpload: (file: File) => void;
}

const GISManager: React.FC<GISManagerProps> = ({ layers, onLayerChange, onFileUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLayerToggle = (layerId: string) => {
    const updatedLayers = layers.map(layer => {
      if (layer.id === layerId) {
        return { ...layer, visible: !layer.visible };
      }
      return layer;
    });
    onLayerChange(updatedLayers);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-lg z-50">
      <h3 className="text-lg font-bold mb-4">图层管理</h3>
      <div className="space-y-2">
        {layers.map(layer => (
          <div key={layer.id} className="flex items-center">
            <input
              type="checkbox"
              checked={layer.visible}
              onChange={() => handleLayerToggle(layer.id)}
              className="mr-2"
            />
            <span>{layer.name}</span>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".json,.geojson"
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          上传GIS数据
        </button>
      </div>
    </div>
  );
};

export default GISManager; 