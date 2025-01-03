import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';
import { Collection } from 'ol';
import BaseLayer from 'ol/layer/Base';
import 'ol/ol.css';

const TIANDITU_KEY = '6fa31cea60680375feb4a8637a07cd88';

interface Layer {
  id: string;
  name: string;
  visible: boolean;
  type: 'base' | 'overlay';
  url?: string;
  file?: File;
}

interface MapViewProps {
  layers: Layer[];
  onLayerChange: (layerId: string, visible: boolean) => void;
  onFileUpload: (file: File) => void;
}

const MapView: React.FC<MapViewProps> = ({ layers, onLayerChange, onFileUpload }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // 初始化地图
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: `https://t{0-7}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${TIANDITU_KEY}`,
            maxZoom: 18
          }),
          visible: layers.find(l => l.id === 'tianditu-vec')?.visible
        }),
        new TileLayer({
          source: new XYZ({
            url: `https://t{0-7}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${TIANDITU_KEY}`,
            maxZoom: 18
          }),
          visible: layers.find(l => l.id === 'tianditu-img')?.visible
        }),
        // 添加标注图层
        new TileLayer({
          source: new XYZ({
            url: `https://t{0-7}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${TIANDITU_KEY}`,
            maxZoom: 18
          }),
          visible: layers.find(l => l.id === 'tianditu-vec')?.visible
        }),
        new TileLayer({
          source: new XYZ({
            url: `https://t{0-7}.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${TIANDITU_KEY}`,
            maxZoom: 18
          }),
          visible: layers.find(l => l.id === 'tianditu-img')?.visible
        })
      ],
      view: new View({
        center: fromLonLat([110.83176, 24.83126]), // 恭城县城位置
        zoom: 12
      })
    });

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // 监听图层可见性变化
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const map = mapInstanceRef.current;
    const layerCollection = map.getLayers() as Collection<BaseLayer>;
    layerCollection.forEach((layer: BaseLayer, index: number) => {
      if (index < 4) { // 基础图层（包括标注）
        const isVec = index === 0 || index === 2;
        const layerId = isVec ? 'tianditu-vec' : 'tianditu-img';
        const visible = layers.find(l => l.id === layerId)?.visible || false;
        layer.setVisible(visible);
      }
    });
  }, [layers]);

  return (
    <div ref={mapRef} className="w-full h-full" />
  );
};

export default MapView;