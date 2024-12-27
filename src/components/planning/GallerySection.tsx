import React from 'react';
import { motion } from 'framer-motion';

const GallerySection: React.FC = () => {
  const images = [
    { id: 1, url: '/images/gallery1.jpg', description: '茶江全景' },
    { id: 2, url: '/images/gallery2.jpg', description: '茶园风光' },
    { id: 3, url: '/images/gallery3.jpg', description: '文化展示' },
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8">规划展示</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <motion.div
              key={image.id}
              className="relative overflow-hidden rounded-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={image.url}
                alt={image.description}
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                {image.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection; 