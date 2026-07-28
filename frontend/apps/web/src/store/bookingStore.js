import { create } from 'zustand';

export const useBookingStore = create((set) => ({
  bookings: [],
  currentBooking: null,
  setBookings: (bookings) => set({ bookings }),
  setCurrentBooking: (booking) => set({ currentBooking: booking }),
  addBooking: (booking) => set((state) => ({ bookings: [...state.bookings, booking] })),
}));