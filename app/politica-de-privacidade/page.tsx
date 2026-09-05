import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Saiba como a Solar Energy Qualidade e Eficiência trata os dados enviados pelo site.",
  alternates: {
    canonical: "/politica-de-privacidade"
  },
  openGraph: {
    title: "Política de Privacidade | Solar Energy",
    description:
      "Informações sobre coleta, uso, armazenamento e direitos relacionados a dados pessoais.",
    url: "/politica-de-privacidade"
  }
};

const sections = [
  {
    title: "1. Quem trata seus dados",
    content: (
      <>
        A controladora dos dados enviados por este site é {company.name}, inscrita no
        CNPJ {company.cnpj}, com endereço em {company.address}. Dúvidas e solicitações
        relacionadas à privacidade podem ser enviadas para{" "}
        <a href={`mailto:${company.email}`}>{company.email}</a>.
      </>
    )
  },
  {
    title: "2. Dados que podemos coletar",
    content: (
      <>
        Podemos receber nome, WhatsApp, e-mail, cidade e estado, tipo de imóvel, valor
        médio da conta de energia, consumo mensal, mensagem e dados da simulação. Para
        segurança, diagnóstico e prevenção de abuso, também podemos tratar dados
        técnicos como endereço IP, página de origem, data do acesso e identificação do
        navegador.
      </>
    )
  },
  {
    title: "3. Para que usamos os dados",
    content: (
      <>
        Utilizamos os dados para responder solicitações, elaborar análises preliminares,
        entrar em contato, preparar propostas, registrar o histórico de atendimento,
        proteger os formulários contra abuso e cumprir obrigações legais ou
        regulatórias. Não vendemos dados pessoais.
      </>
    )
  },
  {
    title: "4. Bases legais",
    content: (
      <>
        O tratamento pode ocorrer para atender a uma solicitação do titular e realizar
        procedimentos preliminares relacionados a uma possível contratação, para
        cumprir obrigações legais, proteger o exercício regular de direitos, atender a
        interesses legítimos compatíveis com a expectativa do titular ou mediante
        consentimento, quando essa for a base aplicável.
      </>
    )
  },
  {
    title: "5. Compartilhamento e fornecedores",
    content: (
      <>
        Os dados podem ser processados por fornecedores necessários à operação do site,
        como hospedagem, banco de dados, automação, CRM e comunicação. Quando você opta
        por falar pelo WhatsApp, a interação também fica sujeita às políticas da
        plataforma. Esses fornecedores recebem somente os dados necessários para a
        finalidade contratada.
      </>
    )
  },
  {
    title: "6. Armazenamento e segurança",
    content: (
      <>
        Aplicamos medidas técnicas e administrativas razoáveis para reduzir riscos de
        acesso indevido, perda, alteração ou divulgação. Os dados são mantidos pelo
        período necessário ao atendimento, à relação comercial e ao cumprimento de
        obrigações legais, sendo eliminados ou anonimizados quando não houver outra
        finalidade legítima para sua conservação.
      </>
    )
  },
  {
    title: "7. Transferências internacionais",
    content: (
      <>
        Alguns fornecedores de tecnologia podem operar infraestrutura fora do Brasil.
        Quando isso ocorrer, buscamos utilizar fornecedores com medidas contratuais e de
        segurança compatíveis com a legislação aplicável.
      </>
    )
  },
  {
    title: "8. Cookies e tecnologias semelhantes",
    content: (
      <>
        <span id="cookies">
          O site utiliza recursos técnicos necessários ao funcionamento e pode utilizar
          Google Analytics e Meta Pixel para medir audiência e conversões. Essas
          ferramentas opcionais somente são carregadas após a sua autorização no painel
          de cookies. A recusa não impede o uso do site. Você pode rever a escolha pelo
          botão “Cookies” exibido no canto da página ou limpar os dados armazenados pelo
          navegador.
        </span>
      </>
    )
  },
  {
    title: "9. Seus direitos",
    content: (
      <>
        Você pode solicitar confirmação de tratamento, acesso, correção, informação
        sobre compartilhamento, portabilidade quando aplicável, revisão, anonimização,
        bloqueio ou eliminação nos casos previstos em lei, além de revogar consentimento
        quando essa for a base utilizada. Para exercer esses direitos, escreva para{" "}
        <a href={`mailto:${company.email}`}>{company.email}</a>.
      </>
    )
  },
  {
    title: "10. Atualizações",
    content: (
      <>
        Esta política pode ser atualizada para refletir mudanças no site, nos serviços
        ou na legislação. A versão vigente estará sempre disponível nesta página.
      </>
    )
  }
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-navy py-10 text-white sm:py-16">
      <Container className="max-w-4xl">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-md border border-white/20 px-4 py-2 text-sm font-bold transition hover:border-solar-green hover:text-solar-green"
        >
          Voltar para o site
        </Link>

        <header className="mt-10 border-b border-white/[0.12] pb-8">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-solar-green">
            Transparência e proteção de dados
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
            Política de Privacidade
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-dark/80">
            Este documento explica como tratamos os dados pessoais enviados pelo site e
            quais direitos você pode exercer.
          </p>
          <p className="mt-4 text-sm text-gray-dark/60">
            Última atualização: 4 de setembro de 2026.
          </p>
        </header>

        <div className="grid gap-8 py-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-black text-white">{section.title}</h2>
              <div className="privacy-copy mt-3 text-sm leading-7 text-gray-dark/80 sm:text-base">
                {section.content}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </main>
  );
}
