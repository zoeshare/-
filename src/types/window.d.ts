declare global {
  interface Window {
    T: {
      Map: any;
      LngLat: any;
      TileLayer: any;
      Polygon: any;
      Control: {
        Zoom: any;
        Scale: any;
        MapType: any;
      };
    }
  }
}

export {}; 