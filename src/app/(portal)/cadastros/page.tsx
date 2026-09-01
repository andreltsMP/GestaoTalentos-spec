import type { Metadata } from 'next';
import { listarPessoas } from '@/service/actions/pessoaActions';
import { PessoaTable } from '@/components/tables/PessoaTable';

export const metadata: Metadata = {
  title: 'Cadastros - Exemplo Frontend',
};

export default async function CadastrosPage() {
  const pessoas = await listarPessoas();

  return (
    <div className="flex flex-column gap-4">
      <div className="flex align-items-center justify-content-between">
        <h1 className="text-2xl font-bold text-900 m-0">Cadastros</h1>
      </div>
      <PessoaTable pessoas={pessoas} />
    </div>
  );
}
