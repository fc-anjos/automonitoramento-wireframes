import { Link } from 'react-router-dom'
import { GestorShell } from '../../components/shell.jsx'
import { Bento, Card, Panel, Body, Note, Pill, Btn, Svg, Row, Sp } from '../../components/ui.jsx'

// daily estimated volume, jun/2026 (starts on a monday); state vs the 3.000 m³/dia
// permitido under the estiagem rule: ok | warn | partial | future
const CAL = [
  { d: 1, v: '2.940' }, { d: 2, v: '3.010', warn: true }, { d: 3, v: '2.870' },
  { d: 4, v: '3.180', warn: true, pico: true }, { d: 5, v: '2.990' }, { d: 6, v: '2.760' },
  { d: 7, v: '2.810' }, { d: 8, v: '3.060', warn: true }, { d: 9, v: '2.950' },
  { d: 10, v: 'parcial', partial: true },
  ...Array.from({ length: 20 }, (_, i) => ({ d: 11 + i, v: '–', future: true })),
]

const top = (
  <>
    <div className="crumb"><Link to="/gestor/mapa">Pontos</Link> / <b style={{ color: 'var(--ink)' }}>07-1001</b></div>
    <span className="sp" />
    <Pill variant="warn">Exceção · grau média</Pill>
    <Pill variant="label">Sinal de gestão</Pill>
    <Btn sub style={{ padding: '6px 12px' }}>Exportar</Btn>
  </>
)

export default function Detalhe() {
  return (
    <GestorShell tag="GESTOR · 04" title="Detalhe do ponto / outorgado" active="pontos" top={top}>
      <Bento>
        <Card col={12}>
          <Row style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="eyebrow">Ponto de captação · 07-1001</div>
              <h1 style={{ marginTop: 6 }}>Indústria Cubatão S/A</h1>
              <div className="muted" style={{ marginTop: 4 }}>Polo industrial de Cubatão · Rio Cubatão</div>
            </div>
            <Row style={{ gap: 8 }}><Pill variant="act">Faixa A</Pill><Pill>Telemetria</Pill></Row>
          </Row>
          <hr className="div" />
          <div className="grid g-4">
            <div><div className="muted" style={{ fontSize: 11 }}>Nº da outorga</div><div className="mono" style={{ color: 'var(--ink)' }}>OUT-07-2024-001234</div></div>
            <div><div className="muted" style={{ fontSize: 11 }}>ID SiDeCC</div><div className="mono" style={{ color: 'var(--ink)' }}>SDC-998877</div></div>
            <div><div className="muted" style={{ fontSize: 11 }}>Finalidade</div><div className="mono" style={{ color: 'var(--ink)' }}>Industrial</div></div>
            <div><div className="muted" style={{ fontSize: 11 }}>Fonte</div><div className="mono" style={{ color: 'var(--ink)' }}>Superficial</div></div>
            <div><div className="muted" style={{ fontSize: 11 }}>Município</div><div className="mono" style={{ color: 'var(--ink)' }}>Cubatão</div></div>
            <div><div className="muted" style={{ fontSize: 11 }}>Coordenadas</div><div className="mono" style={{ color: 'var(--ink)' }}>−23.879, −46.418</div></div>
            <div><div className="muted" style={{ fontSize: 11 }}>Medidores</div><div className="mono" style={{ color: 'var(--ink)' }}>2 ativos · 1 desativado</div></div>
            <div><div className="muted" style={{ fontSize: 11 }}>Transmissão (30d)</div><div className="mono" style={{ color: 'var(--ink)' }}>98,6%</div></div>
          </div>
        </Card>

        {/* three series: outorgado x permitido x medido; "permitido" only exists where a restriction rule applies */}
        <Panel col={8} header={<>Limites outorgados × permitido × medido <Sp /><Pill variant="warn">Estado da vazão · em restrição</Pill><Pill variant="label">conformidade por dimensão</Pill></>}>
          <table className="table">
            <thead><tr><th>Limite</th><th className="num">Outorgado</th><th className="num">Permitido</th><th className="num">Medido</th><th>Situação</th></tr></thead>
            <tbody>
              <tr><td>Estado da vazão</td><td className="num">–</td><td className="num">regra de estiagem · desde 15/05</td><td className="num">–</td><td><Pill variant="warn">Em restrição</Pill></td></tr>
              <tr><td>Vazão máx. instantânea</td><td className="num">45 L/s</td><td className="num">–</td><td className="num">pico 53 L/s · 118%</td><td><Pill variant="warn">Exceção</Pill></td></tr>
              <tr><td>Volume diário</td><td className="num">3.425 m³/dia</td><td className="num">3.000 m³/dia · estiagem</td><td className="num">3.180 m³/dia · 106% do permitido</td><td><Pill variant="warn">Exceção · permitido</Pill></td></tr>
              <tr><td>Volume mensal</td><td className="num">104.000 m³/mês</td><td className="num">–</td><td className="num">110.200 m³/mês · 106%</td><td><Pill variant="warn">Atenção</Pill></td></tr>
              <tr><td>Volume anual</td><td className="num">1.250.000 m³</td><td className="num">–</td><td className="num">58% · projeção 116%</td><td><Pill variant="warn">Em risco</Pill></td></tr>
              <tr><td>Horas de operação (dia)</td><td className="num">24 h/dia · contínuo</td><td className="num">–</td><td className="num">24 h captadas</td><td><Pill variant="ok">Conforme</Pill></td></tr>
              <tr><td>Transmissão (30 d)</td><td className="num">≥ 95%</td><td className="num">–</td><td className="num">98,6%</td><td><Pill variant="ok">Conforme</Pill></td></tr>
            </tbody>
          </table>
          <Note style={{ margin: 14, fontSize: 12 }}>
            O <b>permitido</b> é o limite sob regra de restrição (estiagem, conflito de uso) e pode situar-se abaixo do outorgado. Havendo restrição vigente, a reconciliação corre contra o <b>permitido</b>; nos demais casos, contra o <b>outorgado</b>. O volume diário ilustra a diferença: 3.180 m³/dia é conforme contra os 3.425 m³/dia outorgados, mas excede os 3.000 m³/dia permitidos pela regra de estiagem. A conformidade diária é verificada em <b>dois eixos</b>, volume <b>e</b> horas de captação (outorgadas × captadas), com detalhamento hora a hora a partir do calendário abaixo.
          </Note>
        </Panel>

        <Panel col={4} header={<>Apontamentos <Sp /><Pill variant="label">3</Pill></>}>
          <Body>
            <div className="list">
              <Link className="lrow" to="/gestor/apontamento" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                <div className="lr-top">
                  <span className="lr-title">Pico de vazão acima do teto</span>
                  <Pill variant="warn">grau média</Pill>
                </div>
                <div className="lr-sub">
                  <Pill variant="label" style={{ padding: '0 7px', fontSize: 10.5 }}>Exceção</Pill>
                  <span style={{ marginLeft: 6 }}>fase Notificada · 04/06 · pico 53 L/s (teto 45)</span>
                </div>
                <div className="lr-sub" style={{ marginTop: 4 }}>Próxima ação: outorgado justifica até 25/06 · tratativa: classificar / autuar</div>
              </Link>

              <Link className="lrow" to="/gestor/apontamento" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                <div className="lr-top">
                  <span className="lr-title">Volume anual em risco</span>
                  <Pill variant="label">sinal de gestão</Pill>
                </div>
                <div className="lr-sub">
                  <Pill variant="label" style={{ padding: '0 7px', fontSize: 10.5 }}>Sinal de gestão</Pill>
                  <span style={{ marginLeft: 6 }}>sem grau · desde jun · 58% · projeção 116%</span>
                </div>
                <div className="lr-sub" style={{ marginTop: 4 }}>Próxima ação: outorgado reduz o ritmo · tratativa: acompanhar / notificar se persistir</div>
              </Link>

              <Link className="lrow" to="/gestor/apontamento" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                <div className="lr-top">
                  <span className="lr-title">Amostra isolada ausente</span>
                  <Pill variant="ok">grau leve</Pill>
                </div>
                <div className="lr-sub">
                  <Pill variant="label" style={{ padding: '0 7px', fontSize: 10.5 }}>Exceção</Pill>
                  <span style={{ marginLeft: 6 }}>fase Encerrada · 03/06 · 1 lacuna, já retificada</span>
                </div>
                <div className="lr-sub" style={{ marginTop: 4 }}>Próxima ação: nenhuma · tratativa: encerrada</div>
              </Link>
            </div>
            <Note style={{ fontSize: 12, marginTop: 12 }}>Cada linha é um apontamento tipado pela <b>natureza</b> (sinal de gestão, exceção, ato administrativo), pelo <b>grau</b> e pela <b>fase</b> da tramitação. Um sinal de gestão apenas acompanha e tem baixa automática; uma exceção aguarda justificativa em prazo; um ato administrativo segue rito próprio. Abrir um apontamento dá ao gestor os verbos de disposição: notificar, classificar, autuar, julgar. O sinal de gestão não tem grau, porque nada foi excedido ainda.</Note>
          </Body>
        </Panel>

        <Panel col={6} header={<>Vazão instantânea × teto <Sp /><Pill variant="label">janela 4 h</Pill></>}>
          <Body>
            <Svg src="wireframe-chart-vazao.svg" ratio="520/280" label="Vazão instantânea numa janela de 4 h, com um pico de 53 L/s acima do teto de 45 L/s" />
            <Note style={{ fontSize: 12, marginTop: 10 }}>Mede o <b>momento</b>: vazão instantânea contra o teto outorgado. O pico de 53 L/s é uma <b>exceção</b>, que pede justificativa em prazo; não é, por si, infração.</Note>
          </Body>
        </Panel>

        <Panel col={6} header={<>Orçamento anual · projeção <Sp /><Pill variant="label">12 meses</Pill></>}>
          <Body>
            <Svg src="wireframe-chart-burndown.svg" ratio="520/280" label="Consumo do orçamento anual: acúmulo acima do ritmo, projeção cruza 100% por volta de início de novembro" />
            <Note style={{ fontSize: 12, marginTop: 10 }}>Mede a <b>tendência</b>: orçamento anual contra o ritmo de consumo. Acima do ritmo, a projeção estoura o limite ~início de nov.</Note>
          </Body>
        </Panel>

        <Panel col={8} header={<>Histórico de medições (telemetria) <Sp /><Pill variant="label">amostras recentes</Pill></>}>
          <table className="table">
            <thead><tr><th>Data</th><th className="num">Vol. acum.</th><th className="num">Vazão</th><th>Estado do dado</th></tr></thead>
            <tbody>
              <tr><td>04/06 09:35</td><td className="num">725.040</td><td className="num">37,0 L/s</td><td><Pill variant="ok">Consolidado</Pill></td></tr>
              <tr><td>04/06 08:20</td><td className="num">723.900</td><td className="num">53,0 L/s</td><td><Pill variant="warn">Pico {'>'} teto</Pill></td></tr>
              <tr><td>04/06 03:35</td><td className="num">722.700</td><td className="num">38,4 L/s</td><td><Pill variant="ok">Consolidado</Pill></td></tr>
              <tr><td>03/06 21:35</td><td className="num">721.520</td><td className="num">36,1 L/s</td><td><Pill variant="warn">Validado</Pill></td></tr>
            </tbody>
          </table>
          {/* the plotted series is the captacao aggregate; absence is flagged per medidor */}
          <Note style={{ margin: 14, fontSize: 12 }}>
            A série exibida (e os gráficos acima) é o <b>agregado da captação</b>: soma dos medidores ativos (SDC-R-4471 + SDC-R-4472), com decomposição por aparelho disponível. A <b>ausência de declaração</b> é sinalizada por medidor, não pelo ponto.
          </Note>
        </Panel>

        {/* the 98.6% indicator is derived here: received x expected samples vs tolerance */}
        <Panel col={4} header={<>Falhas de transmissão (30 d) <Sp /><Pill variant="label">98,6%</Pill></>}>
          <Body>
            <Svg src="wireframe-chart-transmissao.svg" ratio="520/200" label="Transmissão diária nos últimos 30 dias, com uma lacuna isolada já retificada" />
            <table className="table" style={{ marginTop: 10 }}>
              <tbody>
                <tr><td>Amostras esperadas</td><td className="num mono">8.640</td></tr>
                <tr><td>Amostras recebidas</td><td className="num mono">8.519</td></tr>
                <tr><td>Falhas</td><td className="num mono">121 · 1,4%</td></tr>
                <tr><td>Tolerância de falhas</td><td className="num"><Pill variant="ok">≤ 5,0% · dentro</Pill></td></tr>
              </tbody>
            </table>
            <Note style={{ fontSize: 12, marginTop: 10 }}>O indicador de <b>98,6%</b> deriva desta conta: amostras <b>recebidas × esperadas</b> no passo de 5 min. A lacuna do dia 20 foi suprida por declaração manual no SiDeCC (contingência da telemetria) e retificada. Acima da tolerância, abre-se exceção de falha de transmissão. Trilha de auditoria na aba <b>Cadastro</b>.</Note>
          </Body>
        </Panel>

        {/* a captação may carry more than one medidor; each device has its own lifecycle dates */}
        <Panel col={7} header={<>Medidores da captação <Sp /><Pill variant="label">2 ativos · 1 desativado</Pill></>}>
          <table className="table">
            <thead><tr><th>Nº de série</th><th>Fabricante / modelo</th><th className="num">Diâmetro</th><th className="num">Inclusão</th><th className="num">Desativação</th><th>Estado</th></tr></thead>
            <tbody>
              <tr><td className="mono">SDC-R-4471</td><td>Hidrotec · HT-300 (eletromagnético)</td><td className="num">DN 150</td><td className="num">12/03/2024</td><td className="num">–</td><td><Pill variant="ok">Ativo</Pill></td></tr>
              <tr><td className="mono">SDC-R-4472</td><td>Hidrotec · HT-300 (eletromagnético)</td><td className="num">DN 100</td><td className="num">12/03/2024</td><td className="num">–</td><td><Pill variant="ok">Ativo</Pill></td></tr>
              <tr><td className="mono">SDC-3198<br /><span className="muted" style={{ fontSize: 10.5 }}>substituído por SDC-R-4471 em 12/03/2024 · série da captação contínua</span></td><td>Medix · M-200 (hidrômetro)</td><td className="num">DN 150</td><td className="num">03/02/2019</td><td className="num">12/03/2024</td><td><Pill>Desativado</Pill></td></tr>
            </tbody>
          </table>
          <Note style={{ margin: 14, fontSize: 12 }}>
            Uma captação pode ter <b>mais de um medidor</b>, e cada equipamento tem ciclo de vida próprio: tipo, número de série, fabricante, modelo, diâmetro e as datas de <b>inclusão</b> e <b>desativação</b>. O cadastro e a troca são atos do <b>outorgado</b>, no aplicativo, com as leituras de remoção e de reinstalação que fecham a série de cada aparelho; o gestor confere. A troca guarda o <b>vínculo de sucessão</b> entre o aparelho desativado e o substituto, e a série de volumes da captação segue contínua. Desativar não apaga: o medidor muda de estado e preserva o histórico de leituras.
          </Note>
        </Panel>

        {/* declaration frequency is a managed attribute with history; changing it is a gestor verb */}
        <Panel col={5} header={<>Frequência de declaração <Sp /><Pill variant="label">atributo gerenciado</Pill></>}>
          <Body>
            <Row style={{ gap: 8 }}>
              <Pill variant="act">Diária · vigente</Pill>
              <span className="muted" style={{ fontSize: 12 }}>derivada da faixa de volume mensal (104.000 m³/mês)</span>
            </Row>
            <table className="table" style={{ marginTop: 10 }}>
              <thead><tr><th>Frequência</th><th className="num">Início</th><th className="num">Fim</th></tr></thead>
              <tbody>
                <tr><td>Diária</td><td className="num">12/03/2024</td><td className="num"><Pill variant="ok">vigente</Pill></td></tr>
                <tr><td>Semanal</td><td className="num">03/02/2019</td><td className="num">12/03/2024</td></tr>
                <tr><td>Mensal</td><td className="num">14/06/2016</td><td className="num">03/02/2019</td></tr>
              </tbody>
            </table>
            <Row style={{ marginTop: 10 }}>
              <Btn sub style={{ padding: '6px 12px' }}>Alterar frequência</Btn>
            </Row>
            <Note style={{ fontSize: 12, marginTop: 10 }}>
              Cada uso carrega uma frequência declaratória (mensal, semanal ou diária) derivada da <b>faixa de volume mensal outorgado</b> (Portaria DAEE 5.579/2018, art. 5º; IT-DPO 15/2018). Alterar a frequência é <b>verbo do gestor</b>, datado na trilha: encerra a vigência anterior e abre a nova, sem apagar o histórico. Na falha de transmissão prolongada, o ponto de telemetria declara manualmente nesta mesma frequência, como contingência.
            </Note>
          </Body>
        </Panel>

        {/* monthly calendar of estimated daily volume, in the SiDeCC internal-access pattern */}
        <Panel col={12} header={<>Calendário mensal · volume diário estimado <Sp /><Pill variant="label">junho/2026 · m³/dia</Pill></>}>
          <Body>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
              {['seg', 'ter', 'qua', 'qui', 'sex', 'sáb', 'dom'].map((w) => (
                <div key={w} className="faint" style={{ fontSize: 11, textAlign: 'center' }}>{w}</div>
              ))}
              {CAL.map((c) => (
                <div key={c.d} style={{ border: '1px solid var(--line)', borderRadius: 6, padding: '6px 8px', minHeight: 46, opacity: c.future ? 0.45 : 1 }}>
                  <div className="mono faint" style={{ fontSize: 10.5 }}>{String(c.d).padStart(2, '0')}</div>
                  {c.warn
                    ? <Pill variant="warn" style={{ padding: '0 7px', fontSize: 10.5 }}>{c.v}{c.pico ? ' · pico' : ''}</Pill>
                    : <div className={c.future || c.partial ? 'muted' : 'mono'} style={{ fontSize: 11.5, color: c.future ? undefined : 'var(--ink)' }}>{c.v}</div>}
                </div>
              ))}
            </div>
            <Note style={{ fontSize: 12, marginTop: 12 }}>
              Visão de calendário do volume diário estimado, no padrão do acesso interno do SiDeCC. Os dias acima do <b>permitido</b> (3.000 m³/dia sob a regra de estiagem) ficam marcados; o dia 04 carrega também o pico de vazão da exceção aberta. Cada célula abre a <b>visão hora a hora</b> do dia, que confronta volume e horas de captação contra o regime outorgado. Dias futuros aparecem como previstos.
            </Note>
          </Body>
        </Panel>
      </Bento>
    </GestorShell>
  )
}
