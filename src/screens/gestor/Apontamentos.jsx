import { Link, useNavigate } from 'react-router-dom'
import { GestorShell } from '../../components/shell.jsx'
import { Bento, Panel, Note, Pill, Btn, Row, Sp, DataTable } from '../../components/ui.jsx'

const FILA = [
  { codigo: '07-1100', nome: 'Ind. Química Cubatão', protocolo: 'AP-1100-A', apontamento: 'Indício de fraude na medição', natureza: 'Ato administrativo', tipo: 'Qualidade do dado', grau: 'gravíssima', grauVar: 'bad', fase: 'Autuada', desde: 'auto 02/06', prazo: 'ciência e defesa', dono: 'gestor', proxima: 'Dar ciência ao usuário; cabível embargo' },
  { codigo: '07-1042', nome: 'Petroquímica Baixada', protocolo: 'AP-1042-A', apontamento: 'Volume mensal acima do outorgado', natureza: 'Ato administrativo', tipo: 'Volume', grau: 'grave', grauVar: 'bad', fase: 'Em defesa/recurso', desde: 'auto 12/05', prazo: 'defesa até 04/06', dono: 'outorgado', proxima: 'Aguardar defesa (prazo correndo)' },
  { codigo: '07-1001', nome: 'Indústria Cubatão S/A', protocolo: 'AP-1001-A', apontamento: 'Pico de vazão acima do teto', natureza: 'Exceção', tipo: 'Volume', grau: 'média', grauVar: 'warn', fase: 'Notificada', desde: '04/06', prazo: 'justificativa até 25/06', dono: 'outorgado', proxima: 'Aguardar justificativa ou correção' },
  { codigo: '07-0712', nome: 'Laticínios Itanhaém', protocolo: 'AP-0712-A', apontamento: 'Calibração do hidrômetro vencida', natureza: 'Exceção', tipo: 'Condicionante', grau: 'leve', grauVar: 'warn', fase: 'Notificada', desde: '01/05', prazo: 'recalibrar até 30/06', dono: 'outorgado', proxima: 'Aguardar recalibração credenciada' },
  { codigo: '07-0830', nome: 'Águas de Praia Grande', protocolo: 'AP-0830-A', apontamento: 'Outorga a vencer', natureza: 'Exceção', tipo: 'Calendário', grau: null, fase: 'Notificada', desde: '–', prazo: 'renovar até 17/07', dono: 'outorgado', proxima: 'Aguardar pedido de renovação' },
  { codigo: '07-0455', nome: 'Têxtil Mongaguá', protocolo: 'AP-0455-A', apontamento: 'Sem uso há 2 anos (risco de perecimento)', natureza: 'Exceção', tipo: 'Calendário', grau: null, fase: 'Detectada', desde: 'jun/2024', prazo: 'regularizar em 12 meses', dono: 'gestor', proxima: 'Confirmar uso ou desativar; perece em 3 anos' },
  { codigo: '07-1001', nome: 'Indústria Cubatão S/A', protocolo: 'AP-1001-C', apontamento: 'Amostra isolada ausente', natureza: 'Exceção', tipo: 'Qualidade do dado', grau: 'leve', grauVar: 'ok', fase: 'Encerrada', desde: '03/06', prazo: 'nenhum', dono: 'outorgado', proxima: 'Nenhuma (já retificada)' },
  { codigo: '07-1001', nome: 'Indústria Cubatão S/A', protocolo: 'AP-1001-B', apontamento: 'Volume anual em risco', natureza: 'Sinal de gestão', tipo: 'Volume', grau: null, fase: '–', desde: 'jun', prazo: 'sem prazo', dono: 'outorgado', proxima: 'Reduzir o ritmo para não estourar o limite anual' },
]

const FILA_COLS = [
  { key: 'ponto', label: 'Ponto', render: (r) => (
    <Link to="/gestor/apontamento" style={{ color: 'var(--ink)', textDecoration: 'none' }}>
      <b>{r.codigo}</b><br /><span className="muted" style={{ fontSize: 11 }}>{r.nome}</span><br /><span className="muted" style={{ fontSize: 10 }}>protocolo {r.protocolo}</span>
    </Link>
  ) },
  { key: 'apontamento', label: 'Apontamento' },
  { key: 'natureza', label: 'Natureza', render: (r) => <Pill variant="label" style={{ padding: '0 7px', fontSize: 10.5 }}>{r.natureza}</Pill> },
  { key: 'tipo', label: 'Tipo' },
  { key: 'grau', label: 'Grau', render: (r) => r.grau
    ? <Pill variant={r.grauVar}>grau {r.grau}</Pill>
    : <span className="muted" style={{ fontSize: 11 }}>sem grau</span> },
  { key: 'fase', label: 'Fase' },
  { key: 'desde', label: 'Desde', num: true },
  { key: 'prazo', label: 'Prazo / dono', render: (r) => <>{r.prazo} · <b>{r.dono}</b></> },
  { key: 'proxima', label: 'Próxima ação' },
]

const top = (
  <>
    <div className="crumb">Operação / <b style={{ color: 'var(--ink)' }}>Apontamentos</b></div>
    <span className="sp" />
    <Pill variant="bad">2 graves+</Pill>
    <Pill variant="warn">4 em curso</Pill>
    <Pill variant="label">8 no total</Pill>
    <Btn sub style={{ padding: '6px 12px' }}>Exportar</Btn>
  </>
)

export default function Apontamentos() {
  const navigate = useNavigate()
  const go = () => navigate('/gestor/apontamento')
  return (
    <GestorShell tag="GESTOR · 04" title="Apontamentos da bacia" active="apontamentos" top={top}>
      <Bento>

        {/* the task: a triage queue of the whole basin's findings, by gravity */}
        <Panel
          lead
          col={12}
          header={<>Fila da bacia <Sp /><Pill variant="label">ordenado por gravidade</Pill></>}
        >
          {/* filtros: chips de UI de produto (sem racional embutido) */}
          <div className="body" style={{ paddingBottom: 0 }}>
            <Row style={{ gap: 18, alignItems: 'flex-start' }}>
              <div>
                <div className="muted" style={{ fontSize: 11, marginBottom: 6 }}>Natureza</div>
                <Row style={{ gap: 6 }}>
                  <Pill variant="act">Todas</Pill>
                  <Pill>Sinal de gestão</Pill>
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

        {/* racional só em .note, fora da cromagem de produto */}
        <Note col={8} style={{ marginTop: 4 }}>
          <b>Uma fila, um vocabulário.</b> Todo achado é um <b>apontamento</b> tipado por três eixos. A <b>natureza</b> diz como ele se comporta: um <b>sinal de gestão</b> é o sistema se autorregulando e dá baixa sozinho quando o ritmo volta ao normal; uma <b>exceção</b> é um desvio à espera de explicação e só fecha com justificativa ou correção; um <b>ato administrativo</b> corre o rito legal, com prazos de ciência e defesa. O <b>tipo</b> diz sobre o quê (volume, qualidade do dado, calendário, condicionante) e o <b>grau</b> dimensiona o problema. Sinal de gestão não tem grau, porque nada foi excedido ainda. A ordenação é por gravidade, então o que corre rito legal sobe ao topo.
        </Note>

        <Note col={4} style={{ marginTop: 4 }}>
          <b>Prazo e dono.</b> Cada linha mostra de quem é a próxima ação. Quando o dono é o <b>outorgado</b>, o gestor acompanha o prazo correr; quando é o <b>gestor</b>, a fila vira lista de trabalho dele. Os prazos contam da ciência, não da emissão. O <b>protocolo</b> identifica cada apontamento na tramitação.
        </Note>

      </Bento>
    </GestorShell>
  )
}
