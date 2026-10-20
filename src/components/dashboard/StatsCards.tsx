import { DollarSign, FolderKanban, Users, TrendingUp } from 'lucide-react';

type IconName = 'DollarSign' | 'FolderKanban' | 'Users' | 'TrendingUp';

interface StatCard {
  title: string;
  value: string;
  change: string;
  icon: IconName;
}

interface StatsCardsProps {
  stats: StatCard[];
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const iconMap = {
    DollarSign,
    FolderKanban,
    Users,
    TrendingUp,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = iconMap[stat.icon as keyof typeof iconMap] || TrendingUp;
        const isPositive = stat.change.startsWith('+');
        
        return (
          <div key={stat.title} className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <span className={`text-sm font-medium ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
