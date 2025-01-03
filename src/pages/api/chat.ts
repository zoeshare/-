import type { NextApiRequest, NextApiResponse } from 'next';
import { AI_CONFIG } from '@/config/ai.config';
import crypto from 'crypto';

type ResponseData = {
  message: string;
  error?: string;
};

// 生成JWT Token
function generateToken(apiKey: string): string {
  const [id, secret] = apiKey.split('.');
  const payload = {
    api_key: id,
    exp: Math.floor(Date.now() / 1000) + 3600,
    timestamp: Math.floor(Date.now() / 1000),
  };

  const header = {
    alg: 'HS256',
    sign_type: 'SIGN',
  };

  const headerBase64 = Buffer.from(JSON.stringify(header)).toString('base64url');
  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64url');

  const signature = crypto
    .createHmac('sha256', secret)
    .update(`${headerBase64}.${payloadBase64}`)
    .digest('base64url');

  return `${headerBase64}.${payloadBase64}.${signature}`;
}

// 系统预设提示词
const SYSTEM_PROMPT = `你是云裳茶江的AI助手，你需要帮助用户了解茶江镇的规划设计、地理位置、特色亮点等信息。
茶江镇位于恭城瑶族自治县东部，是恭城通往桂林主城区的重要门户节点。
规划范围北至黄家圳村、南至乐湾村、西至西岭河与恭城河交叉口、东至凤凰山、燕岩山山脚，总面积约15.11平方公里。
规划设计以"一江串联、四境共生、多点协同"为主要理念，致力于打造世界级休闲水岸。
主要特色区域包括：同乐之洲娱乐度假区、付家古街历史文化街区、茶江之眼文化休闲街区、燕岩书院研学基地、恭城油茶共享农庄、东门码头水运文化街区等。
请用专业、友好的语气回答用户的问题。`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '只允许 POST 请求', error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    const token = generateToken(AI_CONFIG.ZHIPU_API_KEY);

    const response = await fetch(AI_CONFIG.BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        model: AI_CONFIG.MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        top_p: 0.7,
        max_tokens: 1500,
        stream: false,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || '请求失败');
    }

    const aiResponse = data.choices[0]?.message?.content || '抱歉，我暂时无法回答这个问题。';
    res.status(200).json({ message: aiResponse });
  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({ message: '服务器错误，请稍后再试', error: 'Internal server error' });
  }
} 