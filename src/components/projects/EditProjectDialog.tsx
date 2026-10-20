'use client'

import { useState } from 'react'
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
import type { Project } from '../../types'
import { toDateInput } from '../../lib/date'

interface EditProjectDialogProps {
  project: Project
  onProjectUpdated: (id: string, data: Partial<Project>) => void
}

function toFormData(project: Project) {
  return {
    name: project.name,
    client: project.client,
    status: project.status,
    startDate: toDateInput(project.startDate),
    endDate: toDateInput(project.endDate),
    budget: project.budget.toString(),
    description: project.description || '',
  };
}

export default function EditProjectDialog({ project, onProjectUpdated }: EditProjectDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(() => toFormData(project));

  // Recarrega os dados do projeto a cada abertura, descartando edições canceladas
  const handleOpenChange = (next: boolean) => {
    if (next) setFormData(toFormData(project));
    setOpen(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedData = {
      name: formData.name,
      client: formData.client,
      status: formData.status,
      startDate: formData.startDate,
      endDate: formData.endDate || null,
      budget: parseFloat(formData.budget),
      description: formData.description,
    };

    onProjectUpdated(project.id, updatedData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>Editar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Projeto</DialogTitle>
          <DialogDescription>
            Atualize os dados do projeto.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome do Projeto</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="client">Cliente</Label>
              <Input
                id="client"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value as Project['status'] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="completed">Concluído</SelectItem>
                  <SelectItem value="on-hold">Em espera</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startDate">Data de Início</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endDate">Data de Término</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="budget">Orçamento (R$)</Label>
              <Input
                id="budget"
                type="number"
                step="0.01"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
