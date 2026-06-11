import { useState } from 'react'
import { DraftBanner, Phone, Notch, StatusBar, PScroll, AppBar, AppTabBar, HomeBar, PhoneLabel } from '../../components/shell.jsx'
import { Card, Pill, Btn, Note, Row, DataTable } from '../../components/ui.jsx'

// Consulta dos Dados Declarados: sample rows from SiDeCC vocabulary (Fundamentacao §3.2)
// Columns verbatim: Data/Hora da leitura · Protocolo · Data/Hora do cadastro ·
//   Medidor · Leitura · Dias · Volume diário · Unidade · Tipo · Status · Cancelar
const ROWS = [
  {
    id: 'r1',
    dataLeitura: '07/06 · 07:15', protocolo: 'DCL-07-2026-045201',
    dataCadastro: '07/06 · 08:42', medidor: 'H-44107',
    leitura: '001 953', dias: 1, volumeDiario: '15,0',
    unidade: 'm³/dia', tipo: 'Leitura de Rotina',
    status: 'Registrado', cancelavel: true,
  },
  {
    id: 'r2',
    dataLeitura: '04/06 · 16:40', protocolo: 'DCL-07-2026-045112',
    dataCadastro: '04/06 · 18:05', medidor: 'H-44107',
    leitura: '001 938', dias: 1, volumeDiario: '14,2',
    unidade: 'm³/dia', tipo: 'Leitura de Rotina',
    status: 'Registrado', cancelavel: false,
  },
  {
    id: 'r3',
    dataLeitura: '02/06 · 08:10', protocolo: 'DCL-07-2026-044871',
    dataCadastro: '02/06 · 09:31', medidor: 'H-99281',
    leitura: '004 281', dias: 1, volumeDiario: '13,8',
    unidade: 'm³/dia', tipo: 'Leitura de Rotina',
    status: 'Registrado', cancelavel: false,
  },
  {
    id: 'r4',
    dataLeitura: '05/05 · 07:55', protocolo: 'DCL-07-2026-038413',
    dataCadastro: '05/05 · 08:20', medidor: 'H-44107',
    leitura: '001 893', dias: 1, volumeDiario: '13,5',
    unidade: 'm³/dia', tipo: 'Leitura de Rotina',
    status: 'Registrado', cancelavel: false,
  },
  {
    id: 'r5',
    dataLeitura: '05/05 · 07:50', protocolo: 'DCL-07-2026-038412',
    dataCadastro: '05/05 · 08:22', medidor: 'H-99281',
    leitura: '004 116', dias: 1, volumeDiario: '12,9',
    unidade: 'm³/dia', tipo: 'Leitura de Rotina',
    status: 'Registrado', cancelavel: false,
  },
  {
    id: 'r6',
    dataLeitura: '15/04 · 09:00', protocolo: 'DCL-07-2026-031204',
    dataCadastro: '15/04 · 09:45', medidor: 'H-44107',
    leitura: '001 848', dias: 1, volumeDiario: '13,1',
    unidade: 'm³/dia', tipo: 'Leitura ao Reinstalar Equipamento',
    status: 'Registrado', cancelavel: false,
  },
  {
    id: 'r7',
    dataLeitura: '14/04 · 14:30', protocolo: 'DCL-07-2026-030977',
    dataCadastro: '14/04 · 15:10', medidor: 'H-44107',
    leitura: '001 835', dias: 1, volumeDiario: '0,0',
    unidade: 'm³/dia', tipo: 'Leitura ao Remover Equipamento',
    status: 'Registrado', cancelavel: false,
  },
  {
    id: 'r8',
    dataLeitura: '10/03 · 11:20', protocolo: 'DCL-07-2026-021588',
    dataCadastro: '10/03 · 12:00', medidor: 'H-99281',
    leitura: '003 980', dias: 30, volumeDiario: '396,0',
    unidade: 'm³/mês', tipo: 'Medição Alternativa (volume)',
    status: 'Registrado', cancelavel: false,
  },
]

const MESES = ['', 'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
const MEDIDORES = ['Todos', 'H-44107', 'H-99281']
const MESES_FILTRO = ['Todos', 'jun/2026', 'mai/2026', 'abr/2026', 'mar/2026']

// simple month-tag extractor from DD/MM · HH:MM strings
function rowMes(row) {
  const m = row.dataLeitura.match(/(\d{2})\/(\d{2})/)
  if (!m) return ''
  const mes = parseInt(m[2], 10)
  const ano = row.dataCadastro.includes('2026') ? '2026' : '2026'
  return `${MESES[mes]}/${ano}`
}

// derive month label from DD/MM string
function labelMes(dataStr) {
  const m = dataStr.match(/(\d{2})\/(\d{2})/)
  if (!m) return ''
  const mes = parseInt(m[2], 10)
  return `${MESES[mes]}/2026`
}

const COLS = [
  { key: 'dataLeitura',   label: 'Data/Hora leitura',   cls: 'mono' },
  { key: 'protocolo',     label: 'Protocolo',             cls: 'mono' },
  { key: 'dataCadastro',  label: 'Data/Hora cadastro',    cls: 'mono' },
  { key: 'medidor',       label: 'Medidor',               cls: 'mono' },
  { key: 'leitura',       label: 'Leitura',               num: true,   cls: 'mono' },
  { key: 'dias',          label: 'Dias',                  num: true },
  { key: 'volumeDiario',  label: 'Volume diário',         num: true,   cls: 'mono' },
  { key: 'unidade',       label: 'Unidade' },
  { key: 'tipo',          label: 'Tipo' },
  {
    key: 'status',
    label: 'Status',
    render: (r) => <Pill variant="ok">{r.status}</Pill>,
  },
  {
    key: 'cancelar',
    label: 'Cancelar',
    render: (r) => r.cancelavel
      ? <a className="pill warn" style={{ cursor: 'pointer' }}>Cancelar</a>
      : <span className="faint" style={{ fontSize: 11 }}>indisponivel</span>,
  },
]

// Recibo (comprovante) detail panel, static example keyed to the latest row
function Recibo({ row, onClose }) {
  return (
    <div className="veil" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 340 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">Comprovante · {row.protocolo}</div>

        <div style={{ textAlign: 'center', padding: '10px 0 8px' }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', border: '2px solid var(--ink)', display: 'grid', placeItems: 'center', margin: '0 auto 8px', fontSize: 22 }}>✓</div>
          <b style={{ fontSize: 14 }}>Declaração registrada</b>
        </div>

        <Card style={{ padding: 12 }}>
          <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <b style={{ fontSize: 12.5, color: 'var(--ink)' }}>{row.tipo}</b>
            <Pill variant="ok">{row.status}</Pill>
          </Row>
          <Row style={{ gap: 6, marginTop: 6 }}>
            <Pill variant="label" style={{ fontSize: 10.5 }}>{row.protocolo}</Pill>
          </Row>
          <hr className="div" style={{ margin: '10px 0' }} />
          <div className="mrow"><span className="msp muted" style={{ fontSize: 12 }}>Medidor</span><span className="mono" style={{ fontSize: 12 }}>{row.medidor}</span></div>
          <div className="mrow"><span className="msp muted" style={{ fontSize: 12 }}>Leitura</span><span className="mono" style={{ fontSize: 12 }}>{row.leitura} m³</span></div>
          <div className="mrow"><span className="msp muted" style={{ fontSize: 12 }}>Data/hora da leitura</span><span className="mono" style={{ fontSize: 12 }}>{row.dataLeitura}</span></div>
          <div className="mrow"><span className="msp muted" style={{ fontSize: 12 }}>Data/hora do cadastro</span><span className="mono" style={{ fontSize: 12, color: 'var(--ink)' }}>{row.dataCadastro}</span></div>
          <div className="mrow"><span className="msp muted" style={{ fontSize: 12 }}>Dias</span><span className="mono" style={{ fontSize: 12 }}>{row.dias}</span></div>
          <div className="mrow"><span className="msp muted" style={{ fontSize: 12 }}>Volume diário</span><span className="mono" style={{ fontSize: 12 }}>{row.volumeDiario} {row.unidade}</span></div>
        </Card>

        {row.cancelavel && (
          <Btn block variant="bad" style={{ marginTop: 12 }}>Cancelar declaracao · disponivel ate o fim do dia</Btn>
        )}
        <Btn block sub style={{ marginTop: 8 }}>Imprimir comprovante (PDF)</Btn>

        <div className="modal-foot">
          A data/hora da leitura e a do cadastro podem diferir: a primeira e o momento em que o mostrador foi lido; a segunda, o registro no sistema. No modo offline elas divergem ate a sincronizacao.
        </div>
        <Row style={{ gap: 8, justifyContent: 'flex-end' }}>
          <Btn sub onClick={onClose}>Fechar</Btn>
        </Row>
      </div>
    </div>
  )
}

function HistoricoPhone() {
  const [mes, setMes] = useState('Todos')
  const [medidor, setMedidor] = useState('Todos')
  const [detalhe, setDetalhe] = useState(null)

  const rows = ROWS.map((r) => ({
    ...r,
    onClick: () => setDetalhe(r),
  })).filter((r) => {
    const mesOk = mes === 'Todos' || labelMes(r.dataLeitura) === mes
    const medOk = medidor === 'Todos' || r.medidor === medidor
    return mesOk && medOk
  })

  return (
    <>
      <Phone>
        <Notch />
        <StatusBar right="▰▰▱ 4G ▮" />
        <PScroll>
          <AppBar title="Historico" back />
          <div className="muted" style={{ fontSize: 12, margin: '-6px 0 12px' }}>OUT-07-2025-008842 · Sítio Boa Vista</div>

          {/* Filtros: Mes / Ano / Medidor (verbatim from SiDeCC, Fundamentacao §3.2) */}
          <div className="eyebrow" style={{ marginBottom: 6 }}>Filtros</div>
          <Card style={{ padding: '10px 12px', marginBottom: 14 }}>
            <div className="mrow" style={{ alignItems: 'center', gap: 8 }}>
              <span className="muted" style={{ fontSize: 12, flex: 'none' }}>Mes/Ano</span>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {MESES_FILTRO.map((m) => (
                  <a
                    key={m}
                    className={`pill${mes === m ? ' act' : ''}`}
                    style={{ cursor: 'pointer', fontSize: 11 }}
                    onClick={() => setMes(m)}
                  >{m}</a>
                ))}
              </div>
            </div>
            <div className="mrow" style={{ alignItems: 'center', gap: 8, marginTop: 8 }}>
              <span className="muted" style={{ fontSize: 12, flex: 'none' }}>Medidor</span>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {MEDIDORES.map((m) => (
                  <a
                    key={m}
                    className={`pill${medidor === m ? ' act' : ''}`}
                    style={{ cursor: 'pointer', fontSize: 11 }}
                    onClick={() => setMedidor(m)}
                  >{m}</a>
                ))}
              </div>
            </div>
          </Card>

          {/* Consulta dos Dados Declarados (SiDeCC) -- DataTable com scroll horizontal */}
          <div className="eyebrow" style={{ marginBottom: 6 }}>Consulta dos Dados Declarados</div>
          <div style={{ overflowX: 'auto', fontSize: 11 }}>
            <DataTable
              columns={COLS}
              rows={rows}
              pageSize={4}
              search={['protocolo', 'medidor', 'tipo']}
              searchPlaceholder="Protocolo, medidor ou tipo..."
              universe={ROWS.length}
              empty="Nenhuma declaracao no filtro."
            />
          </div>

          <div className="muted" style={{ fontSize: 11, marginTop: 8 }}>
            Toque na linha para abrir o comprovante. Status Registrado e cancelavel no mesmo dia da declaracao.
          </div>

          <Btn block sub to="/app/autodeclaracao" style={{ marginTop: 14 }}>Nova declaracao</Btn>
        </PScroll>
        <AppTabBar active="declaracao" />
        <HomeBar />
      </Phone>

      {detalhe && <Recibo row={detalhe} onClose={() => setDetalhe(null)} />}
    </>
  )
}

export default function AppHistorico() {
  return (
    <>
      <DraftBanner tag="APP · 04" title="Historico de declaracoes" right="Consulta dos Dados Declarados · SiDeCC" />

      <div className="wrap">
        <Note style={{ maxWidth: 780, margin: '0 auto 22px' }}>
          <b>O historico replica a "Consulta dos Dados Declarados" do SiDeCC.</b> Cada linha e uma declaracao registrada com protocolo proprio: Data/Hora da leitura (quando o mostrador foi lido) e Data/Hora do cadastro (quando entrou no sistema) sao campos distintos porque no modo offline elas divergem. O filtro por Mes/Ano/Medidor e o mesmo do sistema legado. O status Registrado e o unico estado de uma declaracao valida; o cancelamento substitui a declaracao no mesmo dia, gravando a anterior como cancelada e gerando novo protocolo. Depois do dia, somente retificacao corrige. Tocar na linha abre o comprovante (recibo) da declaracao. A tela e acessada a partir do Inicio ou da Declaracao; o tab bar fica ativo em Declaracao.
        </Note>

        <div className="phone-stage" style={{ justifyContent: 'center' }}>

          {/* ESTADO A: DataTable com filtros, comprovante no detalhe */}
          <div>
            <HistoricoPhone />
            <PhoneLabel>Consulta dos Dados Declarados · filtro Mes/Medidor · comprovante por protocolo</PhoneLabel>
            <Note style={{ marginTop: 14, fontSize: 12, maxWidth: 300 }}>
              Colunas verbatim do SiDeCC (Fundamentacao §3.2): Data/Hora da leitura · Protocolo · Data/Hora do cadastro · Medidor · Leitura · Dias · Volume diario · Unidade · Tipo · Status (Registrado) · Cancelar. Tipos de Declaracao (quatro): leitura de rotina · leitura ao remover · leitura ao reinstalar · medicao alternativa (volume). Status Registrado e o unico estado valido; cancelamento disponivel no mesmo dia.
            </Note>
          </div>

          {/* ESTADO B: comprovante aberto de uma declaracao recente */}
          <div>
            <Phone>
              <Notch />
              <StatusBar right="▰▰▱ 4G ▮" />
              <PScroll>
                <AppBar title="Comprovante" back />

                <div style={{ textAlign: 'center', padding: '16px 0 8px' }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', border: '2px solid var(--ink)', display: 'grid', placeItems: 'center', margin: '0 auto 10px', fontSize: 24 }}>✓</div>
                  <b style={{ fontSize: 16 }}>Declaracao registrada</b>
                  <p className="muted" style={{ fontSize: 12.5, margin: '6px 0 0' }}>Guarde o comprovante. Cada declaracao recebe protocolo proprio.</p>
                </div>

                <Card style={{ padding: 14 }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <b style={{ fontSize: 13, color: 'var(--ink)' }}>Leitura de Rotina</b>
                    <Pill variant="ok">Registrado</Pill>
                  </Row>
                  <Row style={{ gap: 6, marginTop: 6 }}>
                    <Pill variant="label" style={{ fontSize: 10.5 }}>DCL-07-2026-045201</Pill>
                  </Row>
                  <hr className="div" style={{ margin: '12px 0' }} />
                  {/* Data/Hora da leitura vs Data/Hora do cadastro: campos distintos (SiDeCC) */}
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12 }}>Outorga</span><span className="mono" style={{ fontSize: 12 }}>OUT-07-2025-008842</span></div>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12 }}>Medidor</span><span className="mono" style={{ fontSize: 12 }}>serie H-44107</span></div>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12 }}>Leitura</span><span className="mono" style={{ fontSize: 12 }}>001 953 m³</span></div>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12 }}>Dias</span><span className="mono" style={{ fontSize: 12 }}>1</span></div>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12 }}>Volume diario</span><span className="mono" style={{ fontSize: 12 }}>15,0 m³/dia</span></div>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12 }}>Data/hora da leitura</span><span className="mono" style={{ fontSize: 12 }}>07/06 · 07:15</span></div>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12 }}>Data/hora do cadastro</span><span className="mono" style={{ fontSize: 12, color: 'var(--ink)' }}>07/06 · 08:42</span></div>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12 }}>Unidade</span><span className="mono" style={{ fontSize: 12 }}>m³/dia</span></div>
                </Card>

                {/* cancelavel: disponivel somente no mesmo dia */}
                <Btn block variant="bad" style={{ marginTop: 14 }}>Cancelar declaracao · disponivel ate o fim do dia</Btn>
                <Btn block sub style={{ marginTop: 8 }}>Imprimir comprovante (PDF)</Btn>
              </PScroll>
              <AppTabBar active="declaracao" />
              <HomeBar />
            </Phone>
            <PhoneLabel>Comprovante aberto · dois timestamps distintos · cancelamento no mesmo dia</PhoneLabel>
            <Note style={{ marginTop: 14, fontSize: 12, maxWidth: 300 }}>
              A Data/Hora da leitura e o momento em que o mostrador foi lido no campo. A Data/Hora do cadastro e o registro no sistema. No modo offline elas divergem ate a sincronizacao; por isso o SiDeCC registra os dois campos separados. O cancelamento no mesmo dia substitui a declaracao: a anterior fica gravada como cancelada com o protocolo original, e a nova recebe outro protocolo. Depois do dia, somente retificacao corrige.
            </Note>
          </div>

        </div>
      </div>
    </>
  )
}
