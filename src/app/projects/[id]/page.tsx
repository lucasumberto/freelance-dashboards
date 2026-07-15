'use client'

import { use } from 'react'
import { useProjects } from '../../../hooks/useProjects'
import LoadingSpinner from '../../../components/shared/LoadingSpinner'
import EditProjectDialog from '../../../components/projects/EditProjectDialog'

export default function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { projects, isLoading, updateProject } = useProjects()

  const project = projects.find(p => p.id === id)

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
        <p className="text-gray-500">Projeto não encontrado</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
        <EditProjectDialog project={project} onProjectUpdated={(id, data) => updateProject({ id, data })} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-600">Cliente</p>
          <p className="text-lg font-semibold text-gray-900 mt-1">{project.client}</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-600">Status</p>
          <p className="text-lg font-semibold text-gray-900 mt-1 capitalize">{project.status}</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-600">Orçamento</p>
          <p className="text-lg font-semibold text-gray-900 mt-1">R$ {project.budget.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-600">Progresso</p>
          <p className="text-lg font-semibold text-gray-900 mt-1">{project.progress}%</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Descrição</h2>
        <p className="text-gray-600">{project.description || 'Sem descrição'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Data de Início</h2>
          <p className="text-gray-600">{new Date(project.startDate).toLocaleDateString('pt-BR')}</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Data de Término</h2>
          <p className="text-gray-600">
            {project.endDate ? new Date(project.endDate).toLocaleDateString('pt-BR') : 'Não definida'}
          </p>
        </div>
      </div>
    </div>
  )
}
