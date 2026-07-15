import { useNavigate } from 'react-router-dom';
import { ChevronRight, Clock, MapPin, Award, Settings, HelpCircle, Wallet, Heart, Gift } from 'lucide-react';
import { currentUser } from '../data/mockData';
import { useAppStore } from '../store';

export default function Profile() {
  const navigate = useNavigate();
  const workoutStats = useAppStore((state) => state.workoutStats);
  const orders = useAppStore((state) => state.orders);

  const completedOrders = orders.filter((o) => o.status === 'completed').length;

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}小时${mins}分钟`;
    }
    return `${mins}分钟`;
  };

  const menuItems = [
    { icon: Wallet, label: '我的钱包', value: '¥0.00' },
    { icon: Gift, label: '优惠券', value: '3张可用' },
    { icon: Heart, label: '我的收藏', value: '' },
    { icon: Settings, label: '设置', value: '' },
    { icon: HelpCircle, label: '帮助中心', value: '' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-br from-primary-500 via-primary-400 to-sport-500 pt-16 pb-12 px-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-white/30"
            />
            {currentUser.memberLevel && (
              <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full text-white">
                {currentUser.memberLevel}
              </div>
            )}
          </div>
          <div className="text-white">
            <h2 className="text-xl font-bold mb-1">{currentUser.name}</h2>
            <p className="text-white/70 text-sm">{currentUser.phone}</p>
            <button className="mt-2 bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full hover:bg-white/30 transition-all duration-200">
              编辑资料
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-6">
        <div className="card p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center flex-1">
              <div className="relative w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-2">
                <Clock className="w-8 h-8 text-primary-500" />
                <svg className="absolute w-16 h-16 transform -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="#FEF3C7"
                    strokeWidth="4"
                    fill="none"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="#FF6B35"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${(workoutStats.totalDuration / 4200) * 176} 176`}
                  />
                </svg>
              </div>
              <span className="text-lg font-bold text-gray-800">{formatDuration(workoutStats.totalDuration)}</span>
              <span className="text-xs text-gray-500">累计运动</span>
            </div>
            <div className="w-px h-12 bg-gray-100" />
            <div className="flex flex-col items-center flex-1">
              <div className="w-14 h-14 rounded-full bg-sport-100 flex items-center justify-center mb-2">
                <MapPin className="w-7 h-7 text-sport-500" />
              </div>
              <span className="text-lg font-bold text-gray-800">{completedOrders}</span>
              <span className="text-xs text-gray-500">完成订单</span>
            </div>
            <div className="w-px h-12 bg-gray-100" />
            <div className="flex flex-col items-center flex-1">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-2">
                <Award className="w-7 h-7 text-green-500" />
              </div>
              <span className="text-lg font-bold text-gray-800">5</span>
              <span className="text-xs text-gray-500">获得徽章</span>
            </div>
          </div>
        </div>

        <div className="card p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">快捷入口</h3>
            <button onClick={() => navigate('/orders')} className="text-sm text-primary-500">
              全部订单
              <ChevronRight className="w-4 h-4 inline" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <button onClick={() => navigate('/orders')} className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="3" x2="16" y2="7" />
                  <line x1="8" y1="3" x2="8" y2="7" />
                  <line x1="3" y1="16" x2="21" y2="16" />
                </svg>
              </div>
              <span className="text-xs text-gray-600">全部订单</span>
            </button>
            <button onClick={() => navigate('/orders')} className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <span className="text-xs text-gray-600">待使用</span>
            </button>
            <button onClick={() => navigate('/orders')} className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <span className="text-xs text-gray-600">已完成</span>
            </button>
            <button onClick={() => navigate('/timer')} className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-500" />
              </div>
              <span className="text-xs text-gray-600">运动计时</span>
            </button>
          </div>
        </div>

        <div className="card overflow-hidden">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                if (item.label === '我的收藏') navigate('/');
              }}
              className="w-full flex items-center gap-4 px-4 py-4 hover:bg-gray-50 transition-all duration-200 border-b border-gray-50 last:border-b-0"
            >
              <item.icon className="w-5 h-5 text-gray-600" />
              <span className="flex-1 text-left text-gray-700">{item.label}</span>
              {item.value && <span className="text-gray-500 text-sm">{item.value}</span>}
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
