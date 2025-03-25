import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const AIAssistant = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ type: 'user' | 'ai'; content: string }[]>([
    { type: 'ai', content: '我是云裳茶江的AI助手，请问有什么可以帮您？' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '请求失败');
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages(prev => [...prev, { type: 'ai', content: data.response }]);
    } catch (error) {
      console.error('AI 助手错误:', error);
      setMessages(prev => [...prev, { type: 'ai', content: '抱歉，我遇到了一些问题。请稍后再试。' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed right-0 bottom-24 z-[9999]">
      {/* AI图标 */}
      <motion.div
        className="relative"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.div
          initial={{ x: 100 }}
          animate={{ x: isHovered ? 0 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="flex items-center bg-white shadow-lg rounded-l-full cursor-pointer hover:shadow-xl"
          onClick={() => setIsOpen(true)}
        >
          <div className="p-3">
            <div className="w-10 h-10 relative">
              <Image
                src="/images/common/AI.png"
                alt="AI助手"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </div>
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: isHovered ? 1 : 0, width: isHovered ? 'auto' : 0 }}
            transition={{ duration: 0.2 }}
            className="pr-4 text-gray-700 whitespace-nowrap font-medium overflow-hidden"
          >
            AI助手
          </motion.span>
        </motion.div>
      </motion.div>

      {/* 聊天窗口 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-8 w-96 bg-white rounded-lg shadow-xl overflow-hidden"
          >
            {/* 聊天窗口头部 */}
            <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
              <h3 className="font-bold">AI助手</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* 聊天内容区域 */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 p-3 rounded-lg rounded-bl-none">
                    正在思考...
                  </div>
                </div>
              )}
            </div>

            {/* 输入区域 */}
            <form onSubmit={handleSubmit} className="border-t p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="请输入您的问题..."
                  className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                  disabled={isLoading}
                >
                  发送
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIAssistant; 