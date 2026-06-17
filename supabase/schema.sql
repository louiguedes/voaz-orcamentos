-- Execute este arquivo no Supabase > SQL Editor

create table proposals (
  id uuid default gen_random_uuid() primary key,
  numero text,
  data date default current_date,
  negocio text,
  status text default 'rascunho',
  -- dados do cliente
  cliente_nome text,
  cliente_endereco text,
  cliente_cidade text,
  cliente_contato text,
  cliente_email text,
  -- condições de fornecimento
  frete text default 'INCLUSO NA PROPOSTA',
  validade text default '20 DIAS',
  prazo_entrega text default '60 DIAS CORRIDOS DE OBRA A PARTIR DO PAGAMENTO DO SINAL E INÍCIO DA OBRA',
  -- condições financeiras
  impostos text default 'INCLUSO NA PROPOSTA',
  cond_pagamento text default '40% SINAL + 50% 30 DIAS + 10% NO ACEITE DA OBRA (15DDF)',
  faturamento text default 'DIRETO DE FORNECEDORES + SALDO PELA VOAZ',
  -- financeiro
  area_m2 numeric default 0,
  tributos numeric default 0,
  desconto numeric default 0,
  -- controle
  created_at timestamp default now(),
  updated_at timestamp default now(),
  created_by text
);

create table proposal_items (
  id uuid default gen_random_uuid() primary key,
  proposal_id uuid references proposals(id) on delete cascade,
  codigo text not null,
  checked boolean default false,
  unidade text,
  quantidade numeric,
  custo_unitario numeric default 0,
  margem numeric default 0,
  opcional boolean default false
);

-- índice para buscar itens por proposta rapidamente
create index idx_proposal_items_proposal_id on proposal_items(proposal_id);

-- trigger para atualizar updated_at automaticamente
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger proposals_updated_at
  before update on proposals
  for each row execute function update_updated_at();