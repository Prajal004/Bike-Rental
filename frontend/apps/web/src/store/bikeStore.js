import { create } from 'zustand';

export const useBikeStore = create((set) => ({
  bikes: [],
  featured: [],
  loading: false,
  setBikes: (bikes) => set({ bikes }),
  setFeatured: (featured) => set({ featured }),
  setLoading: (loading) => set({ loading }),
  addBike: (bike) => set((state) => ({ bikes: [...state.bikes, bike] })),
  removeBike: (id) => set((state) => ({ bikes: state.bikes.filter(b => b.id !== id) })),
}));