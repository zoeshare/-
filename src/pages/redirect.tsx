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
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0,
        backgroundColor: '#fff'
      }}>
        <div style={{
          fontSize: '15px',
          color: '#fff',
          height: '70%',
          lineHeight: 1.8,
          paddingLeft: '20px',
          paddingTop: '20px',
          background: 'url(//gw.alicdn.com/tfs/TB1eSZaNFXXXXb.XXXXXXXXXXXX-750-234.png) center top/contain no-repeat'
        }}>
          <p>点击右上角<img src="//gw.alicdn.com/tfs/TB1xwiUNpXXXXaIXXXXXXXXXXXX-55-55.png" style={{width: '25px', height: '25px', verticalAlign: 'middle', margin: '0 .2em'}} /> <span>Safari打开</span></p>
          <p>可以继续浏览本站哦~</p>
        </div>
        <div style={{
          fontWeight: 'bold',
          margin: '-285px 0px 10px',
          textAlign: 'center',
          fontSize: '20px',
          marginBottom: '125px'
        }}>
          1.防止腾讯屏蔽本站链接<br /><br />
          2.建议用QQ浏览器打开效果最佳<br /><br />
          3.复制链接到浏览器打开
        </div>
        <div style={{
          margin: '0 auto',
          width: '290px',
          textAlign: 'center',
          fontSize: '15px',
          color: '#2466f4',
          background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAcAQMAAACak0ePAAAABlBMVEUAAAAdYfh+GakkAAAAAXRSTlMAQObYZgAAAA5JREFUCNdjwA8acEkAAAy4AIE4hQq/AAAAAElFTkSuQmCC) left center/auto 15px repeat-x'
        }}>
          <span style={{backgroundColor: '#fff', padding: '0 5px'}}>点击复制链接</span>
        </div>
        <a href={url} style={{
          display: 'block',
          width: '214px',
          height: '40px',
          lineHeight: '40px',
          margin: '18px auto 0 auto',
          textAlign: 'center',
          fontSize: '18px',
          color: '#2466f4',
          borderRadius: '20px',
          border: '.5px #2466f4 solid',
          textDecoration: 'none'
        }}>
          在浏览器中打开
        </a>
      </div>
    </>
  );
} 