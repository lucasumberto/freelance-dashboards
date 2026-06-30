export interface Client {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  status: 'active' | 'inactive';
  totalProjects: number;
  totalSpent: number;
  lastContact: string;
}
