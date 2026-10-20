import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/endpoints';
import type { Project } from '../types';

export function useProjects() {
  const queryClient = useQueryClient();

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await api.projects.getAll();
      return response.data;
    },
  });

  // Lista, detalhe (['project', id]) e estatísticas do dashboard dependem dos projetos
  const invalidateProjects = () => {
    queryClient.invalidateQueries({ queryKey: ['projects'] });
    queryClient.invalidateQueries({ queryKey: ['project'] });
    queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
  };

  const createMutation = useMutation({
    mutationFn: (data: Partial<Project>) => api.projects.create(data),
    onSuccess: invalidateProjects,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Project> }) => api.projects.update(id, data),
    onSuccess: invalidateProjects,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.projects.delete(id),
    onSuccess: invalidateProjects,
  });

  return {
    projects: projects || [],
    isLoading,
    createProject: createMutation.mutate,
    updateProject: updateMutation.mutate,
    deleteProject: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
