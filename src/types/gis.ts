import { Feature, FeatureCollection, Geometry } from 'geojson';

export interface GISLayer {
  id: string;
  name: string;
  type: 'base' | 'planning';
  visible: boolean;
  style: {
    color: string;
    fillOpacity: number;
    weight: number;
  };
  data?: FeatureCollection;
}

export interface GISFeature extends Feature {
  properties: {
    DLMC: string;
    [key: string]: any;
  };
  geometry: Geometry;
}

export interface GISData extends FeatureCollection {
  features: GISFeature[];
} 