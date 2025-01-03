declare namespace T {
  class Map {
    constructor(container: HTMLElement, options?: any);
    centerAndZoom(center: LngLat, zoom: number): void;
    addLayer(layer: any): void;
    addControl(control: any): void;
    destroy(): void;
  }

  class LngLat {
    constructor(lng: number, lat: number);
  }

  class TileLayer {
    constructor(options: TileLayerOptions);
  }

  class TileLayerOptions {
    constructor(options: {
      url: string;
      tileSize: number;
      minZoom: number;
      maxZoom: number;
    });
  }

  namespace Control {
    class Zoom {
      constructor();
    }
    class Scale {
      constructor();
    }
    class MapType {
      constructor();
    }
  }
}

interface Window {
  T: typeof T;
}

export {}; 