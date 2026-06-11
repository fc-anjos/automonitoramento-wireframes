import { Link } from 'react-router-dom'
import { DraftBanner, Phone, Notch, StatusBar, PScroll, AppBar, AppTabBar, HomeBar, PhoneLabel } from '../../components/shell.jsx'
import { Card, Pill, Btn, Meter, Note, Row, DataTable } from '../../components/ui.jsx'

// Avisos institucionais em tabela compacta (data · tipo · mensagem).
const AVISOS_A = [
  { id: 'a1', data: '05/06', tipo: 'Manutenção', mensagem: 'Sistema indisponível no domingo 14/06, das 6h às 8h.' },
  { id: 'a2', data: '28/05', tipo: 'Restrição', mensagem: 'Estiagem: acompanhe os comunicados sobre regras de restrição na UGRHI-07.' },
  { id: 'a3', data: '12/05', tipo: 'Documentação', mensagem: 'Nova versão do manual de declaração disponível na seção de ajuda.' },
]

const AVISOS_B = [
  { id: 'b1', data: '05/06', tipo: 'Manutenção', mensagem: 'Sistema indisponível no domingo 14/06, das 6h às 8h.' },
  { id: 'b2', data: '28/05', tipo: 'Restrição', mensagem: 'Estiagem: acompanhe os comunicados sobre regras de restrição na UGRHI-07.' },
]

const AVISO_COLS = [
  { key: 'data',     label: 'Data',      cls: 'mono faint' },
  { key: 'tipo',     label: 'Tipo'       },
  { key: 'mensagem', label: 'Mensagem'   },
]

export default function AppInicio() {
  return (
    <>
      <DraftBanner tag="APP · 01" title="Início" />

      <div className="wrap">
        <Note style={{ maxWidth: 760, margin: '0 auto 22px' }}>
          <b>O Início é aterrissagem fina de situação: situação hoje, prazos e próximas ações.</b> Não é central de ações. A barra de abas abaixo navega para os recursos (Apontamentos, Declaração, Solicitações, Multas); esta tela apenas resume o que está pendente agora e o que exige atenção. O cartão de multa aparece somente quando uma multa existe; sem multa, a seção fica oculta.
        </Note>

        <div className="phone-stage" style={{ justifyContent: 'center' }}>

          {/* ESTADO A - grande usuário (telemetria), Faixa A */}
          <div>
            <Phone>
              <Notch />
              <StatusBar right="▰▰▰ 5G ▮" />
              <PScroll>
                <AppBar title="Indústria Cubatão" menu />

                {/* cartão de identificação + situação hoje */}
                <Card style={{ padding: 14 }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="eyebrow">Captação 07-1001 <span className="faint">▾</span> · 1 de 2</span>
                    <Pill variant="act">Faixa A</Pill>
                  </Row>
                  <div className="mono" style={{ fontSize: 13, color: 'var(--ink)', marginTop: 8 }}>OUT-07-2024-001234 · outorga ativa</div>
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
                  {/* frequência: atributo gerenciado, sempre visível (gap 3.1.d) */}
                  <hr className="div" style={{ margin: '12px 0' }} />
                  <Row style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span className="muted" style={{ fontSize: 12 }}>Sua frequência</span>
                    <span className="mono" style={{ fontSize: 12, color: 'var(--ink)' }}>diária · atendida pela telemetria</span>
                  </Row>
                  <div className="muted" style={{ fontSize: 11.5, marginTop: 4 }}>Em falha de transmissão, declare manualmente pela autodeclaração.</div>
                </Card>

                {/* próximas ações */}
                <div style={{ marginTop: 14 }}>
                  <div className="eyebrow" style={{ marginBottom: 8 }}>Próximas ações</div>

                  {/* pico de vazão · exceção · grau leve · prazo 25/06 */}
                  <Link className="card" to="/app/apontamento" style={{ display: 'block', padding: 12, textDecoration: 'none' }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                      <b style={{ fontSize: 13.5, color: 'var(--ink)' }}>Justificar pico de vazão</b>
                      <Pill variant="warn">Exceção · leve</Pill>
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
                    <div className="muted" style={{ fontSize: 12, marginTop: 5 }}>Transmissão EM DIA · 1 lacuna em 03/06, já retificada</div>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                      <span className="mono faint" style={{ fontSize: 12 }}>nenhuma ação pendente</span>
                      <span className="faint">›</span>
                    </Row>
                  </Link>
                </div>

                <Btn block lg to="/app/captacao" style={{ marginTop: 14 }}>Acompanhar captação →</Btn>

                {/* multas: só aparece quando há multa; sem este bloco se não houver */}
                <Link className="card" to="/app/multas" style={{ display: 'block', padding: 12, marginTop: 14, textDecoration: 'none' }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="eyebrow">Multas</span>
                    <Pill variant="warn">vence em 12 dias</Pill>
                  </Row>
                  <div style={{ fontSize: 13, color: 'var(--ink)', marginTop: 6 }}>PAS-2026-0017 · multa por exceção de volume</div>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                    <span className="mono" style={{ fontSize: 12 }}>venc. 19/06 · R$ 11.485,00 · registrada</span>
                    <span className="faint">›</span>
                  </Row>
                </Link>

                {/* avisos institucionais: tabela pequena (data · tipo · mensagem) */}
                <div style={{ marginTop: 14 }}>
                  <div className="eyebrow" style={{ marginBottom: 8 }}>Avisos institucionais</div>
                  <DataTable
                    columns={AVISO_COLS}
                    rows={AVISOS_A}
                    pageSize={4}
                  />
                </div>

                {/* atalhos */}
                <div style={{ marginTop: 14 }}>
                  <div className="eyebrow" style={{ marginBottom: 8 }}>Atalhos</div>
                  <Link className="mrow" to="/app/apontamentos" style={{ textDecoration: 'none' }}><span className="ico">◧</span><div className="msp"><b style={{ fontSize: 13, color: 'var(--ink)' }}>Apontamentos</b><div className="muted" style={{ fontSize: 11.5 }}>Tudo que pede ação ou aguarda baixa</div></div><span className="faint">›</span></Link>
                  <Link className="mrow" to="/app/captacao" style={{ textDecoration: 'none' }}><span className="ico">⚷</span><div className="msp"><b style={{ fontSize: 13, color: 'var(--ink)' }}>Captação / telemetria</b><div className="muted" style={{ fontSize: 11.5 }}>SDC-R-4471 · SITUAÇÃO DA TRANSMISSÃO EM DIA (98,6%)</div></div><span className="faint">›</span></Link>
                  <Link className="mrow" to="/app/solicitacoes" style={{ textDecoration: 'none' }}><span className="ico">◔</span><div className="msp"><b style={{ fontSize: 13, color: 'var(--ink)' }}>Solicitações</b><div className="muted" style={{ fontSize: 11.5 }}>Renovação, vencimento e demais pedidos</div></div><span className="faint">›</span></Link>
                  <Link className="mrow" to="/app/justificativas" style={{ textDecoration: 'none' }}><span className="ico">◷</span><div className="msp"><b style={{ fontSize: 13, color: 'var(--ink)' }}>Justificativas de ausência</b><div className="muted" style={{ fontSize: 11.5 }}>Aguardando avaliação · Aprovado · Reprovado</div></div><span className="faint">›</span></Link>
                  <Link className="mrow" to="/app/historico" style={{ textDecoration: 'none' }}><span className="ico">◌</span><div className="msp"><b style={{ fontSize: 13, color: 'var(--ink)' }}>Histórico de declarações</b></div><span className="faint">›</span></Link>
                </div>
              </PScroll>
              <AppTabBar active="inicio" />
              <HomeBar />
            </Phone>
            <PhoneLabel>Estado A · grande usuário (telemetria)</PhoneLabel>
            <Note style={{ marginTop: 12, fontSize: 12, maxWidth: 360 }}>Faixa A (VM &gt; 25.920 m³/mês): frequência diária, atendida pela telemetria (SiDeCC-R). O atalho principal abre a captação/telemetria. Grau corrigido para <b>leve</b> (Lei 7.663/1991, art. 13; três níveis: leve, grave, gravíssima). Multa aparece por haver processo PAS em aberto; sem multa, o bloco fica oculto.</Note>
          </div>

          {/* ESTADO B - pequeno/médio (autodeclaração), Faixa B */}
          <div>
            <Phone>
              <Notch />
              <StatusBar right="▰▰▱ 4G ▮" />
              <PScroll>
                <AppBar title="Águas de Praia Grande" menu />

                <Card style={{ padding: 14 }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="eyebrow">Captação 07-0830</span>
                    <Pill>Faixa B</Pill>
                  </Row>
                  <div className="mono" style={{ fontSize: 13, color: 'var(--ink)', marginTop: 8 }}>OUT-07-2020-000830 · outorga ativa</div>
                  <div className="muted" style={{ fontSize: 12.5, marginTop: 2 }}>Serviço de Águas de Praia Grande · Abastecimento público</div>
                  <hr className="div" style={{ margin: '12px 0' }} />
                  <Row style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span className="muted" style={{ fontSize: 12 }}>Sua situação hoje</span>
                    <span className="mono faint" style={{ fontSize: 11 }}>07/06/2026</span>
                  </Row>
                  <Row style={{ gap: 8, marginTop: 8 }}>
                    <Pill variant="warn">1 ação no prazo</Pill>
                  </Row>
                  {/* frequência: sempre visível (gap 3.1.d); alterada só por ato do gestor */}
                  <hr className="div" style={{ margin: '12px 0' }} />
                  <Row style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span className="muted" style={{ fontSize: 12 }}>Sua frequência</span>
                    <span className="mono" style={{ fontSize: 12, color: 'var(--ink)' }}>semanal · próxima declaração até 10/06</span>
                  </Row>
                  <div className="muted" style={{ fontSize: 11.5, marginTop: 4 }}>Definida pela faixa de VM · alterada somente por ato do gestor.</div>
                </Card>

                <div style={{ marginTop: 14 }}>
                  <div className="eyebrow" style={{ marginBottom: 8 }}>Próximas ações</div>

                  {/* declaração do período · obrigação periódica */}
                  <Link className="card" to="/app/autodeclaracao" style={{ display: 'block', padding: 12, textDecoration: 'none' }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                      <b style={{ fontSize: 13.5, color: 'var(--ink)' }}>Declarar leitura do período</b>
                      <Pill variant="label">obrigação periódica</Pill>
                    </Row>
                    <div className="muted" style={{ fontSize: 12, marginTop: 5 }}>Leitura de rotina · frequência semanal · com foto e GPS</div>
                    <Row style={{ gap: 6, marginTop: 6 }}>
                      <Pill variant="warn" style={{ fontSize: 10.5 }}>1 de 2 medidores pendente · maio/2026</Pill>
                    </Row>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                      <span className="mono" style={{ fontSize: 12, color: 'var(--ink)' }}>prazo: declarar até 10/06</span>
                      <span className="faint">›</span>
                    </Row>
                  </Link>

                  {/* outorga a vencer · apontamento de calendário · renovar até 17/07 */}
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

                {/* sem multa: bloco omitido para o usuário de Praia Grande */}

                {/* avisos institucionais: tabela pequena */}
                <div style={{ marginTop: 14 }}>
                  <div className="eyebrow" style={{ marginBottom: 8 }}>Avisos institucionais</div>
                  <DataTable
                    columns={AVISO_COLS}
                    rows={AVISOS_B}
                    pageSize={4}
                  />
                </div>

                {/* atalhos */}
                <div style={{ marginTop: 14 }}>
                  <div className="eyebrow" style={{ marginBottom: 8 }}>Atalhos</div>
                  <Link className="mrow" to="/app/apontamentos" style={{ textDecoration: 'none' }}><span className="ico">◧</span><div className="msp"><b style={{ fontSize: 13, color: 'var(--ink)' }}>Apontamentos</b><div className="muted" style={{ fontSize: 11.5 }}>Tudo que pede ação ou aguarda baixa</div></div><span className="faint">›</span></Link>
                  <Link className="mrow" to="/app/solicitacoes" style={{ textDecoration: 'none' }}><span className="ico">◔</span><div className="msp"><b style={{ fontSize: 13, color: 'var(--ink)' }}>Solicitações</b><div className="muted" style={{ fontSize: 11.5 }}>Renovação, vencimento e demais pedidos</div></div><span className="faint">›</span></Link>
                  <Link className="mrow" to="/app/justificativas" style={{ textDecoration: 'none' }}><span className="ico">◷</span><div className="msp"><b style={{ fontSize: 13, color: 'var(--ink)' }}>Justificativas de ausência</b><div className="muted" style={{ fontSize: 11.5 }}>Aguardando avaliação · Aprovado · Reprovado</div></div><span className="faint">›</span></Link>
                  <Link className="mrow" to="/app/historico" style={{ textDecoration: 'none' }}><span className="ico">◌</span><div className="msp"><b style={{ fontSize: 13, color: 'var(--ink)' }}>Histórico de declarações</b></div><span className="faint">›</span></Link>
                </div>
              </PScroll>
              <AppTabBar active="inicio" />
              <HomeBar />
            </Phone>
            <PhoneLabel>Estado B · pequeno/médio (autodeclaração)</PhoneLabel>
            <Note style={{ marginTop: 12, fontSize: 12, maxWidth: 360 }}>Faixa B (5.040 &lt; VM ≤ 25.920 m³/mês): frequência semanal, autodeclaração por leitura de rotina. Sem multa ativa: o bloco de multa fica oculto. O atalho de solicitações <b>não</b> incorpora justificativas de ausência; essas apontam para <code>/app/justificativas</code>, fila própria, conforme o SiDeCC (decisão 6 da Abordagem).</Note>
          </div>

        </div>

        <Note style={{ maxWidth: 760, margin: '22px auto 0' }}>
          <b>O Início é roteado por captação, não por outorgado.</b> O outorgado com mais de um ponto alterna entre eles pelo seletor no cartão; cada captação carrega o próprio limite, a própria frequência e os próprios medidores. Para captação única, a tela abre direto no ponto.
        </Note>

        <Note style={{ maxWidth: 760, margin: '14px auto 0' }}>
          <b>Frequência é atributo gerenciado.</b> Cada captação carrega uma frequência (mensal, semanal ou diária) derivada da faixa de volume mensal outorgado (Portaria DAEE 5.579/2018, art. 5º; IT-DPO 15/2018). Alteração depende de ato administrativo do gestor. O cartão exibe a frequência e a próxima data. <b>Multa</b> é a única receita do sistema (Lei 7.663/1991, art. 12); o bloco só aparece quando há processo em aberto. <b>Justificativas de ausência</b> e Solicitações são filas separadas, em rotas distintas (/app/justificativas · /app/solicitacoes).
        </Note>
      </div>
    </>
  )
}
