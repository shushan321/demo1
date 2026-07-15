import type { Venue, Order, Workout, User, Category, TimeSlot } from '../types';

export const categories: Category[] = [
  { key: 'all', name: '全部' },
  { key: 'basketball', name: '篮球' },
  { key: 'football', name: '足球' },
  { key: 'swimming', name: '游泳' },
  { key: 'badminton', name: '羽毛球' },
  { key: 'tennis', name: '网球' },
  { key: 'table-tennis', name: '乒乓球' },
  { key: 'gym', name: '健身' },
];

export const venues: Venue[] = [
  {
    id: '1',
    name: '活力体育馆',
    category: 'basketball',
    description: '拥有专业木地板场地，配备空调和淋浴设施，是篮球爱好者的理想选择。',
    address: '北京市朝阳区体育路1号',
    phone: '010-12345678',
    rating: 4.8,
    price: 120,
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20basketball%20court%20interior%20with%20wooden%20floor%20professional%20lighting&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=basketball%20court%20with%20hoop%20and%20backboard%20modern%20design&image_size=landscape_16_9',
    ],
    facilities: ['空调', '淋浴', '储物柜', '休息区'],
    distance: 0.5,
  },
  {
    id: '2',
    name: '绿茵足球场',
    category: 'football',
    description: '天然草皮足球场，灯光设施完善，适合业余比赛和训练。',
    address: '北京市海淀区体育场路8号',
    phone: '010-87654321',
    rating: 4.6,
    price: 500,
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20football%20soccer%20field%20with%20green%20grass%20and%20lights&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=outdoor%20soccer%20stadium%20at%20night%20with%20floodlights&image_size=landscape_16_9',
    ],
    facilities: ['灯光', '看台', '更衣室', '停车场'],
    distance: 1.2,
  },
  {
    id: '3',
    name: '蓝鲸游泳馆',
    category: 'swimming',
    description: '50米标准泳池，水质优良，配备专业救生员。',
    address: '北京市西城区游泳馆路12号',
    phone: '010-23456789',
    rating: 4.9,
    price: 80,
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20swimming%20pool%20with%20blue%20water%20and%20lanes&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=indoor%20swimming%20pool%20with%20glass%20ceiling%20natural%20light&image_size=landscape_16_9',
    ],
    facilities: ['恒温', '救生员', '储物柜', '桑拿'],
    distance: 2.0,
  },
  {
    id: '4',
    name: '飞羽羽毛球馆',
    category: 'badminton',
    description: '12片专业场地，塑胶地板，通风良好。',
    address: '北京市东城区羽毛球路5号',
    phone: '010-34567890',
    rating: 4.7,
    price: 60,
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=badminton%20court%20with%20net%20and%20professional%20lighting&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=multiple%20badminton%20courts%20indoor%20sports%20center&image_size=landscape_16_9',
    ],
    facilities: ['空调', '储物柜', '休息区', '饮料售卖'],
    distance: 1.5,
  },
  {
    id: '5',
    name: '阳光网球场',
    category: 'tennis',
    description: '6片室外硬地网球场，配备遮阳设施。',
    address: '北京市朝阳区网球路20号',
    phone: '010-45678901',
    rating: 4.5,
    price: 150,
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=outdoor%20tennis%20court%20with%20blue%20surface%20sunny%20day&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tennis%20courts%20with%20net%20and%20ball%20professional%20setup&image_size=landscape_16_9',
    ],
    facilities: ['灯光', '遮阳棚', '休息椅', '教练服务'],
    distance: 3.0,
  },
  {
    id: '6',
    name: '国球俱乐部',
    category: 'table-tennis',
    description: '20张专业乒乓球台，定期举办赛事活动。',
    address: '北京市海淀区乒乓球路18号',
    phone: '010-56789012',
    rating: 4.4,
    price: 30,
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=table%20tennis%20room%20with%20multiple%20tables%20professional%20setup&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ping%20pong%20table%20with%20balls%20and%20paddles%20sports%20center&image_size=landscape_16_9',
    ],
    facilities: ['空调', '储物柜', '茶水间', '赛事组织'],
    distance: 2.5,
  },
  {
    id: '7',
    name: '巅峰健身中心',
    category: 'gym',
    description: '24小时营业，全套进口器械，专业教练指导。',
    address: '北京市朝阳区健身路16号',
    phone: '010-67890123',
    rating: 4.8,
    price: 100,
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20gym%20interior%20with%20exercise%20equipment%20and%20weights&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fitness%20center%20with%20treadmills%20and%20machines%20professional&image_size=landscape_16_9',
    ],
    facilities: ['24小时', '器械齐全', '私教服务', '操课教室'],
    distance: 1.8,
  },
];

export const generateTimeSlots = (venueId: string, date: string): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 8;
  const endHour = 22;
  
  for (let hour = startHour; hour < endHour; hour++) {
    const startTime = `${hour.toString().padStart(2, '0')}:00`;
    const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`;
    slots.push({
      id: `${venueId}-${date}-${hour}`,
      venueId,
      date,
      startTime,
      endTime,
      price: venues.find(v => v.id === venueId)?.price || 100,
      available: Math.random() > 0.3,
    });
  }
  
  return slots;
};

export const currentUser: User = {
  id: 'user-1',
  name: '运动达人',
  avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sporty%20young%20man%20avatar%20friendly%20smile&image_size=square',
  phone: '138****8888',
  memberLevel: 'VIP',
};

export const mockOrders: Order[] = [
  {
    id: 'order-1',
    userId: 'user-1',
    venueId: '1',
    venueName: '活力体育馆',
    venueImage: venues[0].images[0],
    date: '2026-07-15',
    startTime: '14:00',
    endTime: '15:00',
    totalAmount: 120,
    status: 'paid',
    paymentMethod: 'wechat',
    createdAt: '2026-07-14 10:30:00',
  },
  {
    id: 'order-2',
    userId: 'user-1',
    venueId: '3',
    venueName: '蓝鲸游泳馆',
    venueImage: venues[2].images[0],
    date: '2026-07-16',
    startTime: '10:00',
    endTime: '12:00',
    totalAmount: 160,
    status: 'pending',
    createdAt: '2026-07-14 15:20:00',
  },
  {
    id: 'order-3',
    userId: 'user-1',
    venueId: '4',
    venueName: '飞羽羽毛球馆',
    venueImage: venues[3].images[0],
    date: '2026-07-12',
    startTime: '19:00',
    endTime: '21:00',
    totalAmount: 120,
    status: 'completed',
    paymentMethod: 'alipay',
    createdAt: '2026-07-11 20:00:00',
  },
  {
    id: 'order-4',
    userId: 'user-1',
    venueId: '2',
    venueName: '绿茵足球场',
    venueImage: venues[1].images[0],
    date: '2026-07-10',
    startTime: '16:00',
    endTime: '18:00',
    totalAmount: 1000,
    status: 'completed',
    paymentMethod: 'wechat',
    createdAt: '2026-07-09 14:30:00',
  },
];

export const mockWorkouts: Workout[] = [
  {
    id: 'workout-1',
    userId: 'user-1',
    venueId: '1',
    venueName: '活力体育馆',
    duration: 60,
    date: '2026-07-12',
    sportType: '篮球',
    createdAt: '2026-07-12 21:00:00',
  },
  {
    id: 'workout-2',
    userId: 'user-1',
    venueId: '4',
    venueName: '飞羽羽毛球馆',
    duration: 120,
    date: '2026-07-10',
    sportType: '羽毛球',
    createdAt: '2026-07-10 21:00:00',
  },
  {
    id: 'workout-3',
    userId: 'user-1',
    venueId: '7',
    venueName: '巅峰健身中心',
    duration: 90,
    date: '2026-07-08',
    sportType: '健身',
    createdAt: '2026-07-08 20:30:00',
  },
  {
    id: 'workout-4',
    userId: 'user-1',
    venueId: '3',
    venueName: '蓝鲸游泳馆',
    duration: 60,
    date: '2026-07-05',
    sportType: '游泳',
    createdAt: '2026-07-05 11:00:00',
  },
];

export const getWorkoutStats = () => {
  const totalDuration = mockWorkouts.reduce((sum, w) => sum + w.duration, 0);
  const totalWorkouts = mockWorkouts.length;
  
  const monthlyStats = [
    { month: '1月', duration: 240 },
    { month: '2月', duration: 180 },
    { month: '3月', duration: 360 },
    { month: '4月', duration: 420 },
    { month: '5月', duration: 300 },
    { month: '6月', duration: 480 },
    { month: '7月', duration: totalDuration },
  ];
  
  return { totalDuration, totalWorkouts, monthlyStats };
};
