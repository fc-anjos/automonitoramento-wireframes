import { DraftBanner, Phone, Notch, StatusBar, PScroll, AppBar, AppTabBar, HomeBar, PhoneLabel } from '../../components/shell.jsx'
import { Card, Pill, Btn, Meter, Note, Row } from '../../components/ui.jsx'

export default function Autodeclaracao() {
  return (
    <>
      <DraftBanner tag="APP · 03" title="Autodeclaração de leitura" right="Pequenos/médios · Faixa B/C" />

      <div className="wrap">
        <Note style={{ maxWidth: 760, margin: '0 auto 22px' }}>
          <b>Fluxo do pequeno/médio usuário, em autovigilância.</b> Entrada manual da leitura do hidrômetro, com <b>modo offline</b> (sincroniza depois), <b>geolocalização</b> do ponto e <b>foto</b> do medidor como comprovação. Periodicidade conforme a faixa. A checagem de plausibilidade contra a própria outorga é um <b>sinal de gestão</b>: o outorgado se autorregula antes que qualquer limite seja excedido e nada chega ao gestor, porque o sinal se baixa sozinho quando a leitura volta a ficar dentro do esperado. Não se confunde com uma exceção (que aguardaria justificativa em prazo) nem com um ato administrativo (que seguiria rito próprio).
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
                </Card>

                <div className="stack" style={{ marginTop: 14 }}>
                  <label className="field"><span>Leitura atual do hidrômetro (m³)</span>
                    <div className="input mono" style={{ color: 'var(--ink)', fontSize: 18 }}>004 281,___</div></label>
                  <div className="muted" style={{ fontSize: 11.5, marginTop: -8 }}>Leitura anterior: 004 116 m³ (05/05) · volume captado estimado ~165 m³</div>

                  {/* plausibility check against the user's own outorga limits: sinal de gestao */}
                  <Card style={{ padding: 12 }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}><b style={{ fontSize: 13, color: 'var(--ink)' }}>Dentro da sua outorga</b><Pill variant="ok">Plausível</Pill></Row>
                    <div className="muted" style={{ fontSize: 11, marginTop: 2 }}>Sinal de gestão · autovigilância</div>
                    <div className="mrow"><span className="msp muted" style={{ fontSize: 12 }}>Captado no mês</span><span className="mono" style={{ fontSize: 12 }}>~165 m³ (limite ~1.500/mês)</span></div>
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
                    <div className="input tall faint">Ex.: hidrômetro trocado, leitura estimada…</div></label>
                </div>

                <Btn block lg to="/app/confirmacao" style={{ marginTop: 14 }}>Revisar e enviar →</Btn>
                <Btn block sub style={{ marginTop: 8 }}>Salvar rascunho</Btn>
              </PScroll>
              <AppTabBar active="captacao" />
              <HomeBar />
            </Phone>
            <PhoneLabel>Autodeclaração · offline · GPS · foto</PhoneLabel>
          </div>
        </div>

        <Note style={{ maxWidth: 760, margin: '22px auto 0', fontSize: 12.5 }}>
          O volume declarado alimenta a <b>cobrança pelo uso da água</b> (FEHIDRO). Declarar a menos não reduz a conta: <b>subdeclarar é, a um só tempo, erro de cobrança e infração</b>, sujeito a apuração retroativa. A plausibilidade mostrada na tela é só autovigilância do próprio usuário; ela não substitui a reconciliação que o gestor faz do declarado contra o outorgado.
        </Note>

        <Note style={{ maxWidth: 760, margin: '14px auto 0', fontSize: 12.5 }}>
          Validações no envio: leitura maior ou igual à anterior, dentro de limites físicos plausíveis, foto e GPS presentes. Inconsistências geram alerta no lado do gestor. Correção de um período já enviado não apaga o registro: gera uma retificação que o substitui.
        </Note>
      </div>
    </>
  )
}
