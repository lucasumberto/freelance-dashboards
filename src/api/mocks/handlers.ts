import { faker } from '@faker-js/faker';
import { generateClients, generateProjects, generateRevenue, generateTransactions } from './generateData';

const clients = generateClients();
const projects = generateProjects(clients);
const revenue = generateRevenue();
const transactions = generateTransactions();

export const getProjects = () => Promise.resolve(projects);
export const getProjectById = (id: string) => Promise.resolve(projects.find(p => p.id === id));
export const getClients = () => Promise.resolve(clients);
export const getClientById = (id: string) => Promise.resolve(clients.find(c => c.id === id));
export const getRevenue = () => Promise.resolve(revenue);
export const getTransactions = () => Promise.resolve(transactions);
export const getFinancialSummary = () => Promise.resolve({
  totalRevenue: revenue.reduce((acc, r) => acc + r.amount, 0),
  totalExpenses: transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0),
  netProfit: revenue.reduce((acc, r) => acc + r.amount, 0) - transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0),
  pendingPayments: faker.number.int({ min: 5000, max: 15000 }),
  monthlyRevenue: revenue,
});

export const mockHandlers = {
  getProjects,
  getProjectById,
  getClients,
  getClientById,
  getRevenue,
  getTransactions,
  getFinancialSummary,
};
