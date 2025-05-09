import React from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Navigation from '@/components/Navigation';
import MusicPlayer from '@/components/MusicPlayer';
import AIAssistant from '@/components/common/AIAssistant';
import WechatRedirect from '../components/WechatRedirect';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>云裳茶江 - 恭城瑶乡数字展示</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WechatRedirect />
      <div className="min-h-screen bg-white">
        <Navigation />
        <main>{<Component {...pageProps} />}</main>
        <MusicPlayer />
        <AIAssistant />
      </div>
    </>
  );
} 