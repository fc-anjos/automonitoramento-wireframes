import { DraftBanner, Phone, Notch, StatusBar, PScroll, AppBar, AppTabBar, HomeBar, PhoneLabel } from '../../components/shell.jsx'
import { Card, Pill, Btn, Meter, Note, Panel, Body, Row, Svg } from '../../components/ui.jsx'

export default function Apontamento() {
  return (
    <>
      <DraftBanner tag="APP · 05" title="Apontamento · visão do outorgado" />

      <div className="wrap">
        <Note style={{ maxWidth: 760, margin: '0 auto 22px' }}>
          <b>Um apontamento, do lado de quem responde.</b> A tela abre o pico de vazão do ponto 07-1001: cabeçalho com a tipagem (natureza, tipo, grau, fase), a linha do tempo das fases e a contagem de prazo. Trata-se de uma <b>exceção</b>: o sistema detectou e pede justificativa em prazo, sem presumir infração, e ela só se baixa por ato do gestor (diferente do sinal de gestão, que se resolve sozinho quando o ritmo cede). O outorgado dispõe apenas dos atos de resposta: pode tomar ciência, justificar, anexar documento e comprovar regularização, mas <b>não encerra</b> o apontamento.
        </Note>

        <div className="phone-stage" style={{ justifyContent: 'center' }}>
          <div>
            <Phone>
              <Notch />
              <StatusBar right="▰▰▰ 5G ▮" />
              <PScroll>
                <AppBar title="Apontamento" back="/app/painel" />

                {/* HEADER: tipagem completa do apontamento */}
                <Card style={{ padding: 14 }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                    <span className="eyebrow">Ponto 07-1001</span>
                    <Pill variant="label" style={{ fontSize: 10.5 }}>Exceção</Pill>
                  </Row>
                  <h2 style={{ fontSize: 17, marginTop: 6 }}>Pico de vazão acima do teto</h2>
                  <Row style={{ gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
                    <Pill variant="label">Volume</Pill>
                    <Pill variant="warn">grau média</Pill>
                    <Pill variant="warn">fase Notificada</Pill>
                  </Row>
                  <div className="muted" style={{ fontSize: 12.5, marginTop: 10 }}>Vazão máx. instantânea 45 L/s · pico 53 L/s (118%) em 04/06</div>
                </Card>

                {/* TIMELINE: fases da tramitação, com a fase atual e o marco da ciência */}
                <Panel style={{ marginTop: 14 }} header={<>Andamento</>}>
                  <Body>
                    <div className="list">
                      <div className="lrow">
                        <div className="lr-top"><span className="lr-title">Detectada</span><span className="mono faint" style={{ fontSize: 11 }}>04/06</span></div>
                        <div className="lr-sub">Telemetria registrou o pico acima do teto.</div>
                      </div>
                      <div className="lrow" style={{ background: 'var(--act-soft)', margin: '0 -14px', paddingLeft: 14, paddingRight: 14 }}>
                        <div className="lr-top"><span className="lr-title">Notificada · agora</span><span className="pill warn" style={{ fontSize: 10.5 }}>fase atual</span></div>
                        <div className="lr-sub">Você foi notificado e pode justificar o pico.</div>
                      </div>
                      <div className="lrow">
                        <div className="lr-top"><span className="lr-title">Ciência</span><span className="mono faint" style={{ fontSize: 11 }}>marco do prazo</span></div>
                        <div className="lr-sub">Ao tomar ciência, começa a contagem do prazo de resposta.</div>
                      </div>
                      <div className="lrow">
                        <div className="lr-top"><span className="lr-title faint">Em defesa / recurso</span><span className="mono faint" style={{ fontSize: 11 }}>a seguir</span></div>
                        <div className="lr-sub faint">Caso a justificativa não seja aceita.</div>
                      </div>
                      <div className="lrow">
                        <div className="lr-top"><span className="lr-title faint">Regularizada</span><span className="mono faint" style={{ fontSize: 11 }}>a seguir</span></div>
                        <div className="lr-sub faint">Encerramento é ato do gestor.</div>
                      </div>
                    </div>
                  </Body>
                </Panel>

                {/* DEADLINE COUNTER */}
                <Card style={{ marginTop: 12, padding: 14 }}>
                  <div className="muted" style={{ fontSize: 12 }}>Prazo de resposta</div>
                  <Row style={{ alignItems: 'baseline', gap: 8, marginTop: 2 }}>
                    <div className="mono" style={{ fontSize: 22, color: 'var(--ink)' }}>justificativa até 25/06</div>
                  </Row>
                  <Meter variant="warn" value="30%" style={{ marginTop: 10 }} />
                  <Row style={{ justifyContent: 'space-between', marginTop: 6 }}>
                    <small className="mono faint">ciência em 05/06</small>
                    <small className="mono">20 dias contados da ciência</small>
                  </Row>
                </Card>

                {/* EVIDENCE: reuse the vazão chart */}
                <Card style={{ marginTop: 14, padding: 14 }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'baseline' }}><div className="muted" style={{ fontSize: 12 }}>Evidência · vazão × teto</div><span className="mono" style={{ fontSize: 11 }}>janela 4 h</span></Row>
                  <Row style={{ alignItems: 'baseline', gap: 8, marginTop: 4 }}><div className="mono" style={{ fontSize: 17, color: 'var(--ink)' }}>pico 53 L/s</div><span className="muted" style={{ fontSize: 12 }}>teto 45 · 118%</span></Row>
                  <Svg src="wireframe-chart-vazao.svg" ratio="520/240" label="Vazão instantânea numa janela de 4 h, com um pico de 53 L/s acima do teto de 45 L/s" style={{ marginTop: 10 }} />
                </Card>

                {/* VERBS OF THE OUTORGADO */}
                <div style={{ marginTop: 14 }}>
                  <div className="eyebrow" style={{ marginBottom: 8 }}>O que você pode fazer</div>
                  <Btn block lg style={{ marginBottom: 10 }}>Tomar ciência</Btn>
                  <Btn block>Justificar o pico</Btn>
                  <Btn block sub style={{ marginTop: 10 }}>Anexar documento</Btn>
                  <Btn block sub style={{ marginTop: 10 }}>Comprovar regularização</Btn>
                </div>
              </PScroll>
              <AppTabBar active="apontamentos" />
              <HomeBar />
            </Phone>
            <PhoneLabel>Apontamento · o outorgado responde, não encerra</PhoneLabel>

            <Note style={{ maxWidth: 340, margin: '16px auto 0' }}>
              A contagem só começa quando você <b>toma ciência</b>: antes disso, o relógio do prazo não corre. Você pode responder (justificar, anexar documento, comprovar correção), mas o apontamento <b>não se encerra por sua ação</b>; quem dá baixa é o gestor, e tudo o que você enviar fica registrado.
            </Note>
            <Note style={{ maxWidth: 340, margin: '12px auto 0', fontSize: 12 }}>
              Os verbos aqui são só os de quem responde. <b>Notificar, classificar, lavrar auto, julgar e encerrar</b> são ações do gestor e não aparecem neste app.
            </Note>
          </div>
        </div>
      </div>
    </>
  )
}
