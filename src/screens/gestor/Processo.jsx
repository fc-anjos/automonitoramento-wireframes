import { Link } from 'react-router-dom'
import { GestorShell } from '../../components/shell.jsx'
import { Bento, Card, Panel, Body, Note, Pill, Btn, Row, Grid, Sp, Verb, DataTable } from '../../components/ui.jsx'

// o processo sancionador e seu proprio objeto, criado quando o gestor lavra o
// auto a partir de um apontamento: numero proprio, linha do tempo propria, prazos
// proprios. os dois objetos se referenciam; o apontamento guarda deteccao e triagem.
// rito: Lei 10.177/1998 -- defesa 15 dias (art. 63, III), recurso 15 dias (art. 44),
// decisao ate 20 dias (art. 63, VII), recurso em efeito meramente devolutivo, ou
// seja, sem efeito suspensivo (art. 46).
// grau: Lei 7.663/1991, art. 13 -- leve / grave / gravisssima. sem "media".
// penalidade: Lei 7.663/1991, art. 12 -- advertencia por escrito / multa
// (100 a 1.000 UFESP, simples ou diaria) / intervencao administrativa /
// embargo definitivo com revogacao da outorga.
// reincidencia dobra a multa: art. 13 ss2.
// a decisao definitiva gera uma MULTA (link /gestor/multas); nao ha "guia de cobranca".

const TRILHA = [
  { id: 1, dt: '05/06 16:40', ator: 'Gestor · M. Souza', ato: 'Auto de infraccao lavrado -- evidencia congelada neste marco.' },
  { id: 2, dt: '08/06 09:12', ator: 'Agente credenciado', ato: 'Documentacao encaminhada ao outorgado (Decreto 63.262/2018, art. 20, II).' },
  { id: 3, dt: '09/06 14:30', ator: 'Outorgado', ato: 'Ciencia registrada -- inicio da contagem do prazo de defesa de 15 dias.' },
]

const TRILHA_COLS = [
  { key: 'dt', label: 'Data / hora', cls: 'mono' },
  { key: 'ator', label: 'Ator' },
  { key: 'ato', label: 'Ato registrado' },
]

const top = (
  <>
    <div className="crumb"><Link to="/gestor/apontamentos">Apontamentos</Link> / <Link to="/gestor/apontamento">AP-1100-B</Link> / <b style={{ color: 'var(--ink)' }}>processo PAS-07-2026-0012</b></div>
    <span className="sp" />
    <Pill variant="bad">Ato administrativo · grau gravissima</Pill>
    <Pill variant="label">fase Em defesa</Pill>
  </>
)

export default function Processo() {
  return (
    <GestorShell tag="GESTOR · 09" title="Processo sancionador" active="apontamentos" top={top}>
      <Bento>

        {/* identidade: o processo carrega seu proprio numero e referencia a origem */}
        <Card col={12}>
          <Row style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="eyebrow">Processo sancionador · PAS-07-2026-0012</div>
              <h1 style={{ marginTop: 6 }}>Captacao continuada acima do volume outorgado</h1>
              <div className="muted" style={{ marginTop: 4 }}>Industria Quimica Cubatao · outorga OUT-07-2023-011001 · ponto 07-1100 · Rio Cubatao</div>
            </div>
            <Row style={{ gap: 8 }}><Pill variant="bad">Sob auto de infracao</Pill><Pill variant="label">multa diaria</Pill></Row>
          </Row>
          <hr className="div" />
          <Grid cols={4}>
            <div><div className="muted" style={{ fontSize: 11 }}>Apontamento de origem</div><div className="mono" style={{ color: 'var(--ink)' }}><Link to="/gestor/apontamento">AP-1100-B</Link></div></div>
            <div><div className="muted" style={{ fontSize: 11 }}>Outorga</div><div className="mono" style={{ color: 'var(--ink)' }}>OUT-07-2023-011001</div></div>
            <div><div className="muted" style={{ fontSize: 11 }}>Lavrado em</div><div className="mono" style={{ color: 'var(--ink)' }}>05/06 16:40</div></div>
            <div><div className="muted" style={{ fontSize: 11 }}>Ciencia em</div><div className="mono" style={{ color: 'var(--ink)' }}>09/06 14:30</div></div>
            <div><div className="muted" style={{ fontSize: 11 }}>Fase atual</div><div className="mono" style={{ color: 'var(--ink)' }}>Em defesa ou recurso</div></div>
            <div><div className="muted" style={{ fontSize: 11 }}>Prazo de defesa</div><div className="mono" style={{ color: 'var(--ink)' }}>15 dias a partir da ciencia (Lei 10.177/1998, art. 63, III)</div></div>
            <div><div className="muted" style={{ fontSize: 11 }}>Dono da proxima acao</div><div className="mono" style={{ color: 'var(--ink)' }}>outorgado (apresentar defesa)</div></div>
            <div><div className="muted" style={{ fontSize: 11 }}>Evidencia</div><div className="mono" style={{ color: 'var(--ink)' }}>congelada na lavratura</div></div>
          </Grid>
        </Card>

        <Note col={12} style={{ fontSize: 12.5 }}>
          O processo nasce da lavratura do auto sobre o apontamento, com numero, linha do tempo e prazos proprios. Processo e apontamento se referenciam: o processo carrega a evidencia de origem; o apontamento exibe a indicacao de processo em curso.
        </Note>

        {/* bloco 1: enquadramento */}
        <Panel lead col={6} header={<>1 · Enquadramento <Sp /><Pill variant="label">sugerido pelo sistema</Pill></>}>
          <Body>
            <div className="list">
              <div className="lrow">
                <div className="lr-top"><span className="lr-title">Tipificacao legal</span><Pill variant="label">norma estadual</Pill></div>
                <div className="lr-sub">Uso de recursos hidricos em desacordo com as condicoes da outorga · Lei 7.663/1991, art. 11 · Decreto 63.262/2018.</div>
              </div>
              <div className="lrow">
                <div className="lr-top"><span className="lr-title">Grau</span><Pill variant="bad">gravissima</Pill></div>
                <div className="lr-sub">Grau em tres niveis: leve, grave, gravissima (Lei 7.663/1991, art. 13). Sugerido a partir do excesso apurado; confirmado pelo gestor em 05/06.</div>
              </div>
              <div className="lrow">
                <div className="lr-top"><span className="lr-title">Evento x condicao</span><Pill variant="warn">condicao · multa diaria</Pill></div>
                <div className="lr-sub">A irregularidade persiste na serie telemetrica de 01/05 a 05/06; por isso a sugestao e multa diaria, nao simples (Lei 7.663/1991, art. 12, II).</div>
              </div>
              <div className="lrow">
                <div className="lr-top"><span className="lr-title">Atenuantes / agravantes</span><Pill variant="warn">agravante +20%</Pill></div>
                <div className="lr-sub">Nenhuma atenuante reconhecida; uma agravante aplicada, de 20% sobre o valor-base.</div>
              </div>
              <div className="lrow">
                <div className="lr-top"><span className="lr-title">Reincidencia (checagem automatica)</span><Pill variant="ok">nao constatada</Pill></div>
                <div className="lr-sub">Varredura dos processos definitivos da outorga nos ultimos 3 anos · nada constatado · a multa nao dobra (Lei 7.663/1991, art. 13, ss2: reincidencia dobra a multa).</div>
              </div>
            </div>
            <Note style={{ fontSize: 12, marginTop: 12 }}><b>O sistema sugere o enquadramento; o gestor decide.</b> A sugestao e gerada a partir dos dados do apontamento de origem; tipificacao, grau e modificadores so valem depois de confirmados pelo gestor, e cada confirmacao e um ato datado na trilha.</Note>
          </Body>
        </Panel>

        {/* bloco 2: rito com prazos -- sequencia de 9 fases */}
        <Panel col={6} header={<>2 · Rito com prazos <Sp /><Pill variant="bad">recurso sem efeito suspensivo</Pill></>}>
          <Body>
            <div className="list">

              <div className="lrow">
                <div className="lr-top"><span className="lr-title">1. Detectada</span><span className="mono faint" style={{ fontSize: 11 }}>abertura do apontamento</span></div>
                <div className="lr-sub">Apontamento AP-1100-B aberto pelo sistema a partir da serie telemetrica.</div>
              </div>

              <div className="lrow">
                <div className="lr-top"><span className="lr-title">2. Notificada</span><span className="mono faint" style={{ fontSize: 11 }}>04/06</span></div>
                <div className="lr-sub">Notificacao emitida pelo gestor; encaminhamento da documentacao pelo agente credenciado em 08/06 (Decreto 63.262/2018, art. 20, II).</div>
              </div>

              <div className="lrow">
                <div className="lr-top"><span className="lr-title">3. Autuada</span><span className="mono faint" style={{ fontSize: 11 }}>05/06 16:40</span></div>
                <div className="lr-sub">Auto de infracao lavrado pelo gestor; evidencia congelada neste marco.</div>
              </div>

              <div className="lrow">
                <div className="lr-top"><span className="lr-title">4. Ciencia</span><span className="mono faint" style={{ fontSize: 11 }}>09/06 14:30</span></div>
                <div className="lr-sub">Ciencia registrada pelo outorgado; inicio da contagem do prazo de defesa.</div>
              </div>

              <div className="lrow" style={{ background: 'var(--act-soft)', margin: '0 -14px', paddingLeft: 14, paddingRight: 14 }}>
                <div className="lr-top"><span className="lr-title">5. Em defesa ou recurso</span><span className="pill warn" style={{ fontSize: 10.5 }}>fase atual</span></div>
                <div className="lr-sub">Defesa: 15 dias a partir da ciencia (Lei 10.177/1998, art. 63, III). Outorgado apresenta defesa com documentos e protocolo pelo aplicativo.</div>
              </div>

              <div className="lrow">
                <div className="lr-top"><span className="lr-title faint">6. Em julgamento (1ª instancia)</span><span className="mono faint" style={{ fontSize: 11 }}>a seguir</span></div>
                <div className="lr-sub faint">Decisao motivada em ate 20 dias (Lei 10.177/1998, art. 63, VII). Ato do gestor, registrado e datado na trilha.</div>
              </div>

              <div className="lrow">
                <div className="lr-top"><span className="lr-title faint">Em defesa ou recurso (recurso)</span><Pill variant="bad" style={{ fontSize: 10.5 }}>sem efeito suspensivo</Pill></div>
                <div className="lr-sub faint">Recurso: 15 dias (Lei 10.177/1998, art. 44). Recebido em efeito meramente devolutivo, ou seja, sem efeito suspensivo (art. 46): a penalidade segue vigente.</div>
              </div>

              <div className="lrow">
                <div className="lr-top"><span className="lr-title faint">Em julgamento (2ª instancia)</span><span className="mono faint" style={{ fontSize: 11 }}>a seguir</span></div>
                <div className="lr-sub faint">Decisao motivada em ate 20 dias (art. 63, VII). Recurso nao decidido em 120 dias pode ser tido por rejeitado (art. 50).</div>
              </div>

              <div className="lrow">
                <div className="lr-top"><span className="lr-title faint">7. Decidida</span><span className="mono faint" style={{ fontSize: 11 }}>a seguir</span></div>
                <div className="lr-sub faint">Decisao definitiva registrada; a decisao gera uma multa (<Link to="/gestor/multas">ver Multas</Link>).</div>
              </div>

              <div className="lrow">
                <div className="lr-top"><span className="lr-title faint">8. Aguardando regularizacao</span><span className="mono faint" style={{ fontSize: 11 }}>a seguir</span></div>
                <div className="lr-sub faint">Outorgado comprova a correcao da irregularidade e quita a multa; gestor verifica e registra. Pagamento isolado nao encerra o processo.</div>
              </div>

              <div className="lrow">
                <div className="lr-top"><span className="lr-title faint">9. Encerrada</span><span className="mono faint" style={{ fontSize: 11 }}>desfecho</span></div>
                <div className="lr-sub faint">Encerramento com trilha completa: multa quitada e irregularidade corrigida.</div>
              </div>

            </div>
            <Note style={{ fontSize: 12, marginTop: 12 }}>O recurso nao suspende a penalidade, que segue vigente enquanto a 2ª instancia decide (Lei 10.177/1998, art. 46). O encerramento exige multa quitada <b>e</b> irregularidade corrigida.</Note>
          </Body>
        </Panel>

        {/* bloco 3: evidencia, montada do apontamento de origem e congelada na lavratura */}
        <Panel col={5} header={<>3 · Evidencia <Sp /><Pill variant="label" className="mono">congelada em 05/06 16:40</Pill></>}>
          <Body>
            <div className="list">
              <div className="lrow">
                <div className="lr-top"><span className="lr-title">Serie telemetrica</span><span className="mono faint" style={{ fontSize: 11 }}>01/05 a 05/06</span></div>
                <div className="lr-sub">Volume diario captado x outorgado no periodo da infracao, com excedente persistente.</div>
              </div>
              <div className="lrow">
                <div className="lr-top"><span className="lr-title">Declaracoes do periodo</span><span className="mono faint" style={{ fontSize: 11 }}>mai/2026</span></div>
                <div className="lr-sub">Declaracoes vigentes e retificacoes, com protocolo e data de cadastro (estado Registrado no SiDeCC).</div>
              </div>
              <div className="lrow">
                <div className="lr-top"><span className="lr-title">Fotos da inspecao</span><span className="mono faint" style={{ fontSize: 11 }}>04/06</span></div>
                <div className="lr-sub">Registro fotografico do conjunto de bombeamento e do medidor.</div>
              </div>
              <div className="lrow">
                <div className="lr-top"><span className="lr-title">Auto de inspecao de campo</span><span className="mono faint" style={{ fontSize: 11 }}>04/06</span></div>
                <div className="lr-sub">Lavrado pelo agente credenciado na vistoria que confirmou a irregularidade.</div>
              </div>
            </div>
            <Note style={{ fontSize: 12, marginTop: 12 }}>O pacote e montado automaticamente a partir do apontamento de origem e <b>congelado na lavratura</b>: nada entra nem sai depois do marco. O pacote integro e datado e o que torna o fluxo digital defensavel frente ao de papel.</Note>
          </Body>
        </Panel>

        {/* bloco 4: penalidade -- escala estadual Lei 7.663/1991, art. 12 */}
        <Panel col={7} header={<>4 · Penalidade <Sp /><Pill variant="label">escala estadual · Lei 7.663/1991, art. 12</Pill></>}>
          <table className="table">
            <thead><tr><th>Degrau</th><th>Penalidade (Lei 7.663/1991, art. 12)</th><th>Situacao neste processo</th></tr></thead>
            <tbody>
              <tr>
                <td className="mono">I</td>
                <td>Advertencia por escrito</td>
                <td><Pill variant="label">superada · grau gravissima</Pill></td>
              </tr>
              <tr>
                <td className="mono">II</td>
                <td>Multa (100 a 1.000 UFESP, simples ou diaria)</td>
                <td><Pill variant="bad">aplicada · diaria</Pill></td>
              </tr>
              <tr>
                <td className="mono">III</td>
                <td>Intervencao administrativa</td>
                <td><Pill variant="warn">nao aplicada · prazo de correcao correndo</Pill></td>
              </tr>
              <tr>
                <td className="mono">IV</td>
                <td>Embargo definitivo · revogacao da outorga</td>
                <td><Verb pill label="Encaminhar revogacao ao SOE" variant="bad" note="O encaminhamento se da a partir do embargo definitivo; a revogacao e formalizada no Sistema de Outorga Eletronica e o novo estado entra pelo cadastro espelhado." /></td>
              </tr>
            </tbody>
          </table>
          <Body>
            <div className="list">
              <div className="lrow">
                <div className="lr-top"><span className="lr-title">Valor computado</span><Pill variant="label">base x grau x modificadores</Pill></div>
                <div className="lr-sub">Base do grau gravissima (dentro da faixa de 100 a 1.000 UFESP/dia) · agravante +20% · <b>sem dobra por reincidencia</b>. Valores ilustrativos, calculados pela regra vigente e preservados no historico do processo.</div>
              </div>
              <div className="lrow">
                <div className="lr-top"><span className="lr-title">Reincidencia</span><Pill variant="label">nao constatada</Pill></div>
                <div className="lr-sub">Reincidencia dobra o valor da multa (Lei 7.663/1991, art. 13, ss2). Varredura dos ultimos 3 anos: nenhum processo definitivo encontrado para esta outorga.</div>
              </div>
              <div className="lrow">
                <div className="lr-top"><span className="lr-title">Multa</span><Pill variant="label">ainda nao emitida</Pill></div>
                <div className="lr-sub">Emitida pelo sistema no julgamento definitivo; o gestor confirma o computo e aciona a emissao. <Link to="/gestor/multas">Acompanhar em Multas</Link>.</div>
              </div>
            </div>
            <Note style={{ fontSize: 12, marginTop: 12 }}>O embargo definitivo e o desfecho ultimo do rito e enseja a <b>revogacao por descumprimento</b>, formalizada no SOE, fora desta plataforma: o sistema registra o encaminhamento na trilha e o cadastro espelhado reflete o novo estado. Como em todo o sistema, nada se apaga; a outorga muda de estado com a trilha completa.</Note>
          </Body>
        </Panel>

        {/* verbos do gestor no processo -- simetria com a tela de apontamento */}
        <Panel col={4} header={<>Verbos do gestor <Sp /><Pill variant="label">atos do processo</Pill></>}>
          <Body>
            <Row style={{ gap: 10, flexDirection: 'column', alignItems: 'stretch' }}>
              <Verb
                label="Julgar em 1ª instancia"
                fields={['Relatorio de instrucao…', 'Decisao ▾  (manter / reduzir / extinguir)', 'Fundamentacao da decisao…']}
                note="A decisao de 1ª instancia e ato do gestor, registrado e datado. O outorgado recebe notificacao da decisao e tem 15 dias para recurso (Lei 10.177/1998, art. 44)."
                confirm="Registrar decisao de 1ª instancia"
              />
              <Verb
                label="Julgar em 2ª instancia (definitivo)"
                fields={['Recurso analisado…', 'Decisao definitiva ▾  (confirmar / reformar / extinguir)', 'Fundamentacao…']}
                note="A decisao definitiva e o marco que gera a multa (Lei 7.663/1991, art. 12, II). O gestor confirma o computo e aciona a emissao; nao digita o valor."
                confirm="Registrar decisao definitiva"
              />
              <Verb
                label="Registrar ciencia assistida"
                fields={['Data da ciencia assistida ▾', 'Justificativa (motivo de assistencia)…']}
                note="O gestor registra a data em nome do outorgado, com justificativa, quando a ciencia nao puder ser feita pelo proprio."
                confirm="Registrar ciencia"
              />
              <Verb
                label="Registrar regularizacao"
                fields={['Comprovante ou protocolo do outorgado ▾', 'Observacoes do gestor…']}
                note="O gestor verifica a comprovacao de correcao enviada pelo outorgado e registra a regularizacao, encaminhando o processo ao desfecho."
                confirm="Registrar regularizacao"
              />
              <Verb
                label="Encerrar"
                variant="sub"
                fields={['Motivacao do encerramento ▾', 'Observacoes…']}
                note="Disponivel apos multa quitada e irregularidade corrigida."
                confirm="Encerrar processo"
              />
            </Row>
            <Note style={{ fontSize: 12, marginTop: 12 }}>
              Pelo aplicativo, o outorgado toma ciencia, apresenta defesa, interpo recurso, paga e comprova a correcao. Lavrar, julgar nas duas instancias e encerrar sao atos do gestor.
            </Note>
          </Body>
        </Panel>

        {/* trilha de auditoria: DataTable com N linhas */}
        <Panel col={8} header={<>Trilha de auditoria <Sp /><Pill variant="label">quem · quando · qual ato</Pill><Link className="pill" to="/gestor/auditoria">Abrir trilha completa</Link></>}>
          <DataTable
            columns={TRILHA_COLS}
            rows={TRILHA}
            search={['dt', 'ator', 'ato']}
            searchPlaceholder="Buscar por ator, ato ou data…"
            pageSize={6}
            empty="Nenhum evento registrado."
          />
        </Panel>

      </Bento>
    </GestorShell>
  )
}
