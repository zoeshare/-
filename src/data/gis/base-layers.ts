import { GISLayer } from '../../types/gis';

export const baseLayers: GISLayer[] = [
  {
    id: 'terrain',
    name: '地形图层',
    type: 'base',
    visible: true,
    style: {
      color: '#a1a1a1',
      fillOpacity: 0.5,
      weight: 1
    }
  },
  {
    id: 'hydrology',
    name: '水系图层',
    type: 'base',
    visible: true,
    style: {
      color: '#4a90e2',
      fillOpacity: 0.6,
      weight: 1
    }
  }
];

export const planningLayers: GISLayer[] = [
  {
    id: 'current-land-use',
    name: '现状用地',
    type: 'planning',
    visible: false,
    style: {
      color: '#82c91e',
      fillOpacity: 0.7,
      weight: 1
    }
  },
  {
    id: 'planning-land-use',
    name: '规划用地',
    type: 'planning',
    visible: false,
    style: {
      color: '#f59f00',
      fillOpacity: 0.7,
      weight: 1
    }
  }
]; 