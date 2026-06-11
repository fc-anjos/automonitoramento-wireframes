import { DraftBanner, Phone, Notch, StatusBar, PScroll, AppBar, AppTabBar, HomeBar, PhoneLabel } from '../../components/shell.jsx'
import { Card, Pill, Btn, Meter, Note, Panel, Body, Row } from '../../components/ui.jsx'

// the outorgado side of the processo sancionador. two moments of the same
// processo: left phone = auto lavrado + ciência + defesa em prazo; right
// phone = decisão publicada + recurso + cumprimento (guia + correção).
// lavrar, julgar and encerrar are gestor verbs and never appear here.
export default function Defesa() {
  return (
    <>
      <DraftBanner tag="APP · 08" title="Defesa e recurso · visão do outorgado" />

      <div className="wrap">
        <Note style={{ maxWidth: 780, margin: '0 auto 22px' }}>
          <b>O processo sancionador, do lado de quem responde.</b> Quando o gestor lavra o auto de infração, o sistema cria um <b>processo vinculado</b>, com número, linha do tempo e prazos próprios; o apontamento de origem permanece como evidência, congelada na lavratura. Aqui o outorgado dispõe apenas dos atos de resposta: visualiza o auto, toma ciência (marco do prazo), <b>apresenta defesa</b> com anexos e protocolo, lê a decisão fundamentada, <b>interpõe recurso</b> dentro do prazo e comprova o cumprimento. <b>Lavrar, julgar e encerrar são atos do gestor</b> e não aparecem neste aplicativo.
        </Note>

        <div className="phone-stage" style={{ justifyContent: 'center' }}>

          {/* MOMENT 1: auto lavrado, ciência tomada, defesa em prazo */}
          <div>
            <Phone>
              <Notch />
              <StatusBar right="▰▰▰ 5G ▮" />
              <PScroll>
                <AppBar title="Processo" back="/app/apontamentos" />

                {/* HEADER: o processo e sua tipagem */}
                <Card style={{ padding: 14 }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                    <span className="eyebrow">PAS-07-2026-0042</span>
                    <Pill variant="label" style={{ fontSize: 10.5 }}>Ato administrativo</Pill>
                  </Row>
                  <h2 style={{ fontSize: 17, marginTop: 6 }}>Auto de infração · indício de fraude na medição</h2>
                  <Row style={{ gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
                    <Pill variant="bad">grau gravíssima</Pill>
                    <Pill variant="warn">fase Em defesa</Pill>
                    <Pill variant="label">multa simples</Pill>
                  </Row>
                  <div className="muted" style={{ fontSize: 12.5, marginTop: 10 }}>Indústria Química Cubatão · ponto 07-1100 · OUT-07-2023-011001 · lavrado em 02/06</div>
                </Card>

                <Btn block style={{ marginTop: 12 }}>Visualizar o auto (PDF)</Btn>

                {/* TIMELINE: rito do processo, fase atual em destaque */}
                <Panel style={{ marginTop: 14 }} header={<>Andamento do processo</>}>
                  <Body>
                    <div className="list">
                      <div className="lrow">
                        <div className="lr-top"><span className="lr-title">Auto lavrado</span><span className="mono faint" style={{ fontSize: 11 }}>02/06</span></div>
                        <div className="lr-sub">Ato do gestor · evidência congelada na lavratura.</div>
                      </div>
                      <div className="lrow">
                        <div className="lr-top"><span className="lr-title">Ciência</span><span className="mono faint" style={{ fontSize: 11 }}>06/06 · marco do prazo</span></div>
                        <div className="lr-sub">A contagem do prazo de defesa começou aqui.</div>
                      </div>
                      <div className="lrow" style={{ background: 'var(--act-soft)', margin: '0 -14px', paddingLeft: 14, paddingRight: 14 }}>
                        <div className="lr-top"><span className="lr-title">Em defesa · agora</span><span className="pill warn" style={{ fontSize: 10.5 }}>fase atual</span></div>
                        <div className="lr-sub">Você pode apresentar defesa com anexos; o envio gera protocolo.</div>
                      </div>
                      <div className="lrow">
                        <div className="lr-top"><span className="lr-title faint">Julgamento · 1ª instância</span><span className="mono faint" style={{ fontSize: 11 }}>a seguir</span></div>
                        <div className="lr-sub faint">Decisão fundamentada · ato do gestor.</div>
                      </div>
                      <div className="lrow">
                        <div className="lr-top"><span className="lr-title faint">Recurso · 2ª instância</span><span className="mono faint" style={{ fontSize: 11 }}>a seguir</span></div>
                        <div className="lr-sub faint">Cabível no prazo · sem efeito suspensivo.</div>
                      </div>
                      <div className="lrow">
                        <div className="lr-top"><span className="lr-title faint">Cumprimento</span><span className="mono faint" style={{ fontSize: 11 }}>a seguir</span></div>
                        <div className="lr-sub faint">Multa quitada e irregularidade corrigida · encerramento é ato do gestor.</div>
                      </div>
                    </div>
                  </Body>
                </Panel>

                {/* DEADLINE COUNTER: defesa */}
                <Card style={{ marginTop: 12, padding: 14 }}>
                  <div className="muted" style={{ fontSize: 12 }}>Prazo de defesa</div>
                  <Row style={{ alignItems: 'baseline', gap: 8, marginTop: 2 }}>
                    <div className="mono" style={{ fontSize: 22, color: 'var(--ink)' }}>defesa até 26/06</div>
                  </Row>
                  <Meter variant="warn" value="20%" style={{ marginTop: 10 }} />
                  <Row style={{ justifyContent: 'space-between', marginTop: 6 }}>
                    <small className="mono faint">ciência em 06/06</small>
                    <small className="mono">prazo vigente do rito</small>
                  </Row>
                </Card>

                {/* VERBS OF THE OUTORGADO */}
                <div style={{ marginTop: 14 }}>
                  <div className="eyebrow" style={{ marginBottom: 8 }}>O que você pode fazer</div>
                  <Btn block lg style={{ marginBottom: 10 }}>Apresentar defesa</Btn>
                  <Btn block sub>Anexar documento</Btn>
                  <Btn block sub to="/app/apontamento" style={{ marginTop: 10 }}>Ver o apontamento de origem</Btn>
                </div>
              </PScroll>
              <AppTabBar active="apontamentos" />
              <HomeBar />
            </Phone>
            <PhoneLabel>Auto e defesa · a ciência abre o prazo</PhoneLabel>

            <Note style={{ maxWidth: 340, margin: '16px auto 0' }}>
              O prazo de defesa corre a partir da <b>ciência</b>, e o envio da defesa devolve um <b>protocolo com recibo</b>, que fica no histórico do processo. O pacote de evidência foi <b>congelado na lavratura</b>.
            </Note>
          </div>

          {/* MOMENT 2: decisão publicada, recurso em prazo, cumprimento em tempo real */}
          <div>
            <Phone>
              <Notch />
              <StatusBar right="▰▰▱ 4G ▮" />
              <PScroll>
                <AppBar title="Decisão e cumprimento" back />
                <div className="muted" style={{ fontSize: 12, margin: '-6px 0 12px' }}>PAS-07-2026-0042 · Indústria Química Cubatão · ponto 07-1100</div>

                {/* DECISION: fundamentada, 1ª instância */}
                <Card style={{ padding: 14 }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <b style={{ fontSize: 13, color: 'var(--ink)' }}>Decisão de 1ª instância</b>
                    <Pill variant="bad">defesa indeferida</Pill>
                  </Row>
                  <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>Multa mantida · decisão fundamentada publicada em 14/07</div>
                  <Btn block sub style={{ marginTop: 10 }}>Ler a decisão fundamentada (PDF)</Btn>
                </Card>

                {/* WARNING: recurso sem efeito suspensivo */}
                <Card style={{ marginTop: 12, padding: 12, borderColor: 'var(--bad)' }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <b style={{ fontSize: 13, color: 'var(--ink)' }}>O recurso não suspende a penalidade</b>
                    <Pill variant="bad">atenção</Pill>
                  </Row>
                  <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>A penalidade vige enquanto o recurso é decidido: a guia segue exigível e a correção segue devida.</div>
                </Card>

                {/* DEADLINE COUNTER: recurso */}
                <Card style={{ marginTop: 12, padding: 14 }}>
                  <div className="muted" style={{ fontSize: 12 }}>Prazo de recurso</div>
                  <Row style={{ alignItems: 'baseline', gap: 8, marginTop: 2 }}>
                    <div className="mono" style={{ fontSize: 22, color: 'var(--ink)' }}>recurso até 03/08</div>
                  </Row>
                  <Meter variant="warn" value="35%" style={{ marginTop: 10 }} />
                  <Row style={{ justifyContent: 'space-between', marginTop: 6 }}>
                    <small className="mono faint">decisão em 14/07</small>
                    <small className="mono">prazo vigente do rito</small>
                  </Row>
                  <Btn block lg style={{ marginTop: 12 }}>Interpor recurso</Btn>
                </Card>

                {/* CUMPRIMENTO: guia em tempo real + correção, os dois lado a lado */}
                <Panel style={{ marginTop: 14 }} header={<>Cumprimento · multa e correção<span className="sp" /><Pill variant="warn" style={{ fontSize: 10.5 }}>pendente</Pill></>}>
                  <Body>
                    <div className="mrow">
                      <span className="ico"><i className="mk warn" /></span>
                      <div className="msp">
                        <b style={{ fontSize: 13, color: 'var(--ink)' }}>Guia de recolhimento · multa</b>
                        <div className="muted" style={{ fontSize: 11.5 }}>GRE-07-2026-0090 · emitida em 15/07 · vence 14/08</div>
                        <div className="faint" style={{ fontSize: 11 }}>situação atualizada por conciliação bancária</div>
                      </div>
                      <Pill variant="warn" style={{ fontSize: 10.5 }}>em aberto</Pill>
                    </div>
                    <Btn block sub to="/app/multas" style={{ margin: '8px 0 12px' }}>Abrir guia · boleto e PIX</Btn>

                    <div className="mrow">
                      <span className="ico"><i className="mk warn" /></span>
                      <div className="msp">
                        <b style={{ fontSize: 13, color: 'var(--ink)' }}>Correção da irregularidade</b>
                        <div className="muted" style={{ fontSize: 11.5 }}>Regularizar a medição do ponto 07-1100 e comprovar nos autos</div>
                      </div>
                      <Pill variant="warn" style={{ fontSize: 10.5 }}>pendente</Pill>
                    </div>
                    <Btn block sub style={{ marginTop: 8 }}>Comprovar correção</Btn>
                  </Body>
                </Panel>

                <Note style={{ marginTop: 12, fontSize: 12 }}>
                  <b>Pagar a multa não encerra o processo</b> se a correção da irregularidade continuar pendente: o cumprimento exige <b>os dois</b>, quitação e correção comprovada. O encerramento é ato do gestor.
                </Note>

                {/* HISTÓRICO: recibos de cada ato do outorgado */}
                <div className="eyebrow" style={{ margin: '16px 0 6px' }}>Recibos do processo</div>
                <div className="mrow"><span className="ico">✓</span><div className="msp"><b style={{ fontSize: 13, color: 'var(--ink)' }}>Ciência do auto</b><div className="muted" style={{ fontSize: 11.5 }}>06/06 · 10:12 · recibo PDF</div></div><span className="faint">›</span></div>
                <div className="mrow"><span className="ico">✓</span><div className="msp"><b style={{ fontSize: 13, color: 'var(--ink)' }}>Defesa apresentada</b><div className="muted" style={{ fontSize: 11.5 }}>18/06 · 16:40 · protocolo DEF-07-2026-0042 · 3 anexos</div></div><span className="faint">›</span></div>
                <div className="mrow"><span className="ico faint">○</span><div className="msp"><b className="faint" style={{ fontSize: 13 }}>Recurso</b><div className="faint" style={{ fontSize: 11.5 }}>ao interpor, gera protocolo e recibo</div></div><span className="faint">›</span></div>
              </PScroll>
              <AppTabBar active="apontamentos" />
              <HomeBar />
            </Phone>
            <PhoneLabel>Decisão, recurso e cumprimento em tempo real</PhoneLabel>

            <Note style={{ maxWidth: 340, margin: '16px auto 0' }}>
              A situação da guia muda por <b>conciliação bancária</b>. Cada ato seu (ciência, defesa, recurso) devolve um <b>recibo</b> e entra na trilha de auditoria.
            </Note>
            <Note style={{ maxWidth: 340, margin: '12px auto 0', fontSize: 12 }}>
              Os verbos aqui são só os de quem responde. <b>Lavrar, julgar e encerrar</b> são atos do gestor e não aparecem neste app.
            </Note>
          </div>

        </div>
      </div>
    </>
  )
}
