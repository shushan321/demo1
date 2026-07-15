import { useState } from 'react';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';

type OrderStatus = 'all' | 'pending' | 'paid' | 'completed' | 'cancelled';

export default function Orders() {
  const navigate = useNavigate();
  const orders = useAppStore((state) => state.orders);
  const cancelOrder = useAppStore((state) => state.cancelOrder);
  
  const [activeTab, setActiveTab] = useState<OrderStatus>('all');

  const tabs: { key: OrderStatus; label: string }[] = [
    { key: 'all', label: '全部' },
    { key: 'pending', label: '待支付' },
    { key: 'paid', label: '待使用' },
    { key: 'completed', label: '已完成' },
    { key: 'cancelled', label: '已取消' },
  ];

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter((order) => order.status === activeTab);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return { text: '待支付', className: 'badge-warning' };
      case 'paid':
        return { text: '待使用', className: 'badge-info' };
      case 'completed':
        return { text: '已完成', className: 'badge-success' };
      case 'cancelled':
        return { text: '已取消', className: 'badge-danger' };
      default:
        return { text: status, className: 'badge-info' };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white border-b border-gray-100 pt-10 pb-4 px-4">
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-all duration-200"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-gray-800 ml-4">我的订单</h1>
        </div>
      </header>

      <div className="bg-white border-b border-gray-100">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-shrink-0 px-6 py-4 text-sm font-medium transition-all duration-200 relative ${
                activeTab === tab.key
                  ? 'text-primary-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="3" x2="16" y2="7" />
                <line x1="8" y1="3" x2="8" y2="7" />
                <line x1="3" y1="16" x2="21" y2="16" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">暂无订单</p>
            <p className="text-gray-400 text-sm mt-2">快去预订场馆吧</p>
            <button onClick={() => navigate('/')} className="mt-4 btn-secondary">
              去预订
            </button>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className="card p-4 animate-slide-up">
              <div className="flex gap-4">
                <img
                  src={order.venueImage}
                  alt={order.venueName}
                  className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-gray-800">{order.venueName}</h3>
                      <span className={`badge ${getStatusBadge(order.status).className}`}>
                        {getStatusBadge(order.status).text}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {order.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {order.startTime}-{order.endTime}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-gray-500">
                      订单号: <span className="text-xs">{order.id.slice(-8)}</span>
                    </div>
                    <div className="font-bold text-primary-500">¥{order.totalAmount}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                {order.status === 'pending' && (
                  <>
                    <button className="btn-outline">
                      取消订单
                    </button>
                    <button className="btn-primary">
                      立即支付
                    </button>
                  </>
                )}
                {order.status === 'paid' && (
                  <>
                    <button
                      onClick={() => cancelOrder(order.id)}
                      className="btn-outline"
                    >
                      取消预约
                    </button>
                    <button className="btn-primary">
                      立即使用
                    </button>
                  </>
                )}
                {order.status === 'completed' && (
                  <button className="btn-outline">
                    评价
                  </button>
                )}
                {order.status === 'cancelled' && (
                  <button onClick={() => navigate('/')} className="btn-outline">
                    重新预订
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
