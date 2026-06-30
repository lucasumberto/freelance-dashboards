import type { Project } from '../../types';

interface ProjectStatusProps {
  projects: Project[];
}

export default function ProjectStatus({ projects }: ProjectStatusProps) {
  const statusCount = projects.reduce((acc, project) => {
    acc[project.status] = (acc[project.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusLabels: Record<string, { label: string; color: string }> = {
    active: { label: 'Ativos', color: 'bg-blue-500' },
    completed: { label: 'Concluídos', color: 'bg-green-500' },
    'on-hold': { label: 'Em espera', color: 'bg-yellow-500' },
    cancelled: { label: 'Cancelados', color: 'bg-red-500' },
  };

  const total = projects.length;

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Status dos Projetos</h3>
      <div className="space-y-4">
        {Object.entries(statusCount).map(([status, count]) => {
          const { label, color } = statusLabels[status] || { label: status, color: 'bg-gray-500' };
          const percentage = total > 0 ? (count / total) * 100 : 0;
          
          return (
            <div key={status}>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">{label}</span>
                <span className="text-sm font-medium text-gray-900">{count}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${color} h-2 rounded-full transition-all`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
