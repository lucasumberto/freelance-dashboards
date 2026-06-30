import { useQuery } from '@tanstack/react-query';
import { mockHandlers } from '../../api/mocks/handlers';
import DataTable from '../../components/shared/DataTable';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import type { Client } from '../../types';

export default function Clients() {
  const { data: clients, isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: mockHandlers.getClients,
  });

  const columns = [
    {
      key: 'name' as keyof Client,
      label: 'Nome',
      render: (value: string) => <span className="font-medium">{value}</span>,
    },
    {
      key: 'email' as keyof Client,
      label: 'Email',
    },
    {
      key: 'company' as keyof Client,
      label: 'Empresa',
    },
    {
      key: 'status' as keyof Client,
      label: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {value === 'active' ? 'Ativo' : 'Inativo'}
        </span>
      ),
    },
    {
      key: 'totalProjects' as keyof Client,
      label: 'Projetos',
    },
    {
      key: 'totalSpent' as keyof Client,
      label: 'Total Gasto',
      render: (value: number) => `R$ ${value.toLocaleString()}`,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Novo Cliente
        </button>
      </div>
      
      <DataTable data={clients || []} columns={columns} searchable searchPlaceholder="Buscar clientes..." />
    </div>
  );
}
