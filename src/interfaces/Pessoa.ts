export interface PessoaResponse {
  id: string;
  nome: string;
  email: string;
  dataCriacao: string;
}

export interface CriarPessoaRequest {
  nome: string;
  cpf: string;
  email?: string;
}
