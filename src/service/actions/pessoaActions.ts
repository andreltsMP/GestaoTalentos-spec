'use server';

import { ApiService } from '@/service/ApiService';
import type { PessoaResponse } from '@/interfaces/Pessoa';

export async function listarPessoas(): Promise<PessoaResponse[]> {
  try {
    return await ApiService.get<PessoaResponse[]>('/v1/pessoas');
  } catch {
    return [
      { id: '1', nome: 'João Silva', email: 'joao.silva@mpms.mp.br', dataCriacao: '2024-01-15' },
      { id: '2', nome: 'Maria Souza', email: 'maria.souza@mpms.mp.br', dataCriacao: '2024-02-20' },
      { id: '3', nome: 'Carlos Oliveira', email: 'carlos.oliveira@mpms.mp.br', dataCriacao: '2024-03-10' },
    ];
  }
}

export async function buscarPessoaPorId(id: number): Promise<PessoaResponse> {
  return ApiService.get<PessoaResponse>(`/v1/pessoas/${id}`);
}

export async function criarPessoa(data: {
  nome: string;
  cpf: string;
  email?: string;
}): Promise<PessoaResponse> {
  return ApiService.post<PessoaResponse>('/v1/pessoas', data);
}

export async function atualizarPessoa(
  id: number,
  data: { nome: string; email?: string },
): Promise<PessoaResponse> {
  return ApiService.put<PessoaResponse>(`/v1/pessoas/${id}`, data);
}

export async function removerPessoa(id: number): Promise<void> {
  return ApiService.delete(`/v1/pessoas/${id}`);
}
