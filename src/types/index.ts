export interface Venue {
  id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  phone: string;
  rating: number;
  price: number;
  images: string[];
  facilities: string[];
  distance?: number;
}

export interface TimeSlot {
  id: string;
  venueId: string;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
  available: boolean;
}

export interface Order {
  id: string;
  userId: string;
  venueId: string;
  venueName: string;
  venueImage: string;
  date: string;
  startTime: string;
  endTime: string;
  totalAmount: number;
  status: 'pending' | 'paid' | 'completed' | 'cancelled';
  paymentMethod?: string;
  createdAt: string;
}

export interface Workout {
  id: string;
  userId: string;
  venueId: string;
  venueName: string;
  duration: number;
  date: string;
  sportType: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  memberLevel?: string;
}

export interface BookingState {
  venueId: string | null;
  date: string;
  slotId: string | null;
}

export interface Category {
  key: string;
  name: string;
}
