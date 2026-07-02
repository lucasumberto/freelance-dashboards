import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mockHandlers } from '../api/mocks/handlers';
import type { Client } from '../types';

export function useClients() {
  const queryClient = useQueryClient();

  const { data: clients, isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: mockHandlers.getClients,
  });

  const createMutation = useMutation({
    mutationFn: (_data: Partial<Client>) => Promise.resolve({} as Client),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (_: { id: string; data: Partial<Client> }) => Promise.resolve({} as Client),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (_id: string) => Promise.resolve(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
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
