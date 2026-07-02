import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mockHandlers } from '../api/mocks/handlers';
import type { Transaction } from '../types';

export function useFinances() {
  const queryClient = useQueryClient();

  const { data: transactions, isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: mockHandlers.getTransactions,
  });

  const createMutation = useMutation({
    mutationFn: (_data: Partial<Transaction>) => Promise.resolve({} as Transaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (_: { id: string; data: Partial<Transaction> }) => Promise.resolve({} as Transaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (_id: string) => Promise.resolve(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
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
