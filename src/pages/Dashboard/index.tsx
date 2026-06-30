import { useDashboard } from '../../hooks/useDashboard';
import StatsCards from '../../components/dashboard/StatsCards';
import RevenueChart from '../../components/dashboard/RevenueChart';
import ProjectStatus from '../../components/dashboard/ProjectStatus';
import RecentActivity from '../../components/dashboard/RecentActivity';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

export default function Dashboard() {
  const { projects, financialSummary, stats, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      <StatsCards stats={stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart data={financialSummary?.monthlyRevenue || []} />
        </div>
        <div>
          <ProjectStatus projects={projects} />
        </div>
      </div>
      
      <RecentActivity projects={projects} />
    </div>
  );
}
