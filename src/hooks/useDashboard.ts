import { useQuery } from '@tanstack/react-query';
import { api } from '../api/endpoints';

export function useDashboard() {
  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await api.projects.getAll();
      return response.data;
    },
  });

  const { data: clients, isLoading: clientsLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const response = await api.clients.getAll();
      return response.data;
    },
  });

  const { data: financialSummary, isLoading: financesLoading } = useQuery({
    queryKey: ['financial-summary'],
    queryFn: async () => {
      const response = await api.finances.getSummary();
      return response.data;
    },
  });

  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const response = await api.dashboard.getStats();
      return response.data;
    },
  });

  const stats = [
    {
      title: 'Receita Total',
      value: financialSummary ? `R$ ${financialSummary.totalRevenue.toLocaleString()}` : 'R$ 0',
      change: statsData?.revenueChange,
      icon: 'DollarSign' as const,
    },
    {
      title: 'Projetos Ativos',
      value: projects?.filter(p => p.status === 'active').length.toString() || '0',
      change: statsData?.projectsChange,
      icon: 'FolderKanban' as const,
    },
    {
      title: 'Clientes',
      value: clients?.length.toString(),
      change: statsData?.clientsChange,
      icon: 'Users' as const,
    },
    {
      title: 'Lucro Líquido',
      value: financialSummary ? `R$ ${financialSummary.netProfit.toLocaleString()}` : 'R$ 0',
      change: statsData?.profitChange,
      icon: 'TrendingUp' as const,
    },
  ];

  return {
    projects: projects || [],
    clients: clients || [],
    financialSummary,
    stats,
    isLoading: projectsLoading || financesLoading || clientsLoading || statsLoading,
  };
}
