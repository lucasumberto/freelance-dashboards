import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/endpoints';
import type { Client } from '../types';

export function useClients() {
  const queryClient = useQueryClient();

  const { data: clients, isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const response = await api.clients.getAll();
      return response.data;
    },
  });

  // A lista e as estatísticas do dashboard dependem dos clientes
  const invalidateClients = () => {
    queryClient.invalidateQueries({ queryKey: ['clients'] });
    queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
  };

  const createMutation = useMutation({
    mutationFn: (data: Partial<Client>) => api.clients.create(data),
    onSuccess: invalidateClients,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Client> }) => api.clients.update(id, data),
    onSuccess: invalidateClients,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.clients.delete(id),
    onSuccess: invalidateClients,
  });

  return {
    clients: clients || [],
    isLoading,
    createClient: createMutation.mutate,
    updateClient: updateMutation.mutate,
    deleteClient: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
