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
                  {/* declaration frequency: managed attribute, always visible (gap 3.1.d) */}
                  <hr className="div" style={{ margin: '12px 0' }} />
                  <Row style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span className="muted" style={{ fontSize: 12 }}>Sua frequência</span>
                    <span className="mono" style={{ fontSize: 12, color: 'var(--ink)' }}>diária · atendida pela telemetria</span>
                  </Row>
                  <div className="muted" style={{ fontSize: 11.5, marginTop: 4 }}>Em falha de transmissão, declare manualmente pela autodeclaração.</div>
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

                {/* payments entry point: next guia + situation, detail lives in /app/pagamentos */}
                <Link className="card" to="/app/pagamentos" style={{ display: 'block', padding: 12, marginTop: 14, textDecoration: 'none' }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="eyebrow">Pagamentos</span>
                    <Pill variant="ok">em dia</Pill>
                  </Row>
                  <div style={{ fontSize: 13, color: 'var(--ink)', marginTop: 6 }}><b>Próxima guia:</b> cobrança pelo uso · 2º trim/2026</div>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                    <span className="mono" style={{ fontSize: 12 }}>venc. 30/06 · R$ 7.940,18 · emitida</span>
                    <span className="faint">›</span>
                  </Row>
                </Link>

                {/* institutional notices: the sidecc opens on a notices screen (gap 3.3.h) */}
                <div style={{ marginTop: 14 }}>
                  <div className="eyebrow" style={{ marginBottom: 8 }}>Avisos institucionais</div>
                  <Card style={{ padding: '4px 12px' }}>
                    <div className="mrow"><span className="mono faint" style={{ fontSize: 11, flex: 'none' }}>05/06</span><div className="msp muted" style={{ fontSize: 12 }}>Manutenção programada: sistema indisponível no domingo 14/06, das 6h às 8h.</div></div>
                    <div className="mrow"><span className="mono faint" style={{ fontSize: 11, flex: 'none' }}>28/05</span><div className="msp muted" style={{ fontSize: 12 }}>Período de estiagem: acompanhe os comunicados sobre regras de restrição na UGRHI-07.</div></div>
                    <div className="mrow"><span className="mono faint" style={{ fontSize: 11, flex: 'none' }}>12/05</span><div className="msp muted" style={{ fontSize: 12 }}>Nova versão do manual de declaração disponível na seção de ajuda.</div></div>
                  </Card>
                </div>

                {/* contact channel: user/technical-team messages tied to the cadastro (gap 3.3.h) */}
                <div style={{ marginTop: 14 }}>
                  <div className="eyebrow" style={{ marginBottom: 8 }}>Canal de contato</div>
                  <Card style={{ padding: 12 }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                      <b style={{ fontSize: 13, color: 'var(--ink)' }}>Equipe técnica · SP-Águas</b>
                      <Pill variant="act">1 nova</Pill>
                    </Row>
                    <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>"Recebemos o laudo de calibração do SDC-R-4471; o registro do equipamento foi atualizado." · 03/06</div>
                    <Row style={{ gap: 8, marginTop: 10 }}>
                      <Btn block sub>Ver conversa</Btn>
                      <Btn block>Nova mensagem</Btn>
                    </Row>
                    <div className="faint" style={{ fontSize: 11, marginTop: 8 }}>Mensagens vinculadas ao cadastro, com histórico permanente.</div>
                  </Card>
                </div>

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
                  {/* declaration frequency: the cadence is always on screen (gap 3.1.d) */}
                  <hr className="div" style={{ margin: '12px 0' }} />
                  <Row style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span className="muted" style={{ fontSize: 12 }}>Sua frequência</span>
                    <span className="mono" style={{ fontSize: 12, color: 'var(--ink)' }}>semanal · próxima declaração até 10/06</span>
                  </Row>
                  <div className="muted" style={{ fontSize: 11.5, marginTop: 4 }}>Definida pela faixa de volume mensal · alterada apenas por ato do gestor.</div>
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
                    {/* per-device pending count: the period is a set of per-medidor readings */}
                    <Row style={{ gap: 6, marginTop: 6 }}>
                      <Pill variant="warn" style={{ fontSize: 10.5 }}>1 de 2 medidores pendente · maio/2026</Pill>
                    </Row>
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

                {/* same payments entry point; smaller operation, smaller guia */}
                <Link className="card" to="/app/pagamentos" style={{ display: 'block', padding: 12, marginTop: 14, textDecoration: 'none' }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="eyebrow">Pagamentos</span>
                    <Pill variant="warn">1 a vencer</Pill>
                  </Row>
                  <div style={{ fontSize: 13, color: 'var(--ink)', marginTop: 6 }}><b>Próxima guia:</b> cobrança pelo uso · 2º trim/2026</div>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                    <span className="mono" style={{ fontSize: 12 }}>venc. 30/06 · R$ 1.236,40 · registrada</span>
                    <span className="faint">›</span>
                  </Row>
                </Link>

                <div style={{ marginTop: 14 }}>
                  <div className="eyebrow" style={{ marginBottom: 8 }}>Atalhos</div>
                  <Link className="mrow" to="/app/apontamentos" style={{ textDecoration: 'none' }}><span className="ico">◧</span><div className="msp"><b style={{ fontSize: 13, color: 'var(--ink)' }}>Apontamentos</b><div className="muted" style={{ fontSize: 11.5 }}>Tudo que pede ação ou aguarda baixa</div></div><span className="faint">›</span></Link>
                  <Link className="mrow" to="/app/solicitacoes" style={{ textDecoration: 'none' }}><span className="ico">◔</span><div className="msp"><b style={{ fontSize: 13, color: 'var(--ink)' }}>Solicitações e calendário</b><div className="muted" style={{ fontSize: 11.5 }}>Renovação, vencimento e demais pedidos</div></div><span className="faint">›</span></Link>
                  <Link className="mrow" to="/app/confirmacao" style={{ textDecoration: 'none' }}><span className="ico">◷</span><div className="msp"><b style={{ fontSize: 13, color: 'var(--ink)' }}>Declarações anteriores</b></div><span className="faint">›</span></Link>
                  {/* dead rows: avisos and contato are sketched in full on the phone beside */}
                  <a className="mrow"><span className="ico">◌</span><div className="msp"><b style={{ fontSize: 13, color: 'var(--ink)' }}>Avisos institucionais</b><div className="muted" style={{ fontSize: 11.5 }}>3 avisos · último em 05/06</div></div><span className="faint">›</span></a>
                  <a className="mrow"><span className="ico">✉</span><div className="msp"><b style={{ fontSize: 13, color: 'var(--ink)' }}>Canal de contato</b><div className="muted" style={{ fontSize: 11.5 }}>Mensagens com a equipe técnica · vinculadas ao cadastro</div></div><span className="faint">›</span></a>
                </div>
              </PScroll>
              <AppTabBar active="inicio" />
              <HomeBar />
            </Phone>
            <PhoneLabel>Estado B · pequeno/médio (autodeclaração)</PhoneLabel>
            <Note style={{ marginTop: 12, fontSize: 12, maxWidth: 360 }}>Aqui o atalho principal abre a <b>autodeclaração</b>. A renovação é uma ação dirigida por data: o pedido deve ser feito <b>antes</b> do vencimento, então entra como próxima ação com prazo.</Note>
          </div>

        </div>

        <Note style={{ maxWidth: 760, margin: '22px auto 0' }}>
          <b>A frequência de declaração é atributo gerenciado, não convenção.</b> Cada uso carrega uma frequência (mensal, semanal ou diária) derivada das faixas de volume mensal outorgado (Portaria DAEE 5.579/2018, art. 5º; IT-DPO 15/2018), com histórico e alteração somente por ato administrativo do gestor; por isso o painel a exibe sempre, com a próxima data, e o usuário de telemetria conserva o caminho de contingência: em falha de transmissão, declara manualmente. Os <b>avisos institucionais</b> e o <b>canal de contato</b> recuperam superfícies do sistema substituído, que abre num quadro de avisos e mantém as mensagens entre usuário e equipe técnica <b>vinculadas ao cadastro</b>, não dispersas em e-mail. O cartão de <b>Pagamentos</b> é só o atalho da carteira: a guia mais próxima e a sua situação; boleto, PIX e comprovantes vivem na seção própria.
        </Note>
      </div>
    </>
  )
}
