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
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.92)',
        zIndex: 9999,
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* 右上角箭头和提示 */}
        <div style={{
          position: 'absolute',
          top: 18,
          right: 18,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}>
          {/* 箭头SVG */}
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 38L38 10" stroke="#fff" strokeWidth="4" strokeLinecap="round"/>
            <path d="M18 10H38V30" stroke="#fff" strokeWidth="4" strokeLinecap="round"/>
          </svg>
          <div style={{
            marginTop: 8,
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'right',
            lineHeight: 1.4,
            textShadow: '0 2px 8px rgba(0,0,0,0.5)'
          }}>
            请点击右上角…<br />选择"浏览器打开"
          </div>
        </div>
        {/* 中间简洁说明 */}
        <div style={{
          textAlign: 'center',
          marginTop: 60,
        }}>
          <div style={{
            fontSize: 22,
            fontWeight: 'bold',
            marginBottom: 18,
            textShadow: '0 2px 8px rgba(0,0,0,0.5)'
          }}>
            当前页面不支持直接访问
          </div>
          <div style={{
            fontSize: 16,
            color: '#bbb',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)'
          }}>
            请按照右上角提示用浏览器打开本页面
          </div>
        </div>
      </div>
    </>
  );
} 