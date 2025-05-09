import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isWechatBrowser } from '../utils/wechatRedirect';

export default function WechatRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (isWechatBrowser()) {
      // 在微信浏览器中，重定向到跳转页面
      router.push('/redirect');
    }
  }, [router]);

  return null;
} 