import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import { supabase } from '../lib/supabaseClient'
import { DISCIPLINAS } from '../data/escopo'
import { gerarPDF } from '../components/PDFTemplate'

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
    area_m2: 0, tributos: 0, desconto: 0,
  })
  const [itens, setItens] = useState([])         // itens selecionados com preços
  const [salvando, setSalvando] = useState(false)
  const [salvoOk, setSalvoOk] = useState(false)
  const [gerandoPDF, setGerandoPDF] = useState(false)

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

    const { data: dbItens } = await supabase.from('proposal_items').select('*').eq('proposal_id', id).eq('checked', true)
    if (dbItens) {
      // enriquecer com descrição do escopo
      const enriquecidos = dbItens.map(di => {
        let desc = '', discNome = '', discId = ''
        for (const d of DISCIPLINAS) {
          for (const g of d.grupos) {
            const found = g.itens.find(i => i.cod === di.codigo)
            if (found) { desc = found.desc; discNome = d.nome; discId = d.id }
          }
        }
        return { ...di, desc, discNome, discId, custo_unitario: di.custo_unitario || 0, margem: di.margem || 0 }
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
      return novo
    })
  }

  // Input que só atualiza o estado global no onBlur (evita re-render a cada tecla)
  function InputPreco({ value, onChange, placeholder, style }) {
    const [local, setLocal] = useState(value || '')
    useEffect(() => { setLocal(value || '') }, [value])
    return (
      <input
        type="number"
        value={local}
        onChange={e => setLocal(e.target.value)}
        onBlur={e => onChange(e.target.value)}
        step="any"
        placeholder={placeholder}
        style={style}
      />
    )
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

  // Agrupar por disciplina para resumo
  const resumoPorDisc = DISCIPLINAS.map(d => {
    const discItens = itens.filter(i => i.discId === d.id)
    const total = discItens.reduce((s, i) => s + totalItem(i), 0)
    const totalOpcional = discItens.filter(i => i.opcional).reduce((s, i) => s + totalItem(i), 0)
    return { ...d, total, totalOpcional, temItens: discItens.length > 0 }
  }).filter(d => d.temItens)

  const totalSemImpostos = resumoPorDisc.reduce((s, d) => s + d.total, 0)
  const tributos = parseFloat(proposta.tributos) || 0
  const desconto = parseFloat(proposta.desconto) || 0
  const valorFinal = totalSemImpostos + tributos - desconto
  const areM2 = parseFloat(proposta.area_m2) || 0

  const fmt = v => v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  const fmtPct = v => v.totalSemImpostos ? ((v.total / totalSemImpostos) * 100).toFixed(1) + '%' : '-'

  async function salvarProposta() {
    setSalvando(true)
    // salva dados da proposta
    await supabase.from('proposals').update({
      ...proposta,
      valor_final: valorFinal,
      area_m2: areM2,
      tributos,
      desconto,
    }).eq('id', id)

    // salva preços dos itens
    for (const item of itens) {
      await supabase.from('proposal_items').update({
        custo_unitario: parseFloat(item.custo_unitario) || 0,
        margem: parseFloat(item.margem) || 0,
      }).eq('id', item.id)
    }
    setSalvando(false)
    setSalvoOk(true)
    setTimeout(() => setSalvoOk(false), 2500)
  }

  async function handleGerarPDF() {
    await salvarProposta()
    setGerandoPDF(true)
    setTimeout(() => {
      gerarPDF({ proposta, itens, resumoPorDisc, totalSemImpostos, tributos, desconto, valorFinal, areM2, DISCIPLINAS, precoVenda, totalItem, fmt })
      setGerandoPDF(false)
    }, 300)
  }

  const Section = ({ titulo, children }) => (
    <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 8, marginBottom: 20, overflow: 'hidden' }}>
      <div style={{ background: '#1a1a1a', color: '#fff', padding: '8px 16px', fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>{titulo}</div>
      <div style={{ padding: 20 }}>{children}</div>
    </div>
  )

  const Field = ({ label, campo, type = 'text', full = false }) => (
    <div style={{ marginBottom: 14, gridColumn: full ? '1/-1' : undefined }}>
      <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#555', marginBottom: 4, textTransform: 'uppercase' }}>{label}</label>
      <input
        type={type}
        value={proposta[campo] || ''}
        onChange={e => updateProposta(campo, e.target.value)}
        style={{ width: '100%', border: '1px solid #ccc', borderRadius: 4, padding: '7px 10px', fontSize: 13, boxSizing: 'border-box' }}
      />
    </div>
  )

  return (
    <Layout propostaId={id}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 16px' }}>
        {/* Topo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700 }}>Proposta Comercial</h1>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {salvoOk && <span style={{ color: 'green', fontSize: 13, fontWeight: 600 }}>✓ Salvo!</span>}
            <button className="btn-secondary" onClick={() => router.push(`/escopo?id=${id}`)}>← Editar Escopo</button>
            <button className="btn-secondary" onClick={salvarProposta} disabled={salvando}>{salvando ? 'Salvando...' : '💾 Salvar Rascunho'}</button>
            <button className="btn-primary" onClick={handleGerarPDF} disabled={gerandoPDF}
              style={{ background: '#c00', borderColor: '#c00' }}>{gerandoPDF ? 'Gerando...' : '📄 Gerar PDF'}</button>
          </div>
        </div>

        {/* Proposta info */}
        <Section titulo="PROPOSTA COMERCIAL">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: 16 }}>
            <Field label="Número" campo="numero" />
            <Field label="Data" campo="data" type="date" />
            <Field label="Negócio / Título" campo="negocio" />
          </div>
        </Section>

        {/* Dados do cliente */}
        <Section titulo="DADOS DO CLIENTE">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field label="Nome" campo="cliente_nome" full />
            <Field label="Endereço" campo="cliente_endereco" />
            <Field label="Cidade" campo="cliente_cidade" />
            <Field label="Contato" campo="cliente_contato" />
            <Field label="E-mail" campo="cliente_email" />
          </div>
        </Section>

        {/* Condições de fornecimento */}
        <Section titulo="CONDIÇÕES DE FORNECIMENTO">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field label="Frete" campo="frete" />
            <Field label="Validade" campo="validade" />
            <div style={{ gridColumn: '1/-1' }}>
              <Field label="Prazo de Entrega" campo="prazo_entrega" />
            </div>
          </div>
        </Section>

        {/* Condições financeiras */}
        <Section titulo="CONDIÇÕES FINANCEIRAS">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field label="Impostos" campo="impostos" />
            <Field label="Cond. Pagamento" campo="cond_pagamento" />
            <div style={{ gridColumn: '1/-1' }}>
              <Field label="Faturamento" campo="faturamento" />
            </div>
          </div>
        </Section>

        {/* Resumo financeiro */}
        <Section titulo="RESUMO FINANCEIRO">
          {resumoPorDisc.length === 0 ? (
            <p style={{ color: '#999', fontSize: 13 }}>Nenhum item selecionado no escopo ainda. <a href={`/escopo?id=${id}`} style={{ color: '#111' }}>→ Ir para o Escopo</a></p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#f0f0f0' }}>
                  <th style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 700 }}>Disciplina</th>
                  <th style={{ padding: '8px 10px', textAlign: 'right', fontWeight: 700, width: 160 }}>Valor Total</th>
                  <th style={{ padding: '8px 10px', textAlign: 'right', fontWeight: 700, width: 80 }}>(%)</th>
                  <th style={{ padding: '8px 10px', textAlign: 'right', fontWeight: 700, width: 130 }}>+Opcional</th>
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
                  </tr>
                ))}
                <tr style={{ background: '#1a1a1a', color: '#fff', fontWeight: 700 }}>
                  <td style={{ padding: '8px 10px' }}>VALOR TOTAL SEM IMPOSTOS</td>
                  <td style={{ padding: '8px 10px', textAlign: 'right' }}>R$ {fmt(totalSemImpostos)}</td>
                  <td colSpan={2}></td>
                </tr>
              </tbody>
            </table>
          )}

          {/* Tributos, desconto, total, m² */}
          <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12 }}>
            {[
              { label: 'Tributos (R$)', campo: 'tributos' },
              { label: 'Desconto Comercial (R$)', campo: 'desconto' },
              { label: 'Área (m²)', campo: 'area_m2' },
            ].map(({ label, campo }) => (
              <div key={campo}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#555', marginBottom: 4 }}>{label}</label>
                <input
                  type="number"
                  value={proposta[campo] || ''}
                  onChange={e => updateProposta(campo, e.target.value)}
                  step="any"
                  style={{ width: '100%', border: '1px solid #ccc', borderRadius: 4, padding: '7px 10px', fontSize: 13, boxSizing: 'border-box', textAlign: 'right' }}
                />
              </div>
            ))}
            <div style={{ background: '#1a1a1a', color: '#fff', borderRadius: 6, padding: '10px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: 11, color: '#aaa', fontWeight: 700 }}>VALOR FINAL</div>
              <div style={{ fontSize: 18, fontWeight: 700, marginTop: 2 }}>R$ {fmt(valorFinal)}</div>
              {areM2 > 0 && <div style={{ fontSize: 11, color: '#bbb', marginTop: 4 }}>R$ {fmt(valorFinal / areM2)}/m²</div>}
            </div>
          </div>
        </Section>

        {/* Escopo com precificação */}
        <Section titulo="ESCOPO DETALHADO — PRECIFICAÇÃO">
          {itens.length === 0 ? (
            <p style={{ color: '#999', fontSize: 13 }}>Nenhum item selecionado.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ background: '#f0f0f0' }}>
                  <th style={{ padding: '8px', textAlign: 'left', width: 100 }}>Código</th>
                  <th style={{ padding: '8px', textAlign: 'left' }}>Descrição</th>
                  <th style={{ padding: '8px', textAlign: 'center', width: 70 }}>Unid.</th>
                  <th style={{ padding: '8px', textAlign: 'right', width: 80 }}>Qtd.</th>
                  <th style={{ padding: '8px', textAlign: 'right', width: 130 }}>Custo Unit. (R$)</th>
                  <th style={{ padding: '8px', textAlign: 'right', width: 80 }}>Margem (%)</th>
                  <th style={{ padding: '8px', textAlign: 'right', width: 120 }}>P. Venda Unit.</th>
                  <th style={{ padding: '8px', textAlign: 'right', width: 130 }}>Total Venda</th>
                  <th style={{ padding: '8px', textAlign: 'center', width: 60 }}>Opc.</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  let lastDisc = null
                  return itens.map((item, idx) => {
                    const rows = []
                    if (item.discId !== lastDisc) {
                      lastDisc = item.discId
                      const disc = DISCIPLINAS.find(d => d.id === item.discId)
                      rows.push(
                        <tr key={`disc-${item.discId}`}>
                          <td colSpan={9} style={{ background: '#1a1a1a', color: '#fff', padding: '7px 10px', fontWeight: 700, fontSize: 12 }}>
                            {item.discId.padStart(2,'0')}. {item.discNome}
                          </td>
                        </tr>
                      )
                    }
                    const pv = precoVenda(item)
                    const tot = totalItem(item)
                    rows.push(
                      <tr key={item.id} style={{ borderBottom: '1px solid #eee', background: idx % 2 === 0 ? '#fff' : '#fafafa' }}>
                        <td style={{ padding: '5px 8px', color: '#888', fontFamily: 'monospace', fontSize: 11 }}>{item.codigo}</td>
                        <td style={{ padding: '5px 8px', lineHeight: 1.3 }}>{item.desc}</td>
                        <td style={{ padding: '5px 8px', textAlign: 'center', color: '#666' }}>{item.unidade}</td>
                        <td style={{ padding: '5px 8px', textAlign: 'right' }}>{item.quantidade || '-'}</td>
                        <td style={{ padding: '5px 4px' }}>
                          <InputPreco
                            value={item.custo_unitario}
                            onChange={v => updateItem(idx, 'custo_unitario', v)}
                            placeholder="0,00"
                            style={{ width: '100%', border: '1px solid #ddd', borderRadius: 3, padding: '3px 6px', fontSize: 12, textAlign: 'right', background: '#fffef0' }}
                          />
                        </td>
                        <td style={{ padding: '5px 4px' }}>
                          <InputPreco
                            value={item.margem}
                            onChange={v => updateItem(idx, 'margem', v)}
                            placeholder="0"
                            style={{ width: '100%', border: '1px solid #ddd', borderRadius: 3, padding: '3px 6px', fontSize: 12, textAlign: 'right', background: '#fffef0' }}
                          />
                        </td>
                        <td style={{ padding: '5px 8px', textAlign: 'right', fontWeight: 600 }}>R$ {fmt(pv)}</td>
                        <td style={{ padding: '5px 8px', textAlign: 'right', fontWeight: 700, color: tot > 0 ? '#111' : '#ccc' }}>R$ {fmt(tot)}</td>
                        <td style={{ padding: '5px 8px', textAlign: 'center' }}>
                          {item.opcional ? <span style={{ fontSize: 11, color: '#888', fontStyle: 'italic' }}>opc.</span> : ''}
                        </td>
                      </tr>
                    )
                    return rows
                  })
                })()}
              </tbody>
            </table>
          )}
        </Section>

        {/* Sticky bottom */}
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