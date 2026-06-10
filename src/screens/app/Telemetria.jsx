import { Link } from 'react-router-dom'
import { DraftBanner, Phone, Notch, StatusBar, PScroll, AppBar, AppTabBar, HomeBar, PhoneLabel } from '../../components/shell.jsx'
import { Card, Pill, Btn, Meter, Note, Panel, Body, Row, Sp, Svg } from '../../components/ui.jsx'

export default function Telemetria() {
  return (
    <>
      <DraftBanner tag="APP · 02" title="Acompanhamento de captação (telemetria)" right="Grandes usuários · Faixa A" />

      <div className="wrap">
        <Note style={{ maxWidth: 760, margin: '0 auto 22px' }}>
          <b>Fluxo do grande usuário.</b> A tela lidera pelo que o outorgado mede, o volume acumulado no ano e quanto ainda resta do orçamento. Só depois aparecem os apontamentos abertos sobre o ponto. O outorgado <b>observa</b> o que o equipamento já transmitiu, sem digitar nada. A reconciliação corre sobre <b>três séries</b>: captado × outorgado × <b>permitido</b>, porque uma regra de restrição vigente (estiagem, conflito de uso) pode situar o permitido abaixo do outorgado. O pico de vazão é uma <b>exceção</b>, um achado com ação pedida ao usuário (justificar o pico) e prazo de resposta; não constitui, por si, infração. A caracterização de infração, quando cabível, segue rito próprio.
        </Note>

        <div className="phone-stage" style={{ justifyContent: 'center' }}>

          {/* ESTADO A - transmitindo; restricao de estiagem vigente (permitido < outorgado) */}
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

                {/* LEAD: burn-down anual, a tendência; framed as the three reconciliation series */}
                <Card style={{ marginTop: 12, padding: 14 }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'baseline' }}><b style={{ fontSize: 13, color: 'var(--ink)' }}>Orçamento anual</b><span className="mono" style={{ fontSize: 11 }}>12 meses</span></Row>
                  <Svg src="wireframe-chart-telemetria.svg" ratio="340/210" label="Burn-down do orçamento anual com três séries: captado, outorgado e permitido; acúmulo acima do ritmo, projeção cruza 100% por volta de início de novembro" style={{ marginTop: 10 }} />
                  <div className="muted mono" style={{ fontSize: 11, marginTop: 8 }}>séries: captado × outorgado × permitido</div>
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

                {/* MOMENT: instantaneous flow vs the two ceilings (outorgado and permitido) */}
                <Card style={{ marginTop: 14, padding: 14 }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'baseline' }}><div className="muted" style={{ fontSize: 12 }}>Vazão instantânea × outorgado × permitido</div><span className="mono" style={{ fontSize: 11 }}>janela 4 h</span></Row>
                  <Row style={{ alignItems: 'baseline', gap: 8, marginTop: 4 }}><div className="mono" style={{ fontSize: 17, color: 'var(--ink)' }}>37,0 L/s</div><span className="muted" style={{ fontSize: 12 }}>agora · outorgado 45 · permitido 38</span></Row>
                  {/* estado da vazao: badge raised while a restriction rule holds permitido below outorgado */}
                  <Row style={{ gap: 8, marginTop: 8, alignItems: 'center' }}>
                    <Pill variant="warn">Estado da vazão · restrição vigente</Pill>
                    <span className="mono faint" style={{ fontSize: 11 }}>estiagem · desde 01/06</span>
                  </Row>
                  <Svg src="wireframe-chart-vazao.svg" ratio="520/240" label="Vazão instantânea numa janela de 4 h contra dois tetos: 45 L/s outorgado e 38 L/s permitido sob restrição, com um pico de 53 L/s acima de ambos" style={{ marginTop: 10 }} />
                  <div className="muted" style={{ fontSize: 11.5, marginTop: 8 }}>O <b>outorgado</b> é o limite do ato de outorga; o <b>permitido</b> é o limite vigente sob regra de restrição (estiagem, conflito de uso) e pode ficar abaixo dele. Enquanto a restrição vigorar, a conformidade do dia é verificada contra o <b>permitido</b>.</div>
                </Card>

                {/* compact limit-set status, now including the restriction-driven ceiling */}
                <Card style={{ marginTop: 12, padding: 14 }}>
                  <b style={{ fontSize: 13, color: 'var(--ink)' }}>Limites da outorga e restrição</b>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12.5 }}>Vazão máx. outorgada</span><span className="pill warn">pico 53 / teto 45</span></div>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12.5 }}>Vazão permitida (restrição)</span><span className="pill warn">38 L/s · estiagem</span></div>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12.5 }}>Volume anual</span><span className="pill label">proj. 116%</span></div>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12.5 }}>Volume diário</span><span className="pill ok">conforme ao permitido</span></div>
                </Card>

                {/* transmission health, user-visible: received vs expected and failure rate vs tolerance */}
                <Card style={{ marginTop: 12, padding: 14 }}>
                  <Row style={{ justifyContent: 'space-between' }}><b style={{ fontSize: 13, color: 'var(--ink)' }}>Equipamento</b><span className="pill ok">Transmitindo</span></Row>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12.5 }}>ID do medidor</span><span className="mono" style={{ fontSize: 12.5 }}>SDC-R-4471</span></div>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12.5 }}>Recebidas × esperadas (30 d)</span><span className="mono" style={{ fontSize: 12.5 }}>2.840 / 2.880</span></div>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12.5 }}>Falhas de transmissão</span><span className="pill ok">1,4% · tolerância 5%</span></div>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12.5 }}>Fonte</span><span className="mono" style={{ fontSize: 12.5 }}>Superficial</span></div>
                  <div className="muted" style={{ fontSize: 11, marginTop: 6 }}>Esta captação tem <b>2 medidores ativos</b>; o painel acompanha cada equipamento pela própria série. O outro: SDC-R-4472, também transmitindo.</div>
                </Card>
              </PScroll>
              <AppTabBar active="captacao" />
              <HomeBar />
            </Phone>
            <PhoneLabel>Estado A · transmitindo · restrição de estiagem vigente</PhoneLabel>
            <Note style={{ marginTop: 12, fontSize: 12, maxWidth: 360 }}>A tolerância de falhas é um <b>parâmetro operacional</b> da interligação, não uma constante da tela. Recebidas × esperadas e o percentual de falhas ficam visíveis ao usuário, que é quem responde pela transmissão do equipamento.</Note>
          </div>

          {/* ESTADO B - contingencia: transmission failing -> manual declaration path stays open */}
          <div>
            <Phone>
              <Notch />
              <StatusBar right="▰▰▱ 4G ▮" />
              <PScroll>
                <AppBar title="Captação" back />

                {/* contingency banner: visible instruction + cta into the common self-declaration flow */}
                <Card style={{ padding: 14 }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <b style={{ fontSize: 13.5, color: 'var(--ink)' }}>Transmissão interrompida</b>
                    <Pill variant="bad">sem recepção</Pill>
                  </Row>
                  <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>Última leitura recebida em <span className="mono">08/06 · 14h10</span>. Enquanto a transmissão não se restabelece, <b>declare manualmente</b> as leituras pelo aplicativo: a obrigação de declarar permanece, e a declaração manual cobre o período sem dados.</div>
                  <Btn block to="/app/autodeclaracao" style={{ marginTop: 10 }}>Declarar manualmente →</Btn>
                </Card>

                {/* failure report, the sidecc-r falhas view brought to the user side */}
                <Card style={{ marginTop: 12, padding: 14 }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'baseline' }}><b style={{ fontSize: 13, color: 'var(--ink)' }}>Falhas de transmissão</b><span className="mono" style={{ fontSize: 11 }}>30 dias</span></Row>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12.5 }}>Recebidas × esperadas</span><span className="mono" style={{ fontSize: 12.5 }}>2.611 / 2.880</span></div>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12.5 }}>Falhas</span><span className="pill bad">9,3% · acima da tolerância (5%)</span></div>
                  <Meter variant="bad" value="91%" style={{ marginTop: 8 }} />
                  <Row style={{ justifyContent: 'space-between', marginTop: 6 }}><small className="mono faint">recepção 90,7%</small><small className="mono faint">meta ≥ 95%</small></Row>
                  <div className="muted" style={{ fontSize: 11.5, marginTop: 8 }}>O período sem recepção gera lacuna na série. A lacuna não some: ou é coberta por declaração manual, ou vira apontamento de qualidade do dado.</div>
                </Card>

                {/* equipment block in the failing state */}
                <Card style={{ marginTop: 12, padding: 14 }}>
                  <Row style={{ justifyContent: 'space-between' }}><b style={{ fontSize: 13, color: 'var(--ink)' }}>Equipamento</b><span className="pill bad">Falha de transmissão</span></Row>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12.5 }}>ID do medidor</span><span className="mono" style={{ fontSize: 12.5 }}>SDC-R-4471</span></div>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12.5 }}>Outorga</span><span className="mono" style={{ fontSize: 12.5 }}>OUT-07-2024-001234</span></div>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12.5 }}>Última recepção</span><span className="mono" style={{ fontSize: 12.5 }}>08/06 · 14h10</span></div>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12.5 }}>Fonte</span><span className="mono" style={{ fontSize: 12.5 }}>Superficial</span></div>
                </Card>

                <Btn block sub to="/app/autodeclaracao" style={{ marginTop: 12 }}>Abrir autodeclaração →</Btn>
              </PScroll>
              <AppTabBar active="captacao" />
              <HomeBar />
            </Phone>
            <PhoneLabel>Estado B · contingência · declarar manualmente</PhoneLabel>
            <Note style={{ marginTop: 12, fontSize: 12, maxWidth: 360 }}>O roteamento por porte (Faixa A abre a telemetria) <b>não bloqueia</b> a autodeclaração: na falha de transmissão, o usuário de telemetria declara manualmente pelo fluxo comum enquanto a transmissão não se restabelece.</Note>
          </div>

        </div>

        <Note style={{ maxWidth: 760, margin: '22px auto 0' }}>
          O <b>volume</b> vem primeiro porque é o que o grande usuário enxerga no dia a dia e o que ele controla. O burn-down separa <b>tendência</b> (orçamento do ano) do <b>momento</b> (pico instantâneo): são escalas diferentes e não precisam bater entre si. A terceira série, o <b>permitido</b>, entra nas duas escalas: quando uma regra de restrição vigora, o limite que vale é o permitido, e o badge <b>Estado da vazão</b> avisa o usuário de que o teto do dia está abaixo do teto da outorga.
        </Note>

        <Note style={{ maxWidth: 760, margin: '14px auto 0' }}>
          Os dois apontamentos abertos têm naturezas distintas. O pico é uma <b>exceção</b>: o sistema detectou, atribuiu grau e pede justificativa em prazo, sem presumir infração, e a exceção fica aberta até a resposta. O orçamento em risco é um <b>sinal de gestão</b>: nada foi excedido, é um aviso para reduzir o ritmo e ele se baixa sozinho quando a projeção volta ao limite. Um sinal de gestão não recebe grau; a <b>exceção</b> recebe (aqui, média). Se a exceção não for tratada, pode evoluir para <b>ato administrativo</b>, que aí corre rito próprio.
        </Note>

        <Note style={{ maxWidth: 760, margin: '14px auto 0', fontSize: 12.5 }}>
          A contingência é assimétrica de propósito: o sistema <b>instrui</b> e abre o caminho, o outorgado <b>declara</b>; quem dispõe sobre a lacuna (aceitar a cobertura manual, abrir apontamento de qualidade do dado) é o gestor. A declaração manual feita na contingência segue as mesmas validações da autodeclaração comum e entra na mesma trilha de auditoria; restabelecida a transmissão, as séries são reconciliadas sem apagar o que foi declarado.
        </Note>
      </div>
    </>
  )
}
