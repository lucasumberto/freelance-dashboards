import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { useProjects } from '../../hooks/useProjects';
import DataTable from '../../components/shared/DataTable';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import NewProjectDialog from '../../components/projects/NewProjectDialog';
import type { Project } from '../../types';

export default function Projects() {
  const { projects, isLoading } = useProjects();

  const handleProjectCreated = (projectData: Omit<Project, 'id' | 'progress' | 'actualCost'>) => {
    console.log('Novo projeto:', projectData);
    // TODO: Implementar lógica de criação de projeto
  };

  const columns = [
    {
      key: 'name' as keyof Project,
      label: 'Nome do Projeto',
      render: (value: string) => <span className="font-medium">{value}</span>,
    },
    {
      key: 'client' as keyof Project,
      label: 'Cliente',
    },
    {
      key: 'status' as keyof Project,
      label: 'Status',
      render: (value: string) => {
        const statusColors: Record<string, string> = {
          active: 'bg-blue-100 text-blue-800',
          completed: 'bg-green-100 text-green-800',
          'on-hold': 'bg-yellow-100 text-yellow-800',
          cancelled: 'bg-red-100 text-red-800',
        };
        const statusLabels: Record<string, string> = {
          active: 'Ativo',
          completed: 'Concluído',
          'on-hold': 'Em espera',
          cancelled: 'Cancelado',
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[value] || 'bg-gray-100 text-gray-800'}`}>
            {statusLabels[value] || value}
          </span>
        );
      },
    },
    {
      key: 'budget' as keyof Project,
      label: 'Orçamento',
      render: (value: number) => `R$ ${value.toLocaleString()}`,
    },
    {
      key: 'progress' as keyof Project,
      label: 'Progresso',
      render: (value: number) => (
        <div className="flex items-center gap-2">
          <div className="w-24 bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${value}%` }} />
          </div>
          <span className="text-sm text-gray-600">{value}%</span>
        </div>
      ),
    },
    {
      key: 'actions' as keyof Project,
      label: 'Ações',
      render: (_: any, row: Project) => (
        <Link
          to={`/projects/${row.id}`}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <Eye className="w-4 h-4" />
          Visualizar
        </Link>
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
        <h1 className="text-2xl font-bold text-gray-900">Projetos</h1>
        <NewProjectDialog onProjectCreated={handleProjectCreated} />
      </div>
      
      <DataTable data={projects} columns={columns} searchable searchPlaceholder="Buscar projetos..." />
    </div>
  );
}
