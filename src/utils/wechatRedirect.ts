// 检测是否在微信浏览器中
export const isWechatBrowser = (): boolean => {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent.toLowerCase();
  return ua.indexOf('micromessenger') !== -1;
};

// 生成微信跳转链接
export const generateWechatRedirectUrl = (url: string): string => {
  // 使用更可靠的跳转服务
  const redirectService = 'https://www.mindjump.cn/api/redirect';
  return `${redirectService}?url=${encodeURIComponent(url)}`;
};

// 处理微信跳转
export const handleWechatRedirect = (): void => {
  if (isWechatBrowser()) {
    const currentUrl = window.location.href;
    const redirectUrl = generateWechatRedirectUrl(currentUrl);
    
    // 添加延迟跳转，确保页面加载完成
    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 100);
  }
};

// 显示提示信息
export const showBrowserTip = (): void => {
  if (isWechatBrowser()) {
    const tipDiv = document.createElement('div');
    tipDiv.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: white;
      text-align: center;
      padding: 20px;
    `;
    
    tipDiv.innerHTML = `
      <div style="font-size: 18px; margin-bottom: 20px;">
        请点击右上角"..."按钮
      </div>
      <div style="font-size: 18px; margin-bottom: 20px;">
        选择"在浏览器中打开"
      </div>
      <div style="font-size: 16px; color: #999;">
        以获得最佳浏览体验
      </div>
    `;
    
    document.body.appendChild(tipDiv);
  }
}; 