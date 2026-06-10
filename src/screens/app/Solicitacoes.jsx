import { Link } from 'react-router-dom'
import { DraftBanner, Phone, Notch, StatusBar, PScroll, AppBar, AppTabBar, HomeBar, PhoneLabel } from '../../components/shell.jsx'
import { Card, Pill, Btn, Meter, Note, Panel, Body, Row, Sp } from '../../components/ui.jsx'

export default function Solicitacoes() {
  return (
    <>
      <DraftBanner tag="APP · 06" title="Solicitações e vencimento" />

      <div className="wrap">
        <Note style={{ maxWidth: 760, margin: '0 auto 22px' }}>
          <b>O lado temporal da outorga.</b> A outorga vence, renova-se e perece por calendário, e não por volume. A tela lidera pelo vencimento próximo, com a renovação feita antes da data, e abre o catálogo de solicitações que o outorgado pode protocolar, cada uma com o seu estado. O catálogo cobre três famílias: os pedidos sobre a <b>outorga</b> (renovação, ampliação, transferência…), os pedidos sobre o <b>equipamento</b> (inclusão, troca e desativação de medidor) e os pedidos sobre a <b>rotina declaratória</b> (justificativa antecipada de ausência, interligação à telemetria).
        </Note>

        <div className="phone-stage" style={{ justifyContent: 'center' }}>

          {/* PHONE 1: catalog of request types + in-progress states */}
          <div>
            <Phone>
              <Notch />
              <StatusBar right="▰▰▰ 5G ▮" />
              <PScroll>
                <AppBar title="Solicitações" back="/app/painel" />

                {/* LEAD: vencimento próximo (inspirado no caso 07-0830) */}
                <Card style={{ padding: 14 }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span className="eyebrow">Validade da outorga</span>
                    <Pill variant="warn">calendário</Pill>
                  </Row>
                  <Row style={{ alignItems: 'baseline', gap: 8, marginTop: 8 }}>
                    <div className="mono" style={{ fontSize: 22, color: 'var(--ink)' }}>vence em 40 dias</div>
                  </Row>
                  <Meter variant="warn" value="78%" style={{ marginTop: 10 }} />
                  <Row style={{ justifyContent: 'space-between', marginTop: 6 }}>
                    <small className="mono faint">hoje 07/06</small>
                    <small className="mono">vencimento 17/07</small>
                  </Row>
                  <Btn block lg style={{ marginTop: 12 }}>Renovar outorga →</Btn>
                </Card>

                {/* AFFORDANCE: nova solicitação */}
                <Btn block style={{ marginTop: 14 }}>+ Nova solicitação</Btn>

                {/* CATÁLOGO 1/3: pedidos sobre a outorga */}
                <Panel style={{ marginTop: 14 }} header="Sobre sua outorga">
                  <Body>
                    <div className="list">

                      <a className="lrow" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                        <div className="lr-top"><span className="lr-title">Renovação</span><span className="pill warn">a fazer · vence em 40 dias</span></div>
                        <div className="lr-sub">Prorrogar a validade antes do vencimento (17/07).</div>
                      </a>

                      <a className="lrow" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                        <div className="lr-top"><span className="lr-title">Ampliação</span><span className="pill label">disponível</span></div>
                        <div className="lr-sub">Pedir aumento de vazão ou volume outorgado.</div>
                      </a>

                      <a className="lrow" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                        <div className="lr-top"><span className="lr-title">Redução</span><span className="pill label">disponível</span></div>
                        <div className="lr-sub">Diminuir o volume outorgado conforme o uso real.</div>
                      </a>

                      <a className="lrow" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                        <div className="lr-top"><span className="lr-title">Transferência</span><span className="pill label">disponível</span></div>
                        <div className="lr-sub">Transferir a titularidade da outorga.</div>
                      </a>

                      <a className="lrow" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                        <div className="lr-top"><span className="lr-title">Dispensa</span><span className="pill label">disponível</span></div>
                        <div className="lr-sub">Requerer dispensa de outorga para uso insignificante.</div>
                      </a>

                      <a className="lrow" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                        <div className="lr-top"><span className="lr-title">Desativação</span><span className="pill label">disponível</span></div>
                        <div className="lr-sub">Encerrar o uso e baixar a outorga (evita perecimento por inércia).</div>
                      </a>

                    </div>
                  </Body>
                </Panel>

                {/* CATÁLOGO 2/3: pedidos sobre o equipamento e a rotina declaratória */}
                <Panel style={{ marginTop: 14 }} header="Sobre medição e declaração">
                  <Body>
                    <div className="list">

                      <Link className="lrow" to="/app/medidor" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                        <div className="lr-top"><span className="lr-title">Medidor · inclusão, troca, desativação</span><span className="pill label">equipamento</span></div>
                        <div className="lr-sub">Cadastrar um novo medidor na captação, substituir ou desativar um existente.</div>
                      </Link>

                      <a className="lrow" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                        <div className="lr-top"><span className="lr-title">Justificativa de ausência de declaração</span><span className="pill label">antecipada</span></div>
                        <div className="lr-sub">Avisar, antes do período, que não haverá captação (paralisação total, férias coletivas, manutenção).</div>
                      </a>

                      <a className="lrow" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                        <div className="lr-top"><span className="lr-title">Interligação à telemetria</span><span className="pill label">COT-R</span></div>
                        <div className="lr-sub">Protocolar a proposta técnica de transmissão e ligar o ponto à telemetria.</div>
                      </a>

                    </div>
                  </Body>
                </Panel>

                {/* ESTADO: pedidos em andamento */}
                <Panel style={{ marginTop: 14 }} header={<>Em andamento <Sp /><Pill variant="label">2</Pill></>}>
                  <Body>
                    <div className="list">
                      <a className="lrow" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                        <div className="lr-top"><span className="lr-title">Redução de volume anual</span><span className="pill label">em análise</span></div>
                        <div className="lr-sub">Protocolada em 12/05 · aguardando o gestor.</div>
                      </a>
                      <a className="lrow" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                        <div className="lr-top"><span className="lr-title">Interligação à telemetria</span><span className="pill warn">proposta técnica até 27/06</span></div>
                        <div className="lr-sub">Ofício recebido em 28/05 · proposta de transmissão em elaboração.</div>
                      </a>
                    </div>
                  </Body>
                </Panel>

                {/* COT-R onboarding: the rite as a timeline, current step highlighted */}
                <Panel style={{ marginTop: 14 }} header="Interligação à telemetria · rito COT-R">
                  <Body>
                    <div className="list">
                      <div className="lrow">
                        <div className="lr-top"><span className="lr-title">Ofício</span><span className="mono faint" style={{ fontSize: 11 }}>28/05</span></div>
                        <div className="lr-sub">A SP-Águas oficia o outorgado a interligar o ponto.</div>
                      </div>
                      <div className="lrow" style={{ background: 'var(--act-soft)', margin: '0 -14px', paddingLeft: 14, paddingRight: 14 }}>
                        <div className="lr-top"><span className="lr-title">Proposta técnica de transmissão</span><span className="pill warn" style={{ fontSize: 10.5 }}>30 dias</span></div>
                        <div className="lr-sub">Você descreve equipamentos e meio de transmissão; é esta a solicitação que se protocola aqui.</div>
                      </div>
                      <div className="lrow">
                        <div className="lr-top"><span className="lr-title faint">Análise e deferimento</span><span className="mono faint" style={{ fontSize: 11 }}>a seguir</span></div>
                        <div className="lr-sub faint">O gestor analisa a proposta e a defere ou pede ajuste.</div>
                      </div>
                      <div className="lrow">
                        <div className="lr-top"><span className="lr-title faint">Login experimental</span><span className="mono faint" style={{ fontSize: 11 }}>a seguir</span></div>
                        <div className="lr-sub faint">Transmissão em teste, validada contra as leituras locais.</div>
                      </div>
                      <div className="lrow">
                        <div className="lr-top"><span className="lr-title faint">Login operacional</span><span className="mono faint" style={{ fontSize: 11 }}>a seguir</span></div>
                        <div className="lr-sub faint">O ponto passa a transmitir em caráter definitivo.</div>
                      </div>
                    </div>
                  </Body>
                </Panel>
              </PScroll>
              <AppTabBar active="inicio" />
              <HomeBar />
            </Phone>
            <PhoneLabel>Solicitações · catálogo de pedidos, cada um com estado</PhoneLabel>

            <Note style={{ maxWidth: 340, margin: '16px auto 0', fontSize: 12 }}>
              A interligação à telemetria segue o rito do <b>COT-R</b>: ofício, proposta técnica em 30 dias, análise, deferimento, login experimental e login operacional. O que o outorgado protocola é a <b>proposta técnica de transmissão</b>; os demais passos são atos do gestor que o aplicativo apenas acompanha.
            </Note>
          </div>

          {/* PHONE 2: medidor lifecycle request (3.1.a) */}
          <div>
            <Phone>
              <Notch />
              <StatusBar right="▰▰▰ 5G ▮" />
              <PScroll>
                <AppBar title="Solicitação · Medidor" back />

                <Card style={{ padding: 14 }}>
                  <div className="muted" style={{ fontSize: 12 }}>Outorga · ponto</div>
                  <div className="mono" style={{ fontSize: 13, color: 'var(--ink)' }}>OUT-07-2024-001234 · 07-1001 · Indústria Cubatão S/A</div>
                </Card>

                {/* the three verbs of the equipment lifecycle */}
                <div className="seg" style={{ marginTop: 14 }}>
                  <span className="s">Inclusão</span>
                  <span className="s on">Troca</span>
                  <span className="s">Desativação</span>
                </div>

                {/* current equipment set: one captação, more than one medidor */}
                <Panel style={{ marginTop: 14 }} header={<>Medidores desta captação <Sp /><Pill variant="label">2</Pill></>}>
                  <Body>
                    <div className="list">
                      <div className="lrow">
                        <div className="lr-top"><span className="lr-title mono">HID-88412</span><Pill variant="ok">ativo</Pill></div>
                        <div className="lr-sub">Hidrômetro · incluído em 03/02/2023 · selecionado para troca</div>
                      </div>
                      <div className="lrow">
                        <div className="lr-top"><span className="lr-title mono faint">HID-71240</span><Pill variant="label">desativado</Pill></div>
                        <div className="lr-sub faint">Hidrômetro · incluído em 15/01/2019 · desativado em 03/02/2023</div>
                      </div>
                    </div>
                  </Body>
                </Panel>

                {/* sidecc equipment fields for the incoming medidor */}
                <div className="stack" style={{ marginTop: 14 }}>
                  <div className="eyebrow">Novo medidor</div>
                  <label className="field"><span>Tipo</span>
                    <div className="input"><span style={{ color: 'var(--ink)' }}>Hidrômetro</span><span className="sp" style={{ flex: 1 }} />▾</div></label>
                  <label className="field"><span>Unidade de medida</span>
                    <div className="input"><span style={{ color: 'var(--ink)' }}>m³</span><span className="sp" style={{ flex: 1 }} />▾</div></label>
                  <label className="field"><span>Número de série</span>
                    <div className="input mono" style={{ color: 'var(--ink)' }}>B24-009731</div></label>
                  <label className="field"><span>Fabricante</span>
                    <div className="input" style={{ color: 'var(--ink)' }}>Hidromedição Brasil</div></label>
                  <label className="field"><span>Modelo</span>
                    <div className="input mono" style={{ color: 'var(--ink)' }}>WS-50 Woltmann</div></label>
                  <label className="field"><span>Diâmetro (mm)</span>
                    <div className="input mono" style={{ color: 'var(--ink)' }}>50</div></label>
                  <label className="field"><span>Data de inclusão</span>
                    <div className="input"><span className="mono" style={{ color: 'var(--ink)' }}>10/06/2026</span><span className="sp" style={{ flex: 1 }} />📅</div></label>
                </div>

                {/* swap closes one equipment and opens another, with closing/opening readings */}
                <Card style={{ marginTop: 14, padding: 12 }}>
                  <b style={{ fontSize: 13, color: 'var(--ink)' }}>Efeito da troca</b>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12 }}>HID-88412 recebe</span><span className="mono" style={{ fontSize: 12 }}>data de desativação + leitura final</span></div>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12 }}>B24-009731 recebe</span><span className="mono" style={{ fontSize: 12 }}>data de inclusão + leitura inicial</span></div>
                </Card>

                <Btn block lg style={{ marginTop: 14 }}>Protocolar solicitação →</Btn>
              </PScroll>
              <AppTabBar active="inicio" />
              <HomeBar />
            </Phone>
            <PhoneLabel>Medidor · inclusão, troca e desativação de equipamento</PhoneLabel>

            <Note style={{ maxWidth: 340, margin: '16px auto 0', fontSize: 12 }}>
              Uma captação pode ter <b>mais de um medidor</b>, e cada equipamento carrega as próprias datas de inclusão e desativação; nada se sobrescreve. A troca não apaga o medidor antigo: desativa um e inclui o outro, com as leituras de fechamento e abertura, e é isso que mantém a série de volumes contínua e auditável.
            </Note>
          </div>

          {/* PHONE 3: justificativa antecipada de ausência (3.1.c) */}
          <div>
            <Phone>
              <Notch />
              <StatusBar right="▰▰▰ 5G ▮" />
              <PScroll>
                <AppBar title="Justificativa de ausência" back />

                <div className="seg">
                  <span className="s on">Nova justificativa</span>
                  <span className="s">Histórico</span>
                </div>

                {/* the differentiator: registered BEFORE the silent period */}
                <Card style={{ marginTop: 14, padding: 12 }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <b style={{ fontSize: 13, color: 'var(--ink)' }}>Registro antecipado</b>
                    <Pill variant="ok">antes do período</Pill>
                  </Row>
                  <div className="muted" style={{ fontSize: 11.5, marginTop: 4 }}>hoje 07/06 · o período declarado começa em 01/07</div>
                </Card>

                <div className="stack" style={{ marginTop: 14 }}>
                  <label className="field"><span>Início do período</span>
                    <div className="input"><span className="mono" style={{ color: 'var(--ink)' }}>01/07/2026</span><span className="sp" style={{ flex: 1 }} />📅</div></label>
                  <label className="field"><span>Fim do período</span>
                    <div className="input"><span className="mono" style={{ color: 'var(--ink)' }}>31/07/2026</span><span className="sp" style={{ flex: 1 }} />📅</div></label>

                  <div className="field"><span>Motivo</span>
                    <div className="list">
                      <div className="lrow"><div className="lr-top"><span className="lr-title">Paralisação total</span><span className="mono faint">○</span></div></div>
                      <div className="lrow"><div className="lr-top"><span className="lr-title">Férias coletivas</span><Pill variant="act">●</Pill></div></div>
                      <div className="lrow"><div className="lr-top"><span className="lr-title">Manutenção</span><span className="mono faint">○</span></div></div>
                    </div>
                  </div>

                  <label className="field"><span>Observações (opcional)</span>
                    <div className="input tall faint">Ex.: parada programada da linha de produção…</div></label>
                </div>

                <Btn block lg style={{ marginTop: 14 }}>Registrar justificativa →</Btn>

                {/* the histórico tab content, sketched inline */}
                <Panel style={{ marginTop: 16 }} header={<>Histórico de justificativas <Sp /><Pill variant="label">3</Pill></>}>
                  <Body>
                    <div className="list">
                      <div className="lrow">
                        <div className="lr-top"><span className="lr-title">01/07 a 31/07/2026 · férias coletivas</span><Pill variant="warn">registrada · aguarda período</Pill></div>
                        <div className="lr-sub">Registrada em 07/06, antes do início do período.</div>
                      </div>
                      <div className="lrow">
                        <div className="lr-top"><span className="lr-title">10/01 a 24/01/2026 · manutenção</span><Pill variant="ok">acatada</Pill></div>
                        <div className="lr-sub">Substituição da adutora · acatada pelo gestor em 28/01.</div>
                      </div>
                      <div className="lrow">
                        <div className="lr-top"><span className="lr-title">01/07 a 15/07/2025 · paralisação total</span><Pill variant="ok">acatada</Pill></div>
                        <div className="lr-sub">Parada da planta · acatada pelo gestor em 21/07/2025.</div>
                      </div>
                    </div>
                  </Body>
                </Panel>
              </PScroll>
              <AppTabBar active="inicio" />
              <HomeBar />
            </Phone>
            <PhoneLabel>Justificativa antecipada · período sem captação avisado antes</PhoneLabel>

            <Note style={{ maxWidth: 340, margin: '16px auto 0', fontSize: 12 }}>
              A justificativa antecipada inverte o fluxo do apontamento: em vez de responder a uma omissão já detectada, o outorgado avisa <b>antes</b> que não haverá captação nem declaração no período. O período avisado não gera exceção de declaração ausente; o acatamento, porém, é ato do gestor, e a justificativa fica no histórico mesmo quando não acatada.
            </Note>
          </div>

        </div>

        <Note style={{ maxWidth: 760, margin: '22px auto 0' }}>
          Obrigações dirigidas por calendário: o pedido de <b>renovação</b> deve ser protocolado <b>antes</b> do vencimento. A outorga sem uso <b>perece em 3 anos</b>; se o usuário não capta mais, vale registrar a desativação para não perder o direito por inércia. A justificativa antecipada de ausência cobre o caso intermediário: o uso continua, mas há um período programado sem captação.
        </Note>

        <Note style={{ maxWidth: 760, margin: '14px auto 0' }}>
          O outorgado <b>protocola</b> a solicitação; o deferimento é do gestor. A renovação tem efeito de silêncio positivo: se o gestor silenciar por 30 dias após o pedido tempestivo, renova-se automaticamente. Os demais tipos não têm silêncio positivo: medidor, justificativa e proposta técnica aguardam o despacho, e cada despacho fica datado na trilha.
        </Note>
      </div>
    </>
  )
}
