import { Link, useNavigate } from 'react-router-dom'
import { GestorShell } from '../../components/shell.jsx'
import { Bento, Panel, Body, Note, Pill, Btn, Row, Sp, DataTable } from '../../components/ui.jsx'

const PONTOS = [
  { id: '07-1100', nome: 'Indústria Química Cubatão', subbacia: 'Rio Cubatão', municipio: 'Cubatão', finalidade: 'Industrial', faixa: 'A', faixaVar: 'act', situacao: 'Ato administrativo · grau gravíssima', situacaoVar: 'bad', apont: '1' },
  { id: '07-1042', nome: 'Petroquímica Baixada S/A', subbacia: 'Rio Cubatão', municipio: 'Cubatão', finalidade: 'Industrial', faixa: 'A', faixaVar: 'act', situacao: 'Ato administrativo · grau grave', situacaoVar: 'bad', apont: '1' },
  { id: '07-1001', nome: 'Indústria Cubatão S/A', subbacia: 'Rio Cubatão', municipio: 'Cubatão', finalidade: 'Industrial', faixa: 'A', faixaVar: 'act', situacao: 'Exceção · grau média', situacaoVar: 'warn', apont: '2 abertos · 1 encerrado' },
  { id: '07-0830', nome: 'Serviço de Águas de Praia Grande', subbacia: 'Drenagem direta', municipio: 'Praia Grande', finalidade: 'Abastecimento público', faixa: 'B', situacao: 'Exceção · a vencer em 40 dias', situacaoVar: 'warn', apont: '1' },
  { id: '07-0712', nome: 'Laticínios Itanhaém', subbacia: 'Drenagem direta', municipio: 'Itanhaém', finalidade: 'Industrial', faixa: 'B', situacao: 'Exceção · calibração vencida', situacaoVar: 'warn', apont: '1' },
  { id: '07-0455', nome: 'Indústria Têxtil Mongaguá', subbacia: 'Drenagem direta', municipio: 'Mongaguá', finalidade: 'Industrial', faixa: 'C', situacao: 'Exceção · sem uso há 2 anos', situacaoVar: 'warn', apont: '1' },
]

const PONTO_COLS = [
  { key: 'id', label: 'Código', render: (r) => <Link to="/gestor/detalhe" style={{ color: 'var(--ink)', textDecoration: 'none' }}><b>{r.id}</b></Link> },
  { key: 'nome', label: 'Nome' },
  { key: 'subbacia', label: 'Sub-bacia' },
  { key: 'municipio', label: 'Município' },
  { key: 'finalidade', label: 'Finalidade' },
  { key: 'faixa', label: 'Faixa', render: (r) => <Pill variant={r.faixaVar}>{r.faixa}</Pill> },
  { key: 'situacao', label: 'Situação', render: (r) => <Pill variant={r.situacaoVar}>{r.situacao}</Pill> },
  { key: 'apont', label: 'Apontamentos', num: true },
]

const top = (
  <>
    <div className="crumb">Operação / <b style={{ color: 'var(--ink)' }}>Pontos / outorgas</b></div>
    <span className="sp" />
    <Pill variant="label">6 pontos</Pill>
    <Pill variant="warn">5 com apontamento aberto</Pill>
    <Btn sub style={{ padding: '6px 12px' }}>Exportar</Btn>
  </>
)

export default function Pontos() {
  const navigate = useNavigate()
  return (
    <GestorShell tag="GESTOR · 03" title="Pontos / outorgas" active="pontos" top={top}>
      <Bento>
        <Panel lead col={12} header={<>Pontos / outorgas <Sp /><Pill variant="label">situação pelo apontamento mais grave aberto</Pill></>}>
          <Body style={{ paddingBottom: 0 }}>
            <Row style={{ gap: 18, alignItems: 'flex-start' }}>
              <div>
                <div className="muted" style={{ fontSize: 11, marginBottom: 6 }}>Faixa</div>
                <Row style={{ gap: 6 }}>
                  <Pill variant="act">Todas</Pill>
                  <Pill>A</Pill>
                  <Pill>B</Pill>
                  <Pill>C</Pill>
                </Row>
              </div>
              <div>
                <div className="muted" style={{ fontSize: 11, marginBottom: 6 }}>Sub-bacia</div>
                <Row style={{ gap: 6 }}>
                  <Pill variant="act">Todas</Pill>
                  <Pill>Rio Cubatão</Pill>
                  <Pill>Drenagem direta</Pill>
                </Row>
              </div>
              <div>
                <div className="muted" style={{ fontSize: 11, marginBottom: 6 }}>Situação</div>
                <Row style={{ gap: 6 }}>
                  <Pill variant="act">Todas</Pill>
                  <Pill>Em rito</Pill>
                  <Pill>Em curso</Pill>
                  <Pill>Conforme</Pill>
                </Row>
              </div>
            </Row>
          </Body>

          <DataTable
            columns={PONTO_COLS}
            rows={PONTOS.map((p) => ({ ...p, onClick: () => navigate('/gestor/detalhe') }))}
            search={['id', 'nome', 'municipio', 'finalidade', 'situacao']}
            searchPlaceholder="Buscar código / nome / município…"
            pageSize={5}
            empty="Nenhum ponto corresponde à busca."
          />
        </Panel>

        <Note col={8} style={{ marginTop: 4 }}>
          <b>A lista de pontos.</b> Aqui o gestor vê todos os pontos de captação da bacia de uma vez. Cada linha abre o ponto, onde aparecem os limites outorgados, as séries de telemetria e a tramitação de cada apontamento. A coluna <b>Situação</b> mostra só o apontamento aberto mais grave de cada ponto: um <b>ato administrativo</b> (rito legal correndo) pesa mais que uma <b>exceção</b> (à espera de justificativa), que por sua vez pesa mais que um <b>sinal de gestão</b> (nada excedido ainda). Por isso fraude e reincidência sobem ao topo.
        </Note>

        <Note col={4} style={{ marginTop: 4 }}>
          <b>Pontos sem apontamento.</b> Um ponto pode aparecer sem nenhum apontamento aberto: significa que mede, transmite e está dentro dos limites. A lista serve de ponto de partida; o trabalho do dia está na fila de apontamentos.
        </Note>
      </Bento>
    </GestorShell>
  )
}
