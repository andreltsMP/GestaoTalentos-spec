import { ApiService } from '@/service/ApiService';
import { fetchData } from '@/shared/service/actions/fetchData';

jest.mock('@/shared/service/actions/fetchData', () => ({
  fetchData: jest.fn(),
}));

const mockFetchData = fetchData as jest.Mock;

describe('ApiService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve delegar GET para fetchData quando busca recurso', async () => {
    mockFetchData.mockResolvedValue({ id: '1' });

    const result = await ApiService.get<{ id: string }>('/v1/pessoas');

    expect(mockFetchData).toHaveBeenCalledWith(
      expect.stringContaining('/v1/pessoas'),
      'GET',
      null,
      undefined,
      false,
    );
    expect(result).toEqual({ id: '1' });
  });

  it('deve delegar POST enviando o corpo quando cria recurso', async () => {
    mockFetchData.mockResolvedValue({ id: '2' });
    const body = { nome: 'Ana' };

    await ApiService.post('/v1/pessoas', body);

    expect(mockFetchData).toHaveBeenCalledWith(
      expect.stringContaining('/v1/pessoas'),
      'POST',
      body,
    );
  });

  it('deve delegar PUT enviando o corpo quando atualiza recurso', async () => {
    mockFetchData.mockResolvedValue({ id: '3' });
    const body = { nome: 'Ana Maria' };

    await ApiService.put('/v1/pessoas/3', body);

    expect(mockFetchData).toHaveBeenCalledWith(
      expect.stringContaining('/v1/pessoas/3'),
      'PUT',
      body,
    );
  });

  it('deve delegar DELETE para fetchData quando remove recurso', async () => {
    mockFetchData.mockResolvedValue(undefined);

    await ApiService.delete('/v1/pessoas/3');

    expect(mockFetchData).toHaveBeenCalledWith(
      expect.stringContaining('/v1/pessoas/3'),
      'DELETE',
    );
  });
});
