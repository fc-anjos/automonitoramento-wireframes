import { Link, useNavigate } from 'react-router-dom'
import { GestorShell } from '../../components/shell.jsx'
import { Bento, Panel, Note, Pill, Btn, Row, Sp, Meter, DataTable } from '../../components/ui.jsx'

// Fila de tratamento: exceções e atos administrativos que cruzaram uma linha
// e precisam de desfecho. Ordenados por grau (gravíssima → grave → leve) e,
// dentro do grau, por fase mais avançada no rito. Sinais de gestão ficam em
// tabela separada: não têm grau nem prazo; a baixa é automática quando o
// consumo desacelera.
//
// Grau: leve · grave · gravíssima (Lei 7.663/1991, art. 13), os três níveis da
// norma estadual. A escala federal de quatro níveis (ANA 24/2020) não rege a
// outorga estadual.
// Sinal de gestão exibe "–" em grau por construção (sem infração configurada).

const FILA = [
  {
    codigo: '07-1100', nome: 'Ind. Química Cubatão', protocolo: 'AP-1100-A',
    natureza: 'Ato administrativo', tipo: 'Qualidade do dado',
    grau: 'gravíssima', grauVar: 'bad',
    fase: 'Autuada',
    prazo: 'ciência e defesa', dono: 'gestor',
    apontamento: 'Indício de fraude na medição',
  },
  {
    codigo: '07-1042', nome: 'Petroquímica Baixada', protocolo: 'AP-1042-A',
    natureza: 'Ato administrativo', tipo: 'Volume',
    grau: 'grave', grauVar: 'bad',
    fase: 'Em defesa ou recurso',
    prazo: 'defesa até 04/06', dono: 'outorgado',
    apontamento: 'Volume mensal acima do outorgado',
  },
  {
    // 07-1001 pico de vazão: o pico ultrapassou o teto outorgado (tipo Volume).
    // O excesso foi confirmado, não é amostra isolada; o grau correto é grave.
    codigo: '07-1001', nome: 'Indústria Cubatão S/A', protocolo: 'AP-1001-A',
    natureza: 'Exceção', tipo: 'Volume',
    grau: 'grave', grauVar: 'bad',
    fase: 'Notificada',
    prazo: 'justificativa até 25/06', dono: 'outorgado',
    apontamento: 'Pico de vazão acima do teto outorgado',
  },
  {
    codigo: '07-0712', nome: 'Laticínios Itanhaém', protocolo: 'AP-0712-A',
    natureza: 'Exceção', tipo: 'Condicionante',
    grau: 'leve', grauVar: 'warn',
    fase: 'Notificada',
    prazo: 'recalibrar até 30/06', dono: 'outorgado',
    apontamento: 'Calibração de hidrômetro vencida',
  },
  {
    codigo: '07-0830', nome: 'Águas de Praia Grande', protocolo: 'AP-0830-A',
    natureza: 'Exceção', tipo: 'Calendário',
    grau: 'leve', grauVar: 'warn',
    fase: 'Notificada',
    prazo: 'renovar até 17/07', dono: 'outorgado',
    apontamento: 'Outorga a vencer',
  },
  {
    codigo: '07-0455', nome: 'Têxtil Mongaguá', protocolo: 'AP-0455-A',
    natureza: 'Exceção', tipo: 'Calendário',
    grau: 'leve', grauVar: 'warn',
    fase: 'Detectada',
    prazo: 'regularizar em 12 meses', dono: 'gestor',
    apontamento: 'Sem uso há 2 anos (risco de perecimento)',
  },
  {
    codigo: '07-1001', nome: 'Indústria Cubatão S/A', protocolo: 'AP-1001-C',
    natureza: 'Exceção', tipo: 'Qualidade do dado',
    grau: 'leve', grauVar: 'ok',
    fase: 'Encerrada',
    prazo: 'nenhum', dono: 'outorgado',
    apontamento: 'Amostra isolada ausente · medidor SDC-R-4472',
  },
]

// Fase do ato administrativo (9 passos, modelo de domínio, Lei 9.433/1997
// arts. 49-50 e Lei 10.177/1998): Detectada · Notificada · Autuada · Ciência ·
// Em defesa ou recurso · Em julgamento · Decidida · Aguardando regularização ·
// Encerrada.

const FILA_COLS = [
  {
    key: 'ponto', label: 'Ponto',
    render: (r) => (
      <Link to="/gestor/apontamento" style={{ color: 'var(--ink)', textDecoration: 'none' }}>
        <b>{r.codigo}</b><br />
        <span className="muted" style={{ fontSize: 11 }}>{r.nome}</span><br />
        <span className="muted" style={{ fontSize: 10 }}>protocolo {r.protocolo}</span>
      </Link>
    ),
  },
  {
    key: 'natureza', label: 'Natureza',
    render: (r) => <Pill variant="label" style={{ padding: '0 7px', fontSize: 10.5 }}>{r.natureza}</Pill>,
  },
  {
    key: 'tipo', label: 'Tipo',
    render: (r) => <span style={{ fontSize: 11 }}>{r.tipo}</span>,
  },
  {
    key: 'grau', label: 'Grau',
    render: (r) => <Pill variant={r.grauVar}>grau {r.grau}</Pill>,
  },
  {
    key: 'fase', label: 'Fase',
    render: (r) => <span style={{ fontSize: 11 }}>{r.fase}</span>,
  },
  {
    key: 'apontamento', label: 'Achado',
    render: (r) => <span style={{ fontSize: 11 }}>{r.apontamento}</span>,
  },
  {
    key: 'prazo', label: 'Prazo / dono',
    render: (r) => <span style={{ fontSize: 11 }}>{r.prazo} · <b>{r.dono}</b></span>,
  },
]

// Sinais de gestão: projeções, não infrações. O consumo está dentro do
// outorgado; o ritmo aponta para o teto. Sem grau, sem prazo; a baixa é
// automática quando o consumo desacelera. Ficam numa tabela separada para
// não atribuir a um aviso preventivo o peso de um processo já instaurado.
const SINAIS = [
  {
    codigo: '07-1001', nome: 'Indústria Cubatão S/A', base: 'Volume anual',
    sinal: 'Ritmo projeta estouro do limite',
    atual: '58%', meter: '58%', meterVar: 'bad', projecao: '116%',
    orientacao: 'Reduzir o ritmo para não estourar o anual outorgado',
  },
  {
    codigo: '07-1042', nome: 'Petroquímica Baixada', base: 'Volume mensal',
    sinal: 'Mês acelerando acima do previsto',
    atual: '71%', meter: '71%', meterVar: 'warn', projecao: '108%',
    orientacao: 'Baixa automática se o consumo desacelerar',
  },
  {
    codigo: '07-0830', nome: 'Águas de Praia Grande', base: 'Volume anual',
    sinal: 'Aproximação do teto',
    atual: '64%', meter: '64%', meterVar: 'warn', projecao: '103%',
    orientacao: 'Margem estreita para o restante do ano',
  },
]

const SINAIS_COLS = [
  {
    key: 'ponto', label: 'Ponto',
    render: (r) => (
      <Link to="/gestor/apontamento" style={{ color: 'var(--ink)', textDecoration: 'none' }}>
        <b>{r.codigo}</b><br />
        <span className="muted" style={{ fontSize: 11 }}>{r.nome}</span>
      </Link>
    ),
  },
  {
    key: 'sinal', label: 'Sinal',
    render: (r) => (
      <>
        <span className="muted" style={{ fontSize: 10.5, display: 'block' }}>{r.base}</span>
        {r.sinal}
      </>
    ),
  },
  {
    key: 'grau', label: 'Grau',
    render: () => <span className="muted" style={{ fontSize: 11 }}>–</span>,
  },
  {
    key: 'proj', label: 'Projeção',
    render: (r) => (
      <div style={{ minWidth: 150 }}>
        <Meter value={r.meter} variant={r.meterVar} />
        <span className="muted" style={{ fontSize: 11 }}>{r.atual} hoje · projeta <b>{r.projecao}</b></span>
      </div>
    ),
  },
  {
    key: 'orientacao', label: 'Orientação',
    render: (r) => <span style={{ fontSize: 11 }}>{r.orientacao}</span>,
  },
]

const top = (
  <>
    <div className="crumb">Operação / <b style={{ color: 'var(--ink)' }}>Apontamentos</b></div>
    <span className="sp" />
    <Pill variant="bad">2 gravíssima/grave</Pill>
    <Pill variant="warn">5 em tratamento</Pill>
    <Pill variant="label">3 sinais</Pill>
    <Btn sub style={{ padding: '6px 12px' }}>Exportar</Btn>
  </>
)

export default function Apontamentos() {
  const navigate = useNavigate()
  const go = () => navigate('/gestor/apontamento')
  return (
    <GestorShell tag="GESTOR · 05" title="Apontamentos da bacia" active="apontamentos" top={top}>
      <Bento>

        {/* fila de tratamento: exceções e atos ordenados por grau e fase */}
        <Panel
          lead
          col={12}
          header={<>Fila de tratamento <Sp /><Pill variant="label">exceções e atos · por grau e fase</Pill></>}
        >
          {/* filtros: chips de UI de produto; enumerações vêm da seção 4 da fundamentação */}
          <div className="body" style={{ paddingBottom: 0 }}>
            <Row style={{ gap: 18, alignItems: 'flex-start' }}>
              <div>
                <div className="muted" style={{ fontSize: 11, marginBottom: 6 }}>Natureza</div>
                <Row style={{ gap: 6 }}>
                  <Pill variant="act">Todas</Pill>
                  <Pill>Exceção detectada</Pill>
                  <Pill>Ato administrativo</Pill>
                </Row>
              </div>
              <div>
                <div className="muted" style={{ fontSize: 11, marginBottom: 6 }}>Tipo</div>
                <Row style={{ gap: 6 }}>
                  <Pill variant="act">Todos</Pill>
                  <Pill>Volume</Pill>
                  <Pill>Qualidade do dado</Pill>
                  <Pill>Calendário</Pill>
                  <Pill>Condicionante</Pill>
                </Row>
              </div>
              <div>
                <div className="muted" style={{ fontSize: 11, marginBottom: 6 }}>Grau</div>
                <Row style={{ gap: 6 }}>
                  <Pill variant="act">Todos</Pill>
                  <Pill>gravíssima</Pill>
                  <Pill>grave</Pill>
                  <Pill>leve</Pill>
                </Row>
              </div>
            </Row>
          </div>

          <DataTable
            columns={FILA_COLS}
            rows={FILA.map((r) => ({ ...r, onClick: go }))}
            search={['codigo', 'nome', 'protocolo', 'apontamento', 'tipo', 'natureza', 'grau', 'fase']}
            searchPlaceholder="Buscar ponto / protocolo / grau / fase…"
            pageSize={7}
            empty="Nenhum apontamento corresponde à busca."
          />
        </Panel>

        {/* link-out para processos sancionadores: objeto próprio, tela própria */}
        <Panel col={12} header={<>Processos sancionadores <Sp /><Pill variant="label">rito próprio · tela própria</Pill></>}>
          <div className="body">
            <Row style={{ gap: 12, alignItems: 'center' }}>
              <span style={{ fontSize: 13 }}>
                Os processos sancionadores seguem rito próprio (Portaria DAEE 4.905/2019), com número, linha do tempo e penalidade.
                Cada linha desta fila que já tem auto lavrado mantém o vínculo; o rito corre em tela separada.
              </span>
              <Btn sub to="/gestor/processo" style={{ padding: '6px 14px', whiteSpace: 'nowrap' }}>Abrir Processos sancionadores →</Btn>
            </Row>
          </div>
          <Note style={{ margin: '0 14px 14px', fontSize: 12 }}>
            Exceções e processos não ocupam a mesma fila. A fila acima reúne o que aguarda justificativa ou correção, ordenado por grau.
            O processo sancionador, criado quando o gestor lavra o auto, é objeto próprio, com número, evidência congelada na lavratura e
            prazos de defesa, recurso e julgamento. Ver <b>GESTOR · 09</b>.
          </Note>
        </Panel>

        {/* sinais de gestão: acompanhamento, sem grau, sem prazo, baixa automática */}
        <Panel
          col={12}
          header={<>Sinais de gestão <Sp /><Pill variant="label">acompanhamento · sem grau · sem prazo</Pill></>}
        >
          <DataTable
            columns={SINAIS_COLS}
            rows={SINAIS.map((r) => ({ ...r, onClick: go }))}
            search={['codigo', 'nome', 'sinal', 'base']}
            searchPlaceholder="Buscar ponto…"
            pageSize={6}
            empty="Nenhum sinal de gestão ativo."
          />
        </Panel>

        <Note col={8} style={{ marginTop: 4 }}>
          <b>A fila de tratamento.</b> Reúne exceções detectadas e atos administrativos que precisam de desfecho, ordenados por grau
          (gravíssima · grave · leve; Lei 7.663/1991, art. 13) e, dentro do grau, pela fase mais avançada no rito de nove passos.
          Cada linha aponta o responsável pela próxima ação e o prazo, contado a partir da ciência.
          As exceções se encerram por justificativa aceita ou correção comprovada.
          Quando o gestor lavra o auto de infração, o apontamento conserva o vínculo e o pacote de evidência;
          o rito de defesa e julgamento corre no processo sancionador, em tela própria.
        </Note>

        <Note col={4} style={{ marginTop: 4 }}>
          <b>Os sinais de gestão ficam à parte.</b> Um sinal indica risco antes que ele se concretize:
          o consumo ainda está dentro do outorgado, mas o ritmo projeta ultrapassar o limite.
          A coluna Grau exibe "–" (não há infração configurada, portanto não há grau).
          Não há prazo associado; a baixa é automática quando o consumo desacelera.
        </Note>

      </Bento>
    </GestorShell>
  )
}
