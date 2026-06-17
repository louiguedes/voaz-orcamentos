import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import { supabase } from '../lib/supabaseClient'

const STATUS_CORES = {
  rascunho:  { bg: '#FFF9C4', color: '#7B6F00', label: 'Rascunho' },
  enviada:   { bg: '#E3F2FD', color: '#1565C0', label: 'Enviada' },
  aprovada:  { bg: '#E8F5E9', color: '#1B5E20', label: 'Aprovada' },
  perdida:   { bg: '#FFEBEE', color: '#B71C1C', label: 'Perdida' },
}

export default function Historico() {
  const router = useRouter()
  const [propostas, setPropostas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!sessionStorage.getItem('voaz_auth')) { router.push('/'); return }
    carregarPropostas()
  }, [])

  async function carregarPropostas() {
    setLoading(true)
    const { data, error } = await supabase
      .from('proposals')
      .select('*')
      .order('updated_at', { ascending: false })
    if (!error) setPropostas(data || [])
    setLoading(false)
  }

  async function novaPropostas() {
    const { data, error } = await supabase
      .from('proposals')
      .insert([{ status: 'rascunho', data: new Date().toISOString().split('T')[0] }])
      .select()
    if (!error && data?.[0]) {
      router.push(`/escopo?id=${data[0].id}`)
    }
  }

  async function duplicarProposta(p) {
    const { data: nova, error } = await supabase
      .from('proposals')
      .insert([{
        numero: null, data: new Date().toISOString().split('T')[0],
        negocio: p.negocio ? `[CÓPIA] ${p.negocio}` : '[CÓPIA]',
        status: 'rascunho',
        cliente_nome: p.cliente_nome, cliente_endereco: p.cliente_endereco,
        cliente_cidade: p.cliente_cidade, cliente_contato: p.cliente_contato,
        cliente_email: p.cliente_email,
        frete: p.frete, validade: p.validade, prazo_entrega: p.prazo_entrega,
        impostos: p.impostos, cond_pagamento: p.cond_pagamento, faturamento: p.faturamento,
        area_m2: p.area_m2, tributos: p.tributos, desconto: p.desconto,
      }])
      .select()
    if (!error && nova?.[0]) {
      const { data: itens } = await supabase.from('proposal_items').select('*').eq('proposal_id', p.id)
      if (itens?.length) {
        await supabase.from('proposal_items').insert(
          itens.map(i => ({ ...i, id: undefined, proposal_id: nova[0].id }))
        )
      }
      carregarPropostas()
    }
  }

  async function alterarStatus(id, status) {
    await supabase.from('proposals').update({ status }).eq('id', id)
    carregarPropostas()
  }

  async function excluir(id) {
    if (!confirm('Excluir esta proposta? Esta ação não pode ser desfeita.')) return
    await supabase.from('proposals').delete().eq('id', id)
    carregarPropostas()
  }

  return (
    <Layout>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700 }}>Propostas</h1>
          <button className="btn-primary" onClick={novaPropostas}>+ Nova Proposta</button>
        </div>

        {loading ? (
          <p style={{ color: '#888' }}>Carregando...</p>
        ) : propostas.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 64, color: '#aaa' }}>
            <p style={{ fontSize: 16 }}>Nenhuma proposta ainda.</p>
            <p style={{ fontSize: 13 }}>Clique em "Nova Proposta" para começar.</p>
          </div>
        ) : (
          <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 8, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Número','Negócio / Cliente','Data','Status','Valor Total','Ações'].map(h => (
                    <th key={h} className="table-header">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {propostas.map((p, i) => {
                  const st = STATUS_CORES[p.status] || STATUS_CORES.rascunho
                  return (
                    <tr key={p.id} style={{ borderBottom: '1px solid #eee', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                      <td style={{ padding: '12px 12px', fontSize: 13, fontWeight: 700 }}>{p.numero || '—'}</td>
                      <td style={{ padding: '12px 12px', fontSize: 13 }}>
                        <div style={{ fontWeight: 600 }}>{p.negocio || '(sem título)'}</div>
                        <div style={{ color: '#888', fontSize: 12 }}>{p.cliente_nome || ''}</div>
                      </td>
                      <td style={{ padding: '12px 12px', fontSize: 13 }}>
                        {p.data ? new Date(p.data + 'T00:00:00').toLocaleDateString('pt-BR') : '—'}
                      </td>
                      <td style={{ padding: '12px 12px' }}>
                        <select
                          value={p.status}
                          onChange={e => alterarStatus(p.id, e.target.value)}
                          style={{ background: st.bg, color: st.color, border: 'none', borderRadius: 4, padding: '3px 8px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                        >
                          {Object.entries(STATUS_CORES).map(([k, v]) => (
                            <option key={k} value={k}>{v.label}</option>
                          ))}
                        </select>
                      </td>
                      <td style={{ padding: '12px 12px', fontSize: 13, fontWeight: 600 }}>
                        {p.valor_final ? `R$ ${Number(p.valor_final).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '—'}
                      </td>
                      <td style={{ padding: '12px 12px' }}>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button
                            onClick={() => router.push(`/escopo?id=${p.id}`)}
                            style={{ background: '#111', color: '#fff', border: 'none', borderRadius: 4, padding: '5px 10px', fontSize: 12, cursor: 'pointer' }}
                            title="Editar escopo"
                          >✏️ Editar</button>
                          <button
                            onClick={() => router.push(`/proposta?id=${p.id}`)}
                            style={{ background: '#fff', color: '#111', border: '1px solid #ccc', borderRadius: 4, padding: '5px 10px', fontSize: 12, cursor: 'pointer' }}
                            title="Ver proposta / PDF"
                          >📄 Proposta</button>
                          <button
                            onClick={() => duplicarProposta(p)}
                            style={{ background: '#fff', color: '#555', border: '1px solid #ccc', borderRadius: 4, padding: '5px 10px', fontSize: 12, cursor: 'pointer' }}
                            title="Duplicar"
                          >⧉ Duplicar</button>
                          <button
                            onClick={() => excluir(p.id)}
                            style={{ background: '#fff', color: '#c00', border: '1px solid #f5c6c6', borderRadius: 4, padding: '5px 10px', fontSize: 12, cursor: 'pointer' }}
                            title="Excluir"
                          >🗑</button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  )
}