import { Link } from 'react-router-dom'
import { GestorShell } from '../../components/shell.jsx'
import { Bento, Panel, Note, Pill, Sp, Verb, DataTable } from '../../components/ui.jsx'

// Fila de avaliação das justificativas de ausência de declaração.
// Estado enum (Fundamentação §4, "Estado da justificativa / medição alternativa"):
//   Aguardando avaliação · Aprovado · Reprovado
// Separada das Solicitações por decisão 2.6 do redesenho.
// Medição alternativa compartilha o mesmo trilho de avaliação.

const VERB_FORM_APROVAR = {
  note: 'A aprovação registra o ato na trilha e notifica o outorgado. Período de ausência justificado fica arquivado.',
}

const VERB_FORM_REPROVAR = {
  fields: ['Justificativa do despacho…'],
  note: 'A reprovação é despacho com justificativa obrigatória; grava na trilha de auditoria e notifica o outorgado.',
}

// Estado enum verbatim do SiDeCC (Fundamentação §4).
// Aguardando avaliação · Aprovado · Reprovado.
const JUSTIFICATIVAS = [
  {
    id: 'JUS-2026-0089',
    ponto: '07-1042 · Petroquímica Baixada S/A',
    periodo: 'mai/2026 · 2ª quinzena',
    motivo: 'Falha no medidor HX-99213 · equipamento enviado para manutenção',
    recebida: '03/06',
    situacao: 'Aguardando avaliação',
    situacaoVar: 'warn',
  },
  {
    id: 'JUS-2026-0088',
    ponto: '07-0830 · Serviço de Águas de Praia Grande',
    periodo: 'mai/2026 · quinzena completa',
    motivo: 'Medição alternativa (volume estimado por método de nível)',
    recebida: '02/06',
    situacao: 'Aguardando avaliação',
    situacaoVar: 'warn',
    medAlt: true,
  },
  {
    id: 'JUS-2026-0085',
    ponto: '07-0712 · Laticínios Itanhaém',
    periodo: 'abr/2026 · 1ª quinzena',
    motivo: 'Interrupção no fornecimento de energia elétrica · 3 dias',
    recebida: '18/05',
    situacao: 'Aguardando avaliação',
    situacaoVar: 'warn',
  },
  {
    id: 'JUS-2026-0081',
    ponto: '07-1001 · Indústria Cubatão S/A',
    periodo: 'abr/2026 · 2ª quinzena',
    motivo: 'Substituição do medidor HX-2041 · declaração retomada em 04/05',
    recebida: '10/05',
    situacao: 'Aprovado',
    situacaoVar: 'ok',
    terminal: true,
  },
  {
    id: 'JUS-2026-0079',
    ponto: '07-1100 · Indústria Química Cubatão',
    periodo: 'mar/2026 · quinzena completa',
    motivo: 'Ausência não justificada no prazo · sem protocolo complementar',
    recebida: '05/05',
    situacao: 'Reprovado',
    situacaoVar: 'bad',
    terminal: true,
  },
  {
    id: 'JUS-2026-0074',
    ponto: '07-0455 · Indústria Têxtil Mongaguá',
    periodo: 'mar/2026 · 1ª quinzena',
    motivo: 'Medição alternativa (volume estimado por regime de operação)',
    recebida: '20/04',
    situacao: 'Aprovado',
    situacaoVar: 'ok',
    terminal: true,
    medAlt: true,
  },
  {
    id: 'JUS-2026-0071',
    ponto: '07-1042 · Petroquímica Baixada S/A',
    periodo: 'fev/2026 · 2ª quinzena',
    motivo: 'Falha no medidor HX-99213 · substituição pendente',
    recebida: '05/04',
    situacao: 'Aprovado',
    situacaoVar: 'ok',
    terminal: true,
  },
  {
    id: 'JUS-2026-0068',
    ponto: '07-1042 · Petroquímica Baixada S/A',
    periodo: 'jan/2026 · 2ª quinzena',
    motivo: 'Falha no medidor HX-99213',
    recebida: '10/03',
    situacao: 'Aprovado',
    situacaoVar: 'ok',
    terminal: true,
  },
]

const JUST_COLS = [
  {
    key: 'id',
    label: 'Protocolo',
    render: (r) => <span className={r.terminal ? 'mono faint' : 'mono'}>{r.id}</span>,
  },
  {
    key: 'ponto',
    label: 'Ponto / outorgado',
    render: (r) => (
      <span>
        {r.ponto}
        {r.medAlt && <Pill variant="label" style={{ marginLeft: 6, fontSize: 10 }}>Med. alternativa</Pill>}
      </span>
    ),
  },
  { key: 'periodo', label: 'Período da ausência' },
  { key: 'motivo', label: 'Motivo' },
  { key: 'recebida', label: 'Recebida', num: true },
  {
    key: 'situacao',
    label: 'Situação',
    render: (r) => <Pill variant={r.situacaoVar}>{r.situacao}</Pill>,
  },
  {
    key: 'acoes',
    label: 'Ações do gestor',
    render: (r) =>
      r.terminal ? (
        <a className="pill">Ver despacho</a>
      ) : (
        <>
          <Verb pill label="Aprovar" variant="ok" style={{ marginRight: 4 }} {...VERB_FORM_APROVAR} />
          <Verb pill label="Reprovar" variant="bad" {...VERB_FORM_REPROVAR} />
        </>
      ),
  },
]

const top = (
  <>
    <div className="crumb">Fiscalização / <b style={{ color: 'var(--ink)' }}>Justificativas</b></div>
    <span className="sp" />
    <div className="input search" style={{ minHeight: 36 }}><span className="faint">Buscar protocolo / outorgado…</span></div>
  </>
)

export default function GestorJustificativas() {
  return (
    <GestorShell
      tag="GESTOR · 08"
      title="Justificativas"
      active="justificativas"
      top={top}
    >
      <Note style={{ marginBottom: 16 }}>
        <b>Fila de avaliação das justificativas de ausência de declaração.</b> O outorgado registra a justificativa no SiDeCC (subaba interna Justificativas); o gestor avalia e aprova ou reprova. A medição alternativa percorre o mesmo trilho: <b>Aguardando avaliação, Aprovado, Reprovado</b>. A reprovação exige justificativa obrigatória.
      </Note>

      <Bento>

        {/* main evaluation queue */}
        <Panel lead col={12} header={<>Justificativas recebidas <Sp /><Pill variant="label">3 aguardando avaliação</Pill></>}>
          <DataTable
            columns={JUST_COLS}
            rows={JUSTIFICATIVAS}
            search={['id', 'ponto', 'periodo', 'motivo', 'situacao']}
            searchPlaceholder="Buscar protocolo / outorgado / motivo…"
            pageSize={6}
            empty="Nenhuma justificativa corresponde à busca."
          />
        </Panel>

        <Note col={12}>
          <b>Situação</b> segue o enum do SiDeCC: Aguardando avaliação, Aprovado e Reprovado. Esses estados são distintos dos usados nas Solicitações (Aguardando análise / Deferida / Indeferida), por decisão de separação 2.6 do redesenho. O outorgado que declara por medição alternativa em vez de leitura de medidor também entra nesta fila com o mesmo rito de avaliação; a coluna Ponto identifica esses casos com o marcador "Med. alternativa". Justificativas aprovadas e reprovadas ficam arquivadas com o despacho fundamentado.
        </Note>

        {/* anti-gaming signal: repeated justificativas link to apontamentos */}
        <Panel col={12} header={<>Justificativas repetidas <Sp /><Pill variant="warn">sinal</Pill></>}>
          <div className="body">
            <div className="list">
              <div className="lrow">
                <div className="lr-top">
                  <span className="lr-title">07-1042 · Petroquímica Baixada S/A</span>
                  <Pill variant="warn">3 ausências em 5 meses · mesmo medidor</Pill>
                </div>
                <div className="lr-sub">JUS-2026-0089 · JUS-2026-0071 · JUS-2026-0068 · motivo recorrente: falha no HX-99213</div>
                <div className="lr-sub" style={{ marginTop: 4 }}>
                  <Link className="pill warn" to="/gestor/apontamentos">Abrir na triagem de apontamentos</Link>
                </div>
              </div>
            </div>
          </div>
          <Note style={{ fontSize: 12, marginTop: 8 }}>
            Justificativas repetidas por outorgado ou por tipo, em período, funcionam como sinal de recorrência. O padrão de ausências reiteradas do mesmo equipamento ou do mesmo ponto eleva o risco de sub-declaração sistemática e justifica abertura de apontamento na triagem. A análise de período fica disponível em Relatórios.
          </Note>
        </Panel>

      </Bento>
    </GestorShell>
  )
}
