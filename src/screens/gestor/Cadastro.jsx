import { Link } from 'react-router-dom'
import { GestorShell } from '../../components/shell.jsx'
import { Bento, Panel, Body, Note, Pill, Btn, Sp, DataTable } from '../../components/ui.jsx'

// The registry is the unbounded object (312 outorgas in the scenario); the rows
// below are the loaded sample. DataTable adds the search / count / pager the
// static sketch lacked.
const OUTORGAS = [
  { id: 'OUT-07-2024-001234', outorgado: 'Indústria Cubatão S/A', forma: 'Autorização', faixa: 'A', faixaVar: 'act', mon: 'Telemetria', validade: '12/03/2029', estado: 'Vigente', estadoVar: 'ok', acao: 'Abrir', to: '/gestor/detalhe' },
  { id: 'OUT-07-2022-008301', outorgado: 'Serviço de Águas de Praia Grande', forma: 'Concessão', faixa: 'B', mon: 'Autodeclaração', validade: '17/07/2026', estado: 'A vencer · 40 dias', estadoVar: 'warn', acao: 'Triar renovação', to: '/gestor/apontamento' },
  { id: 'OUT-07-2019-004551', outorgado: 'Indústria Têxtil Mongaguá', forma: 'Autorização', faixa: 'C', mon: 'Autodeclaração', validade: '08/2027', estado: 'Dormente · sem uso ~24 m', estadoVar: 'warn', acao: 'Confirmar uso', to: '/gestor/apontamento' },
  { id: 'OUT-07-2021-007121', outorgado: 'Laticínios Itanhaém', forma: 'Autorização', faixa: 'B', mon: 'Autodeclaração', validade: '19/09/2026', estado: 'Condicionante pendente', estadoVar: 'warn', acao: 'Abrir', to: '/gestor/apontamento' },
  { id: 'OUT-07-2023-011001', outorgado: 'Indústria Química Cubatão', forma: 'Autorização', faixa: 'A', faixaVar: 'act', mon: 'Telemetria', validade: '05/2028', estado: 'Sob auto de infração', estadoVar: 'bad', acao: 'Abrir processo', to: '/gestor/apontamento' },
  { id: 'OUT-07-2018-009907', outorgado: 'Sítio Recanto · São Vicente', forma: 'Autorização', faixa: 'C', mon: 'Autodeclaração', validade: '31/05/2023', estado: 'Extinta · prazo vencido', acao: 'Ver histórico', to: '/gestor/detalhe' },
]

const OUTORGA_COLS = [
  { key: 'id', label: 'Outorga', cls: 'mono' },
  { key: 'outorgado', label: 'Outorgado' },
  { key: 'forma', label: 'Forma' },
  { key: 'faixa', label: 'Faixa', render: (r) => <Pill variant={r.faixaVar}>{r.faixa}</Pill> },
  { key: 'mon', label: 'Monitoramento' },
  { key: 'validade', label: 'Validade', num: true },
  { key: 'estado', label: 'Estado', render: (r) => <Pill variant={r.estadoVar}>{r.estado}</Pill> },
  { key: 'acao', label: 'Ação do gestor', render: (r) => <Link className="pill" to={r.to}>{r.acao}</Link> },
]

const top = (
  <>
    <div className="crumb">Dados / <b style={{ color: 'var(--ink)' }}>Cadastro & admin</b></div>
    <span className="sp" />
    <div className="input search" style={{ minHeight: 36 }}><span className="faint">Buscar outorga / outorgado…</span></div>
    <Btn sub style={{ padding: '6px 12px' }}>+ Outorga</Btn>
  </>
)

export default function Cadastro() {
  return (
    <GestorShell tag="GESTOR · 06" title="Cadastro & administração" active="cadastro" top={top}>
      <Note style={{ marginBottom: 16 }}>
        <b>Registro, ciclo de vida e governança.</b> A outorga é uma licença com prazo: nasce no cadastro, vence, pode ser renovada, revista, revogada, e extingue-se ou perece sozinha por desuso. Esta tela concentra esse ciclo de vida do lado do gestor: o cadastro das outorgas, a fila de solicitações do outorgado (renovação, redução, transferência, desativação) que o gestor defere ou indefere, e a trilha de auditoria. Outorga não é apagada: ao encerrar, muda de estado e preserva o histórico. Os verbos de disposição (deferir, revisar, revogar) são exclusivos do gestor; o outorgado apenas solicita.
      </Note>

      <Bento>

        {/* the registry is the main object: each row carries the lifecycle state */}
        <Panel lead col={12} header={<>Outorgas cadastradas <Sp /><Pill variant="label">ciclo de vida no estado</Pill></>}>
          <DataTable
            columns={OUTORGA_COLS}
            rows={OUTORGAS}
            search={['id', 'outorgado', 'forma', 'estado']}
            searchPlaceholder="Buscar outorga / outorgado / estado…"
            universe={312}
            pageSize={5}
            empty="Nenhuma outorga corresponde à busca."
          />
        </Panel>

        <Note col={12}>
          O <b>estado</b> é a vida da outorga, não um status genérico. "A vencer" e "Dormente" são exceções dirigidas por calendário, abertas automaticamente pela reconciliação contra a própria data da outorga: a primeira chama renovação antes do vencimento; a segunda antecipa o perecimento, que opera de pleno direito após três anos de não uso. "Extinta" é o término do prazo sem pedido tempestivo de renovação. Nenhuma some por exclusão: muda de estado e fica registrada.
        </Note>

        {/* solicitações: the gestor's CRUD verb over outorgado requests (defer/indefer) */}
        <Panel col={8} header={<>Solicitações do outorgado <Sp /><Pill variant="label">a despachar</Pill></>}>
          <table className="table">
            <thead><tr><th>Protocolo</th><th>Outorga / outorgado</th><th>Tipo</th><th className="num">Recebida</th><th>Situação</th><th>Despacho</th></tr></thead>
            <tbody>
              <tr>
                <td className="mono">SOL-2026-0461</td><td>07-0830 · Serviço de Águas de Praia Grande</td>
                <td>Renovação</td><td className="num">02/06</td>
                <td><Pill variant="warn">Em análise</Pill></td>
                <td><Link className="pill ok" to="/gestor/apontamento">Deferir</Link> <Link className="pill bad" to="/gestor/apontamento">Indeferir</Link></td>
              </tr>
              <tr>
                <td className="mono">SOL-2026-0448</td><td>07-1001 · Indústria Cubatão S/A</td>
                <td>Redução de vazão</td><td className="num">28/05</td>
                <td><Pill variant="warn">Em análise</Pill></td>
                <td><Link className="pill ok" to="/gestor/apontamento">Deferir</Link> <Link className="pill bad" to="/gestor/apontamento">Indeferir</Link></td>
              </tr>
              <tr>
                <td className="mono">SOL-2026-0432</td><td>07-0455 · Indústria Têxtil Mongaguá</td>
                <td>Desativação</td><td className="num">22/05</td>
                <td><Pill variant="warn">Aguardando comprovação</Pill></td>
                <td><Link className="pill" to="/gestor/apontamento">Exigir relatório</Link></td>
              </tr>
              <tr>
                <td className="mono">SOL-2026-0410</td><td>07-1042 · Petroquímica Baixada S/A</td>
                <td>Transferência de titularidade</td><td className="num">15/05</td>
                <td><Pill variant="ok">Deferida</Pill></td>
                <td><Link className="pill" to="/gestor/detalhe">Ver</Link></td>
              </tr>
            </tbody>
          </table>
        </Panel>

        {/* disposition panel: the lifecycle verbs the gestor can apply to a registry record */}
        <Panel col={4} header={<>Disposição da outorga <Sp /><Pill variant="label">verbos do gestor</Pill></>}>
          <Body className="list">
            <div className="lrow"><div className="lr-top"><span className="lr-title">Renovar</span><Pill>5 / 10 anos</Pill></div><div className="lr-sub">Defere a continuidade; preserva características técnicas e nova validade.</div></div>
            <div className="lrow"><div className="lr-top"><span className="lr-title">Revisar</span><Pill>a qualquer tempo</Pill></div><div className="lr-sub">Ajusta limites ou condicionantes do registro vigente.</div></div>
            <div className="lrow"><div className="lr-top"><span className="lr-title">Revogar</span><Pill variant="bad">por descumprimento</Pill></div><div className="lr-sub">Encerra por infração ou interesse público; não apaga, inativa.</div></div>
            <div className="lrow"><div className="lr-top"><span className="lr-title">Declarar extinta</span><Pill>prazo vencido</Pill></div><div className="lr-sub">Término sem renovação tempestiva; estado terminal com histórico.</div></div>
            <div className="lrow"><div className="lr-top"><span className="lr-title">Reconhecer perecimento</span><Pill variant="warn">3 anos sem uso</Pill></div><div className="lr-sub">A dormente caduca de pleno direito; o gestor formaliza a baixa.</div></div>
          </Body>
        </Panel>

        <Note col={12}>
          O gestor pode tudo o que muda a vida do registro; o outorgado só pode <b>solicitar</b>. Deferir uma renovação grava nova validade e fecha a exceção "a vencer"; indeferir devolve o pedido com fundamento. A desativação fecha quando o outorgado comprova a remoção dos equipamentos, por isso a situação fica "aguardando comprovação", não deferida de imediato. Cada despacho é um ato datado na trilha.
        </Note>

        {/* users & roles: kept, narrowed to the role-asymmetry the firewall cares about */}
        <Panel col={6} header={<>Perfis de acesso <Sp /><Pill variant="label">por papel</Pill></>}>
          <table className="table"><tbody>
            <tr><td><b style={{ color: 'var(--ink)' }}>Gestor · SP-Águas</b><div className="muted" style={{ fontSize: 11.5 }}>defere, revisa, revoga, autua</div></td><td className="num"><Pill>4 contas</Pill></td></tr>
            <tr><td><b style={{ color: 'var(--ink)' }}>Analista de dados</b><div className="muted" style={{ fontSize: 11.5 }}>ingestão · consistência · sem disposição</div></td><td className="num"><Pill>6 contas</Pill></td></tr>
            <tr><td><b style={{ color: 'var(--ink)' }}>Outorgado (app)</b><div className="muted" style={{ fontSize: 11.5 }}>própria outorga · solicita, não despacha</div></td><td className="num"><Pill>312 contas</Pill></td></tr>
            <tr><td><b style={{ color: 'var(--ink)' }}>Leitura pública</b><div className="muted" style={{ fontSize: 11.5 }}>portal de transparência</div></td><td className="num"><Pill>aberto</Pill></td></tr>
          </tbody></table>
        </Panel>

        {/* immutable audit trail: who, when, which act */}
        <Panel col={6} header={<>Trilha de auditoria <Sp /><Pill variant="label" className="mono">imutável</Pill></>}>
          <table className="table"><tbody>
            <tr><td className="mono faint" style={{ fontSize: 11 }}>06/06 11:18</td><td>Gestor M. Souza recebeu SOL-2026-0461 (renovação · 07-0830)</td></tr>
            <tr><td className="mono faint" style={{ fontSize: 11 }}>05/06 16:40</td><td>Gestor classificou 07-1100 como gravíssima e lavrou auto</td></tr>
            <tr><td className="mono faint" style={{ fontSize: 11 }}>04/06 14:05</td><td>Sistema sinalizou 07-0830 a vencer (renovar até 17/07)</td></tr>
            <tr><td className="mono faint" style={{ fontSize: 11 }}>03/06 09:30</td><td>Sistema sinalizou 07-0455 dormente (sem uso ~24 meses)</td></tr>
            <tr><td className="mono faint" style={{ fontSize: 11 }}>31/05 00:00</td><td>OUT-07-2018-009907 declarada extinta por prazo vencido</td></tr>
          </tbody></table>
        </Panel>

        <Note col={12}>
          A trilha registra <b>quem, quando e qual ato</b>, e mistura deliberadamente atos do gestor (despachos, classificação) com eventos do sistema (a abertura automática das exceções de calendário). É ela que sustenta o devido processo: como os prazos correm da ciência, a data de cada marco precisa estar gravada e ser imutável.
        </Note>

      </Bento>
    </GestorShell>
  )
}
