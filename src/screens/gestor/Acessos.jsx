import { Link } from 'react-router-dom'
import { GestorShell } from '../../components/shell.jsx'
import { Bento, Panel, Body, Note, Pill, Btn, Sp, Verb, Row, DataTable } from '../../components/ui.jsx'

// Acessos: administração de contas e perfis de acesso ao sistema.
// Escopo: papéis, contas de usuário e seus atos rastreáveis. O cadastro
// espelhado da outorga fica em Detalhe·Identidade; as credenciais de telemetria
// (COT-R) ficam em Detalhe·Telemetria, aninhadas ao ponto de captação.
//
// Herança do SiDeCC: o fluxo de senha espelha o "Ofício de Senha" (Fundamentação §3.2:
// "Ofício de Senha · Prazo (dias) · Data de Recebimento (AR)"). O novo sistema
// mantém a rastreabilidade por ato (convite datado, inativação datada) mas pode
// adotar gov.br ou e-mail, decisão institucional não resolvida neste wireframe.
//
// Papéis e suas capacidades (modelo de produto, derivado do conjunto de atores
// do domínio; não é enumeração normativa):
//   Gestor (SP-Águas): instrui, fiscaliza, despacha
//   Analista de dados: ingestão de dados, sem poder de despacho/disposição
//   Outorgado: acesso pelo app, solicita, não despacha
//   Leitura pública: portal; sem autenticação

// ---- dados de demonstração --------------------------------------------------

const PERFIS = [
  {
    id: 'gestor',
    papel: 'Gestor',
    descricao: 'SP-Águas',
    capacidades: 'Instrui, fiscaliza e despacha (Solicitações, Apontamentos, Processos, Multas)',
    contas: '12',
    obs: 'Ato que altera despacho fica na trilha de auditoria',
  },
  {
    id: 'analista',
    papel: 'Analista de dados',
    capacidades: 'Ingestão e validação de dados de medição; sem poder de disposição ou despacho',
    contas: '4',
    obs: 'Acesso interno, para a equipe técnica de operação',
  },
  {
    id: 'outorgado',
    papel: 'Outorgado',
    capacidades: 'Acesso pelo aplicativo: solicitar, declarar, justificar; não despacha',
    contas: '312',
    obs: 'Uma conta por CNPJ/CPF; vínculo ao ponto de captação',
  },
  {
    id: 'publico',
    papel: 'Leitura pública',
    capacidades: 'Portal público de dados agregados; sem autenticação',
    contas: '–',
    obs: 'Sem conta; acesso anônimo ao portal',
  },
]

const PERFIS_COLS = [
  { key: 'papel', label: 'Papel', render: (r) => <b>{r.papel}</b> },
  { key: 'descricao', label: 'Vínculo' },
  { key: 'capacidades', label: 'Capacidades' },
  { key: 'contas', label: 'Contas ativas', num: true },
  { key: 'obs', label: 'Observação' },
]

const CONTAS = [
  {
    id: 'c-001',
    nome: 'Maria C. Ferreira',
    documento: '***.***.***-01',
    papel: 'Gestor',
    papelVar: 'act',
    ponto: 'todos os pontos',
    estado: 'Ativo',
    estadoVar: 'ok',
  },
  {
    id: 'c-002',
    nome: 'João R. Mendes',
    documento: '***.***.***-22',
    papel: 'Analista de dados',
    papelVar: 'label',
    ponto: 'todos os pontos',
    estado: 'Ativo',
    estadoVar: 'ok',
  },
  {
    id: 'c-008',
    nome: 'Carlos D. Souza',
    documento: '***.***.***-44',
    papel: 'Analista de dados',
    papelVar: 'label',
    ponto: 'todos os pontos',
    estado: 'Inativo',
    estadoVar: 'warn',
  },
]

// Verb forms para os atos rastreáveis de gestão de contas.
// Cada emissão de convite e cada inativação ficam datados na trilha (herança
// do "Ofício de Senha" do SiDeCC, Fundamentação §3.2).
const VERB_FORM = {
  'Criar usuário': {
    fields: [
      'Nome completo…',
      'CPF ou CNPJ…',
      'E-mail (para convite)…',
      'Papel ▾',
      'Ponto vinculado (ou "todos")…',
      'Justificativa…',
    ],
    note: 'O ato de criação fica datado na trilha. O mecanismo de autenticação (gov.br ou e-mail) é decisão institucional; o wireframe registra o campo de e-mail como placeholder.',
    confirm: 'Criar e enviar convite',
  },
  'Enviar convite': {
    fields: [
      'E-mail de destino (preenchido)…',
      'Justificativa do reenvio…',
    ],
    note: 'Cada emissão de convite fica datada na trilha. Herança do "Ofício de Senha" do SiDeCC (Fundamentação §3.2).',
    confirm: 'Reenviar convite',
  },
  'Recuperação de acesso': {
    fields: [
      'Conta (preenchida)…',
      'Canal de recuperação ▾',
      'Justificativa…',
    ],
    note: 'A recuperação de acesso é ato do gestor, datado na trilha, à semelhança da "Redefinir Senha" do SiDeCC (Fundamentação §3.2).',
    confirm: 'Iniciar recuperação',
  },
  'Inativar': {
    fields: [
      'Motivo da inativação ▾',
      'Justificativa…',
    ],
    note: 'A inativação é irreversível no sentido de que o ato fica na trilha; a conta pode ser reativada por novo ato do gestor, que também fica datado. O outorgado inativo não acessa o aplicativo.',
    confirm: 'Inativar conta',
  },
}

const CONTA_COLS = [
  { key: 'nome', label: 'Nome / razão social' },
  { key: 'documento', label: 'Documento', render: (r) => <span className="mono" style={{ fontSize: 11.5 }}>{r.documento}</span> },
  { key: 'papel', label: 'Papel', render: (r) => <Pill variant={r.papelVar}>{r.papel}</Pill> },
  { key: 'ponto', label: 'Ponto vinculado', render: (r) => r.ponto.startsWith('07-')
    ? <Link to="/gestor/pontos" style={{ color: 'var(--ink)', textDecoration: 'none' }}><span className="mono">{r.ponto}</span></Link>
    : <span className="faint">{r.ponto}</span>
  },
  { key: 'estado', label: 'Estado', render: (r) => <Pill variant={r.estadoVar}>{r.estado}</Pill> },
  { key: 'acoes', label: 'Atos do gestor', render: (r) => r.estado === 'Inativo'
    ? <>
        <Verb pill label="Criar usuário" variant="act" style={{ marginRight: 4 }} {...VERB_FORM['Criar usuário']} />
      </>
    : <>
        <Verb pill label="Enviar convite" style={{ marginRight: 4 }} {...VERB_FORM['Enviar convite']} />
        <Verb pill label="Recuperação de acesso" style={{ marginRight: 4 }} {...VERB_FORM['Recuperação de acesso']} />
        <Verb pill label="Inativar" variant="bad" {...VERB_FORM['Inativar']} />
      </>
  },
]

// ---- barra superior --------------------------------------------------------

const top = (
  <>
    <div className="crumb">Dados / <b style={{ color: 'var(--ink)' }}>Acessos</b></div>
    <span className="sp" />
    <Pill variant="label">16 contas internas</Pill>
    <Pill variant="ok">15 ativas</Pill>
    <Verb label="Criar usuário" variant="act" style={{ padding: '6px 12px' }} {...VERB_FORM['Criar usuário']} />
  </>
)

// ---- screen ----------------------------------------------------------------

export default function GestorAcessos() {
  return (
    <GestorShell
      tag="GESTOR · 12"
      title="Acessos"
      active="acessos"
      top={top}
      bodyStack
    >
      <Note>
        <b>Acesso interno da equipe SP-Águas.</b> Esta tela trata as contas internas (gestor e
        analista) e os perfis de permissão. As contas de outorgado, do aplicativo, ficam em
        <Link to="/gestor/outorgados"> Outorgados</Link>; o cadastro espelhado da outorga, em
        Detalhe·Identidade; as credenciais de telemetria (COT-R), em Detalhe·Telemetria. Cada
        emissão de convite e cada inativação são atos do gestor, datados na trilha de auditoria,
        à semelhança do "Ofício de Senha" do SiDeCC. O mecanismo de autenticação (gov.br ou
        e-mail) é decisão institucional, registrada nos campos.
      </Note>

      <Bento>

        {/* panel 1: papéis de acesso */}
        <Panel lead col={12} header={<>Perfis de acesso <Sp /><Pill variant="label">4 papéis</Pill></>}>
          <DataTable
            columns={PERFIS_COLS}
            rows={PERFIS}
            pageSize={6}
            empty="Nenhum perfil encontrado."
          />
        </Panel>

        <Note col={12} style={{ marginTop: 0 }}>
          Os papéis são estruturais, não configuráveis por instância. O <b>Gestor</b> é o agente
          da SP-Águas com poder de despacho; o <b>Analista de dados</b> opera a ingestão sem
          poder de disposição; o <b>Outorgado</b> acessa pelo aplicativo e só pode solicitar,
          declarar e justificar (as contas de outorgado ficam em <Link to="/gestor/outorgados">Outorgados</Link>;
          aqui ficam as contas internas). A <b>Leitura pública</b> não tem conta. Nenhum papel
          carrega capacidade de cobrança: a única receita do sistema é a multa do processo sancionador.
        </Note>

        {/* panel 2: tabela de contas */}
        <Panel col={12} header={
          <>
            Contas internas (SP-Águas) <Sp />
            <Pill variant="label">16 total</Pill>
            <Pill variant="ok">15 ativas</Pill>
            <Pill variant="warn">1 inativa</Pill>
          </>
        }>
          <DataTable
            columns={CONTA_COLS}
            rows={CONTAS}
            search={['nome', 'documento', 'papel', 'ponto', 'estado']}
            searchPlaceholder="Buscar nome / documento / papel / ponto…"
            pageSize={7}
            universe={328}
            empty="Nenhuma conta corresponde à busca."
          />
        </Panel>

        <Note col={8}>
          A conta inativa não acessa o sistema; o histórico de declarações e atos permanece. A coluna "Ponto vinculado"
          identifica o ponto de captação; gestores e analistas têm acesso transversal a todos os
          pontos e aparecem como "todos os pontos".
        </Note>

        {/* panel 3: cross-link para credenciais de telemetria */}
        <Panel col={4} header={<>Credenciais de telemetria <Sp /><Pill variant="label" className="mono">COT-R</Pill></>}>
          <Body>
            <Note style={{ fontSize: 12.5, marginBottom: 12 }}>
              As credenciais de telemetria (COT-R) ficam em <b>Detalhe · Telemetria</b>,
              aninhadas ao ponto de captação, porque o COT-R é emitido por ponto, não por
              conta de usuário.
            </Note>
            <Row style={{ gap: 8 }}>
              <Btn sub to="/gestor/pontos" style={{ padding: '6px 12px' }}>
                Ir para Pontos / outorgas →
              </Btn>
            </Row>
            <Note style={{ fontSize: 11.5, marginTop: 12 }}>
              O COT-R (Comunicado de Orientação para Transmissão Remota) é emitido pelo Diretor
              de Bacia por ponto de captação, nos termos da Portaria DAEE 6.987/2018, art. 5º.
              A interligação percorre as etapas: proposta em análise, deferida, login experimental,
              operacional. O onboarding corre em Solicitações.
            </Note>
          </Body>
        </Panel>

      </Bento>
    </GestorShell>
  )
}
