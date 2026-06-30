export interface Project {
  id: string;
  name: string;
  client: string;
  status: 'active' | 'completed' | 'on-hold' | 'cancelled';
  startDate: string;
  endDate: string | null;
  budget: number;
  actualCost: number;
  progress: number;
  description?: string;
}

export interface ProjectStatus {
  total: number;
  active: number;
  completed: number;
  onHold: number;
  cancelled: number;
}
