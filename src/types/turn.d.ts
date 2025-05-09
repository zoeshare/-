

declare module 'turn.js' {
  interface TurnOptions {
    // 基本尺寸和位置选项
    width?: number;
    height?: number;
    autoCenter?: boolean;
    
    // 动画选项
    acceleration?: boolean;
    gradients?: boolean;
    elevation?: number;
    duration?: number;
    
    // 内容选项
    pages?: number;
    display?: 'single' | 'double';
    direction?: 'ltr' | 'rtl';
    
    // 事件回调
    when?: {
      turning?: (event: any, page: number, view: any) => void;
      turned?: (event: any, page: number, view: any) => void;
      start?: (event: any, pageObject: any, corner: any) => void;
      end?: (event: any, pageObject: any, turned: boolean) => void;
    };
  }

  interface JQuery {
    turn(options?: TurnOptions): JQuery;
    turn(command: string, value?: any): JQuery;
  }
}

declare module 'turn.js/turn.css' {
  const content: any;
  export default content;
} 