import { DraftBanner, Phone, Notch, StatusBar, PScroll, AppBar, AppTabBar, HomeBar, PhoneLabel } from '../../components/shell.jsx'
import { Card, Pill, Btn, Note, Panel, Body, Row, Sp } from '../../components/ui.jsx'

// crude qr sketch: three finder squares + scattered modules, wireframe style
const QrSketch = () => (
  <svg viewBox="0 0 84 84" width="84" height="84" aria-label="QR de PIX dinâmico"
    style={{ flex: 'none', border: '2px solid var(--ink)', borderRadius: 4, background: '#fff', padding: 4, boxSizing: 'border-box' }}>
    <g fill="var(--ink)">
      {/* finders */}
      <path d="M4 4h20v20H4zM8 8v12h12V8z" fillRule="evenodd" />
      <path d="M60 4h20v20H60zM64 8v12h12V8z" fillRule="evenodd" />
      <path d="M4 60h20v20H4zM8 64v12h12V64z" fillRule="evenodd" />
      <rect x="10" y="10" width="8" height="8" /><rect x="66" y="10" width="8" height="8" /><rect x="10" y="66" width="8" height="8" />
      {/* data modules */}
      <rect x="32" y="6" width="6" height="6" /><rect x="44" y="6" width="6" height="6" />
      <rect x="38" y="14" width="6" height="6" /><rect x="50" y="18" width="6" height="6" />
      <rect x="30" y="24" width="6" height="6" /><rect x="42" y="28" width="6" height="6" />
      <rect x="6" y="32" width="6" height="6" /><rect x="18" y="36" width="6" height="6" />
      <rect x="30" y="38" width="6" height="6" /><rect x="44" y="36" width="6" height="6" />
      <rect x="58" y="32" width="6" height="6" /><rect x="70" y="38" width="6" height="6" />
      <rect x="10" y="46" width="6" height="6" /><rect x="24" y="48" width="6" height="6" />
      <rect x="38" y="48" width="6" height="6" /><rect x="52" y="44" width="6" height="6" />
      <rect x="66" y="48" width="6" height="6" /><rect x="76" y="52" width="6" height="6" />
      <rect x="32" y="60" width="6" height="6" /><rect x="46" y="58" width="6" height="6" />
      <rect x="58" y="64" width="6" height="6" /><rect x="36" y="72" width="6" height="6" />
      <rect x="50" y="74" width="6" height="6" /><rect x="70" y="72" width="6" height="6" />
    </g>
  </svg>
)

// one guia per row; dead rows because the detail is the phone beside
const GUIAS = [
  { titulo: 'Multa · processo sancionador', pill: 'vence em 12 dias', pillVar: 'warn', origem: 'Multa', sub: 'PAS-2026-0017 · registrada · venc. 19/06 · R$ 11.485,00' },
  { titulo: 'Cobrança pelo uso · 2º trim/2026', pill: 'emitida', pillVar: 'label', origem: 'Cobrança', sub: 'período abr–jun/2026 · aguardando registro no banco · venc. 30/06 · R$ 4.812,30' },
  { titulo: 'Cobrança pelo uso · 1º trim/2026', pill: 'paga · em conciliação', pillVar: 'act', origem: 'Cobrança', sub: 'período jan–mar/2026 · paga em 06/06 · aguarda retorno do banco' },
  { titulo: 'Cobrança pelo uso · 3º trim/2025', pill: 'atualizada com encargos', pillVar: 'bad', origem: 'Cobrança', sub: 'vencida em 31/10/2025 · instrumento substituto · novo venc. 30/06' },
  { titulo: 'Cobrança pelo uso · 4º trim/2025', pill: 'quitada', pillVar: 'ok', origem: 'Cobrança', sub: 'liquidada em 15/01 · comprovante disponível', faint: true },
]

export default function Pagamentos() {
  return (
    <>
      <DraftBanner tag="APP · 09" title="Pagamentos" right="Duas origens · uma carteira" />

      <div className="wrap">
        <Note style={{ maxWidth: 780, margin: '0 auto 22px' }}>
          <b>A guia de recolhimento como terceiro objeto.</b> Um módulo único de pagamentos serve às duas espécies de receita da plataforma: a <b>cobrança pelo uso da água</b> (Lei estadual 12.183/2005, destinada ao FEHIDRO; na Baixada Santista, Deliberação CBH-BS 157/2009), alimentada pelos volumes declarados, e a <b>multa</b> do processo sancionador. A emissão é ato do sistema disparado por ato do gestor, nunca avulsa: o julgamento definitivo gera a guia da multa com valor já computado; a cobrança pelo uso é emitida periodicamente a partir dos volumes validados. Cada guia carrega o seu objeto de origem, o número do processo ou o período de cobrança.
        </Note>

        <div className="phone-stage" style={{ justifyContent: 'center' }}>

          {/* LISTA: carteira de guias do outorgado, com o ciclo de vida em situações */}
          <div>
            <Phone>
              <Notch />
              <StatusBar right="▰▰▰ 5G ▮" />
              <PScroll>
                <AppBar title="Pagamentos" back="/app/painel" />

                <Card style={{ padding: '12px 14px' }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span className="eyebrow">Ponto 07-1100</span>
                    <span className="mono faint" style={{ fontSize: 11 }}>Indústria Química Cubatão</span>
                  </Row>
                  <Row style={{ gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                    <Pill variant="warn">2 a vencer</Pill>
                    <Pill variant="act">1 em conciliação</Pill>
                    <Pill variant="bad">1 vencida · atualizada</Pill>
                    <Pill variant="ok">1 quitada</Pill>
                  </Row>
                </Card>

                <Panel style={{ marginTop: 14 }} header={<>Guias de recolhimento <Sp /><Pill variant="label">5</Pill></>}>
                  <Body>
                    <div className="list">
                      {GUIAS.map((g) => (
                        <div className="lrow" key={g.titulo}>
                          <div className="lr-top">
                            <span className={g.faint ? 'lr-title faint' : 'lr-title'}>{g.titulo}</span>
                            <span className={`pill ${g.pillVar}`}>{g.pill}</span>
                          </div>
                          <div className="lr-sub">
                            <span className="pill label" style={{ padding: '0 7px', fontSize: 10.5 }}>{g.origem}</span>
                            <span style={{ marginLeft: 6 }}>{g.sub}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Body>
                </Panel>

              </PScroll>
              <AppTabBar />
              <HomeBar />
            </Phone>
            <PhoneLabel>Carteira de guias · cada linha abre o detalhe ao lado</PhoneLabel>
            <Note style={{ marginTop: 14, fontSize: 12, maxWidth: 300 }}>O ciclo de vida da guia: <b>emitida → registrada → paga (aguardando conciliação) → quitada</b>; vencida → <b>atualizada</b> (instrumento substituto com encargos); substituída ou cancelada. A etapa final, inscrição em dívida ativa após o prazo, é uma exceção de calendário: ingressa numa fila do gestor; a inscrição nunca é automática.</Note>
          </div>

          {/* DETALHE: a guia da multa, com boleto, pix e vínculo com o processo */}
          <div>
            <Phone>
              <Notch />
              <StatusBar right="▰▰▱ 4G ▮" />
              <PScroll>
                <AppBar title="Guia de recolhimento" back />

                <Card style={{ padding: 14 }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <b style={{ fontSize: 13, color: 'var(--ink)' }}>Multa · processo sancionador</b>
                    <Pill variant="warn">vence em 12 dias</Pill>
                  </Row>
                  <Row style={{ gap: 6, marginTop: 6, alignItems: 'center' }}>
                    <Pill variant="label" style={{ fontSize: 10.5 }}>Multa</Pill>
                    <Pill variant="label" style={{ fontSize: 10.5 }}>registrada</Pill>
                  </Row>
                  <hr className="div" style={{ margin: '12px 0' }} />
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12.5 }}>Valor</span><span className="mono" style={{ fontSize: 12.5, color: 'var(--ink)' }}>R$ 11.485,00</span></div>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12.5 }}>Vencimento</span><span className="mono" style={{ fontSize: 12.5 }}>19/06/2026 · em 12 dias</span></div>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12.5 }}>Origem</span><span className="mono" style={{ fontSize: 12.5 }}>processo PAS-2026-0017</span></div>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12.5 }}>Ponto</span><span className="mono" style={{ fontSize: 12.5 }}>07-1100 · OUT-07-2023-011001</span></div>
                  <Btn block sub to="/app/defesa" style={{ marginTop: 10 }}>Abrir o processo →</Btn>
                </Card>

                {/* two parallel rails: boleto (linha digitável) and dynamic pix qr */}
                <Card style={{ padding: 14, marginTop: 12 }}>
                  <div className="eyebrow" style={{ marginBottom: 8 }}>Pagar por boleto ou PIX</div>
                  <Row style={{ gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="muted" style={{ fontSize: 11.5 }}>Linha digitável</div>
                      <div className="mono" style={{ fontSize: 11.5, color: 'var(--ink)', wordBreak: 'break-all', margin: '4px 0 8px' }}>
                        84670000114-8 85002026061-9 90711000123-4 20260619001-7
                      </div>
                      <Btn block>Copiar linha digitável</Btn>
                      <Btn block sub style={{ marginTop: 6 }}>Boleto (PDF)</Btn>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <QrSketch />
                      <div className="muted" style={{ fontSize: 11, marginTop: 6, maxWidth: 90 }}>PIX dinâmico · confirmação instantânea</div>
                    </div>
                  </Row>
                </Card>

                <Card style={{ padding: 14, marginTop: 12 }}>
                  <div className="eyebrow" style={{ marginBottom: 6 }}>Comprovante</div>
                  <div className="muted" style={{ fontSize: 12 }}>Disponível após a liquidação, confirmada por conciliação bancária. Nas guias quitadas, o comprovante fica neste bloco, com data e trilha.</div>
                </Card>

                <Note style={{ marginTop: 12, fontSize: 12 }}>Pagar a multa <b>não encerra o processo</b> se a correção da irregularidade continuar pendente; o cumprimento exige os dois. Os prazos exibidos seguem o rito vigente definido pela SP-Águas.</Note>
              </PScroll>
              <AppTabBar />
              <HomeBar />
            </Phone>
            <PhoneLabel>Detalhe da guia · boleto e PIX lado a lado</PhoneLabel>
            <Note style={{ marginTop: 14, fontSize: 12, maxWidth: 300 }}>O recurso corre <b>sem efeito suspensivo</b>: multa paga e depois provida em recurso gera restituição ou compensação. O vínculo da guia com o processo existe para que esse caso permaneça <b>rastreável</b> quando ocorrer.</Note>
          </div>

        </div>

        <Note style={{ maxWidth: 780, margin: '22px auto 0' }}>
          <b>Não há baixa manual de pagamento.</b> A situação da guia muda por <b>conciliação bancária</b>: retorno do banco arrecadador (arquivo retorno CNAB 240 ou API de cobrança com webhook) para o boleto registrado, e webhook do prestador de pagamento para o PIX dinâmico, com confirmação instantânea. Retorno em valor diferente ou em guia substituída não quita automaticamente; vira pendência para tratativa do gestor, com justificativa e saldo registrado na trilha de auditoria.
        </Note>
      </div>
    </>
  )
}
