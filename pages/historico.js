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
  const [busca, setBusca] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('')
  const [versoes, setVersoes] = useState({})
  const [showVersoes, setShowVersoes] = useState(null)

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

  async function carregarVersoes(propostaId) {
    if (showVersoes === propostaId) { setShowVersoes(null); return }
    const { data } = await supabase
      .from('proposal_versions')
      .select('*')
      .eq('proposal_id', propostaId)
      .order('versao', { ascending: false })
    setVersoes(prev => ({ ...prev, [propostaId]: data || [] }))
    setShowVersoes(propostaId)
  }

  async function restaurarVersao(propostaId, versao) {
    if (!confirm(`Restaurar versão ${versao.label}? A versão atual será salva antes.`)) return

    // Salva versão atual antes de restaurar
    const { data: propostaAtual } = await supabase.from('proposals').select('*').eq('id', propostaId).single()
    const { data: itensAtuais } = await supabase.from('proposal_items').select('*').eq('proposal_id', propostaId)
    await supabase.from('proposal_versions').insert([{
      proposal_id: propostaId,
      versao: propostaAtual.versao_atual || 1,
      label: `R${String(propostaAtual.versao_atual || 1).padStart(2,'0')} (antes de restaurar)`,
      snapshot: JSON.stringify({ proposta: propostaAtual, itens: itensAtuais }),
    }])

    // Restaura snapshot da versão escolhida
    const snap = typeof versao.snapshot === 'string' ? JSON.parse(versao.snapshot) : versao.snapshot
    const novaVersao = (propostaAtual.versao_atual || 1) + 1

    await supabase.from('proposals').update({
      ...snap.proposta,
      id: propostaId,
      versao_atual: novaVersao,
      updated_at: new Date().toISOString(),
    }).eq('id', propostaId)

    if (snap.itens?.length) {
      await supabase.from('proposal_items').delete().eq('proposal_id', propostaId)
      await supabase.from('proposal_items').insert(
        snap.itens.map(i => ({ ...i, id: undefined, proposal_id: propostaId }))
      )
    }

    alert(`Versão ${versao.label} restaurada! Agora na R${String(novaVersao).padStart(2,'0')}`)
    setShowVersoes(null)
    carregarPropostas()
    router.push(`/escopo?id=${propostaId}`)
  }

  async function novaPropostas() {
    const { data, error } = await supabase
      .from('proposals')
      .insert([{ status: 'rascunho', data: new Date().toISOString().split('T')[0], versao_atual: 1 }])
      .select()
    if (!error && data?.[0]) router.push(`/escopo?id=${data[0].id}`)
  }

  async function duplicarProposta(p) {
    const { data: nova } = await supabase.from('proposals').insert([{
      numero: null, data: new Date().toISOString().split('T')[0],
      negocio: p.negocio ? `[CÓPIA] ${p.negocio}` : '[CÓPIA]',
      status: 'rascunho', versao_atual: 1,
      cliente_nome: p.cliente_nome, cliente_endereco: p.cliente_endereco,
      cliente_cidade: p.cliente_cidade, cliente_contato: p.cliente_contato,
      cliente_email: p.cliente_email, frete: p.frete, validade: p.validade,
      prazo_entrega: p.prazo_entrega, impostos: p.impostos,
      cond_pagamento: p.cond_pagamento, faturamento: p.faturamento,
      area_m2: p.area_m2, tributos: p.tributos, desconto: p.desconto,
      taxa_imposto: p.taxa_imposto || 0,
    }]).select()
    if (nova?.[0]) {
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

  const propostasFiltradas = propostas.filter(p => {
    const matchBusca = !busca || [p.numero, p.negocio, p.cliente_nome].some(v => v?.toLowerCase().includes(busca.toLowerCase()))
    const matchStatus = !filtroStatus || p.status === filtroStatus
    return matchBusca && matchStatus
  })

  return (
    <Layout>
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700 }}>Propostas</h1>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="text" placeholder="Buscar por número, negócio ou cliente..."
              value={busca} onChange={e => setBusca(e.target.value)}
              style={{ border: '1px solid #ccc', borderRadius: 4, padding: '7px 12px', fontSize: 13, width: 280 }}
            />
            <select value={filtroStatus} onChange={e => setFiltroStatus(e.target.value)}
              style={{ border: '1px solid #ccc', borderRadius: 4, padding: '7px 10px', fontSize: 13, background: '#fff' }}>
              <option value="">Todos os status</option>
              {Object.entries(STATUS_CORES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
            <button className="btn-primary" onClick={novaPropostas}>+ Nova Proposta</button>
          </div>
        </div>

        {loading ? (
          <p style={{ color: '#888' }}>Carregando...</p>
        ) : propostasFiltradas.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 64, color: '#aaa' }}>
            <p style={{ fontSize: 16 }}>Nenhuma proposta encontrada.</p>
          </div>
        ) : (
          <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 8, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Número','Negócio / Cliente','Data','Versão','Status','Valor Final','Ações'].map(h => (
                    <th key={h} className="table-header">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {propostasFiltradas.map((p, i) => {
                  const st = STATUS_CORES[p.status] || STATUS_CORES.rascunho
                  return [
                    <tr key={p.id} style={{ borderBottom: '1px solid #eee', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                      <td style={{ padding: '12px 12px', fontSize: 13, fontWeight: 700 }}>{p.numero || '—'}</td>
                      <td style={{ padding: '12px 12px', fontSize: 13 }}>
                        <div style={{ fontWeight: 600 }}>{p.negocio || '(sem título)'}</div>
                        <div style={{ color: '#888', fontSize: 12 }}>{p.cliente_nome || ''}</div>
                      </td>
                      <td style={{ padding: '12px 12px', fontSize: 13 }}>
                        {p.data ? new Date(p.data + 'T00:00:00').toLocaleDateString('pt-BR') : '—'}
                      </td>
                      <td style={{ padding: '12px 12px', fontSize: 13, textAlign: 'center' }}>
                        <span style={{ background: '#e3f2fd', color: '#1565c0', borderRadius: 4, padding: '2px 8px', fontWeight: 700, fontSize: 12 }}>
                          R{String(p.versao_atual || 1).padStart(2,'0')}
                        </span>
                      </td>
                      <td style={{ padding: '12px 12px' }}>
                        <select value={p.status} onChange={e => alterarStatus(p.id, e.target.value)}
                          style={{ background: st.bg, color: st.color, border: 'none', borderRadius: 4, padding: '3px 8px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                          {Object.entries(STATUS_CORES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                        </select>
                      </td>
                      <td style={{ padding: '12px 12px', fontSize: 13, fontWeight: 600 }}>
                        {p.valor_final ? `R$ ${Number(p.valor_final).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '—'}
                      </td>
                      <td style={{ padding: '12px 12px' }}>
                        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                          <button onClick={() => router.push(`/escopo?id=${p.id}`)}
                            style={{ background: '#111', color: '#fff', border: 'none', borderRadius: 4, padding: '5px 8px', fontSize: 11, cursor: 'pointer' }}>✏️ Escopo</button>
                          <button onClick={() => router.push(`/proposta?id=${p.id}`)}
                            style={{ background: '#fff', color: '#111', border: '1px solid #ccc', borderRadius: 4, padding: '5px 8px', fontSize: 11, cursor: 'pointer' }}>📄 Proposta</button>
                          <button onClick={() => carregarVersoes(p.id)}
                            style={{ background: showVersoes === p.id ? '#1565c0' : '#fff', color: showVersoes === p.id ? '#fff' : '#1565c0', border: '1px solid #1565c0', borderRadius: 4, padding: '5px 8px', fontSize: 11, cursor: 'pointer' }}>🕓 Versões</button>
                          <button onClick={() => duplicarProposta(p)}
                            style={{ background: '#fff', color: '#555', border: '1px solid #ccc', borderRadius: 4, padding: '5px 8px', fontSize: 11, cursor: 'pointer' }}>⧉ Duplicar</button>
                          <button onClick={() => excluir(p.id)}
                            style={{ background: '#fff', color: '#c00', border: '1px solid #f5c6c6', borderRadius: 4, padding: '5px 8px', fontSize: 11, cursor: 'pointer' }}>🗑</button>
                        </div>
                      </td>
                    </tr>,
                    // Painel de versões
                    showVersoes === p.id && (
                      <tr key={`versoes-${p.id}`}>
                        <td colSpan={7} style={{ background: '#f0f7ff', padding: '12px 20px', borderBottom: '2px solid #1565c0' }}>
                          <p style={{ fontSize: 12, fontWeight: 700, color: '#1565c0', marginBottom: 8 }}>
                            🕓 HISTÓRICO DE VERSÕES — {p.negocio || 'Proposta'}
                          </p>
                          {!versoes[p.id]?.length ? (
                            <p style={{ fontSize: 12, color: '#888' }}>Nenhuma versão salva ainda. Use "📌 Salvar Versão" na tela de proposta para criar um checkpoint.</p>
                          ) : (
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                              <thead>
                                <tr style={{ background: '#e3f2fd' }}>
                                  <th style={{ padding: '6px 10px', textAlign: 'left' }}>Versão</th>
                                  <th style={{ padding: '6px 10px', textAlign: 'left' }}>Data</th>
                                  <th style={{ padding: '6px 10px', textAlign: 'left' }}>Valor</th>
                                  <th style={{ padding: '6px 10px', textAlign: 'left' }}>Ação</th>
                                </tr>
                              </thead>
                              <tbody>
                                {versoes[p.id].map(v => {
                                  const snap = typeof v.snapshot === 'string' ? JSON.parse(v.snapshot) : v.snapshot
                                  return (
                                    <tr key={v.id} style={{ borderBottom: '1px solid #ddd' }}>
                                      <td style={{ padding: '6px 10px', fontWeight: 700, color: '#1565c0' }}>{v.label}</td>
                                      <td style={{ padding: '6px 10px', color: '#666' }}>
                                        {new Date(v.created_at).toLocaleString('pt-BR')}
                                      </td>
                                      <td style={{ padding: '6px 10px' }}>
                                        {snap?.proposta?.valor_final
                                          ? `R$ ${Number(snap.proposta.valor_final).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                                          : '—'}
                                      </td>
                                      <td style={{ padding: '6px 10px' }}>
                                        <button onClick={() => restaurarVersao(p.id, v)}
                                          style={{ background: '#1565c0', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 10px', fontSize: 11, cursor: 'pointer' }}>
                                          ↩ Restaurar como base
                                        </button>
                                      </td>
                                    </tr>
                                  )
                                })}
                              </tbody>
                            </table>
                          )}
                        </td>
                      </tr>
                    )
                  ]
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  )
}