import { api } from './axios';
import { SOSAlert, ApiResponse } from '../types';

export const sosAPI = {
  trigger: (location: { lat: number; lng: number; address?: string }) =>
    api.post<ApiResponse<SOSAlert>>('/sos/trigger', { location }),

  getActive: () =>
    api.get<ApiResponse<{ hasActiveSOS: boolean; sos: SOSAlert }>>('/sos/active'),

  cancel: (sosId: string) =>
    api.post<ApiResponse<{ message: string }>>('/sos/cancel', { sosId }),

  getHistory: () =>
    api.get<ApiResponse<{ sosAlerts: SOSAlert[] }>>('/sos/history'),

  getEmergencyContacts: () =>
    api.get<ApiResponse<{ contacts: any[] }>>('/sos/emergency-contacts'),

  updateEmergencyContacts: (contacts: any[]) =>
    api.put<ApiResponse<{ message: string }>>('/sos/emergency-contacts', { emergencyContacts: contacts }),
};
