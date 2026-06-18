import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import { supabase } from '../lib/supabaseClient'
import { DISCIPLINAS } from '../data/escopo'
import { gerarPDF } from '../components/PDFTemplate'

// Input que só atualiza no onBlur — evita re-render a cada tecla
function InputField({ value, onChange, type = 'text', placeholder, style, tabIndex }) {
  const [local, setLocal] = useState(value ?? '')
  useEffect(() => { setLocal(value ?? '') }, [value])
  return (
    <input
      type={type}
      value={local}
      onChange={e => setLocal(e.target.value)}
      onBlur={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={style}
      tabIndex={tabIndex}
    />
  )
}

// Select que não causa re-render — usa ref
function SelectFaturamento({ value, onChange }) {
  const ref = useRef(null)
  useEffect(() => { if (ref.current) ref.current.value = value || 'direto' }, [value])
  return (
    <select
      ref={ref}
      defaultValue={value || 'direto'}
      onBlur={e => onChange(e.target.value)}
      style={{ fontSize: 11, border: '1px solid #ddd', borderRadius: 3, padding: '2px 4px', background: value === 'indireto' ? '#fff3e0' : '#f5f5f5' }}
    >
      <option value="direto">Direto</option>
      <option value="indireto">Indireto</option>
    </select>
  )
}

// Margem da disciplina com estado local isolado e sem re-render no pai
const MargemDisciplinaInput = ({ discId, onAplicar }) => {
  const inputRef = useRef(null)
  function handleAplicar(e) {
    e.preventDefault()
    e.stopPropagation()
    const val = inputRef.current?.value
    if (val) onAplicar(val)
  }
  return (
    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}
      onClick={e => e.stopPropagation()}>
      <span style={{ fontSize: 11, color: '#aaa' }}>Margem da disciplina:</span>
      <input
        ref={inputRef}
        type="number"
        placeholder="0"
        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAplicar(e) } }}
        style={{ width: 60, border: 'none', borderRadius: 3, padding: '3px 6px', fontSize: 12, textAlign: 'right' }}
      />
      <span style={{ fontSize: 11, color: '#aaa' }}>%</span>
      <button
        onClick={handleAplicar}
        style={{ background: '#4caf50', color: '#fff', border: 'none', borderRadius: 3, padding: '3px 8px', fontSize: 11, cursor: 'pointer', fontWeight: 700 }}
      >Aplicar</button>
    </div>
  )
}

// Dropdown com opções predefinidas + campo livre
function DropdownField({ value, onChange, opcoes, label, campo }) {
  const [modoLivre, setModoLivre] = useState(false)
  const [local, setLocal] = useState(value || '')
  const [novaOpcao, setNovaOpcao] = useState('')
  const [showGerenciar, setShowGerenciar] = useState(false)
  const [listaOpcoes, setListaOpcoes] = useState(opcoes)

  useEffect(() => { setLocal(value || '') }, [value])
  useEffect(() => { setListaOpcoes(opcoes) }, [opcoes])

  const opcaoCustom = local !== '' && !listaOpcoes.includes(local)

  async function adicionarOpcao() {
    if (!novaOpcao.trim()) return
    await supabase.from('opcoes_padrao').insert([{ tipo: campo, valor: novaOpcao.trim(), ordem: listaOpcoes.length + 1 }])
    setListaOpcoes(prev => [...prev, novaOpcao.trim()])
    setNovaOpcao('')
  }

  async function removerOpcao(opcao) {
    await supabase.from('opcoes_padrao').delete().eq('tipo', campo).eq('valor', opcao)
    setListaOpcoes(prev => prev.filter(o => o !== opcao))
  }

  return (
    <div>
      <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#555', marginBottom: 4, textTransform: 'uppercase' }}>{label}</label>
      {!modoLivre ? (
        <div style={{ display: 'flex', gap: 6 }}>
          <select
            value={opcaoCustom ? '__custom__' : local}
            onChange={e => {
              if (e.target.value === '__custom__') { setModoLivre(true); return }
              setLocal(e.target.value)
              onChange(e.target.value)
            }}
            style={{ flex: 1, border: '1px solid #ccc', borderRadius: 4, padding: '7px 10px', fontSize: 13, background: '#fff' }}
          >
            <option value="">Selecione...</option>
            {listaOpcoes.map(o => <option key={o} value={o}>{o}</option>)}
            {opcaoCustom && <option value={local}>{local}</option>}
            <option value="__custom__">✏️ Digitar livremente...</option>
          </select>
          <button onClick={() => setShowGerenciar(!showGerenciar)}
            style={{ background: '#f0f0f0', border: '1px solid #ccc', borderRadius: 4, padding: '7px 10px', fontSize: 11, cursor: 'pointer' }}
            title="Gerenciar opções">⚙️</button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 6 }}>
          <InputField value={local} onChange={v => { setLocal(v); onChange(v) }}
            style={{ flex: 1, border: '1px solid #ccc', borderRadius: 4, padding: '7px 10px', fontSize: 13, boxSizing: 'border-box' }} />
          <button onClick={() => setModoLivre(false)}
            style={{ background: '#f0f0f0', border: '1px solid #ccc', borderRadius: 4, padding: '7px 10px', fontSize: 11, cursor: 'pointer' }}>↩</button>
        </div>
      )}
      {showGerenciar && (
        <div style={{ marginTop: 8, background: '#f9f9f9', border: '1px solid #ddd', borderRadius: 6, padding: 12 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#555', marginBottom: 8 }}>GERENCIAR OPÇÕES</p>
          {listaOpcoes.map(o => (
            <div key={o} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0', borderBottom: '1px solid #eee', fontSize: 12 }}>
              <span>{o}</span>
              <button onClick={() => removerOpcao(o)}
                style={{ background: 'none', border: 'none', color: '#c00', cursor: 'pointer', fontSize: 12 }}>✕</button>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
            <input value={novaOpcao} onChange={e => setNovaOpcao(e.target.value)}
              placeholder="Nova opção..."
              style={{ flex: 1, border: '1px solid #ccc', borderRadius: 4, padding: '5px 8px', fontSize: 12 }}
              onKeyDown={e => e.key === 'Enter' && adicionarOpcao()} />
            <button onClick={adicionarOpcao}
              style={{ background: '#111', color: '#fff', border: 'none', borderRadius: 4, padding: '5px 10px', fontSize: 12, cursor: 'pointer' }}>+ Adicionar</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Proposta() {
  const router = useRouter()
  const { id } = router.query

  const [proposta, setProposta] = useState({
    numero: '', data: new Date().toISOString().split('T')[0], negocio: '',
    cliente_nome: '', cliente_endereco: '', cliente_cidade: '', cliente_contato: '', cliente_email: '',
    frete: 'INCLUSO NA PROPOSTA', validade: '20 DIAS',
    prazo_entrega: '60 DIAS CORRIDOS DE OBRA A PARTIR DO PAGAMENTO DO SINAL E INÍCIO DA OBRA',
    impostos: 'INCLUSO NA PROPOSTA',
    cond_pagamento: '40% SINAL + 50% 30 DIAS + 10% NO ACEITE DA OBRA (15DDF)',
    faturamento: 'DIRETO DE FORNECEDORES + SALDO PELA VOAZ',
    area_m2: 0, tributos: 0, desconto: 0, desconto_pct: 0,
    taxa_imposto: 0, versao_atual: 1,
  })
  const [itens, setItens] = useState([])
  const [salvando, setSalvando] = useState(false)
  const [salvoOk, setSalvoOk] = useState(false)
  const [gerandoPDF, setGerandoPDF] = useState(false)
  const [opcoes, setOpcoes] = useState({ frete: [], prazo_entrega: [], cond_pagamento: [] })

  useEffect(() => {
    if (!sessionStorage.getItem('voaz_auth')) { router.push('/'); return }
  }, [])

  useEffect(() => {
    if (!id) return
    carregarDados()
    carregarOpcoes()
  }, [id])

  async function carregarOpcoes() {
    const { data } = await supabase.from('opcoes_padrao').select('*').order('ordem')
    if (data) {
      setOpcoes({
        frete: data.filter(o => o.tipo === 'frete').map(o => o.valor),
        prazo_entrega: data.filter(o => o.tipo === 'prazo_entrega').map(o => o.valor),
        cond_pagamento: data.filter(o => o.tipo === 'cond_pagamento').map(o => o.valor),
      })
    }
  }

  async function carregarDados() {
    const { data: p } = await supabase.from('proposals').select('*').eq('id', id).single()
    if (p) setProposta(p)
    const { data: dbItens } = await supabase.from('proposal_items').select('*').eq('proposal_id', id).eq('checked', true)
    if (dbItens) {
      const enriquecidos = dbItens.map(di => {
        let desc = '', discNome = '', discId = ''
        for (const d of DISCIPLINAS) {
          for (const g of d.grupos) {
            const found = g.itens.find(i => i.cod === di.codigo)
            if (found) { desc = found.desc; discNome = d.nome; discId = d.id }
          }
        }
        return {
          ...di, desc, discNome, discId,
          custo_unitario: di.custo_unitario || 0,
          margem: di.margem || 0,
          faturamento: di.faturamento || 'direto',
          margem_override: di.margem_override || false,
          desc_complementar: di.desc_complementar || '',
        }
      })
      setItens(enriquecidos)
    }
  }

  function updateProposta(campo, valor) {
    setProposta(prev => ({ ...prev, [campo]: valor }))
  }

  function updateItem(idx, campo, valor) {
    setItens(prev => {
      const novo = [...prev]
      novo[idx] = { ...novo[idx], [campo]: valor }
      if (campo === 'custo_unitario' || campo === 'margem') {
        novo[idx].margem_override = true
      }
      return novo
    })
  }

  function aplicarMargemDisciplina(discId, margem) {
    if (!margem) return
    setItens(prev => prev.map(item => {
      if (item.discId === discId && !item.margem_override) {
        return { ...item, margem: parseFloat(margem) || 0 }
      }
      return item
    }))
  }

  function resetarMargemItem(idx, discId) {
    setItens(prev => {
      const novo = [...prev]
      novo[idx] = { ...novo[idx], margem_override: false }
      return novo
    })
  }

  // Cálculos
  function precoVenda(item) {
    const c = parseFloat(item.custo_unitario) || 0
    const m = parseFloat(item.margem) || 0
    return c * (1 + m / 100)
  }

  function totalItem(item) {
    return precoVenda(item) * (parseFloat(item.quantidade) || 0)
  }

  function impostoItem(item) {
    if (item.faturamento !== 'indireto') return 0
    const taxa = parseFloat(proposta.taxa_imposto) || 0
    return totalItem(item) * (taxa / 100)
  }

  const resumoPorDisc = DISCIPLINAS.map(d => {
    const discItens = itens.filter(i => i.discId === d.id)
    const total = discItens.reduce((s, i) => s + totalItem(i), 0)
    const totalOpcional = discItens.filter(i => i.opcional).reduce((s, i) => s + totalItem(i), 0)
    const totalImposto = discItens.reduce((s, i) => s + impostoItem(i), 0)
    return { ...d, total, totalOpcional, totalImposto, temItens: discItens.length > 0 }
  }).filter(d => d.temItens)

  const totalSemImpostos = resumoPorDisc.reduce((s, d) => s + d.total, 0)
  const totalImpostoCalculado = resumoPorDisc.reduce((s, d) => s + d.totalImposto, 0)
  const desconto = parseFloat(proposta.desconto) || 0
  const valorFinal = totalSemImpostos + totalImpostoCalculado - desconto
  const areM2 = parseFloat(proposta.area_m2) || 0

  const fmt = v => v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  async function salvarProposta() {
    setSalvando(true)
    await supabase.from('proposals').update({
      ...proposta,
      valor_final: valorFinal,
      area_m2: areM2,
      tributos: totalImpostoCalculado,
      desconto,
      taxa_imposto: parseFloat(proposta.taxa_imposto) || 0,
    }).eq('id', id)
    for (const item of itens) {
      await supabase.from('proposal_items').update({
        custo_unitario: parseFloat(item.custo_unitario) || 0,
        margem: parseFloat(item.margem) || 0,
        faturamento: item.faturamento || 'direto',
        margem_override: item.margem_override || false,
      }).eq('id', item.id)
    }
    setSalvando(false)
    setSalvoOk(true)
    setTimeout(() => setSalvoOk(false), 2500)
  }

  async function salvarVersao() {
    setSalvando(true)
    // Primeiro salva tudo no banco incluindo valor_final
    await supabase.from('proposals').update({
      ...proposta,
      valor_final: valorFinal,
      area_m2: areM2,
      tributos: totalImpostoCalculado,
      desconto,
      taxa_imposto: parseFloat(proposta.taxa_imposto) || 0,
    }).eq('id', id)
    for (const item of itens) {
      await supabase.from('proposal_items').update({
        custo_unitario: parseFloat(item.custo_unitario) || 0,
        margem: parseFloat(item.margem) || 0,
        faturamento: item.faturamento || 'direto',
        margem_override: item.margem_override || false,
      }).eq('id', item.id)
    }
    // Agora busca os dados já salvos para o snapshot
    const { data: propostaAtualizada } = await supabase.from('proposals').select('*').eq('id', id).single()
    const { data: itensAtuais } = await supabase.from('proposal_items').select('*').eq('proposal_id', id)
    const versaoAtual = propostaAtualizada.versao_atual || 1
    const novaVersao = versaoAtual + 1
    await supabase.from('proposal_versions').insert([{
      proposal_id: id,
      versao: versaoAtual,
      label: `R${String(versaoAtual).padStart(2,'0')}`,
      snapshot: JSON.stringify({ proposta: propostaAtualizada, itens: itensAtuais }),
    }])
    await supabase.from('proposals').update({ versao_atual: novaVersao }).eq('id', id)
    updateProposta('versao_atual', novaVersao)
    setSalvando(false)
    setSalvoOk(true)
    setTimeout(() => setSalvoOk(false), 2500)
    alert(`✅ Versão R${String(versaoAtual).padStart(2,'0')} salva! Agora editando R${String(novaVersao).padStart(2,'0')}`)
  }

  async function handleGerarPDF() {
    await salvarProposta()
    setGerandoPDF(true)
    setTimeout(() => {
      gerarPDF({ proposta, itens, resumoPorDisc, totalSemImpostos, tributos: totalImpostoCalculado, desconto, valorFinal, areM2, DISCIPLINAS, precoVenda, totalItem, fmt })
      setGerandoPDF(false)
    }, 300)
  }

  async function exportarXLSX() {
    const { utils, writeFile } = await import('xlsx')
    const wb = utils.book_new()
    const resumoData = [
      ['VOAZ ORÇAMENTOS', '', '', ''],
      ['Proposta:', proposta.numero, 'Data:', proposta.data],
      ['Negócio:', proposta.negocio, '', ''],
      ['Cliente:', proposta.cliente_nome, '', ''],
      ['', '', '', ''],
      ['RESUMO FINANCEIRO', '', '', ''],
      ['Disciplina', 'Valor Total', '(%)', '+Opcional'],
      ...resumoPorDisc.map(d => [
        `${d.id.padStart(2,'0')}. ${d.nome}`,
        d.total,
        totalSemImpostos ? ((d.total / totalSemImpostos) * 100).toFixed(1) + '%' : '-',
        d.totalOpcional || 0,
      ]),
      ['', '', '', ''],
      ['VALOR TOTAL SEM IMPOSTOS', totalSemImpostos, '', ''],
      ['TRIBUTOS', totalImpostoCalculado, '', ''],
      ['DESCONTO COMERCIAL', desconto, '', ''],
      ['VALOR FINAL', valorFinal, '', ''],
    ]
    const wsResumo = utils.aoa_to_sheet(resumoData)
    utils.book_append_sheet(wb, wsResumo, 'Resumo')
    const escopoData = [
      ['Código', 'Disciplina', 'Descrição', 'Complemento', 'Unidade', 'Quantidade', 'Custo Unit.', 'Margem %', 'Preço Venda Unit.', 'Valor Total', 'Faturamento', 'Opcional'],
      ...itens.map(item => [
        item.codigo, item.discNome, item.desc_custom || item.desc,
        item.desc_complementar || '', item.unidade, item.quantidade,
        parseFloat(item.custo_unitario) || 0, parseFloat(item.margem) || 0,
        precoVenda(item), totalItem(item), item.faturamento, item.opcional ? 'Sim' : 'Não',
      ])
    ]
    const wsEscopo = utils.aoa_to_sheet(escopoData)
    utils.book_append_sheet(wb, wsEscopo, 'Escopo')
    writeFile(wb, `VOAZ_${proposta.numero || 'SN'}_${(proposta.cliente_nome || 'Proposta').replace(/[^a-zA-Z0-9]/g, '_')}.xlsx`)
  }

  const Section = ({ titulo, children }) => (
    <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 8, marginBottom: 20, overflow: 'hidden' }}>
      <div style={{ background: '#1a1a1a', color: '#fff', padding: '8px 16px', fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>{titulo}</div>
      <div style={{ padding: 20 }}>{children}</div>
    </div>
  )

  const Field = ({ label, campo, type = 'text', full = false, tabIndex }) => (
    <div style={{ marginBottom: 14, gridColumn: full ? '1/-1' : undefined }}>
      <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#555', marginBottom: 4, textTransform: 'uppercase' }}>{label}</label>
      <InputField type={type} value={proposta[campo] || ''} onChange={v => updateProposta(campo, v)}
        tabIndex={tabIndex}
        style={{ width: '100%', border: '1px solid #ccc', borderRadius: 4, padding: '7px 10px', fontSize: 13, boxSizing: 'border-box' }} />
    </div>
  )

  return (
    <Layout propostaId={id}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 16px' }}>
        {/* Topo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700 }}>Proposta Comercial</h1>
            <span style={{ fontSize: 12, color: '#888' }}>Versão R{String(proposta.versao_atual || 1).padStart(2,'0')}</span>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            {salvoOk && <span style={{ color: 'green', fontSize: 13, fontWeight: 600 }}>✓ Salvo!</span>}
            <button className="btn-secondary" onClick={() => router.push(`/escopo?id=${id}`)}>← Editar Escopo</button>
            <button className="btn-secondary" onClick={salvarProposta} disabled={salvando}>{salvando ? 'Salvando...' : '💾 Salvar Rascunho'}</button>
            <button onClick={salvarVersao}
              style={{ background: '#1565c0', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
              📌 Salvar Versão
            </button>
            <button className="btn-secondary" onClick={exportarXLSX}>📊 Exportar XLSX</button>
            <button onClick={handleGerarPDF} disabled={gerandoPDF}
              style={{ background: '#c00', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
              {gerandoPDF ? 'Gerando...' : '📄 Gerar PDF'}
            </button>
          </div>
        </div>

        <Section titulo="PROPOSTA COMERCIAL">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: 16 }}>
            <Field label="Número" campo="numero" tabIndex={1} />
            <Field label="Data" campo="data" type="date" tabIndex={2} />
            <Field label="Negócio / Título" campo="negocio" tabIndex={3} />
          </div>
        </Section>

        <Section titulo="DADOS DO CLIENTE">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ gridColumn: '1/-1' }}><Field label="Nome" campo="cliente_nome" tabIndex={4} /></div>
            <Field label="Endereço" campo="cliente_endereco" tabIndex={5} />
            <Field label="Cidade" campo="cliente_cidade" tabIndex={6} />
            <Field label="Contato" campo="cliente_contato" tabIndex={7} />
            <Field label="E-mail" campo="cliente_email" tabIndex={8} />
          </div>
        </Section>

        <Section titulo="CONDIÇÕES DE FORNECIMENTO">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <DropdownField label="Frete" campo="frete" value={proposta.frete} onChange={v => updateProposta('frete', v)} opcoes={opcoes.frete} />
            <Field label="Validade" campo="validade" tabIndex={10} />
            <div style={{ gridColumn: '1/-1' }}>
              <DropdownField label="Prazo de Entrega" campo="prazo_entrega" value={proposta.prazo_entrega} onChange={v => updateProposta('prazo_entrega', v)} opcoes={opcoes.prazo_entrega} />
            </div>
          </div>
        </Section>

        <Section titulo="CONDIÇÕES FINANCEIRAS">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field label="Impostos" campo="impostos" tabIndex={11} />
            <div style={{ gridColumn: '1/-1' }}>
              <DropdownField label="Cond. Pagamento" campo="cond_pagamento" value={proposta.cond_pagamento} onChange={v => updateProposta('cond_pagamento', v)} opcoes={opcoes.cond_pagamento} />
            </div>
            <div style={{ gridColumn: '1/-1' }}>
              <Field label="Faturamento" campo="faturamento" tabIndex={13} />
            </div>
          </div>
        </Section>

        <Section titulo="RESUMO FINANCEIRO">
          {resumoPorDisc.length === 0 ? (
            <p style={{ color: '#999', fontSize: 13 }}>Nenhum item selecionado. <a href={`/escopo?id=${id}`} style={{ color: '#111' }}>→ Ir para o Escopo</a></p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead style={{ position: 'sticky', top: 0, zIndex: 5 }}>
                <tr style={{ background: '#f0f0f0' }}>
                  <th style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 700 }}>Disciplina</th>
                  <th style={{ padding: '8px 10px', textAlign: 'right', fontWeight: 700, width: 160 }}>Valor Total</th>
                  <th style={{ padding: '8px 10px', textAlign: 'right', fontWeight: 700, width: 80 }}>(%)</th>
                  <th style={{ padding: '8px 10px', textAlign: 'right', fontWeight: 700, width: 130 }}>+Opcional</th>
                  <th style={{ padding: '8px 10px', textAlign: 'right', fontWeight: 700, width: 130 }}>Impostos</th>
                </tr>
              </thead>
              <tbody>
                {resumoPorDisc.map((d, i) => (
                  <tr key={d.id} style={{ borderBottom: '1px solid #eee', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                    <td style={{ padding: '7px 10px' }}>{d.id.padStart(2,'0')}. {d.nome}</td>
                    <td style={{ padding: '7px 10px', textAlign: 'right', fontWeight: 600 }}>R$ {fmt(d.total)}</td>
                    <td style={{ padding: '7px 10px', textAlign: 'right', color: '#888' }}>
                      {totalSemImpostos ? ((d.total / totalSemImpostos) * 100).toFixed(1) + '%' : '-'}
                    </td>
                    <td style={{ padding: '7px 10px', textAlign: 'right', color: '#555' }}>
                      {d.totalOpcional > 0 ? `R$ ${fmt(d.totalOpcional)}` : '-'}
                    </td>
                    <td style={{ padding: '7px 10px', textAlign: 'right', color: '#c00' }}>
                      {d.totalImposto > 0 ? `R$ ${fmt(d.totalImposto)}` : '-'}
                    </td>
                  </tr>
                ))}
                <tr style={{ background: '#1a1a1a', color: '#fff', fontWeight: 700 }}>
                  <td style={{ padding: '8px 10px' }}>VALOR TOTAL SEM IMPOSTOS</td>
                  <td style={{ padding: '8px 10px', textAlign: 'right' }}>R$ {fmt(totalSemImpostos)}</td>
                  <td colSpan={3}></td>
                </tr>
              </tbody>
            </table>
          )}

          <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#555', marginBottom: 4 }}>TAXA IMPOSTO (%)</label>
              <InputField type="number" value={proposta.taxa_imposto || ''}
                onChange={v => updateProposta('taxa_imposto', v)}
                style={{ width: '100%', border: '1px solid #ccc', borderRadius: 4, padding: '7px 10px', fontSize: 13, boxSizing: 'border-box', textAlign: 'right' }} />
              <div style={{ fontSize: 11, color: '#c00', marginTop: 2 }}>Calculado: R$ {fmt(totalImpostoCalculado)}</div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#555', marginBottom: 4 }}>DESCONTO (R$)</label>
              <InputField type="number" value={proposta.desconto || ''}
                onChange={v => {
                  updateProposta('desconto', v)
                  if (totalSemImpostos > 0) updateProposta('desconto_pct', ((parseFloat(v) / totalSemImpostos) * 100).toFixed(2))
                }}
                style={{ width: '100%', border: '1px solid #ccc', borderRadius: 4, padding: '7px 10px', fontSize: 13, boxSizing: 'border-box', textAlign: 'right' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#555', marginBottom: 4 }}>DESCONTO (%)</label>
              <InputField type="number" value={proposta.desconto_pct || ''}
                onChange={v => {
                  updateProposta('desconto_pct', v)
                  updateProposta('desconto', ((parseFloat(v) / 100) * totalSemImpostos).toFixed(2))
                }}
                style={{ width: '100%', border: '1px solid #ccc', borderRadius: 4, padding: '7px 10px', fontSize: 13, boxSizing: 'border-box', textAlign: 'right' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#555', marginBottom: 4 }}>ÁREA (m²)</label>
              <InputField type="number" value={proposta.area_m2 || ''}
                onChange={v => updateProposta('area_m2', v)}
                style={{ width: '100%', border: '1px solid #ccc', borderRadius: 4, padding: '7px 10px', fontSize: 13, boxSizing: 'border-box', textAlign: 'right' }} />
            </div>
            <div style={{ background: '#1a1a1a', color: '#fff', borderRadius: 6, padding: '10px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: 11, color: '#aaa', fontWeight: 700 }}>VALOR FINAL</div>
              <div style={{ fontSize: 18, fontWeight: 700, marginTop: 2 }}>R$ {fmt(valorFinal)}</div>
              {areM2 > 0 && <div style={{ fontSize: 11, color: '#bbb', marginTop: 4 }}>R$ {fmt(valorFinal / areM2)}/m²</div>}
            </div>
          </div>
        </Section>

        <Section titulo="ESCOPO DETALHADO — PRECIFICAÇÃO">
          {itens.length === 0 ? (
            <p style={{ color: '#999', fontSize: 13 }}>Nenhum item selecionado.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <thead style={{ position: 'sticky', top: 0, zIndex: 5 }}>
                  <tr style={{ background: '#f0f0f0' }}>
                    <th style={{ padding: '8px', textAlign: 'left', width: 100 }}>Código</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Descrição</th>
                    <th style={{ padding: '8px', textAlign: 'center', width: 60 }}>Unid.</th>
                    <th style={{ padding: '8px', textAlign: 'right', width: 70 }}>Qtd.</th>
                    <th style={{ padding: '8px', textAlign: 'right', width: 120 }}>Custo Unit.</th>
                    <th style={{ padding: '8px', textAlign: 'right', width: 80 }}>Margem %</th>
                    <th style={{ padding: '8px', textAlign: 'right', width: 120 }}>P. Venda</th>
                    <th style={{ padding: '8px', textAlign: 'right', width: 120 }}>Total</th>
                    <th style={{ padding: '8px', textAlign: 'center', width: 80 }}>Fat.</th>
                    <th style={{ padding: '8px', textAlign: 'center', width: 50 }}>Opc.</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    let lastDisc = null
                    return itens.map((item, idx) => {
                      const rows = []
                      if (item.discId !== lastDisc) {
                        lastDisc = item.discId
                        rows.push(
                          <tr key={`disc-${item.discId}-${idx}`}>
                            <td colSpan={10} style={{ background: '#1a1a1a', color: '#fff', padding: '7px 10px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <span style={{ fontWeight: 700, fontSize: 12 }}>{item.discId.padStart(2,'0')}. {item.discNome}</span>
                                <MargemDisciplinaInput
                                  discId={item.discId}
                                  onAplicar={margem => aplicarMargemDisciplina(item.discId, margem)}
                                />
                              </div>
                            </td>
                          </tr>
                        )
                      }
                      const pv = precoVenda(item)
                      const tot = totalItem(item)
                      rows.push(
                        <tr key={item.id || idx} style={{ borderBottom: '1px solid #eee', background: item.margem_override ? '#fff8e1' : idx % 2 === 0 ? '#fff' : '#fafafa' }}>
                          <td style={{ padding: '5px 8px', color: '#888', fontFamily: 'monospace', fontSize: 11 }}>{item.codigo}</td>
                          <td style={{ padding: '5px 8px', lineHeight: 1.3 }}>
                            <div>{item.desc_custom || item.desc}</div>
                            {item.desc_complementar && <div style={{ fontSize: 11, color: '#666', fontStyle: 'italic' }}>{item.desc_complementar}</div>}
                          </td>
                          <td style={{ padding: '5px 8px', textAlign: 'center', color: '#666' }}>{item.unidade}</td>
                          <td style={{ padding: '5px 8px', textAlign: 'right' }}>{item.quantidade || '-'}</td>
                          <td style={{ padding: '5px 4px' }}>
                            <InputField type="number" value={item.custo_unitario || ''}
                              onChange={v => updateItem(idx, 'custo_unitario', v)}
                              placeholder="0,00" tabIndex={20 + idx * 2}
                              style={{ width: '100%', border: '1px solid #ddd', borderRadius: 3, padding: '3px 6px', fontSize: 12, textAlign: 'right', background: '#fffef0' }} />
                          </td>
                          <td style={{ padding: '5px 4px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <InputField type="number" value={item.margem || ''}
                                onChange={v => updateItem(idx, 'margem', v)}
                                placeholder="0" tabIndex={21 + idx * 2}
                                style={{ width: '100%', border: `1px solid ${item.margem_override ? '#f9a825' : '#ddd'}`, borderRadius: 3, padding: '3px 6px', fontSize: 12, textAlign: 'right', background: item.margem_override ? '#fff8e1' : '#fffef0' }} />
                              {item.margem_override && (
                                <button onClick={() => resetarMargemItem(idx, item.discId)}
                                  title="Voltar para margem da disciplina"
                                  style={{ background: 'none', border: 'none', color: '#f9a825', cursor: 'pointer', fontSize: 14, padding: '0 2px' }}>↺</button>
                              )}
                            </div>
                          </td>
                          <td style={{ padding: '5px 8px', textAlign: 'right', fontWeight: 600 }}>R$ {fmt(pv)}</td>
                          <td style={{ padding: '5px 8px', textAlign: 'right', fontWeight: 700, color: tot > 0 ? '#111' : '#ccc' }}>R$ {fmt(tot)}</td>
                          <td style={{ padding: '5px 8px', textAlign: 'center' }}>
                            <SelectFaturamento value={item.faturamento} onChange={v => updateItem(idx, 'faturamento', v)} />
                          </td>
                          <td style={{ padding: '5px 8px', textAlign: 'center', fontSize: 11, color: '#888' }}>
                            {item.opcional ? 'opc.' : ''}
                          </td>
                        </tr>
                      )
                      return rows
                    })
                  })()}
                </tbody>
              </table>
            </div>
          )}
        </Section>

        <div style={{ position: 'sticky', bottom: 16, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          {salvoOk && <span style={{ background: '#e8f5e9', color: '#1b5e20', padding: '10px 16px', borderRadius: 6, fontSize: 13, fontWeight: 600 }}>✓ Salvo!</span>}
          <button className="btn-secondary" onClick={salvarProposta} disabled={salvando} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            {salvando ? 'Salvando...' : '💾 Salvar Rascunho'}
          </button>
          <button onClick={handleGerarPDF} disabled={gerandoPDF}
            style={{ background: '#c00', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
            {gerandoPDF ? 'Gerando PDF...' : '📄 Gerar PDF'}
          </button>
        </div>
      </div>
    </Layout>
  )
}