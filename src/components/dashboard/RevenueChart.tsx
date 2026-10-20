'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import type { Revenue } from '../../types'

interface RevenueChartProps {
  data: Revenue[]
}

export default function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-4">Receita Mensal</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" stroke="var(--muted-foreground)" />
          <YAxis stroke="var(--muted-foreground)" />
          <Tooltip
            contentStyle={{
              background: 'var(--popover)',
              borderColor: 'var(--border)',
              color: 'var(--popover-foreground)',
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#2563eb" name="Realizado" strokeWidth={2} />
          <Line type="monotone" dataKey="projected" stroke="#93c5fd" name="Projetado" strokeWidth={2} strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
