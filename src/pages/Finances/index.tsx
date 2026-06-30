import { useQuery } from '@tanstack/react-query';
import { mockHandlers } from '../../api/mocks/handlers';
import DataTable from '../../components/shared/DataTable';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import type { Transaction } from '../../types';

export default function Finances() {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: mockHandlers.getTransactions,
  });

  const columns = [
    {
      key: 'type' as keyof Transaction,
      label: 'Tipo',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value === 'income' ? 'Receita' : 'Despesa'}
        </span>
      ),
    },
    {
      key: 'description' as keyof Transaction,
      label: 'Descrição',
    },
    {
      key: 'amount' as keyof Transaction,
      label: 'Valor',
      render: (value: number, row: Transaction) => (
        <span className={row.type === 'income' ? 'text-green-600' : 'text-red-600'}>
          {row.type === 'income' ? '+' : '-'} R$ {value.toLocaleString()}
        </span>
      ),
    },
    {
      key: 'category' as keyof Transaction,
      label: 'Categoria',
    },
    {
      key: 'date' as keyof Transaction,
      label: 'Data',
      render: (value: string) => new Date(value).toLocaleDateString('pt-BR'),
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
        <h1 className="text-2xl font-bold text-gray-900">Finanças</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Nova Transação
        </button>
      </div>
      
      <DataTable data={transactions || []} columns={columns} searchable searchPlaceholder="Buscar transações..." />
    </div>
  );
}
