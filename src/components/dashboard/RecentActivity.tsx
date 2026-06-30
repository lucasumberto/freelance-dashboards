import { Clock, CheckCircle, AlertCircle } from 'lucide-react';
import type { Project } from '../../types';

interface RecentActivityProps {
  projects: Project[];
}

export default function RecentActivity({ projects }: RecentActivityProps) {
  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
    .slice(0, 5);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'on-hold':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'cancelled':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      active: 'Ativo',
      completed: 'Concluído',
      'on-hold': 'Em espera',
      cancelled: 'Cancelado',
    };
    return labels[status] || status;
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividade Recente</h3>
      <div className="space-y-4">
        {recentProjects.map((project) => (
          <div key={project.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="p-2 bg-gray-100 rounded-lg">
              {getStatusIcon(project.status)}
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{project.name}</p>
              <p className="text-sm text-gray-500">{project.client}</p>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium text-gray-900">{getStatusLabel(project.status)}</span>
              <p className="text-xs text-gray-500">{project.progress}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
