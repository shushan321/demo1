import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Phone, ChevronRight, Calendar, Clock } from 'lucide-react';
import { venues, categories, generateTimeSlots } from '../data/mockData';
import { useAppStore } from '../store';
import type { TimeSlot } from '../types';

export default function VenueDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const setBooking = useAppStore((state) => state.setBooking);
  
  const venue = venues.find((v) => v.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    if (id) {
      const today = new Date();
      const dateStr = today.toISOString().split('T')[0];
      setSelectedDate(dateStr);
      setTimeSlots(generateTimeSlots(id, dateStr));
    }
  }, [id]);

  useEffect(() => {
    if (id && selectedDate) {
      setTimeSlots(generateTimeSlots(id, selectedDate));
      setSelectedSlot(null);
    }
  }, [selectedDate, id]);

  if (!venue) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">场馆不存在</p>
      </div>
    );
  }

  const getCategoryName = (category: string) => {
    return categories.find((c) => c.key === category)?.name || category;
  };

  const generateDates = () => {
    const dates: string[] = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const today = new Date();
    if (dateStr === today.toISOString().split('T')[0]) {
      return '今天';
    }
    return weekDays[date.getDay()];
  };

  const handleBook = () => {
    if (!selectedSlot) return;
    
    setBooking({
      venueId: id || null,
      date: selectedDate,
      slotId: selectedSlot,
    });
    
    navigate('/payment');
  };

  const selectedSlotData = timeSlots.find((s) => s.id === selectedSlot);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 z-10 pt-10 px-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-all duration-200"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>
        
        <div className="relative h-64 overflow-hidden">
          <img
            src={venue.images[currentImageIndex]}
            alt={venue.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <div className="text-white">
              <span className="bg-primary-500 text-xs px-2 py-1 rounded-md mb-2 inline-block">
                {getCategoryName(venue.category)}
              </span>
              <h1 className="text-2xl font-bold">{venue.name}</h1>
            </div>
            <div className="flex gap-1">
              {venue.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-t-3xl -mt-6 relative z-10 px-4 py-6">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          <span className="text-xl font-bold text-gray-800">{venue.rating}</span>
          <span className="text-gray-500">|</span>
          <span className="text-gray-500">已接待 1,234 人</span>
        </div>

        <p className="text-gray-600 mb-6 leading-relaxed">{venue.description}</p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-primary-500" />
            <span className="text-gray-700">{venue.address}</span>
            <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-primary-500" />
            <span className="text-gray-700">{venue.phone}</span>
            <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h2 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary-500" />
            选择日期
          </h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {generateDates().map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`flex-shrink-0 flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-all duration-300 ${
                  selectedDate === date
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span className="text-xs">{formatDate(date)}</span>
                <span className="font-bold">{new Date(date).getDate()}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h2 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary-500" />
            选择时段
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => slot.available && setSelectedSlot(slot.id)}
                disabled={!slot.available}
                className={`py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  !slot.available
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : selectedSlot === slot.id
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-200'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-primary-300 hover:bg-primary-50'
                }`}
              >
                <div>{slot.startTime}</div>
                <div className="text-xs opacity-70">{slot.endTime}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500">已选时段</div>
            <div className="text-gray-800 font-medium">
              {selectedSlotData
                ? `${selectedDate} ${selectedSlotData.startTime}-${selectedSlotData.endTime}`
                : '请选择时段'}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs text-gray-500">合计</span>
              <div className="text-xl font-bold text-primary-500">
                ¥{selectedSlotData ? selectedSlotData.price : 0}
              </div>
            </div>
            <button
              onClick={handleBook}
              disabled={!selectedSlot}
              className={`px-8 py-3 rounded-xl font-bold text-white transition-all duration-300 ${
                selectedSlot
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 shadow-lg shadow-primary-200 hover:shadow-xl active:scale-95'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              立即预订
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
