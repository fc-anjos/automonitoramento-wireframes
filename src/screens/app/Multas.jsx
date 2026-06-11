import { DraftBanner, Phone, Notch, StatusBar, PScroll, AppBar, AppTabBar, HomeBar, PhoneLabel } from '../../components/shell.jsx'
import { Card, Pill, Btn, Note, Panel, Body, Row, Sp, DataTable } from '../../components/ui.jsx'

// crude qr sketch: three finder squares + scattered modules, wireframe style
const QrSketch = () => (
  <svg viewBox="0 0 84 84" width="84" height="84" aria-label="QR de PIX dinamico"
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

// Situacoes validas da guia de multa (ciclo de vida do instrumento):
// Registrada (emitida e aguardando pagamento), Vencida (prazo esgotado),
// Quitada (liquidada, conciliacao confirmada), Atualizada (instrumento substituto
// com encargos apos vencimento), Substituida (original cancelada, nova emitida).
// Fonte: ciclo de vida do instrumento de arrecadacao; secao 4, Fundamentacao.
const SITUACAO_VAR = {
  'Registrada': 'warn',
  'Vencida': 'bad',
  'Quitada': 'ok',
  'Atualizada': 'bad',
  'Substituida': 'label',
}

const MULTAS = [
  {
    id: 'GRE-2026-0017',
    processo: 'PAS-2026-0017',
    vencimento: '19/06/2026',
    valor: 'R$ 11.485,00',
    situacao: 'Registrada',
  },
  {
    id: 'GRE-2026-0009',
    processo: 'PAS-2026-0009',
    vencimento: '05/04/2026',
    valor: 'R$ 3.200,00',
    situacao: 'Atualizada',
  },
  {
    id: 'GRE-2025-0041',
    processo: 'PAS-2025-0041',
    vencimento: '10/11/2025',
    valor: 'R$ 5.600,00',
    situacao: 'Quitada',
  },
  {
    id: 'GRE-2025-0028',
    processo: 'PAS-2025-0028',
    vencimento: '14/08/2025',
    valor: 'R$ 2.100,00',
    situacao: 'Substituida',
  },
]

const COLS = [
  { key: 'id', label: 'Guia' },
  { key: 'vencimento', label: 'Vencimento' },
  { key: 'valor', label: 'Valor', num: true },
  {
    key: 'situacao',
    label: 'Situacao',
    render: (r) => <Pill variant={SITUACAO_VAR[r.situacao]}>{r.situacao}</Pill>,
  },
]

export default function AppMultas() {
  return (
    <>
      <DraftBanner tag="APP · 09" title="Multas" />

      <div className="wrap">
        <Note style={{ maxWidth: 780, margin: '0 auto 22px' }}>
          <b>A guia de multa como artefato do processo sancionador.</b> A guia de recolhimento e a multa sao artefatos do processo administrativo sancionador. A emissao e disparada pelo julgamento definitivo: o despacho de julgamento calcula o valor e gera a guia com vencimento; o outorgado paga por boleto registrado ou PIX dinamico. A situacao da guia muda por conciliacao bancaria. O visto do processo permanece vinculado a guia para rastreabilidade em caso de recurso deferido.
        </Note>

        <div className="phone-stage" style={{ justifyContent: 'center' }}>

          {/* CARTEIRA: lista de multas do outorgado */}
          <div>
            <Phone>
              <Notch />
              <StatusBar right="▰▰▰ 5G ▮" />
              <PScroll>
                <AppBar title="Multas" back="/app/inicio" />

                <Card style={{ padding: '12px 14px' }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span className="eyebrow">Ponto 07-1100</span>
                    <span className="mono faint" style={{ fontSize: 11 }}>Industria Quimica Cubatao</span>
                  </Row>
                  <Row style={{ gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                    <Pill variant="warn">1 registrada</Pill>
                    <Pill variant="bad">1 vencida · atualizada</Pill>
                    <Pill variant="ok">1 quitada</Pill>
                    <Pill variant="label">1 substituida</Pill>
                  </Row>
                </Card>

                <Panel style={{ marginTop: 14 }} header={<>Guias de multa <Sp /><Pill variant="label">4</Pill></>}>
                  <Body>
                    <DataTable
                      columns={COLS}
                      rows={MULTAS}
                      pageSize={4}
                      search={['id', 'processo', 'situacao']}
                      searchPlaceholder="Buscar guia ou processo..."
                    />
                  </Body>
                </Panel>

              </PScroll>
              <AppTabBar active="multas" />
              <HomeBar />
            </Phone>
            <PhoneLabel>Carteira de multas · cada linha abre o detalhe ao lado</PhoneLabel>
            <Note style={{ marginTop: 14, fontSize: 12, maxWidth: 300 }}>
              Situacoes do ciclo de vida: <b>Registrada</b> (emitida, aguardando pagamento), <b>Vencida</b> (prazo esgotado sem pagamento), <b>Atualizada</b> (instrumento substituto com encargos, apos vencimento), <b>Substituida</b> (original cancelada; nova guia emitida), <b>Quitada</b> (liquidada, conciliacao confirmada). A inscricao em divida ativa ingressa em fila do gestor.
            </Note>
          </div>

          {/* DETALHE: guia da multa, boleto + PIX, vinculo com o processo */}
          <div>
            <Phone>
              <Notch />
              <StatusBar right="▰▰▱ 4G ▮" />
              <PScroll>
                <AppBar title="Guia de multa" back />

                <Card style={{ padding: 14 }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <b style={{ fontSize: 13, color: 'var(--ink)' }}>Multa · processo sancionador</b>
                    <Pill variant="warn">Registrada</Pill>
                  </Row>
                  <div className="muted" style={{ fontSize: 11.5, marginTop: 4 }}>GRE-2026-0017</div>
                  <hr className="div" style={{ margin: '12px 0' }} />
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12.5 }}>Valor</span><span className="mono" style={{ fontSize: 12.5, color: 'var(--ink)' }}>R$ 11.485,00</span></div>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12.5 }}>Vencimento</span><span className="mono" style={{ fontSize: 12.5 }}>19/06/2026 · em 12 dias</span></div>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12.5 }}>Processo</span><span className="mono" style={{ fontSize: 12.5 }}>PAS-2026-0017</span></div>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12.5 }}>Ponto</span><span className="mono" style={{ fontSize: 12.5 }}>07-1100 · OUT-07-2023-011001</span></div>
                  <Btn block sub to="/app/defesa" style={{ marginTop: 10 }}>Abrir o processo</Btn>
                </Card>

                {/* dois trilhos paralelos: boleto (linha digitavel) e PIX dinamico */}
                <Card style={{ padding: 14, marginTop: 12 }}>
                  <div className="eyebrow" style={{ marginBottom: 8 }}>Pagar por boleto ou PIX</div>
                  <Row style={{ gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="muted" style={{ fontSize: 11.5 }}>Linha digitavel</div>
                      <div className="mono" style={{ fontSize: 11.5, color: 'var(--ink)', wordBreak: 'break-all', margin: '4px 0 8px' }}>
                        84670000114-8 85002026061-9 90711000123-4 20260619001-7
                      </div>
                      <Btn block>Copiar linha digitavel</Btn>
                      <Btn block sub style={{ marginTop: 6 }}>Boleto (PDF)</Btn>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <QrSketch />
                      <div className="muted" style={{ fontSize: 11, marginTop: 6, maxWidth: 90 }}>PIX dinamico · confirmacao instantanea</div>
                    </div>
                  </Row>
                </Card>

                <Card style={{ padding: 14, marginTop: 12 }}>
                  <div className="eyebrow" style={{ marginBottom: 6 }}>Comprovante</div>
                  <div className="muted" style={{ fontSize: 12 }}>Disponivel apos a liquidacao, confirmada por conciliacao bancaria. Nas guias quitadas, o comprovante fica neste bloco, com data e trilha de auditoria.</div>
                </Card>

                <Note style={{ marginTop: 12, fontSize: 12 }}>Pagar a multa <b>nao encerra o processo</b> se a correcao da irregularidade continuar pendente; o cumprimento exige os dois. O recurso corre <b>sem efeito suspensivo</b> (Lei 10.177/1998, art. 46): multa paga e depois provida em recurso gera <b>restituicao rastreavel</b>; o vinculo da guia com o processo garante essa trilha.</Note>
              </PScroll>
              <AppTabBar active="multas" />
              <HomeBar />
            </Phone>
            <PhoneLabel>Detalhe da guia · boleto e PIX lado a lado</PhoneLabel>
            <Note style={{ marginTop: 14, fontSize: 12, maxWidth: 300 }}>
              A situacao da guia muda por <b>conciliacao bancaria</b>: retorno CNAB 240 para boleto registrado; webhook do prestador para PIX dinamico. Retorno em valor divergente ou em guia substituida nao quita automaticamente; vira pendencia para o gestor, com justificativa e saldo na trilha.
            </Note>
          </div>

        </div>

        <Note style={{ maxWidth: 780, margin: '22px auto 0' }}>
          <b>Nao ha baixa manual de pagamento.</b> A situacao da guia muda exclusivamente por conciliacao bancaria. O visto do processo permanece vinculado a guia para que, em caso de recurso deferido, a restituicao ou compensacao seja rastreavel sem ambiguidade. O encerramento do processo e ato do gestor, posterior a quitacao e a comprovacao da correcao da irregularidade.
        </Note>
      </div>
    </>
  )
}
