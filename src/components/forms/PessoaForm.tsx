'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import type { PessoaResponse } from '@/interfaces/Pessoa';

const pessoaSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres').max(200),
  cpf: z.string().regex(/^\d{11}$/, 'CPF deve conter exatamente 11 digitos'),
  email: z.string().email('Email invalido').optional().or(z.literal('')),
});

type PessoaFormData = z.infer<typeof pessoaSchema>;

interface PessoaFormProps {
  initialData?: PessoaResponse;
  onSubmit?: (data: PessoaFormData) => Promise<void>;
}

export function PessoaForm({ initialData, onSubmit }: PessoaFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PessoaFormData>({
    resolver: zodResolver(pessoaSchema),
    defaultValues: {
      nome: initialData?.nome ?? '',
      email: initialData?.email ?? '',
    },
  });

  const handleFormSubmit = async (data: PessoaFormData) => {
    if (onSubmit) {
      await onSubmit(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-column gap-3 w-full md:w-5">
      <div className="flex flex-column gap-1">
        <label htmlFor="nome" className="font-medium text-700">Nome</label>
        <InputText
          id="nome"
          {...register('nome')}
          invalid={!!errors.nome}
          className="w-full"
        />
        {errors.nome && <small className="p-error">{errors.nome.message}</small>}
      </div>

      <div className="flex flex-column gap-1">
        <label htmlFor="cpf" className="font-medium text-700">CPF</label>
        <InputText
          id="cpf"
          maxLength={11}
          {...register('cpf')}
          disabled={!!initialData}
          invalid={!!errors.cpf}
          className="w-full"
        />
        {errors.cpf && <small className="p-error">{errors.cpf.message}</small>}
      </div>

      <div className="flex flex-column gap-1">
        <label htmlFor="email" className="font-medium text-700">Email</label>
        <InputText
          id="email"
          type="email"
          {...register('email')}
          invalid={!!errors.email}
          className="w-full"
        />
        {errors.email && <small className="p-error">{errors.email.message}</small>}
      </div>

      <Button
        type="submit"
        label={isSubmitting ? 'Salvando...' : 'Salvar'}
        disabled={isSubmitting}
        loading={isSubmitting}
      />
    </form>
  );
}
