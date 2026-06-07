import { Link, useNavigate } from 'react-router-dom'
import { GestorShell } from '../../components/shell.jsx'
import { Bento, Panel, Body, Note, Pill, Btn, Row, Sp } from '../../components/ui.jsx'

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
    <GestorShell tag="GESTOR" title="Pontos / outorgas" active="pontos" top={top}>
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

          <table className="table" style={{ marginTop: 6 }}>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Sub-bacia</th>
                <th>Município</th>
                <th>Finalidade</th>
                <th>Faixa</th>
                <th>Situação</th>
                <th className="num">Apontamentos</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ cursor: 'pointer' }} onClick={() => navigate('/gestor/detalhe')}>
                <td><Link to="/gestor/detalhe" style={{ color: 'var(--ink)', textDecoration: 'none' }}><b>07-1100</b></Link></td>
                <td>Indústria Química Cubatão</td>
                <td>Rio Cubatão</td>
                <td>Cubatão</td>
                <td>Industrial</td>
                <td><Pill variant="act">A</Pill></td>
                <td><Pill variant="bad">Ato administrativo · grau gravíssima</Pill></td>
                <td className="num">1</td>
              </tr>

              <tr style={{ cursor: 'pointer' }} onClick={() => navigate('/gestor/detalhe')}>
                <td><Link to="/gestor/detalhe" style={{ color: 'var(--ink)', textDecoration: 'none' }}><b>07-1042</b></Link></td>
                <td>Petroquímica Baixada S/A</td>
                <td>Rio Cubatão</td>
                <td>Cubatão</td>
                <td>Industrial</td>
                <td><Pill variant="act">A</Pill></td>
                <td><Pill variant="bad">Ato administrativo · grau grave</Pill></td>
                <td className="num">1</td>
              </tr>

              <tr style={{ cursor: 'pointer' }} onClick={() => navigate('/gestor/detalhe')}>
                <td><Link to="/gestor/detalhe" style={{ color: 'var(--ink)', textDecoration: 'none' }}><b>07-1001</b></Link></td>
                <td>Indústria Cubatão S/A</td>
                <td>Rio Cubatão</td>
                <td>Cubatão</td>
                <td>Industrial</td>
                <td><Pill variant="act">A</Pill></td>
                <td><Pill variant="warn">Exceção · grau média</Pill></td>
                <td className="num">2 abertos · 1 encerrado</td>
              </tr>

              <tr style={{ cursor: 'pointer' }} onClick={() => navigate('/gestor/detalhe')}>
                <td><Link to="/gestor/detalhe" style={{ color: 'var(--ink)', textDecoration: 'none' }}><b>07-0830</b></Link></td>
                <td>Serviço de Águas de Praia Grande</td>
                <td>Drenagem direta</td>
                <td>Praia Grande</td>
                <td>Abastecimento público</td>
                <td><Pill>B</Pill></td>
                <td><Pill variant="warn">Exceção · a vencer em 40 dias</Pill></td>
                <td className="num">1</td>
              </tr>

              <tr style={{ cursor: 'pointer' }} onClick={() => navigate('/gestor/detalhe')}>
                <td><Link to="/gestor/detalhe" style={{ color: 'var(--ink)', textDecoration: 'none' }}><b>07-0712</b></Link></td>
                <td>Laticínios Itanhaém</td>
                <td>Drenagem direta</td>
                <td>Itanhaém</td>
                <td>Industrial</td>
                <td><Pill>B</Pill></td>
                <td><Pill variant="warn">Exceção · calibração vencida</Pill></td>
                <td className="num">1</td>
              </tr>

              <tr style={{ cursor: 'pointer' }} onClick={() => navigate('/gestor/detalhe')}>
                <td><Link to="/gestor/detalhe" style={{ color: 'var(--ink)', textDecoration: 'none' }}><b>07-0455</b></Link></td>
                <td>Indústria Têxtil Mongaguá</td>
                <td>Drenagem direta</td>
                <td>Mongaguá</td>
                <td>Industrial</td>
                <td><Pill>C</Pill></td>
                <td><Pill variant="warn">Exceção · sem uso há 2 anos</Pill></td>
                <td className="num">1</td>
              </tr>
            </tbody>
          </table>
        </Panel>

        <Note col={8} style={{ marginTop: 4 }}>
          <b>Esta é a lista; o detalhe é o ponto.</b> Aqui o gestor vê todos os pontos de captação da bacia de uma vez. Cada linha abre o ponto, onde aparecem os limites outorgados, as séries de telemetria e a tramitação de cada apontamento. A coluna <b>Situação</b> mostra só o apontamento aberto mais grave de cada ponto: um <b>ato administrativo</b> (rito legal correndo) pesa mais que uma <b>exceção</b> (à espera de justificativa), que por sua vez pesa mais que um <b>sinal de gestão</b> (nada excedido ainda). Por isso fraude e reincidência sobem ao topo.
        </Note>

        <Note col={4} style={{ marginTop: 4 }}>
          <b>Pontos sem apontamento.</b> Um ponto pode aparecer sem nenhum apontamento aberto: significa que mede, transmite e está dentro dos limites. A lista é o ponto de partida; o trabalho do dia mora na fila de apontamentos.
        </Note>
      </Bento>
    </GestorShell>
  )
}
