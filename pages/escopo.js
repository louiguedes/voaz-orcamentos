import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import { supabase } from '../lib/supabaseClient'
import { DISCIPLINAS } from '../data/escopo'

export default function Escopo() {
  const router = useRouter()
  const { id } = router.query

  const [proposta, setProposta] = useState(null)
  const [itens, setItens] = useState({})       // { cod: { checked, unidade, quantidade, opcional } }
  const [salvando, setSalvando] = useState(false)
  const [salvoOk, setSalvoOk] = useState(false)
  const [busca, setBusca] = useState('')
  const [abaExpandida, setAbaExpandida] = useState({})

  useEffect(() => {
    if (!sessionStorage.getItem('voaz_auth')) { router.push('/'); return }
  }, [])

  useEffect(() => {
    if (!id) return
    carregarDados()
  }, [id])

  async function carregarDados() {
    const { data: p } = await supabase.from('proposals').select('*').eq('id', id).single()
    if (p) setProposta(p)

    const { data: dbItens } = await supabase.from('proposal_items').select('*').eq('proposal_id', id)
    const mapa = {}
    if (dbItens) {
      dbItens.forEach(i => {
        mapa[i.codigo] = { checked: i.checked, unidade: i.unidade || '', quantidade: i.quantidade || '', opcional: i.opcional || false }
      })
    }
    // inicializa itens não salvos com defaults
    DISCIPLINAS.forEach(d => d.grupos.forEach(g => g.itens.forEach(item => {
      if (!mapa[item.cod]) mapa[item.cod] = { checked: false, unidade: item.unid || '', quantidade: '', opcional: false }
    })))
    setItens(mapa)
    // expande todas por padrão
    const exp = {}
    DISCIPLINAS.forEach(d => { exp[d.id] = true })
    setAbaExpandida(exp)
  }

  function toggleItem(cod, unidPadrao) {
    setItens(prev => ({
      ...prev,
      [cod]: { ...prev[cod], checked: !prev[cod]?.checked, unidade: prev[cod]?.unidade || unidPadrao || '' }
    }))
  }

  function updateItem(cod, campo, valor) {
    setItens(prev => ({ ...prev, [cod]: { ...prev[cod], [campo]: valor } }))
  }

  async function salvarRascunho() {
    setSalvando(true)
    const upserts = []
    DISCIPLINAS.forEach(d => d.grupos.forEach(g => g.itens.forEach(item => {
      const v = itens[item.cod] || {}
      upserts.push({
        proposal_id: id,
        codigo: item.cod,
        checked: v.checked || false,
        unidade: v.unidade || item.unid,
        quantidade: v.quantidade ? parseFloat(v.quantidade) : null,
        opcional: v.opcional || false,
        desc_custom: v.desc_custom || null,
        custo_unitario: 0,
        margem: 0,
      })
    })))

    // deleta antigos e insere novos (upsert via delete+insert para simplicidade)
    await supabase.from('proposal_items').delete().eq('proposal_id', id)
    await supabase.from('proposal_items').insert(upserts)
    setSalvando(false)
    setSalvoOk(true)
    setTimeout(() => setSalvoOk(false), 2500)
  }

  function selecionarDisciplina(discId, valor) {
    const disc = DISCIPLINAS.find(d => d.id === discId)
    if (!disc) return
    setItens(prev => {
      const novo = { ...prev }
      disc.grupos.forEach(g => g.itens.forEach(item => {
        novo[item.cod] = { ...novo[item.cod], checked: valor, unidade: novo[item.cod]?.unidade || item.unid }
      }))
      return novo
    })
  }

  const disciplinasFiltradas = busca.trim()
    ? DISCIPLINAS.map(d => ({
        ...d,
        grupos: d.grupos.map(g => ({
          ...g,
          itens: g.itens.filter(i => i.desc.toLowerCase().includes(busca.toLowerCase()) || i.cod.includes(busca))
        })).filter(g => g.itens.length > 0)
      })).filter(d => d.grupos.length > 0)
    : DISCIPLINAS

  const totalSelecionados = Object.values(itens).filter(v => v.checked).length

  return (
    <Layout propostaId={id}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px 16px' }}>
        {/* Cabeçalho */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 2 }}>
              Escopo — {proposta?.negocio || 'Nova Proposta'}
            </h1>
            <p style={{ fontSize: 13, color: '#888' }}>{totalSelecionados} itens selecionados</p>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Buscar item..."
              value={busca}
              onChange={e => setBusca(e.target.value)}
              style={{ border: '1px solid #ccc', borderRadius: 4, padding: '7px 12px', fontSize: 13, width: 240 }}
            />
            {salvoOk && <span style={{ color: 'green', fontSize: 13, fontWeight: 600 }}>✓ Salvo!</span>}
            <button
              className="btn-secondary"
              onClick={() => router.push(`/proposta?id=${id}`)}
            >Ver Proposta →</button>
            <button
              className="btn-primary"
              onClick={salvarRascunho}
              disabled={salvando}
            >{salvando ? 'Salvando...' : '💾 Salvar Rascunho'}</button>
          </div>
        </div>

        {/* Tabela */}
        <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 8, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
            <colgroup>
              <col style={{ width: 40 }} />
              <col style={{ width: 110 }} />
              <col />
              <col style={{ width: 80 }} />
              <col style={{ width: 110 }} />
              <col style={{ width: 90 }} />
            </colgroup>
            <thead>
              <tr>
                <th className="table-header" style={{ textAlign: 'center' }}>✓</th>
                <th className="table-header">Código</th>
                <th className="table-header">Descrição</th>
                <th className="table-header">Unidade</th>
                <th className="table-header">Quantidade</th>
                <th className="table-header">Opcional</th>
              </tr>
            </thead>
            <tbody>
              {disciplinasFiltradas.map(disc => {
                const totDisc = disc.grupos.reduce((a, g) => a + g.itens.length, 0)
                const selDisc = disc.grupos.reduce((a, g) => a + g.itens.filter(i => itens[i.cod]?.checked).length, 0)
                return [
                  // Cabeçalho disciplina
                  <tr key={`disc-${disc.id}`}>
                    <td colSpan={6} style={{ background: '#1a1a1a', color: '#fff', padding: '8px 12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <button
                          onClick={() => setAbaExpandida(p => ({ ...p, [disc.id]: !p[disc.id] }))}
                          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 12, padding: 0 }}
                        >{abaExpandida[disc.id] ? '▼' : '▶'}</button>
                        <span style={{ fontWeight: 700, fontSize: 13 }}>{disc.id.padStart(2,'0')}. {disc.nome}</span>
                        <span style={{ fontSize: 11, color: '#aaa', marginLeft: 'auto' }}>{selDisc}/{totDisc} selecionados</span>
                        <button
                          onClick={() => selecionarDisciplina(disc.id, true)}
                          style={{ fontSize: 11, color: '#aaa', background: 'none', border: '1px solid #555', borderRadius: 3, padding: '2px 6px', cursor: 'pointer' }}
                        >Todos</button>
                        <button
                          onClick={() => selecionarDisciplina(disc.id, false)}
                          style={{ fontSize: 11, color: '#aaa', background: 'none', border: '1px solid #555', borderRadius: 3, padding: '2px 6px', cursor: 'pointer' }}
                        >Nenhum</button>
                      </div>
                    </td>
                  </tr>,
                  // Grupos e itens
                  ...(abaExpandida[disc.id] ? disc.grupos.flatMap(g => [
                    <tr key={`grupo-${g.id}`}>
                      <td colSpan={6} className="group-header">{g.id} {g.nome}</td>
                    </tr>,
                    ...g.itens.map((item, idx) => {
                      const v = itens[item.cod] || {}
                      return (
                        <tr key={item.cod} style={{ background: idx % 2 === 0 ? '#fff' : '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
                          <td style={{ textAlign: 'center', padding: '6px 4px' }}>
                            <input
                              type="checkbox"
                              checked={v.checked || false}
                              onChange={() => toggleItem(item.cod, item.unid)}
                              style={{ width: 16, height: 16, cursor: 'pointer', accentColor: '#111' }}
                            />
                          </td>
                          <td style={{ padding: '6px 8px', fontSize: 11, color: '#888', fontFamily: 'monospace' }}>{item.cod}</td>
                          <td style={{ padding: '6px 8px', fontSize: 12, color: v.checked ? '#111' : '#999', lineHeight: 1.4 }}>
                            {item.desc.includes('ITENS DIVERSOS') ? (
                              <div>
                                <span style={{ fontSize: 11, fontWeight: 700, color: v.checked ? '#555' : '#bbb' }}>ITENS DIVERSOS — </span>
                                <input
                                  type="text"
                                  value={v.desc_custom || ''}
                                  onChange={e => updateItem(item.cod, 'desc_custom', e.target.value)}
                                  disabled={!v.checked}
                                  placeholder="Descreva o item aqui..."
                                  style={{ border: '1px solid #ddd', borderRadius: 3, padding: '2px 6px', fontSize: 12, width: '75%', background: v.checked ? '#fffef0' : '#f5f5f5' }}
                                />
                              </div>
                            ) : item.desc}
                          </td>
                          <td style={{ padding: '6px 8px' }}>
                            <input
                              type="text"
                              value={v.unidade || ''}
                              onChange={e => updateItem(item.cod, 'unidade', e.target.value)}
                              disabled={!v.checked}
                              style={{ width: '100%', border: '1px solid #ddd', borderRadius: 3, padding: '3px 6px', fontSize: 12, background: v.checked ? '#fff' : '#f5f5f5' }}
                            />
                          </td>
                          <td style={{ padding: '6px 8px' }}>
                            <input
                              type="number"
                              value={v.quantidade || ''}
                              onChange={e => updateItem(item.cod, 'quantidade', e.target.value)}
                              disabled={!v.checked}
                              step="any"
                              placeholder="0"
                              style={{ width: '100%', border: '1px solid #ddd', borderRadius: 3, padding: '3px 6px', fontSize: 12, background: v.checked ? '#fff' : '#f5f5f5', textAlign: 'right' }}
                            />
                          </td>
                          <td style={{ padding: '6px 8px', textAlign: 'center' }}>
                            <input
                              type="checkbox"
                              checked={v.opcional || false}
                              onChange={() => updateItem(item.cod, 'opcional', !v.opcional)}
                              disabled={!v.checked}
                              style={{ width: 14, height: 14, accentColor: '#555' }}
                              title="Marcar como opcional (+OPCIONAL)"
                            />
                          </td>
                        </tr>
                      )
                    })
                  ]) : [])
                ]
              })}
            </tbody>
          </table>
        </div>

        {/* Botão salvar fixo no bottom */}
        <div style={{ position: 'sticky', bottom: 16, marginTop: 16, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          {salvoOk && <span style={{ background: '#e8f5e9', color: '#1b5e20', padding: '10px 16px', borderRadius: 6, fontSize: 13, fontWeight: 600 }}>✓ Rascunho salvo com sucesso!</span>}
          <button className="btn-primary" onClick={salvarRascunho} disabled={salvando}
            style={{ padding: '10px 24px', fontSize: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
            {salvando ? 'Salvando...' : '💾 Salvar Rascunho'}
          </button>
        </div>
      </div>
    </Layout>
  )
}