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
    titulo: "Linha Compacta",
    descricao:
      "Usinagem de alumínio, moldes, eletrodos e gravações de precisão. Três tamanhos, mesma engenharia.",
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
    titulo: "Linha Router",
    descricao:
      "Grande formato para ACM, acrílico, MDF e madeira. Estrutura em aço com mesa de sacrifício, para produção pesada.",
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
    nota: "Linha Compacta e Linha Router, fabricação própria",
    imagem: "/images/hero/cnc-usinagem.png",
    href: "/maquinas",
  },
  {
    id: "usinagem",
    titulo: "Usinagem CNC",
    nota: "Peças sob desenho, moldes e engenharia reversa",
    imagem: "/images/catech/USI1.jpg",
    href: "/usinagem",
  },
  {
    id: "moldes",
    titulo: "Moldes para injeção",
    nota: "Molde novo, réplica ou atualização, sob projeto",
    imagem: "/images/usinagem/moldes-injetaveis.jpg",
    href: "/usinagem",
  },
  {
    id: "manutencao",
    titulo: "Assistência técnica",
    nota: "Retrofit, manutenção e migração para DDCS",
    imagem: "/images/catech/industrial-maintenance.png",
    href: "/assistencia-tecnica",
  },
  {
    id: "ferramentaria",
    titulo: "Ferramentaria",
    nota: "Matrizes, punções, carimbos e eletrodos",
    imagem: "/images/usinagem/gravacoes.jpg",
    href: "/usinagem",
  },
  {
    id: "plasticos-industriais",
    titulo: "Plásticos industriais",
    nota: "Chapas, buchas e tarugos prontos para entrega",
    imagem: "/images/catech/industry-workshop.jpg",
    href: "/produtos",
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

// A navegação agora é única para o site inteiro e vive em components/Header.tsx.
