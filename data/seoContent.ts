export type ContentFaq = {
  question: string;
  answer: string;
};

export type ServicePage = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  audience: string;
  introduction: string;
  benefits: string[];
  deliverables: string[];
  faqs: ContentFaq[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "energia-solar-residencial-fortaleza",
    eyebrow: "Residencial · Fortaleza e Ceará",
    title: "Energia solar residencial com projeto completo em Fortaleza.",
    description:
      "Projeto de energia solar residencial em Fortaleza e no Ceará, com análise de consumo, dimensionamento, homologação, instalação e acompanhamento.",
    image: "/images/optimized/residencial.webp",
    imageAlt: "Projeto residencial de energia solar executado pela Solar Energy",
    audience: "Casas, condomínios e imóveis residenciais",
    introduction:
      "Um sistema residencial precisa equilibrar economia, segurança elétrica, espaço disponível e expectativa de retorno. A Solar Energy conduz o processo de ponta a ponta para transformar a conta de energia em um projeto tecnicamente viável.",
    benefits: [
      "Redução estimada do gasto mensal com energia",
      "Maior previsibilidade diante das variações tarifárias",
      "Projeto compatível com consumo e características do imóvel",
      "Acompanhamento técnico da análise à pós-entrega"
    ],
    deliverables: [
      "Leitura da conta e análise do perfil de consumo",
      "Dimensionamento preliminar e avaliação de viabilidade",
      "Projeto e documentação para homologação",
      "Instalação, ativação e orientação de uso",
      "Suporte e monitoramento conforme a solução contratada"
    ],
    faqs: [
      {
        question: "Minha casa precisa ter telhado voltado para uma direção específica?",
        answer:
          "Orientação, inclinação e sombreamento influenciam a geração, mas somente a vistoria técnica confirma a melhor disposição dos módulos para cada imóvel."
      },
      {
        question: "Posso usar a conta de energia para iniciar a análise?",
        answer:
          "Sim. A conta informa consumo e tarifa e já permite uma avaliação inicial. Fotos, endereço e vistoria completam o estudo quando o projeto avança."
      }
    ]
  },
  {
    slug: "energia-solar-empresarial-ceara",
    eyebrow: "Empresas · Ceará",
    title: "Energia solar empresarial para reduzir custos operacionais.",
    description:
      "Energia solar para empresas no Ceará com engenharia, homologação, instalação e acompanhamento orientados à economia e previsibilidade.",
    image: "/images/optimized/comercial.webp",
    imageAlt: "Sistema comercial de energia solar instalado pela Solar Energy",
    audience: "Comércios, serviços, condomínios e empresas",
    introduction:
      "Energia representa uma despesa recorrente e sensível para muitas operações. Um projeto empresarial bem dimensionado considera consumo, rotina, área disponível e objetivo financeiro antes de definir a solução.",
    benefits: [
      "Redução de despesas operacionais recorrentes",
      "Previsibilidade para planejamento financeiro",
      "Engenharia adaptada à rotina e ao espaço da empresa",
      "Posicionamento associado à geração de energia limpa"
    ],
    deliverables: [
      "Análise de consumo e perfil da unidade",
      "Estudo de viabilidade técnica e financeira",
      "Projeto elétrico e processo de homologação",
      "Planejamento de instalação compatível com a operação",
      "Ativação e acompanhamento de desempenho"
    ],
    faqs: [
      {
        question: "A instalação precisa interromper a operação da empresa?",
        answer:
          "O planejamento considera a rotina do local. Eventuais intervenções elétricas são avaliadas e coordenadas com o cliente antes da execução."
      },
      {
        question: "É possível analisar mais de uma unidade consumidora?",
        answer:
          "A viabilidade depende da titularidade, da modalidade aplicável e das regras vigentes. A equipe avalia as contas e orienta o cenário possível."
      }
    ]
  },
  {
    slug: "usinas-solares-nordeste",
    eyebrow: "Grande porte · Nordeste",
    title: "Usinas solares com engenharia orientada à performance.",
    description:
      "Projetos de usinas solares no Nordeste com estudo técnico, engenharia, homologação, instalação e acompanhamento de performance.",
    image: "/images/optimized/usina.webp",
    imageAlt: "Usina solar corporativa de 432 kWp da Solar Energy",
    audience: "Operações corporativas e projetos de maior escala",
    introduction:
      "Projetos de maior potência exigem controle técnico, documentação e decisões de engenharia proporcionais à escala. A Solar Energy reúne análise, projeto e execução em uma jornada coordenada.",
    benefits: [
      "Dimensionamento compatível com a escala da operação",
      "Visão integrada de engenharia e retorno financeiro",
      "Gestão das etapas técnicas e regulatórias",
      "Acompanhamento para preservar desempenho e segurança"
    ],
    deliverables: [
      "Levantamento do perfil energético e da área disponível",
      "Estudos preliminares de capacidade e viabilidade",
      "Engenharia e documentação aplicáveis ao projeto",
      "Planejamento executivo e instalação",
      "Ativação, monitoramento e suporte técnico"
    ],
    faqs: [
      {
        question: "Toda usina solar segue o mesmo processo?",
        answer:
          "Não. Potência, modalidade, conexão, localização e finalidade alteram os requisitos. Cada oportunidade precisa de enquadramento e análise próprios."
      },
      {
        question: "A estimativa do site vale para projetos de grande porte?",
        answer:
          "Ela serve apenas como referência inicial. Usinas demandam estudo específico de engenharia, conexão, equipamentos, estrutura e condições comerciais."
      }
    ]
  },
  {
    slug: "manutencao-sistema-fotovoltaico",
    eyebrow: "Pós-entrega · Ceará",
    title: "Manutenção e monitoramento de sistemas fotovoltaicos.",
    description:
      "Manutenção de energia solar e monitoramento fotovoltaico no Ceará para preservar geração, segurança elétrica e desempenho do sistema.",
    image: "/images/optimized/industrial-novo.webp",
    imageAlt: "Equipe e sistema fotovoltaico acompanhados pela Solar Energy",
    audience: "Sistemas residenciais, comerciais e industriais",
    introduction:
      "A existência de geração não elimina a necessidade de acompanhamento. Inspeções, análise de desempenho e manutenção adequada ajudam a detectar perdas e preservar a segurança do investimento.",
    benefits: [
      "Identificação de quedas ou anomalias de geração",
      "Acompanhamento da segurança elétrica do sistema",
      "Orientação sobre limpeza conforme o ambiente",
      "Maior previsibilidade de desempenho ao longo do tempo"
    ],
    deliverables: [
      "Avaliação visual e técnica do sistema",
      "Verificação de geração e registros disponíveis",
      "Identificação de pontos que exigem correção",
      "Orientação de manutenção e limpeza",
      "Plano de acompanhamento conforme a necessidade"
    ],
    faqs: [
      {
        question: "Com que frequência devo limpar os módulos?",
        answer:
          "Não existe uma frequência única. Poeira, chuva, folhas, inclinação e ambiente alteram a necessidade; a inspeção evita limpezas desnecessárias ou tardias."
      },
      {
        question: "Como percebo que o sistema está gerando menos?",
        answer:
          "Comparações no monitoramento e alterações incomuns na conta podem indicar necessidade de avaliação, considerando também clima e sazonalidade."
      }
    ]
  }
];

export type GuidePage = {
  slug: string;
  title: string;
  description: string;
  introduction: string;
  sections: Array<{
    title: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
};

export const guidePages: GuidePage[] = [
  {
    slug: "como-funciona-energia-solar",
    title: "Como funciona a energia solar conectada à rede",
    description:
      "Entenda geração fotovoltaica, consumo, excedentes, compensação de energia e as etapas de um projeto solar conectado à rede.",
    introduction:
      "O sistema fotovoltaico converte luz em eletricidade para atender o consumo do imóvel. Quando conectado à rede de distribuição, seu funcionamento também depende das regras e procedimentos da concessionária.",
    sections: [
      {
        title: "Da luz solar à energia utilizada no imóvel",
        paragraphs: [
          "Os módulos produzem eletricidade em corrente contínua. O inversor converte essa energia para o padrão utilizado na instalação elétrica e controla parâmetros importantes de operação.",
          "A energia gerada é utilizada pelas cargas do imóvel. A relação entre geração e consumo varia durante o dia e ao longo do ano."
        ]
      },
      {
        title: "Excedentes e compensação",
        paragraphs: [
          "No Sistema de Compensação de Energia Elétrica, a energia excedente pode ser injetada na rede e contabilizada conforme as regras vigentes. A ANEEL mantém a referência oficial sobre micro e minigeração distribuída."
        ],
        bullets: [
          "O enquadramento depende da potência e da modalidade do projeto",
          "A distribuidora analisa a solicitação de conexão",
          "A conta não necessariamente é zerada, pois pode manter componentes tarifários"
        ]
      },
      {
        title: "Por que o projeto precisa ser personalizado",
        paragraphs: [
          "Consumo, tarifa, sombreamento, estrutura, orientação, área útil e capacidade elétrica interferem no resultado. Por isso, uma simulação online é somente o início da decisão."
        ]
      }
    ]
  },
  {
    slug: "homologacao-energia-solar",
    title: "Homologação de energia solar: o que acontece antes da conexão",
    description:
      "Conheça as etapas gerais de projeto, documentação, solicitação de acesso, análise da distribuidora e ativação de um sistema solar.",
    introduction:
      "A homologação organiza a conexão do sistema à rede da distribuidora. Os requisitos concretos variam conforme projeto, modalidade e concessionária, mas a jornada possui etapas técnicas recorrentes.",
    sections: [
      {
        title: "Documentação e engenharia",
        paragraphs: [
          "O processo começa com dados da unidade consumidora e um projeto compatível com o sistema pretendido. Diagramas, especificações e responsabilidades técnicas devem seguir os requisitos aplicáveis."
        ]
      },
      {
        title: "Análise pela distribuidora",
        paragraphs: [
          "A distribuidora avalia a solicitação de conexão e pode pedir adequações. Prazos e documentos dependem do enquadramento e das regras vigentes."
        ],
        bullets: [
          "Cadastro correto da unidade consumidora",
          "Documentos técnicos consistentes",
          "Equipamentos compatíveis com os requisitos",
          "Acompanhamento de eventuais pendências"
        ]
      },
      {
        title: "Instalação, vistoria e ativação",
        paragraphs: [
          "Depois das aprovações e da execução, são cumpridas as etapas necessárias para conexão e medição. A Solar Energy apresenta a homologação como parte de sua gestão completa do projeto."
        ]
      }
    ]
  },
  {
    slug: "manutencao-energia-solar",
    title: "Manutenção de energia solar: geração, limpeza e segurança",
    description:
      "Saiba o que observar no monitoramento e na manutenção de um sistema fotovoltaico para preservar geração e segurança.",
    introduction:
      "Sistemas solares têm poucos componentes móveis, mas continuam sendo instalações elétricas expostas ao clima. Acompanhamento e manutenção baseados em evidências ajudam a preservar desempenho e segurança.",
    sections: [
      {
        title: "Monitorar antes de intervir",
        paragraphs: [
          "O histórico de geração ajuda a identificar mudanças fora do padrão. Clima e sazonalidade devem ser considerados antes de concluir que existe uma falha."
        ]
      },
      {
        title: "Limpeza não deve seguir uma regra genérica",
        paragraphs: [
          "Frequência de chuva, poeira, folhas, inclinação dos módulos e acesso seguro mudam de um local para outro. A decisão deve considerar perda observada e condições da instalação."
        ]
      },
      {
        title: "Pontos que merecem avaliação profissional",
        paragraphs: [
          "Conexões, cabos, proteções, estrutura, inversor e sinais de aquecimento exigem conhecimento técnico e procedimentos de segurança."
        ],
        bullets: [
          "Queda de geração persistente",
          "Alertas recorrentes no inversor",
          "Danos visíveis em cabos ou módulos",
          "Intervenções no telhado ou na instalação elétrica"
        ]
      }
    ]
  },
  {
    slug: "retorno-investimento-energia-solar",
    title: "Como avaliar o retorno do investimento em energia solar",
    description:
      "Entenda os fatores que influenciam economia, investimento e retorno de um projeto fotovoltaico sem depender de promessas genéricas.",
    introduction:
      "O retorno não deve ser avaliado apenas pelo preço do kit. Consumo, tarifa, geração projetada, qualidade da instalação, manutenção e vida útil compõem a decisão.",
    sections: [
      {
        title: "Comece pelo consumo e pela tarifa",
        paragraphs: [
          "A conta de energia revela consumo, cobrança e histórico. Uma análise correta separa o que pode ser compensado dos componentes que podem permanecer na fatura."
        ]
      },
      {
        title: "Compare investimento e economia estimada",
        paragraphs: [
          "O payback simples relaciona investimento e economia mensal ou anual, mas a decisão também deve considerar variações de tarifa, desempenho, garantias e custos ao longo do tempo."
        ],
        bullets: [
          "Investimento total instalado",
          "Economia anual estimada",
          "Premissas de geração utilizadas",
          "Equipamentos e garantias oferecidos",
          "Suporte e manutenção previstos"
        ]
      },
      {
        title: "Use a simulação como ponto de partida",
        paragraphs: [
          "O simulador da Solar Energy fornece uma referência inicial. A proposta técnica confirma potência, equipamentos, instalação e condições comerciais."
        ]
      }
    ]
  }
];
