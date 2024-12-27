import React, { useEffect, useRef } from 'react';

const TIANDITU_TOKEN = '5b8b5555c60c31e8f6b47227bb274337';

const MapView: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    // 动态加载天地图脚本
    const loadTianDiTu = () => {
      return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `https://api.tianditu.gov.cn/api?v=4.0&tk=${TIANDITU_TOKEN}`;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load TianDiTu API'));
        document.head.appendChild(script);
      });
    };

    const initMap = async () => {
      try {
        await loadTianDiTu();
        
        if (!mapContainerRef.current || !window.T) {
          console.error('Map container or TianDiTu API not found');
          return;
        }

        // 恭城县政府坐标
        const center = new window.T.LngLat(110.827896, 24.833322);
        
        // 创建地图实例
        mapRef.current = new window.T.Map(mapContainerRef.current);
        
        // 设置中心点和缩放级别
        mapRef.current.centerAndZoom(center, 14);

        // 添加矢图层
        const vec = new window.T.TileLayer({
          getTileUrl: function(x: number, y: number, z: number) {
            return 'https://t' + ((x + y) % 8) + '.tianditu.gov.cn/vec_w/wmts?' +
              'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles' +
              '&TILEMATRIX=' + z + '&TILEROW=' + y + '&TILECOL=' + x + '&tk=' + TIANDITU_TOKEN;
          }
        });
        mapRef.current.addLayer(vec);

        // 添加标注图层
        const cva = new window.T.TileLayer({
          getTileUrl: function(x: number, y: number, z: number) {
            return 'https://t' + ((x + y) % 8) + '.tianditu.gov.cn/cva_w/wmts?' +
              'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles' +
              '&TILEMATRIX=' + z + '&TILEROW=' + y + '&TILECOL=' + x + '&tk=' + TIANDITU_TOKEN;
          }
        });
        mapRef.current.addLayer(cva);

        // 添加控件
        mapRef.current.addControl(new window.T.Control.Zoom());
        mapRef.current.addControl(new window.T.Control.Scale());
        mapRef.current.addControl(new window.T.Control.MapType());

        // 启用鼠标滚轮缩放
        mapRef.current.enableScrollWheelZoom();
      } catch (error) {
        console.error('Failed to initialize map:', error);
      }
    };

    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.destroy();
      }
    };
  }, []);

  return (
    <div 
      ref={mapContainerRef} 
      className="w-full h-full absolute inset-0"
      style={{ background: '#f0f0f0' }}
    />
  );
};

export default MapView;