import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Redirect() {
  const [url, setUrl] = useState('');

  useEffect(() => {
    // 获取当前页面URL
    const currentUrl = window.location.href;
    setUrl(currentUrl);
  }, []);

  return (
    <>
      <Head>
        <title>使用浏览器打开</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="aplus-touch" content="1" />
      </Head>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff'
      }}>
        {/* 顶部提示 */}
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          textAlign: 'center',
          fontSize: '16px',
          lineHeight: 1.5
        }}>
          <div style={{ marginBottom: '10px' }}>点击右上角</div>
          <div style={{ 
            width: '30px', 
            height: '30px', 
            margin: '0 auto',
            background: 'url(//gw.alicdn.com/tfs/TB1xwiUNpXXXXaIXXXXXXXXXXXX-55-55.png) center/contain no-repeat'
          }} />
          <div style={{ marginTop: '10px' }}>选择浏览器打开</div>
        </div>

        {/* 中间提示 */}
        <div style={{
          textAlign: 'center',
          padding: '0 20px'
        }}>
          <div style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '20px'
          }}>
            请使用浏览器打开
          </div>
          <div style={{
            fontSize: '16px',
            color: '#999',
            marginBottom: '30px'
          }}>
            获得最佳浏览体验
          </div>
        </div>

        {/* 底部按钮 */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          maxWidth: '300px'
        }}>
          <a href={url} style={{
            display: 'block',
            width: '100%',
            height: '44px',
            lineHeight: '44px',
            textAlign: 'center',
            fontSize: '16px',
            color: '#fff',
            backgroundColor: '#2466f4',
            borderRadius: '22px',
            textDecoration: 'none',
            marginBottom: '15px'
          }}>
            在浏览器中打开
          </a>
          <div style={{
            textAlign: 'center',
            fontSize: '14px',
            color: '#999',
            marginTop: '10px'
          }}>
            复制链接到浏览器打开
          </div>
        </div>
      </div>
    </>
  );
} 