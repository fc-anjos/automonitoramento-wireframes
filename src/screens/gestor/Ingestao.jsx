import { Link } from 'react-router-dom'
import { GestorShell } from '../../components/shell.jsx'
import { Bento, Card, Panel, Body, Note, Pill, Btn, Svg, Row, Sp } from '../../components/ui.jsx'

const top = (
  <>
    <div className="crumb">Dados / <b style={{ color: 'var(--ink)' }}>Ingestão & qualidade</b></div>
    <span className="sp" />
    <Pill>Fontes: telemetria + autodeclaração</Pill>
  </>
)

export default function Ingestao() {
  return (
    <GestorShell tag="GESTOR · 05" title="Ingestão & qualidade de dados" active="ingestao" top={top}>
      <Note style={{ marginBottom: 16 }}>
        <b>Painel de confiança do dado.</b> O automonitoramento só vale o que vale o dado que o sustenta. Todo registro passa por três estados (recebido, validado, consolidado) com checagens de limites físicos, continuidade de série e sinais de fraude ou fluxo reverso. Correção nunca sobrescreve: gera um novo registro que supersede o anterior, e o original fica na trilha de auditoria. Quando uma checagem reprova, o que sai daqui é um apontamento do tipo qualidade do dado, da exceção detectada ao ato administrativo conforme a gravidade. Base única reúne telemetria e autodeclaração.
      </Note>

      <Bento>

        {/* pipeline stages - KPI strip */}
        <Card col={4}><Row style={{ justifyContent: 'space-between' }}><b style={{ color: 'var(--ink)' }}>1 · Recebido</b><Pill variant="label">entrada</Pill></Row><div className="k-value mono" style={{ fontSize: 24, marginTop: 8 }}>312</div><div className="muted" style={{ fontSize: 12 }}>pontos com registro nas últimas 24h</div></Card>
        <Card col={4}><Row style={{ justifyContent: 'space-between' }}><b style={{ color: 'var(--ink)' }}>2 · Validado</b><Pill variant="label">checagem automática</Pill></Row><div className="k-value mono" style={{ fontSize: 24, marginTop: 8 }}>308</div><div className="muted" style={{ fontSize: 12 }}>passaram nas checagens automáticas</div></Card>
        <Card col={4}><Row style={{ justifyContent: 'space-between' }}><b style={{ color: 'var(--ink)' }}>3 · Consolidado</b><Pill variant="label">disponível</Pill></Row><div className="k-value mono" style={{ fontSize: 24, marginTop: 8 }}>307</div><div className="muted" style={{ fontSize: 12 }}>prontos para fiscalização e portal</div></Card>

        {/* data-trust headline: transmission quality over 30 days */}
        <Panel col={12} header={<>Qualidade de transmissão (30 d) <Sp /><Pill>94,8% · meta ≥ 95%</Pill></>}>
          <Body><Svg src="wireframe-chart-transmissao.svg" ratio="520/200" label="Transmissão diária da bacia nos últimos 30 dias, com uma lacuna isolada" /></Body>
        </Panel>

        {/* validation queue - the task: clear what the pipeline held back */}
        <Panel lead col={8} header={<>Fila de validação <Sp /><Pill variant="bad">4 registros retidos</Pill></>}>
          <table className="table">
            <thead><tr><th className="num">Registro</th><th>Ponto</th><th>Checagem reprovada</th><th>Tratativa do gestor</th></tr></thead>
            <tbody>
              <tr><td className="num">53,0 L/s</td><td>07-1001</td><td><Pill variant="warn">Vazão acima do teto</Pill></td><td><Btn sub style={{ padding: '4px 10px' }}>Validar / retificar</Btn></td></tr>
              <tr><td className="num">−42</td><td>07-1188</td><td><Pill variant="bad">Fluxo reverso</Pill></td><td><Btn sub style={{ padding: '4px 10px' }}>Validar / retificar</Btn></td></tr>
              <tr><td className="num">004 281</td><td>07-8842</td><td><Pill variant="warn">Foto ilegível</Pill></td><td><Btn sub style={{ padding: '4px 10px' }}>Validar / retificar</Btn></td></tr>
              <tr><td className="num">–</td><td>07-3320</td><td><Pill variant="warn">Lacuna de série</Pill></td><td><Btn sub style={{ padding: '4px 10px' }}>Validar / retificar</Btn></td></tr>
            </tbody>
          </table>
          <Note style={{ fontSize: 12, margin: '0 14px 14px' }}>Validar ou retificar um registro é tratativa de dado, não de mérito: resolve a confiança na leitura. Reprovar uma checagem não é, por si, infração. Quando a checagem aponta integridade comprometida, abre-se um apontamento do tipo qualidade do dado, que segue abaixo.</Note>
        </Panel>

        {/* SIDE RAIL (span 4): which checks run */}
        <Panel col={4} header="Regras de validação aplicadas">
          <Body stack>
            <div className="mrow"><span className="ico">✓</span><div className="msp"><b style={{ color: 'var(--ink)', fontSize: 13 }}>Limites físicos plausíveis</b><div className="muted" style={{ fontSize: 11.5 }}>registro dentro de mín/máx do medidor</div></div></div>
            <div className="mrow"><span className="ico">✓</span><div className="msp"><b style={{ color: 'var(--ink)', fontSize: 13 }}>Continuidade da série</b><div className="muted" style={{ fontSize: 11.5 }}>registro maior ou igual ao anterior, sem saltos abruptos</div></div></div>
            <div className="mrow"><span className="ico">✓</span><div className="msp"><b style={{ color: 'var(--ink)', fontSize: 13 }}>Fluxo não-negativo</b><div className="muted" style={{ fontSize: 11.5 }}>detecção de vazão reversa</div></div></div>
            <div className="mrow"><span className="ico">~</span><div className="msp"><b style={{ color: 'var(--ink)', fontSize: 13 }}>Anomalia ou fraude</b><div className="muted" style={{ fontSize: 11.5 }}>padrão atípico vai para a fila de apuração</div></div></div>
            <div className="mrow"><span className="ico">+</span><div className="msp"><b style={{ color: 'var(--ink)', fontSize: 13 }}>Correção supersede</b><div className="muted" style={{ fontSize: 11.5 }}>retificação gera novo registro, nunca sobrescreve o original</div></div></div>
            <Note style={{ fontSize: 12, marginTop: 6 }}>Migração de dados legados (SiDeCC e SiDeCC-R) e integração DeclaraÁgua geram um <b>relatório de reconciliação</b>, processo de back-end sem tela dedicada.</Note>
          </Body>
        </Panel>

        {/* typed findings: apontamentos do tipo "qualidade do dado" que nascem aqui */}
        <Panel col={12} header={<>Apontamentos · tipo qualidade do dado <Sp /><Pill variant="label">2</Pill></>}>
          <Body>
            <div className="list">

              <Link className="lrow" to="/gestor/apontamento" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                <div className="lr-top">
                  <span className="lr-title">Indício de fraude na medição · 07-1100</span>
                  <span className="pill bad">grau gravíssima</span>
                </div>
                <div className="lr-sub">
                  <span className="pill label" style={{ padding: '0 7px', fontSize: 10.5 }}>Ato administrativo</span>
                  <span style={{ marginLeft: 6 }}>fase Autuada · auto 02/06 · telemetria diverge da declaração, fluxo reverso</span>
                </div>
                <div className="lr-sub" style={{ marginTop: 4 }}>Próxima ação: gestor dá ciência ao usuário · tratativa: cabível embargo</div>
              </Link>

              <Link className="lrow" to="/gestor/apontamento" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                <div className="lr-top">
                  <span className="lr-title">Amostra isolada ausente · 07-1001</span>
                  <span className="pill ok">grau leve</span>
                </div>
                <div className="lr-sub">
                  <span className="pill label" style={{ padding: '0 7px', fontSize: 10.5 }}>Exceção</span>
                  <span style={{ marginLeft: 6 }}>fase Encerrada · 03/06 · 1 lacuna de transmissão, já retificada</span>
                </div>
                <div className="lr-sub" style={{ marginTop: 4 }}>Próxima ação: nenhuma · tratativa: encerrada</div>
              </Link>

            </div>
            <Note style={{ fontSize: 12, marginTop: 12 }}>Dois apontamentos do mesmo tipo, com naturezas distintas. A lacuna de transmissão em 07-1001 era uma exceção de grau leve, baixada pela retificação assim que o dado foi corrigido. O indício de fraude em 07-1100 é de outra ordem: integridade da medição comprometida é ato administrativo, que aguarda o rito formal e a disposição reservada ao gestor.</Note>
          </Body>
        </Panel>

      </Bento>
    </GestorShell>
  )
}
