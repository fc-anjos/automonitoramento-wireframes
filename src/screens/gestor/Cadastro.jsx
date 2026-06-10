import { Link } from 'react-router-dom'
import { GestorShell } from '../../components/shell.jsx'
import { Bento, Panel, Body, Note, Pill, Sp, DataTable } from '../../components/ui.jsx'

// The outorga registry lives in the SP-Águas outorga process, outside this
// platform; this screen mirrors it read-only via integration. The registry is
// still the unbounded object (312 outorgas in the scenario); the rows below
// are the loaded sample. DataTable adds the search / count / pager.
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
    <Pill variant="label">espelho · integração com o processo de outorga</Pill>
  </>
)

export default function Cadastro() {
  return (
    <GestorShell tag="GESTOR · 08" title="Cadastro & administração" active="cadastro" top={top}>
      <Note style={{ marginBottom: 16 }}>
        <b>O cadastro da outorga não vive nesta plataforma.</b> A outorga é emitida, renovada, revista, revogada e extinta no processo de outorga da SP-Águas; esta tela <b>espelha</b> esse cadastro por integração, em modo de leitura, e concentra o que é próprio da plataforma: os parâmetros por ponto que alimentam a reconciliação e os apontamentos, os perfis de acesso, as credenciais e a trilha de auditoria. As exceções de calendário (a vencer, dormente) continuam abertas aqui, como sinais de fiscalização; o desfecho é ato do processo de outorga e retorna pelo espelho.
      </Note>

      <Bento>

        {/* the registry is the main object, mirrored: each row carries the lifecycle state */}
        <Panel lead col={12} header={<>Cadastro de outorgas · espelho <Sp /><Pill variant="label">somente leitura · ciclo de vida no estado</Pill></>}>
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
          O <b>estado</b> corresponde à etapa do ciclo de vida da outorga, e não a um status genérico, e vem do espelho: a fonte é o cadastro mantido no processo de outorga. "A vencer" e "Dormente" são exceções dirigidas por calendário, abertas automaticamente pela reconciliação contra a própria data da outorga espelhada: a primeira chama renovação antes do vencimento; a segunda antecipa o perecimento, que opera de pleno direito após três anos de não uso. "Extinta" é o término do prazo sem pedido tempestivo de renovação, formalizado na fonte e refletido aqui. Nenhuma some por exclusão: muda de estado e fica registrada.
        </Note>

        {/* outorga acts happen in the outorga process; this panel routes, never executes */}
        <Panel col={12} header={<>Atos sobre a outorga <Sp /><Pill variant="label">fora da plataforma · refletidos pelo espelho</Pill></>}>
          <Body className="list">
            <div className="lrow">
              <div className="lr-top"><span className="lr-title">Renovação, revisão e demais alterações</span><Link className="pill" to="/gestor/solicitacoes">Fila de solicitações</Link></div>
              <div className="lr-sub">Instruídas na fila de solicitações e encaminhadas ao processo de outorga.</div>
            </div>
            <div className="lrow">
              <div className="lr-top"><span className="lr-title">Revogação por descumprimento</span><Link className="pill bad" to="/gestor/processo">Via processo sancionador</Link></div>
              <div className="lr-sub">Encaminhada a partir do processo sancionador.</div>
            </div>
            <div className="lrow">
              <div className="lr-top"><span className="lr-title">Extinção e perecimento</span><Link className="pill" to="/gestor/detalhe">Ver histórico · OUT-07-2018-009907</Link></div>
              <div className="lr-sub">Formalizados no processo de outorga; OUT-07-2018-009907 extinta por prazo vencido em 31/05.</div>
            </div>
          </Body>
        </Panel>

        <Note col={12}>
          O gestor não cria, não altera e não encerra outorga nesta plataforma; instrui, encaminha e fiscaliza. No descumprimento, é o embargo definitivo lavrado no processo sancionador que enseja a revogação. O que o sistema grava de próprio são os sinais de calendário, os encaminhamentos e a trilha, cada qual um ato datado.
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
            <tr><td className="mono faint" style={{ fontSize: 11 }}>31/05 00:00</td><td>Espelho refletiu OUT-07-2018-009907 extinta por prazo vencido</td></tr>
          </tbody></table>
        </Panel>

        <Note col={12}>
          A trilha registra <b>quem, quando e qual ato</b>, e mistura deliberadamente atos do gestor (despachos, classificação) com eventos do sistema (a abertura automática das exceções de calendário). É ela que sustenta o devido processo: como os prazos correm da ciência, a data de cada marco precisa estar gravada e ser imutável.
        </Note>

        {/* credentials: gestor acts over accounts, the modern heir of the sidecc password oficio */}
        <Panel col={7} header={<>Credenciais e acesso <Sp /><Pill variant="label">atos na trilha</Pill></>}>
          <Body className="list">
            <div className="lrow">
              <div className="lr-top"><span className="lr-title">Criar usuário</span><Pill>ato do gestor</Pill></div>
              <div className="lr-sub">Conta vinculada à outorga e ao papel; cada emissão de convite é datada na trilha.</div>
            </div>
            <div className="lrow">
              <div className="lr-top"><span className="lr-title">Convite e recuperação de conta</span></div>
              <div className="lr-sub">O uso do link é registrado na trilha e comprova o recebimento.</div>
            </div>
            <div className="lrow">
              <div className="lr-top"><span className="lr-title">Inativar usuário</span><Pill>ato do gestor</Pill></div>
              <div className="lr-sub">A conta perde o acesso; a autoria dos registros já gravados é preservada.</div>
            </div>
          </Body>
        </Panel>

        {/* telemetry credential follows the cot-r rite: experimental login precedes operational */}
        <Panel col={5} header={<>Credencial de telemetria <Sp /><Pill variant="label" className="mono">COT-R</Pill></>}>
          <Body className="list">
            <div className="lrow">
              <div className="lr-top"><span className="lr-title">07-1001 · Indústria Cubatão S/A</span><Pill variant="ok">login operacional</Pill></div>
              <div className="lr-sub">Transmite em caráter definitivo.</div>
            </div>
            <div className="lrow">
              <div className="lr-top"><span className="lr-title">07-1100 · Indústria Química Cubatão</span><Pill variant="ok">login operacional</Pill></div>
              <div className="lr-sub">Transmite em caráter definitivo; o auto de infração não suspende a credencial.</div>
            </div>
            <div className="lrow">
              <div className="lr-top"><span className="lr-title">07-1042 · Petroquímica Baixada S/A</span><Pill variant="warn">login experimental</Pill></div>
              <div className="lr-sub">Transmissão em teste, validada contra as leituras locais.</div>
            </div>
          </Body>
        </Panel>

        <Note col={12}>
          Criação e inativação de usuários são <b>atos do gestor</b>, datados na trilha de auditoria como qualquer despacho. O mecanismo de autenticação (convite por e-mail, recuperação de conta ou gov.br) é <b>decisão a explicitar no TR</b>, não a omitir: o equivalente moderno pode superar o desenho do SiDeCC (ofício de senha, prazo, AR, reenvio), mas a escolha precisa estar escrita. Para os usuários de telemetria, a credencial segue o rito do COT-R: é criada como <b>login experimental</b> e só passa a <b>login operacional</b>, por ato do gestor, após a validação da transmissão.
        </Note>

      </Bento>
    </GestorShell>
  )
}
