import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GestorShell } from '../../components/shell.jsx'
import {
  Bento, Card, Panel, Body, Note, Pill, Btn, Row, Sp, Tabs, DataTable, Grid,
} from '../../components/ui.jsx'

// ---- tab keys ---------------------------------------------------------------
const TAB_KEYS = ['identidade', 'medicao', 'telemetria', 'medidores', 'declaracao', 'apontamentos']
const TABS = [
  { key: 'identidade',    label: 'Identidade' },
  { key: 'medicao',       label: 'Medição e volumes' },
  { key: 'telemetria',    label: 'Telemetria' },
  { key: 'medidores',     label: 'Medidores' },
  { key: 'declaracao',    label: 'Declaração' },
  { key: 'apontamentos',  label: 'Apontamentos' },
]

// ---- sample data ------------------------------------------------------------

const MEDIDORES = [
  { id: 'SDC-R-4471', serie: 'SDC-R-4471', fab: 'Hidrotec · HT-300 (eletromagnético)', diam: 'DN 150', inclusao: '12/03/2024', desativacao: '–', sucessao: '–', estado: 'Ativo',      estadoVar: 'ok'    },
  { id: 'SDC-R-4472', serie: 'SDC-R-4472', fab: 'Hidrotec · HT-300 (eletromagnético)', diam: 'DN 100', inclusao: '12/03/2024', desativacao: '–', sucessao: '–', estado: 'Ativo',      estadoVar: 'ok'    },
  { id: 'SDC-3198',   serie: 'SDC-3198',   fab: 'Medix · M-200 (hidrômetro)',           diam: 'DN 150', inclusao: '03/02/2019', desativacao: '12/03/2024', sucessao: 'SDC-R-4471', estado: 'Desativado', estadoVar: '' },
]

const MEDIDOR_COLS = [
  { key: 'serie',      label: 'Nº de série',        render: (r) => <span className="mono">{r.serie}</span> },
  { key: 'fab',        label: 'Fabricante / modelo' },
  { key: 'diam',       label: 'Diâmetro',  num: true },
  { key: 'inclusao',   label: 'Inclusão',  num: true },
  { key: 'desativacao',label: 'Desativação', num: true },
  { key: 'sucessao',   label: 'Substitui (vínculo)', render: (r) => r.sucessao === '–' ? <span className="faint">–</span> : <span className="mono">{r.sucessao}</span> },
  { key: 'estado',     label: 'Estado', render: (r) => <Pill variant={r.estadoVar}>{r.estado}</Pill> },
]

const DECLARACOES = [
  { id: 'DEC-0612-01', data: '09/06/2026 07:14', protocolo: 'PROT-20260609-4471', medidor: 'SDC-R-4471', leitura: '726.210', tipo: 'Leitura de rotina',    status: 'Registrado' },
  { id: 'DEC-0612-02', data: '09/06/2026 07:14', protocolo: 'PROT-20260609-4472', medidor: 'SDC-R-4472', leitura: '318.040', tipo: 'Leitura de rotina',    status: 'Registrado' },
  { id: 'DEC-0608-01', data: '08/06/2026 07:10', protocolo: 'PROT-20260608-4471', medidor: 'SDC-R-4471', leitura: '723.270', tipo: 'Leitura de rotina',    status: 'Registrado' },
  { id: 'DEC-0608-02', data: '08/06/2026 07:10', protocolo: 'PROT-20260608-4472', medidor: 'SDC-R-4472', leitura: '317.210', tipo: 'Leitura de rotina',    status: 'Registrado' },
  { id: 'DEC-0604-MA', data: '04/06/2026 12:00', protocolo: 'PROT-20260604-MA',   medidor: 'SDC-R-4471', leitura: '718.100', tipo: 'Medição alternativa',  status: 'Registrado' },
]

const DECL_COLS = [
  { key: 'data',      label: 'Data / hora da leitura' },
  { key: 'protocolo', label: 'Protocolo', render: (r) => <span className="mono" style={{ fontSize: 11 }}>{r.protocolo}</span> },
  { key: 'medidor',   label: 'Medidor',   render: (r) => <span className="mono">{r.medidor}</span> },
  { key: 'leitura',   label: 'Leitura', num: true, render: (r) => <span className="mono">{r.leitura}</span> },
  { key: 'tipo',      label: 'Tipo de declaração' },
  { key: 'status',    label: 'Status', render: (r) => <Pill variant="ok">{r.status}</Pill> },
]

const APONTAMENTOS = [
  { id: 'AP-1001-A', titulo: 'Pico de vazão acima do teto', natureza: 'Exceção', tipo: 'Volume', grau: 'grave', grauVar: 'warn', fase: 'Notificada', data: '04/06', prazo: 'Justificativa até 25/06' },
  { id: 'AP-1001-B', titulo: 'Volume anual em risco',       natureza: 'Sinal de gestão', tipo: 'Volume', grau: '–', grauVar: '', fase: '–', data: 'desde jun', prazo: 'Acompanhar' },
  { id: 'AP-1001-C', titulo: 'Amostra isolada ausente',     natureza: 'Exceção', tipo: 'Calendário', grau: 'leve', grauVar: 'ok', fase: 'Encerrada', data: '03/06', prazo: 'Nenhuma' },
]

const APONT_COLS = [
  { key: 'id',       label: 'Protocolo',       render: (r) => <Link to="/gestor/apontamento" className="mono" style={{ color: 'var(--ink)' }}>{r.id}</Link> },
  { key: 'titulo',   label: 'Título' },
  { key: 'natureza', label: 'Natureza',  render: (r) => <Pill variant={r.natureza === 'Exceção' ? 'warn' : 'label'}>{r.natureza}</Pill> },
  { key: 'tipo',     label: 'Tipo' },
  { key: 'grau',     label: 'Grau',     render: (r) => r.grau === '–' ? <span className="faint">–</span> : <Pill variant={r.grauVar}>{r.grau}</Pill> },
  { key: 'fase',     label: 'Fase',     render: (r) => r.fase === '–' ? <span className="faint">–</span> : r.fase },
  { key: 'data',     label: 'Detectado' },
  { key: 'prazo',    label: 'Próxima ação' },
]

// ---- top bar ----------------------------------------------------------------
const top = (
  <>
    <div className="crumb">
      <Link to="/gestor/mapa">Pontos</Link> / <Link to="/gestor/pontos">Indústria Cubatão S/A</Link> / <b style={{ color: 'var(--ink)' }}>07-1001</b>
    </div>
    <span className="sp" />
    <Pill variant="warn">Exceção · grau grave</Pill>
    <Pill variant="label">Sinal de gestão</Pill>
    <Btn sub style={{ padding: '6px 12px' }}>Exportar</Btn>
  </>
)

// ---- screen -----------------------------------------------------------------
export default function Detalhe() {
  const [tab, setTab] = useState('identidade')
  const navigate = useNavigate()

  return (
    <GestorShell tag="GESTOR · 04" title="Detalhe do ponto / outorgado" active="pontos" top={top}>

      {/* identity header, always visible above the tabs */}
      <Card col={12} style={{ marginBottom: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
        <Row style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div className="eyebrow">Ponto de captação · 07-1001</div>
            <h1 style={{ marginTop: 6 }}>Indústria Cubatão S/A</h1>
            <div className="muted" style={{ marginTop: 4 }}>Polo industrial de Cubatão · Rio Cubatão</div>
          </div>
          <Row style={{ gap: 8 }}>
            <Pill variant="act">Faixa A</Pill>
            <Pill>Telemetria</Pill>
          </Row>
        </Row>
        <hr className="div" />
        <Tabs tabs={TABS} active={tab} onSelect={setTab} />
      </Card>

      {/* ---- TAB: Identidade ------------------------------------------------ */}
      {tab === 'identidade' && (
        <Bento>
          <Panel col={12} header={<>Cadastro espelhado do SOE <Sp /><Pill variant="label">Origem: SOE</Pill></>}>
            <Body>
              <div className="grid g-4">
                <div><div className="muted" style={{ fontSize: 11 }}>Nº da outorga</div><div className="mono" style={{ color: 'var(--ink)' }}>OUT-07-2024-001234</div></div>
                <div><div className="muted" style={{ fontSize: 11 }}>ID de origem</div><div className="mono" style={{ color: 'var(--ink)' }}>SDC-998877 · Origem: SOE</div></div>
                <div><div className="muted" style={{ fontSize: 11 }}>Forma</div><div className="mono" style={{ color: 'var(--ink)' }}>Autorização</div></div>
                <div><div className="muted" style={{ fontSize: 11 }}>Finalidade</div><div className="mono" style={{ color: 'var(--ink)' }}>Industrial</div></div>
                <div><div className="muted" style={{ fontSize: 11 }}>Fonte hídrica</div><div className="mono" style={{ color: 'var(--ink)' }}>Superficial</div></div>
                <div><div className="muted" style={{ fontSize: 11 }}>Município</div><div className="mono" style={{ color: 'var(--ink)' }}>Cubatão</div></div>
                <div><div className="muted" style={{ fontSize: 11 }}>Coordenadas</div><div className="mono" style={{ color: 'var(--ink)' }}>−23.879, −46.418</div></div>
                <div><div className="muted" style={{ fontSize: 11 }}>Validade da outorga</div><div className="mono" style={{ color: 'var(--ink)' }}>12/03/2024 – 11/03/2029</div></div>
                <div><div className="muted" style={{ fontSize: 11 }}>Estado do ciclo</div><div><Pill variant="ok">Vigente</Pill></div></div>
                <div><div className="muted" style={{ fontSize: 11 }}>VM outorgado</div><div className="mono" style={{ color: 'var(--ink)' }}>104.000 m³/mês</div></div>
                <div><div className="muted" style={{ fontSize: 11 }}>Volume diário máx.</div><div className="mono" style={{ color: 'var(--ink)' }}>3.425 m³/dia</div></div>
                <div><div className="muted" style={{ fontSize: 11 }}>Vazão máx. instantânea</div><div className="mono" style={{ color: 'var(--ink)' }}>45 L/s</div></div>
              </div>
              <Note style={{ fontSize: 12, marginTop: 14 }}>
                O cadastro deste ponto é lido do <b>SOE</b> (Sistema de Outorga Eletrônica), onde a outorga tem origem. O campo "Origem: SOE" é o vínculo de espelhamento: este sistema não emite outorgas, apenas as reflete para fins de fiscalização. O <b>estado do ciclo</b> registra o momento da outorga (Vigente; demais possibilidades: Renovação, Revisão, Revogação, Extinção, Perecimento, Transferência).
              </Note>
            </Body>
          </Panel>

          {/* cross-link: other captacoes of the same outorgado */}
          <Panel col={12} header={<>Outras captações deste outorgado <Sp /><Pill variant="label">mesma titularidade</Pill></>}>
            <Body>
              <table className="table">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Fonte</th>
                    <th>Finalidade</th>
                    <th>Município</th>
                    <th>Faixa</th>
                    <th>Situação</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><Link to="/gestor/detalhe" style={{ color: 'var(--ink)' }}><b className="mono">07-1001</b></Link></td>
                    <td>Superficial · Rio Cubatão</td>
                    <td>Industrial</td>
                    <td>Cubatão</td>
                    <td><Pill variant="act">A</Pill></td>
                    <td><Pill variant="warn">Exceção aberta</Pill></td>
                  </tr>
                  <tr>
                    <td><Link to="/gestor/detalhe" style={{ color: 'var(--ink)' }}><b className="mono">07-1003</b></Link></td>
                    <td>Superficial · Rio Cubatão</td>
                    <td>Industrial</td>
                    <td>Cubatão</td>
                    <td><Pill>B</Pill></td>
                    <td><Pill variant="ok">Conforme</Pill></td>
                  </tr>
                </tbody>
              </table>
              <Note style={{ fontSize: 12, marginTop: 12 }}>
                O <b>outorgado</b> é o titular e pode deter mais de um ponto. A situação é do ponto, não do titular: 07-1001 tem exceção aberta; 07-1003 está conforme. Clicar num código abre o detalhe daquele ponto.
              </Note>
            </Body>
          </Panel>
        </Bento>
      )}

      {/* ---- TAB: Medicao e volumes ----------------------------------------- */}
      {tab === 'medicao' && (
        <Bento>
          <Panel col={12} header={<>Estado de Vazão e limites <Sp /><Pill variant="warn">SEM RESTRIÇÃO</Pill><Pill variant="label">Estado de Vazão</Pill></>}>
            <Body>
              <table className="table">
                <thead>
                  <tr>
                    <th>Dimensão</th>
                    <th className="num">Captado (medido)</th>
                    <th className="num">Outorgado</th>
                    <th className="num">Permitido</th>
                    <th>Reconciliação</th>
                    <th>Situação</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Vazão máx. instantânea</td>
                    <td className="num mono">pico 53 L/s</td>
                    <td className="num mono">45 L/s</td>
                    <td className="num faint">–</td>
                    <td>contra Outorgado · 118%</td>
                    <td><Pill variant="warn">Exceção</Pill></td>
                  </tr>
                  <tr>
                    <td>Volume diário</td>
                    <td className="num mono">3.180 m³/dia</td>
                    <td className="num mono">3.425 m³/dia</td>
                    <td className="num faint">–</td>
                    <td>contra Outorgado · 93%</td>
                    <td><Pill variant="ok">Conforme</Pill></td>
                  </tr>
                  <tr>
                    <td>Volume mensal</td>
                    <td className="num mono">110.200 m³</td>
                    <td className="num mono">104.000 m³/mês</td>
                    <td className="num faint">–</td>
                    <td>contra Outorgado · 106%</td>
                    <td><Pill variant="warn">Exceção</Pill></td>
                  </tr>
                  <tr>
                    <td>Volume anual</td>
                    <td className="num mono">projeção 116%</td>
                    <td className="num mono">1.250.000 m³/ano</td>
                    <td className="num faint">–</td>
                    <td>tendência acima do ritmo</td>
                    <td><Pill variant="warn">Sinal de gestão</Pill></td>
                  </tr>
                </tbody>
              </table>
              <Note style={{ fontSize: 12, margin: 14 }}>
                O <b>Estado de Vazão</b> atual é <b>SEM RESTRIÇÃO</b>: não há regra de estiagem ou conflito de uso vigente, de modo que a reconciliação corre contra o <b>Outorgado</b>. Quando houver restrição vigente, a coluna <b>Permitido</b> recebe o limite da regra (que pode situar-se abaixo do Outorgado) e a reconciliação passa a correr contra ele. As duas situações possíveis são: SEM RESTRIÇÃO (sem regra vigente) e <b>sob regra de restrição</b> (Portaria específica, com Permitido ativo). O Estado de Vazão é atributo do SiDeCC-R.
              </Note>
            </Body>
          </Panel>

          <Panel col={12} header={<>Série histórica · Captado × Outorgado × Permitido <Sp /><Pill variant="label">últimos 30 dias</Pill></>}>
            <Body>
              <table className="table">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th className="num">Captado (m³)</th>
                    <th className="num">Horas de captação</th>
                    <th>Estado de Vazão</th>
                    <th>Dentro dos limites?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>09/06/2026</td><td className="num mono">3.140</td><td className="num mono">24 h</td><td><Pill variant="ok">SEM RESTRIÇÃO</Pill></td><td><Pill variant="ok">Sim</Pill></td></tr>
                  <tr><td>08/06/2026</td><td className="num mono">3.060</td><td className="num mono">24 h</td><td><Pill variant="ok">SEM RESTRIÇÃO</Pill></td><td><Pill variant="ok">Sim</Pill></td></tr>
                  <tr><td>04/06/2026</td><td className="num mono">3.180</td><td className="num mono">24 h</td><td><Pill variant="ok">SEM RESTRIÇÃO</Pill></td><td><Pill variant="warn">Pico 53 L/s</Pill></td></tr>
                  <tr><td>03/06/2026</td><td className="num mono">3.010</td><td className="num mono">24 h</td><td><Pill variant="ok">SEM RESTRIÇÃO</Pill></td><td><Pill variant="ok">Sim</Pill></td></tr>
                </tbody>
              </table>
              <Note style={{ fontSize: 12, marginTop: 12 }}>
                A série exibida é o <b>agregado da captação</b>: soma dos medidores ativos (SDC-R-4471 + SDC-R-4472), com decomposição por aparelho disponível no detalhe hora a hora. O <b>Permitido</b> só aparece quando o Estado de Vazão for <b>sob regra de restrição</b>; neste caso o Permitido ficaria abaixo do Outorgado e a coluna seria preenchida com o limite vigente. Fonte: SiDeCC-R.
              </Note>
            </Body>
          </Panel>
        </Bento>
      )}

      {/* ---- TAB: Telemetria ------------------------------------------------ */}
      {tab === 'telemetria' && (
        <Bento>
          <Panel col={8} header={<>Situação da transmissão <Sp /><Pill variant="ok">EM DIA</Pill></>}>
            <Body>
              <table className="table">
                <tbody>
                  <tr><td>Amostras esperadas (30 d)</td><td className="num mono">8.640</td></tr>
                  <tr><td>Amostras recebidas (30 d)</td><td className="num mono">8.519</td></tr>
                  <tr><td>Em dia</td><td className="num mono">8.400</td></tr>
                  <tr><td>Em tolerância (atrasadas)</td><td className="num mono">119</td></tr>
                  <tr><td>Fora da tolerância</td><td className="num mono">121 · 1,4%</td></tr>
                  <tr><td>Situação da transmissão</td><td className="num"><Pill variant="ok">EM DIA</Pill></td></tr>
                  <tr><td>Tolerância vigente (SP-Águas)</td><td className="num mono">≤ 5,0%</td></tr>
                </tbody>
              </table>
              <Note style={{ fontSize: 12, marginTop: 12 }}>
                A <b>Situação da Transmissão</b> é um dos três estados definidos no SiDeCC-R: <b>EM DIA</b> (dentro do prazo), <b>EM TOLERÂNCIA</b> (atrasado mas dentro da margem), <b>FORA DA TOLERÂNCIA</b> (acima da margem, abre exceção de falha de transmissão). O indicador de 1,4% de falhas é calculado como recebidas / esperadas no passo de 5 minutos. A lacuna de 04/06 foi suprida por declaração manual de contingência e está retificada.
              </Note>
            </Body>
          </Panel>

          <Panel col={4} header={<>Credencial COT-R <Sp /><Pill variant="label">este ponto</Pill></>}>
            <Body>
              <table className="table">
                <tbody>
                  <tr><td>Tipo de credencial</td><td><Pill variant="ok">operacional</Pill></td></tr>
                  <tr><td>Login</td><td className="mono" style={{ fontSize: 11 }}>sideccr.07-1001</td></tr>
                  <tr><td>COT-R emitido em</td><td className="mono">12/03/2024</td></tr>
                  <tr><td>Emitido por</td><td className="mono">Diretor de Bacia · DRJ-7</td></tr>
                  <tr><td>Termo de Opção</td><td className="mono">assinado 03/02/2024</td></tr>
                </tbody>
              </table>
              <Row style={{ marginTop: 10, gap: 8 }}>
                <Btn sub style={{ padding: '6px 12px' }}>Redefinir credencial</Btn>
              </Row>
              <Note style={{ fontSize: 12, marginTop: 12 }}>
                O <b>COT-R</b> (Comunicado de Orientação para Transmissão Remota) é o ato pelo qual o Diretor de Bacia habilita o ponto ao SiDeCC-R, com os parâmetros de transmissão. A adesão exige Termo de Opção e Compromisso prévio (Portaria 6.987/2018, art. 5º). A credencial evolui de <b>login experimental</b> (fase de homologação) para <b>operacional</b> (transmissão em produção). A credencial fica aninhada ao ponto, não é tela autônoma.
              </Note>
            </Body>
          </Panel>

          <Panel col={12} header={<>Histórico de amostras recentes <Sp /><Pill variant="label">passo 5 min</Pill></>}>
            <table className="table">
              <thead>
                <tr><th>Data / hora</th><th className="num">Vol. acum. (m³)</th><th className="num">Vazão (L/s)</th><th>Estado da amostra</th></tr>
              </thead>
              <tbody>
                <tr><td className="mono">04/06 09:35</td><td className="num mono">725.040</td><td className="num mono">37,0</td><td><Pill variant="ok">Consolidado</Pill></td></tr>
                <tr><td className="mono">04/06 08:20</td><td className="num mono">723.900</td><td className="num mono">53,0</td><td><Pill variant="warn">Pico acima do teto</Pill></td></tr>
                <tr><td className="mono">04/06 03:35</td><td className="num mono">722.700</td><td className="num mono">38,4</td><td><Pill variant="ok">Consolidado</Pill></td></tr>
                <tr><td className="mono">03/06 21:35</td><td className="num mono">721.520</td><td className="num mono">36,1</td><td><Pill variant="ok">Consolidado</Pill></td></tr>
              </tbody>
            </table>
            <Note style={{ fontSize: 12, margin: 14 }}>
              O volume acumulado é a leitura do totalizador; a vazão é instantânea no momento da amostra. A <b>ausência de amostra</b> é sinalizada por medidor, não pelo ponto: se um dos dois medidores ativos parar de transmitir, a falha aparece na aba Medidores e na aba Apontamentos, preservando a série do outro.
            </Note>
          </Panel>
        </Bento>
      )}

      {/* ---- TAB: Medidores ------------------------------------------------- */}
      {tab === 'medidores' && (
        <Bento>
          <Panel lead col={12} header={<>Medidores da captação <Sp /><Pill variant="ok">2 ativos</Pill><Pill>1 desativado</Pill></>}>
            <DataTable
              columns={MEDIDOR_COLS}
              rows={MEDIDORES}
              search={['serie', 'fab', 'diam', 'estado']}
              searchPlaceholder="Buscar série / fabricante…"
              pageSize={6}
              empty="Nenhum medidor encontrado."
            />
            <Note style={{ fontSize: 12, margin: 14 }}>
              Uma captação pode ter <b>mais de um medidor</b> ativo simultaneamente. Cada equipamento tem número de série, fabricante, modelo, diâmetro e datas de inclusão e desativação. O campo "Substitui" registra qual medidor o novo substituiu, e a série de volumes da captação segue contínua. Desativar muda o estado do medidor e preserva o histórico de leituras. O cadastro e a troca entram como solicitações do outorgado, no aplicativo; o gestor confere e defere na fila de Solicitações.
            </Note>
          </Panel>
        </Bento>
      )}

      {/* ---- TAB: Declaracao ------------------------------------------------ */}
      {tab === 'declaracao' && (
        <Bento>
          <Panel col={5} header={<>Frequências de declaração <Sp /><Pill variant="act">Diária · vigente</Pill></>}>
            <Body>
              <table className="table">
                <thead>
                  <tr><th>Frequência</th><th className="num">VM de referência</th><th className="num">Início</th><th className="num">Fim</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Diária</td>
                    <td className="num mono">{'>'}25.920 m³/mês (Faixa A)</td>
                    <td className="num mono">12/03/2024</td>
                    <td className="num"><Pill variant="ok">vigente</Pill></td>
                  </tr>
                  <tr>
                    <td>Semanal</td>
                    <td className="num mono">5.040 – 25.920 m³/mês</td>
                    <td className="num mono">03/02/2019</td>
                    <td className="num mono">12/03/2024</td>
                  </tr>
                  <tr>
                    <td>Mensal</td>
                    <td className="num mono">≤ 5.040 m³/mês</td>
                    <td className="num mono">14/06/2016</td>
                    <td className="num mono">03/02/2019</td>
                  </tr>
                </tbody>
              </table>
              <Row style={{ marginTop: 10 }}>
                <Btn sub style={{ padding: '6px 12px' }}>Alterar frequência</Btn>
              </Row>
              <Note style={{ fontSize: 12, marginTop: 12 }}>
                A frequência é derivada da <b>faixa de VM outorgado</b> (Portaria 5.579/2018, art. 5º; IT-DPO 15/2018): diária para captação superficial com VM acima de 25.920 m³/mês; semanal de 5.040 a 25.920; mensal até 5.040. Alterar é <b>verbo do gestor</b>, datado na trilha: encerra a vigência anterior e abre a nova. Em falha de transmissão prolongada, o ponto declara manualmente nesta frequência, como contingência.
              </Note>
            </Body>
          </Panel>

          <Panel col={7} header={<>Tipos de Declaração <Sp /><Pill variant="label">SiDeCC</Pill></>}>
            <Body>
              <table className="table">
                <thead>
                  <tr><th>Tipo</th><th>Uso</th></tr>
                </thead>
                <tbody>
                  <tr><td>Leitura de rotina</td><td>Declaração periódica normal, na frequência do ponto</td></tr>
                  <tr><td>Leitura ao remover equipamento</td><td>Leitura final antes da retirada do medidor; encerra a série do aparelho</td></tr>
                  <tr><td>Leitura ao reinstalar equipamento</td><td>Leitura inicial ao colocar o novo medidor; abre a série do substituto</td></tr>
                  <tr><td>Medição alternativa (volume)</td><td>Volume estimado por método alternativo quando o medidor está inoperante</td></tr>
                </tbody>
              </table>
              <Note style={{ fontSize: 12, marginTop: 12 }}>
                O campo <b>Medidor Zerado</b> na declaração de rotina indica que o totalizador reiniciou a contagem naquele ciclo, permitindo que o sistema calcule o volume correto sem interpretar o retorno a zero como leitura negativa.
              </Note>
            </Body>
          </Panel>

          <Panel lead col={12} header={<>Declarações recentes <Sp /><Pill variant="label">status Registrado</Pill></>}>
            <DataTable
              columns={DECL_COLS}
              rows={DECLARACOES}
              search={['medidor', 'protocolo', 'tipo', 'status']}
              searchPlaceholder="Buscar medidor / protocolo / tipo…"
              pageSize={6}
              empty="Nenhuma declaração encontrada."
            />
            <Note style={{ fontSize: 12, margin: 14 }}>
              O status <b>Registrado</b> é o estado normal da declaração no SiDeCC. Uma declaração é cancelável no mesmo dia do cadastro; depois disso, a retificação exige Medição Alternativa com justificativa, avaliada pelo gestor. A ausência de declaração no prazo abre fila de justificativa, separada das Solicitações.
            </Note>
          </Panel>
        </Bento>
      )}

      {/* ---- TAB: Apontamentos ---------------------------------------------- */}
      {tab === 'apontamentos' && (
        <Bento>
          <Panel lead col={12} header={<>Apontamentos deste ponto <Sp /><Pill variant="warn">2 abertos</Pill><Pill variant="label">1 encerrado</Pill></>}>
            <DataTable
              columns={APONT_COLS}
              rows={APONTAMENTOS.map((a) => ({ ...a, onClick: () => navigate('/gestor/apontamento') }))}
              search={['titulo', 'natureza', 'tipo', 'grau', 'fase']}
              searchPlaceholder="Buscar título / natureza / fase…"
              pageSize={6}
              empty="Nenhum apontamento encontrado."
            />
            <Note style={{ fontSize: 12, margin: 14 }}>
              A <b>natureza</b> classifica o apontamento em três categorias: <b>sinal de gestão</b> (nada excedido, acompanhamento preventivo; grau e fase exibem "–" por construção), <b>exceção detectada</b> (limite excedido, aguarda justificativa em prazo) e <b>ato administrativo</b> (rito sancionador em curso, com processo vinculado). O <b>grau</b> tem três níveis previstos na Lei 7.663/1991, art. 13: leve, grave, gravíssima; nunca "média". A <b>fase</b> segue a sequência de nove passos: Detectada, Notificada, Autuada, Ciência, Em defesa ou recurso, Em julgamento, Decidida, Aguardando regularização, Encerrada. Clicar numa linha abre a ficha do apontamento.
            </Note>
          </Panel>
        </Bento>
      )}

    </GestorShell>
  )
}
