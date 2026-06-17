export const DISCIPLINAS = [
  {
    id: '01', nome: 'PROJETOS EXECUTIVOS',
    grupos: [
      { id: '1.01', nome: 'Projeto Estrutural', itens: [
        { cod: '1.01.001', desc: 'Projeto estrutural metálico considerando: Projeto executivo, detalhes de fixações, especificações dos materiais e memória de cálculo; Visita para fiscalização de execução; Memorial de cálculo e memorial descritivo', unid: 'vb' },
        { cod: '1.01.002', desc: 'Projeto estrutural em concreto armado considerando: Planta de forma, armação, detalhes de fixação, especificação dos materiais; Memorial de cálculo e memorial descritivo', unid: 'vb' },
      ]},
      { id: '1.02', nome: 'Projeto de Arquitetura', itens: [
        { cod: '1.02.001', desc: 'Projeto de arquitetura de interiores considerando: Planta de demolição e construção; Planta de pontos de elétrica, dados e voz; Planta de paginação de forro; Planta de paginação de piso; Planta de ampliações e detalhamentos necessários', unid: 'vb' },
      ]},
      { id: '1.03', nome: 'Projeto de instalações Elétrica e Lógica', itens: [
        { cod: '1.03.001', desc: 'Projeto de elétrica e lógica considerando: Planta baixa de piso e forro com posicionamento dos pontos elétricos e dados; Diagramas e detalhamento das instalações; Memória de cálculo e memorial descritivo', unid: 'vb' },
      ]},
      { id: '1.04', nome: 'Projeto de Ar Condicionado', itens: [
        { cod: '1.04.001', desc: 'Projeto de sistema de ar condicionado considerando: Planta baixa de encaminhamento da rede de dutos e difusores; Tabela com especificações técnicas de equipamentos; Detalhes de fixação, conexões frigorígenas, isolamento de dutos e outros', unid: 'vb' },
      ]},
      { id: '1.05', nome: 'Projeto de Instalações Hidrossanitárias', itens: [
        { cod: '1.05.001', desc: 'Projeto de Instalações Hidrossanitárias: Planta baixa com traçado e dimensionamento da rede; Perspectiva isométrica das áreas molhadas, cortes e detalhes; Memória de cálculo e memorial descritivo', unid: 'vb' },
      ]},
      { id: '1.06', nome: 'Projeto de Detecção, Prevenção e Combate a Incêndio', itens: [
        { cod: '1.06.001', desc: 'Projeto de sistema de combate e prevenção de incêndio considerando: Planta baixa de distribuição de rede de sprinklers; Planta baixa com locação de detectores de fumaça; Planta baixa com identificação das sinalizações e rotas de fuga; Planta baixa com locação de extintores', unid: 'vb' },
      ]},
      { id: '1.07', nome: 'Projeto Luminotécnico', itens: [
        { cod: '1.07.001', desc: 'Projeto luminotécnico considerando: Planta de forro com indicação de luminárias, circuitos, sensores e acionadores; Tabela com especificações técnicas dos produtos; Memória de cálculo', unid: 'vb' },
      ]},
      { id: '1.08', nome: 'Projeto Acústico', itens: [
        { cod: '1.08.001', desc: 'Projeto para tratamento acústico considerando: Planta baixa com indicação de soluções acústicas; Planta com detalhamento das soluções especificadas; Memória de cálculo e memorial descritivo', unid: 'vb' },
      ]},
      { id: '1.09', nome: 'Projeto de Multimídia, Segurança e Diversos', itens: [
        { cod: '1.09.001', desc: 'Projeto de Multimídia, Segurança e Diversos: Planta baixa com posicionamento de televisores, projetores, telas; Planta baixa do sistema de câmeras CFTV; Planta baixa com posicionamento dos controles de acesso e catracas', unid: 'vb' },
      ]},
      { id: '1.10', nome: 'Levantamento topográfico', itens: [
        { cod: '1.10.001', desc: 'Projeto topográfico considerando: Levantamento técnico; Locação de pontos de nível / eixos; Desenvolvimento de projeto topográfico', unid: 'm²' },
      ]},
      { id: '1.11', nome: 'Consultoria de solos (sondagens)', itens: [
        { cod: '1.11.001', desc: 'Execução de sondagem e desenvolvimento de projeto', unid: 'vb' },
      ]},
      { id: '1.12', nome: 'Consultoria Legal', itens: [
        { cod: '1.12.001', desc: 'Consultoria para processo de aprovação / regularização junto à Prefeitura', unid: 'vb' },
        { cod: '1.12.002', desc: 'Consultoria para processo de aprovação / regularização junto ao Corpo de Bombeiro do Estado', unid: 'vb' },
        { cod: '1.12.003', desc: 'Consultoria para processo de aprovação / regularização junto a órgãos específicos', unid: 'vb' },
        { cod: '1.12.004', desc: 'Consultoria / processo de aumento de carga junto à concessionária de energia elétrica', unid: 'vb' },
      ]},
      { id: '1.13', nome: 'Documentação', itens: [
        { cod: '1.13.001', desc: 'As Builts', unid: 'vb' },
        { cod: '1.13.002', desc: 'Documentação - PCMAT, PPRA, PCMSO, ASO, NRs', unid: 'vb' },
        { cod: '1.13.003', desc: 'Cópias e Plotagens', unid: 'vb' },
      ]},
    ]
  },
  {
    id: '02', nome: 'DESPESAS DIRETAS',
    grupos: [
      { id: '2.01', nome: 'Despesas Diretas', itens: [
        { cod: '2.01.001', desc: 'Gerente de contrato / PMO', unid: 'mês' },
        { cod: '2.01.002', desc: 'Engenheiro / Supervisor responsável pela obra', unid: 'mês' },
        { cod: '2.01.003', desc: 'Serviços de serventia para apoio geral durante execução da obra', unid: 'mês' },
        { cod: '2.01.004', desc: 'Mestre / encarregado de obras', unid: 'mês' },
        { cod: '2.01.005', desc: 'Técnico de Segurança do Trabalho - TST', unid: 'mês' },
        { cod: '2.01.006', desc: 'Segurança privado', unid: 'mês' },
        { cod: '2.01.007', desc: 'Almoxarife', unid: 'mês' },
        { cod: '2.01.008', desc: 'Topógrafo', unid: 'dia' },
        { cod: '2.01.009', desc: 'Deslocamentos durante a obra', unid: 'mês' },
      ]},
    ]
  },
  {
    id: '03', nome: 'SERVIÇOS PRELIMINARES',
    grupos: [
      { id: '3.01', nome: 'Serviços Preliminares', itens: [
        { cod: '3.01.001', desc: 'Execução de seguro de obra com responsabilidade civil cruzada', unid: 'vb' },
        { cod: '3.01.002', desc: 'Emissão de ART/RRT', unid: 'vb' },
        { cod: '3.01.003', desc: 'Instalações provisórias para canteiro de obras - elétrica, hidráulica, entre outros', unid: 'vb' },
        { cod: '3.01.004', desc: 'Tapume de obra', unid: 'm²' },
        { cod: '3.01.005', desc: 'Canteiro de obra - Kits de Higiene, Mesas, Cadeiras, Armários, Microondas, entre outros', unid: 'vb' },
        { cod: '3.01.006', desc: 'EPIs - Equipamentos de proteção individual', unid: 'vb' },
        { cod: '3.01.007', desc: 'Proteção de piso e parede', unid: 'vb' },
        { cod: '3.01.008', desc: 'Sinalizações diversas durante a obra', unid: 'vb' },
        { cod: '3.01.009', desc: 'Aluguel de equipamentos / ferramentas / andaimes', unid: 'vb' },
        { cod: '3.01.010', desc: 'Caçambas estacionárias e sacos de ráfia', unid: 'un' },
        { cod: '3.01.011', desc: 'Transporte vertical e horizontal de materiais', unid: 'vb' },
        { cod: '3.01.012', desc: 'Fretes e deslocamentos de terceiros', unid: 'vb' },
      ]},
    ]
  },
  {
    id: '04', nome: 'DEMOLIÇÃO E REMOÇÃO',
    grupos: [
      { id: '4.01', nome: 'Demolição de forro e complementares', itens: [
        { cod: '4.01.001', desc: 'Desmontagem de luminárias', unid: 'vb' },
        { cod: '4.01.002', desc: 'Demolição de forro de gesso', unid: 'm²' },
        { cod: '4.01.003', desc: 'Desmontagem de forro mineral', unid: 'm²' },
        { cod: '4.01.004', desc: 'Retirada / descarte de infraestruturas existentes', unid: 'vb' },
        { cod: '4.01.005', desc: 'Desmontagem / descarte de dutos, flexíveis e difusores', unid: 'un' },
      ]},
      { id: '4.02', nome: 'Demolição de paredes / divisórias / portas', itens: [
        { cod: '4.02.001', desc: 'Parede - alvenaria', unid: 'm²' },
        { cod: '4.02.002', desc: 'Parede - Drywall', unid: 'm²' },
        { cod: '4.02.003', desc: 'Revestimento de parede existente', unid: 'm²' },
        { cod: '4.02.004', desc: 'Demolição / retirada de vidraçaria', unid: 'm²' },
        { cod: '4.02.005', desc: 'Desmontagem / retirada de divisória sanitária', unid: 'm²' },
        { cod: '4.02.006', desc: 'Desmontagem / retirada de divisória industrial', unid: 'm²' },
        { cod: '4.02.007', desc: 'Desmontagem / retirada de porta', unid: 'un' },
      ]},
      { id: '4.03', nome: 'Demolição de piso e revestimento', itens: [
        { cod: '4.03.001', desc: 'Revestimento de piso existente - Porcelanato / Cerâmica', unid: 'm²' },
        { cod: '4.03.002', desc: 'Revestimento de piso existente - Carpete', unid: 'm²' },
        { cod: '4.03.003', desc: 'Revestimento de piso existente - Vinílico', unid: 'm²' },
        { cod: '4.03.004', desc: 'Remoção e descarte de piso elevado', unid: 'm²' },
        { cod: '4.03.005', desc: 'Demolição de enchimento de piso', unid: 'm²' },
        { cod: '4.03.006', desc: 'Demolição / Abertura de laje', unid: 'm²' },
      ]},
      { id: '4.04', nome: 'Demolição / retirada de itens diversos', itens: [
        { cod: '4.04.001', desc: 'Verba para demolição e descarte de materiais e resíduos', unid: 'vb' },
        { cod: '4.04.002', desc: 'Verba geral para desmontagem e reaproveitamento', unid: 'vb' },
        { cod: '4.04.003', desc: 'Demolição / retirada de bancadas em pedra', unid: 'un' },
        { cod: '4.04.004', desc: 'Demolição / retirada de louças e metais', unid: 'un' },
        { cod: '4.04.005', desc: 'Demolição / retirada de marcenarias', unid: 'vb' },
      ]},
    ]
  },
  {
    id: '05', nome: 'ESTRUTURA',
    grupos: [
      { id: '5.01', nome: 'Estrutura Metálica', itens: [
        { cod: '5.01.001', desc: 'Mezanino', unid: 'm²' },
        { cod: '5.01.002', desc: 'Escada', unid: 'un' },
        { cod: '5.01.003', desc: 'Estrutura metálica para itens diversos', unid: 'un' },
        { cod: '5.01.004', desc: 'Verba estimada para estrutura metálica', unid: 'vb' },
      ]},
      { id: '5.02', nome: 'Estrutura em Concreto / Alvenaria', itens: [
        { cod: '5.02.001', desc: 'Alvenaria estrutural', unid: 'm²' },
        { cod: '5.02.002', desc: 'Base em concreto armado', unid: 'm²' },
        { cod: '5.02.003', desc: 'Laje em concreto armado', unid: 'm²' },
        { cod: '5.02.004', desc: 'Estrutura em concreto armado (Estaca / bloco / baldrame / vigas / pilares)', unid: 'un' },
        { cod: '5.02.005', desc: 'Verba estimada para estrutura em concreto armado', unid: 'vb' },
        { cod: '5.02.006', desc: 'Escoramento / Cimbramento', unid: 'vb' },
        { cod: '5.02.007', desc: 'Fornecimento de material e MDO para montagem de forma / desforma', unid: 'vb' },
        { cod: '5.02.008', desc: 'Fornecimento de material e MDO para armação', unid: 'vb' },
        { cod: '5.02.009', desc: 'Fornecimento de material e MDO para lançamento de concreto', unid: 'vb' },
        { cod: '5.02.010', desc: 'Locação de bomba para concreto', unid: 'vb' },
      ]},
      { id: '5.03', nome: 'Reforço estrutural', itens: [
        { cod: '5.03.001', desc: 'Reforço metálico', unid: 'vb' },
        { cod: '5.03.002', desc: 'Reforço em fibra de carbono', unid: 'm²' },
        { cod: '5.03.003', desc: 'Reforço em alvenaria', unid: 'm²' },
        { cod: '5.03.004', desc: 'Estrutura em madeira', unid: 'm²' },
      ]},
    ]
  },
  {
    id: '06', nome: 'PISO ELEVADO',
    grupos: [
      { id: '6.01', nome: 'Piso elevado', itens: [
        { cod: '6.01.001', desc: 'Piso elevado em ardósia com até 15cm de altura', unid: 'm²' },
        { cod: '6.01.002', desc: 'Piso elevado metálico com até 15cm de altura', unid: 'm²' },
        { cod: '6.01.003', desc: 'Piso laminado antiestático', unid: 'm²' },
        { cod: '6.01.004', desc: 'Fornecimento e instalação de laminado antiestático para piso elevado existente', unid: 'm²' },
        { cod: '6.01.005', desc: 'Piso elevado monolítico', unid: 'm²' },
        { cod: '6.01.006', desc: 'Piso elevado dissipativo para aterramento', unid: 'm²' },
        { cod: '6.01.007', desc: 'Piso elevado especial - altura a definir', unid: 'm²' },
        { cod: '6.01.008', desc: 'Piso elevado em vidro laminado', unid: 'm²' },
        { cod: '6.01.009', desc: 'MDO especializada para nivelamento de piso', unid: 'm²' },
        { cod: '6.01.010', desc: 'MDO especializada para instalação de piso elevado fornecimento pelo cliente / proprietário', unid: 'm²' },
        { cod: '6.01.011', desc: 'Placa complementar para piso elevado existente', unid: 'm²' },
        { cod: '6.01.012', desc: 'Rampa de acesso', unid: 'm²' },
        { cod: '6.01.013', desc: 'Fechamento frontal', unid: 'm²' },
        { cod: '6.01.014', desc: 'Itens periféricos (suportes / estrutura)', unid: 'vb' },
        { cod: '6.01.015', desc: 'ITENS DIVERSOS - DESCREVER', unid: 'vb' },
      ]},
    ]
  },
  {
    id: '07', nome: 'CIVIL',
    grupos: [
      { id: '7.01', nome: 'Civil', itens: [
        { cod: '7.01.001', desc: 'Enchimento de piso', unid: 'm²' },
        { cod: '7.01.002', desc: 'Regularização de piso', unid: 'm²' },
        { cod: '7.01.003', desc: 'Abertura em contrapiso existente para passagem de infraestrutura', unid: 'm²' },
        { cod: '7.01.004', desc: 'Contrapiso', unid: 'm²' },
        { cod: '7.01.005', desc: 'Sóculo em alvenaria/concreto', unid: 'm²' },
        { cod: '7.01.006', desc: 'Parede de alvenaria com chapisco e reboco', unid: 'm²' },
        { cod: '7.01.007', desc: 'Perfuração mecanizada de laje', unid: 'un' },
        { cod: '7.01.008', desc: 'Revisão e reparos em paredes existentes', unid: 'm²' },
        { cod: '7.01.009', desc: 'Abertura / Fechamento de piso e/ou parede', unid: 'vb' },
        { cod: '7.01.010', desc: 'Abertura / Requadração de vão de porta', unid: 'm²' },
      ]},
      { id: '7.02', nome: 'Impermeabilização', itens: [
        { cod: '7.02.001', desc: 'Regularização de piso com quina boleada', unid: 'm²' },
        { cod: '7.02.002', desc: 'Impermeabilização com Viaplus 7000 ou similar', unid: 'm²' },
        { cod: '7.02.003', desc: 'Impermeabilização com manta asfáltica', unid: 'm²' },
        { cod: '7.02.004', desc: 'Proteção mecânica', unid: 'un' },
      ]},
    ]
  },
  {
    id: '08', nome: 'INSTALAÇÕES HIDROSSANITÁRIAS',
    grupos: [
      { id: '8.01', nome: 'Hidráulica', itens: [
        { cod: '8.01.001', desc: 'Ponto de água fria - novo', unid: 'un' },
        { cod: '8.01.002', desc: 'Ponto de água fria - adequação', unid: 'un' },
        { cod: '8.01.003', desc: 'Ponto de água quente - novo', unid: 'un' },
        { cod: '8.01.004', desc: 'Ponto de esgoto - novo', unid: 'un' },
        { cod: '8.01.005', desc: 'Ponto de esgoto - adequação', unid: 'un' },
        { cod: '8.01.006', desc: 'Ponto de esgoto a vácuo', unid: 'un' },
        { cod: '8.01.007', desc: 'Bomba de pressão', unid: 'un' },
        { cod: '8.01.008', desc: 'Fechamento de pontos existentes', unid: 'un' },
        { cod: '8.01.009', desc: 'Ponto de dreno com isolamento', unid: 'un' },
        { cod: '8.01.010', desc: 'Bomba de dreno', unid: 'un' },
        { cod: '8.01.011', desc: 'Fornecimento de materiais hidráulicos periféricos', unid: 'vb' },
        { cod: '8.01.012', desc: 'MDO para instalação de louças e metais', unid: 'un' },
        { cod: '8.01.013', desc: 'MDO para revisão / manutenção de louças e metais existentes', unid: 'un' },
      ]},
    ]
  },
  {
    id: '09', nome: 'PREVENÇÃO E COMBATE A INCÊNDIO',
    grupos: [
      { id: '9.01', nome: 'Combate a incêndio - Sprinkler / Hidrante / Extintor', itens: [
        { cod: '9.01.001', desc: 'Remanejamento de ponto de sprinkler existente', unid: 'un' },
        { cod: '9.01.002', desc: 'Acréscimo de ponto de sprinkler', unid: 'un' },
        { cod: '9.01.003', desc: 'Fornecimento de bico de sprinkler novo', unid: 'un' },
        { cod: '9.01.004', desc: 'Acréscimo de ponto de hidrante', unid: 'un' },
        { cod: '9.01.005', desc: 'Remanejamento de hidrante existente', unid: 'un' },
        { cod: '9.01.006', desc: 'Extintor de água pressurizada - 10 litros', unid: 'un' },
        { cod: '9.01.007', desc: 'Extintor de CO2 - 6kg e/ou BC', unid: 'un' },
        { cod: '9.01.008', desc: 'Extintor de Pó Químico - 4kg ABC', unid: 'un' },
        { cod: '9.01.009', desc: 'Suporte de piso aramado para extintor', unid: 'un' },
        { cod: '9.01.010', desc: 'Suporte de piso cromado / aço inox tipo batom para extintor', unid: 'un' },
      ]},
      { id: '9.02', nome: 'Prevenção - Detecção de Fumaça', itens: [
        { cod: '9.02.001', desc: 'Remanejamento de detectores de fumaça existente', unid: 'un' },
        { cod: '9.02.002', desc: 'Acréscimo de detector de fumaça novo', unid: 'un' },
        { cod: '9.02.003', desc: 'Comissionamento e configuração dos pontos novos e readequados na central do condomínio e startup do sistema', unid: 'un' },
        { cod: '9.02.004', desc: 'Sonofletor', unid: 'un' },
        { cod: '9.02.005', desc: 'Iluminação de emergência tipo bloco autônomo', unid: 'un' },
        { cod: '9.02.006', desc: 'Iluminação de emergência tipo balizador de rota de fuga', unid: 'un' },
        { cod: '9.02.007', desc: 'Sinalização de sistema de combate a incêndio - placas coladas na parede', unid: 'un' },
        { cod: '9.02.008', desc: 'Sirene + botoeira de acionamento de alarme de incêndio', unid: 'un' },
        { cod: '9.02.009', desc: 'Remanejamento de sirene + botoeira de acionamento de alarme de incêndio existente', unid: 'un' },
      ]},
      { id: '9.03', nome: 'Equipamentos', itens: [
        { cod: '9.03.001', desc: 'Sistema de gás para CPD', unid: 'un' },
        { cod: '9.03.002', desc: 'Central de Detecção de Fumaça nova', unid: 'un' },
        { cod: '9.03.003', desc: 'Caixa de hidrante com acabamento para pintura', unid: 'un' },
        { cod: '9.03.004', desc: 'Caixa de hidrante com acabamento em aço inox', unid: 'un' },
        { cod: '9.03.005', desc: 'Acessórios para hidrante - mangueira 15m, esguicho, registro, adaptador e chave Storz', unid: 'un' },
        { cod: '9.03.006', desc: 'ITENS DIVERSOS - DESCREVER', unid: 'vb' },
      ]},
    ]
  },
  {
    id: '10', nome: 'ELÉTRICA',
    grupos: [
      { id: '10.01', nome: 'Infraestrutura', itens: [
        { cod: '10.01.001', desc: 'Abertura/Fechamento de piso elevado para instalações gerais', unid: 'm²' },
        { cod: '10.01.002', desc: 'Infraestrutura seca, incluindo: eletrocalhas, eletrodutos, perfilados, parafusos, porcas, arruelas e outros', unid: 'm²' },
        { cod: '10.01.003', desc: 'Quadro elétrico novo', unid: 'un' },
        { cod: '10.01.004', desc: 'Readequação de quadro elétrico existente', unid: 'un' },
      ]},
      { id: '10.02', nome: 'Distribuição', itens: [
        { cod: '10.02.001', desc: 'Fornecimento de material e MDO especializada para distribuição de energia - alimentadores', unid: 'vb' },
        { cod: '10.02.002', desc: 'Fornecimento de material e MDO especializada para distribuição de energia - tomadas', unid: 'pt' },
        { cod: '10.02.003', desc: 'Fornecimento de material e MDO especializada para distribuição de energia - iluminação', unid: 'vb' },
        { cod: '10.02.004', desc: 'Remanejamento de circuitos existentes - tomadas', unid: 'un' },
        { cod: '10.02.005', desc: 'Remanejamento de circuitos existentes - iluminação', unid: 'un' },
        { cod: '10.02.006', desc: 'Acabamentos de tomadas / interruptores', unid: 'vb' },
        { cod: '10.02.007', desc: 'Tomadas especiais', unid: 'un' },
      ]},
      { id: '10.03', nome: 'Equipamentos', itens: [
        { cod: '10.03.001', desc: 'No Break / UPS', unid: 'un' },
        { cod: '10.03.002', desc: 'MDO especializada para instalação de equipamento existente', unid: 'pt' },
        { cod: '10.03.003', desc: 'Estabilizador novo', unid: 'un' },
        { cod: '10.03.004', desc: 'Transformador novo', unid: 'un' },
      ]},
      { id: '10.04', nome: 'Elétrica Diversos', itens: [
        { cod: '10.04.001', desc: 'Fornecimento de material e MDO especializada para instalações elétricas novas', unid: 'vb' },
        { cod: '10.04.002', desc: 'Fornecimento de material e MDO especializada para readequação de instalações elétricas existentes', unid: 'vb' },
        { cod: '10.04.003', desc: 'ITENS DIVERSOS - DESCREVER', unid: 'vb' },
      ]},
    ]
  },
  {
    id: '11', nome: 'CABEAMENTO ESTRUTURADO',
    grupos: [
      { id: '11.01', nome: 'Rede / Lógica', itens: [
        { cod: '11.01.001', desc: 'Fornecimento de material e MDO para instalação de pontos de lógica CAT5e (Conector RJ-45, Patch Cord, Patch Panel, Cabeamento)', unid: 'pt' },
        { cod: '11.01.002', desc: 'Fornecimento de material e MDO para instalação de pontos de lógica CAT6 (Conector RJ-45, Patch Cord, Patch Panel, Cabeamento)', unid: 'pt' },
        { cod: '11.01.003', desc: 'Fornecimento de material e MDO para instalação de pontos de lógica CAT6A (Conector RJ-45, Patch Cord, Patch Panel, Cabeamento)', unid: 'pt' },
        { cod: '11.01.004', desc: 'MDO para remanejamento de cabeamento estruturado existente', unid: 'pt' },
        { cod: '11.01.005', desc: 'Fibra óptica para Backbone', unid: 'vb' },
        { cod: '11.01.006', desc: 'Espelhamento metálico/óptico entre os racks', unid: 'vb' },
      ]},
      { id: '11.02', nome: 'Equipamentos', itens: [
        { cod: '11.02.001', desc: 'Rack aberto', unid: 'un' },
        { cod: '11.02.002', desc: 'Rack fechado', unid: 'un' },
        { cod: '11.02.003', desc: 'Rack cabling', unid: 'un' },
        { cod: '11.02.004', desc: 'MDO para remanejamento de rack(s), patch panel(s), entre outros materiais periféricos', unid: 'vb' },
        { cod: '11.02.005', desc: 'Itens periféricos', unid: 'un' },
      ]},
    ]
  },
  {
    id: '12', nome: 'ÁUDIO E VÍDEO',
    grupos: [
      { id: '12.01', nome: 'Áudio e Vídeo', itens: [
        { cod: '12.01.001', desc: 'Áudio e Vídeo', unid: 'vb' },
        { cod: '12.01.002', desc: 'MDO para instalação de TV', unid: 'vb' },
      ]},
      { id: '12.02', nome: 'Equipamentos', itens: [
        { cod: '12.02.001', desc: 'Suporte de TV fixo', unid: 'un' },
        { cod: '12.02.002', desc: 'Suporte de TV regulável', unid: 'un' },
        { cod: '12.02.003', desc: 'Projetor', unid: 'm' },
        { cod: '12.02.004', desc: 'Tela', unid: 'm' },
        { cod: '12.02.005', desc: 'Cabo HDMI', unid: 'm' },
      ]},
    ]
  },
  {
    id: '13', nome: 'AUTOMAÇÃO',
    grupos: [
      { id: '13.01', nome: 'Automação', itens: [
        { cod: '13.01.001', desc: 'Automação', unid: 'vb' },
      ]},
    ]
  },
  {
    id: '14', nome: 'HVAC',
    grupos: [
      { id: '14.01', nome: 'Ar Condicionado', itens: [
        { cod: '14.01.001', desc: 'Fornecimento de materiais e MDO especializada para instalação de sistema de ar condicionado', unid: 'vb' },
        { cod: '14.01.002', desc: 'MDO especializada para instalação de sistema de ar condicionado', unid: 'vb' },
        { cod: '14.01.003', desc: 'MDO especializada para readequação de sistema de ar condicionado existente', unid: 'vb' },
        { cod: '14.01.004', desc: 'Exaustão mecânica', unid: 'un' },
        { cod: '14.01.005', desc: 'Fornecimento e instalação de materiais periféricos', unid: 'un' },
        { cod: '14.01.006', desc: 'Balanceamento', unid: 'vb' },
        { cod: '14.01.007', desc: 'Comissionamento', unid: 'vb' },
        { cod: '14.01.008', desc: 'Manutenção e limpeza de equipamento existente', unid: 'un' },
      ]},
      { id: '14.02', nome: 'Equipamentos', itens: [
        { cod: '14.02.001', desc: 'Equipamento tipo Split System modelo Hi-Wall', unid: 'un' },
        { cod: '14.02.002', desc: 'Equipamento tipo Multi Split System modelo Hi-Wall', unid: 'un' },
        { cod: '14.02.003', desc: 'Equipamento tipo Split System modelo Cassete', unid: 'un' },
        { cod: '14.02.004', desc: 'Equipamento complementar para sistema de AC existente', unid: 'un' },
        { cod: '14.02.005', desc: 'Ventilador para exaustão', unid: 'un' },
        { cod: '14.02.006', desc: 'Ecoquest', unid: 'un' },
        { cod: '14.02.007', desc: 'ITENS DIVERSOS - DESCREVER', unid: 'vb' },
      ]},
    ]
  },
  {
    id: '15', nome: 'SEGURANÇA',
    grupos: [
      { id: '15.01', nome: 'Segurança', itens: [
        { cod: '15.01.001', desc: 'Controle de acesso', unid: 'un' },
        { cod: '15.01.002', desc: 'Catraca', unid: 'un' },
        { cod: '15.01.003', desc: 'Fornecimento e instalação de CFTV', unid: 'vb' },
        { cod: '15.01.004', desc: 'MDO para remanejamento de equipamentos de segurança e/ou CFTV', unid: 'vb' },
      ]},
    ]
  },
  {
    id: '16', nome: 'GESSO',
    grupos: [
      { id: '16.01', nome: 'Drywall', itens: [
        { cod: '16.01.001', desc: 'Parede de drywall ST/ST com montante 48 sem lã', unid: 'm²' },
        { cod: '16.01.002', desc: 'Parede de drywall RU/RU com montante 48 sem lã', unid: 'm²' },
        { cod: '16.01.003', desc: 'Parede de drywall RF/RF com montante 48 sem lã', unid: 'm²' },
        { cod: '16.01.004', desc: 'Parede de drywall ST/ST com montante 70 sem lã', unid: 'm²' },
        { cod: '16.01.005', desc: 'Parede de drywall RU/RU com montante 70 sem lã', unid: 'm²' },
        { cod: '16.01.006', desc: 'Parede de drywall RF/RF com montante 70 sem lã', unid: 'm²' },
        { cod: '16.01.007', desc: 'Parede de drywall ST/ST com montante 90 sem lã', unid: 'm²' },
        { cod: '16.01.008', desc: 'Parede de drywall RU/RU com montante 90 sem lã', unid: 'm²' },
        { cod: '16.01.009', desc: 'Parede de drywall RF/RF com montante 90 sem lã', unid: 'm²' },
        { cod: '16.01.010', desc: 'Contraparede de drywall ST com montante 48 sem lã', unid: 'm²' },
        { cod: '16.01.011', desc: 'Contraparede de drywall RU com montante 48 sem lã', unid: 'm²' },
        { cod: '16.01.012', desc: 'Contraparede de drywall RF com montante 48 sem lã', unid: 'm²' },
        { cod: '16.01.013', desc: 'Parede de drywall chapa dupla 2ST/2ST com montante 48 sem lã', unid: 'm²' },
        { cod: '16.01.014', desc: 'Parede de drywall chapa dupla 2RU/2RU com montante 48 sem lã', unid: 'm²' },
        { cod: '16.01.015', desc: 'Parede de drywall chapa dupla 2RF/2RF com montante 48 sem lã', unid: 'm²' },
        { cod: '16.01.016', desc: 'Parede de drywall chapa dupla 2ST/2ST com montante 70 sem lã', unid: 'm²' },
        { cod: '16.01.017', desc: 'Parede de drywall chapa dupla 2RU/2RU com montante 70 sem lã', unid: 'm²' },
        { cod: '16.01.018', desc: 'Parede de drywall chapa dupla 2RF/2RF com montante 70 sem lã', unid: 'm²' },
        { cod: '16.01.049', desc: 'Isolamento acústico - Lã 32kg/m³', unid: 'm²' },
        { cod: '16.01.050', desc: 'Isolamento acústico - Lã 64kg/m³', unid: 'm²' },
        { cod: '16.01.051', desc: 'Isolamento acústico - Lã de vidro', unid: 'm²' },
        { cod: '16.01.052', desc: 'Reforço de madeira para drywall', unid: 'm²' },
        { cod: '16.01.053', desc: 'Reforço metálico em chapa de aço para drywall', unid: 'm²' },
        { cod: '16.01.054', desc: 'Aberturas e fechamentos em paredes para intervenção de terceiros', unid: 'm²' },
        { cod: '16.01.055', desc: 'Fornecimento e instalação de banda acústica', unid: 'vb' },
        { cod: '16.01.056', desc: 'Abertura de nicho/vão para itens especiais', unid: 'un' },
        { cod: '16.01.057', desc: 'Complemento e adequação de paredes drywall existentes', unid: 'm²' },
        { cod: '16.01.058', desc: 'Revestimento em chapa de gesso simples', unid: 'm²' },
        { cod: '16.01.059', desc: 'Parede de gesso curva', unid: 'm²' },
        { cod: '16.01.060', desc: 'Parede de drywall especial', unid: 'm²' },
      ]},
    ]
  },
  {
    id: '17', nome: 'FORRO',
    grupos: [
      { id: '17.01', nome: 'Forro de gesso acartonado', itens: [
        { cod: '17.01.001', desc: 'Forro de gesso acartonado liso FGE', unid: 'm²' },
        { cod: '17.01.002', desc: 'Forro de gesso acartonado liso FGE - curvo', unid: 'm²' },
        { cod: '17.01.003', desc: 'Forro de gesso liso tipo Cleaneo', unid: 'm²' },
        { cod: '17.01.004', desc: 'Faixa de gesso acartonado liso com largura inferior a 1 metro', unid: 'm²' },
        { cod: '17.01.005', desc: 'Confecção de sanca em gesso para embutir iluminação', unid: 'm²' },
        { cod: '17.01.006', desc: 'Confecção de sanca até 5 elementos', unid: 'm²' },
        { cod: '17.01.007', desc: 'Fechamento vertical', unid: 'm' },
        { cod: '17.01.008', desc: 'Tabica metálica', unid: 'm' },
        { cod: '17.01.009', desc: 'Cortineiro', unid: 'm' },
        { cod: '17.01.010', desc: 'Reforço linear em madeira', unid: 'm' },
        { cod: '17.01.011', desc: 'Abertura de forro para luminárias', unid: 'un' },
        { cod: '17.01.012', desc: 'Abertura e fechamento de forro para intervenção de terceiros', unid: 'un' },
      ]},
      { id: '17.02', nome: 'Forro modular', itens: [
        { cod: '17.02.001', desc: 'Forro modular mineral - até NRC 0,6', unid: 'm²' },
        { cod: '17.02.002', desc: 'Forro modular mineral - até NRC 0,75', unid: 'm²' },
        { cod: '17.02.003', desc: 'Forro modular mineral - até NRC 0,9', unid: 'm²' },
        { cod: '17.02.004', desc: 'Forro modular mineral Especial', unid: 'm²' },
        { cod: '17.02.005', desc: 'MDO para montagem de forro modular mineral fornecido pelo cliente / proprietário', unid: 'dia' },
      ]},
      { id: '17.03', nome: 'Forro especial', itens: [
        { cod: '17.03.001', desc: 'Forro tipo nuvem', unid: 'm²' },
        { cod: '17.03.002', desc: 'Forro tipo baffle', unid: 'm²' },
        { cod: '17.03.003', desc: 'Forro metálico', unid: 'm²' },
        { cod: '17.03.004', desc: 'Forro em tecido', unid: 'm²' },
        { cod: '17.03.005', desc: 'Grid metálico', unid: 'dia' },
      ]},
      { id: '17.04', nome: 'Acessórios', itens: [
        { cod: '17.04.001', desc: 'Alçapão metálico 45x45cm', unid: 'un' },
        { cod: '17.04.002', desc: 'Alçapão metálico 60x60cm', unid: 'un' },
        { cod: '17.04.003', desc: 'Alçapão simples 45x45cm', unid: 'un' },
        { cod: '17.04.004', desc: 'Alçapão simples 60x60cm', unid: 'un' },
        { cod: '17.04.005', desc: 'Alçapão oculto 45x45cm', unid: 'un' },
        { cod: '17.04.006', desc: 'Alçapão oculto 60x60cm', unid: 'un' },
      ]},
    ]
  },
  {
    id: '18', nome: 'PINTURA',
    grupos: [
      { id: '18.01', nome: 'Pintura', itens: [
        { cod: '18.01.001', desc: 'Pintura de parede interna nova - drywall / alvenaria - emassamento, lixamento e pintura com tinta látex a definir - Coral/Suvinil', unid: 'm²' },
        { cod: '18.01.002', desc: 'Pintura de parede externa nova - alvenaria - emassamento, lixamento e pintura com tinta látex a definir - Coral/Suvinil', unid: 'm²' },
        { cod: '18.01.003', desc: 'Pintura nova com textura - Terracor ou similar', unid: 'm²' },
        { cod: '18.01.004', desc: 'Pintura nova tipo cimento queimado - Coral/Suvinil', unid: 'm²' },
        { cod: '18.01.005', desc: 'Repintura em paredes de alvenaria e gesso existentes', unid: 'm²' },
        { cod: '18.01.006', desc: 'Pintura de forro de gesso liso e tabeiras', unid: 'm²' },
        { cod: '18.01.007', desc: 'Pintura em sanca de gesso nova', unid: 'm²' },
        { cod: '18.01.008', desc: 'Pintura de laje', unid: 'm²' },
        { cod: '18.01.009', desc: 'Serviço de jateamento de laje', unid: 'm²' },
        { cod: '18.01.010', desc: 'Aplicação de resina em laje aparente', unid: 'm²' },
        { cod: '18.01.011', desc: 'Pintura de porta', unid: 'un' },
        { cod: '18.01.012', desc: 'Pintura de rodapé', unid: 'm' },
        { cod: '18.01.013', desc: 'Pintura de piso elevado', unid: 'm²' },
        { cod: '18.01.014', desc: 'Pintura de piso com tinta / resina epóxi autobrilho', unid: 'm²' },
        { cod: '18.01.015', desc: 'Pintura especial', unid: 'm²' },
      ]},
    ]
  },
  {
    id: '19', nome: 'DIVISÓRIAS E PORTAS',
    grupos: [
      { id: '19.01', nome: 'Divisória industrial', itens: [
        { cod: '19.01.001', desc: 'Divisória industrial em painel BP encaixilhado em perfil de alumínio', unid: 'm²' },
        { cod: '19.01.002', desc: 'Divisória industrial de vidro simples junta seca, encaixilhado em perfil de alumínio', unid: 'm²' },
        { cod: '19.01.003', desc: 'Divisória industrial de vidro simples encaixilhado em perfil de alumínio', unid: 'm²' },
        { cod: '19.01.004', desc: 'Divisória industrial de vidro duplo junta seca, encaixilhado em perfil de alumínio', unid: 'm²' },
        { cod: '19.01.005', desc: 'Divisória industrial de vidro duplo encaixilhado em perfil de alumínio', unid: 'm²' },
        { cod: '19.01.009', desc: 'Película / adesivo jateado', unid: 'm²' },
        { cod: '19.01.010', desc: 'Persiana manual para divisória industrial', unid: 'm²' },
        { cod: '19.01.015', desc: 'Remanejamento de divisória industrial existente', unid: 'm²' },
        { cod: '19.01.016', desc: 'ITENS DIVERSOS - DESCREVER', unid: 'vb' },
      ]},
      { id: '19.02', nome: 'Porta em madeira', itens: [
        { cod: '19.02.001', desc: 'Porta de giro folha simples com acabamento em madeira - 0,60x2,10m', unid: 'un' },
        { cod: '19.02.002', desc: 'Porta de giro folha simples com acabamento em madeira - 0,70x2,10m', unid: 'un' },
        { cod: '19.02.003', desc: 'Porta de giro folha simples com acabamento em madeira - 0,80x2,10m', unid: 'un' },
        { cod: '19.02.004', desc: 'Porta de giro folha simples com acabamento em madeira - 0,90x2,10m', unid: 'un' },
        { cod: '19.02.013', desc: 'Remanejamento de porta em madeira existente', unid: 'un' },
      ]},
      { id: '19.03', nome: 'Porta em Vidro', itens: [
        { cod: '19.03.001', desc: 'Porta de giro piso teto em Vidro Simples - Fechadura LaFonte ou similar - 60cm', unid: 'un' },
        { cod: '19.03.002', desc: 'Porta de giro piso teto em Vidro Simples - Fechadura LaFonte ou similar - 70cm', unid: 'un' },
        { cod: '19.03.003', desc: 'Porta de giro piso teto em Vidro Simples - Fechadura LaFonte ou similar - 80cm', unid: 'un' },
        { cod: '19.03.004', desc: 'Porta de giro piso teto em Vidro Simples - Fechadura LaFonte ou similar - 90cm', unid: 'un' },
        { cod: '19.03.006', desc: 'Porta de giro piso teto em Vidro Duplo - Fechadura LaFonte ou similar - 60cm', unid: 'un' },
        { cod: '19.03.007', desc: 'Porta de giro piso teto em Vidro Duplo - Fechadura LaFonte ou similar - 70cm', unid: 'un' },
        { cod: '19.03.008', desc: 'Porta de giro piso teto em Vidro Duplo - Fechadura LaFonte ou similar - 80cm', unid: 'un' },
        { cod: '19.03.009', desc: 'Porta de giro piso teto em Vidro Duplo - Fechadura LaFonte ou similar - 90cm', unid: 'un' },
        { cod: '19.03.011', desc: 'Remanejamento de porta de vidro existente', unid: 'un' },
      ]},
      { id: '19.04', nome: 'Porta automática', itens: [
        { cod: '19.04.001', desc: 'Porta automática de vidro simples', unid: 'un' },
        { cod: '19.04.002', desc: 'Porta automática de vidro duplo', unid: 'un' },
        { cod: '19.04.003', desc: 'Porta automática em BP', unid: 'un' },
        { cod: '19.04.004', desc: 'Desinstalação e instalação de porta automática existente', unid: 'un' },
      ]},
      { id: '19.05', nome: 'Portas diversas', itens: [
        { cod: '19.05.001', desc: 'Porta corta fogo, folha simples, PCF-90', unid: 'un' },
        { cod: '19.05.002', desc: 'Porta corta fogo, folha dupla, PCF-90', unid: 'un' },
        { cod: '19.05.003', desc: 'Desinstalação e instalação de PCF existente a ser reaproveitada', unid: 'un' },
        { cod: '19.05.004', desc: 'Porta tipo guilhotina', unid: 'un' },
        { cod: '19.05.005', desc: 'Porta acústica especial', unid: 'un' },
      ]},
    ]
  },
  {
    id: '20', nome: 'VIDRAÇARIA',
    grupos: [
      { id: '20.01', nome: 'Vidraçaria', itens: [
        { cod: '20.01.001', desc: 'Divisória de vidro simples, perfil "U" em alumínio', unid: 'un' },
        { cod: '20.01.007', desc: 'Mola aérea - Dorma ou similar', unid: 'un' },
        { cod: '20.01.008', desc: 'Mola de piso - Dorma ou similar', unid: 'un' },
        { cod: '20.01.009', desc: 'Puxador especial', unid: 'un' },
        { cod: '20.01.010', desc: 'Espelho comum 4mm', unid: 'un' },
        { cod: '20.01.011', desc: 'Espelho especial 4mm', unid: 'un' },
        { cod: '20.01.012', desc: 'Lousa em vidro branco comum 6mm', unid: 'un' },
        { cod: '20.01.013', desc: 'Lousa em vidro branco extraclear 6mm', unid: 'un' },
        { cod: '20.01.014', desc: 'Fornecimento e instalação de guarda-corpo em vidro', unid: 'vb' },
        { cod: '20.01.015', desc: 'Revestimento de parede com vidro especial', unid: 'm²' },
      ]},
      { id: '20.02', nome: 'Caixilharia', itens: [
        { cod: '20.02.001', desc: 'Janela de correr com vidro simples e estrutura de alumínio - cor branco', unid: 'un' },
        { cod: '20.02.002', desc: 'Janela de giro com vidro simples e estrutura de alumínio - cor branco', unid: 'un' },
        { cod: '20.02.003', desc: 'Janela de correr com vidro duplo e estrutura de alumínio - cor branco', unid: 'un' },
        { cod: '20.02.004', desc: 'Janela de giro com vidro duplo e estrutura de alumínio - cor branco', unid: 'un' },
        { cod: '20.02.013', desc: 'ITENS DIVERSOS - DESCREVER', unid: 'vb' },
      ]},
    ]
  },
  {
    id: '21', nome: 'SERRALHERIA',
    grupos: [
      { id: '21.01', nome: 'Serralheria', itens: [
        { cod: '21.01.001', desc: 'Corrimão metálico', unid: 'm' },
        { cod: '21.01.002', desc: 'Guardacorpo metálico', unid: 'm' },
        { cod: '21.01.003', desc: 'Prateleira metálica', unid: 'un' },
        { cod: '21.01.004', desc: 'Suporte/Reforço metálico para itens diversos (forro / drywall / entre outros)', unid: 'm' },
        { cod: '21.01.005', desc: 'Estante metálica industrial', unid: 'un' },
        { cod: '21.01.006', desc: 'Estante metálica decorativa', unid: 'un' },
        { cod: '21.01.007', desc: 'ITENS DIVERSOS - DESCREVER', unid: 'vb' },
      ]},
    ]
  },
  {
    id: '22', nome: 'MARMORARIA / PEDRAS',
    grupos: [
      { id: '22.01', nome: 'Marmoraria / Pedras', itens: [
        { cod: '22.01.001', desc: 'Bancada', unid: 'un' },
        { cod: '22.01.002', desc: 'Baguete', unid: 'un' },
        { cod: '22.01.003', desc: 'Soleira', unid: 'un' },
        { cod: '22.01.004', desc: 'Revestimento de piso', unid: 'm²' },
        { cod: '22.01.005', desc: 'Revestimento de parede', unid: 'm²' },
        { cod: '22.01.006', desc: 'ITENS DIVERSOS - DESCREVER', unid: 'vb' },
      ]},
    ]
  },
  {
    id: '23', nome: 'MARCENARIA',
    grupos: [
      { id: '23.01', nome: 'Marcenaria', itens: [
        { cod: '23.01.001', desc: 'Balcão de recepção', unid: 'un' },
        { cod: '23.01.002', desc: 'Painel em marcenaria', unid: 'un' },
        { cod: '23.01.003', desc: 'Prateleiras', unid: 'un' },
        { cod: '23.01.004', desc: 'Estante especial', unid: 'un' },
        { cod: '23.01.005', desc: 'Mesa de reunião especial', unid: 'un' },
        { cod: '23.01.006', desc: 'Aparador', unid: 'un' },
        { cod: '23.01.007', desc: 'Credenza', unid: 'un' },
        { cod: '23.01.008', desc: 'Gabinete para Copa', unid: 'un' },
        { cod: '23.01.009', desc: 'Armário alto para Copa', unid: 'un' },
        { cod: '23.01.010', desc: 'Bancada em marcenaria', unid: 'un' },
        { cod: '23.01.011', desc: 'Gabinete para WCs', unid: 'un' },
        { cod: '23.01.012', desc: 'Armário alto para DML', unid: 'un' },
        { cod: '23.01.013', desc: 'Gabinete para DML', unid: 'un' },
        { cod: '23.01.014', desc: 'Porta especial em marcenaria', unid: 'un' },
        { cod: '23.01.015', desc: 'Forro em marcenaria', unid: 'm²' },
        { cod: '23.01.016', desc: 'Pergolado', unid: 'un' },
        { cod: '23.01.017', desc: 'Desmontagem e montagem de marcenaria', unid: 'un' },
        { cod: '23.01.018', desc: 'ITENS DIVERSOS - DESCREVER', unid: 'vb' },
      ]},
    ]
  },
  {
    id: '24', nome: 'PISOS E REVESTIMENTOS',
    grupos: [
      { id: '24.01', nome: 'Carpete', itens: [
        { cod: '24.01.001', desc: 'Carpete nacional em placa - Fabricante e modelo a definir', unid: 'm²' },
        { cod: '24.01.002', desc: 'Carpete nacional em rolo - Fabricante e modelo a definir', unid: 'm²' },
        { cod: '24.01.003', desc: 'Carpete importado em placa - Fabricante e modelo a definir', unid: 'm²' },
        { cod: '24.01.004', desc: 'Carpete importado em rolo - Fabricante e modelo a definir', unid: 'm²' },
        { cod: '24.01.005', desc: 'MDO para instalação de carpete', unid: 'm²' },
      ]},
      { id: '24.02', nome: 'Piso Vinílico', itens: [
        { cod: '24.02.001', desc: 'Piso vinílico 3mm em régua/placa', unid: 'm²' },
        { cod: '24.02.002', desc: 'Piso vinílico 3mm em manta', unid: 'm²' },
        { cod: '24.02.003', desc: 'Piso vinílico 5mm em régua/placa', unid: 'm²' },
        { cod: '24.02.004', desc: 'Piso vinílico 5mm em manta', unid: 'm²' },
        { cod: '24.02.005', desc: 'MDO para instalação de piso vinílico', unid: 'm²' },
      ]},
      { id: '24.03', nome: 'Revestimento cerâmico e porcelanato', itens: [
        { cod: '24.03.001', desc: 'Revestimento cerâmico 10x10cm', unid: 'm²' },
        { cod: '24.03.002', desc: 'Revestimento cerâmico 10x20cm', unid: 'm²' },
        { cod: '24.03.005', desc: 'Porcelanato 60x60cm', unid: 'm²' },
        { cod: '24.03.006', desc: 'Porcelanato 90x90cm', unid: 'm²' },
        { cod: '24.03.007', desc: 'Porcelanato 100x100cm', unid: 'm²' },
        { cod: '24.03.008', desc: 'Porcelanato 120x120cm', unid: 'm²' },
        { cod: '24.03.010', desc: 'Porcelanato especial', unid: 'm²' },
        { cod: '24.03.011', desc: 'Pastilha de vidro', unid: 'm²' },
        { cod: '24.03.013', desc: 'Tijolinho', unid: 'm²' },
        { cod: '24.03.014', desc: 'Ladrilho hidráulico', unid: 'm²' },
      ]},
      { id: '24.04', nome: 'Insumos', itens: [
        { cod: '24.04.001', desc: 'Cola especial para carpete', unid: 'un' },
        { cod: '24.04.002', desc: 'Cola especial para piso vinílico', unid: 'un' },
        { cod: '24.04.004', desc: 'Autonivelante para regularização de piso existente', unid: 'm²' },
        { cod: '24.04.006', desc: 'Argamassa e rejunte para assentamento de revestimento cerâmico e porcelanato', unid: 'm²' },
      ]},
      { id: '24.05', nome: 'Rodapé', itens: [
        { cod: '24.05.001', desc: 'Rodapé em madeira', unid: 'm' },
        { cod: '24.05.002', desc: 'Rodapé Santa Luzia', unid: 'm' },
        { cod: '24.05.003', desc: 'Rodapé cerâmico', unid: 'm' },
      ]},
      { id: '24.06', nome: 'Revestimento de parede', itens: [
        { cod: '24.06.001', desc: 'Papel de parede', unid: 'm²' },
        { cod: '24.06.002', desc: 'Revestimento vinílico para parede', unid: 'm²' },
        { cod: '24.06.003', desc: 'Revestimento de parede especial', unid: 'm²' },
        { cod: '24.06.004', desc: 'ITENS DIVERSOS - DESCREVER', unid: 'vb' },
      ]},
    ]
  },
  {
    id: '25', nome: 'LOUÇAS E METAIS',
    grupos: [
      { id: '25.01', nome: 'Louças', itens: [
        { cod: '25.01.001', desc: 'KIT Vaso sanitário com caixa acoplada, assento plástico, anel de vedação e parafuso de fixação', unid: 'un' },
        { cod: '25.01.002', desc: 'Vaso sanitário', unid: 'un' },
        { cod: '25.01.005', desc: 'Lavatório', unid: 'un' },
        { cod: '25.01.007', desc: 'Cuba de embutir', unid: 'un' },
        { cod: '25.01.008', desc: 'Cuba de sobrepor', unid: 'un' },
        { cod: '25.01.011', desc: 'Mictório', unid: 'un' },
        { cod: '25.01.012', desc: 'Vaso sanitário PCD', unid: 'un' },
        { cod: '25.01.013', desc: 'Lavatório / cuba PCD', unid: 'un' },
      ]},
      { id: '25.02', nome: 'Metais', itens: [
        { cod: '25.02.001', desc: 'Torneira de parede', unid: 'un' },
        { cod: '25.02.002', desc: 'Torneira de mesa', unid: 'un' },
        { cod: '25.02.004', desc: 'Torneira com sensor', unid: 'un' },
        { cod: '25.02.005', desc: 'Misturador monocomando', unid: 'un' },
        { cod: '25.02.006', desc: 'Acabamento de registro', unid: 'un' },
        { cod: '25.02.007', desc: 'Cuba simples de embutir em aço inox', unid: 'un' },
      ]},
      { id: '25.03', nome: 'Acessórios', itens: [
        { cod: '25.03.001', desc: 'Válvula de escoamento', unid: 'un' },
        { cod: '25.03.003', desc: 'Sifão', unid: 'un' },
        { cod: '25.03.010', desc: 'Cabideiro', unid: 'un' },
        { cod: '25.03.011', desc: 'Toalheiro', unid: 'un' },
        { cod: '25.03.012', desc: 'Porta sabonete', unid: 'un' },
        { cod: '25.03.013', desc: 'Porta papel higiênico', unid: 'un' },
        { cod: '25.03.014', desc: 'Ralo quadrado oculto', unid: 'un' },
        { cod: '25.03.015', desc: 'Ralo linear oculto', unid: 'un' },
        { cod: '25.03.016', desc: 'Ralo quadrado com acabamento em inox', unid: 'un' },
        { cod: '25.03.018', desc: 'Ralo linear com acabamento em inox', unid: 'un' },
      ]},
    ]
  },
  {
    id: '26', nome: 'ILUMINAÇÃO',
    grupos: [
      { id: '26.01', nome: 'Luminotécnico', itens: [
        { cod: '26.01.001', desc: 'Luminária / painel de LED retangular de embutir', unid: 'un' },
        { cod: '26.01.002', desc: 'Luminária / painel de LED retangular de sobrepor', unid: 'un' },
        { cod: '26.01.003', desc: 'Luminária / painel de LED quadrado de embutir', unid: 'un' },
        { cod: '26.01.004', desc: 'Luminária / painel de LED quadrado de sobrepor', unid: 'un' },
        { cod: '26.01.005', desc: 'Luminária / painel de LED redondo de embutir', unid: 'un' },
        { cod: '26.01.006', desc: 'Luminária / painel de LED redondo de sobrepor', unid: 'un' },
        { cod: '26.01.007', desc: 'Luminária pendente', unid: 'un' },
        { cod: '26.01.008', desc: 'Luminária tipo spot simples', unid: 'un' },
        { cod: '26.01.009', desc: 'Luminária tipo spot duplo', unid: 'un' },
        { cod: '26.01.010', desc: 'Spot simples de sobrepor', unid: 'un' },
        { cod: '26.01.011', desc: 'Spot duplo de sobrepor', unid: 'un' },
        { cod: '26.01.013', desc: 'Trilho eletrificado com spot', unid: 'un' },
        { cod: '26.01.014', desc: 'Arandela decorativa', unid: 'un' },
        { cod: '26.01.016', desc: 'Sistema de automação das luminárias', unid: 'vb' },
        { cod: '26.01.017', desc: 'MDO para instalação de luminárias', unid: 'un' },
      ]},
    ]
  },
  {
    id: '27', nome: 'PERSIANA',
    grupos: [
      { id: '27.01', nome: 'Persiana', itens: [
        { cod: '27.01.001', desc: 'Persiana Thermoscreen rolô 1%', unid: 'un' },
        { cod: '27.01.002', desc: 'Persiana Thermoscreen rolô 3%', unid: 'un' },
        { cod: '27.01.003', desc: 'Persiana Thermoscreen rolô 5%', unid: 'un' },
        { cod: '27.01.004', desc: 'Persiana Blackout', unid: 'un' },
        { cod: '27.01.005', desc: 'Persiana Metálica', unid: 'un' },
        { cod: '27.01.006', desc: 'Persiana PVC', unid: 'un' },
        { cod: '27.01.007', desc: 'Persiana Madeira', unid: 'un' },
        { cod: '27.01.008', desc: 'Motorização de persianas', unid: 'un' },
        { cod: '27.01.009', desc: 'MDO especializada para recorte e montagem de persiana existente', unid: 'un' },
        { cod: '27.01.010', desc: 'ITENS DIVERSOS - DESCREVER', unid: 'vb' },
      ]},
    ]
  },
  {
    id: '28', nome: 'MOBILIÁRIO',
    grupos: [
      { id: '28.01', nome: 'Mobiliário Corporativo', itens: [
        { cod: '28.01.001', desc: 'Estação de trabalho - Staff', unid: 'un' },
        { cod: '28.01.002', desc: 'Mesa de Gerente', unid: 'un' },
        { cod: '28.01.003', desc: 'Mesa de Diretoria', unid: 'un' },
        { cod: '28.01.004', desc: 'Mesa de Reunião Quadrada', unid: 'un' },
        { cod: '28.01.005', desc: 'Mesa de Reunião Retangular', unid: 'un' },
        { cod: '28.01.008', desc: 'Armário Baixo', unid: 'un' },
        { cod: '28.01.009', desc: 'Armário Médio', unid: 'un' },
        { cod: '28.01.010', desc: 'Armário Alto', unid: 'un' },
        { cod: '28.01.012', desc: 'Credenza', unid: 'un' },
        { cod: '28.01.013', desc: 'ITENS DIVERSOS - DESCREVER', unid: 'vb' },
        { cod: '28.01.014', desc: 'MDO especializada para montagem de mobiliário novo', unid: 'un' },
        { cod: '28.01.015', desc: 'Desmontagem e montagem de mobiliário existente', unid: 'un' },
      ]},
      { id: '28.02', nome: 'Assentos', itens: [
        { cod: '28.02.001', desc: 'Cadeira giratória Staff', unid: 'un' },
        { cod: '28.02.002', desc: 'Cadeira giratória Gerência', unid: 'un' },
        { cod: '28.02.003', desc: 'Cadeira giratória Diretoria', unid: 'un' },
        { cod: '28.02.004', desc: 'Cadeira diálogo', unid: 'un' },
        { cod: '28.02.005', desc: 'Cadeira giratória Reunião', unid: 'un' },
        { cod: '28.02.006', desc: 'Cadeira fixa Reunião', unid: 'un' },
      ]},
      { id: '28.03', nome: 'Móveis Decorativos', itens: [
        { cod: '28.03.001', desc: 'Poltrona', unid: 'un' },
        { cod: '28.03.002', desc: 'Banqueta', unid: 'un' },
        { cod: '28.03.004', desc: 'Sofá', unid: 'un' },
        { cod: '28.03.006', desc: 'Mesa', unid: 'un' },
        { cod: '28.03.008', desc: 'Mesa de centro', unid: 'un' },
      ]},
      { id: '28.04', nome: 'Arquivos Deslizantes', itens: [
        { cod: '28.04.001', desc: 'Arquivo deslizante novo', unid: 'un' },
        { cod: '28.04.002', desc: 'MDO especializada para desmontagem e remontagem de arquivo deslizante existente', unid: 'un' },
      ]},
    ]
  },
  {
    id: '29', nome: 'MOVING',
    grupos: [
      { id: '29.01', nome: 'Mudança', itens: [
        { cod: '29.01.001', desc: 'Mudança corporativa DE / PARA, incluindo embalagem e transporte', unid: 'vb' },
        { cod: '29.01.002', desc: 'Supervisor para serviço de mudança', unid: 'vb' },
        { cod: '29.01.003', desc: 'Equipe de apoio', unid: 'vb' },
        { cod: '29.01.004', desc: 'Fornecimento de caixa de papelão reforçado', unid: 'vb' },
        { cod: '29.01.006', desc: 'Frete', unid: 'vb' },
      ]},
      { id: '29.02', nome: 'Remanejamento', itens: [
        { cod: '29.02.001', desc: 'Remanejamento incluindo desmontagem e montagem de mobiliário existente', unid: 'un' },
        { cod: '29.02.002', desc: 'Remanejamento de assentos', unid: 'un' },
        { cod: '29.02.005', desc: 'Remanejamento incluindo desmontagem e montagem de divisória industrial', unid: 'un' },
        { cod: '29.02.006', desc: 'Desmontagem e montagem de marcenaria', unid: 'un' },
      ]},
    ]
  },
  {
    id: '30', nome: 'PAISAGISMO',
    grupos: [
      { id: '30.01', nome: 'Paisagismo', itens: [
        { cod: '30.01.001', desc: 'Verba para execução de paisagismo', unid: 'vb' },
        { cod: '30.01.002', desc: 'Projeto de paisagismo', unid: 'vb' },
      ]},
    ]
  },
  {
    id: '31', nome: 'COMUNICAÇÃO VISUAL',
    grupos: [
      { id: '31.01', nome: 'Comunicação Visual', itens: [
        { cod: '31.01.001', desc: 'Logo em caixa alta, acabamento MDF pintado', unid: 'vb' },
        { cod: '31.01.002', desc: 'Logo em caixa alta, acabamento em inox', unid: 'vb' },
        { cod: '31.01.003', desc: 'Película jateada', unid: 'vb' },
        { cod: '31.01.004', desc: 'Gigantografia', unid: 'vb' },
        { cod: '31.01.005', desc: 'Verba para atender projeto de comunicação visual', unid: 'vb' },
        { cod: '31.01.006', desc: 'ITENS DIVERSOS - DESCREVER', unid: 'vb' },
      ]},
    ]
  },
  {
    id: '32', nome: 'LIMPEZA',
    grupos: [
      { id: '32.01', nome: 'Limpeza de obra', itens: [
        { cod: '32.01.001', desc: 'Limpeza grossa durante a obra', unid: 'm²' },
        { cod: '32.01.002', desc: 'Limpeza fina ao final da obra', unid: 'm²' },
        { cod: '32.01.003', desc: 'Limpeza de fachada', unid: 'm²' },
        { cod: '32.01.004', desc: 'Limpeza de piso elevado', unid: 'm²' },
        { cod: '32.01.005', desc: 'Lavagem de carpete existente', unid: 'm²' },
        { cod: '32.01.006', desc: 'Lavagem de persiana existente', unid: 'pç' },
      ]},
    ]
  },
  {
    id: '33', nome: 'GERENCIAMENTO',
    grupos: [
      { id: '33.01', nome: 'Gerenciamento', itens: [
        { cod: '33.01.001', desc: 'Custos administrativos', unid: 'vb' },
        { cod: '33.01.002', desc: 'Custos de compras', unid: 'vb' },
        { cod: '33.01.003', desc: 'BDI - Gerenciamento sobre os serviços', unid: 'vb' },
      ]},
    ]
  },
]