import { Link } from 'react-router-dom'
import { DraftBanner, Phone, Notch, StatusBar, PScroll, AppBar, AppTabBar, HomeBar, PhoneLabel } from '../../components/shell.jsx'
import { Card, Pill, Meter, Note, Panel, Body, Row, Sp, Svg } from '../../components/ui.jsx'

export default function Telemetria() {
  return (
    <>
      <DraftBanner tag="APP · 02" title="Acompanhamento de captação (telemetria)" right="Grandes usuários · Faixa A" />

      <div className="wrap">
        <Note style={{ maxWidth: 760, margin: '0 auto 22px' }}>
          <b>Fluxo do grande usuário.</b> A tela lidera pelo que o outorgado mede, o volume acumulado no ano e quanto ainda resta do orçamento. Só depois aparecem os apontamentos abertos sobre o ponto. O outorgado <b>observa</b> o que o equipamento já transmitiu, sem digitar nada. O pico de vazão é uma <b>exceção</b>, um achado com ação pedida ao usuário (justificar o pico) e prazo para resposta, não uma infração. A leitura de infração, se houver, corre em outra instância.
        </Note>

        <div className="phone-stage" style={{ justifyContent: 'center' }}>
          <div>
            <Phone>
              <Notch />
              <StatusBar right="▰▰▰ 5G ▮" />
              <PScroll>
                <AppBar title="Captação" back />

                {/* LEAD: o volume que o usuario mede, acumulado no ano */}
                <Card style={{ padding: 14 }}>
                  <div className="muted" style={{ fontSize: 12 }}>Volume medido acumulado no ano</div>
                  <Row style={{ alignItems: 'baseline', gap: 8 }}><div className="mono" style={{ fontSize: 26, color: 'var(--ink)' }}>725.000</div><span className="muted mono">m³</span></Row>
                  <Meter variant="warn" value="58%" style={{ marginTop: 10 }} />
                  <Row style={{ justifyContent: 'space-between', marginTop: 6 }}><small className="mono faint">0</small><small className="mono">58% do limite anual (1.250.000 m³)</small></Row>
                </Card>

                {/* LEAD: burn-down anual, a tendência */}
                <Card style={{ marginTop: 12, padding: 14 }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'baseline' }}><b style={{ fontSize: 13, color: 'var(--ink)' }}>Orçamento anual</b><span className="mono" style={{ fontSize: 11 }}>12 meses</span></Row>
                  <Svg src="wireframe-chart-telemetria.svg" ratio="340/210" label="Burn-down do orçamento anual: acúmulo acima do ritmo, projeção cruza 100% por volta de início de novembro" style={{ marginTop: 10 }} />
                  <div className="mrow" style={{ borderBottom: 0, paddingBottom: 0 }}><span className="msp muted" style={{ fontSize: 12.5 }}>No ritmo atual</span><span className="mono" style={{ fontSize: 12.5, color: 'var(--ink)' }}>fecha o ano em 116%</span></div>
                </Card>

                {/* THIN STRIP: os dois apontamentos abertos sobre o ponto */}
                <Panel style={{ marginTop: 14 }} header={<>Apontamentos abertos <Sp /><Pill variant="label">2</Pill></>}>
                  <Body>
                    <div className="list">
                      <Link className="lrow" to="/app/apontamento" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                        <div className="lr-top">
                          <span className="lr-title">Pico de vazão acima do teto</span>
                          <span className="pill warn">justifique até 25/06</span>
                        </div>
                        <div className="lr-sub"><span className="pill label" style={{ padding: '0 7px', fontSize: 10.5 }}>Exceção · grau média</span> <span style={{ marginLeft: 6 }}>04/06 · pico 53 L/s (teto 45)</span></div>
                      </Link>
                      <Link className="lrow" to="/app/apontamento" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                        <div className="lr-top">
                          <span className="lr-title">Volume anual em risco</span>
                          <span className="pill label">Sinal de gestão</span>
                        </div>
                        <div className="lr-sub"><span className="pill label" style={{ padding: '0 7px', fontSize: 10.5 }}>Sinal de gestão</span> <span style={{ marginLeft: 6 }}>desde jun · 58% · projeção 116%</span></div>
                      </Link>
                    </div>
                  </Body>
                </Panel>

                {/* MOMENT: instantaneous flow vs ceiling */}
                <Card style={{ marginTop: 14, padding: 14 }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'baseline' }}><div className="muted" style={{ fontSize: 12 }}>Vazão instantânea × teto</div><span className="mono" style={{ fontSize: 11 }}>janela 4 h</span></Row>
                  <Row style={{ alignItems: 'baseline', gap: 8, marginTop: 4 }}><div className="mono" style={{ fontSize: 17, color: 'var(--ink)' }}>37,0 L/s</div><span className="muted" style={{ fontSize: 12 }}>agora · teto 45 · pico 53</span></Row>
                  <Svg src="wireframe-chart-vazao.svg" ratio="520/240" label="Vazão instantânea numa janela de 4 h, com um pico de 53 L/s acima do teto de 45 L/s" style={{ marginTop: 10 }} />
                </Card>

                {/* compact limit-set status */}
                <Card style={{ marginTop: 12, padding: 14 }}>
                  <b style={{ fontSize: 13, color: 'var(--ink)' }}>Limites da outorga</b>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12.5 }}>Vazão máx. instantânea</span><span className="pill warn">pico 53 / teto 45</span></div>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12.5 }}>Volume anual</span><span className="pill label">proj. 116%</span></div>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12.5 }}>Volume diário</span><span className="pill ok">conforme</span></div>
                </Card>

                <Card style={{ marginTop: 12, padding: 14 }}>
                  <Row style={{ justifyContent: 'space-between' }}><b style={{ fontSize: 13, color: 'var(--ink)' }}>Equipamento</b><span className="pill ok">Transmitindo</span></Row>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12.5 }}>ID do medidor</span><span className="mono" style={{ fontSize: 12.5 }}>SDC-R-4471</span></div>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12.5 }}>Transmissão (30d)</span><span className="mono" style={{ fontSize: 12.5 }}>98,6%</span></div>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12.5 }}>Fonte</span><span className="mono" style={{ fontSize: 12.5 }}>Superficial</span></div>
                </Card>
              </PScroll>
              <AppTabBar active="captacao" />
              <HomeBar />
            </Phone>
            <PhoneLabel>Telemetria · somente consulta</PhoneLabel>
          </div>
        </div>

        <Note style={{ maxWidth: 760, margin: '22px auto 0' }}>
          O <b>volume</b> vem primeiro porque é o que o grande usuário enxerga no dia a dia e o que ele controla. O burn-down separa <b>tendência</b> (orçamento do ano) do <b>momento</b> (pico instantâneo): são escalas diferentes e não precisam bater entre si.
        </Note>

        <Note style={{ maxWidth: 760, margin: '14px auto 0' }}>
          Os dois apontamentos abertos têm naturezas distintas. O pico é uma <b>exceção</b>: o sistema detectou, atribuiu grau e pede justificativa em prazo, sem presumir infração, e a exceção fica aberta até a resposta. O orçamento em risco é um <b>sinal de gestão</b>: nada foi excedido, é um aviso para reduzir o ritmo e ele se baixa sozinho quando a projeção volta ao limite. Um sinal de gestão não recebe grau; a <b>exceção</b> recebe (aqui, média). Se a exceção não for tratada, pode evoluir para <b>ato administrativo</b>, que aí corre rito próprio.
        </Note>
      </div>
    </>
  )
}
