import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/endpoints';
import type { Transaction } from '../types';

export function useFinances() {
  const queryClient = useQueryClient();

  const { data: transactions, isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const response = await api.finances.getTransactions();
      return response.data;
    },
  });

  // Transações alimentam o resumo financeiro e as estatísticas do dashboard
  const invalidateFinances = () => {
    queryClient.invalidateQueries({ queryKey: ['transactions'] });
    queryClient.invalidateQueries({ queryKey: ['financial-summary'] });
    queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
  };

  const createMutation = useMutation({
    mutationFn: (data: Partial<Transaction>) => api.finances.createTransaction(data),
    onSuccess: invalidateFinances,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Transaction> }) => api.finances.updateTransaction(id, data),
    onSuccess: invalidateFinances,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.finances.deleteTransaction(id),
    onSuccess: invalidateFinances,
  });

  return {
    transactions: transactions || [],
    isLoading,
    createTransaction: createMutation.mutate,
    updateTransaction: updateMutation.mutate,
    deleteTransaction: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
