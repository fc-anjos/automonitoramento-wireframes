import { DraftBanner, Phone, Notch, StatusBar, PScroll, AppBar, AppTabBar, HomeBar, PhoneLabel } from '../../components/shell.jsx'
import { Card, Pill, Btn, Meter, Note, Panel, Body, Row, Sp } from '../../components/ui.jsx'

export default function Solicitacoes() {
  return (
    <>
      <DraftBanner tag="APP · 06" title="Solicitações e vencimento" />

      <div className="wrap">
        <Note style={{ maxWidth: 760, margin: '0 auto 22px' }}>
          <b>A dimensão temporal da outorga, do lado do outorgado.</b> A outorga vence, renova e perece por calendário, não por volume. A tela lidera pelo vencimento próximo (renovar antes da data) e abre o catálogo das solicitações que o outorgado pode protocolar sobre a própria outorga. Sem rigidez: é um CRUD de pedidos, cada um com seu estado.
        </Note>

        <div className="phone-stage" style={{ justifyContent: 'center' }}>
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

                {/* CATÁLOGO de solicitações possíveis, cada uma com estado */}
                <Panel style={{ marginTop: 14 }} header="Solicitações sobre sua outorga">
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

                {/* ESTADO: pedidos em andamento */}
                <Panel style={{ marginTop: 14 }} header={<>Em andamento <Sp /><Pill variant="label">1</Pill></>}>
                  <Body>
                    <div className="list">
                      <a className="lrow" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                        <div className="lr-top"><span className="lr-title">Redução de volume anual</span><span className="pill label">em análise</span></div>
                        <div className="lr-sub">Protocolada em 12/05 · aguardando o gestor.</div>
                      </a>
                    </div>
                  </Body>
                </Panel>
              </PScroll>
              <AppTabBar active="inicio" />
              <HomeBar />
            </Phone>
            <PhoneLabel>Solicitações · CRUD de pedidos sobre a outorga</PhoneLabel>
          </div>
        </div>

        <Note style={{ maxWidth: 760, margin: '22px auto 0' }}>
          Obrigações dirigidas por calendário: o pedido de <b>renovação</b> deve ser protocolado <b>antes</b> do vencimento. A outorga sem uso <b>perece em 3 anos</b>; se o usuário não capta mais, vale registrar a desativação para não perder o direito por inércia.
        </Note>

        <Note style={{ maxWidth: 760, margin: '14px auto 0' }}>
          O outorgado <b>protocola</b> a solicitação; o deferimento é do gestor. A renovação tem efeito de silêncio positivo: se o gestor silenciar por 30 dias após o pedido tempestivo, renova-se automaticamente.
        </Note>
      </div>
    </>
  )
}
