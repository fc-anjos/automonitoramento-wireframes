import { Link } from 'react-router-dom'
import { GestorShell } from '../../components/shell.jsx'
import { Bento, Card, Panel, Body, Note, Pill, Btn, Row, Grid, Sp } from '../../components/ui.jsx'

// the processo sancionador is its own object, created when the gestor lavra o
// auto from an apontamento: own number, own timeline, own prazos. the two
// objects reference each other; the apontamento keeps detection and triage.
// state-law deadlines (portaria daee 4.905/2019) render as parameters, never
// as constants: the primary source is a scanned pdf without a text layer.

const top = (
  <>
    <div className="crumb"><Link to="/gestor/apontamentos">Apontamentos</Link> / <Link to="/gestor/apontamento">AP-1100-B</Link> / <b style={{ color: 'var(--ink)' }}>processo PAS-07-2026-0012</b></div>
    <span className="sp" />
    <Pill variant="bad">Ato administrativo · grau gravíssima</Pill>
    <Pill variant="label">fase Defesa</Pill>
    <Btn sub style={{ padding: '6px 12px' }}>Exportar trilha</Btn>
  </>
)

export default function Processo() {
  return (
    <GestorShell tag="GESTOR · 09" title="Processo sancionador" active="apontamentos" top={top}>
      <Bento>

        {/* header identity: the processo carries its own number and references the origin */}
        <Card col={12}>
          <Row style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="eyebrow">Processo sancionador · PAS-07-2026-0012</div>
              <h1 style={{ marginTop: 6 }}>Captação continuada acima do volume outorgado</h1>
              <div className="muted" style={{ marginTop: 4 }}>Indústria Química Cubatão · outorga OUT-07-2023-011001 · ponto 07-1100 · Rio Cubatão</div>
            </div>
            <Row style={{ gap: 8 }}><Pill variant="bad">Sob auto de infração</Pill><Pill variant="label">multa diária</Pill></Row>
          </Row>
          <hr className="div" />
          <Grid cols={4}>
            <div><div className="muted" style={{ fontSize: 11 }}>Apontamento de origem</div><div className="mono" style={{ color: 'var(--ink)' }}><Link to="/gestor/apontamento">AP-1100-B</Link></div></div>
            <div><div className="muted" style={{ fontSize: 11 }}>Outorga</div><div className="mono" style={{ color: 'var(--ink)' }}>OUT-07-2023-011001</div></div>
            <div><div className="muted" style={{ fontSize: 11 }}>Lavrado em</div><div className="mono" style={{ color: 'var(--ink)' }}>05/06 16:40</div></div>
            <div><div className="muted" style={{ fontSize: 11 }}>Ciência em</div><div className="mono" style={{ color: 'var(--ink)' }}>09/06 14:30</div></div>
            <div><div className="muted" style={{ fontSize: 11 }}>Fase atual</div><div className="mono" style={{ color: 'var(--ink)' }}>Defesa · prazo correndo</div></div>
            <div><div className="muted" style={{ fontSize: 11 }}>Prazo de defesa</div><div className="mono" style={{ color: 'var(--ink)' }}>parametrizável · conferir DOE</div></div>
            <div><div className="muted" style={{ fontSize: 11 }}>Dono da próxima ação</div><div className="mono" style={{ color: 'var(--ink)' }}>outorgado (defesa)</div></div>
            <div><div className="muted" style={{ fontSize: 11 }}>Evidência</div><div className="mono" style={{ color: 'var(--ink)' }}>congelada na lavratura</div></div>
          </Grid>
        </Card>

        {/* design principle: detection stays in the apontamento; the rito lives here */}
        <Note col={12} style={{ fontSize: 12.5 }}>
          <b>Por que um objeto próprio.</b> O apontamento detecta e tria; quando o gestor lavra o auto, o sistema cria este processo vinculado, com número, linha do tempo e prazos próprios, e os dois objetos passam a se referenciar: o processo carrega a evidência de origem, o apontamento exibe a indicação de processo em curso. O sistema registra marcos, datas e trilha; <b>a decisão de mérito é sempre humana</b>.
        </Note>

        {/* block 1: enquadramento */}
        <Panel lead col={6} header={<>1 · Enquadramento <Sp /><Pill variant="label">sugerido pelo sistema</Pill></>}>
          <Body>
            <div className="list">
              <div className="lrow">
                <div className="lr-top"><span className="lr-title">Tipificação legal</span><Pill variant="label">norma</Pill></div>
                <div className="lr-sub">Uso de recursos hídricos em desacordo com as condições da outorga · Lei 9.433/1997, art. 49 · Lei estadual 7.663/1991, art. 11.</div>
              </div>
              <div className="lrow">
                <div className="lr-top"><span className="lr-title">Grau</span><Pill variant="bad">gravíssima</Pill></div>
                <div className="lr-sub">Sugerido a partir do excesso apurado; confirmado pelo gestor em 05/06.</div>
              </div>
              <div className="lrow">
                <div className="lr-top"><span className="lr-title">Evento × condição</span><Pill variant="warn">condição · multa diária</Pill></div>
                <div className="lr-sub">A irregularidade persiste na série telemétrica de 01/05 a 05/06; por isso a sugestão é multa diária, não simples.</div>
              </div>
              <div className="lrow">
                <div className="lr-top"><span className="lr-title">Atenuantes / agravantes</span><Pill variant="warn">agravante +20%</Pill></div>
                <div className="lr-sub">Nenhuma atenuante reconhecida; uma agravante aplicada, de 20% sobre o valor-base.</div>
              </div>
              <div className="lrow">
                <div className="lr-top"><span className="lr-title">Reincidência (checagem automática)</span><Pill variant="ok">não constatada</Pill></div>
                <div className="lr-sub">Varredura dos processos definitivos da outorga nos últimos 3 anos · nada constatado · a multa não dobra (Resolução ANA 24/2020, art. 27).</div>
              </div>
            </div>
            <Note style={{ fontSize: 12, marginTop: 12 }}><b>O sistema sugere o enquadramento; o gestor decide.</b> A sugestão é gerada a partir dos dados do apontamento de origem; tipificação, grau e modificadores só valem depois de confirmados pelo gestor, e cada confirmação é um ato datado na trilha.</Note>
          </Body>
        </Panel>

        {/* block 2: rito com prazos, as a timeline */}
        <Panel col={6} header={<>2 · Rito com prazos <Sp /><Pill variant="bad">recurso sem efeito suspensivo</Pill></>}>
          <Body>
            <div className="list">
              <div className="lrow">
                <div className="lr-top"><span className="lr-title">Lavrado</span><span className="mono faint" style={{ fontSize: 11 }}>05/06 16:40</span></div>
                <div className="lr-sub">Auto lavrado a partir do apontamento AP-1100-B; evidência congelada neste marco.</div>
              </div>
              <div className="lrow">
                <div className="lr-top"><span className="lr-title">Encaminhamento da documentação</span><Pill variant="label">2 dias úteis</Pill></div>
                <div className="lr-sub">Prazo do agente credenciado (Decreto 63.262/2018, art. 20, II). Cumprido em 08/06.</div>
              </div>
              <div className="lrow">
                <div className="lr-top"><span className="lr-title">Ciência</span><span className="mono faint" style={{ fontSize: 11 }}>09/06 14:30</span></div>
                <div className="lr-sub">Gravada na trilha · início da contagem do prazo de defesa.</div>
              </div>
              <div className="lrow" style={{ background: 'var(--act-soft)', margin: '0 -14px', paddingLeft: 14, paddingRight: 14 }}>
                <div className="lr-top"><span className="lr-title">Defesa</span><span className="pill warn" style={{ fontSize: 10.5 }}>fase atual</span></div>
                <div className="lr-sub">Outorgado apresenta defesa com anexos e protocolo · prazo parametrizável · conferir DOE.</div>
              </div>
              <div className="lrow">
                <div className="lr-top"><span className="lr-title faint">Julgamento de 1ª instância</span><span className="mono faint" style={{ fontSize: 11 }}>a seguir</span></div>
                <div className="lr-sub faint">Decisão fundamentada; ato do gestor, registrado e datado.</div>
              </div>
              <div className="lrow">
                <div className="lr-top"><span className="lr-title faint">Recurso</span><Pill variant="bad" style={{ fontSize: 10.5 }}>sem efeito suspensivo</Pill></div>
                <div className="lr-sub faint">Prazo parametrizável · conferir DOE.</div>
              </div>
              <div className="lrow">
                <div className="lr-top"><span className="lr-title faint">Julgamento de 2ª instância → Definitivo</span><span className="mono faint" style={{ fontSize: 11 }}>a seguir</span></div>
                <div className="lr-sub faint">A decisão definitiva gera a guia de recolhimento (bloco 4).</div>
              </div>
              <div className="lrow">
                <div className="lr-top"><span className="lr-title faint">Cumprimento</span><span className="mono faint" style={{ fontSize: 11 }}>a seguir</span></div>
                <div className="lr-sub faint">Quitação da multa e comprovação da correção pelo outorgado · encerramento pelo gestor.</div>
              </div>
            </div>
            <Note style={{ fontSize: 12, marginTop: 12 }}>O recurso não suspende a penalidade, que segue vigente enquanto a 2ª instância decide. O encerramento exige multa quitada <b>e</b> irregularidade corrigida; o pagamento, isolado, não encerra o processo.</Note>
          </Body>
        </Panel>

        {/* block 3: evidência, assembled from the origin and frozen at lavratura */}
        <Panel col={5} header={<>3 · Evidência <Sp /><Pill variant="label" className="mono">congelada em 05/06 16:40</Pill></>}>
          <Body>
            <div className="list">
              <div className="lrow">
                <div className="lr-top"><span className="lr-title">Série telemétrica</span><span className="mono faint" style={{ fontSize: 11 }}>01/05 a 05/06</span></div>
                <div className="lr-sub">Volume diário captado × outorgado no período da infração, com excedente persistente.</div>
              </div>
              <div className="lrow">
                <div className="lr-top"><span className="lr-title">Declarações do período</span><span className="mono faint" style={{ fontSize: 11 }}>mai/2026</span></div>
                <div className="lr-sub">Declarações vigentes e retificações, com protocolo e data de cadastro.</div>
              </div>
              <div className="lrow">
                <div className="lr-top"><span className="lr-title">Fotos da inspeção</span><span className="mono faint" style={{ fontSize: 11 }}>04/06</span></div>
                <div className="lr-sub">Registro fotográfico do conjunto de bombeamento e do medidor.</div>
              </div>
              <div className="lrow">
                <div className="lr-top"><span className="lr-title">Auto de inspeção de campo</span><span className="mono faint" style={{ fontSize: 11 }}>04/06</span></div>
                <div className="lr-sub">Lavrado pelo agente credenciado na vistoria que confirmou a irregularidade.</div>
              </div>
            </div>
            <Note style={{ fontSize: 12, marginTop: 12 }}>O pacote é montado automaticamente a partir do apontamento de origem e <b>congelado na lavratura</b>: nada entra nem sai depois do marco. O pacote íntegro e datado é o que torna o fluxo digital defensável frente ao de papel.</Note>
          </Body>
        </Panel>

        {/* block 4: penalidade, the art. 50 gradation + computed value + guia */}
        <Panel col={7} header={<>4 · Penalidade <Sp /><Pill variant="label">gradação do art. 50 · Lei 9.433/1997</Pill></>}>
          <table className="table">
            <thead><tr><th>Degrau</th><th>Penalidade</th><th>Situação neste processo</th></tr></thead>
            <tbody>
              <tr><td className="mono">1</td><td>Advertência com prazo de correção</td><td><Pill variant="label">superada · grau gravíssima</Pill></td></tr>
              <tr><td className="mono">2</td><td>Multa simples ou diária</td><td><Pill variant="bad">aplicada · diária</Pill></td></tr>
              <tr><td className="mono">3</td><td>Embargo provisório</td><td><Pill variant="warn">não aplicado · prazo de correção correndo</Pill></td></tr>
              <tr><td className="mono">4</td><td>Embargo definitivo · revogação da outorga</td><td><Link className="pill bad" to="/gestor/cadastro">Encaminhar revogação ao processo de outorga</Link></td></tr>
            </tbody>
          </table>
          <Body>
            <div className="list">
              <div className="lrow">
                <div className="lr-top"><span className="lr-title">Valor computado</span><Pill variant="label">base × grau × modificadores</Pill></div>
                <div className="lr-sub">Base do grau gravíssima R$ 10.000,00/dia · agravante +20% → <b>R$ 12.000,00 por dia de infração</b> · sem dobra por reincidência. Valores ilustrativos · parametrizáveis · conferir DOE.</div>
              </div>
              <div className="lrow">
                <div className="lr-top"><span className="lr-title">Guia de recolhimento</span><Pill variant="label">ainda não emitida</Pill></div>
                <div className="lr-sub">Emitida pelo sistema no julgamento definitivo, com o valor já computado; o gestor confirma, não digita. <Link to="/gestor/arrecadacao">Acompanhar na Arrecadação</Link>.</div>
              </div>
            </div>
            <Note style={{ fontSize: 12, marginTop: 12 }}>O embargo definitivo é o desfecho último do rito e enseja a <b>revogação por descumprimento</b>, ato do processo de outorga, fora da plataforma: o sistema registra o encaminhamento na trilha e o cadastro espelhado reflete o novo estado. Como em todo o sistema, nada se apaga; a outorga muda de estado com a trilha completa.</Note>
          </Body>
        </Panel>

        {/* asymmetry + audit reminder, mirroring the sibling screens */}
        <Note col={12}>
          A assimetria de verbos se mantém no rito: o outorgado <b>toma ciência, apresenta defesa, interpõe recurso, paga e comprova a correção</b>, sempre pelo aplicativo; lavrar, julgar nas duas instâncias e encerrar são atos do gestor e só existem aqui. Cada marco é gravado na trilha de auditoria imutável, com quem, quando e qual ato, porque os prazos correm da ciência e a data de cada marco precisa ser incontestável.
        </Note>

      </Bento>
    </GestorShell>
  )
}
