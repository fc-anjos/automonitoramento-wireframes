import { Link } from 'react-router-dom'
import { GestorShell } from '../../components/shell.jsx'
import { Bento, Panel, Body, Note, Pill, Btn, Sp, DataTable } from '../../components/ui.jsx'

const SOLICITACOES = [
  { id: 'SOL-2026-0461', ponto: '07-0830 · Serviço de Águas de Praia Grande', tipo: 'Renovação', recebida: '02/06', situacao: 'Aguardando análise · outorga vence 17/07', situacaoVar: 'warn' },
  { id: 'SOL-2026-0455', ponto: '07-0455 · Indústria Têxtil Mongaguá', tipo: 'Desativação', recebida: '28/05', situacao: 'Em análise · dormência ~24 meses', situacaoVar: 'warn' },
  { id: 'SOL-2026-0448', ponto: '07-1001 · Indústria Cubatão S/A', tipo: 'Ampliação', recebida: '26/05', situacao: 'Aguardando análise', situacaoVar: 'warn' },
  { id: 'SOL-2026-0432', ponto: '07-1042 · Petroquímica Baixada S/A', tipo: 'Transferência', recebida: '15/05', situacao: 'Em análise · aguardando contrato', situacaoVar: 'warn' },
  { id: 'SOL-2026-0419', ponto: '07-0712 · Laticínios Itanhaém', tipo: 'Dispensa', recebida: '08/05', situacao: 'Aguardando análise · uso insignificante', situacaoVar: 'warn' },
  { id: 'SOL-2026-0398', ponto: '07-1100 · Indústria Química Cubatão', tipo: 'Renovação', recebida: '22/04', situacao: 'Indeferida · processo de infração em curso', situacaoVar: 'bad', terminal: true },
  { id: 'SOL-2026-0377', ponto: '07-1001 · Indústria Cubatão S/A', tipo: 'Redução', recebida: '02/04', situacao: 'Deferida · 18/04', situacaoVar: 'ok', terminal: true },
]

const SOL_COLS = [
  { key: 'id', label: 'Protocolo', render: (r) => <span className={r.terminal ? 'mono faint' : 'mono'}>{r.id}</span> },
  { key: 'ponto', label: 'Ponto / outorgado' },
  { key: 'tipo', label: 'Tipo' },
  { key: 'recebida', label: 'Recebida', num: true },
  { key: 'situacao', label: 'Situação', render: (r) => <Pill variant={r.situacaoVar}>{r.situacao}</Pill> },
  { key: 'acoes', label: 'Ações do gestor', render: (r) => r.terminal
    ? <Link className="pill" to="/gestor/detalhe">Ver despacho</Link>
    : <><Link className="pill ok" to="/gestor/apontamento">Deferir</Link> <Link className="pill bad" to="/gestor/apontamento">Indeferir</Link> <Link className="pill" to="/gestor/apontamento">Pedir documento</Link></> },
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
        <b>A fila de pedidos do outorgado sobre a própria outorga.</b> O outorgado protocola o pedido e o gestor o despacha. Renovação, ampliação, transferência, dispensa e desativação são pedidos sobre o ciclo de vida da outorga, cada um com sua situação. Aqui o gestor exerce os verbos de despacho: <b>deferir</b>, <b>indeferir</b> ou <b>pedir documento</b> quando a instrução está incompleta. Nada se apaga: ao decidir, o pedido muda de situação e fica arquivado com a trilha de quem despachou e quando.
      </Note>

      <Bento>

        {/* the request queue is the main object: each row carries type, date and situation */}
        <Panel lead col={12} header={<>Solicitações recebidas <Sp /><Pill variant="label">5 abertas</Pill></>}>
          <DataTable
            columns={SOL_COLS}
            rows={SOLICITACOES}
            search={['id', 'ponto', 'tipo', 'situacao']}
            searchPlaceholder="Buscar protocolo / outorgado / tipo…"
            pageSize={5}
            empty="Nenhuma solicitação corresponde à busca."
          />
        </Panel>

        <Note col={12}>
          A <b>situação</b> acompanha a etapa do pedido, e não um status genérico. "Aguardando análise" é o pedido recém-protocolado, ainda na mesa do gestor; "Em análise" é o que já está sob instrução, às vezes esperando uma peça do outorgado (contrato de transferência, comprovação de remoção de equipamentos). "Deferida" e "Indeferida" são terminais, mas não somem: o pedido fica arquivado com o despacho fundamentado. A renovação do 07-0830 corre contra o calendário, porque a outorga vence em 17/07; despachar antes disso evita a descontinuidade do direito.
        </Note>

        {/* disposition panel: the verbs the gestor applies to a request */}
        <Panel col={8} header={<>Despacho da solicitação <Sp /><Pill variant="label">verbos do gestor</Pill></>}>
          <Body className="list">
            <div className="lrow"><div className="lr-top"><span className="lr-title">Deferir</span><Pill variant="ok">acata o pedido</Pill></div><div className="lr-sub">Concede a renovação, ampliação, transferência, dispensa ou desativação; grava o novo estado da outorga e fecha a solicitação.</div></div>
            <div className="lrow"><div className="lr-top"><span className="lr-title">Indeferir</span><Pill variant="bad">nega com fundamento</Pill></div><div className="lr-sub">Devolve o pedido com a motivação; o outorgado pode recorrer ou protocolar novamente sanada a causa.</div></div>
            <div className="lrow"><div className="lr-top"><span className="lr-title">Pedir documento</span><Pill variant="warn">instrução pendente</Pill></div><div className="lr-sub">Suspende o prazo e exige a peça que falta (contrato, projeto, comprovação). A solicitação volta para "em análise" quando o documento chega.</div></div>
          </Body>
        </Panel>

        {/* immutable trail of dispatches */}
        <Panel col={4} header={<>Trilha de despachos <Sp /><Pill variant="label" className="mono">imutável</Pill></>}>
          <Body className="list">
            <div className="lrow"><div className="lr-sub"><span className="mono faint">06/06 11:18</span> · recebida SOL-2026-0461 (renovação · 07-0830)</div></div>
            <div className="lrow"><div className="lr-sub"><span className="mono faint">04/06 15:02</span> · documento exigido em SOL-2026-0432 (contrato de transferência)</div></div>
            <div className="lrow"><div className="lr-sub"><span className="mono faint">22/04 09:40</span> · indeferida SOL-2026-0398 (infração em curso)</div></div>
            <div className="lrow"><div className="lr-sub"><span className="mono faint">18/04 16:25</span> · deferida SOL-2026-0377 (redução · 07-1001)</div></div>
          </Body>
        </Panel>

        <Note col={12}>
          O despacho é exclusivo do gestor; ao outorgado cabe <b>solicitar</b>. Cada despacho é um ato datado e imutável na trilha, o que sustenta o devido processo, já que os prazos correm da ciência. Pedir documento não nega o pedido: suspende a contagem e formaliza o que falta na instrução. A renovação tempestiva tem efeito de silêncio positivo, então o gestor que pretende indeferir precisa fazê-lo dentro do prazo, sob pena de renovação automática.
        </Note>

      </Bento>
    </GestorShell>
  )
}
