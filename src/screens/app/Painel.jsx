import { Link } from 'react-router-dom'
import { DraftBanner, Phone, Notch, StatusBar, PScroll, AppBar, AppTabBar, HomeBar, PhoneLabel } from '../../components/shell.jsx'
import { Card, Pill, Btn, Meter, Note, Row } from '../../components/ui.jsx'

export default function Painel() {
  return (
    <>
      <DraftBanner tag="APP · 01" title="Painel do outorgado" />

      <div className="wrap">
        <Note style={{ maxWidth: 760, margin: '0 auto 22px' }}>
          <b>O início resume a situação como uma fila de próximas ações.</b> Cada linha é um apontamento do usuário com o que falta fazer e até quando, e tocar a linha abre o apontamento (ou o calendário de solicitações). A natureza do apontamento define o comportamento: uma <b>exceção</b> aguarda justificativa em prazo; um <b>sinal de gestão</b> (projeção anual) entra mais leve, porque nada foi excedido ainda e a baixa é automática quando o ritmo cede. O grau (leve, média) só aparece quando há uma exceção em curso.
        </Note>

        <div className="phone-stage" style={{ justifyContent: 'center' }}>

          {/* ESTADO A - grande usuário (telemetria), o ponto-herói */}
          <div>
            <Phone>
              <Notch />
              <StatusBar right="▰▰▰ 5G ▮" />
              <PScroll>
                <AppBar title="Indústria Cubatão" menu />

                {/* identity + situation summary */}
                <Card style={{ padding: 14 }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="eyebrow">Outorga ativa · 07-1001</span>
                    <Pill variant="act">Faixa A</Pill>
                  </Row>
                  <div className="mono" style={{ fontSize: 13, color: 'var(--ink)', marginTop: 8 }}>OUT-07-2024-001234</div>
                  <div className="muted" style={{ fontSize: 12.5, marginTop: 2 }}>Indústria Cubatão S/A · Captação superficial</div>
                  <hr className="div" style={{ margin: '12px 0' }} />
                  <Row style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span className="muted" style={{ fontSize: 12 }}>Sua situação hoje</span>
                    <span className="mono faint" style={{ fontSize: 11 }}>07/06/2026</span>
                  </Row>
                  <Row style={{ gap: 8, marginTop: 8 }}>
                    <Pill variant="warn">1 ação no prazo</Pill>
                    <Pill variant="label">1 sinal de gestão</Pill>
                  </Row>
                </Card>

                {/* NEXT ACTIONS: one row per apontamento, action + deadline */}
                <div style={{ marginTop: 14 }}>
                  <div className="eyebrow" style={{ marginBottom: 8 }}>Próximas ações</div>

                  {/* pico de vazao · exceção · grau média · prazo 25/06 */}
                  <Link className="card" to="/app/apontamento" style={{ display: 'block', padding: 12, textDecoration: 'none' }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                      <b style={{ fontSize: 13.5, color: 'var(--ink)' }}>Justificar pico de vazão</b>
                      <span className="row" style={{ gap: 6, flexWrap: 'nowrap' }}>
                        <Pill variant="warn">Exceção · grau média</Pill>
                      </span>
                    </Row>
                    <div className="muted" style={{ fontSize: 12, marginTop: 5 }}>Vazão máx. 45 L/s · pico 53 L/s (118%) em 04/06</div>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                      <span className="mono" style={{ fontSize: 12, color: 'var(--ink)' }}>prazo: justificativa até 25/06</span>
                      <span className="faint">›</span>
                    </Row>
                  </Link>

                  {/* sinal de gestão · volume anual em risco · sem grau, sem prazo */}
                  <Link className="card" to="/app/apontamento" style={{ display: 'block', padding: 12, textDecoration: 'none', marginTop: 10, borderColor: 'var(--line)' }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                      <b style={{ fontSize: 13.5, color: 'var(--ink)' }}>Reduzir o ritmo de captação</b>
                      <Pill variant="label">Sinal de gestão</Pill>
                    </Row>
                    <div className="muted" style={{ fontSize: 12, marginTop: 5 }}>Volume anual 1.250.000 m³ · 58% · projeção 116%</div>
                    <Meter variant="warn" value="58%" style={{ marginTop: 8 }} />
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                      <span className="mono faint" style={{ fontSize: 12 }}>sem prazo · estoura ~início de nov no ritmo atual</span>
                      <span className="faint">›</span>
                    </Row>
                  </Link>

                  {/* qualidade do dado · exceção · grau leve · fase Encerrada */}
                  <Link className="card" to="/app/apontamento" style={{ display: 'block', padding: 12, textDecoration: 'none', marginTop: 10, borderColor: 'var(--line)' }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                      <b style={{ fontSize: 13.5, color: 'var(--muted)' }}>Amostra isolada ausente</b>
                      <Pill variant="ok">encerrada · leve</Pill>
                    </Row>
                    <div className="muted" style={{ fontSize: 12, marginTop: 5 }}>Transmissão ≥ 95% · 1 lacuna em 03/06, já retificada</div>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                      <span className="mono faint" style={{ fontSize: 12 }}>nenhuma ação pendente</span>
                      <span className="faint">›</span>
                    </Row>
                  </Link>
                </div>

                <Btn block lg to="/app/telemetria" style={{ marginTop: 14 }}>Acompanhar captação →</Btn>

                <div style={{ marginTop: 14 }}>
                  <div className="eyebrow" style={{ marginBottom: 8 }}>Atalhos</div>
                  <Link className="mrow" to="/app/apontamentos" style={{ textDecoration: 'none' }}><span className="ico">◧</span><div className="msp"><b style={{ fontSize: 13, color: 'var(--ink)' }}>Apontamentos</b><div className="muted" style={{ fontSize: 11.5 }}>Tudo que pede ação ou aguarda baixa</div></div><span className="faint">›</span></Link>
                  <Link className="mrow" to="/app/telemetria" style={{ textDecoration: 'none' }}><span className="ico">⚷</span><div className="msp"><b style={{ fontSize: 13, color: 'var(--ink)' }}>Captação / telemetria</b><div className="muted" style={{ fontSize: 11.5 }}>SDC-R-4471 · transmitindo (98,6%)</div></div><span className="faint">›</span></Link>
                  <Link className="mrow" to="/app/solicitacoes" style={{ textDecoration: 'none' }}><span className="ico">◔</span><div className="msp"><b style={{ fontSize: 13, color: 'var(--ink)' }}>Solicitações e calendário</b><div className="muted" style={{ fontSize: 11.5 }}>Renovação, vencimento e demais pedidos</div></div><span className="faint">›</span></Link>
                  <Link className="mrow" to="/app/confirmacao" style={{ textDecoration: 'none' }}><span className="ico">◷</span><div className="msp"><b style={{ fontSize: 13, color: 'var(--ink)' }}>Histórico de envios</b></div><span className="faint">›</span></Link>
                </div>
              </PScroll>
              <AppTabBar active="inicio" />
              <HomeBar />
            </Phone>
            <PhoneLabel>Estado A · grande usuário (telemetria)</PhoneLabel>
            <Note style={{ marginTop: 12, fontSize: 12, maxWidth: 360 }}>A mesma tela inicial muda o atalho principal conforme a faixa (Curva ABC): <b>Faixa A</b> abre a telemetria, <b>Faixa B/C</b> abre a autodeclaração. O usuário Faixa A não digita leitura.</Note>
          </div>

          {/* ESTADO B - pequeno/médio (autodeclaração), situação dirigida por calendário */}
          <div>
            <Phone>
              <Notch />
              <StatusBar right="▰▰▱ 4G ▮" />
              <PScroll>
                <AppBar title="Águas de Praia Grande" menu />

                <Card style={{ padding: 14 }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="eyebrow">Outorga ativa · 07-0830</span>
                    <Pill>Faixa B</Pill>
                  </Row>
                  <div className="mono" style={{ fontSize: 13, color: 'var(--ink)', marginTop: 8 }}>OUT-07-2020-000830</div>
                  <div className="muted" style={{ fontSize: 12.5, marginTop: 2 }}>Serviço de Águas de Praia Grande · Abastecimento público</div>
                  <hr className="div" style={{ margin: '12px 0' }} />
                  <Row style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span className="muted" style={{ fontSize: 12 }}>Sua situação hoje</span>
                    <span className="mono faint" style={{ fontSize: 11 }}>07/06/2026</span>
                  </Row>
                  <Row style={{ gap: 8, marginTop: 8 }}>
                    <Pill variant="warn">1 ação no prazo</Pill>
                  </Row>
                </Card>

                <div style={{ marginTop: 14 }}>
                  <div className="eyebrow" style={{ marginBottom: 8 }}>Próximas ações</div>

                  {/* declaração do período */}
                  <Link className="card" to="/app/autodeclaracao" style={{ display: 'block', padding: 12, textDecoration: 'none' }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                      <b style={{ fontSize: 13.5, color: 'var(--ink)' }}>Declarar leitura do período</b>
                      <Pill variant="label">obrigação periódica</Pill>
                    </Row>
                    <div className="muted" style={{ fontSize: 12, marginTop: 5 }}>Periodicidade pela faixa de VM · com foto e GPS</div>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                      <span className="mono" style={{ fontSize: 12, color: 'var(--ink)' }}>prazo: declarar até 10/06</span>
                      <span className="faint">›</span>
                    </Row>
                  </Link>

                  {/* outorga a vencer · exceção · classe calendário · renovar até 17/07 */}
                  <Link className="card" to="/app/solicitacoes" style={{ display: 'block', padding: 12, textDecoration: 'none', marginTop: 10 }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                      <b style={{ fontSize: 13.5, color: 'var(--ink)' }}>Solicitar renovação da outorga</b>
                      <Pill variant="warn">Calendário</Pill>
                    </Row>
                    <div className="muted" style={{ fontSize: 12, marginTop: 5 }}>Validade da outorga · vence em 40 dias</div>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                      <span className="mono" style={{ fontSize: 12, color: 'var(--ink)' }}>prazo: renovar até 17/07</span>
                      <span className="faint">›</span>
                    </Row>
                  </Link>
                </div>

                <Btn block lg to="/app/autodeclaracao" style={{ marginTop: 14 }}>Declarar leitura →</Btn>

                <div style={{ marginTop: 14 }}>
                  <div className="eyebrow" style={{ marginBottom: 8 }}>Atalhos</div>
                  <Link className="mrow" to="/app/apontamentos" style={{ textDecoration: 'none' }}><span className="ico">◧</span><div className="msp"><b style={{ fontSize: 13, color: 'var(--ink)' }}>Apontamentos</b><div className="muted" style={{ fontSize: 11.5 }}>Tudo que pede ação ou aguarda baixa</div></div><span className="faint">›</span></Link>
                  <Link className="mrow" to="/app/solicitacoes" style={{ textDecoration: 'none' }}><span className="ico">◔</span><div className="msp"><b style={{ fontSize: 13, color: 'var(--ink)' }}>Solicitações e calendário</b><div className="muted" style={{ fontSize: 11.5 }}>Renovação, vencimento e demais pedidos</div></div><span className="faint">›</span></Link>
                  <Link className="mrow" to="/app/confirmacao" style={{ textDecoration: 'none' }}><span className="ico">◷</span><div className="msp"><b style={{ fontSize: 13, color: 'var(--ink)' }}>Declarações anteriores</b></div><span className="faint">›</span></Link>
                </div>
              </PScroll>
              <AppTabBar active="inicio" />
              <HomeBar />
            </Phone>
            <PhoneLabel>Estado B · pequeno/médio (autodeclaração)</PhoneLabel>
            <Note style={{ marginTop: 12, fontSize: 12, maxWidth: 360 }}>Aqui o atalho principal abre a <b>autodeclaração</b>. A renovação é uma ação dirigida por data: o pedido deve ser feito <b>antes</b> do vencimento, então entra como próxima ação com prazo.</Note>
          </div>

        </div>
      </div>
    </>
  )
}
