import {
  listarPessoas,
  buscarPessoaPorId,
  criarPessoa,
  atualizarPessoa,
  removerPessoa,
} from '@/service/actions/pessoaActions';
import { ApiService } from '@/service/ApiService';

jest.mock('@/service/ApiService', () => ({
  ApiService: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('pessoaActions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar a lista da API quando a requisicao tem sucesso', async () => {
    (ApiService.get as jest.Mock).mockResolvedValue([
      { id: '9', nome: 'Fulano', email: 'fulano@mpms.mp.br', dataCriacao: '2024-01-01' },
    ]);

    const result = await listarPessoas();

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('9');
  });

  it('deve retornar dados de fallback quando a API falha', async () => {
    (ApiService.get as jest.Mock).mockRejectedValue(new Error('offline'));

    const result = await listarPessoas();

    expect(result.length).toBeGreaterThan(0);
    expect(result[0].nome).toBe('João Silva');
  });

  it('deve buscar pessoa por id delegando ao ApiService', async () => {
    (ApiService.get as jest.Mock).mockResolvedValue({ id: '5' });

    await buscarPessoaPorId(5);

    expect(ApiService.get).toHaveBeenCalledWith('/v1/pessoas/5');
  });

  it('deve criar pessoa via POST quando recebe dados validos', async () => {
    (ApiService.post as jest.Mock).mockResolvedValue({ id: '6' });
    const dados = { nome: 'Ana', cpf: '00000000000' };

    await criarPessoa(dados);

    expect(ApiService.post).toHaveBeenCalledWith('/v1/pessoas', dados);
  });

  it('deve atualizar pessoa via PUT quando recebe id e dados', async () => {
    (ApiService.put as jest.Mock).mockResolvedValue({ id: '7' });

    await atualizarPessoa(7, { nome: 'Ana Maria' });

    expect(ApiService.put).toHaveBeenCalledWith('/v1/pessoas/7', { nome: 'Ana Maria' });
  });

  it('deve remover pessoa via DELETE quando recebe id', async () => {
    (ApiService.delete as jest.Mock).mockResolvedValue(undefined);

    await removerPessoa(7);

    expect(ApiService.delete).toHaveBeenCalledWith('/v1/pessoas/7');
  });
});
