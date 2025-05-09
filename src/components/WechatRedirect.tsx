import React, { useEffect } from 'react';
import { isWechatBrowser, handleWechatRedirect, showBrowserTip } from '../utils/wechatRedirect';

const WechatRedirect: React.FC = () => {
  useEffect(() => {
    if (isWechatBrowser()) {
      // 先显示提示信息
      showBrowserTip();
      
      // 延迟执行跳转
      const timer = setTimeout(() => {
        handleWechatRedirect();
      }, 2000); // 给用户2秒时间看到提示信息
      
      return () => clearTimeout(timer);
    }
  }, []);

  return null; // 这个组件不需要渲染任何内容
};

export default WechatRedirect; 