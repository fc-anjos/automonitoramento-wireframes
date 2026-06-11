import { Link } from 'react-router-dom'
import { GestorShell } from '../../components/shell.jsx'
import { Bento, Panel, Note, Pill, Verb, Sp, DataTable } from '../../components/ui.jsx'

// Outorgados: a base de usuários do aplicativo, uma conta por CNPJ/CPF do
// outorgado, vinculada ao ponto de captação. Separada do acesso interno da
// equipe (Acessos) e do cadastro da outorga (Pontos / Detalhe·Identidade,
// espelho do SOE). A conta nasce do cadastro e do convite; herança do
// "Ofício de Senha" do SiDeCC (Fundamentação §3.2).

const CONTAS = [
  { id: 'c-003', nome: 'Indústria Química Cubatão', documento: '**.***.***/**-03', ponto: '07-1100', estado: 'Ativo', estadoVar: 'ok' },
  { id: 'c-004', nome: 'Petroquímica Baixada S/A', documento: '**.***.***/**-07', ponto: '07-1042', estado: 'Ativo', estadoVar: 'ok' },
  { id: 'c-005', nome: 'Laticínios Itanhaém', documento: '**.***.***/**-18', ponto: '07-0712', estado: 'Inativo', estadoVar: 'warn' },
  { id: 'c-006', nome: 'Indústria Têxtil Mongaguá', documento: '**.***.***/**-55', ponto: '07-0455', estado: 'Ativo', estadoVar: 'ok' },
  { id: 'c-007', nome: 'Serviço de Águas de Praia Grande', documento: '**.***.***/**-30', ponto: '07-0830', estado: 'Ativo', estadoVar: 'ok' },
]

// Atos do gestor sobre a conta do outorgado, datados na trilha.
const VERB_FORM = {
  'Enviar convite': {
    fields: ['E-mail de destino (preenchido)…', 'Justificativa do reenvio…'],
    note: 'Cada emissão de convite fica datada na trilha. Herança do "Ofício de Senha" do SiDeCC (Fundamentação §3.2).',
    confirm: 'Reenviar convite',
  },
  'Recuperação de acesso': {
    fields: ['Conta (preenchida)…', 'Canal de recuperação ▾', 'Justificativa…'],
    note: 'A recuperação de acesso é ato do gestor, datado na trilha, à semelhança da "Redefinir Senha" do SiDeCC (Fundamentação §3.2).',
    confirm: 'Iniciar recuperação',
  },
  'Inativar': {
    fields: ['Motivo da inativação ▾', 'Justificativa…'],
    note: 'A conta inativa não acessa o aplicativo; o histórico de declarações e atos permanece. Reativar é novo ato do gestor, também datado.',
    confirm: 'Inativar conta',
  },
  'Reativar': {
    fields: ['Justificativa…'],
    note: 'A reativação é ato do gestor, datado na trilha.',
    confirm: 'Reativar conta',
  },
}

const COLS = [
  { key: 'nome', label: 'Razão social / nome' },
  { key: 'documento', label: 'CNPJ / CPF', render: (r) => <span className="mono" style={{ fontSize: 11.5 }}>{r.documento}</span> },
  { key: 'ponto', label: 'Ponto vinculado', render: (r) => (
    <Link to="/gestor/detalhe" style={{ color: 'var(--ink)', textDecoration: 'none' }}><span className="mono">{r.ponto}</span></Link>
  ) },
  { key: 'estado', label: 'Estado', render: (r) => <Pill variant={r.estadoVar}>{r.estado}</Pill> },
  { key: 'acoes', label: 'Atos do gestor', render: (r) => r.estado === 'Inativo'
    ? <Verb pill label="Reativar" variant="act" {...VERB_FORM['Reativar']} />
    : <>
        <Verb pill label="Enviar convite" style={{ marginRight: 4 }} {...VERB_FORM['Enviar convite']} />
        <Verb pill label="Recuperação de acesso" style={{ marginRight: 4 }} {...VERB_FORM['Recuperação de acesso']} />
        <Verb pill label="Inativar" variant="bad" {...VERB_FORM['Inativar']} />
      </>
  },
]

const top = (
  <>
    <div className="crumb">Dados / <b style={{ color: 'var(--ink)' }}>Outorgados</b></div>
    <span className="sp" />
    <div className="input search" style={{ minHeight: 36 }}><span className="faint">Buscar razão social, CNPJ, ponto…</span></div>
    <Pill variant="label">312 contas</Pill>
    <Pill variant="ok">311 ativas</Pill>
  </>
)

export default function GestorOutorgados() {
  return (
    <GestorShell tag="GESTOR · 11" title="Outorgados" active="outorgados" top={top}>
      <Note style={{ marginBottom: 16 }}>
        <b>A base de usuários do aplicativo.</b> Uma conta por CNPJ ou CPF do outorgado, vinculada ao ponto de captação. É distinta do cadastro da outorga (<Link to="/gestor/pontos">Pontos</Link>, espelho do SOE) e do acesso interno da equipe (<Link to="/gestor/acessos">Acessos</Link>). Um mesmo outorgado pode deter mais de uma outorga; a conta dá acesso ao aplicativo para declarar, solicitar e justificar.
      </Note>

      <Bento>
        <Panel lead col={12} header={
          <>
            Contas de outorgado <Sp />
            <Pill variant="label">312 total</Pill>
            <Pill variant="ok">311 ativas</Pill>
            <Pill variant="warn">1 inativa</Pill>
          </>
        }>
          <DataTable
            columns={COLS}
            rows={CONTAS}
            search={['nome', 'documento', 'ponto', 'estado']}
            searchPlaceholder="Buscar razão social / CNPJ / ponto…"
            pageSize={8}
            universe={312}
            empty="Nenhuma conta corresponde à busca."
          />
        </Panel>

        <Note col={12}>
          A conta do outorgado nasce do cadastro e do convite, datados na trilha de auditoria (herança do "Ofício de Senha" do SiDeCC, Fundamentação §3.2). A coluna "Ponto vinculado" abre a ficha do ponto. O mecanismo de autenticação (gov.br ou e-mail) é decisão institucional, registrada nos campos.
        </Note>
      </Bento>
    </GestorShell>
  )
}
