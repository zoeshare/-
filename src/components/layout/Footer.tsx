'use client';

import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-green-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">关于茶江</h3>
            <p className="text-green-100 mb-4">
              茶江，位于恭城瑶族自治县，是一个自然风光秀美、人文底蕴深厚的美丽乡村。
              这里山清水秀，茶香四溢，是休闲度假的理想之地。
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-green-100 hover:text-white transition-colors">首页</Link></li>
              <li><Link href="/about" className="text-green-100 hover:text-white transition-colors">走进恭城</Link></li>
              <li><Link href="/fly" className="text-green-100 hover:text-white transition-colors">飞跃茶江</Link></li>
              <li><Link href="/travel" className="text-green-100 hover:text-white transition-colors">旅游攻略</Link></li>
              <li><Link href="/reserve" className="text-green-100 hover:text-white transition-colors">在线预约</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">联系我们</h3>
            <p className="text-green-100 mb-2">地址：广西壮族自治区桂林市恭城瑶族自治县茶江村</p>
            <p className="text-green-100 mb-2">电话：(0773) 8888-8888</p>
            <p className="text-green-100">邮箱：contact@chajiang.com</p>
          </div>
        </div>
        
        <div className="border-t border-green-700 pt-6 text-center text-green-300 text-sm">
          <p>&copy; {currentYear} 云裳茶江 版权所有</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 