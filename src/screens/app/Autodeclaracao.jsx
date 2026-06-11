import { useState } from 'react'
import { DraftBanner, Phone, Notch, StatusBar, PScroll, AppBar, AppTabBar, HomeBar, PhoneLabel } from '../../components/shell.jsx'
import { Card, Pill, Btn, Meter, Note, Row, DataTable, Verb } from '../../components/ui.jsx'

// ---- Tipos de Declaração (SiDeCC, TR §6.8) ---------------------------------
// 4 tipos canônicos; nenhum outro é válido.
const TIPOS = [
  {
    key: 'rotina',
    label: 'Leitura de Rotina',
    sub: 'declaração periódica do medidor em uso',
  },
  {
    key: 'remover',
    label: 'Leitura ao Remover Equipamento',
    sub: 'última leitura do medidor que sai',
  },
  {
    key: 'reinstalar',
    label: 'Leitura ao Reinstalar Equipamento',
    sub: 'leitura inicial do medidor que entra',
  },
  {
    key: 'alternativa',
    label: 'Medição Alternativa (volume)',
    sub: 'volume informado sem leitura, quando autorizada',
  },
]

// ---- Modal: "Declaração de Leitura do Medidor" (SiDeCC §3.1) ---------------
// Campos obrigatórios do modal legado, preservados verbatim:
// Declaração · Data da Leitura · Hora da Leitura · Leitura do medidor ·
// Medidor Zerado (caixa) · Cadastrar / Fechar.
function ModalDeclaracao({ tipo, onClose }) {
  const [zerado, setZerado] = useState(false)
  return (
    <div className="veil" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">Declaração de Leitura do Medidor</div>

        {/* campo Declaração: mostra o tipo selecionado, não editável aqui */}
        <div style={{ marginBottom: 10 }}>
          <div className="muted" style={{ fontSize: 11, marginBottom: 3 }}>Declaração</div>
          <div className="input" style={{ minHeight: 34, background: 'var(--bg)' }}>
            <span style={{ fontSize: 13, color: 'var(--ink)' }}>{tipo.label}</span>
          </div>
        </div>

        {/* Medidor: vinculado à captação corrente */}
        <div style={{ marginBottom: 10 }}>
          <div className="muted" style={{ fontSize: 11, marginBottom: 3 }}>Medidor</div>
          <div className="input" style={{ minHeight: 34 }}>
            <span className="mono" style={{ fontSize: 12.5, color: 'var(--ink)' }}>Hidrômetro · série H-44107 · DN 25</span>
            <span className="sp" style={{ flex: 1 }} />
            <span className="faint">▾</span>
          </div>
        </div>

        {/* Data da Leitura */}
        <div style={{ marginBottom: 10 }}>
          <div className="muted" style={{ fontSize: 11, marginBottom: 3 }}>Data da Leitura</div>
          <div className="input" style={{ minHeight: 34 }}>
            <span className="mono" style={{ fontSize: 13, color: 'var(--ink)' }}>04/06/2026</span>
            <span className="sp" style={{ flex: 1 }} />
            <span>📅</span>
          </div>
        </div>

        {/* Hora da Leitura */}
        <div style={{ marginBottom: 10 }}>
          <div className="muted" style={{ fontSize: 11, marginBottom: 3 }}>Hora da Leitura</div>
          <div className="input" style={{ minHeight: 34 }}>
            <span className="mono" style={{ fontSize: 13, color: 'var(--ink)' }}>16:40</span>
            <span className="sp" style={{ flex: 1 }} />
            <span className="faint">🕐</span>
          </div>
        </div>

        {/* Leitura do medidor */}
        <div style={{ marginBottom: 10 }}>
          <div className="muted" style={{ fontSize: 11, marginBottom: 3 }}>Leitura do medidor (m³)</div>
          <div className="input mono" style={{ minHeight: 42, fontSize: 20, color: 'var(--ink)' }}>
            001 938,___
          </div>
          <div className="muted" style={{ fontSize: 11, marginTop: 3 }}>Leitura anterior: 001 893 m³ (05/05) · volume estimado ~45 m³</div>
        </div>

        {/* Medidor Zerado: caixa literal do SiDeCC */}
        <div
          className="card"
          style={{ padding: '10px 12px', marginBottom: 12, cursor: 'pointer' }}
          onClick={() => setZerado((v) => !v)}
        >
          <Row style={{ gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 16, color: 'var(--ink)', userSelect: 'none' }}>
              {zerado ? '☑' : '☐'}
            </span>
            <div>
              <b style={{ fontSize: 12.5, color: 'var(--ink)' }}>Medidor Zerado</b>
              <div className="muted" style={{ fontSize: 11, marginTop: 2 }}>
                caso o mostrador tenha zerado antes dessa leitura
              </div>
            </div>
          </Row>
          {zerado && (
            <div className="muted" style={{ fontSize: 11, marginTop: 6 }}>
              Marcado: a leitura atual pode ser menor que a anterior sem gerar alerta de plausibilidade.
            </div>
          )}
        </div>

        <div className="modal-foot">
          O registro recebe status <b>Registrado</b> e pode ser cancelado até o fim do dia.
        </div>

        <Row style={{ gap: 8, justifyContent: 'flex-end' }}>
          <Btn sub onClick={onClose}>Fechar</Btn>
          <Btn variant="act" onClick={onClose}>Cadastrar</Btn>
        </Row>
      </div>
    </div>
  )
}

// ---- Seletor de tipo (radio visual) ----------------------------------------
function TipoSelector({ selected, onSelect }) {
  return (
    <div className="card" style={{ padding: '4px 10px' }}>
      {TIPOS.map((t) => {
        const on = selected === t.key
        return (
          <div
            key={t.key}
            className="mrow"
            style={{ cursor: 'pointer', padding: '6px 0' }}
            onClick={() => onSelect(t.key)}
          >
            <span className="ico" style={on ? { color: 'var(--ink)' } : {}}>
              {on ? '◉' : '○'}
            </span>
            <div className="msp">
              <span style={{ fontSize: 12.5, color: on ? 'var(--ink)' : undefined }}>
                {on ? <b>{t.label}</b> : t.label}
              </span>
              <div className={on ? 'muted' : 'faint'} style={{ fontSize: 11 }}>{t.sub}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ---- Dados históricos para a DataTable de declarações ----------------------
const DECLARACOES_ROWS = [
  {
    id: 'DCL-07-2026-044871',
    protocolo: 'DCL-07-2026-044871',
    data_leitura: '02/06 · 08:30',
    data_cadastro: '02/06 · 09:15',
    medidor: 'H-99281',
    leitura: '004 281 m³',
    tipo: 'Leitura de Rotina',
    status: 'Registrado',
    cancelar: 'n/a',
  },
  {
    id: 'DCL-07-2026-038412',
    protocolo: 'DCL-07-2026-038412',
    data_leitura: '05/05 · 07:55',
    data_cadastro: '05/05 · 08:40',
    medidor: 'H-99281',
    leitura: '004 116 m³',
    tipo: 'Leitura de Rotina',
    status: 'Registrado',
    cancelar: 'n/a',
  },
  {
    id: 'DCL-07-2026-031044',
    protocolo: 'DCL-07-2026-031044',
    data_leitura: '07/04 · 10:10',
    data_cadastro: '07/04 · 11:00',
    medidor: 'H-44107',
    leitura: '001 893 m³',
    tipo: 'Leitura de Rotina',
    status: 'Registrado',
    cancelar: 'n/a',
  },
  {
    id: 'DCL-07-2026-023811',
    protocolo: 'DCL-07-2026-023811',
    data_leitura: '10/03 · 09:20',
    data_cadastro: '10/03 · 10:05',
    medidor: 'H-99281',
    leitura: '003 957 m³',
    tipo: 'Leitura de Rotina',
    status: 'Registrado',
    cancelar: 'n/a',
  },
  {
    id: 'DCL-07-2026-015400',
    protocolo: 'DCL-07-2026-015400',
    data_leitura: '14/02 · 08:45',
    data_cadastro: '14/02 · 09:30',
    medidor: 'H-44107',
    leitura: '001 812 m³',
    tipo: 'Leitura de Rotina',
    status: 'Registrado',
    cancelar: 'n/a',
  },
  {
    id: 'DCL-07-2026-009200',
    protocolo: 'DCL-07-2026-009200',
    data_leitura: '18/01 · 07:30',
    data_cadastro: '18/01 · 08:15',
    medidor: 'H-44107',
    leitura: '001 730 m³',
    tipo: 'Leitura ao Reinstalar Equipamento',
    status: 'Registrado',
    cancelar: 'n/a',
  },
]

const DECL_COLS = [
  { key: 'protocolo', label: 'Protocolo', cls: 'mono', render: (r) => <span style={{ fontSize: 11 }}>{r.protocolo}</span> },
  { key: 'data_leitura', label: 'Data/Hora leitura', render: (r) => <span className="mono" style={{ fontSize: 11 }}>{r.data_leitura}</span> },
  { key: 'medidor', label: 'Medidor', render: (r) => <span className="mono" style={{ fontSize: 11 }}>{r.medidor}</span> },
  { key: 'leitura', label: 'Leitura', render: (r) => <span className="mono" style={{ fontSize: 11 }}>{r.leitura}</span> },
  { key: 'tipo', label: 'Tipo', render: (r) => <span style={{ fontSize: 11 }}>{r.tipo}</span> },
  {
    key: 'status',
    label: 'Status',
    render: (r) => <Pill variant="ok" style={{ fontSize: 10 }}>{r.status}</Pill>,
  },
]

export default function Autodeclaracao() {
  const [tipoSelecionado, setTipoSelecionado] = useState('rotina')
  const [modalAberto, setModalAberto] = useState(false)
  const tipoObj = TIPOS.find((t) => t.key === tipoSelecionado)

  return (
    <>
      <DraftBanner tag="APP · 03" title="Declaração" right="Pequenos/médios · Faixa B/C" />

      {/* preamble Note: doctrine, not product chrome */}
      <div className="wrap">
        <Note style={{ maxWidth: 760, margin: '0 auto 22px' }}>
          <b>Fluxo do pequeno/médio usuário com autodeclaração.</b> Entrada manual da leitura
          por medidor ativo da captação, com <b>modo offline</b> (sincroniza ao reconectar),
          <b> geolocalização</b> do ponto e <b>foto</b> do medidor. Periodicidade conforme a faixa
          de Volume Mensal (Portaria DAEE 5.579/2018, art. 5º; IT-DPO 15/2018). O tipo de
          declaração é selecionado na lista canônica do SiDeCC: quatro opções, nenhuma outra. A
          troca de medidor registra-se pelo par remover/reinstalar, sem campo de texto livre.
          A checagem de plausibilidade contra a outorga é um <b>sinal de gestão</b> com baixa
          automática quando a leitura retorna ao esperado: acompanhamento do uso antes que
          qualquer limite seja excedido, não uma exceção nem um ato administrativo.
        </Note>

        <div className="phone-stage" style={{ justifyContent: 'center' }}>

          {/* PHONE A: formulário de nova declaração */}
          <div>
            <Phone>
              <Notch />
              <StatusBar right="⊘ offline ▮" />
              <PScroll>
                <AppBar title="Nova declaração" back />

                <Pill variant="warn" style={{ marginBottom: 12 }}>Modo offline · será enviada ao reconectar</Pill>

                {/* outorga + captação: context header */}
                <Card style={{ padding: 14 }}>
                  <div className="muted" style={{ fontSize: 12 }}>Outorga</div>
                  <div className="mono" style={{ fontSize: 13, color: 'var(--ink)' }}>OUT-07-2025-008842 · Sítio Boa Vista</div>
                  <hr className="div" style={{ margin: '10px 0' }} />
                  <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="mono" style={{ fontSize: 12.5, color: 'var(--ink)' }}>Captação 07-0884 · poço tubular</span>
                  </Row>
                  <div className="muted" style={{ fontSize: 11, marginTop: 4 }}>
                    Captação única deste outorgado; a declaração abrange os medidores deste ponto.
                  </div>
                </Card>

                {/* Período corrente: conjunto de leituras, uma por medidor ativo */}
                <Card style={{ marginTop: 14, padding: 12 }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <b style={{ fontSize: 13, color: 'var(--ink)' }}>Declaração de maio/2026</b>
                    <Pill variant="warn">1 de 2 declarada</Pill>
                  </Row>
                  <div className="mrow" style={{ marginTop: 8 }}>
                    <span className="ico">✓</span>
                    <div className="msp">
                      <span className="mono" style={{ fontSize: 12, color: 'var(--ink)' }}>H-99281 · DN 50</span>
                      <div className="muted" style={{ fontSize: 11 }}>declarada em 02/06 · protocolo DCL-07-2026-044871</div>
                    </div>
                    <Pill variant="ok" style={{ fontSize: 10.5 }}>Registrado</Pill>
                  </div>
                  <div className="mrow">
                    <span className="ico faint">○</span>
                    <div className="msp">
                      <span className="mono" style={{ fontSize: 12, color: 'var(--ink)' }}>H-44107 · DN 25</span>
                      <div className="muted" style={{ fontSize: 11 }}>pendente · é a leitura deste formulário</div>
                    </div>
                    <Pill variant="warn" style={{ fontSize: 10.5 }}>pendente</Pill>
                  </div>
                  <div className="muted" style={{ fontSize: 11, marginTop: 6 }}>
                    O período fecha quando todos os medidores ativos tiverem leitura declarada.
                  </div>
                </Card>

                <div className="stack" style={{ marginTop: 14 }}>

                  {/* Tipo de declaração: 4 tipos canônicos do SiDeCC, não texto livre */}
                  <div className="field">
                    <span>Tipo de Declaração</span>
                    <TipoSelector selected={tipoSelecionado} onSelect={setTipoSelecionado} />
                  </div>

                  {/* Medidor: um por declaração; lista os ativos da captação */}
                  <div className="field">
                    <span>Medidor</span>
                    <div className="input">
                      <span className="mono" style={{ color: 'var(--ink)', fontSize: 12.5 }}>Hidrômetro · série H-44107 · DN 25</span>
                      <span className="sp" style={{ flex: 1 }} />
                      <span className="faint">▾</span>
                    </div>
                    <div className="muted" style={{ fontSize: 11, marginTop: 4 }}>
                      Esta captação tem <b>2 medidores ativos</b>; o outro (série H-99281 · DN 50) já declarou neste período.
                    </div>
                  </div>

                  {/* Botão que abre o modal com os campos do SiDeCC */}
                  <Btn block lg onClick={() => setModalAberto(true)} style={{ marginTop: 4 }}>
                    Preencher declaração →
                  </Btn>

                  {/* Sinal de gestão: plausibilidade vs. outorga (baixa automática) */}
                  <Card style={{ padding: 12 }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                      <b style={{ fontSize: 13, color: 'var(--ink)' }}>Dentro da sua outorga</b>
                      <Pill variant="ok">Plausível</Pill>
                    </Row>
                    <div className="muted" style={{ fontSize: 11, marginTop: 2 }}>
                      Sinal de gestão · baixa automática ao retornar ao esperado
                    </div>
                    <div className="mrow" style={{ marginTop: 8 }}>
                      <span className="msp muted" style={{ fontSize: 12 }}>Captado no mês</span>
                      <span className="mono" style={{ fontSize: 12 }}>~210 m³ · 2 medidores (limite ~1.500/mês)</span>
                    </div>
                    <div className="mrow">
                      <span className="msp muted" style={{ fontSize: 12 }}>Acumulado no ano</span>
                      <span className="mono" style={{ fontSize: 12 }}>1.142 / 18.000 m³ · 6%</span>
                    </div>
                    <Meter value="6%" style={{ marginTop: 6 }} />
                  </Card>

                  {/* GPS */}
                  <div className="field">
                    <span>Geolocalização do ponto</span>
                    <div className="card ph" style={{ minHeight: 120 }}>
                      Mapa · pin GPS capturado<br />
                      <small className="mono">−23.8765, −46.4210 (exemplo)</small>
                    </div>
                    <div className="pill ok" style={{ marginTop: 8 }}>Coordenada capturada automaticamente</div>
                  </div>

                  {/* Foto */}
                  <div className="field">
                    <span>Foto do medidor</span>
                    <div className="row" style={{ gap: 10 }}>
                      <div className="card ph ph--img" style={{ flex: 1, minHeight: 96 }}>📷 Toque para<br />fotografar</div>
                      <div className="card ph ph--img" style={{ flex: 1, minHeight: 96 }}>Pré-visualização<br />da foto</div>
                    </div>
                  </div>

                  <label className="field">
                    <span>Observações (opcional)</span>
                    <div className="input tall faint">Ex.: acesso difícil ao medidor, leitura sob chuva…</div>
                  </label>
                </div>

                <Btn block sub style={{ marginTop: 12 }}>Salvar rascunho</Btn>
              </PScroll>
              <AppTabBar active="declaracao" />
              <HomeBar />
            </Phone>
            <PhoneLabel>Nova declaração · 4 tipos · offline · GPS · foto</PhoneLabel>
            <Note style={{ marginTop: 12, fontSize: 12, maxWidth: 360 }}>
              O botão "Preencher declaração" abre o modal do SiDeCC com os campos verbatim:
              Declaração · Data da Leitura · Hora da Leitura · Leitura do medidor · Medidor Zerado ·
              Cadastrar / Fechar. O tipo selecionado no formulário é transportado para o campo
              Declaração do modal, já preenchido e não editável nessa posição.
            </Note>
          </div>

          {/* PHONE B: modal aberto (Declaração de Leitura do Medidor) */}
          <div>
            <Phone>
              <Notch />
              <StatusBar right="⊘ offline ▮" />
              <PScroll>
                <AppBar title="Nova declaração" back />

                <Card style={{ padding: 14, marginBottom: 14 }}>
                  <div className="muted" style={{ fontSize: 12 }}>Outorga</div>
                  <div className="mono" style={{ fontSize: 13, color: 'var(--ink)' }}>OUT-07-2025-008842</div>
                  <hr className="div" style={{ margin: '10px 0' }} />
                  <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="mono" style={{ fontSize: 12.5, color: 'var(--ink)' }}>Captação 07-0884 · H-44107</span>
                    <Pill>Faixa B</Pill>
                  </Row>
                </Card>

                {/* modal sobreposto ao conteúdo do phone */}
                <div style={{ position: 'relative' }}>
                  <div style={{
                    background: 'var(--bg)',
                    border: '1.5px solid var(--ink)',
                    borderRadius: 6,
                    padding: 14,
                  }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 14 }}>
                      Declaração de Leitura do Medidor
                    </div>

                    {/* Declaração (tipo) */}
                    <div style={{ marginBottom: 10 }}>
                      <div className="muted" style={{ fontSize: 11, marginBottom: 3 }}>Declaração</div>
                      <div className="input" style={{ minHeight: 34, background: 'var(--surface)' }}>
                        <span style={{ fontSize: 12.5, color: 'var(--ink)' }}>Leitura de Rotina</span>
                      </div>
                    </div>

                    {/* Data da Leitura */}
                    <div style={{ marginBottom: 10 }}>
                      <div className="muted" style={{ fontSize: 11, marginBottom: 3 }}>Data da Leitura</div>
                      <div className="input" style={{ minHeight: 34 }}>
                        <span className="mono" style={{ fontSize: 13, color: 'var(--ink)' }}>04/06/2026</span>
                        <span className="sp" style={{ flex: 1 }} /><span>📅</span>
                      </div>
                    </div>

                    {/* Hora da Leitura */}
                    <div style={{ marginBottom: 10 }}>
                      <div className="muted" style={{ fontSize: 11, marginBottom: 3 }}>Hora da Leitura</div>
                      <div className="input" style={{ minHeight: 34 }}>
                        <span className="mono" style={{ fontSize: 13, color: 'var(--ink)' }}>16:40</span>
                        <span className="sp" style={{ flex: 1 }} /><span className="faint">🕐</span>
                      </div>
                    </div>

                    {/* Leitura do medidor */}
                    <div style={{ marginBottom: 10 }}>
                      <div className="muted" style={{ fontSize: 11, marginBottom: 3 }}>Leitura do medidor (m³)</div>
                      <div className="input mono" style={{ minHeight: 42, fontSize: 20, color: 'var(--ink)' }}>
                        001 938,___
                      </div>
                      <div className="muted" style={{ fontSize: 11, marginTop: 3 }}>
                        Anterior: 001 893 m³ · 05/05
                      </div>
                    </div>

                    {/* Medidor Zerado (caixa literal do SiDeCC) */}
                    <div className="card" style={{ padding: '10px 12px', marginBottom: 12 }}>
                      <Row style={{ gap: 8, alignItems: 'center' }}>
                        <span style={{ fontSize: 16, color: 'var(--ink)' }}>☐</span>
                        <div>
                          <b style={{ fontSize: 12.5, color: 'var(--ink)' }}>Medidor Zerado</b>
                          <div className="muted" style={{ fontSize: 11, marginTop: 2 }}>
                            caso o mostrador tenha zerado antes dessa leitura
                          </div>
                        </div>
                      </Row>
                    </div>

                    <div className="muted" style={{ fontSize: 11, marginBottom: 10 }}>
                      Após o cadastro: status <b>Registrado</b>. Cancelável no mesmo dia.
                    </div>

                    <Row style={{ gap: 8, justifyContent: 'flex-end' }}>
                      <Btn sub>Fechar</Btn>
                      <Btn variant="act">Cadastrar</Btn>
                    </Row>
                  </div>
                </div>
              </PScroll>
              <AppTabBar active="declaracao" />
              <HomeBar />
            </Phone>
            <PhoneLabel>Modal: Declaração de Leitura do Medidor (SiDeCC verbatim)</PhoneLabel>
            <Note style={{ marginTop: 12, fontSize: 12, maxWidth: 360 }}>
              Campos do modal são os do SiDeCC: Declaração · Data da Leitura · Hora da Leitura ·
              Leitura do medidor · Medidor Zerado · Cadastrar / Fechar. Nenhum campo adicional.
              Status resultante: <b>Registrado</b>. O campo Medidor Zerado segue a legenda
              original: "caso o mostrador tenha 'zerado' antes dessa leitura".
            </Note>
          </div>

          {/* PHONE C: consulta das declarações (histórico por medidor) */}
          <div>
            <Phone>
              <Notch />
              <StatusBar right="▰▰▱ 4G ▮" />
              <PScroll>
                <AppBar title="Declaração" menu />

                {/* contexto da captação */}
                <Card style={{ padding: 12, marginBottom: 14 }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="eyebrow">Captação 07-0884</span>
                    <Pill>Faixa B</Pill>
                  </Row>
                  <div className="mono" style={{ fontSize: 12.5, color: 'var(--ink)', marginTop: 6 }}>
                    OUT-07-2025-008842 · Sítio Boa Vista
                  </div>
                  <hr className="div" style={{ margin: '10px 0' }} />
                  <Row style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span className="muted" style={{ fontSize: 12 }}>Frequência</span>
                    <span className="mono" style={{ fontSize: 12, color: 'var(--ink)' }}>semanal · próxima até 10/06</span>
                  </Row>
                </Card>

                {/* período corrente resumido */}
                <div className="eyebrow" style={{ marginBottom: 8 }}>Período corrente · maio/2026</div>
                <Card style={{ padding: '4px 12px', marginBottom: 14 }}>
                  <div className="mrow">
                    <span className="ico">✓</span>
                    <div className="msp">
                      <span className="mono" style={{ fontSize: 12, color: 'var(--ink)' }}>H-99281 · 004 281 m³ · 02/06</span>
                      <div className="muted" style={{ fontSize: 11 }}>DCL-07-2026-044871 · Leitura de Rotina</div>
                    </div>
                    <Pill variant="ok" style={{ fontSize: 10.5 }}>Registrado</Pill>
                  </div>
                  <div className="mrow">
                    <span className="ico faint">○</span>
                    <div className="msp">
                      <span className="mono" style={{ fontSize: 12, color: 'var(--ink)' }}>H-44107 · pendente</span>
                      <div className="muted" style={{ fontSize: 11 }}>declarar até 10/06</div>
                    </div>
                    <Pill variant="warn" style={{ fontSize: 10.5 }}>pendente</Pill>
                  </div>
                </Card>

                <Btn block lg to="/app/autodeclaracao" style={{ marginBottom: 14 }}>
                  Nova declaração →
                </Btn>

                {/* Dados Declarados: grade de declarações por medidor */}
                <div className="eyebrow" style={{ marginBottom: 8 }}>Dados Declarados</div>
                {/* DataTable com amostra de 6 linhas; universe=N indica volume real */}
                <DataTable
                  columns={DECL_COLS}
                  rows={DECLARACOES_ROWS}
                  pageSize={4}
                  search={['protocolo', 'medidor', 'tipo']}
                  searchPlaceholder="Buscar por protocolo, medidor ou tipo…"
                  universe={48}
                />
                <div className="muted" style={{ fontSize: 11, marginTop: 8 }}>
                  Filtrar por Mês/Ano/Medidor: use a busca acima. Cancelamento disponível no mesmo dia.
                </div>
              </PScroll>
              <AppTabBar active="declaracao" />
              <HomeBar />
            </Phone>
            <PhoneLabel>Consulta de Dados Declarados · DataTable</PhoneLabel>
            <Note style={{ marginTop: 12, fontSize: 12, maxWidth: 360 }}>
              A consulta reflete a "Consulta dos Dados Declarados" do SiDeCC: colunas Data/Hora
              da leitura · Protocolo · Medidor · Leitura · Tipo · Status (Registrado) · Cancelar.
              O DataTable assume N linhas. Cada declaração tem protocolo próprio (DCL-...).
              Status <b>Registrado</b> é o único estado de declaração ativa; o cancelamento no
              mesmo dia substitui o registro mantendo a trilha.
            </Note>
          </div>

        </div>

        {/* modal interativo (Phone A) */}
        {modalAberto && (
          <ModalDeclaracao
            tipo={tipoObj}
            onClose={() => setModalAberto(false)}
          />
        )}

        {/* Notes: doctrine only */}
        <Note style={{ maxWidth: 760, margin: '22px auto 0', fontSize: 12.5 }}>
          A declaração do período é um <b>conjunto de leituras, uma por medidor ativo</b>: o
          período fecha quando todo medidor ativo da captação tiver leitura declarada. A
          completude é derivada do conjunto; nenhum campo a edita. A ausência de declaração é
          apurada por medidor, inclusive para a imputação pela regra do volume máximo diário: o
          aparelho silencioso é imputado ainda que o outro tenha declarado.
        </Note>

        <Note style={{ maxWidth: 760, margin: '14px auto 0', fontSize: 12.5 }}>
          Validações no envio: leitura maior ou igual à anterior do mesmo medidor, salvo na
          virada do mostrador (Medidor Zerado) e na troca de equipamento, casos que os tipos
          de declaração (Leitura ao Remover / Leitura ao Reinstalar) registram de forma expressa,
          sem campo de texto livre. Foto e GPS são obrigatórios. Inconsistências geram sinal
          no lado do gestor. A retificação de um período já enviado gera um novo ato que substitui
          o anterior.
        </Note>

        <Note style={{ maxWidth: 760, margin: '14px auto 0', fontSize: 12.5 }}>
          A plausibilidade exibida na tela (sinal de gestão) é apoio ao acompanhamento do
          próprio usuário; não substitui a reconciliação que o gestor faz do declarado contra
          o outorgado. O sinal tem <b>baixa automática</b> quando a leitura retorna ao esperado:
          não aguarda justificativa em prazo e não gera ato administrativo por si mesmo.
        </Note>
      </div>
    </>
  )
}
