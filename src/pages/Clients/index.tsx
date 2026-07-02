import { useClients } from '../../hooks/useClients';
import DataTable from '../../components/shared/DataTable';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import NewClientDialog from '../../components/clients/NewClientDialog';
import EditClientDialog from '../../components/clients/EditClientDialog';
import type { Client } from '../../types';

export default function Clients() {
  const { clients, isLoading, createClient, updateClient } = useClients();

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
    {
      key: 'actions' as keyof Client,
      label: 'Ações',
      render: (_: unknown, row: Client) => (
        <EditClientDialog 
          client={row} 
          onClientUpdated={(id, data) => updateClient({ id, data })} 
        />
      ),
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
        <NewClientDialog onClientCreated={(data) => createClient(data)} />
      </div>
      
      <DataTable data={clients || []} columns={columns} searchable searchPlaceholder="Buscar clientes..." />
    </div>
  );
}
