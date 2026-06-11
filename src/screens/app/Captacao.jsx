import { Link } from 'react-router-dom'
import { DraftBanner, Phone, Notch, StatusBar, PScroll, AppBar, AppTabBar, HomeBar, PhoneLabel } from '../../components/shell.jsx'
import { Card, Pill, Btn, Meter, Note, Panel, Body, Row, Svg, DataTable } from '../../components/ui.jsx'

// Apontamentos abertos sobre o ponto de captação (Estado A).
// Grau de acordo com Lei 7.663/1991, art. 13: leve, grave, gravíssima.
// Sinal de gestão não recebe grau (coluna fica com "--").
const APONTAMENTOS_A = [
  {
    id: 'a1',
    titulo: 'Pico de vazão acima do teto',
    natureza: 'Exceção',
    grau: 'leve',
    prazo: 'justifique até 25/06',
    detalhe: '04/06 · pico 53 L/s (teto 45)',
    variant: 'warn',
  },
  {
    id: 'a2',
    titulo: 'Volume anual em risco',
    natureza: 'Sinal de gestão',
    grau: '--',
    prazo: 'sem prazo · baixa automática',
    detalhe: 'desde jun · 58% · projeção 116%',
    variant: 'label',
  },
]

export default function AppCaptacao() {
  return (
    <>
      <DraftBanner tag="APP · 06" title="Captação (telemetria)" right="Grandes usuários · Faixa A" />

      <div className="wrap">
        <Note style={{ maxWidth: 760, margin: '0 auto 22px' }}>
          <b>Reconciliação das três séries do SiDeCC-R.</b> A tela mostra o que o equipamento transmitiu, sem campo de entrada: o grande usuário (Faixa A) observa, não digita. As três séries reconciliadas são Captado, Outorgado e Permitido; o Permitido é o limite vigente sob regra de restrição (estiagem, conflito de uso), que pode ficar abaixo do Outorgado. Enquanto a restrição vigorar, a conformidade do dia é verificada contra o Permitido, e o badge Estado de Vazão fica levantado. A Situação da Transmissão (EM DIA, EM TOLERÂNCIA, FORA DA TOLERÂNCIA) é o segundo eixo: se a transmissão cai, o caminho de contingência abre a autodeclaração manual. A tela é alcançada a partir de Início e da superfície de Declaração; não é aba da barra inferior.
        </Note>

        <div className="phone-stage" style={{ justifyContent: 'center' }}>

          {/* ESTADO A: transmitindo; restrição de estiagem vigente (Permitido < Outorgado) */}
          <div>
            <Phone>
              <Notch />
              <StatusBar right="▰▰▰ 5G ▮" />
              <PScroll>
                <AppBar title="Captação" back="/app/inicio" />

                {/* VOLUME ACUMULADO: a dimensão principal que o usuário controla */}
                <Card style={{ padding: 14 }}>
                  <div className="muted" style={{ fontSize: 12 }}>Volume medido acumulado no ano</div>
                  <Row style={{ alignItems: 'baseline', gap: 8 }}>
                    <div className="mono" style={{ fontSize: 26, color: 'var(--ink)' }}>725.000</div>
                    <span className="muted mono">m³</span>
                  </Row>
                  <Meter variant="warn" value="58%" style={{ marginTop: 10 }} />
                  <Row style={{ justifyContent: 'space-between', marginTop: 6 }}>
                    <small className="mono faint">0</small>
                    <small className="mono">58% do limite anual (1.250.000 m³)</small>
                  </Row>
                  <div className="mrow" style={{ borderBottom: 0, paddingBottom: 0, marginTop: 8 }}>
                    <span className="msp muted" style={{ fontSize: 12.5 }}>No ritmo atual</span>
                    <span className="mono" style={{ fontSize: 12.5, color: 'var(--ink)' }}>fecha o ano em 116%</span>
                  </div>
                </Card>

                {/* TRES SERIES: burn-down com Captado x Outorgado x Permitido */}
                <Card style={{ marginTop: 12, padding: 14 }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <b style={{ fontSize: 13, color: 'var(--ink)' }}>Orçamento anual</b>
                    <span className="mono" style={{ fontSize: 11 }}>12 meses</span>
                  </Row>
                  <Svg src="wireframe-chart-telemetria.svg" ratio="340/210" label="Burn-down do orçamento anual com três séries: Captado, Outorgado e Permitido; acúmulo acima do ritmo, projeção cruza 100% no início de novembro" style={{ marginTop: 10 }} />
                  <div className="muted mono" style={{ fontSize: 11, marginTop: 8 }}>séries: Captado · Outorgado · Permitido</div>
                </Card>

                {/* ESTADO DE VAZAO + vazão instantânea */}
                <Card style={{ marginTop: 12, padding: 14 }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div className="muted" style={{ fontSize: 12 }}>Vazão instantânea</div>
                    <span className="mono" style={{ fontSize: 11 }}>janela 4 h</span>
                  </Row>
                  <Row style={{ alignItems: 'baseline', gap: 8, marginTop: 4 }}>
                    <div className="mono" style={{ fontSize: 17, color: 'var(--ink)' }}>37,0 L/s</div>
                    <span className="muted" style={{ fontSize: 12 }}>agora</span>
                  </Row>
                  {/* Estado de Vazão: enum do SiDeCC-R (SEM RESTRIÇÃO / sob regra de restrição) */}
                  <Row style={{ gap: 8, marginTop: 8, alignItems: 'center' }}>
                    <Pill variant="warn">sob regra de restrição</Pill>
                    <span className="mono faint" style={{ fontSize: 11 }}>estiagem · desde 01/06</span>
                  </Row>
                  <div className="mrow" style={{ marginTop: 8 }}>
                    <span className="msp muted" style={{ fontSize: 12.5 }}>Outorgado</span>
                    <span className="mono" style={{ fontSize: 12.5 }}>45 L/s</span>
                  </div>
                  <div className="mrow">
                    <span className="msp muted" style={{ fontSize: 12.5 }}>Permitido (restrição)</span>
                    <span className="pill warn">38 L/s · estiagem</span>
                  </div>
                  <div className="mrow" style={{ borderBottom: 0, paddingBottom: 0 }}>
                    <span className="msp muted" style={{ fontSize: 12.5 }}>Volume diário</span>
                    <span className="pill ok">conforme ao Permitido</span>
                  </div>
                  <Svg src="wireframe-chart-vazao.svg" ratio="520/240" label="Vazão instantânea numa janela de 4 h contra dois tetos: 45 L/s Outorgado e 38 L/s Permitido sob restrição, com um pico de 53 L/s acima de ambos" style={{ marginTop: 10 }} />
                </Card>

                {/* APONTAMENTOS ABERTOS: grau conforme Lei 7.663/1991, art. 13 (leve, grave, gravíssima) */}
                <Panel style={{ marginTop: 14 }} header={<>Apontamentos abertos <span className="sp" /><Pill variant="label">2</Pill></>}>
                  <Body>
                    <DataTable
                      columns={[
                        { key: 'titulo', label: 'Apontamento', render: (r) => (
                          <Link to="/app/apontamento" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{ fontSize: 13, color: 'var(--ink)' }}>{r.titulo}</div>
                            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{r.detalhe}</div>
                          </Link>
                        )},
                        { key: 'natureza', label: 'Natureza' },
                        { key: 'grau', label: 'Grau', render: (r) => <Pill variant={r.variant}>{r.grau}</Pill> },
                        { key: 'prazo', label: 'Prazo / situação', render: (r) => <span className="mono" style={{ fontSize: 11 }}>{r.prazo}</span> },
                      ]}
                      rows={APONTAMENTOS_A}
                    />
                  </Body>
                </Panel>

                {/* SITUACAO DA TRANSMISSAO: enum do SiDeCC-R */}
                <Card style={{ marginTop: 12, padding: 14 }}>
                  <Row style={{ justifyContent: 'space-between' }}>
                    <b style={{ fontSize: 13, color: 'var(--ink)' }}>Situação da Transmissão</b>
                    <Pill variant="ok">EM DIA</Pill>
                  </Row>
                  <div className="mrow" style={{ marginTop: 8 }}>
                    <span className="msp muted" style={{ fontSize: 12.5 }}>ID do medidor</span>
                    <span className="mono" style={{ fontSize: 12.5 }}>SDC-R-4471</span>
                  </div>
                  <div className="mrow">
                    <span className="msp muted" style={{ fontSize: 12.5 }}>Recebidas × esperadas (30 d)</span>
                    <span className="mono" style={{ fontSize: 12.5 }}>2.840 / 2.880</span>
                  </div>
                  <div className="mrow">
                    <span className="msp muted" style={{ fontSize: 12.5 }}>Falhas de transmissão</span>
                    <span className="pill ok">1,4% · tolerância 5%</span>
                  </div>
                  <div className="mrow" style={{ borderBottom: 0, paddingBottom: 0 }}>
                    <span className="msp muted" style={{ fontSize: 12.5 }}>Fonte</span>
                    <span className="mono" style={{ fontSize: 12.5 }}>Superficial</span>
                  </div>
                  <div className="muted" style={{ fontSize: 11, marginTop: 6 }}>Esta captação tem <b>2 medidores ativos</b>. O outro: SDC-R-4472, também EM DIA.</div>
                </Card>
              </PScroll>
              {/* captacao não é aba; active="inicio" reflete o tab de origem */}
              <AppTabBar active="inicio" />
              <HomeBar />
            </Phone>
            <PhoneLabel>Estado A · transmitindo · restrição de estiagem vigente</PhoneLabel>
            <Note style={{ marginTop: 12, fontSize: 12, maxWidth: 360 }}>
              O grau do apontamento de pico de vazão é <b>leve</b> (Lei 7.663/1991, art. 13; três níveis: leve, grave, gravíssima). O sinal de gestão não recebe grau: exibe "--". Ambos são apontamentos abertos; apenas o de pico pede ação no prazo.
            </Note>
          </div>

          {/* ESTADO B: contingência; transmissão interrompida; caminho para autodeclaração */}
          <div>
            <Phone>
              <Notch />
              <StatusBar right="▰▰▱ 4G ▮" />
              <PScroll>
                <AppBar title="Captação" back="/app/inicio" />

                {/* banner de contingência: instrui e abre o fluxo de declaração manual */}
                <Card style={{ padding: 14 }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <b style={{ fontSize: 13.5, color: 'var(--ink)' }}>Transmissão interrompida</b>
                    <Pill variant="bad">sem recepção</Pill>
                  </Row>
                  <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
                    Última leitura recebida em <span className="mono">08/06 · 14h10</span>. Enquanto a transmissão não se restabelece, <b>declare manualmente</b> as leituras pelo aplicativo: a obrigação de declarar permanece, e a declaração manual cobre o período sem dados.
                  </div>
                  <Btn block to="/app/autodeclaracao" style={{ marginTop: 10 }}>Declarar manualmente →</Btn>
                </Card>

                {/* Situação da Transmissão: FORA DA TOLERÂNCIA */}
                <Card style={{ marginTop: 12, padding: 14 }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <b style={{ fontSize: 13, color: 'var(--ink)' }}>Situação da Transmissão</b>
                    <Pill variant="bad">FORA DA TOLERÂNCIA</Pill>
                  </Row>
                  <div className="mrow" style={{ marginTop: 8 }}>
                    <span className="msp muted" style={{ fontSize: 12.5 }}>Recebidas × esperadas (30 d)</span>
                    <span className="mono" style={{ fontSize: 12.5 }}>2.611 / 2.880</span>
                  </div>
                  <div className="mrow">
                    <span className="msp muted" style={{ fontSize: 12.5 }}>Falhas</span>
                    <span className="pill bad">9,3% · acima da tolerância (5%)</span>
                  </div>
                  <Meter variant="bad" value="91%" style={{ marginTop: 8 }} />
                  <Row style={{ justifyContent: 'space-between', marginTop: 6 }}>
                    <small className="mono faint">recepção 90,7%</small>
                    <small className="mono faint">meta ≥ 95%</small>
                  </Row>
                  <div className="muted" style={{ fontSize: 11.5, marginTop: 8 }}>
                    O período sem recepção gera lacuna na série. A lacuna não some: ou é coberta por declaração manual, ou vira apontamento de qualidade do dado.
                  </div>
                </Card>

                {/* dados do equipamento no estado de falha */}
                <Card style={{ marginTop: 12, padding: 14 }}>
                  <Row style={{ justifyContent: 'space-between' }}>
                    <b style={{ fontSize: 13, color: 'var(--ink)' }}>Equipamento</b>
                    <Pill variant="bad">Falha de transmissão</Pill>
                  </Row>
                  <div className="mrow" style={{ marginTop: 8 }}>
                    <span className="msp muted" style={{ fontSize: 12.5 }}>ID do medidor</span>
                    <span className="mono" style={{ fontSize: 12.5 }}>SDC-R-4471</span>
                  </div>
                  <div className="mrow">
                    <span className="msp muted" style={{ fontSize: 12.5 }}>Outorga</span>
                    <span className="mono" style={{ fontSize: 12.5 }}>OUT-07-2024-001234</span>
                  </div>
                  <div className="mrow">
                    <span className="msp muted" style={{ fontSize: 12.5 }}>Última recepção</span>
                    <span className="mono" style={{ fontSize: 12.5 }}>08/06 · 14h10</span>
                  </div>
                  <div className="mrow" style={{ borderBottom: 0, paddingBottom: 0 }}>
                    <span className="msp muted" style={{ fontSize: 12.5 }}>Fonte</span>
                    <span className="mono" style={{ fontSize: 12.5 }}>Superficial</span>
                  </div>
                </Card>

                <Btn block sub to="/app/autodeclaracao" style={{ marginTop: 12 }}>Abrir autodeclaração →</Btn>
              </PScroll>
              <AppTabBar active="inicio" />
              <HomeBar />
            </Phone>
            <PhoneLabel>Estado B · contingência · declarar manualmente</PhoneLabel>
            <Note style={{ marginTop: 12, fontSize: 12, maxWidth: 360 }}>
              Na falha de transmissão, o usuário de telemetria declara manualmente pelo fluxo comum enquanto a transmissão não se restabelece. Restabelecida a transmissão, as séries são reconciliadas sem apagar o que foi declarado.
            </Note>
          </div>

        </div>

        <Note style={{ maxWidth: 760, margin: '22px auto 0' }}>
          O burn-down separa tendência (orçamento do ano) do momento (vazão instantânea), em escalas diferentes. A terceira série, o <b>Permitido</b>, entra nas duas escalas: quando uma regra de restrição vigora, o limite que vale é o Permitido, e o badge <b>Estado de Vazão</b> avisa o usuário de que o teto do dia está abaixo do teto da outorga. Os dois valores possíveis do enum (SEM RESTRIÇÃO e sob regra de restrição) são os do SiDeCC-R.
        </Note>

        <Note style={{ maxWidth: 760, margin: '14px auto 0' }}>
          Os apontamentos abertos têm naturezas distintas. O pico de vazão é uma <b>exceção</b>: o sistema detectou, atribuiu grau e pede justificativa em prazo. O volume anual em risco é um <b>sinal de gestão</b>: nada foi excedido, é um aviso para reduzir o ritmo, e não recebe grau. Grau é atributo de exceção e de ato administrativo; sinal de gestão exibe "--". Os três valores possíveis do grau são: leve, grave e gravíssima (Lei 7.663/1991, art. 13).
        </Note>

        <Note style={{ maxWidth: 760, margin: '14px auto 0' }}>
          <b>Situação da Transmissão</b> é o enum do SiDeCC-R (EM DIA, EM TOLERÂNCIA, FORA DA TOLERÂNCIA). Na contingência, o outorgado declara manualmente, com as mesmas validações da autodeclaração comum, e a declaração entra na mesma trilha de auditoria.
        </Note>
      </div>
    </>
  )
}
