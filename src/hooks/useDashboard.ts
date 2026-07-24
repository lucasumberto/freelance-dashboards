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

  const { data: financialSummary, isLoading: financesLoading } = useQuery({
    queryKey: ['financial-summary'],
    queryFn: async () => {
      const response = await api.finances.getSummary();
      return response.data;
    },
  });

  const stats = [
    {
      title: 'Receita Total',
      value: financialSummary ? `R$ ${financialSummary.totalRevenue.toLocaleString()}` : 'R$ 0',
      change: '+12.5%',
      icon: 'DollarSign' as const,
    },
    {
      title: 'Projetos Ativos',
      value: projects?.filter(p => p.status === 'active').length.toString() || '0',
      change: '+3',
      icon: 'FolderKanban' as const,
    },
    {
      title: 'Clientes',
      value: '12',
      change: '+2',
      icon: 'Users' as const,
    },
    {
      title: 'Lucro Líquido',
      value: financialSummary ? `R$ ${financialSummary.netProfit.toLocaleString()}` : 'R$ 0',
      change: '+8.2%',
      icon: 'TrendingUp' as const,
    },
  ];

  return {
    projects: projects || [],
    financialSummary,
    stats,
    isLoading: projectsLoading || financesLoading,
  };
}
