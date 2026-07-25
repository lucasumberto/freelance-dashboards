export interface Revenue {
  month: string;
  amount: number;
  projected: number;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  date: string;
  category: string;
  projectId?: string;
}

export interface FinancialSummary {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  pendingPayments: number;
  monthlyRevenue: Revenue[];
}

export interface DashboardStats {
  revenueChange: string;
  projectsChange: string;
  clientsChange: string;
  profitChange: string;
}
