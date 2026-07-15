import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Smartphone, CheckCircle2 } from 'lucide-react';
import { venues, generateTimeSlots, currentUser } from '../data/mockData';
import { useAppStore } from '../store';
import type { Order } from '../types';

export default function Payment() {
  const navigate = useNavigate();
  const booking = useAppStore((state) => state.booking);
  const addOrder = useAppStore((state) => state.addOrder);
  
  const [paymentMethod, setPaymentMethod] = useState<'wechat' | 'alipay'>('wechat');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const venue = booking.venueId ? venues.find((v) => v.id === booking.venueId) : null;
  const timeSlots = booking.venueId && booking.date ? generateTimeSlots(booking.venueId, booking.date) : [];
  const slot = booking.slotId ? timeSlots.find((s) => s.id === booking.slotId) : null;

  if (!venue || !slot) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">订单信息无效</p>
      </div>
    );
  }

  const handlePayment = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      const newOrder: Order = {
        id: `order-${Date.now()}`,
        userId: currentUser.id,
        venueId: venue.id,
        venueName: venue.name,
        venueImage: venue.images[0],
        date: booking.date,
        startTime: slot.startTime,
        endTime: slot.endTime,
        totalAmount: slot.price,
        status: 'paid',
        paymentMethod,
        createdAt: new Date().toISOString(),
      };
      
      addOrder(newOrder);
    }, 2000);
  };

  const handleContinue = () => {
    navigate('/orders');
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-8 text-center max-w-sm w-full animate-slide-up">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">支付成功</h2>
          <p className="text-gray-500 mb-6">您的订单已确认，期待您的光临</p>
          
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500">订单号</span>
              <span className="text-gray-800 font-medium">ORD{Date.now()}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500">场馆</span>
              <span className="text-gray-800 font-medium">{venue.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">时间</span>
              <span className="text-gray-800 font-medium">
                {booking.date} {slot.startTime}-{slot.endTime}
              </span>
            </div>
          </div>
          
          <button onClick={handleContinue} className="btn-primary w-full">
            查看订单
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white border-b border-gray-100 pt-10 pb-4 px-4">
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-all duration-200"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-gray-800 ml-4">确认订单</h1>
        </div>
      </header>

      <div className="px-4 py-4">
        <div className="card p-4 mb-4">
          <div className="flex gap-4">
            <img
              src={venue.images[0]}
              alt={venue.name}
              className="w-24 h-24 rounded-xl object-cover"
            />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-gray-800 mb-1">{venue.name}</h3>
                <p className="text-sm text-gray-500">{venue.address}</p>
              </div>
              <div className="text-primary-500 font-bold">¥{slot.price}/小时</div>
            </div>
          </div>
          
          <div className="border-t border-gray-100 mt-4 pt-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">预订日期</span>
              <span className="text-gray-800 font-medium">{booking.date}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">预订时段</span>
              <span className="text-gray-800 font-medium">{slot.startTime} - {slot.endTime}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">时长</span>
              <span className="text-gray-800 font-medium">1小时</span>
            </div>
          </div>
        </div>

        <div className="card p-4 mb-4">
          <h3 className="font-bold text-gray-800 mb-4">支付方式</h3>
          
          <div className="space-y-3">
            <button
              onClick={() => setPaymentMethod('wechat')}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 ${
                paymentMethod === 'wechat'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                paymentMethod === 'wechat' ? 'bg-green-500' : 'bg-gray-100'
              }`}>
                <Smartphone className={`w-6 h-6 ${
                  paymentMethod === 'wechat' ? 'text-white' : 'text-gray-600'
                }`} />
              </div>
              <div className="flex-1 text-left">
                <div className="font-bold text-gray-800">微信支付</div>
                <div className="text-sm text-gray-500">推荐使用</div>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === 'wechat'
                  ? 'border-green-500 bg-green-500'
                  : 'border-gray-300'
              }`}>
                {paymentMethod === 'wechat' && (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                )}
              </div>
            </button>

            <button
              onClick={() => setPaymentMethod('alipay')}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 ${
                paymentMethod === 'alipay'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                paymentMethod === 'alipay' ? 'bg-blue-500' : 'bg-gray-100'
              }`}>
                <CreditCard className={`w-6 h-6 ${
                  paymentMethod === 'alipay' ? 'text-white' : 'text-gray-600'
                }`} />
              </div>
              <div className="flex-1 text-left">
                <div className="font-bold text-gray-800">支付宝</div>
                <div className="text-sm text-gray-500">支持花呗</div>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === 'alipay'
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300'
              }`}>
                {paymentMethod === 'alipay' && (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                )}
              </div>
            </button>
          </div>
        </div>

        <div className="card p-4">
          <h3 className="font-bold text-gray-800 mb-4">订单明细</h3>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">场馆费用</span>
              <span className="text-gray-800">¥{slot.price}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">服务费</span>
              <span className="text-gray-800">¥0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">优惠</span>
              <span className="text-green-500">-¥0</span>
            </div>
          </div>
          
          <div className="border-t border-gray-100 mt-4 pt-4 flex items-center justify-between">
            <span className="font-bold text-gray-800">应付金额</span>
            <span className="text-2xl font-bold text-primary-500">¥{slot.price}</span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-gray-500">合计:</span>
            <span className="text-2xl font-bold text-primary-500 ml-2">¥{slot.price}</span>
          </div>
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className={`px-10 py-3 rounded-xl font-bold text-white transition-all duration-300 ${
              isProcessing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-primary-500 to-primary-600 shadow-lg shadow-primary-200 hover:shadow-xl active:scale-95'
            }`}
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                支付中...
              </span>
            ) : (
              '立即支付'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
