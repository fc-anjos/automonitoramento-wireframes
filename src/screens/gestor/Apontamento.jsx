import { Link } from 'react-router-dom'
import { GestorShell } from '../../components/shell.jsx'
import { Bento, Card, Panel, Body, Note, Pill, Btn, Svg, Row, Grid, Sp } from '../../components/ui.jsx'

const top = (
  <>
    <div className="crumb"><Link to="/gestor/pontos">Pontos</Link> / <Link to="/gestor/pontos">Indústria Cubatão S/A</Link> / <Link to="/gestor/detalhe">07-1001</Link> / <b style={{ color: 'var(--ink)' }}>protocolo AP-1001-A</b></div>
    <span className="sp" />
    <Pill variant="warn">Exceção · grau média</Pill>
    <Pill variant="label">fase Notificada</Pill>
    <Btn sub style={{ padding: '6px 12px' }}>Exportar trilha</Btn>
  </>
)

export default function Apontamento() {
  return (
    <GestorShell tag="GESTOR · 06" title="Apontamento · visão do gestor" active="apontamentos" top={top}>
      <Bento>

        {/* header identity */}
        <Card col={12}>
          <Row style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="eyebrow">Apontamento · protocolo AP-1001-A</div>
              <h1 style={{ marginTop: 6 }}>Pico de vazão acima do teto</h1>
              <div className="muted" style={{ marginTop: 4 }}>Indústria Cubatão S/A · ponto 07-1001 · Rio Cubatão</div>
            </div>
            <Row style={{ gap: 8 }}><Pill variant="label">Volume</Pill><Pill variant="warn">grau média</Pill></Row>
          </Row>
          <hr className="div" />
          <Grid cols={4}>
            <div><div className="muted" style={{ fontSize: 11 }}>Natureza</div><div className="mono" style={{ color: 'var(--ink)' }}>Exceção</div></div>
            <div><div className="muted" style={{ fontSize: 11 }}>Limite outorgado</div><div className="mono" style={{ color: 'var(--ink)' }}>45 L/s (instantânea)</div></div>
            <div><div className="muted" style={{ fontSize: 11 }}>Medido</div><div className="mono" style={{ color: 'var(--ink)' }}>pico 53 L/s · 118%</div></div>
            <div><div className="muted" style={{ fontSize: 11 }}>Detectado em</div><div className="mono" style={{ color: 'var(--ink)' }}>04/06 08:20</div></div>
            <div><div className="muted" style={{ fontSize: 11 }}>Notificado em</div><div className="mono" style={{ color: 'var(--ink)' }}>04/06</div></div>
            <div><div className="muted" style={{ fontSize: 11 }}>Ciência em</div><div className="mono" style={{ color: 'var(--ink)' }}>05/06</div></div>
            <div><div className="muted" style={{ fontSize: 11 }}>Prazo de resposta</div><div className="mono" style={{ color: 'var(--ink)' }}>justificativa até 25/06</div></div>
            <div><div className="muted" style={{ fontSize: 11 }}>Dono da próxima ação</div><div className="mono" style={{ color: 'var(--ink)' }}>outorgado</div></div>
          </Grid>
        </Card>

        {/* ESCOPO D1-b: o que a plataforma faz e o que é ato do gestor */}
        <Note col={12} style={{ fontSize: 12.5 }}>
          <b>O que a plataforma faz e o que é ato do gestor.</b> O sistema cobre detecção → notificação → ciência → defesa/justificativa → acompanhamento da regularização. O <b>auto de infração e o julgamento são atos do gestor, registrados no sistema e não adjudicados por ele</b>: a plataforma fornece os marcos, as datas e a trilha, e a decisão de mérito permanece humana. Nada se apaga; dar baixa significa arquivar ou encerrar com trilha completa, sem remover o registro.
        </Note>

        {/* TIMELINE de fases */}
        <Panel col={8} header={<>Linha do tempo das fases <Sp /><Pill variant="label">prazo conta da ciência</Pill></>}>
          <Body>
            <div className="list">
              <div className="lrow">
                <div className="lr-top"><span className="lr-title">Detectada</span><span className="mono faint" style={{ fontSize: 11 }}>04/06 08:20</span></div>
                <div className="lr-sub">Reconciliação telemetria × outorga abriu a exceção.</div>
              </div>
              <div className="lrow">
                <div className="lr-top"><span className="lr-title">Notificada</span><span className="mono faint" style={{ fontSize: 11 }}>04/06</span></div>
                <div className="lr-sub">Notificação emitida, pedindo justificativa.</div>
              </div>
              <div className="lrow" style={{ background: 'var(--act-soft)', margin: '0 -14px', paddingLeft: 14, paddingRight: 14 }}>
                <div className="lr-top"><span className="lr-title">Ciência</span><span className="pill warn" style={{ fontSize: 10.5 }}>fase atual</span></div>
                <div className="lr-sub">Ciência registrada em 05/06. Contagem de prazo iniciada (20 dias).</div>
              </div>
              {/* defesa/recurso and julgamento are no longer fases of the apontamento: they run in the processo vinculado */}
              <div className="lrow">
                <div className="lr-top"><span className="lr-title faint">Defesa, recurso e julgamento</span><Pill variant="label" style={{ fontSize: 10.5 }}>vínculo</Pill></div>
                <div className="lr-sub faint">Deixaram de ser fases do apontamento: se o gestor lavrar o auto, correm num processo vinculado, com número e prazos próprios (processo PAS-… em curso · <Link to="/gestor/processo">ver processo</Link>). O auto e o julgamento seguem sendo atos do gestor.</div>
              </div>
              <div className="lrow">
                <div className="lr-top"><span className="lr-title faint">Aguardando regularização → Encerrada</span><span className="mono faint" style={{ fontSize: 11 }}>a seguir</span></div>
                <div className="lr-sub faint">Encerramento só com trilha; baixa é arquivar, não apagar.</div>
              </div>
            </div>
          </Body>
        </Panel>

        {/* VERBS OF THE GESTOR */}
        <Panel col={4} header={<>Disposição <Sp /><Pill variant="label">verbos do gestor</Pill></>}>
          <Body>
            <Row style={{ gap: 10, flexDirection: 'column', alignItems: 'stretch' }}>
              <Btn block>Notificar</Btn>
              <Btn block>Classificar grau</Btn>
              {/* lavrar creates the processo vinculado (gestor/Processo.jsx) */}
              <Btn block to="/gestor/processo">Lavrar auto de infração</Btn>
              <Btn block>Registrar ciência</Btn>
              <Btn block>Julgar (procede / improcede)</Btn>
              <Btn block>Registrar regularização</Btn>
              <Btn block sub>Encerrar (arquivar com trilha)</Btn>
            </Row>
            <Note style={{ fontSize: 12, marginTop: 12 }}>Os poderes são assimétricos: o app do outorgado só oferece tomar ciência, justificar, anexar e comprovar. Os verbos de disposição existem apenas aqui, e cada um gera um registro datado na trilha. <b>Lavrar auto de infração cria um processo vinculado</b> (GESTOR · 09), com número, linha do tempo e prazos próprios; o apontamento permanece como objeto de detecção e triagem.</Note>
          </Body>
        </Panel>

        {/* AUDIT TRAIL: quem, quando, qual ato */}
        <Panel col={8} header={<>Trilha de auditoria <Sp /><Pill variant="label">quem · quando · qual ato</Pill></>}>
          <table className="table">
            <thead><tr><th>Data / hora</th><th>Ator</th><th>Ato registrado</th></tr></thead>
            <tbody>
              <tr><td>04/06 08:20</td><td>Sistema</td><td>Exceção detectada (pico 53 L/s {'>'} teto 45)</td></tr>
              <tr><td>04/06 10:05</td><td>Gestor · R. Alves</td><td>Notificação emitida</td></tr>
              <tr><td>05/06 14:12</td><td>Outorgado</td><td>Ciência registrada (início da contagem)</td></tr>
              <tr><td>06/06 09:40</td><td>Outorgado</td><td>Documento anexado (relatório de bombeamento)</td></tr>
            </tbody>
          </table>
        </Panel>

        {/* EVIDENCE chart */}
        <Panel col={4} header={<>Evidência · vazão × teto <Sp /><Pill variant="label">janela 4 h</Pill></>}>
          <Body>
            <Svg src="wireframe-chart-vazao.svg" ratio="520/280" label="Vazão instantânea numa janela de 4 h, com um pico de 53 L/s acima do teto de 45 L/s" />
            <Note style={{ fontSize: 12, marginTop: 10 }}>Pico isolado de 53 L/s acima do teto. Como exceção, aguarda justificativa em prazo; não é, por si, infração nem corre rito de ato administrativo.</Note>
          </Body>
        </Panel>

      </Bento>
    </GestorShell>
  )
}
