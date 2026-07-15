import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star, MapPin, Clock } from 'lucide-react';
import { venues, categories } from '../data/mockData';
import type { Venue } from '../types';

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredVenues = venues.filter((venue: Venue) => {
    const matchesCategory = selectedCategory === 'all' || venue.category === selectedCategory;
    const matchesSearch = venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         venue.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryName = (category: string) => {
    return categories.find(c => c.key === category)?.name || category;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-gradient-to-r from-primary-500 via-primary-400 to-sport-500 text-white pt-12 pb-6 px-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4">运动场馆预约</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索场馆名称或地址..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/90 backdrop-blur-sm text-gray-700 placeholder-gray-400 pl-10 pr-4 py-3 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
            />
          </div>
        </div>
      </header>

      <div className="px-4 py-4">
        <div className="flex overflow-x-auto gap-3 pb-2 -mx-4 px-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.key
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-200'
                  : 'bg-white text-gray-600 shadow-sm hover:bg-gray-50'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 space-y-4">
        {filteredVenues.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg">未找到相关场馆</p>
            <p className="text-gray-400 text-sm mt-2">试试其他搜索条件吧</p>
          </div>
        ) : (
          filteredVenues.map((venue, index) => (
            <div
              key={venue.id}
              onClick={() => navigate(`/venue/${venue.id}`)}
              className="card p-4 cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex gap-4">
                <div className="w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 relative">
                  <img
                    src={venue.images[0]}
                    alt={venue.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-lg">
                    {getCategoryName(venue.category)}
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">{venue.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium text-gray-700">{venue.rating}</span>
                      <span className="text-xs text-gray-400">|</span>
                      <span className="text-xs text-gray-500">{venue.price}元/小时</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="truncate">{venue.address}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-primary-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{venue.distance}km</span>
                    </div>
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {venue.facilities.slice(0, 3).map((facility, i) => (
                      <span
                        key={i}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md"
                      >
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
