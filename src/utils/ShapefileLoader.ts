import type { FeatureCollection, Feature, Geometry, GeoJsonProperties, Polygon } from 'geojson';

interface ArcGISFeature {
  geometry: {
    rings: number[][][];
    spatialReference: {
      wkid: number;
    };
  };
  attributes: any;
}

interface ArcGISJSON {
  features: ArcGISFeature[];
  geometryType: string;
  spatialReference: {
    wkid: number;
  };
}

export class ShapefileLoader {
  static async load(url: string) {
    try {
      console.log('开始加载 GIS 数据:', url);
      
      // 加载 JSON 文件
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('原始数据:', data);
      
      // 检查数据结构
      if (!data) {
        throw new Error('无效的数据格式: 数据为空');
      }

      let geojson: FeatureCollection<Polygon>;
      
      // 尝试检测数据格式
      if (data.type === 'FeatureCollection') {
        // 已经是 GeoJSON 格式
        console.log('检测到 GeoJSON 格式');
        geojson = data as FeatureCollection<Polygon>;
      } else if (Array.isArray(data.features) && data.geometryType) {
        // ArcGIS JSON 格式
        console.log('检测到 ArcGIS JSON 格式');
        geojson = this.convertToGeoJSON(data);
      } else if (Array.isArray(data)) {
        // 简单的坐标数组
        console.log('检测到坐标数组格式');
        geojson = {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [data]
            },
            properties: {}
          }]
        };
      } else {
        throw new Error('不支持的数据格式');
      }
      
      console.log('转换为 GeoJSON 后:', geojson);
      
      // 转换为百度地图坐标系
      // 假设原始数据是北京54坐标系
      const converted = this.convertToBaiduCoords(geojson, 4524);
      console.log('坐标转换结果:', {
        type: converted.type,
        featureCount: converted.features?.length,
        firstFeature: converted.features?.[0]
      });
      
      return converted;
    } catch (error) {
      console.error('加载 GIS 数据失败:', error);
      throw error;
    }
  }

  private static convertToGeoJSON(arcgisJson: ArcGISJSON): FeatureCollection<Polygon> {
    const features: Feature<Polygon>[] = arcgisJson.features.map(feature => {
      if (!feature.geometry || !Array.isArray(feature.geometry.rings)) {
        console.warn('跳过无效的要素:', feature);
        return null;
      }
      return {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: feature.geometry.rings
        },
        properties: feature.attributes || {}
      } as Feature<Polygon>;
    }).filter((feature): feature is Feature<Polygon> => feature !== null);

    return {
      type: 'FeatureCollection',
      features
    };
  }

  private static convertToBaiduCoords(geojson: FeatureCollection<Polygon>, sourceWkid: number): FeatureCollection<Polygon> {
    if (!geojson.features || !Array.isArray(geojson.features)) {
      console.error('无效的 GeoJSON 数据');
      return geojson;
    }

    console.log('开始转换坐标系统，源坐标系统 WKID:', sourceWkid);
    console.log('要素数量:', geojson.features.length);
    
    const convertedFeatures = geojson.features.map((feature: Feature<Polygon>, index: number) => {
      if (!feature || !feature.geometry || !feature.geometry.coordinates) {
        console.warn(`跳过无效的要素 ${index}`);
        return null;
      }

      try {
        console.log(`处理要素 ${index}:`, {
          类型: feature.geometry.type,
          环数量: feature.geometry.coordinates.length,
          第一个环点数: feature.geometry.coordinates[0]?.length
        });

        const convertedGeometry: Polygon = {
          type: 'Polygon',
          coordinates: feature.geometry.coordinates.map((ring: number[][], ringIndex: number) => {
            if (!Array.isArray(ring)) {
              console.warn(`跳过无效的环 ${index}-${ringIndex}`);
              return [];
            }

            console.log(`处理环 ${ringIndex}:`, {
              原始点数: ring.length,
              第一个点: ring[0],
              最后一个点: ring[ring.length - 1]
            });

            const convertedRing = ring.map((coord: number[], pointIndex: number) => {
              if (!Array.isArray(coord) || coord.length < 2) {
                console.warn(`跳过无效的坐标点 ${index}-${ringIndex}-${pointIndex}`);
                return [0, 0];
              }

              const result = this.projectToBaidu(coord[0], coord[1], sourceWkid);
              console.log(`坐标点 ${pointIndex}:`, {
                原始: coord,
                转换后: result
              });
              return result;
            });

            console.log(`环 ${ringIndex} 转换完成:`, {
              转换后点数: convertedRing.length,
              第一个转换点: convertedRing[0],
              最后一个转换点: convertedRing[convertedRing.length - 1]
            });

            return convertedRing;
          })
        };

        return {
          type: 'Feature',
          geometry: convertedGeometry,
          properties: feature.properties
        } as Feature<Polygon>;
      } catch (error) {
        console.error(`转换要素 ${index} 时出错:`, error);
        return null;
      }
    }).filter((feature): feature is Feature<Polygon> => feature !== null);

    console.log('坐标系统转换完成，转换后要素数量:', convertedFeatures.length);
    return {
      type: 'FeatureCollection',
      features: convertedFeatures
    };
  }

  private static projectToBaidu(x: number, y: number, sourceWkid: number): [number, number] {
    if (typeof x !== 'number' || typeof y !== 'number') {
      console.warn('无效的坐标值:', { x, y });
      return [0, 0];
    }

    // 处理北京54坐标系 (WKID: 4524)
    if (x > 36000000) {  // 北京54坐标系的特征
      // 使用简化的转换方法
      const refX = 36785000;  // 参考点X坐标
      const refY = 2748500;   // 参考点Y坐标
      
      // 计算相对于参考点的偏移（米）
      const deltaX = x - refX;
      const deltaY = y - refY;

      // 使用简单的线性转换
      // 在该纬度下的比例尺
      const meterPerDegreeLng = 102834.74;  // 每经度对应的米数
      const meterPerDegreeLat = 111132.92;  // 每纬度对应的米数

      // 转换为经纬度增量
      const deltaLng = deltaX / meterPerDegreeLng;
      const deltaLat = deltaY / meterPerDegreeLat;

      // 加上参考点的经纬度
      const lng = 110.8279 + deltaLng;  // 参考点经度
      const lat = 24.8333 + deltaLat;   // 参考点纬度

      console.log('坐标转换:', {
        原始坐标: [x, y],
        参考点: [refX, refY],
        偏移量: [deltaX, deltaY],
        经纬度增量: [deltaLng, deltaLat],
        转换后: [lng, lat]
      });

      return [lng, lat];
    } else if (x > 100 && x < 120 && y > 20 && y < 30) {
      // 已经是经纬度坐标，且在合理范围内
      return [x, y];
    } else {
      console.warn('坐标超出合理范围:', { x, y });
      return [110.8279, 24.8333]; // 返回茶江中心点
    }
  }

  private static convertCoordinate(coord: number[]): [number, number] | null {
    if (!Array.isArray(coord) || coord.length < 2) {
      console.warn('无效的坐标数组:', coord);
      return null;
    }

    // 确保坐标值是数字
    if (typeof coord[0] !== 'number' || typeof coord[1] !== 'number') {
      console.warn('坐标值不是数字:', coord);
      return null;
    }

    // 投影转换
    return this.projectToBaidu(coord[0], coord[1], 4524);
  }
} 