import { Link, useNavigate } from 'react-router-dom'
import { GestorShell } from '../../components/shell.jsx'
import { Bento, Panel, Note, Pill, Btn, Row, Sp } from '../../components/ui.jsx'

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

          <table className="table" style={{ marginTop: 6 }}>
            <thead>
              <tr>
                <th>Ponto</th>
                <th>Apontamento</th>
                <th>Natureza</th>
                <th>Tipo</th>
                <th>Grau</th>
                <th>Fase</th>
                <th className="num">Desde</th>
                <th>Prazo / dono</th>
                <th>Próxima ação</th>
              </tr>
            </thead>
            <tbody>

              {/* AP-1100-A · gravíssima · ato administrativo · qualidade do dado · autuada */}
              <tr style={{ cursor: 'pointer' }} onClick={go}>
                <td><Link to="/gestor/apontamento" style={{ color: 'var(--ink)', textDecoration: 'none' }}><b>07-1100</b><br /><span className="muted" style={{ fontSize: 11 }}>Ind. Química Cubatão</span><br /><span className="muted" style={{ fontSize: 10 }}>protocolo AP-1100-A</span></Link></td>
                <td>Indício de fraude na medição</td>
                <td><Pill variant="label" style={{ padding: '0 7px', fontSize: 10.5 }}>Ato administrativo</Pill></td>
                <td>Qualidade do dado</td>
                <td><Pill variant="bad">grau gravíssima</Pill></td>
                <td>Autuada</td>
                <td className="num">auto 02/06</td>
                <td>ciência e defesa · <b>gestor</b></td>
                <td>Dar ciência ao usuário; cabível embargo</td>
              </tr>

              {/* AP-1042-A · grave · ato administrativo · volume · em defesa */}
              <tr style={{ cursor: 'pointer' }} onClick={go}>
                <td><Link to="/gestor/apontamento" style={{ color: 'var(--ink)', textDecoration: 'none' }}><b>07-1042</b><br /><span className="muted" style={{ fontSize: 11 }}>Petroquímica Baixada</span><br /><span className="muted" style={{ fontSize: 10 }}>protocolo AP-1042-A</span></Link></td>
                <td>Volume mensal acima do outorgado</td>
                <td><Pill variant="label" style={{ padding: '0 7px', fontSize: 10.5 }}>Ato administrativo</Pill></td>
                <td>Volume</td>
                <td><Pill variant="bad">grau grave</Pill></td>
                <td>Em defesa/recurso</td>
                <td className="num">auto 12/05</td>
                <td>defesa até 04/06 · <b>outorgado</b></td>
                <td>Aguardar defesa (prazo correndo)</td>
              </tr>

              {/* AP-1001-A · média · exceção · volume · notificada */}
              <tr style={{ cursor: 'pointer' }} onClick={go}>
                <td><Link to="/gestor/apontamento" style={{ color: 'var(--ink)', textDecoration: 'none' }}><b>07-1001</b><br /><span className="muted" style={{ fontSize: 11 }}>Indústria Cubatão S/A</span><br /><span className="muted" style={{ fontSize: 10 }}>protocolo AP-1001-A</span></Link></td>
                <td>Pico de vazão acima do teto</td>
                <td><Pill variant="label" style={{ padding: '0 7px', fontSize: 10.5 }}>Exceção</Pill></td>
                <td>Volume</td>
                <td><Pill variant="warn">grau média</Pill></td>
                <td>Notificada</td>
                <td className="num">04/06</td>
                <td>justificativa até 25/06 · <b>outorgado</b></td>
                <td>Aguardar justificativa ou correção</td>
              </tr>

              {/* AP-0712-A · leve · exceção · condicionante · notificada */}
              <tr style={{ cursor: 'pointer' }} onClick={go}>
                <td><Link to="/gestor/apontamento" style={{ color: 'var(--ink)', textDecoration: 'none' }}><b>07-0712</b><br /><span className="muted" style={{ fontSize: 11 }}>Laticínios Itanhaém</span><br /><span className="muted" style={{ fontSize: 10 }}>protocolo AP-0712-A</span></Link></td>
                <td>Calibração do hidrômetro vencida</td>
                <td><Pill variant="label" style={{ padding: '0 7px', fontSize: 10.5 }}>Exceção</Pill></td>
                <td>Condicionante</td>
                <td><Pill variant="warn">grau leve</Pill></td>
                <td>Notificada</td>
                <td className="num">01/05</td>
                <td>recalibrar até 30/06 · <b>outorgado</b></td>
                <td>Aguardar recalibração credenciada</td>
              </tr>

              {/* AP-0830-A · calendário · exceção · sem grau · notificada */}
              <tr style={{ cursor: 'pointer' }} onClick={go}>
                <td><Link to="/gestor/apontamento" style={{ color: 'var(--ink)', textDecoration: 'none' }}><b>07-0830</b><br /><span className="muted" style={{ fontSize: 11 }}>Águas de Praia Grande</span><br /><span className="muted" style={{ fontSize: 10 }}>protocolo AP-0830-A</span></Link></td>
                <td>Outorga a vencer</td>
                <td><Pill variant="label" style={{ padding: '0 7px', fontSize: 10.5 }}>Exceção</Pill></td>
                <td>Calendário</td>
                <td><span className="muted" style={{ fontSize: 11 }}>sem grau</span></td>
                <td>Notificada</td>
                <td className="num">–</td>
                <td>renovar até 17/07 · <b>outorgado</b></td>
                <td>Aguardar pedido de renovação</td>
              </tr>

              {/* AP-0455-A · calendário · exceção · sem grau · detectada · dono gestor */}
              <tr style={{ cursor: 'pointer' }} onClick={go}>
                <td><Link to="/gestor/apontamento" style={{ color: 'var(--ink)', textDecoration: 'none' }}><b>07-0455</b><br /><span className="muted" style={{ fontSize: 11 }}>Têxtil Mongaguá</span><br /><span className="muted" style={{ fontSize: 10 }}>protocolo AP-0455-A</span></Link></td>
                <td>Sem uso há 2 anos (risco de perecimento)</td>
                <td><Pill variant="label" style={{ padding: '0 7px', fontSize: 10.5 }}>Exceção</Pill></td>
                <td>Calendário</td>
                <td><span className="muted" style={{ fontSize: 11 }}>sem grau</span></td>
                <td>Detectada</td>
                <td className="num">jun/2024</td>
                <td>regularizar em 12 meses · <b>gestor</b></td>
                <td>Confirmar uso ou desativar; perece em 3 anos</td>
              </tr>

              {/* AP-1001-C · leve · exceção · qualidade do dado · encerrada */}
              <tr style={{ cursor: 'pointer' }} onClick={go}>
                <td><Link to="/gestor/apontamento" style={{ color: 'var(--ink)', textDecoration: 'none' }}><b>07-1001</b><br /><span className="muted" style={{ fontSize: 11 }}>Indústria Cubatão S/A</span><br /><span className="muted" style={{ fontSize: 10 }}>protocolo AP-1001-C</span></Link></td>
                <td>Amostra isolada ausente</td>
                <td><Pill variant="label" style={{ padding: '0 7px', fontSize: 10.5 }}>Exceção</Pill></td>
                <td>Qualidade do dado</td>
                <td><Pill variant="ok">grau leve</Pill></td>
                <td>Encerrada</td>
                <td className="num">03/06</td>
                <td>nenhum · <b>outorgado</b></td>
                <td>Nenhuma (já retificada)</td>
              </tr>

              {/* AP-1001-B · sinal de gestão · volume · sem grau */}
              <tr style={{ cursor: 'pointer' }} onClick={go}>
                <td><Link to="/gestor/apontamento" style={{ color: 'var(--ink)', textDecoration: 'none' }}><b>07-1001</b><br /><span className="muted" style={{ fontSize: 11 }}>Indústria Cubatão S/A</span><br /><span className="muted" style={{ fontSize: 10 }}>protocolo AP-1001-B</span></Link></td>
                <td>Volume anual em risco</td>
                <td><Pill variant="label" style={{ padding: '0 7px', fontSize: 10.5 }}>Sinal de gestão</Pill></td>
                <td>Volume</td>
                <td><span className="muted" style={{ fontSize: 11 }}>sem grau</span></td>
                <td>–</td>
                <td className="num">jun</td>
                <td>sem prazo · <b>outorgado</b></td>
                <td>Reduzir o ritmo para não estourar o limite anual</td>
              </tr>

            </tbody>
          </table>
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
