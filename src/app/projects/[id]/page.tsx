'use client'

import { use } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../../api/endpoints'
import LoadingSpinner from '../../../components/shared/LoadingSpinner'
import EditProjectDialog from '../../../components/projects/EditProjectDialog'
import { useProjects } from '../../../hooks/useProjects'
import { formatDate } from '../../../lib/date'

export default function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { updateProject } = useProjects()

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      const response = await api.projects.getById(id)
      return response.data
    },
    enabled: !!id,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Projeto não encontrado</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">{project.name}</h1>
        <EditProjectDialog project={project} onProjectUpdated={(id, data) => updateProject({ id, data })} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <p className="text-sm text-muted-foreground">Cliente</p>
          <p className="text-lg font-semibold text-foreground mt-1">{project.client}</p>
        </div>
        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <p className="text-sm text-muted-foreground">Status</p>
          <p className="text-lg font-semibold text-foreground mt-1 capitalize">{project.status}</p>
        </div>
        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <p className="text-sm text-muted-foreground">Orçamento</p>
          <p className="text-lg font-semibold text-foreground mt-1">R$ {project.budget.toLocaleString()}</p>
        </div>
        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <p className="text-sm text-muted-foreground">Progresso</p>
          <p className="text-lg font-semibold text-foreground mt-1">{project.progress}%</p>
        </div>
      </div>

      <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
        <h2 className="text-lg font-semibold text-foreground mb-4">Descrição</h2>
        <p className="text-muted-foreground">{project.description || 'Sem descrição'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">Data de Início</h2>
          <p className="text-muted-foreground">{formatDate(project.startDate)}</p>
        </div>
        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">Data de Término</h2>
          <p className="text-muted-foreground">
            {project.endDate ? formatDate(project.endDate) : 'Não definida'}
          </p>
        </div>
      </div>
    </div>
  )
}
