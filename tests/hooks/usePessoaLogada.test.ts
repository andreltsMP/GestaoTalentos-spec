import { renderHook } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { usePessoaLogada } from '@/hooks/usePessoaLogada';

jest.mock('next-auth/react');
const mockUseSession = useSession as jest.MockedFunction<typeof useSession>;

describe('usePessoaLogada', () => {
  it('deve retornar dados da pessoa quando autenticado', () => {
    mockUseSession.mockReturnValue({
      data: {
        user: { name: 'Joao Silva', email: 'joao@mpms.mp.br' },
        expires: '2026-12-31',
      },
      status: 'authenticated',
      update: jest.fn(),
    });

    const { result } = renderHook(() => usePessoaLogada());

    expect(result.current.nome).toBe('Joao Silva');
    expect(result.current.email).toBe('joao@mpms.mp.br');
    expect(result.current.autenticado).toBe(true);
    expect(result.current.carregando).toBe(false);
  });

  it('deve retornar vazio quando nao autenticado', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
      update: jest.fn(),
    });

    const { result } = renderHook(() => usePessoaLogada());

    expect(result.current.nome).toBe('');
    expect(result.current.autenticado).toBe(false);
  });

  it('deve indicar carregando enquanto verifica sessao', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'loading',
      update: jest.fn(),
    });

    const { result } = renderHook(() => usePessoaLogada());

    expect(result.current.carregando).toBe(true);
  });
});
