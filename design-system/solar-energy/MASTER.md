# Solar Energy — sistema visual

## Conceito

**Energia em movimento, engenharia no controle.** A identidade parte da própria logo: uma base noturna profunda atravessada por azul elétrico, verde natural, dourado solar e um acento laranja. A fotografia de instalações reais é a principal prova comercial.

## Direção visual

- Abertura cinematográfica, escura e curta, com fotografia operacional dominante.
- Trilhas espectrais da logo aparecem apenas em momentos institucionais; nunca cruzam conteúdo de leitura.
- Seções claras usam papel quente e amplo contraste, sem grid técnico decorativo.
- Seções escuras abrigam projetos, simulador, contato e encerramento.
- Superfícies principais usam raios de 20–26px; controles e ações usam formato cápsula. Divisores internos preservam o rigor técnico.
- Títulos fortes, mas limitados a aproximadamente 64px no desktop para preservar proporção.

## Cores

| Função | Cor | Uso |
| --- | --- | --- |
| Noite | `#020812` | hero, projetos, contato e rodapé |
| Azul-noturno | `#00142A` | superfícies e texto estrutural |
| Azul elétrico | `#1479D8` | tecnologia, navegação e detalhe |
| Verde natural | `#35B957` | desempenho, confirmação e foco |
| Dourado solar | `#E6B329` | ação principal e energia |
| Laranja | `#F06A18` | acento raro e calor da marca |
| Canvas | `#EFEDE6` | transições e fundo claro |
| Papel | `#F8F6F0` | seções editoriais |
| Texto secundário | `#4D6070` | descrições em fundo claro |
| Linha | `#CED3D1` | divisores |

## Tipografia

- Display: Archivo, pesos 700–900, tracking de `-0.035em` a `-0.055em`.
- Corpo: Manrope, pesos 400–700, 16px mínimo, entrelinha 1.5–1.75.
- Título de seção: até 62px no desktop; hero: até 80px.
- Labels em caixa alta, 10–12px, tracking de `0.14em` a `0.2em`.
- Métricas usam algarismos tabulares.

## Interação e movimento

- Botões: feedback de pressão em 150ms, brilho curto no hover e seta com deslocamento mínimo.
- Navegação: cápsula flutuante com ícones, estado ativo luminoso e faixa espectral lenta no topo.
- Hero: trilhas da marca surgem uma vez e recebem pulsos finos em movimento contínuo, lento e dessincronizado; as curvas permanecem atrás do conteúdo.
- Seções: revelação única e discreta ao entrar na viewport, combinando opacidade e deslocamento vertical curto.
- Projetos: tabs acessíveis com transição de imagem por opacidade, escala e recorte em 320ms.
- Imagens: hover máximo de 1.018, somente em ponteiro preciso.
- `prefers-reduced-motion` remove deslocamentos de conteúdo, mas preserva fades curtos e o movimento ambiente das trilhas em velocidade muito menor.

## Padrões proibidos

- Linha decorativa atravessando título, descrição ou CTA.
- Fundo verde neon em área extensa.
- Grid técnico sem função, gráficos falsos e cartões repetidos de startup.
- Glassmorphism excessivo, parallax pesado e animação infinita em conteúdo funcional; as exceções são o pulso ambiente das trilhas do hero e a faixa espectral sutil da navegação.
- Tipografia gigante que exige múltiplas dobras para comunicar uma ideia.
