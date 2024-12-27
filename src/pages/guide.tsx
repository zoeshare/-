import React, { useEffect, useRef } from 'react';
import Navigation from '../components/Navigation';
import Legend from '../components/guide/Legend';
import countyBoundary from '../data/gis/县城开发边界.json';
import scenicArea from '../data/gis/茶江风景区.json';
import { GISData } from '../types/gis';

interface ESRIFeature {
  geometry: {
    rings: number[][][];
  };
  attributes: Record<string, any>;
}

const GuidePage = () => {
  const mapRef = useRef<any>(null);
  const boundsRef = useRef<{
    minLng: number;
    maxLng: number;
    minLat: number;
    maxLat: number;
  } | null>(null);

  // 坐标转换函数
  const convertToWGS84 = (x: number, y: number) => {
    try {
      // 检查输入坐标是否有效
      if (!isFinite(x) || !isFinite(y)) {
        console.warn('Invalid coordinates:', x, y);
        return null;
      }

      // 如果坐标已经在合理范围内，直接使用
      if (x >= 110.7 && x <= 111.0 && y >= 24.7 && y <= 25.0) {
        return { lng: x, lat: y };
      }

      // 尝试 EPSG:3857 到 WGS84 的转换
      const R = 6378137; // 地球半径
      const maxX = 20037508.34;
      const maxY = 20037508.34;

      // 如果是墨卡托投影坐标
      if (Math.abs(x) > 180 || Math.abs(y) > 90) {
        // 转换到经纬度
        let lng = (x / maxX) * 180;
        let lat = (Math.atan(Math.exp((y / maxY) * Math.PI)) * 360) / Math.PI - 90;

        console.log('Converted from Mercator:', { original: { x, y }, converted: { lng, lat } });
        
        // 检查转换结果是否在合理范围内
        if (lng >= 110.7 && lng <= 111.0 && lat >= 24.7 && lat <= 25.0) {
          return { lng, lat };
        }
      }

      // 尝试缩放转换
      const scaleFactors = [1e-5, 1e-6, 1e-7];
      for (const scale of scaleFactors) {
        const lng = x * scale;
        const lat = y * scale;
        if (lng >= 110.7 && lng <= 111.0 && lat >= 24.7 && lat <= 25.0) {
          console.log(`Found valid conversion with scale ${scale}:`, { lng, lat });
          return { lng, lat };
        }
      }

      console.warn('Failed to convert coordinates:', { x, y });
      return null;
    } catch (error) {
      console.error('Error converting coordinates:', error);
      return null;
    }
  };

  // 创建 LngLat 对象的辅助函数
  const createLngLat = (lng: number, lat: number) => {
    try {
      // 确保输入是有效的数字
      if (!isFinite(lng) || !isFinite(lat)) {
        console.warn('Invalid lng/lat values:', { lng, lat });
        return null;
      }

      // 确保经纬度在合理范围内
      if (lng < -180 || lng > 180 || lat < -90 || lat > 90) {
        console.warn('Coordinates out of range:', { lng, lat });
        return null;
      }

      // 创建点对象
      const point = new window.T.LngLat(lng, lat);
      
      // 验证创建的点对象
      if (!point || typeof point.lng !== 'number' || typeof point.lat !== 'number') {
        console.warn('Failed to create valid LngLat object:', { lng, lat });
        return null;
      }

      return point;
    } catch (error) {
      console.error('Error creating LngLat object:', error);
      return null;
    }
  };

  // 创建多边形的辅助函数
  const createPolygon = (points: any[], color: string, fillColor: string) => {
    try {
      // 验证点数组
      if (!Array.isArray(points) || points.length < 3) {
        console.warn('Invalid points array:', points);
        return null;
      }

      // 验证每个点
      const validPoints = points.filter(point => 
        point && typeof point.lng === 'number' && typeof point.lat === 'number'
      );

      if (validPoints.length < 3) {
        console.warn('Not enough valid points:', validPoints.length);
        return null;
      }

      // 创建多边形
      return new window.T.Polygon(validPoints, {
        color,
        fillColor,
        fillOpacity: 0.4,
        weight: 2,
        opacity: 1
      });
    } catch (error) {
      console.error('Error creating polygon:', error);
      return null;
    }
  };

  useEffect(() => {
    // 加载天地图API
    const loadTianDiTuAPI = () => {
      return new Promise<void>((resolve, reject) => {
        if (window.T) {
          console.log('天地图API已经加载，直接使用...');
          resolve();
          return;
        }

        console.log('开始加载天地图API...');
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'http://api.tianditu.gov.cn/api?v=4.0&tk=5b8b5555c60c31e8f6b47227bb274337';
        
        script.onload = () => {
          console.log('天地图API加载完成');
          resolve();
        };

        script.onerror = (error) => {
          console.error('天地图API加载失败:', error);
          reject(new Error('Failed to load TianDiTu API'));
        };

        document.head.appendChild(script);
      });
    };

    const initMap = async () => {
      try {
        await loadTianDiTuAPI();
        
        // 等待API加载完成
        const waitForAPI = () => {
          return new Promise<void>((resolve, reject) => {
            let attempts = 0;
            const maxAttempts = 50;

            const checkTMap = () => {
              attempts++;
              if (!window.T) {
                console.log('等待天地图API加载...');
                if (attempts >= maxAttempts) {
                  reject(new Error('加载天地图API超时'));
                  return;
                }
                setTimeout(checkTMap, 100);
                return;
              }

              console.log('天地图API加载成功！');
              resolve();
            };

            checkTMap();
          });
        };

        await waitForAPI();

        // 创建地图实例
        console.log('创建地图实例...');
        const map = new window.T.Map('map-container', {
          zoom: 11,
          minZoom: 1,
          maxZoom: 18,
          center: new window.T.LngLat(110.827896, 24.833322)
        });

        // 添加控件
        map.addControl(new window.T.Control.Zoom());
        map.addControl(new window.T.Control.Scale());
        map.addControl(new window.T.Control.MapType());
        
        // 启用滚轮缩放
        map.enableScrollWheelZoom();

        // 设置地图边界（暂时注释掉，等地图完全加载后再设置）
        // const bounds = new window.T.LngLatBounds(
        //   new window.T.LngLat(110.7, 24.7),
        //   new window.T.LngLat(111.0, 25.0)
        // );
        // map.setMaxBounds(bounds);

        // 等待地图加载完成
        await new Promise<void>((resolve) => {
          map.addEventListener('load', () => {
            console.log('地图加载完成');
            resolve();
          });
        });

        // 保存地图实例
        mapRef.current = map;

        // 添加测试多边形
        try {
          const testPoints = [
            new window.T.LngLat(110.82, 24.83),
            new window.T.LngLat(110.83, 24.83),
            new window.T.LngLat(110.83, 24.84),
            new window.T.LngLat(110.82, 24.84)
          ];

          const testPolygon = new window.T.Polygon(testPoints, {
            color: "#00FF00",
            fillColor: "#00FF00",
            fillOpacity: 0.4,
            weight: 2,
            opacity: 1
          });

          map.addOverLay(testPolygon);
          console.log('Added test polygon successfully');
        } catch (error) {
          console.error('Error adding test polygon:', error);
        }
      } catch (error: unknown) {
        console.error('地图初始化失败:', error);
        if (error instanceof Error) {
          console.error('错误堆栈:', error.stack);
        }
      }
    };

    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="h-screen overflow-hidden">
      <Navigation />
      <div 
        id="map-container" 
        className="absolute inset-0 top-16"
        style={{ zIndex: 0 }}
      />
      <Legend />
    </div>
  );
};

export default GuidePage; 