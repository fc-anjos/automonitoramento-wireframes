import { useState } from 'react'
import { DraftBanner, Phone, Notch, StatusBar, PScroll, AppBar, AppTabBar, HomeBar, PhoneLabel } from '../../components/shell.jsx'
import { Card, Pill, Btn, Note, Panel, Body, Row, Sp, Tabs, DataTable } from '../../components/ui.jsx'

// APP · 08  Justificativas de ausência de declaração
// Reached from Declaração/Início. AppTabBar active: declaracao.
//
// Estado da justificativa (SiDeCC, Fundamentação seção 4):
//   Aguardando avaliação · Aprovado · Reprovado
//
// Dois estados da tela:
//   (1) Abrir -- formulário de nova justificativa (período, motivo, anexo)
//   (2) Acompanhar -- histórico com o estado de avaliação por justificativa
//
// A justificativa é fila própria separada das Solicitações (decisão 2.6 da Abordagem).
// Medição alternativa segue o mesmo trilho (estado Aguardando avaliação · Aprovado · Reprovado).

const HIST = [
  {
    id: 1,
    periodo: '01/07 a 31/07/2026',
    motivo: 'Férias coletivas',
    registrada: '07/06/2026',
    estado: 'Aguardando avaliação',
    _est: 'warn',
    obs: 'Registrada antes do início do período.',
  },
  {
    id: 2,
    periodo: '10/01 a 24/01/2026',
    motivo: 'Manutenção',
    registrada: '03/01/2026',
    estado: 'Aprovado',
    _est: 'ok',
    obs: 'Substituição da adutora · aprovado em 28/01.',
  },
  {
    id: 3,
    periodo: '01/07 a 15/07/2025',
    motivo: 'Paralisação total',
    registrada: '22/06/2025',
    estado: 'Aprovado',
    _est: 'ok',
    obs: 'Parada da planta · aprovado em 21/07/2025.',
  },
  {
    id: 4,
    periodo: '15/03 a 22/03/2025',
    motivo: 'Manutenção',
    registrada: '10/03/2025',
    estado: 'Reprovado',
    _est: 'bad',
    obs: 'Documentação insuficiente · reprovado em 02/04/2025.',
  },
]

function FormAbrir() {
  return (
    <>
      {/* O diferencial: registrada antes do período */}
      <Card style={{ padding: 12, marginBottom: 14 }}>
        <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <b style={{ fontSize: 13, color: 'var(--ink)' }}>Registro antecipado</b>
          <Pill variant="ok">antes do período</Pill>
        </Row>
        <div className="muted" style={{ fontSize: 11.5, marginTop: 4 }}>
          hoje 07/06 · o período declarado começa em 01/07
        </div>
      </Card>

      <div className="stack">
        {/* Período da ausência */}
        <label className="field">
          <span>Início do período</span>
          <div className="input">
            <span className="mono" style={{ color: 'var(--ink)' }}>01/07/2026</span>
            <span className="sp" style={{ flex: 1 }} />
            <span>📅</span>
          </div>
        </label>
        <label className="field">
          <span>Fim do período</span>
          <div className="input">
            <span className="mono" style={{ color: 'var(--ink)' }}>31/07/2026</span>
            <span className="sp" style={{ flex: 1 }} />
            <span>📅</span>
          </div>
        </label>

        {/* Motivo: lista de opções fixas, sem inventar novos itens */}
        <div className="field">
          <span>Motivo</span>
          <div className="list">
            <div className="lrow">
              <div className="lr-top">
                <span className="lr-title">Paralisação total</span>
                <span className="mono faint">○</span>
              </div>
            </div>
            <div className="lrow">
              <div className="lr-top">
                <span className="lr-title">Férias coletivas</span>
                <Pill variant="act">●</Pill>
              </div>
            </div>
            <div className="lrow">
              <div className="lr-top">
                <span className="lr-title">Manutenção</span>
                <span className="mono faint">○</span>
              </div>
            </div>
          </div>
        </div>

        {/* Observações */}
        <label className="field">
          <span>Observações (opcional)</span>
          <div className="input tall faint">Ex.: parada programada da linha de produção…</div>
        </label>

        {/* Anexo: laudo ou documento comprobatório */}
        <div className="field">
          <span>Documento comprobatório (opcional)</span>
          <div className="input faint" style={{ gap: 8 }}>
            <span>📎</span>
            <span>Nenhum arquivo selecionado</span>
          </div>
        </div>
      </div>

      <Btn block lg style={{ marginTop: 14 }}>Registrar justificativa →</Btn>

      <Note style={{ marginTop: 10, fontSize: 11.5 }}>
        O registro antecipado evita a exceção de declaração ausente no período informado.
        O acatamento é ato do gestor; a justificativa permanece no histórico independentemente
        do resultado.
      </Note>
    </>
  )
}

function ListaHistorico() {
  return (
    <>
      <DataTable
        columns={[
          { key: 'periodo', label: 'Período' },
          { key: 'motivo', label: 'Motivo' },
          {
            key: 'estado',
            label: 'Estado',
            render: (r) => <Pill variant={r._est}>{r.estado}</Pill>,
          },
        ]}
        rows={HIST}
        search={['periodo', 'motivo', 'estado']}
        searchPlaceholder="Buscar no histórico…"
        universe={12}
        pageSize={4}
      />

      <Note style={{ marginTop: 12, fontSize: 11.5 }}>
        Estado da justificativa (SiDeCC): Aguardando avaliação · Aprovado · Reprovado.
        A avaliação é ato do gestor; o outorgado acompanha o estado.
      </Note>
    </>
  )
}

export default function AppJustificativas() {
  const [aba, setAba] = useState('abrir')

  return (
    <>
      <DraftBanner tag="APP · 08" title="Justificativas de ausência" />

      <div className="wrap">
        <Note style={{ maxWidth: 760, margin: '0 auto 22px' }}>
          <b>Justificativa de ausência de declaração.</b> O outorgado avisa, antes do período,
          que não haverá captação (paralisação total, férias coletivas, manutenção). O período
          avisado não gera exceção de declaração ausente. O acatamento é ato do gestor, com
          estados do SiDeCC: Aguardando avaliação, Aprovado e Reprovado. A justificativa é fila
          própria, separada das Solicitações; medição alternativa segue o mesmo trilho de
          avaliação.
        </Note>

        <div className="phone-stage" style={{ justifyContent: 'center' }}>

          {/* PHONE 1: formulário de abertura de justificativa */}
          <div>
            <Phone>
              <Notch />
              <StatusBar right="▰▰▰ 5G ▮" />
              <PScroll>
                <AppBar title="Justificativas" back="/app/autodeclaracao" />

                {/* Contexto do ponto */}
                <Card style={{ padding: '10px 14px', marginBottom: 12 }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span className="eyebrow">Captação 07-1001</span>
                    <span className="mono faint" style={{ fontSize: 11 }}>OUT-07-2024-001234</span>
                  </Row>
                  <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>
                    Indústria Cubatão S/A · frequência diária
                  </div>
                </Card>

                {/* Seletor de aba: Abrir / Acompanhar */}
                <Tabs
                  tabs={[
                    { key: 'abrir', label: 'Abrir justificativa' },
                    { key: 'acompanhar', label: 'Acompanhar' },
                  ]}
                  active={aba}
                  onSelect={setAba}
                  style={{ marginBottom: 14 }}
                />

                {aba === 'abrir' ? <FormAbrir /> : <ListaHistorico />}
              </PScroll>
              <AppTabBar active="declaracao" />
              <HomeBar />
            </Phone>
            <PhoneLabel>Justificativa · formulário (aba Abrir)</PhoneLabel>

            <Note style={{ maxWidth: 340, margin: '16px auto 0', fontSize: 12 }}>
              A justificativa antecipada inverte o fluxo do apontamento: em vez de responder
              a uma omissão já detectada, o outorgado avisa antes que não haverá captação nem
              declaração no período. O registro antecipado é o diferenciador.
            </Note>
          </div>

          {/* PHONE 2: histórico com o estado de avaliação */}
          <div>
            <Phone>
              <Notch />
              <StatusBar right="▰▰▱ 4G ▮" />
              <PScroll>
                <AppBar title="Justificativas" back="/app/autodeclaracao" />

                <Card style={{ padding: '10px 14px', marginBottom: 12 }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span className="eyebrow">Captação 07-1001</span>
                    <span className="mono faint" style={{ fontSize: 11 }}>OUT-07-2024-001234</span>
                  </Row>
                  <Row style={{ gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
                    <Pill variant="warn">1 aguardando avaliação</Pill>
                    <Pill variant="ok">2 aprovadas</Pill>
                    <Pill variant="bad">1 reprovada</Pill>
                  </Row>
                </Card>

                <Tabs
                  tabs={[
                    { key: 'abrir', label: 'Abrir justificativa' },
                    { key: 'acompanhar', label: 'Acompanhar' },
                  ]}
                  active="acompanhar"
                  onSelect={() => {}}
                  style={{ marginBottom: 14 }}
                />

                {/* Histórico como lista com estado */}
                <Panel header={<>Histórico <Sp /><Pill variant="label">4 de 12</Pill></>}>
                  <Body>
                    <div className="list">

                      {/* Aguardando avaliação */}
                      <div className="lrow">
                        <div className="lr-top">
                          <span className="lr-title">01/07 a 31/07/2026 · férias coletivas</span>
                          <Pill variant="warn" style={{ fontSize: 10 }}>Aguardando avaliação</Pill>
                        </div>
                        <div className="lr-sub">Registrada em 07/06, antes do início do período.</div>
                      </div>

                      {/* Aprovado */}
                      <div className="lrow">
                        <div className="lr-top">
                          <span className="lr-title">10/01 a 24/01/2026 · manutenção</span>
                          <Pill variant="ok" style={{ fontSize: 10 }}>Aprovado</Pill>
                        </div>
                        <div className="lr-sub">Substituição da adutora · aprovado em 28/01.</div>
                      </div>

                      {/* Aprovado */}
                      <div className="lrow">
                        <div className="lr-top">
                          <span className="lr-title">01/07 a 15/07/2025 · paralisação total</span>
                          <Pill variant="ok" style={{ fontSize: 10 }}>Aprovado</Pill>
                        </div>
                        <div className="lr-sub">Parada da planta · aprovado em 21/07/2025.</div>
                      </div>

                      {/* Reprovado */}
                      <div className="lrow">
                        <div className="lr-top">
                          <span className="lr-title faint">15/03 a 22/03/2025 · manutenção</span>
                          <Pill variant="bad" style={{ fontSize: 10 }}>Reprovado</Pill>
                        </div>
                        <div className="lr-sub faint">Documentação insuficiente · reprovado em 02/04/2025.</div>
                      </div>

                    </div>
                  </Body>
                </Panel>

                <Btn block style={{ marginTop: 14 }}>+ Nova justificativa</Btn>
              </PScroll>
              <AppTabBar active="declaracao" />
              <HomeBar />
            </Phone>
            <PhoneLabel>Justificativa · histórico (aba Acompanhar)</PhoneLabel>

            <Note style={{ maxWidth: 340, margin: '16px auto 0', fontSize: 12 }}>
              Estados do SiDeCC: Aguardando avaliação, Aprovado e Reprovado. A avaliação é ato
              do gestor; a justificativa reprovada permanece no histórico e o período original
              pode gerar exceção de declaração ausente. Medição alternativa segue o mesmo
              trilho.
            </Note>
          </div>

        </div>

        <Note style={{ maxWidth: 760, margin: '22px auto 0' }}>
          <b>A justificativa é objeto avaliável por si, fila própria.</b> No SiDeCC, as subabas
          internas Justificativas e Solicitações são filas distintas do gestor; o redesenho
          preserva essa separação. A justificativa cobre o caso em que o uso continua mas há um
          período programado sem captação: o outorgado registra antes, o gestor avalia e o
          período fica marcado na trilha, aprovado ou reprovado.
        </Note>

        <Note style={{ maxWidth: 760, margin: '14px auto 0' }}>
          A <b>medição alternativa</b> (volume informado sem leitura de medidor, quando
          autorizada) segue o mesmo trilho de avaliação: Aguardando avaliação, Aprovado,
          Reprovado. Ambas são submetidas pelo outorgado e avaliadas pelo gestor; nenhuma delas
          é auto-aprovada. Os tipos de declaração do SiDeCC (leitura de rotina, leitura ao
          remover, leitura ao reinstalar, medição alternativa) são atributos da declaração, não
          desta tela; eles residem na autodeclaração.
        </Note>
      </div>
    </>
  )
}
