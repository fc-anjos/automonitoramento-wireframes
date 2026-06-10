import { Link, useNavigate } from 'react-router-dom'
import { GestorShell } from '../../components/shell.jsx'
import { Bento, Panel, Note, Pill, Btn, Row, Sp, Meter, DataTable } from '../../components/ui.jsx'

// Fila de tratamento: o que cruzou uma linha e precisa de desfecho.
// Só exceções e atos administrativos. A escalada exceção -> ato é mudança de
// fase, não troca de lista, então os dois moram aqui, ordenados por gravidade.
const FILA = [
  { codigo: '07-1100', nome: 'Ind. Química Cubatão', protocolo: 'AP-1100-A', apontamento: 'Indício de fraude na medição', natureza: 'Ato administrativo', tipo: 'Qualidade do dado', grau: 'gravíssima', grauVar: 'bad', fase: 'Autuada', prazo: 'ciência e defesa', dono: 'gestor', proxima: 'Dar ciência ao usuário; cabível embargo' },
  { codigo: '07-1042', nome: 'Petroquímica Baixada', protocolo: 'AP-1042-A', apontamento: 'Volume mensal acima do outorgado', natureza: 'Ato administrativo', tipo: 'Volume', grau: 'grave', grauVar: 'bad', fase: 'Em defesa/recurso', prazo: 'defesa até 04/06', dono: 'outorgado', proxima: 'Aguardar defesa (prazo correndo)' },
  { codigo: '07-1001', nome: 'Indústria Cubatão S/A', protocolo: 'AP-1001-A', apontamento: 'Pico de vazão acima do teto', natureza: 'Exceção', tipo: 'Volume', grau: 'média', grauVar: 'warn', fase: 'Notificada', prazo: 'justificativa até 25/06', dono: 'outorgado', proxima: 'Aguardar justificativa ou correção' },
  { codigo: '07-0712', nome: 'Laticínios Itanhaém', protocolo: 'AP-0712-A', apontamento: 'Calibração de hidrômetro vencida', natureza: 'Exceção', tipo: 'Condicionante', grau: 'leve', grauVar: 'warn', fase: 'Notificada', prazo: 'recalibrar até 30/06', dono: 'outorgado', proxima: 'Aguardar recalibração credenciada' },
  { codigo: '07-0830', nome: 'Águas de Praia Grande', protocolo: 'AP-0830-A', apontamento: 'Outorga a vencer', natureza: 'Exceção', tipo: 'Calendário', grau: null, fase: 'Notificada', prazo: 'renovar até 17/07', dono: 'outorgado', proxima: 'Aguardar pedido de renovação' },
  { codigo: '07-0455', nome: 'Têxtil Mongaguá', protocolo: 'AP-0455-A', apontamento: 'Sem uso há 2 anos (risco de perecimento)', natureza: 'Exceção', tipo: 'Calendário', grau: null, fase: 'Detectada', prazo: 'regularizar em 12 meses', dono: 'gestor', proxima: 'Confirmar uso ou desativar; perece em 3 anos' },
  { codigo: '07-1001', nome: 'Indústria Cubatão S/A', protocolo: 'AP-1001-C', apontamento: 'Amostra isolada ausente · medidor SDC-R-4472', natureza: 'Exceção', tipo: 'Qualidade do dado', grau: 'leve', grauVar: 'ok', fase: 'Encerrada', prazo: 'nenhum', dono: 'outorgado', proxima: 'Nenhuma (já retificada)' },
]

const FILA_COLS = [
  { key: 'ponto', label: 'Ponto', render: (r) => (
    <Link to="/gestor/apontamento" style={{ color: 'var(--ink)', textDecoration: 'none' }}>
      <b>{r.codigo}</b><br /><span className="muted" style={{ fontSize: 11 }}>{r.nome}</span><br /><span className="muted" style={{ fontSize: 10 }}>protocolo {r.protocolo}</span>
    </Link>
  ) },
  // achado tipado: o tipo é o eixo, o texto é a instância dele
  { key: 'apontamento', label: 'Achado', render: (r) => (
    <><span className="muted" style={{ fontSize: 10.5, display: 'block' }}>{r.tipo}</span>{r.apontamento}</>
  ) },
  { key: 'natureza', label: 'Natureza', render: (r) => <Pill variant="label" style={{ padding: '0 7px', fontSize: 10.5 }}>{r.natureza}</Pill> },
  { key: 'grau', label: 'Grau', render: (r) => r.grau
    ? <Pill variant={r.grauVar}>grau {r.grau}</Pill>
    : <span className="muted" style={{ fontSize: 11 }}>sem grau</span> },
  { key: 'fase', label: 'Fase' },
  { key: 'prazo', label: 'Prazo / dono', render: (r) => <>{r.prazo} · <b>{r.dono}</b></> },
  { key: 'proxima', label: 'Próxima ação' },
]

// Fila própria de processos sancionadores: exceções e processos não competem
// na mesma fila. O processo é objeto próprio (ver gestor/Processo.jsx), criado
// quando o gestor lavra o auto; aqui a ordem é por prazo: defesas a julgar,
// ciências pendentes, prazos a vencer. State-law deadlines render as params.
const PROCESSOS = [
  { num: 'PAS-07-2026-0042', codigo: '07-1100', nome: 'Indústria Química Cubatão', objeto: 'Indício de fraude na medição', grau: 'gravíssima', grauVar: 'bad', fase: 'Defesa a julgar', prazo: 'defesa protocolada em 18/06', dono: 'gestor', proxima: 'Julgar 1ª instância · decisão fundamentada' },
  { num: 'PAS-07-2026-0051', codigo: '07-1042', nome: 'Petroquímica Baixada S/A', objeto: 'Volume mensal acima do outorgado', grau: 'grave', grauVar: 'bad', fase: 'Ciência pendente', prazo: 'lavrado em 06/06 · aguarda ciência', dono: 'outorgado', proxima: 'Registrar ciência · marco do prazo' },
  { num: 'PAS-07-2026-0012', codigo: '07-1100', nome: 'Indústria Química Cubatão', objeto: 'Captação continuada acima do volume outorgado', grau: 'gravíssima', grauVar: 'bad', fase: 'Defesa · prazo correndo', prazo: 'prazo parametrizável · conferir DOE', dono: 'outorgado', proxima: 'Aguardar defesa ou decurso do prazo' },
  { num: 'PAS-07-2025-0019', codigo: '07-1042', nome: 'Petroquímica Baixada S/A', objeto: 'Multa mantida em 1ª instância', grau: 'grave', grauVar: 'bad', fase: 'Recurso · 2ª instância', prazo: 'sem efeito suspensivo · guia exigível', dono: 'gestor', proxima: 'Julgar 2ª instância · definitivo' },
]

const PROCESSOS_COLS = [
  { key: 'processo', label: 'Processo', render: (r) => (
    <Link to="/gestor/processo" style={{ color: 'var(--ink)', textDecoration: 'none' }}>
      <b className="mono">{r.num}</b><br /><span className="muted" style={{ fontSize: 11 }}>{r.codigo} · {r.nome}</span>
    </Link>
  ) },
  { key: 'objeto', label: 'Objeto do auto' },
  { key: 'grau', label: 'Grau', render: (r) => <Pill variant={r.grauVar}>grau {r.grau}</Pill> },
  { key: 'fase', label: 'Fase do rito' },
  { key: 'prazo', label: 'Prazo / dono', render: (r) => <>{r.prazo} · <b>{r.dono}</b></> },
  { key: 'proxima', label: 'Próxima ação' },
]

// Sinais de gestão: projeções, não infrações. Nada foi excedido; o ritmo aponta
// para o teto e o sistema avisa. Sem grau, sem prazo, dão baixa sozinhos.
const SINAIS = [
  { codigo: '07-1001', nome: 'Indústria Cubatão S/A', base: 'Volume anual', sinal: 'Ritmo projeta estouro do limite', atual: '58%', meter: '58%', meterVar: 'bad', projecao: '116%', nota: 'Reduzir o ritmo para não estourar o anual outorgado' },
  { codigo: '07-1042', nome: 'Petroquímica Baixada', base: 'Volume mensal', sinal: 'Mês acelerando acima do previsto', atual: '71%', meter: '71%', meterVar: 'warn', projecao: '108%', nota: 'Cai sozinho se o consumo desacelerar' },
  { codigo: '07-0830', nome: 'Águas de Praia Grande', base: 'Volume anual', sinal: 'Aproximação do teto', atual: '64%', meter: '64%', meterVar: 'warn', projecao: '103%', nota: 'Margem estreita para o restante do ano' },
]

const SINAIS_COLS = [
  { key: 'ponto', label: 'Ponto', render: (r) => (
    <Link to="/gestor/apontamento" style={{ color: 'var(--ink)', textDecoration: 'none' }}>
      <b>{r.codigo}</b><br /><span className="muted" style={{ fontSize: 11 }}>{r.nome}</span>
    </Link>
  ) },
  { key: 'sinal', label: 'Sinal', render: (r) => (
    <><span className="muted" style={{ fontSize: 10.5, display: 'block' }}>{r.base}</span>{r.sinal}</>
  ) },
  { key: 'proj', label: 'Projeção', render: (r) => (
    <div style={{ minWidth: 150 }}>
      <Meter value={r.meter} variant={r.meterVar} />
      <span className="muted" style={{ fontSize: 11 }}>{r.atual} hoje · projeta <b>{r.projecao}</b></span>
    </div>
  ) },
  { key: 'nota', label: 'Orientação' },
]

const top = (
  <>
    <div className="crumb">Operação / <b style={{ color: 'var(--ink)' }}>Apontamentos</b></div>
    <span className="sp" />
    <Pill variant="bad">2 graves+</Pill>
    <Pill variant="warn">7 em tratamento</Pill>
    <Pill variant="label">3 sinais</Pill>
    <Pill variant="label">4 processos</Pill>
    <Btn sub style={{ padding: '6px 12px' }}>Exportar</Btn>
  </>
)

export default function Apontamentos() {
  const navigate = useNavigate()
  const go = () => navigate('/gestor/apontamento')
  const goProcesso = () => navigate('/gestor/processo')
  return (
    <GestorShell tag="GESTOR · 05" title="Apontamentos da bacia" active="apontamentos" top={top}>
      <Bento>

        {/* worklist: o que cruzou uma linha e precisa de desfecho */}
        <Panel
          lead
          col={12}
          header={<>Fila de tratamento <Sp /><Pill variant="label">exceções e atos · por gravidade</Pill></>}
        >
          {/* filtros: chips de UI de produto (sem racional embutido) */}
          <div className="body" style={{ paddingBottom: 0 }}>
            <Row style={{ gap: 18, alignItems: 'flex-start' }}>
              <div>
                <div className="muted" style={{ fontSize: 11, marginBottom: 6 }}>Natureza</div>
                <Row style={{ gap: 6 }}>
                  <Pill variant="act">Todas</Pill>
                  <Pill>Exceção</Pill>
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
                  <Pill>média</Pill>
                  <Pill>leve</Pill>
                </Row>
              </div>
            </Row>
          </div>

          <DataTable
            columns={FILA_COLS}
            rows={FILA.map((r) => ({ ...r, onClick: go }))}
            search={['codigo', 'nome', 'protocolo', 'apontamento', 'tipo', 'natureza']}
            searchPlaceholder="Buscar ponto / protocolo / tipo…"
            pageSize={6}
            empty="Nenhum apontamento corresponde à busca."
          />
        </Panel>

        {/* own queue: processos follow rito próprio, ordered by prazo, never mixed with the triagem */}
        <Panel
          col={12}
          header={<>Processos sancionadores <Sp /><Pill variant="label">rito próprio · ordenado por prazo</Pill><Btn sub to="/gestor/processo" style={{ padding: '6px 12px' }}>Abrir processo →</Btn></>}
        >
          <DataTable
            columns={PROCESSOS_COLS}
            rows={PROCESSOS.map((r) => ({ ...r, onClick: goProcesso }))}
            search={['num', 'codigo', 'nome', 'objeto', 'fase']}
            searchPlaceholder="Buscar processo / ponto / fase…"
            pageSize={6}
            empty="Nenhum processo sancionador em curso."
          />
        </Panel>

        {/* watchlist: projeções que o gestor acompanha, não trabalha */}
        <Panel
          col={12}
          header={<>Sinais de gestão <Sp /><Pill variant="label">acompanhamento · sem prazo</Pill></>}
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

        {/* racional só em .note, fora da cromagem de produto */}
        <Note col={8} style={{ marginTop: 4 }}>
          <b>A fila de tratamento.</b> Reúne os apontamentos que precisam de desfecho. As <b>exceções</b> se encerram por justificativa ou correção; os <b>atos administrativos</b> seguem o rito de ciência, defesa e julgamento. Uma exceção que escala para auto de infração permanece nesta lista e apenas avança de <b>fase</b>. O achado já vem classificado por tipo (volume, qualidade do dado, calendário ou condicionante) e o <b>grau</b> indica a gravidade, que define a ordem das linhas. Cada linha aponta o responsável pela próxima ação e o prazo, contado a partir da ciência.
        </Note>

        <Note col={4} style={{ marginTop: 4 }}>
          <b>Os sinais de gestão ficam à parte.</b> Um sinal de gestão indica um risco antes que ele se concretize: o consumo ainda está dentro do outorgado, mas o ritmo projeta ultrapassar o limite, e o sistema avisa para que o outorgado corrija a tempo. Não há grau nem prazo associados, e o sinal se encerra quando o consumo desacelera. Ao gestor cabe acompanhá-los. Tratá-los na mesma fila atribuiria a um aviso preventivo o peso de um processo já instaurado.
        </Note>

        <Note col={12} style={{ marginTop: 4 }}>
          <b>Exceções e processos não competem na mesma fila.</b> A triagem de apontamentos ordena por gravidade o que ainda aguarda justificativa ou correção; o processo sancionador, criado quando o gestor lavra o auto, é objeto próprio, com número, evidência congelada na lavratura e rito com prazos, e ordena-se pelo que vence primeiro: defesas a julgar, ciências pendentes, prazos a vencer. Os prazos do rito estadual (Portaria DAEE 4.905/2019) aparecem como parâmetros: prazo parametrizável · conferir DOE.
        </Note>

      </Bento>
    </GestorShell>
  )
}
