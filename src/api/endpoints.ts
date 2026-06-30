import apiClient from './client';
import type { Project, Client, FinancialSummary, Transaction } from '../types';

export const api = {
  projects: {
    getAll: () => apiClient.get<Project[]>('/projects'),
    getById: (id: string) => apiClient.get<Project>(`/projects/${id}`),
    create: (data: Partial<Project>) => apiClient.post<Project>('/projects', data),
    update: (id: string, data: Partial<Project>) => apiClient.put<Project>(`/projects/${id}`, data),
    delete: (id: string) => apiClient.delete(`/projects/${id}`),
  },
  clients: {
    getAll: () => apiClient.get<Client[]>('/clients'),
    getById: (id: string) => apiClient.get<Client>(`/clients/${id}`),
    create: (data: Partial<Client>) => apiClient.post<Client>('/clients', data),
    update: (id: string, data: Partial<Client>) => apiClient.put<Client>(`/clients/${id}`, data),
    delete: (id: string) => apiClient.delete(`/clients/${id}`),
  },
  finances: {
    getSummary: () => apiClient.get<FinancialSummary>('/finances/summary'),
    getTransactions: () => apiClient.get<Transaction[]>('/finances/transactions'),
    getRevenue: () => apiClient.get('/finances/revenue'),
  },
};
