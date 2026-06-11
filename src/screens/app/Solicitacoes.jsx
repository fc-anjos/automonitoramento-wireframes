import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DraftBanner, Phone, Notch, StatusBar, PScroll, AppBar, AppTabBar, HomeBar, PhoneLabel } from '../../components/shell.jsx'
import { Card, Pill, Btn, Meter, Note, Panel, Body, Row, Sp, DataTable } from '../../components/ui.jsx'

// Tipos de solicitação (Fundamentação, seção 4 – "Tipos de solicitação"):
//   renovação · ampliação · redução · transferência · dispensa · desativação
//   inclusão/troca/desativação de medidor · interligação à telemetria (COT-R)
// Justificativa de ausência de declaração NÃO aparece aqui: objeto separado em app-justificativas.

// COT-R rito: ofício → proposta técnica → análise → deferimento → login experimental → login operacional

const SOL_COLS = [
  { key: 'num', label: 'Solicitação' },
  { key: 'tipo', label: 'Tipo' },
  { key: 'protocolo', label: 'Protocolada' },
  {
    key: 'estado', label: 'Estado',
    render: (r) => <Pill variant={r.estadoVar}>{r.estado}</Pill>,
  },
]

const SOL_ROWS = [
  {
    id: 'sol-01',
    num: 'SOL-2026-0467',
    tipo: 'Troca de medidor',
    protocolo: '05/06/2026',
    estado: 'em análise',
    estadoVar: 'warn',
  },
  {
    id: 'sol-02',
    num: 'SOL-2026-0301',
    tipo: 'Interligação à telemetria (COT-R)',
    protocolo: '28/05/2026',
    estado: 'proposta técnica',
    estadoVar: 'warn',
  },
  {
    id: 'sol-03',
    num: 'SOL-2025-1182',
    tipo: 'Redução',
    protocolo: '14/11/2025',
    estado: 'deferida',
    estadoVar: 'ok',
  },
  {
    id: 'sol-04',
    num: 'SOL-2025-0890',
    tipo: 'Ampliação',
    protocolo: '03/08/2025',
    estado: 'indeferida',
    estadoVar: 'bad',
  },
]

// Etapas do rito COT-R, com o passo atual marcado.
// Etapa atual: proposta técnica (etapa 2)
const COTR_RITO = [
  { key: 'oficio', label: 'Ofício', sub: 'A SP-Águas oficia o outorgado a interligar o ponto.', data: '28/05', atual: false, futuro: false },
  { key: 'proposta', label: 'Proposta técnica de transmissão', sub: 'Você descreve equipamentos e meio de transmissão; é esta a solicitação que se protocola aqui.', data: '30 dias', atual: true, futuro: false },
  { key: 'analise', label: 'Análise e deferimento', sub: 'O gestor analisa a proposta e a defere ou pede ajuste.', data: 'a seguir', atual: false, futuro: true },
  { key: 'exp', label: 'Login experimental', sub: 'Transmissão em teste, validada contra as leituras locais.', data: 'a seguir', atual: false, futuro: true },
  { key: 'op', label: 'Login operacional', sub: 'O ponto passa a transmitir em caráter definitivo.', data: 'a seguir', atual: false, futuro: true },
]

export default function Solicitacoes() {
  const [tab, setTab] = useState('catalogo') // 'catalogo' | 'minhas'

  return (
    <>
      <DraftBanner tag="APP · 06" title="Solicitações" />

      <div className="wrap">
        <Note style={{ maxWidth: 760, margin: '0 auto 22px' }}>
          <b>Catálogo e índice de solicitações do outorgado.</b> A tela apresenta dois modos: o <b>catálogo</b> lista os tipos disponíveis (renovação, ampliação, redução, transferência, dispensa, desativação, inclusão/troca/desativação de medidor e interligação à telemetria via COT-R); o índice <b>Minhas solicitações</b> traz as solicitações já protocoladas com seu estado. A justificativa de ausência de declaração é objeto separado, acessível pela aba "Justificativas".
        </Note>

        <div className="phone-stage" style={{ justifyContent: 'center' }}>

          {/* PHONE 1: catálogo + índice em abas */}
          <div>
            <Phone>
              <Notch />
              <StatusBar right="▰▰▰ 5G ▮" />
              <PScroll>
                <AppBar title="Solicitações" back="/app/inicio" />

                {/* Validade da outorga – sinal de calendário */}
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

                {/* Segmento: catálogo / minhas */}
                <div className="seg" style={{ marginTop: 14 }}>
                  <span className={`s${tab === 'catalogo' ? ' on' : ''}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setTab('catalogo')}>Catálogo</span>
                  <span className={`s${tab === 'minhas' ? ' on' : ''}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setTab('minhas')}>Minhas solicitações</span>
                </div>

                {tab === 'catalogo' && (
                  <>
                    {/* CATÁLOGO 1: pedidos sobre a outorga */}
                    <Panel style={{ marginTop: 14 }} header="Sobre a outorga">
                      <Body>
                        <div className="list">
                          <a className="lrow" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                            <div className="lr-top"><span className="lr-title">Renovação</span><Pill variant="warn">a fazer · vence em 40 dias</Pill></div>
                            <div className="lr-sub">Prorrogar a validade antes do vencimento (17/07).</div>
                          </a>
                          <a className="lrow" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                            <div className="lr-top"><span className="lr-title">Ampliação</span><Pill variant="label">disponível</Pill></div>
                            <div className="lr-sub">Solicitar aumento de vazão ou volume outorgado.</div>
                          </a>
                          <a className="lrow" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                            <div className="lr-top"><span className="lr-title">Redução</span><Pill variant="label">disponível</Pill></div>
                            <div className="lr-sub">Diminuir o volume outorgado conforme o uso real.</div>
                          </a>
                          <a className="lrow" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                            <div className="lr-top"><span className="lr-title">Transferência</span><Pill variant="label">disponível</Pill></div>
                            <div className="lr-sub">Transferir a titularidade da outorga.</div>
                          </a>
                          <a className="lrow" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                            <div className="lr-top"><span className="lr-title">Dispensa</span><Pill variant="label">disponível</Pill></div>
                            <div className="lr-sub">Requerer dispensa de outorga para uso insignificante.</div>
                          </a>
                          <a className="lrow" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                            <div className="lr-top"><span className="lr-title">Desativação</span><Pill variant="label">disponível</Pill></div>
                            <div className="lr-sub">Encerrar o uso e baixar a outorga (evita perecimento por inércia).</div>
                          </a>
                        </div>
                      </Body>
                    </Panel>

                    {/* CATÁLOGO 2: pedidos sobre o equipamento */}
                    <Panel style={{ marginTop: 14 }} header="Sobre medidores">
                      <Body>
                        <div className="list">
                          <Link className="lrow" to="/app/medidor" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                            <div className="lr-top"><span className="lr-title">Inclusão de medidor</span><Pill variant="label">equipamento</Pill></div>
                            <div className="lr-sub">Cadastrar um novo medidor na captação.</div>
                          </Link>
                          <Link className="lrow" to="/app/medidor" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                            <div className="lr-top"><span className="lr-title">Troca de medidor</span><Pill variant="label">equipamento</Pill></div>
                            <div className="lr-sub">Substituir medidor existente; leitura final e inicial vinculadas.</div>
                          </Link>
                          <Link className="lrow" to="/app/medidor" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                            <div className="lr-top"><span className="lr-title">Desativação de medidor</span><Pill variant="label">equipamento</Pill></div>
                            <div className="lr-sub">Desativar medidor; histórico e vínculo preservados.</div>
                          </Link>
                        </div>
                      </Body>
                    </Panel>

                    {/* CATÁLOGO 3: interligação à telemetria */}
                    <Panel style={{ marginTop: 14 }} header="Interligação à telemetria">
                      <Body>
                        <div className="list">
                          <a className="lrow" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                            <div className="lr-top"><span className="lr-title">Interligação COT-R</span><Pill variant="label">telemetria</Pill></div>
                            <div className="lr-sub">Protocolar a proposta técnica de transmissão (SiDeCC-R).</div>
                          </a>
                        </div>
                      </Body>
                    </Panel>
                  </>
                )}

                {tab === 'minhas' && (
                  <Panel style={{ marginTop: 14 }} header={<>Minhas solicitações <Sp /><Pill variant="label">4</Pill></>}>
                    <Body>
                      <DataTable
                        columns={SOL_COLS}
                        rows={SOL_ROWS}
                        search={['num', 'tipo', 'estado']}
                        searchPlaceholder="Buscar solicitação…"
                        universe={12}
                        pageSize={4}
                      />
                    </Body>
                  </Panel>
                )}

              </PScroll>
              <AppTabBar active="solicitacoes" />
              <HomeBar />
            </Phone>
            <PhoneLabel>Solicitações · catálogo de tipos e índice de minhas solicitações</PhoneLabel>

            <Note style={{ maxWidth: 340, margin: '16px auto 0', fontSize: 12 }}>
              O catálogo restringe-se aos tipos previstos: renovação, ampliação, redução, transferência, dispensa, desativação, inclusão/troca/desativação de medidor e interligação à telemetria (COT-R). A justificativa de ausência de declaração fica em "Justificativas", objeto próprio com estados Aguardando avaliação, Aprovado e Reprovado.
            </Note>
          </div>

          {/* PHONE 2: detalhe de uma solicitação (exemplo: troca de medidor) */}
          <div>
            <Phone>
              <Notch />
              <StatusBar right="▰▰▰ 5G ▮" />
              <PScroll>
                <AppBar title="SOL-2026-0467" back />

                <Card style={{ padding: 14 }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <b style={{ fontSize: 13, color: 'var(--ink)' }}>Troca de medidor</b>
                    <Pill variant="warn">em análise</Pill>
                  </Row>
                  <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>OUT-07-2024-001234 · ponto 07-1001 · Indústria Cubatão S/A</div>
                  <div className="mono faint" style={{ fontSize: 11.5, marginTop: 4 }}>Protocolada em 05/06/2026 · última atualização 10/06</div>
                </Card>

                <Panel style={{ marginTop: 14 }} header="Andamento">
                  <Body>
                    <div className="list">
                      <div className="lrow">
                        <div className="lr-top">
                          <span className="lr-title">Protocolada</span>
                          <span className="mono faint" style={{ fontSize: 11 }}>05/06</span>
                        </div>
                        <div className="lr-sub">Solicitação recebida com medidor que sai, medidor que entra e foto da instalação.</div>
                      </div>
                      <div className="lrow" style={{ background: 'var(--act-soft)', margin: '0 -14px', paddingLeft: 14, paddingRight: 14 }}>
                        <div className="lr-top">
                          <span className="lr-title">Em análise</span>
                          <Pill variant="warn" style={{ fontSize: 10.5 }}>fase atual</Pill>
                        </div>
                        <div className="lr-sub">Gestor confere dados do equipamento e leitura inicial antes de deferir.</div>
                      </div>
                      <div className="lrow">
                        <div className="lr-top">
                          <span className="lr-title faint">Despacho</span>
                          <span className="mono faint" style={{ fontSize: 11 }}>a seguir</span>
                        </div>
                        <div className="lr-sub faint">Deferir, indeferir ou pedir complemento; cada despacho fica datado na trilha.</div>
                      </div>
                    </div>
                  </Body>
                </Panel>

                <Panel style={{ marginTop: 14 }} header={<>Resumo técnico <Sp /><Pill variant="label">campos em Medidores</Pill></>}>
                  <Body>
                    <div className="mrow"><span className="msp muted" style={{ fontSize: 12 }}>Medidor que sai</span><span className="mono" style={{ fontSize: 12 }}>HID-88412 · leitura final informada</span></div>
                    <div className="mrow"><span className="msp muted" style={{ fontSize: 12 }}>Medidor que entra</span><span className="mono" style={{ fontSize: 12 }}>B24-009731 · leitura inicial informada</span></div>
                    <div className="mrow"><span className="msp muted" style={{ fontSize: 12 }}>Comprovação</span><span className="mono" style={{ fontSize: 12 }}>foto da instalação anexada</span></div>
                  </Body>
                </Panel>

                <Btn block lg to="/app/medidor" style={{ marginTop: 14 }}>Abrir cadastro de medidores →</Btn>
                <Btn block sub style={{ marginTop: 8 }}>Anexar complemento</Btn>
              </PScroll>
              <AppTabBar active="solicitacoes" />
              <HomeBar />
            </Phone>
            <PhoneLabel>Detalhe da solicitação · estado, trilha e complemento</PhoneLabel>

            <Note style={{ maxWidth: 340, margin: '16px auto 0', fontSize: 12 }}>
              A tela de solicitações acompanha <b>estado, prazos e despachos</b>. O formulário completo do equipamento fica em <Link to="/app/medidor">Medidores</Link>, onde inclusão, troca e desativação compartilham o mesmo cadastro técnico.
            </Note>
          </div>

          {/* PHONE 3: rito COT-R em detalhe (interligação à telemetria) */}
          <div>
            <Phone>
              <Notch />
              <StatusBar right="▰▰▰ 5G ▮" />
              <PScroll>
                <AppBar title="SOL-2026-0301" back />

                <Card style={{ padding: 14 }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <b style={{ fontSize: 13, color: 'var(--ink)' }}>Interligação à telemetria (COT-R)</b>
                    <Pill variant="warn">proposta técnica</Pill>
                  </Row>
                  <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>OUT-07-2024-001234 · ponto 07-1001 · Indústria Cubatão S/A</div>
                  <div className="mono faint" style={{ fontSize: 11.5, marginTop: 4 }}>Ofício recebido 28/05 · proposta em elaboração · prazo: 27/06</div>
                </Card>

                {/* COT-R rito: ofício → proposta técnica → análise → deferimento → login experimental → login operacional */}
                <Panel style={{ marginTop: 14 }} header="Rito COT-R · etapas">
                  <Body>
                    <div className="list">
                      {COTR_RITO.map((e) => (
                        <div
                          key={e.key}
                          className="lrow"
                          style={e.atual ? { background: 'var(--act-soft)', margin: '0 -14px', paddingLeft: 14, paddingRight: 14 } : undefined}
                        >
                          <div className="lr-top">
                            <span className={e.futuro ? 'lr-title faint' : 'lr-title'}>{e.label}</span>
                            {e.atual
                              ? <Pill variant="warn" style={{ fontSize: 10.5 }}>{e.data}</Pill>
                              : <span className="mono faint" style={{ fontSize: 11 }}>{e.data}</span>}
                          </div>
                          <div className={e.futuro ? 'lr-sub faint' : 'lr-sub'}>{e.sub}</div>
                        </div>
                      ))}
                    </div>
                  </Body>
                </Panel>

                <Btn block lg style={{ marginTop: 14 }}>Enviar proposta técnica →</Btn>
                <Btn block sub style={{ marginTop: 8 }}>Anexar documento</Btn>
              </PScroll>
              <AppTabBar active="solicitacoes" />
              <HomeBar />
            </Phone>
            <PhoneLabel>Interligação COT-R · rito completo, etapa atual destacada</PhoneLabel>

            <Note style={{ maxWidth: 340, margin: '16px auto 0', fontSize: 12 }}>
              O rito COT-R tem cinco etapas: ofício (ato da SP-Águas), proposta técnica de transmissão (ato do outorgado, prazo de 30 dias), análise e deferimento (ato do gestor), login experimental (transmissão em teste) e login operacional (transmissão definitiva). O que o outorgado protocola aqui é exclusivamente a <b>proposta técnica</b>; as demais etapas são atos do gestor, acompanhados como estados da solicitação.
            </Note>
          </div>

        </div>

        <Note style={{ maxWidth: 760, margin: '22px auto 0' }}>
          O pedido de <b>renovação</b> deve ser protocolado <b>antes</b> do vencimento. A outorga sem uso perece em 3 anos; se o uso cessou, vale registrar a desativação para não perder o direito por inércia. Os tipos disponíveis estão fixados pelo modelo de domínio com âncora normativa: renovação, ampliação, redução, transferência e dispensa derivam do ciclo de vida da outorga (Portaria DAEE 1.630/2017, arts. 29-35); inclusão, troca e desativação de medidor derivam do rito de automonitoramento (Portaria DAEE 5.578/2018 e TR §6.8); interligação à telemetria deriva do COT-R (Portaria DAEE 6.987/2018, art. 5º).
        </Note>

        <Note style={{ maxWidth: 760, margin: '14px auto 0' }}>
          O outorgado <b>protocola</b> a solicitação; o deferimento é do gestor. A renovação tem efeito de silêncio positivo: se o gestor silenciar por 30 dias após o pedido tempestivo, renova-se automaticamente. Os demais tipos não têm silêncio positivo: medidor e proposta técnica aguardam o despacho, e cada despacho fica datado na trilha.
        </Note>
      </div>
    </>
  )
}
