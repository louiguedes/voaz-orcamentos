async function getLogoBase64() {
  try {
    const res = await fetch('/logo-voaz.png')
    const blob = await res.blob()
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.readAsDataURL(blob)
    })
  } catch { return null }
}

export async function gerarPDF({ proposta, itens, resumoPorDisc, totalSemImpostos, tributos, desconto, valorFinal, areM2, DISCIPLINAS, precoVenda, totalItem, fmt }) {
  const jsPDFModule = await import('jspdf')
  const jsPDF = jsPDFModule.jsPDF || jsPDFModule.default
  const { default: autoTable } = await import('jspdf-autotable')

  const logoBase64 = await getLogoBase64()

  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
  const W = 297, H = 210
  const ML = 14, MR = 14, MT = 12

  const PRETO = [30, 30, 28]
  const CINZA_CLARO = [235, 235, 235]
  const BRANCO = [255, 255, 255]

  // Logo grande para capa, pequeno para demais páginas
  const LOGO_BIG = 28, LOGO_SM = 16

  function drawLogo(x, y, size) {
    if (logoBase64) {
      doc.addImage(logoBase64, 'PNG', x, y, size, size)
    } else {
      doc.setDrawColor(...PRETO)
      doc.setLineWidth(0.6)
      doc.rect(x, y, size, size)
      doc.setFontSize(size * 0.32)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(...PRETO)
      doc.text('V  O', x + size / 2, y + size * 0.38, { align: 'center' })
      doc.text('A  Z', x + size / 2, y + size * 0.72, { align: 'center' })
    }
  }

  function sectionHeader(y, label) {
    doc.setFillColor(...PRETO)
    doc.rect(ML, y, W - ML - MR, 6, 'F')
    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...BRANCO)
    doc.text(label, ML + 3, y + 4.2)
    return y + 6
  }

  function drawFooter() {
    const totalPages = doc.internal.getNumberOfPages()
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i)
      doc.setFontSize(7)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(150, 150, 150)
      doc.text('Diretoria  |  São Paulo - SP  |  (11) 3995 3770', ML, H - 6)
      doc.text(`Página ${i} de ${totalPages}`, W - MR, H - 6, { align: 'right' })
      doc.setDrawColor(200, 200, 200)
      doc.setLineWidth(0.3)
      doc.line(ML, H - 9, W - MR, H - 9)
    }
  }

  // ═══════════════════════════════════════
  // PÁGINA 1 — CAPA (logo grande)
  // ═══════════════════════════════════════
  let y = MT

  drawLogo(W - MR - LOGO_BIG, MT, LOGO_BIG)

  doc.setFontSize(15)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...PRETO)
  doc.text('PROPOSTA COMERCIAL', ML, y + 7)
  doc.setLineWidth(0.5)
  doc.setDrawColor(...PRETO)
  doc.line(ML, y + 9, ML + 68, y + 9)
  y += 16

  const dadosProposta = [
    { label: 'Número:', value: proposta.numero || '' },
    { label: 'Data:', value: proposta.data ? new Date(proposta.data + 'T00:00:00').toLocaleDateString('pt-BR') : '' },
    { label: 'Negócio:', value: proposta.negocio || '' },
  ]
  dadosProposta.forEach(({ label, value }) => {
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...PRETO)
    doc.text(label, ML, y)
    doc.setFont('helvetica', 'normal')
    doc.text(value, ML + 24, y)
    y += 6
  })

  y += 3
  doc.setFontSize(8.5)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...PRETO)
  doc.text('Prezado,', ML, y); y += 4.5
  doc.text(
    'Atendendo à solicitação de V.Sas., apresentamo-lhes a nossa proposta comercial para execução de serviços solicitados conforme condições abaixo.',
    ML, y, { maxWidth: W - ML - MR - LOGO_BIG - 12 }
  ); y += 9

  y = sectionHeader(y, 'DADOS DO CLIENTE')
  y += 6
  const clienteFields = [
    { label: 'Nome:', value: proposta.cliente_nome || '' },
    { label: 'Endereço:', value: proposta.cliente_endereco || '' },
    { label: 'Cidade:', value: proposta.cliente_cidade || '' },
    { label: 'Contato:', value: proposta.cliente_contato || '' },
    { label: 'E-mail:', value: proposta.cliente_email || '' },
  ]
  clienteFields.forEach(({ label, value }) => {
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...PRETO)
    doc.text(label, ML, y)
    doc.setFont('helvetica', 'normal')
    doc.text(value, ML + 26, y)
    y += 5.5
  })

  y += 4
  y = sectionHeader(y, 'CONDIÇÕES DE FORNECIMENTO')
  y += 7
  const fornFields = [
    { label: 'FRETE:', value: proposta.frete || '' },
    { label: 'VALIDADE:', value: proposta.validade || '' },
    { label: 'PRAZO DE ENTREGA:', value: proposta.prazo_entrega || '' },
  ]
  fornFields.forEach(({ label, value }) => {
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...PRETO)
    doc.text(label, ML, y)
    doc.setFont('helvetica', 'normal')
    doc.text(value, ML + 46, y, { maxWidth: W - ML - MR - 50 })
    y += 7
  })

  y += 5
  doc.setFontSize(8.5)
  doc.setFont('helvetica', 'normal')
  doc.text('Na expectativa de contato e de sermos distinguidos por V.Sas., subscrevemo-nos:', ML, y); y += 5
  doc.text('Atenciosamente,', ML, y); y += 5
  doc.setFont('helvetica', 'bold')
  doc.text('Diretoria', ML, y); y += 4.5
  doc.setFont('helvetica', 'normal')
  doc.text('São Paulo - SP', ML, y); y += 4.5
  doc.text('(11) 3995 3770', ML, y)

  const assinY = H - 24
  doc.setFontSize(9)
  doc.setTextColor(...PRETO)
  doc.text('DE ACORDO:', W / 2 + 20, assinY)
  doc.setLineWidth(0.4)
  doc.line(W / 2 + 44, assinY, W - MR - 5, assinY)
  if (proposta.cliente_nome) {
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.text(proposta.cliente_nome, W - MR - 5, assinY + 4, { align: 'right' })
  }

  // ═══════════════════════════════════════
  // PÁGINA 2 — RESUMO FINANCEIRO (logo pequeno, acima das faixas)
  // ═══════════════════════════════════════
  doc.addPage()
  y = MT

  // Logo pequeno no canto, bem acima de qualquer faixa
  drawLogo(W - MR - LOGO_SM, MT, LOGO_SM)

  doc.setFontSize(13)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...PRETO)
  doc.text('RESUMO FINANCEIRO', ML, y + 6)
  y += MT + LOGO_SM + 2  // começa abaixo do logo

  y = sectionHeader(y, 'CONDIÇÕES FINANCEIRAS')
  y += 7
  const finFields = [
    { label: 'Impostos:', value: proposta.impostos || '' },
    { label: 'Cond. Pagamento:', value: proposta.cond_pagamento || '' },
    { label: 'Faturamento:', value: proposta.faturamento || '' },
    { label: 'VALOR FINAL:', value: `R$ ${fmt(valorFinal)}`, bold: true },
  ]
  finFields.forEach(({ label, value, bold }) => {
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...PRETO)
    doc.text(label, ML, y)
    doc.setFont('helvetica', bold ? 'bold' : 'normal')
    doc.text(value, ML + 42, y, { maxWidth: W - ML - MR - 50 })
    y += 6
  })
  y += 3

  const resumoBody = resumoPorDisc.map(d => [
    d.id.padStart(2, '0') + '.',
    d.nome,
    { content: `R$ ${fmt(d.total)}`, styles: { halign: 'right' } },
    { content: totalSemImpostos ? ((d.total / totalSemImpostos) * 100).toFixed(1) + '%' : '-', styles: { halign: 'right' } },
    { content: d.totalOpcional > 0 ? `R$ ${fmt(d.totalOpcional)}` : '-', styles: { halign: 'right' } },
  ])

  autoTable(doc, {
    head: [['', `RESUMO FINANCEIRO  |  ${proposta.negocio || ''}`, 'VALOR TOTAL', '(%)', '+OPCIONAL']],
    body: [
      ...resumoBody,
      ['', { content: 'VALOR TOTAL SEM IMPOSTOS', styles: { fontStyle: 'bold' } }, { content: `R$ ${fmt(totalSemImpostos)}`, styles: { fontStyle: 'bold', halign: 'right' } }, { content: '-', styles: { halign: 'right' } }, { content: '-', styles: { halign: 'right' } }],
      ['99.', 'TRIBUTOS', { content: `R$ ${fmt(tributos)}`, styles: { halign: 'right' } }, '', { content: '-', styles: { halign: 'right' } }],
      ['', 'DESCONTO COMERCIAL', { content: `R$ ${fmt(desconto)}`, styles: { halign: 'right' } }, '', ''],
      [{ content: '100.', styles: { fillColor: PRETO, textColor: BRANCO, fontStyle: 'bold' } }, { content: 'VALOR FINAL', styles: { fillColor: PRETO, textColor: BRANCO, fontStyle: 'bold' } }, { content: `R$ ${fmt(valorFinal)}`, styles: { fillColor: PRETO, textColor: BRANCO, fontStyle: 'bold', halign: 'right' } }, { content: '-', styles: { fillColor: PRETO, textColor: BRANCO, halign: 'right' } }, { content: '-', styles: { fillColor: PRETO, textColor: BRANCO, halign: 'right' } }],
    ],
    startY: y,
    margin: { left: ML, right: MR },
    styles: { fontSize: 8, cellPadding: 2.2 },
    headStyles: { fillColor: PRETO, textColor: BRANCO, fontStyle: 'bold', fontSize: 8 },
    columnStyles: {
      0: { cellWidth: 10 },
      2: { cellWidth: 42, halign: 'right' },
      3: { cellWidth: 22, halign: 'right' },
      4: { cellWidth: 36, halign: 'right' },
    },
    alternateRowStyles: { fillColor: [250, 250, 250] },
    willDrawCell: (data) => {
      if (data.section === 'body' && data.row.index === resumoBody.length) {
        data.cell.styles.fillColor = CINZA_CLARO
        data.cell.styles.fontStyle = 'bold'
      }
    },
  })

  if (areM2 > 0) {
    const fy = doc.lastAutoTable.finalY + 5
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...PRETO)
    doc.text(`INVESTIMENTO TOTAL R$/M² (SEM OPCIONAIS):  R$ ${fmt(valorFinal / areM2)}  ×  ${fmt(areM2)} m²`, ML, fy)
  }

  // ═══════════════════════════════════════
  // ESCOPO DETALHADO
  // ═══════════════════════════════════════
  const discIds = [...new Set(itens.map(i => i.discId))]

  function escopoPageHeader() {
    doc.addPage()
    // Logo pequeno no canto direito acima do conteúdo
    drawLogo(W - MR - LOGO_SM, MT, LOGO_SM)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...PRETO)
    doc.text(`ESCOPO DETALHADO  |  ${proposta.negocio || ''}`, ML, MT + LOGO_SM / 2 + 1)
    return MT + LOGO_SM + 4
  }

  y = escopoPageHeader()

  for (const discId of discIds) {
    const disc = DISCIPLINAS.find(d => d.id === discId)
    const discItens = itens.filter(i => i.discId === discId)

    const grupoIds = [...new Set(discItens.map(i => {
      for (const d of DISCIPLINAS)
        for (const g of d.grupos)
          if (g.itens.find(it => it.cod === i.codigo)) return g.id
      return ''
    }))]

    const bodyRows = []
    for (const grupoId of grupoIds) {
      let grupoNome = ''
      for (const d of DISCIPLINAS) {
        const g = d.grupos.find(gr => gr.id === grupoId)
        if (g) { grupoNome = g.nome; break }
      }
      const gItens = discItens.filter(i => {
        for (const d of DISCIPLINAS) {
          const g = d.grupos.find(gr => gr.id === grupoId)
          if (g && g.itens.find(it => it.cod === i.codigo)) return true
        }
        return false
      })
      bodyRows.push([{ content: `${grupoId}  ${grupoNome}`, colSpan: 7, styles: { fillColor: CINZA_CLARO, fontStyle: 'bold', fontSize: 7.5, cellPadding: 2 } }])
      gItens.forEach(item => {
        const pv = precoVenda(item)
        const tot = totalItem(item)
        // Se for "ITENS DIVERSOS", mostra a descrição customizada
        const descExibir = item.desc_custom && item.desc_custom.trim() !== ''
          ? item.desc_custom
          : item.desc
        bodyRows.push([
          item.codigo,
          descExibir,
          item.unidade || '',
          item.quantidade != null ? String(item.quantidade) : '',
          { content: `R$ ${fmt(pv)}`, styles: { halign: 'right' } },
          { content: `R$ ${fmt(tot)}`, styles: { halign: 'right', fontStyle: 'bold' } },
          { content: item.opcional ? '+OPC' : '', styles: { halign: 'center', fontSize: 7 } },
        ])
      })
    }

    const totalDisc = discItens.reduce((s, i) => s + totalItem(i), 0)
    const estimatedH = bodyRows.length * 7 + 24
    if (y + estimatedH > H - 18) {
      y = escopoPageHeader()
    }

    // Faixa título disciplina — começa depois do logo
    doc.setFillColor(...PRETO)
    doc.rect(ML, y, W - ML - MR, 6.5, 'F')
    doc.setFontSize(8.5)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...BRANCO)
    doc.text(`${discId.padStart(2, '0')}.  ${disc?.nome || ''}`, ML + 3, y + 4.5)
    y += 8

    autoTable(doc, {
      head: [['Código', 'Descrição', 'Unid.', 'Qtd.', 'Preço Unitário', 'Valor Total', '+Opcional']],
      body: bodyRows,
      startY: y,
      margin: { left: ML, right: MR },
      styles: { fontSize: 7.5, cellPadding: 1.8, overflow: 'linebreak', textColor: PRETO },
      headStyles: { fillColor: [80, 80, 80], textColor: BRANCO, fontStyle: 'bold', fontSize: 7.5, cellPadding: 2 },
      columnStyles: {
        0: { cellWidth: 20 },
        2: { cellWidth: 13, halign: 'center' },
        3: { cellWidth: 13, halign: 'right' },
        4: { cellWidth: 30, halign: 'right' },
        5: { cellWidth: 30, halign: 'right' },
        6: { cellWidth: 18, halign: 'center' },
      },
      alternateRowStyles: { fillColor: [250, 250, 250] },
      foot: [[
        { content: `TOTAL  ${disc?.nome || ''}`, colSpan: 5, styles: { fillColor: PRETO, textColor: BRANCO, fontStyle: 'bold', fontSize: 8 } },
        { content: `R$ ${fmt(totalDisc)}`, styles: { fillColor: PRETO, textColor: BRANCO, fontStyle: 'bold', halign: 'right', fontSize: 8 } },
        { content: '', styles: { fillColor: PRETO } },
      ]],
      didDrawPage: (data) => {
        if (data.pageNumber > 1) {
          drawLogo(W - MR - LOGO_SM, MT, LOGO_SM)
          doc.setFontSize(9)
          doc.setFont('helvetica', 'bold')
          doc.setTextColor(...PRETO)
          doc.text(`ESCOPO DETALHADO  |  ${proposta.negocio || ''}`, ML, MT + LOGO_SM / 2 + 1)
        }
      },
    })

    y = doc.lastAutoTable.finalY + 8
  }

  // ═══════════════════════════════════════
  // OBSERVAÇÕES
  // ═══════════════════════════════════════
  doc.addPage()
  y = MT + 2
  drawLogo(W - MR - LOGO_SM, MT, LOGO_SM)

  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...PRETO)
  doc.text('Observações:', ML, y + 5)
  y += 12

  const observacoes = [
    '1. O cronograma da obra será desenvolvido em até 5 dias úteis da data de assinatura do contrato;',
    '2. O orçamento não contempla intervenções na infraestrutura elétrica existente à exemplo de fornecimento de transformador para adequação da carga elétrica, fornecimento de QNB, estabilizador de energia, recorte no contrapiso para instalação de eletrocalha, entre outros não citados na proposta;',
    '3. O orçamento não considera intervenção no sistema central de ar condicionado do condomínio, apenas remanejamento de grelhas e difusores existentes no conjunto;',
    '4. O orçamento não contempla qualquer custo de aprovação de projeto junto ao condomínio. Sendo de responsabilidade do cliente junto ao condomínio;',
    '5. O orçamento não contempla qualquer intervenção no sistema de combate a incêndio e hidrantes. Necessário projeto executivo para orçamento, se necessário;',
    '6. O orçamento considera uso das vagas no estacionamento do cliente;',
    '7. Os elevadores deverão ser mantidos disponíveis para o transporte vertical;',
    '8. O orçamento não contempla custos de Comunicado de Pequenas Reformas junto à prefeitura, sendo de responsabilidade do cliente, caso seja necessário;',
    '9. O orçamento não contempla qualquer custo de manutenção e, tão pouco, nos responsabilizamos por instalações hidráulicas existentes além das áreas de intervenção direta;',
    '10. Excluso fornecimento de novos detectores de fumaça, central de controle, entre outros;',
    '11. Excluso fornecimento de equipamentos de combate a incêndio como central de alarme, sinalizadores, botões de emergência, etc;',
    '12. Excluso recuperação de caixilharia existente;',
    '13. Excluso içamentos e retiradas de equipamentos que não caibam nos elevadores do edifício.',
  ]

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  observacoes.forEach(obs => {
    const linhas = doc.splitTextToSize(obs, W - ML - MR - LOGO_SM - 5)
    doc.text(linhas, ML, y)
    y += linhas.length * 4.5 + 1.5
  })

  drawFooter()

  const nomeArquivo = `VOAZ_${proposta.numero || 'SN'}_${(proposta.cliente_nome || 'Proposta').replace(/[^a-zA-Z0-9]/g, '_')}.pdf`
  doc.save(nomeArquivo)
}