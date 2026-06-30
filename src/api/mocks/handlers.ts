import { faker } from '@faker-js/faker';
import { generateClients, generateProjects, generateRevenue, generateTransactions } from './generateData';

const clients = generateClients();
const projects = generateProjects(clients);
const revenue = generateRevenue();
const transactions = generateTransactions();

export const mockHandlers = {
  getProjects: () => Promise.resolve(projects),
  getProjectById: (id: string) => Promise.resolve(projects.find(p => p.id === id)),
  getClients: () => Promise.resolve(clients),
  getClientById: (id: string) => Promise.resolve(clients.find(c => c.id === id)),
  getRevenue: () => Promise.resolve(revenue),
  getTransactions: () => Promise.resolve(transactions),
  getFinancialSummary: () => Promise.resolve({
    totalRevenue: revenue.reduce((acc, r) => acc + r.amount, 0),
    totalExpenses: transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0),
    netProfit: revenue.reduce((acc, r) => acc + r.amount, 0) - transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0),
    pendingPayments: faker.number.int({ min: 5000, max: 15000 }),
    monthlyRevenue: revenue,
  }),
};
