import type { Metadata } from 'next';
import { buscarPessoaPorId } from '@/service/actions/pessoaActions';
import { PessoaForm } from '@/components/forms/PessoaForm';

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: 'Editar Cadastro - Exemplo Frontend',
};

export default async function EditarCadastroPage({ params }: PageProps) {
  const { id } = await params;
  const pessoa = await buscarPessoaPorId(Number(id));

  return (
    <div className="flex flex-column gap-4">
      <h1 className="text-2xl font-bold text-900 m-0">Editar Cadastro</h1>
      <PessoaForm initialData={pessoa} />
    </div>
  );
}
