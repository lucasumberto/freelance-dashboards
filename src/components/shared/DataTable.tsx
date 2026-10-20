'use client'

import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'

interface Column<T> {
  key: keyof T
  label: string
  // sintaxe de método: permite que cada coluna tipe `value` de forma específica (ex.: string)
  render?(value: T[keyof T], row: T): React.ReactNode
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  searchable?: boolean
  searchPlaceholder?: string
}

export default function DataTable<T extends object>({
  data,
  columns,
  searchable = false,
  searchPlaceholder = 'Buscar...',
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    const lowerSearchTerm = searchTerm.toLowerCase();
    return data.filter((row) =>
      columns.some((column) => {
        const value = row[column.key];
        return value && String(value).toLowerCase().includes(lowerSearchTerm);
      })
    );
  }, [data, searchTerm, columns]);

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      {searchable && (
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background text-foreground placeholder:text-muted-foreground border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredData.map((row, index) => (
              <tr key={index} className="hover:bg-muted transition-colors">
                {columns.map((column) => (
                  <td key={String(column.key)} className="px-6 py-4 whitespace-nowrap">
                    {column.render ? column.render(row[column.key], row) : String(row[column.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredData.length === 0 && (
        <div className="p-8 text-center text-muted-foreground">
          Nenhum dado encontrado
        </div>
      )}
    </div>
  );
}
