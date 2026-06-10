import { Link } from 'react-router-dom'
import { GestorShell } from '../../components/shell.jsx'
import { Bento, Panel, Body, Note, Pill, Btn, Sp, DataTable } from '../../components/ui.jsx'

// default dispatch verbs; a row may override with `verbos` (e.g. ausência is
// acknowledged, not granted; telemetry advances by COT-R stage)
const VERBOS_PADRAO = [
  { label: 'Deferir', cls: 'ok' },
  { label: 'Indeferir', cls: 'bad' },
  { label: 'Pedir documento', cls: '' },
]

const SOLICITACOES = [
  { id: 'SOL-2026-0467', ponto: '07-1001 · Indústria Cubatão S/A', tipo: 'Medidor · troca', recebida: '05/06', situacao: 'Aguardando análise · HX-99213 substitui HX-2041', situacaoVar: 'warn' },
  { id: 'SOL-2026-0464', ponto: '07-0712 · Laticínios Itanhaém', tipo: 'Ausência antecipada', recebida: '04/06', situacao: 'Aguardando ciência · parada 01/07 a 31/07', situacaoVar: 'warn',
    verbos: [{ label: 'Registrar ciência', cls: 'ok' }, { label: 'Indeferir', cls: 'bad' }] },
  { id: 'SOL-2026-0461', ponto: '07-0830 · Serviço de Águas de Praia Grande', tipo: 'Renovação', recebida: '02/06', situacao: 'Aguardando análise · outorga vence 17/07', situacaoVar: 'warn' },
  { id: 'SOL-2026-0458', ponto: '07-1042 · Petroquímica Baixada S/A', tipo: 'Telemetria · interligação', recebida: '30/05', situacao: 'COT-R · proposta em análise', situacaoVar: 'warn',
    verbos: [{ label: 'Deferir proposta', cls: 'ok' }, { label: 'Indeferir', cls: 'bad' }, { label: 'Pedir complemento', cls: '' }] },
  { id: 'SOL-2026-0455', ponto: '07-0455 · Indústria Têxtil Mongaguá', tipo: 'Desativação', recebida: '28/05', situacao: 'Em análise · dormência ~24 meses', situacaoVar: 'warn' },
  { id: 'SOL-2026-0448', ponto: '07-1001 · Indústria Cubatão S/A', tipo: 'Ampliação', recebida: '26/05', situacao: 'Aguardando análise', situacaoVar: 'warn' },
  { id: 'SOL-2026-0432', ponto: '07-1042 · Petroquímica Baixada S/A', tipo: 'Transferência', recebida: '15/05', situacao: 'Em análise · aguardando contrato', situacaoVar: 'warn' },
  { id: 'SOL-2026-0419', ponto: '07-0712 · Laticínios Itanhaém', tipo: 'Dispensa', recebida: '08/05', situacao: 'Aguardando análise · uso insignificante', situacaoVar: 'warn' },
  { id: 'SOL-2026-0398', ponto: '07-1100 · Indústria Química Cubatão', tipo: 'Renovação', recebida: '22/04', situacao: 'Indeferida · processo de infração em curso', situacaoVar: 'bad', terminal: true },
  { id: 'SOL-2026-0390', ponto: '07-0455 · Indústria Têxtil Mongaguá', tipo: 'Medidor · desativação', recebida: '18/04', situacao: 'Deferida · 30/04 · leitura de remoção registrada', situacaoVar: 'ok', terminal: true },
  { id: 'SOL-2026-0377', ponto: '07-1001 · Indústria Cubatão S/A', tipo: 'Redução', recebida: '02/04', situacao: 'Deferida · 18/04', situacaoVar: 'ok', terminal: true },
  { id: 'SOL-2026-0322', ponto: '07-0830 · Serviço de Águas de Praia Grande', tipo: 'Telemetria · interligação', recebida: '12/03', situacao: 'COT-R · login experimental', situacaoVar: 'act',
    verbos: [{ label: 'Tornar operacional', cls: 'ok' }, { label: 'Ver transmissão', cls: '' }] },
  { id: 'SOL-2026-0301', ponto: '07-1001 · Indústria Cubatão S/A', tipo: 'Telemetria · interligação', recebida: '12/02', situacao: 'COT-R · operacional desde 02/04', situacaoVar: 'ok', terminal: true },
]

const SOL_COLS = [
  { key: 'id', label: 'Protocolo', render: (r) => <span className={r.terminal ? 'mono faint' : 'mono'}>{r.id}</span> },
  { key: 'ponto', label: 'Ponto / outorgado' },
  { key: 'tipo', label: 'Tipo' },
  { key: 'recebida', label: 'Recebida', num: true },
  { key: 'situacao', label: 'Situação', render: (r) => <Pill variant={r.situacaoVar}>{r.situacao}</Pill> },
  { key: 'acoes', label: 'Ações do gestor', render: (r) => r.terminal
    ? <Link className="pill" to="/gestor/detalhe">Ver despacho</Link>
    : (r.verbos ?? VERBOS_PADRAO).map((v) => (
        <Link key={v.label} className={v.cls ? `pill ${v.cls}` : 'pill'} to="/gestor/apontamento" style={{ marginRight: 4 }}>{v.label}</Link>
      )) },
]

const top = (
  <>
    <div className="crumb">Operação / <b style={{ color: 'var(--ink)' }}>Solicitações</b></div>
    <span className="sp" />
    <div className="input search" style={{ minHeight: 36 }}><span className="faint">Buscar protocolo / outorgado…</span></div>
    <Btn sub style={{ padding: '6px 12px' }}>Exportar</Btn>
  </>
)

export default function Solicitacoes() {
  return (
    <GestorShell tag="GESTOR · 07" title="Solicitações" active="solicitacoes" top={top}>
      <Note style={{ marginBottom: 16 }}>
        <b>A fila de pedidos do outorgado, agora em quatro famílias.</b> O outorgado protocola e o gestor despacha. O catálogo cobre os pedidos sobre o ciclo de vida da <b>outorga</b> (renovação, ampliação, transferência, dispensa, desativação), que a plataforma recebe, instrui e encaminha ao processo de outorga, onde o ato se formaliza; sobre o <b>equipamento</b> (inclusão, troca e desativação de medidor), sobre o <b>calendário</b> (justificativa antecipada de ausência de declaração) e sobre o <b>canal</b> (interligação à telemetria, no rito do COT-R). Os verbos seguem o pedido: <b>deferir</b>, <b>indeferir</b>, <b>pedir documento</b> e, no caso das ausências, <b>registrar ciência</b>. Nada se apaga: ao decidir, o pedido muda de situação e fica arquivado com a trilha de quem despachou e quando.
      </Note>

      <Bento>

        {/* the request queue is the main object: each row carries type, date and situation */}
        <Panel lead col={12} header={<>Solicitações recebidas <Sp /><Pill variant="label">9 abertas</Pill></>}>
          <DataTable
            columns={SOL_COLS}
            rows={SOLICITACOES}
            search={['id', 'ponto', 'tipo', 'situacao']}
            searchPlaceholder="Buscar protocolo / outorgado / tipo…"
            pageSize={6}
            empty="Nenhuma solicitação corresponde à busca."
          />
        </Panel>

        <Note col={12}>
          A <b>situação</b> acompanha a etapa do pedido, e não um status genérico. "Aguardando análise" é o pedido recém-protocolado; "Em análise" é o que já está sob instrução, às vezes esperando uma peça do outorgado. As ausências antecipadas ficam em "Aguardando ciência" até o gestor reconhecê-las. Nas interligações à telemetria a situação exibe a <b>etapa do COT-R</b> de cada pedido (proposta em análise · deferida · login experimental · operacional), de modo que a fila mostra onde cada onboarding parou. "Deferida" e "Indeferida" são terminais, mas não somem: o pedido fica arquivado com o despacho fundamentado. Sem medidor ativo, como no 07-0455 após a desativação deferida em 30/04, o ponto declara por medição alternativa até novo equipamento deferido. A renovação do 07-0830 corre contra o calendário, porque a outorga vence em 17/07.
        </Note>

        {/* advance absence anchored on the live request: acknowledged, not granted */}
        <Panel col={5} header={<>Ausência antecipada <Sp /><Pill variant="label">calendário</Pill></>}>
          <Body>
            <div className="list">
              <div className="lrow">
                <div className="lr-top"><span className="lr-title mono">SOL-2026-0464</span><Pill variant="warn">aguardando ciência</Pill></div>
                <div className="lr-sub">07-0712 · Laticínios Itanhaém · parada total programada · 01/07 a 31/07</div>
                <div className="lr-sub" style={{ marginTop: 4 }}>
                  <Link className="pill ok" to="/gestor/apontamento" style={{ marginRight: 4 }}>Registrar ciência</Link>
                  <Link className="pill bad" to="/gestor/apontamento">Indeferir</Link>
                </div>
              </div>
            </div>
            <Note style={{ fontSize: 12, marginTop: 12 }}>A justificativa é protocolada <b>antes</b> do período sem captação. A ciência cobre o calendário do período e suspende a exceção de declaração ausente; o indeferimento devolve o período ao calendário comum.</Note>
          </Body>
        </Panel>

        {/* telemetry onboarding tracked on the live requests, each positioned on its COT-R stage */}
        <Panel col={7} header={<>Interligação à telemetria <Sp /><Pill variant="label" className="mono">COT-R</Pill></>}>
          <Body>
            <div className="list">
              <div className="lrow">
                <div className="lr-top"><span className="lr-title mono">SOL-2026-0458</span><Pill variant="warn">etapa 1 · proposta em análise</Pill></div>
                <div className="lr-sub">07-1042 · Petroquímica Baixada S/A · proposta técnica recebida 30/05</div>
                <div className="lr-sub" style={{ marginTop: 4 }}>
                  <Link className="pill ok" to="/gestor/apontamento" style={{ marginRight: 4 }}>Deferir proposta</Link>
                  <Link className="pill" to="/gestor/apontamento">Pedir complemento</Link>
                </div>
              </div>
              <div className="lrow">
                <div className="lr-top"><span className="lr-title mono">SOL-2026-0322</span><Pill variant="act">etapa 3 · login experimental</Pill></div>
                <div className="lr-sub">07-0830 · Serviço de Águas de Praia Grande · transmissão em paralelo com a autodeclaração desde 12/03</div>
                <div className="lr-sub" style={{ marginTop: 4 }}>
                  <Link className="pill ok" to="/gestor/apontamento">Tornar operacional</Link>
                </div>
              </div>
              <div className="lrow">
                <div className="lr-top"><span className="lr-title mono faint">SOL-2026-0301</span><Pill variant="ok">etapa 4 · operacional desde 02/04</Pill></div>
                <div className="lr-sub">07-1001 · Indústria Cubatão S/A</div>
                <div className="lr-sub" style={{ marginTop: 4 }}>
                  <Link className="pill" to="/gestor/detalhe">Ver despacho</Link>
                </div>
              </div>
            </div>
            <Note style={{ fontSize: 12, marginTop: 12 }}>O onboarding percorre as etapas do COT-R (proposta em análise → deferida → login experimental → operacional), e cada mudança de etapa é um despacho datado.</Note>
          </Body>
        </Panel>

        {/* immutable trail of dispatches */}
        <Panel col={4} header={<>Trilha de despachos <Sp /><Pill variant="label" className="mono">imutável</Pill></>}>
          <Body className="list">
            <div className="lrow"><div className="lr-sub"><span className="mono faint">06/06 11:18</span> · recebida SOL-2026-0461 (renovação · 07-0830)</div></div>
            <div className="lrow"><div className="lr-sub"><span className="mono faint">05/06 09:12</span> · recebida SOL-2026-0467 (medidor · troca · 07-1001)</div></div>
            <div className="lrow"><div className="lr-sub"><span className="mono faint">30/05 16:40</span> · proposta técnica anexada a SOL-2026-0458 (telemetria · 07-1042)</div></div>
            <div className="lrow"><div className="lr-sub"><span className="mono faint">22/04 09:40</span> · indeferida SOL-2026-0398 (infração em curso)</div></div>
            <div className="lrow"><div className="lr-sub"><span className="mono faint">02/04 10:05</span> · login operacional liberado em SOL-2026-0301 (telemetria · 07-1001)</div></div>
          </Body>
        </Panel>

        <Note col={8}>
          O despacho é exclusivo do gestor; ao outorgado cabe <b>solicitar</b>. Cada despacho é um ato datado e imutável na trilha, o que sustenta o devido processo, já que os prazos correm da ciência. <b>Pedir documento</b> suspende o prazo até a peça chegar. Nos pedidos sobre a <b>outorga</b>, o deferimento é encaminhado ao processo de outorga e o novo estado entra pelo cadastro espelhado. Registrar ciência é despacho de menor grau: não defere nem indefere, apenas reconhece. A renovação tempestiva tem efeito de silêncio positivo: o gestor que pretende indeferir precisa fazê-lo dentro do prazo, sob pena de renovação automática.
        </Note>

      </Bento>
    </GestorShell>
  )
}
