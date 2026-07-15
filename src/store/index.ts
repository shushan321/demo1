import { create } from 'zustand';
import type { Order, Workout, BookingState } from '../types';
import { mockOrders, mockWorkouts, getWorkoutStats } from '../data/mockData';

interface AppState {
  orders: Order[];
  workouts: Workout[];
  booking: BookingState;
  addOrder: (order: Order) => void;
  cancelOrder: (orderId: string) => void;
  addWorkout: (workout: Workout) => void;
  setBooking: (booking: Partial<BookingState>) => void;
  workoutStats: ReturnType<typeof getWorkoutStats>;
}

export const useAppStore = create<AppState>((set) => ({
  orders: mockOrders,
  workouts: mockWorkouts,
  booking: {
    venueId: null,
    date: '',
    slotId: null,
  },
  workoutStats: getWorkoutStats(),
  
  addOrder: (order) => set((state) => ({
    orders: [order, ...state.orders],
  })),
  
  cancelOrder: (orderId) => set((state) => ({
    orders: state.orders.map((order) =>
      order.id === orderId ? { ...order, status: 'cancelled' } : order
    ),
  })),
  
  addWorkout: (workout) => set((state) => ({
    workouts: [workout, ...state.workouts],
    workoutStats: {
      ...state.workoutStats,
      totalDuration: state.workoutStats.totalDuration + workout.duration,
      totalWorkouts: state.workoutStats.totalWorkouts + 1,
    },
  })),
  
  setBooking: (booking) => set((state) => ({
    booking: { ...state.booking, ...booking },
  })),
}));
