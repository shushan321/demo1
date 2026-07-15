import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, Pause, Square, Clock, Calendar, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { venues, currentUser } from '../data/mockData';
import { useAppStore } from '../store';
import type { Workout } from '../types';

const sportTypes = ['篮球', '足球', '游泳', '羽毛球', '网球', '乒乓球', '健身', '跑步'];

export default function Timer() {
  const navigate = useNavigate();
  const addWorkout = useAppStore((state) => state.addWorkout);
  const workouts = useAppStore((state) => state.workouts);
  
  const [duration, setDuration] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedSport, setSelectedSport] = useState('篮球');
  const [selectedVenue, setSelectedVenue] = useState('');
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setDuration(0);
  };

  const saveWorkout = () => {
    if (duration < 60) {
      alert('运动时长至少需要1分钟');
      return;
    }

    const workout: Workout = {
      id: `workout-${Date.now()}`,
      userId: currentUser.id,
      venueId: selectedVenue || '1',
      venueName: selectedVenue 
        ? venues.find((v) => v.id === selectedVenue)?.name || '未知场馆'
        : '户外/其他',
      duration: Math.floor(duration / 60),
      date: new Date().toISOString().split('T')[0],
      sportType: selectedSport,
      createdAt: new Date().toISOString(),
    };

    addWorkout(workout);
    stopTimer();
    alert('运动记录已保存！');
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}小时${mins}分`;
    }
    return `${mins}分钟`;
  };

  const circleProgress = (seconds: number) => {
    const total = 3600;
    const progress = Math.min(seconds / total, 1);
    const circumference = 2 * Math.PI * 120;
    const offset = circumference - progress * circumference;
    return {
      circumference,
      offset,
    };
  };

  const { circumference, offset } = circleProgress(duration);

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
          <h1 className="text-xl font-bold text-gray-800 ml-4">运动计时</h1>
        </div>
      </header>

      <div className="px-4 py-6">
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl p-8 text-white mb-6">
          <div className="flex flex-col items-center">
            <div className="relative w-64 h-64 mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke="white"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-5xl font-bold tracking-wider">{formatTime(duration)}</div>
                <div className="text-white/70 mt-2">本次运动时长</div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={toggleTimer}
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
              >
                {isRunning ? (
                  <Pause className="w-8 h-8 text-primary-500" />
                ) : (
                  <Play className="w-8 h-8 text-primary-500 ml-1" />
                )}
              </button>
              <button
                onClick={stopTimer}
                className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
              >
                <Square className="w-6 h-6 text-white" />
              </button>
              {isRunning && (
                <button
                  onClick={saveWorkout}
                  className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
                >
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="card p-4 mb-4">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary-500" />
            运动类型
          </h3>
          <div className="flex flex-wrap gap-2">
            {sportTypes.map((sport) => (
              <button
                key={sport}
                onClick={() => setSelectedSport(sport)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedSport === sport
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {sport}
              </button>
            ))}
          </div>
        </div>

        <div className="card p-4 mb-4">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary-500" />
            选择场馆（可选）
          </h3>
          <select
            value={selectedVenue}
            onChange={(e) => setSelectedVenue(e.target.value)}
            className="input-field"
          >
            <option value="">户外/其他</option>
            {venues.map((venue) => (
              <option key={venue.id} value={venue.id}>
                {venue.name}
              </option>
            ))}
          </select>
        </div>

        <div className="card p-4">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary-500" />
            最近运动记录
          </h3>
          {workouts.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">暂无运动记录</p>
              <p className="text-gray-400 text-sm">开始您的第一次运动吧</p>
            </div>
          ) : (
            <div className="space-y-3">
              {workouts.slice(0, 5).map((workout) => (
                <div
                  key={workout.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <Zap className="w-5 h-5 text-primary-500" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{workout.sportType}</div>
                      <div className="text-xs text-gray-500">
                        {workout.venueName} · {workout.date}
                      </div>
                    </div>
                  </div>
                  <div className="text-primary-500 font-bold">
                    {formatDuration(workout.duration)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
