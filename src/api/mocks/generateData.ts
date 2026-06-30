import { faker } from '@faker-js/faker';
import type { Project, Client, Revenue, Transaction } from '../../types';

export const generateClients = (count = 10): Client[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    company: faker.company.name(),
    phone: faker.phone.number(),
    status: faker.helpers.arrayElement(['active', 'inactive']),
    totalProjects: faker.number.int({ min: 1, max: 10 }),
    totalSpent: faker.number.int({ min: 1000, max: 50000 }),
    lastContact: faker.date.recent({ days: 30 }).toISOString(),
  }));
};

export const generateProjects = (clients: Client[], count = 15): Project[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.company.buzzPhrase(),
    client: faker.helpers.arrayElement(clients).name,
    status: faker.helpers.arrayElement(['active', 'completed', 'on-hold', 'cancelled']),
    startDate: faker.date.past({ years: 1 }).toISOString(),
    endDate: faker.helpers.arrayElement([null, faker.date.future({ years: 1 }).toISOString()]),
    budget: faker.number.int({ min: 5000, max: 50000 }),
    actualCost: faker.number.int({ min: 3000, max: 45000 }),
    progress: faker.number.int({ min: 0, max: 100 }),
    description: faker.lorem.paragraph(),
  }));
};

export const generateRevenue = (months = 12): Revenue[] => {
  return Array.from({ length: months }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (months - 1 - i));
    return {
      month: date.toLocaleString('default', { month: 'short', year: '2-digit' }),
      amount: faker.number.int({ min: 5000, max: 20000 }),
      projected: faker.number.int({ min: 6000, max: 22000 }),
    };
  });
};

export const generateTransactions = (count = 20): Transaction[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    type: faker.helpers.arrayElement(['income', 'expense']),
    amount: faker.number.int({ min: 100, max: 5000 }),
    description: faker.finance.transactionDescription(),
    date: faker.date.recent({ days: 90 }).toISOString(),
    category: faker.helpers.arrayElement(['Services', 'Software', 'Marketing', 'Operations', 'Taxes']),
  }));
};
