import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Hotspot {
  id: number;
  x: number;
  y: number;
  image: string;
  title: string;
}

interface HotspotManagerProps {
  hotspots: Hotspot[];
  onHotspotsChange: (hotspots: Hotspot[]) => void;
  isEditing: boolean;
}

const HotspotManager: React.FC<HotspotManagerProps> = ({
  hotspots,
  onHotspotsChange,
  isEditing
}) => {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isEditing) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newHotspot: Hotspot = {
      id: Date.now(),
      x,
      y,
      image: '/images/river/spots/new-spot.png',
      title: '新景观点'
    };
    
    onHotspotsChange([...hotspots, newHotspot]);
    setSelectedHotspot(newHotspot);
  };

  const handleHotspotDrag = (id: number, x: number, y: number) => {
    const updatedHotspots = hotspots.map(hotspot =>
      hotspot.id === id ? { ...hotspot, x, y } : hotspot
    );
    onHotspotsChange(updatedHotspots);
  };

  const handleHotspotEdit = (hotspot: Hotspot) => {
    setSelectedHotspot(hotspot);
  };

  const handleHotspotUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedHotspot) return;

    const form = e.currentTarget;
    const title = (form.elements.namedItem('title') as HTMLInputElement).value;
    const fileInput = form.elements.namedItem('image') as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        const updatedHotspots = hotspots.map(h =>
          h.id === selectedHotspot.id ? { ...h, title, image: imageUrl } : h
        );
        onHotspotsChange(updatedHotspots);
        setSelectedHotspot(null);
      };
      reader.readAsDataURL(file);
    } else {
      const updatedHotspots = hotspots.map(h =>
        h.id === selectedHotspot.id ? { ...h, title } : h
      );
      onHotspotsChange(updatedHotspots);
      setSelectedHotspot(null);
    }
  };

  const handleDeleteHotspot = (id: number) => {
    const updatedHotspots = hotspots.filter(h => h.id !== id);
    onHotspotsChange(updatedHotspots);
    setSelectedHotspot(null);
  };

  return (
    <div className="relative w-full h-full">
      <div
        className={`relative w-full h-full ${isEditing ? 'cursor-crosshair' : ''}`}
        onClick={handleImageClick}
      >
        {hotspots.map((hotspot) => (
          <motion.div
            key={hotspot.id}
            className={`absolute w-8 h-8 -ml-4 -mt-4 ${
              isEditing ? 'cursor-move' : 'cursor-pointer'
            } group`}
            style={{ left: hotspot.x, top: hotspot.y }}
            drag={isEditing}
            dragMomentum={false}
            onDragEnd={(_, info) => {
              handleHotspotDrag(
                hotspot.id,
                hotspot.x + info.offset.x,
                hotspot.y + info.offset.y
              );
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (isEditing) {
                handleHotspotEdit(hotspot);
              } else {
                // 触发父组件的点击事件
                onHotspotsChange([...hotspots]);
              }
            }}
          >
            <div className="w-full h-full bg-blue-500 rounded-full opacity-75 animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 
                        bg-black bg-opacity-75 text-white text-sm px-2 py-1 rounded
                        opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              {hotspot.title}
            </div>
          </motion.div>
        ))}
      </div>

      {selectedHotspot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form
            onSubmit={handleHotspotUpdate}
            className="bg-white rounded-lg p-6 w-[480px]"
          >
            <h3 className="text-lg font-semibold mb-4">编辑热点</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  标题
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={selectedHotspot.title}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  效果图
                </label>
                <div className="mt-2 flex items-center space-x-4">
                  <div className="w-32 h-32 border rounded-lg overflow-hidden">
                    <img
                      src={selectedHotspot.image}
                      alt="预览图"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      支持 JPG、PNG 格式图片
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={() => handleDeleteHotspot(selectedHotspot.id)}
                className="px-4 py-2 border border-red-300 text-red-700 rounded-md text-sm font-medium hover:bg-red-50"
              >
                删除热点
              </button>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setSelectedHotspot(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
                >
                  保存
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default HotspotManager;