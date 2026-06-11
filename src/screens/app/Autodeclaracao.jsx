import { DraftBanner, Phone, Notch, StatusBar, PScroll, AppBar, AppTabBar, HomeBar, PhoneLabel } from '../../components/shell.jsx'
import { Card, Pill, Btn, Meter, Note, Row } from '../../components/ui.jsx'

export default function Autodeclaracao() {
  return (
    <>
      <DraftBanner tag="APP · 03" title="Autodeclaração de leitura" right="Pequenos/médios · Faixa B/C" />

      <div className="wrap">
        <Note style={{ maxWidth: 760, margin: '0 auto 22px' }}>
          <b>Fluxo do pequeno/médio usuário, com acompanhamento do próprio uso.</b> Entrada manual da leitura de cada medidor da captação, com <b>modo offline</b> (sincroniza depois), <b>geolocalização</b> do ponto e <b>foto</b> do medidor como comprovação. Periodicidade conforme a faixa. A declaração carrega um <b>tipo</b>: leitura de rotina · leitura ao remover equipamento · leitura ao reinstalar equipamento · medição alternativa (volume). A troca de medidor é registrada pelo par remover/reinstalar, e não em texto livre. A checagem de plausibilidade contra a própria outorga é um <b>sinal de gestão</b>: o outorgado acompanha o consumo antes que qualquer limite seja excedido e nada chega ao gestor, porque o sinal tem baixa automática quando a leitura volta ao esperado. Não se confunde com uma exceção (que aguardaria justificativa em prazo) nem com um ato administrativo (que seguiria rito próprio).
        </Note>

        <div className="phone-stage" style={{ justifyContent: 'center' }}>
          <div>
            <Phone>
              <Notch />
              <StatusBar right="⊘ offline ▮" />
              <PScroll>
                <AppBar title="Nova declaração" back />

                <Pill variant="warn" style={{ marginBottom: 12 }}>Modo offline · será enviada ao reconectar</Pill>

                <Card style={{ padding: 14 }}>
                  <div className="muted" style={{ fontSize: 12 }}>Outorga</div>
                  <div className="mono" style={{ fontSize: 13, color: 'var(--ink)' }}>OUT-07-2025-008842 · Sítio Boa Vista</div>
                  {/* captação scope: the declaração binds one level above the medidor; no selector (single-captação user) */}
                  <hr className="div" style={{ margin: '10px 0' }} />
                  <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="mono" style={{ fontSize: 12.5, color: 'var(--ink)' }}>Captação 07-0884 · poço tubular</span>
                  </Row>
                  <div className="muted" style={{ fontSize: 11, marginTop: 4 }}>Única captação deste outorgado · a declaração abrange os medidores deste ponto.</div>
                </Card>

                {/* PERIOD CHECKLIST: the obligation is a set, one reading per active medidor */}
                <Card style={{ marginTop: 14, padding: 12 }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <b style={{ fontSize: 13, color: 'var(--ink)' }}>Declaração de maio/2026</b>
                    <Pill variant="warn">1 de 2 declarada</Pill>
                  </Row>
                  <div className="mrow">
                    <span className="ico">✓</span>
                    <div className="msp">
                      <span className="mono" style={{ fontSize: 12, color: 'var(--ink)' }}>H-99281 · DN 50</span>
                      <div className="muted" style={{ fontSize: 11 }}>declarada em 02/06 · protocolo DCL-07-2026-044871</div>
                    </div>
                    <Pill variant="ok" style={{ fontSize: 10.5 }}>declarada</Pill>
                  </div>
                  <div className="mrow">
                    <span className="ico faint">○</span>
                    <div className="msp">
                      <span className="mono" style={{ fontSize: 12, color: 'var(--ink)' }}>H-44107 · DN 25</span>
                      <div className="muted" style={{ fontSize: 11 }}>pendente · é a leitura deste formulário</div>
                    </div>
                    <Pill variant="warn" style={{ fontSize: 10.5 }}>pendente</Pill>
                  </div>
                  <div className="muted" style={{ fontSize: 11, marginTop: 6 }}>O período fecha quando todos os medidores ativos tiverem leitura.</div>
                </Card>

                <div className="stack" style={{ marginTop: 14 }}>
                  {/* declaration type: the four sidecc types; equipment swap is a typed reading, not free text */}
                  <div className="field"><span>Tipo de declaração</span>
                    <div className="card" style={{ padding: '4px 10px' }}>
                      <div className="mrow"><span className="ico" style={{ color: 'var(--ink)' }}>◉</span><div className="msp"><b style={{ fontSize: 12.5, color: 'var(--ink)' }}>Leitura de rotina</b><div className="muted" style={{ fontSize: 11 }}>declaração periódica do medidor em uso</div></div></div>
                      <div className="mrow"><span className="ico faint">○</span><div className="msp"><span style={{ fontSize: 12.5 }}>Leitura ao remover equipamento</span><div className="faint" style={{ fontSize: 11 }}>última leitura do medidor que sai</div></div></div>
                      <div className="mrow"><span className="ico faint">○</span><div className="msp"><span style={{ fontSize: 12.5 }}>Leitura ao reinstalar equipamento</span><div className="faint" style={{ fontSize: 11 }}>leitura inicial do medidor que entra</div></div></div>
                      <div className="mrow"><span className="ico faint">○</span><div className="msp"><span style={{ fontSize: 12.5 }}>Medição alternativa (volume)</span><div className="faint" style={{ fontSize: 11 }}>volume informado sem leitura, quando autorizada</div></div></div>
                    </div>
                  </div>

                  {/* meter picker: a captacao can carry more than one medidor; one reading per equipment */}
                  <div className="field"><span>Medidor</span>
                    <div className="input"><span className="mono" style={{ color: 'var(--ink)', fontSize: 12.5 }}>Hidrômetro · série H-44107 · DN 25</span><span className="sp" style={{ flex: 1 }} /><span className="faint">▾</span></div>
                    <div className="muted" style={{ fontSize: 11, marginTop: 4 }}>Esta captação tem <b>2 medidores ativos</b>; o outro (série H-99281 · DN 50) já declarou neste período. A leitura é declarada por equipamento.</div>
                  </div>

                  <label className="field"><span>Leitura atual do hidrômetro (m³)</span>
                    <div className="input mono" style={{ color: 'var(--ink)', fontSize: 18 }}>001 938,___</div></label>
                  <div className="muted" style={{ fontSize: 11.5, marginTop: -8 }}>Leitura anterior deste medidor: 001 893 m³ (05/05) · volume captado estimado ~45 m³</div>

                  {/* dial rollover: the one legitimate case where the reading drops on the same meter */}
                  <Card style={{ padding: 12 }}>
                    <Row style={{ gap: 8, alignItems: 'center' }}>
                      <span style={{ fontSize: 15, color: 'var(--ink)' }}>☐</span>
                      <b style={{ fontSize: 13, color: 'var(--ink)' }}>Medidor zerado (virada do mostrador)</b>
                    </Row>
                    <div className="muted" style={{ fontSize: 11, marginTop: 4 }}>Marque quando o mostrador completou a volta e recomeçou do zero: a leitura atual pode ser menor que a anterior sem gerar alerta.</div>
                  </Card>

                  {/* plausibility check against the user's own outorga limits: sinal de gestao */}
                  <Card style={{ padding: 12 }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}><b style={{ fontSize: 13, color: 'var(--ink)' }}>Dentro da sua outorga</b><Pill variant="ok">Plausível</Pill></Row>
                    <div className="muted" style={{ fontSize: 11, marginTop: 2 }}>Sinal de gestão · acompanhamento do uso</div>
                    <div className="mrow"><span className="msp muted" style={{ fontSize: 12 }}>Captado no mês</span><span className="mono" style={{ fontSize: 12 }}>~210 m³ · 2 medidores (limite ~1.500/mês)</span></div>
                    <div className="mrow"><span className="msp muted" style={{ fontSize: 12 }}>Acumulado no ano</span><span className="mono" style={{ fontSize: 12 }}>1.142 / 18.000 m³ · 6%</span></div>
                    <Meter value="6%" style={{ marginTop: 6 }} />
                  </Card>

                  <label className="field"><span>Data da leitura</span>
                    <div className="input"><span className="mono" style={{ color: 'var(--ink)' }}>04/06/2026</span><span className="sp" style={{ flex: 1 }} />📅</div></label>

                  <div className="field"><span>Geolocalização do ponto</span>
                    <div className="card ph" style={{ minHeight: 120 }}>Mapa · pin GPS capturado<br /><small className="mono">−23.8765, −46.4210 (exemplo)</small></div>
                    <div className="pill ok" style={{ marginTop: 8 }}>Coordenada capturada automaticamente</div>
                  </div>

                  <div className="field"><span>Foto do medidor</span>
                    <div className="row" style={{ gap: 10 }}>
                      <div className="card ph ph--img" style={{ flex: 1, minHeight: 96 }}>📷 Toque para<br />fotografar</div>
                      <div className="card ph ph--img" style={{ flex: 1, minHeight: 96 }}>Pré-visualização<br />da foto</div>
                    </div>
                  </div>

                  <label className="field"><span>Observações (opcional)</span>
                    <div className="input tall faint">Ex.: acesso difícil ao medidor, leitura sob chuva…</div></label>
                </div>

                <Btn block lg to="/app/confirmacao" style={{ marginTop: 14 }}>Revisar e enviar →</Btn>
                <Btn block sub style={{ marginTop: 8 }}>Salvar rascunho</Btn>
              </PScroll>
              <AppTabBar active="captacao" />
              <HomeBar />
            </Phone>
            <PhoneLabel>Autodeclaração · 4 tipos de leitura · offline · GPS · foto</PhoneLabel>
          </div>
        </div>

        <Note style={{ maxWidth: 760, margin: '22px auto 0', fontSize: 12.5 }}>
          A declaração do período é um <b>conjunto de leituras, uma por equipamento</b>: o período só fecha quando todo medidor ativo da captação tiver a sua. A completude é <b>derivada</b> do conjunto; ninguém a edita. A ausência de declaração é apurada <b>por medidor</b>, inclusive para a imputação pela regra do volume máximo diário: o aparelho silencioso é imputado ainda que o outro tenha declarado.
        </Note>

        <Note style={{ maxWidth: 760, margin: '14px auto 0', fontSize: 12.5 }}>
          O volume declarado alimenta a <b>cobrança pelo uso da água</b> (FEHIDRO). Declarar a menos não reduz a conta. A <b>subdeclaração</b> é, ao mesmo tempo, erro de cobrança e infração, sujeita a apuração retroativa. A plausibilidade mostrada na tela é só apoio ao acompanhamento do próprio usuário; ela não substitui a reconciliação que o gestor faz do declarado contra o outorgado.
        </Note>

        <Note style={{ maxWidth: 760, margin: '14px auto 0', fontSize: 12.5 }}>
          Validações no envio: leitura maior ou igual à anterior do mesmo medidor, <b>exceto</b> na virada do mostrador (medidor zerado) e na troca de equipamento, casos que os tipos de declaração (ao remover · ao reinstalar) registram de forma expressa, sem recorrer ao campo de observações; limites físicos plausíveis; foto e GPS presentes. Inconsistências geram alerta no lado do gestor. Correção de um período já enviado não apaga o registro: gera uma retificação que o substitui.
        </Note>
      </div>
    </>
  )
}
