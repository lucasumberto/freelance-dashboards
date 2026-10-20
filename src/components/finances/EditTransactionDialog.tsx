'use client'

import { useState } from 'react'
import { Pencil } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import type { Transaction } from '../../types'
import { toDateInput } from '../../lib/date'

interface EditTransactionDialogProps {
  transaction: Transaction
  onTransactionUpdated: (id: string, data: Partial<Transaction>) => void
}

function toFormData(transaction: Transaction) {
  return {
    type: transaction.type,
    amount: transaction.amount.toString(),
    description: transaction.description,
    category: transaction.category,
    date: toDateInput(transaction.date),
  };
}

export default function EditTransactionDialog({ transaction, onTransactionUpdated }: EditTransactionDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(() => toFormData(transaction));

  // Recarrega os dados da transação a cada abertura, descartando edições canceladas
  const handleOpenChange = (next: boolean) => {
    if (next) setFormData(toFormData(transaction));
    setOpen(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedData = {
      type: formData.type,
      amount: parseFloat(formData.amount),
      description: formData.description,
      category: formData.category,
      date: formData.date,
    };

    onTransactionUpdated(transaction.id, updatedData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-primary hover:text-primary/80 hover:bg-primary/10 rounded-lg transition-colors">
          <Pencil className="w-4 h-4" />
          Editar
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Transação</DialogTitle>
          <DialogDescription>
            Atualize os dados da transação.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="type">Tipo</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value as Transaction['type'] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Receita</SelectItem>
                  <SelectItem value="expense">Despesa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Valor (R$)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Categoria</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Data</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar Alterações</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
