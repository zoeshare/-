'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import dynamic from 'next/dynamic';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import $ from 'jquery';

// 动态导入 SceneryViewer 组件
const SceneryViewer = dynamic(() => import('./SceneryViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center bg-gray-100">
      <div className="text-gray-600">加载中...</div>
    </div>
  ),
});

const AboutGongcheng: React.FC = () => {
  const [activeTab, setActiveTab] = useState('民族');
  const [activeScene, setActiveScene] = useState(0);
  const swiperRef = useRef<any>(null);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
    initialInView: false
  });

  // 标志景点数据
  const landmarks = [
    { id: 1, name: '恭城文庙', image: '/images/about/landmark1.png', description: '文庙即孔庙，又称学宫，是祭祀孔子的祠庙，位于恭城县西山南麓，是广西保存最完整的孔庙，也是中国四大孔庙之一。' },
    { id: 2, name: '茶江武庙', image: '/images/about/landmark2.png', description: '武庙（关帝庙）是纪念三国名将关羽的庙宇，始建于明万历癸卯年（1603年），是广西自治区重点文物保护单位。' },
    { id: 3, name: '周渭祠', image: '/images/about/landmark3.png', description: '周渭祠即周王庙，位于恭城县城东，建于明成化十四年（1478年），是祭祀宋御史周渭的祀庙。' },
    { id: 4, name: '湖南会馆', image: '/images/about/landmark4.png', description: '湖南会馆位于恭城县城的太和街，建于清朝同治十一年（1872年），为当时的三湘同乡会集资所建。' },
    { id: 5, name: '瑶族博物馆', image: '/images/about/landmark5.png', description: '恭城瑶族博物馆以丰富的历史文物、瑶族服饰以及特色物品等实物陈列为主，是全区县级规模较大的综合性博物馆。' },
    { id: 6, name: '红岩生态旅游新村', image: '/images/about/landmark6.png', description: '红岩生态旅游新村拥有溶岩地貌的马头山、较多的百年古柿及一些古建筑、拴马石、牌匾等古遗迹。' },
    { id: 7, name: '北洞源景区', image: '/images/about/landmark7.png', description: '北洞源景区位于平安乡北洞源村，是恭城县新农村建设的典范，拥有石榴花瀑布等特色景点，用地范围8平方公里。' },
    { id: 8, name: '横山瑶寨', image: '/images/about/landmark8.png', description: '集自然景观和田园风光为一体的乡村休闲旅游生态园，景区内有20多家别墅式农家休闲旅馆，和宝塔、古戏台等多处景点。' },
    { id: 9, name: '大岭山万亩桃花园', image: '/images/about/landmark9.png', description: '大岭山桃园是恭城县利用3月桃花绽放的契机，结合实施"富裕生态家园"工程，开展的生态旅游观光项目。' },
  ];

  // 恭城八景数据
  const sceneries = [
    { id: 1, name: '西江渔唱', image: '/images/about/scenery1.png', description: '西江水清澈见底，渔民划着小舟，唱着渔歌，构成一幅生动的渔村图景。' },
    { id: 2, name: '石角鸣钟', image: '/images/about/scenery2.png', description: '石角山上的古钟，声音洪亮，传遍四方，是恭城的标志性景观之一。' },
    { id: 3, name: '雪飞银殿', image: '/images/about/scenery3.png', description: '冬季银装素裹，雪花飘飞，银殿在雪中更显庄严肃穆。' },
    { id: 4, name: '冬岭樵歌', image: '/images/about/scenery4.png', description: '冬日山岭上，樵夫砍柴归来，唱着山歌，回荡在山谷间。' },
    { id: 5, name: '燕岩垂钓', image: '/images/about/scenery5.png', description: '燕岩边的清澈溪水，是垂钓的绝佳去处，钓者与自然和谐相处。' },
    { id: 6, name: '道公礼斗', image: '/images/about/scenery6.png', description: '道教仪式"礼斗"在恭城有着悠久的历史，展示了当地独特的宗教文化。' },
    { id: 7, name: '狮岭晴岚', image: '/images/about/scenery7.png', description: '狮子岭上的晨雾，在阳光照射下形成壮观的云海景象。' },
    { id: 8, name: '二童讲书', image: '/images/about/scenery8.png', description: '古时读书场景的再现，展示恭城深厚的文化底蕴和对教育的重视。' }
  ];

  // 文化特色内容
  const cultureContent = {
    '民族': {
      title: '瑶族文化',
      image: '/images/about/culture1.png',
      content: '恭城是瑶族的重要聚居地，瑶族人口占全县总人口的60%以上。瑶族有着悠久的历史和灿烂的文化，在恭城形成了独特的瑶族文化风貌。瑶族人民勤劳勇敢，善良淳朴，创造了丰富多彩的民族文化。'
    },
    '方言俚语': {
      title: '恭城方言',
      image: '/images/about/culture2.png',
      content: '恭城瑶族自治县境内语言有汉、瑶、壮三大语种。汉语主要有恭城官话、普通话，另有宝庆话、客家话、闽南话。恭城官话属汉藏语系汉语族汉语北方方言西南次方言的一种通行全县，是境内各民族交往的共同语。瑶语大致可分盘瑶语、平地瑶语、过山瑶语和四大民瑶语。'
    },
    '民歌': {
      title: '恭城民歌',
      image: '/images/about/culture3.png',
      content: '恭城瑶族自治县境内民歌主要有八甲歌、九甲歌、陪楼歌、婆王歌、夹板歌、山歌等，以独唱、对唱两种形式为主。其旋律比较淳朴，音调悠扬而略带粗狂、奔放，节奏稍自由。歌词为上、下句结构，七言四句体，五声音阶。'
    },
    '舞蹈': {
      title: '民族舞蹈',
      image: '/images/about/culture4.png',
      content: '恭城瑶族舞蹈形式多样，主要有单人长鼓舞、铳鼓舞、羊角舞等。这些舞蹈多在节日和重要仪式上表演，动作优美，节奏明快，充分展示了瑶族人民热情奔放的性格和对美好生活的向往。'
    },
    '服饰': {
      title: '瑶族服饰',
      image: '/images/about/culture5.png',
      content: '瑶族服装五彩斑斓，绚丽多姿。隋朝，男子着白衫裤，女子着青布衫、斑布裙。宋朝，大多数男子穿花领短衣，领、袖缘以花布或衣领绣花，衣缘镶以红、绿布，下穿青布短裤，妇女穿短衣短裙，衣服绣瑶锦。近代以来，除外出学习、工作者及部分瑶族（平地瑶）服装有变化外，其余变化不大。1949 年 10月 1 日后，恭城瑶族大多保留传统民族服装，男女服装一般用青布或黑布制作，喜用黄色、蓝色、绿色、白色及红色等色点缀，运用绣、挑、织、染等工艺装饰，尤以挑花最为精美别致。20 世纪70、80 年代后，由于经济发展，民族融合加快，大部分瑶族人口已不再自制或着瑶服，改着汉族服饰。至 2005 年，只有西岭乡新合村瑶族仍绣瑶服，购红色、黄色、绿色三色柳绒，配青色、白色形成五色。衣绣领和袖，裤绣脚为主，头巾绣八角花，两头挑花，男女通用，腰巾脚绑皆有图案。出嫁前多绣一两套，以备结婚时穿戴。平时穿时装，走亲访友时穿瑶装。用后晾干封存，少有洗涤。妇女故时要以瑶服装身，否则祖宗"不认亲"。'
    },
    '民居': {
      title: '瑶族民居',
      image: '/images/about/culture6.png',
      content: '恭城民居受湘楚文化影响，建筑风格为湘式。样式以三间式为基础，中为厅堂，两边为卧室。以后增建，于左靠搭披厦，俗称"披沙"。或者平正房高度，左右增建一间，形成五间式。富有者建连座式，在一条中轴线上连建二（三）座，分前厅、（中）后厅。厅间中为天井，左右建耳房相连，此后扩建两旁厢房，又于前厅建照壁，于左（右）开门楼，形成四合院。弟兄分居另建新房，多按左青龙右白虎，前朱雀后玄武的方位顺次建筑，逐渐形成村落。房宅进深，单间一丈（一丈为 3 米），双间丈六尺，各不相同。宽度，中厅为一丈二尺，卧房一丈左右。农村附房较多，如碓磨房、柴草房、粪房、猪栏、牛栏及厕所等各有安置。'
    },
    '饮食': {
      title: '恭城美食',
      image: '/images/about/culture7.png',
      content: '恭城饮食文化丰富多彩，既有瑶族特色，又融合了汉族烹饪技艺。著名的恭城美食有恭城油茶、瑶族五色糯米饭、酸鱼、腌菜等。恭城油茶是当地最具特色的传统食品，营养丰富，风味独特，已成为恭城的一张名片。'
    },
    '特色节庆': {
      title: '传统节庆',
      image: '/images/about/culture8.png',
      content: '恭城传统节庆活动丰富多彩，主要有瑶族盘王节、瑶族歌圩节、瑶族六月六等。盘王节是瑶族最隆重的传统节日，祭祀瑶族始祖盘王;歌圩节是瑶族青年男女交流情感的重要场合;六月六是瑶族传统"洗晴"节日，祈求风调雨顺。'
    },
    '名优特产': {
      title: '恭城特产',
      image: '/images/about/culture9.png',
      content: '恭城自然资源丰富，特产众多。著名的特产有恭城油茶、恭城茶叶、恭城柿饼、恭城百合、恭城中药材等。恭城油茶是国家地理标志保护产品，具有悠久的历史和独特的品质;恭城茶叶香气高雅，滋味醇厚，享有盛誉。'
    }
  };

  // 数读恭城数据
  const statistics = [
    { number: 18, label: '国家级传统村落', suffix: '' },
    { number: 8, label: '自治区级传统村落', suffix: '' },
    { number: 100, label: '古建筑群', suffix: '+' },
    { number: 500, label: '年历史', suffix: '+' },
    { number: 43, label: '瑶族非物质文化遗产代表性传承人', suffix: '' },
    { number: 37, label: '瑶族非物质文化遗产项目', suffix: '' },
  ];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSceneChange = (index: number) => {
    setActiveScene(index);
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setActiveScene(prev => (prev > 0 ? prev - 1 : sceneries.length - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveScene(prev => (prev < sceneries.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 第一页：数读恭城和关于恭城 */}
      <section className="min-h-screen flex items-center justify-center py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* 数读恭城 */}
            <div>
              <h2 className="text-3xl font-bold text-center mb-12 border-b pb-4 border-green-500">数读恭城</h2>
              <div ref={ref} className="grid grid-cols-2 gap-8">
                {statistics.map((stat, index) => (
                  <div key={index} className="bg-green-50 p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
                    <div className="text-4xl font-bold text-green-700 mb-2">
                      {inView && (
                        <CountUp
                          end={stat.number}
                          duration={2.5}
                          separator=","
                          suffix={stat.suffix}
                        />
                      )}
                    </div>
                    <div className="text-gray-700">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 关于恭城 */}
            <div>
              <h2 className="text-3xl font-bold text-center mb-12 border-b pb-4 border-green-500">关于恭城</h2>
              
              {/* 地理位置 */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-green-700">地理位置</h3>
                <p className="text-gray-700 mb-4">
                恭城瑶族自治县隶属于广西壮族自治区桂林市，位于广西东北部，桂林市东南部，东与富川瑶族自治县及湖南江永县交界，南与钟山县、平乐县毗邻，西接阳朔县、灵川县，北临灌阳县，县城距桂林市108公里。
                </p>
              </div>
              
              {/* 恭城由来 */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-green-700">恭城由来</h3>
                <p className="text-gray-700">
                  恭城历史悠久，文化底蕴深厚。早在春秋战国时期，这里就有人类活动。秦统一中国后，这里属桂林郡。汉元鼎六年（公元前111年）设恭城县，至今已有2100多年的历史。恭城县名取"恭顺之民"之意，彰显当地百姓的淳朴和善良。
                </p>
              </div>
              
              {/* 瑶乡故居 */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-green-700">瑶乡故居</h3>
                <p className="text-gray-700">
                  恭城是瑶族文化的重要发祥地之一，瑶族人口占全县总人口的60%以上。这里保存着丰富的瑶族文化遗产，包括传统建筑、民间艺术、民俗节庆等。恭城的古建筑群、传统村落和历史文化街区，都是瑶族文化的重要见证，也是恭城宝贵的历史文化资源。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 第二页：标志景点 */}
      <section className="min-h-screen flex items-center justify-center py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 border-b pb-4 border-green-500">标志景点</h2>
          
          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="mySwiper"
            >
              {landmarks.map((landmark) => (
                <SwiperSlide key={landmark.id} className="pb-12">
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                    <div className="h-64 relative">
                      <div className="w-full h-full bg-gray-200 rounded-t-lg" />
                      {/* 使用 Image 组件 */}
                      <Image
                        src={landmark.image}
                        alt={landmark.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{landmark.name}</h3>
                      <p className="text-gray-600">{landmark.description}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* 第三页：恭城八景 */}
      <section className="min-h-screen flex items-center justify-center py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 border-b pb-4 border-green-500">恭城八景</h2>
          <div className="max-w-6xl mx-auto">
            <SceneryViewer sceneries={sceneries} />
          </div>
        </div>
      </section>

      {/* 第四页：文化特色 */}
      <section className="min-h-screen flex items-center justify-center py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 border-b pb-4 border-green-500">文化特色</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* 左侧标题列表 */}
            <div className="md:col-span-3">
              <div className="flex flex-col">
                {Object.keys(cultureContent).map((key) => (
                  <button
                    key={key}
                    className={`py-4 px-6 text-left ${
                      activeTab === key 
                        ? 'bg-green-600 text-white font-semibold' 
                        : 'bg-gray-100 text-gray-700 hover:bg-green-100'
                    } mb-2 rounded transition-colors`}
                    onClick={() => handleTabChange(key)}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>
            
            {/* 右侧内容 */}
            <div className="md:col-span-9">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <h3 className="text-2xl font-semibold text-center py-4 bg-green-50 text-green-800">
                  {cultureContent[activeTab as keyof typeof cultureContent].title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  <div className="h-64 relative">
                    <div className="w-full h-full bg-gray-200 rounded-lg" />
                    {/* 使用 Image 组件 */}
                    <Image
                      src={cultureContent[activeTab as keyof typeof cultureContent].image}
                      alt={cultureContent[activeTab as keyof typeof cultureContent].title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <p className="text-gray-700">
                      {cultureContent[activeTab as keyof typeof cultureContent].content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutGongcheng; 