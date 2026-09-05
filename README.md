# Solar Energy Qualidade e Eficiência

Site institucional premium em Next.js para geração de leads, simulação de economia solar, galeria de projetos reais e contato via WhatsApp.

## Tecnologias

- Next.js com App Router
- React e TypeScript
- Tailwind CSS
- Lucide Icons
- API serverless em `app/api/leads/route.ts`
- Backend de leads preparado para Supabase e webhook opcional

## Instalação

```bash
npm install
```

## Rodar localmente

```bash
npm run dev
```

Acesse `http://localhost:3000`.

## Build de produção

```bash
npm run build
npm run start
```

## Estrutura de pastas

```txt
app/                 Rotas, layout, SEO e API de leads
components/          Componentes reutilizáveis
sections/            Seções comerciais da página
data/                Conteúdo, contato, cidades e projetos
lib/                 Cálculos, máscaras, WhatsApp, leads e integrações server-side
types/               Tipos TypeScript compartilhados
public/images/       Logos e imagens reais da empresa
```

## Onde alterar contatos

Edite `data/company.ts` para atualizar WhatsApp, e-mail, Instagram, endereço, nome ou slogan. Botões, rodapé, mensagens de WhatsApp e formulários usam esse arquivo central.

## Como trocar imagens

Substitua os arquivos em `public/images/` mantendo os nomes atuais, ou atualize os caminhos em:

- `sections/Hero.tsx`
- `sections/About.tsx`
- `data/projects.ts`
- `sections/Footer.tsx`

As imagens são renderizadas com `next/image` para otimização automática.

## Como alterar cores da marca

Os tokens principais ficam em `tailwind.config.ts`:

- `navy`
- `solar-blue`
- `solar-green`
- `solar-gold`
- `silver-white`
- `gray-dark`

Também há variáveis CSS equivalentes em `app/globals.css`.

## Variáveis de ambiente

Crie `.env.local` com base em `.env.example`.

```env
NEXT_PUBLIC_SITE_URL=https://www.solarenergyqe.com.br

NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_META_PIXEL_ID=

SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_SECRET_KEY=

LEADS_NOTIFICATION_EMAIL=
LEADS_WEBHOOK_URL=
```

`NEXT_PUBLIC_GA_ID` e `NEXT_PUBLIC_META_PIXEL_ID` são opcionais. Quando um deles é
configurado, o site exibe preferências de cookies e só carrega a respectiva ferramenta
após consentimento. Cliques no WhatsApp, CTAs do simulador, simulações concluídas e leads
são enviados como eventos de conversão.

Use `SUPABASE_SERVICE_ROLE_KEY` ou `SUPABASE_SECRET_KEY` no servidor. Não use uma chave `sb_publishable_...` para o backend de leads e nunca coloque chave privilegiada com prefixo `NEXT_PUBLIC_`.

## Backend de leads

O endpoint `POST /api/leads` recebe leads do formulário de análise gratuita e do simulador. O fluxo é:

1. O frontend valida os campos principais.
2. A API valida novamente no servidor.
3. Strings são sanitizadas e payloads grandes são rejeitados.
4. Há rate limit simples em memória: 5 envios por IP a cada 10 minutos.
5. Se o Supabase estiver configurado, o lead é salvo na tabela `leads`.
6. Se `LEADS_WEBHOOK_URL` existir, a API envia uma cópia para Make, Zapier, n8n, Google Sheets ou CRM.
7. Se o webhook falhar, o lead salvo no Supabase continua válido.

Sem Supabase configurado:

- Em desenvolvimento, a API registra um resumo seguro no console e retorna sucesso controlado.
- Em produção, a API retorna erro claro. Ela não finge que salvou o lead.

Fontes aceitas:

- `contact_form`
- `simulator`
- `whatsapp_cta`
- `project_cta`

Campos principais:

- `source`
- `name`
- `whatsapp`
- `email`
- `city`
- `propertyType`
- `averageBill`
- `monthlyConsumption`
- `message`
- `simulation`
- `projectInterest`
- `pageUrl`
- `userAgent`

## Base do simulador

O simulador usa uma proposta real como referência:

- Consumo de referência: `350 kWh/mês`
- Potência de referência: `2,84 kWp`
- Investimento de referência: `R$ 8.000,00`

A fórmula central fica em `lib/simulatorCalculations.ts`:

```ts
estimatedInvestment = monthlyConsumptionKwh * (8000 / 350)
```

Para o perfil residencial, a economia padrão é `91,4%`, coerente com o exemplo de conta atual de `R$ 343,00`, conta prevista de `R$ 29,40` e economia mensal aproximada de `R$ 313,60`.

## Configurar Supabase

Crie uma tabela `leads` no Supabase:

```sql
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  name text not null,
  whatsapp text not null,
  email text,
  city text,
  property_type text,
  average_bill numeric,
  monthly_consumption numeric,
  message text,
  simulation jsonb,
  project_interest jsonb,
  page_url text,
  user_agent text,
  created_at timestamptz default now()
);
```

Depois configure:

```env
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
# ou
SUPABASE_SECRET_KEY=
```

Preencha `SUPABASE_URL` com a URL do projeto Supabase e use apenas uma chave server-side em `SUPABASE_SERVICE_ROLE_KEY` ou `SUPABASE_SECRET_KEY`.

## Webhook opcional

Para enviar notificações ou alimentar planilhas/CRM sem adicionar dependência pesada:

```env
LEADS_WEBHOOK_URL=
```

Preencha `LEADS_WEBHOOK_URL` com a URL do webhook escolhido, se houver.

O webhook recebe o payload sanitizado do lead, incluindo `receivedAt` e um `sourceLabel` em português.

## Testar envio localmente

```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "source": "contact_form",
    "name": "Teste",
    "whatsapp": "85999999999",
    "email": "teste@email.com",
    "city": "Fortaleza/CE",
    "propertyType": "residencial",
    "averageBill": 850,
    "message": "Quero uma análise."
  }'
```

## Publicação na Vercel

1. Suba o projeto para um repositório Git.
2. Importe o repositório na Vercel.
3. Configure `NEXT_PUBLIC_SITE_URL`.
4. Opcionalmente configure `NEXT_PUBLIC_GA_ID` e `NEXT_PUBLIC_META_PIXEL_ID`.
5. Configure `SUPABASE_URL` e uma chave server-side: `SUPABASE_SERVICE_ROLE_KEY` ou `SUPABASE_SECRET_KEY`.
6. Opcionalmente configure `LEADS_WEBHOOK_URL`.
7. Use os comandos padrão:
   - Build: `npm run build`
   - Start: gerenciado pela Vercel

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
