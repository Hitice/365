export type Product = {
  id: string;
  nicho: string;
  nome: string;
  bullets: string[];
  imagem: string;
  tags: string[];
};

export type Servico = {
  id: string;
  titulo: string;
  descricao: string;
  imagem: string;
};

/*
  Nomes de máquinas são provisórios. Troque aqui e o site inteiro atualiza.
  As imagens devem ser salvas em public/images/ com os nomes indicados
  (veja public/images/LEIA-ME.md).
*/

export const maquinasCnc: Product[] = [
  {
    id: "cv-pro",
    nicho: "Comunicação Visual",
    nome: "Router CNC CV Pro",
    bullets: [
      "Corte e gravação em ACM, acrílico, PVC e MDF",
      "Grande formato, trabalha a chapa inteira",
      "Feita para letras caixa, totens e fachadas",
    ],
    imagem: "/images/cnc/comunicacao-visual-1.jpg",
    tags: ["ACM", "Acrílico", "Letras caixa"],
  },
  {
    id: "cv-compact",
    nicho: "Comunicação Visual",
    nome: "Router CNC CV Compact",
    bullets: [
      "Placas, displays e brindes com alta precisão",
      "Ocupa pouco espaço na oficina",
      "Mesma eletrônica da linha grande",
    ],
    imagem: "/images/cnc/comunicacao-visual-2.jpg",
    tags: ["Placas", "Displays", "Compacta"],
  },
  {
    id: "mold-maker",
    nicho: "Moldes Injetáveis",
    nome: "CNC Mold Maker",
    bullets: [
      "Cavidades, machos e postiços em aço e alumínio",
      "Estrutura rígida com alta repetibilidade",
      "Feita para a indústria de injeção plástica",
    ],
    imagem: "/images/cnc/moldes-1.jpg",
    tags: ["Cavidades", "Aço", "Alumínio"],
  },
  {
    id: "mold-grav",
    nicho: "Moldes Injetáveis",
    nome: "CNC Mold Grav",
    bullets: [
      "Gravações finas, eletrodos e acabamento de moldes",
      "Fuso de alta rotação com controle de profundidade",
      "Complemento ideal da bancada de moldes",
    ],
    imagem: "/images/cnc/moldes-2.jpg",
    tags: ["Eletrodos", "Gravação fina", "Acabamento"],
  },
  {
    id: "wood-master",
    nicho: "Marcenaria",
    nome: "Router CNC Wood Master",
    bullets: [
      "Nesting para produção seriada em MDF",
      "Corte, furação e usinagem em um único ciclo",
      "Otimização de chapa com menos desperdício",
    ],
    imagem: "/images/cnc/marcenaria-1.jpg",
    tags: ["Nesting", "MDF", "Móveis"],
  },
  {
    id: "wood-flex",
    nicho: "Marcenaria",
    nome: "Router CNC Wood Flex",
    bullets: [
      "Portas, painéis ripados e peças especiais",
      "Troca rápida entre um trabalho e outro",
      "Feita para marcenaria sob medida",
    ],
    imagem: "/images/cnc/marcenaria-2.jpg",
    tags: ["Portas", "Painéis", "Sob medida"],
  },
];

export const usinagem: Servico[] = [
  {
    id: "moldes-injetaveis",
    titulo: "Fabricação de moldes injetáveis",
    descricao:
      "Molde completo para injeção plástica, sob projeto. Molde novo, réplica ou atualização para quem injeta peças plásticas.",
    imagem: "/images/usinagem/moldes-injetaveis.jpg",
  },
  {
    id: "moldes-plasticos",
    titulo: "Peças em PEAD e tecnil",
    descricao:
      "Corte, furação e fresagem de peças de desgaste, guias, batentes e chapas em PEAD e tecnil.",
    imagem: "/images/usinagem/moldes-plasticos.jpg",
  },
  {
    id: "acrilicos",
    titulo: "Acrílicos e policarbonato",
    descricao:
      "Corte e usinagem de precisão em acrílico e policarbonato para proteções, visores e peças técnicas.",
    imagem: "/images/usinagem/acrilicos.jpg",
  },
  {
    id: "gabaritos",
    titulo: "Fabricação de gabaritos",
    descricao:
      "Guias de precisão em policarbonato, acrílico ou alumínio para produção que fura, corta ou monta sempre no mesmo padrão.",
    imagem: "/images/usinagem/gabaritos.jpg",
  },
  {
    id: "torno",
    titulo: "Torneamento",
    descricao:
      "Buchas, engrenagens, roletes e peças rotativas em poliacetal, PEAD e outros polímeros de engenharia, feitas no torno e na CNC.",
    imagem: "/images/usinagem/torno.jpg",
  },
  {
    id: "reposicao",
    titulo: "Reposição e nacionalização",
    descricao:
      "Refazemos peça quebrada ou fora de linha e reproduzimos localmente peças que hoje vêm de fora, sem prazo de importação.",
    imagem: "/images/usinagem/reposicao.jpg",
  },
];

export type MaquinaModelo = {
  id: string;
  nome: string;
  area: string;
  preco: string;
  specs: string[];
  imagem: string;
};

export type MaquinaProduto = {
  id: string;
  titulo: string;
  descricao: string;
  base: string[];
  modelos: MaquinaModelo[];
};

export const maquinasProdutos: MaquinaProduto[] = [
  {
    id: "cnc-aluminio",
    titulo: "CNC para Alumínio e Gravações",
    descricao:
      "Linha compacta de alta rigidez para usinagem de alumínio, moldes, eletrodos e gravações de precisão. Três tamanhos, mesma engenharia.",
    base: [
      "Fuso de esferas com patins de 20 mm",
      "Guias lineares",
      "Fim de curso nos eixos X, Y e Z",
      "Base em alumínio estrutural",
      "Mesa em aço retificado",
      "Conectores industriais",
      "Inversor WEG",
    ],
    modelos: [
      {
        id: "cnc-300",
        nome: "CNC 300x300",
        area: "Área útil 300 x 300 mm",
        preco: "a partir de R$ 25.000",
        specs: ["Spindle 3 CV", "Controlador DDCS V4"],
        imagem: "/images/cnc/moldes-1.jpg",
      },
      {
        id: "cnc-400",
        nome: "CNC 400x400",
        area: "Área útil 400 x 400 mm",
        preco: "a partir de R$ 32.000",
        specs: ["Spindle 3 CV", "Controlador DDCS V4"],
        imagem: "/images/cnc/moldes-2.jpg",
      },
      {
        id: "cnc-500",
        nome: "CNC 500x500",
        area: "Área útil 500 x 500 mm",
        preco: "a partir de R$ 38.000",
        specs: ["Spindle 4 CV", "Controlador DDCS Expert"],
        imagem: "/images/hero/cnc-usinagem.png",
      },
    ],
  },
  {
    id: "cnc-router",
    titulo: "CNC para Comunicação Visual e Marcenaria",
    descricao:
      "Routers de grande formato para ACM, acrílico, MDF e madeira. Estrutura em aço com mesa de sacrifício, prontos para produção pesada.",
    base: [
      "Controlador DDCS V4",
      "Cremalheira reta",
      "Patins de 15 mm com guia linear",
      "Eixo Z com fuso de esferas",
      "Motores NEMA 23 com Easy Driver",
      "Estrutura em aço",
      "Mesa de sacrifício",
      "Fim de curso",
      "Inversor WEG",
    ],
    modelos: [
      {
        id: "router-3015",
        nome: "Router 3000x1500",
        area: "Área útil 3000 x 1500 mm",
        preco: "a partir de R$ 35.000",
        specs: ["Spindle 3 CV"],
        imagem: "/images/cnc/comunicacao-visual-1.jpg",
      },
      {
        id: "router-4020",
        nome: "Router 4000x2000",
        area: "Área útil 4000 x 2000 mm",
        preco: "a partir de R$ 48.000",
        specs: ["Cabeçote flutuante", "Motor spindle 3 CV"],
        imagem: "/images/cnc/comunicacao-visual-2.jpg",
      },
      {
        id: "router-4020-full",
        nome: "Router 4000x2000 Full",
        area: "Área útil 4000 x 2000 mm",
        preco: "a partir de R$ 85.000",
        specs: [
          "Cabeçote flutuante",
          "Duplo eixo Z",
          "Motor principal 4 CV",
          "Motor auxiliar 3 CV",
        ],
        imagem: "/images/cnc/marcenaria-1.jpg",
      },
    ],
  },
];

export const ferramentaria: Servico[] = [
  {
    id: "aluminio",
    titulo: "Usinagem de alumínio",
    descricao:
      "Corte, furação e fresagem de peças em alumínio conforme projeto, de gabaritos a componentes de moldes.",
    imagem: "/images/usinagem/aluminio.jpg",
  },
  {
    id: "gravacao-moldes",
    titulo: "Gravação de moldes e talões",
    descricao:
      "Texto, logo e número de série gravados direto no molde ou na peça, para identificação de lote e rastreabilidade.",
    imagem: "/images/usinagem/gravacoes.jpg",
  },
  {
    id: "baixo-relevo",
    titulo: "Gravação em baixo e alto relevo",
    descricao:
      "Gravação 3D em relevo com acabamento elaborado, incluindo cunhas personalizadas para marcação.",
    imagem: "/images/usinagem/baixo-relevo.jpg",
  },
  {
    id: "matrizes",
    titulo: "Matrizes, punções e placas",
    descricao:
      "Ferramental de corte e estampo sob medida, matrizes de remoldagem e placas de reposição para moldes de injeção.",
    imagem: "/images/usinagem/matrizes.jpg",
  },
  {
    id: "carimbos",
    titulo: "Carimbos em aço inox",
    descricao:
      "Ferramentas de marcação personalizadas em aço inox, resistentes à corrosão e ao uso contínuo.",
    imagem: "/images/usinagem/carimbos.jpg",
  },
  {
    id: "eletrodos",
    titulo: "Eletrodos personalizados",
    descricao:
      "Eletrodos industriais sob medida para eletroerosão, produzidos a partir do seu desenho ou da peça.",
    imagem: "/images/usinagem/eletrodos.jpg",
  },
];

export const tecnologia: Servico[] = [
  {
    id: "sistemas-web",
    titulo: "Sistemas web de produção",
    descricao:
      "Rastreabilidade, controle de produção, almoxarifado e ordens de serviço. Fim do controle por planilha, com dado disponível em tempo real.",
    imagem: "/images/catech/cases1.jpg",
  },
  {
    id: "clp-ihm",
    titulo: "CLPs, IHMs e redes industriais",
    descricao:
      "Programação de CLPs Siemens S7 e WEG, painéis IHM e redes Modbus RTU/TCP, PROFINET e OPC-UA, com código documentado e laudo ART.",
    imagem: "/images/catech/CLP1.png",
  },
  {
    id: "iot",
    titulo: "IoT e telemetria",
    descricao:
      "Gateways industriais com firmware próprio, dashboards de OEE em tempo real e alertas por WhatsApp direto da máquina.",
    imagem: "/images/catech/iot-platform.jpg",
  },
  {
    id: "erp",
    titulo: "Integração com ERP",
    descricao:
      "Middleware entre o chão de fábrica e TOTVS Protheus, Sankhya e SAP. Zero lançamento manual de dados de produção.",
    imagem: "/images/catech/cases2.jpg",
  },
  {
    id: "ia",
    titulo: "IA aplicada",
    descricao:
      "Atendimento automatizado, análise de dados de produção e manutenção preditiva integradas ao seu processo.",
    imagem: "/images/catech/IOT1.png",
  },
  {
    id: "eletronica",
    titulo: "Eletrônica e firmware",
    descricao:
      "Projetos e montagens eletrônicas sob medida, hardware embarcado, microcontroladores e visão computacional para inspeção.",
    imagem: "/images/catech/MONT1.png",
  },
];

export type Case = {
  id: string;
  titulo: string;
  setor: string;
  problema: string;
  solucao: string;
  resultado: string;
  tags: string[];
};

export const casesIndustria: Case[] = [
  {
    id: "peca-importada",
    titulo: "Peça importada substituída em 72 horas",
    setor: "Metalurgia · Uberlândia MG",
    problema:
      "Componente crítico importado da Alemanha: 45 dias de prazo, R$ 14.000 por peça. Linha parada à espera.",
    solucao:
      "Engenharia reversa e usinagem CNC em aço ABNT 1045. Lote piloto com validação em operação real.",
    resultado:
      "62% mais barato. Entregue em 72h. Desempenho equivalente em 900h de operação.",
    tags: ["CNC", "Engenharia reversa"],
  },
  {
    id: "retrofit-sem-parada",
    titulo: "Retrofit sem parada de produção",
    setor: "Fabricação de embalagens · MG",
    problema:
      "Linha com 15 anos controlada por relés sem documentação. Manutenção dependia de técnico aposentado.",
    solucao:
      "Retrofit completo: mapeamento da lógica, CLP S7-1200 com IHM, código documentado. Laudo ART incluso.",
    resultado:
      "Diagnóstico de falhas em segundos. Zero parada não planejada em 18 semanas.",
    tags: ["CLP Siemens", "Retrofit", "ART"],
  },
];

export const casesTecnologia: Case[] = [
  {
    id: "planilha-tempo-real",
    titulo: "Da planilha ao dado em tempo real",
    setor: "Agroindústria · Minas Gerais",
    problema:
      "Controle de produção por planilha preenchida ao fim do turno. Dado atrasado, decisão de manutenção tardia.",
    solucao:
      "Gateways IoT nas máquinas via Modbus. Dashboard web com OEE automático e alertas por WhatsApp.",
    resultado:
      "Dado disponível em 30 segundos. 22% menos tempo de resposta a falhas. Fim do preenchimento manual.",
    tags: ["IoT", "OEE", "Modbus"],
  },
  {
    id: "middleware-erp",
    titulo: "Chão de fábrica integrado ao ERP",
    setor: "Indústria · MG",
    problema:
      "Dados de produção lançados manualmente no TOTVS Protheus, com atraso e erro de digitação.",
    solucao:
      "Middleware em Node.js conectando os CLPs via Modbus TCP direto à API do ERP.",
    resultado:
      "Zero lançamento manual de dados de produção, apontamento automático e confiável.",
    tags: ["Node.js", "Modbus TCP", "TOTVS"],
  },
];

export type VitrineItem = {
  id: string;
  titulo: string;
  nota: string;
  imagem: string;
  href: string;
};

export const vitrine: VitrineItem[] = [
  {
    id: "maquinas-cnc",
    titulo: "Máquinas CNC",
    nota: "Duas linhas, seis modelos, a partir de R$ 25.000",
    imagem: "/images/hero/cnc-usinagem.png",
    href: "/maquinas",
  },
  {
    id: "usinagem",
    titulo: "Usinagem sob demanda",
    nota: "Aço 1045, alumínio 6061, PEAD, com acabamento completo",
    imagem: "/images/catech/USI1.jpg",
    href: "/servicos#usinagem",
  },
  {
    id: "moldes",
    titulo: "Moldes injetáveis",
    nota: "Molde novo, réplica ou atualização, sob projeto",
    imagem: "/images/usinagem/moldes-injetaveis.jpg",
    href: "/servicos#usinagem",
  },
  {
    id: "torno",
    titulo: "Torno e peças plásticas",
    nota: "Buchas, engrenagens e roletes em POM, PEAD e nylon",
    imagem: "/images/usinagem/torno.jpg",
    href: "/servicos#usinagem",
  },
  {
    id: "ferramentaria",
    titulo: "Ferramentaria e gravações",
    nota: "Matrizes, punções, carimbos, eletrodos e relevos",
    imagem: "/images/usinagem/gravacoes.jpg",
    href: "/servicos#ferramentaria",
  },
  {
    id: "plasticos-industriais",
    titulo: "Plásticos industriais",
    nota: "Chapas, buchas e tarugos: Nylon, PEAD, POM, PTFE, PEEK e mais",
    imagem: "/images/catech/industry-workshop.jpg",
    href: "/produtos",
  },
];

export const valores = [
  { nome: "Construir", frase: "Ideias ganham valor quando saem do papel." },
  { nome: "Aprender", frase: "Cada projeto é um ponto de partida para o próximo." },
  { nome: "Compartilhar", frase: "Conhecimento precisa ser transferido para as próximas gerações." },
  { nome: "Evoluir", frase: "Otimizar para além do que simplesmente funciona." },
  { nome: "Conectar", frase: "Máquinas, código e pessoas de forma inteligente." },
  { nome: "Simplificar", frase: "O difícil fica com a gente. O que entregamos é claro e intuitivo." },
  { nome: "Desenvolver pessoas", frase: "Tecnologia existe para ampliar a nossa capacidade." },
  { nome: "Deixar um legado", frase: "O que construímos hoje vai ser a base de quem virá amanhã." },
];

export type Material = {
  id: string;
  nome: string;
  caracteristica: string;
  usos: string;
};

export const suprimentosSetores = [
  {
    setor: "Indústria de bebidas",
    itens: "Estrelas, roscas sem fim, perfis e guias",
    imagem: "/images/materiais/setor-bebidas.jpg",
  },
  {
    setor: "Indústria alimentícia",
    itens: "Chapas para corte, raspadores e êmbolos",
    imagem: "/images/materiais/setor-alimenticia.jpg",
  },
  {
    setor: "Indústria metalúrgica",
    itens: "Placas de desgaste, engrenagens e perfis",
    imagem: "/images/materiais/setor-metalurgica.jpg",
  },
  {
    setor: "Indústria de embalagens",
    itens: "Placas de deslize, perfis e guias",
    imagem: "/images/materiais/setor-embalagens.jpg",
  },
];

export const materiaisDetalhe: Servico[] = [
  {
    id: "pead",
    titulo: "PEAD (Polietileno)",
    descricao:
      "Aguenta impacto e atrito sem quebrar. Peças de desgaste, guias e batentes. Tarugos e chapas em estoque para entrega imediata.",
    imagem: "/images/materiais/pead.jpg",
  },
  {
    id: "pom",
    titulo: "Poliacetal (POM)",
    descricao:
      "Rígido, baixo atrito e ótima estabilidade dimensional. Buchas, engrenagens e peças de precisão. Estoque próprio em tarugos e chapas.",
    imagem: "/images/materiais/pom.jpg",
  },
  {
    id: "nylon",
    titulo: "Nylon e Nylon Cast",
    descricao:
      "Baixo atrito e alta resistência ao desgaste. Roldanas, engrenagens, buchas e peças de deslize para toda a indústria.",
    imagem: "/images/materiais/nylon.jpg",
  },
  {
    id: "ptfe",
    titulo: "PTFE",
    descricao:
      "Antiaderente, suporta alta temperatura e química agressiva. Vedações de válvulas e cilindros hidráulicos, raspadores e juntas.",
    imagem: "/images/materiais/ptfe.jpg",
  },
  {
    id: "uhmw",
    titulo: "UHMW",
    descricao:
      "Altíssima resistência a impacto e abrasão. Placas de deslize, perfis guia, estrelas e roscas sem fim para linhas de produção.",
    imagem: "/images/materiais/uhmw.jpg",
  },
  {
    id: "policarbonato-acrilico",
    titulo: "Policarbonato e Acrílico",
    descricao:
      "Transparência com resistência a impacto e bom acabamento. Gabaritos, proteções de máquina, visores e peças estéticas.",
    imagem: "/images/materiais/policarbonato.jpg",
  },
  {
    id: "peek-especiais",
    titulo: "PEEK e técnicos especiais",
    descricao:
      "PEEK, PVDF, Celeron e Fenolite para aplicações de alta performance: temperatura, química e exigência mecânica extremas.",
    imagem: "/images/materiais/peek.jpg",
  },
  {
    id: "poliuretano",
    titulo: "Poliuretano e borrachas técnicas",
    descricao:
      "Poliuretano, Plastiprene e PVC para vedações, raspadores, revestimento de roldanas e peças que exigem elasticidade.",
    imagem: "/images/materiais/poliuretano.jpg",
  },
];

export const materiaisCatalogo = [
  "Acrílico",
  "Celeron",
  "Fenolite",
  "Nylon",
  "Nylon Cast",
  "Polietileno (PEAD)",
  "PEEK",
  "Poliacetal (POM)",
  "Policarbonato",
  "Polipropileno",
  "Poliestireno",
  "PTFE",
  "Poliuretano",
  "Plastiprene",
  "PVC",
  "PVDF",
  "UHMW",
];

export const materiais: Material[] = [
  {
    id: "pead",
    nome: "PEAD",
    caracteristica: "Aguenta impacto e atrito sem quebrar",
    usos: "Peças de desgaste, guias, batentes; também vendido como matéria-prima",
  },
  {
    id: "pom",
    nome: "Poliacetal (POM)",
    caracteristica: "Rígido, baixo atrito, ótima estabilidade dimensional",
    usos: "Buchas, engrenagens, peças de precisão; também vendido como matéria-prima",
  },
  {
    id: "policarbonato",
    nome: "Policarbonato",
    caracteristica: "Resistente a impacto, geralmente transparente",
    usos: "Gabaritos, proteções, visores",
  },
  {
    id: "acrilico",
    nome: "Acrílico",
    caracteristica: "Rígido, com bom acabamento visual",
    usos: "Gabaritos, peças estéticas, protótipos",
  },
  {
    id: "aluminio",
    nome: "Alumínio",
    caracteristica: "Leve, durável, fácil de usinar",
    usos: "Moldes injetáveis, gabaritos, peças estruturais",
  },
  {
    id: "aco-carbono",
    nome: "Aço carbono",
    caracteristica: "Alta resistência mecânica",
    usos: "Matrizes de remoldagem, punções, ferramental pesado",
  },
  {
    id: "nylon",
    nome: "Nylon e Nylon Cast",
    caracteristica: "Baixo atrito, resistente ao desgaste",
    usos: "Roldanas, engrenagens, buchas e peças de deslize",
  },
  {
    id: "ptfe",
    nome: "PTFE",
    caracteristica: "Antiaderente, suporta alta temperatura e química agressiva",
    usos: "Vedações de válvulas e cilindros hidráulicos, raspadores",
  },
  {
    id: "uhmw",
    nome: "UHMW",
    caracteristica: "Altíssima resistência a impacto e abrasão",
    usos: "Placas de deslize, perfis guia, estrelas e roscas sem fim",
  },
  {
    id: "aco-inox",
    nome: "Aço inox",
    caracteristica: "Resiste à corrosão, bom acabamento",
    usos: "Carimbos, eletrodos, peças expostas a limpeza e umidade",
  },
];

export const arquiteturaProducao: Servico[] = [
  {
    id: "corte-laser",
    titulo: "Projetos em corte a laser",
    descricao:
      "Painéis, elementos decorativos e peças estruturais cortadas a laser com acabamento pronto para instalação.",
    imagem: "/images/arquitetura-producao/corte-laser.jpg",
  },
  {
    id: "corten",
    titulo: "Aço corten",
    descricao:
      "Fachadas, painéis e elementos arquitetônicos em aço corten com estética industrial e alta durabilidade.",
    imagem: "/images/arquitetura-producao/corten.jpg",
  },
  {
    id: "totens",
    titulo: "Placas e totens",
    descricao:
      "Placas e totens em aço e ACM para identificação de empresas, condomínios e empreendimentos.",
    imagem: "/images/arquitetura-producao/totens.jpg",
  },
  {
    id: "portas-acm",
    titulo: "Portas em ACM",
    descricao:
      "Portas e revestimentos em ACM com design contemporâneo para entradas comerciais e residenciais.",
    imagem: "/images/arquitetura-producao/portas-acm.jpg",
  },
  {
    id: "fachadas",
    titulo: "Fachadas internas e prediais",
    descricao:
      "Revestimentos e fachadas para ambientes internos e edifícios, do projeto à instalação.",
    imagem: "/images/arquitetura-producao/fachadas.jpg",
  },
  {
    id: "letras-caixa",
    titulo: "Letras caixa",
    descricao:
      "Letras caixa para construtoras, prédios e empreendimentos, em metal e ACM, com ou sem iluminação.",
    imagem: "/images/arquitetura-producao/letras-caixa.jpg",
  },
];

export const arquiteturaAutomacao: Servico[] = [
  {
    id: "instalacoes",
    titulo: "Instalações e serviços",
    descricao:
      "Instalação completa de sistemas de automação residencial e comercial com equipe própria.",
    imagem: "/images/arquitetura-automacao/instalacoes.jpg",
  },
  {
    id: "biometria",
    titulo: "Fechaduras biométricas",
    descricao:
      "Fornecimento e instalação de fechaduras biométricas e controle de acesso para residências e empresas.",
    imagem: "/images/arquitetura-automacao/biometria.jpg",
  },
  {
    id: "inducao",
    titulo: "Carregadores por indução",
    descricao:
      "Integração de carregadores por indução em bancadas, mesas e móveis planejados.",
    imagem: "/images/arquitetura-automacao/inducao.jpg",
  },
  {
    id: "moveis-inteligentes",
    titulo: "Móveis inteligentes",
    descricao:
      "Móveis com automação embarcada, iluminação, som e conectividade integrados ao projeto.",
    imagem: "/images/arquitetura-automacao/moveis-inteligentes.jpg",
  },
  {
    id: "moveis-exclusivos",
    titulo: "Móveis exclusivos",
    descricao:
      "Desenvolvimento e fabricação de móveis exclusivos a partir do conceito do cliente ou do arquiteto.",
    imagem: "/images/arquitetura-automacao/moveis-exclusivos.jpg",
  },
  {
    id: "projetos-arquitetos",
    titulo: "Projetos de arquitetos",
    descricao:
      "Execução técnica de projetos especiais em parceria com escritórios de arquitetura.",
    imagem: "/images/arquitetura-automacao/projetos-arquitetos.jpg",
  },
];

// A navegação agora é única para o site inteiro e vive em components/Header.tsx.
