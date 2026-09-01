'use client';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import type { PessoaResponse } from '@/interfaces/Pessoa';

interface PessoaTableProps {
  pessoas: PessoaResponse[];
}

export function PessoaTable({ pessoas }: PessoaTableProps) {
  return (
    <DataTable value={pessoas} tableStyle={{ minWidth: '50rem' }} stripedRows>
      <Column field="nome" header="Nome" />
      <Column field="email" header="Email" />
      <Column field="dataCriacao" header="Data Criação" />
    </DataTable>
  );
}
