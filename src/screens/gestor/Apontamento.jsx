import { Link } from 'react-router-dom'
import { GestorShell } from '../../components/shell.jsx'
import { Bento, Card, Panel, Body, Note, Pill, Btn, Verb, Row, Grid, Sp, DataTable } from '../../components/ui.jsx'

// Apontamento AP-1001-A: pico de vazão acima do teto.
// Natureza: exceção detectada. Tipo: volume. Grau: leve (não "média"; "média" é
// da norma federal ANA e não rege a outorga estadual -- Lei 7.663/1991, art. 13
// classifica em leve · grave · gravíssima).
// Fase: 9 passos do modelo de domínio (Fundamentação §4), ancorados na Lei
// 10.177/1998. O apontamento cobre da Detectada à Encerrada; defesa, recurso e
// julgamento correm no processo vinculado se o gestor lavrar o auto.

const top = (
  <>
    <div className="crumb">
      <Link to="/gestor/pontos">Pontos</Link> / <Link to="/gestor/pontos">Indústria Cubatão S/A</Link> / <Link to="/gestor/detalhe">07-1001</Link> / <b style={{ color: 'var(--ink)' }}>protocolo AP-1001-A</b>
    </div>
    <span className="sp" />
    <Pill variant="warn">Exceção detectada · grau leve</Pill>
    <Pill variant="label">fase Notificada</Pill>
    <Btn sub to="/gestor/auditoria" style={{ padding: '6px 12px' }}>Ver trilha</Btn>
  </>
)

// Trilha de auditoria: instâncias reais de atos, não rótulos fixos.
// Fonte: SiDeCC -- quem · quando · qual ato.
const TRILHA = [
  { id: 1, dt: '04/06 08:20', ator: 'Sistema', ato: 'Exceção detectada -- pico 53 L/s excede teto 45 L/s (reconciliação telemetria x outorga)' },
  { id: 2, dt: '04/06 10:05', ator: 'Gestor · R. Alves', ato: 'Notificação emitida (pedindo justificativa)' },
  { id: 3, dt: '05/06 14:12', ator: 'Outorgado', ato: 'Ciência registrada (início da contagem do prazo de defesa: 15 dias)' },
  { id: 4, dt: '06/06 09:40', ator: 'Outorgado', ato: 'Documento anexado (relatório de bombeamento)' },
]

const TRILHA_COLS = [
  { key: 'dt', label: 'Data / hora', cls: 'mono' },
  { key: 'ator', label: 'Ator' },
  { key: 'ato', label: 'Ato registrado' },
]

export default function Apontamento() {
  return (
    <GestorShell tag="GESTOR · 06" title="Apontamento (gestor)" active="apontamentos" top={top}>
      <Bento>

        {/* Identidade do apontamento: cada campo carrega uma dimensão (Principio A) */}
        <Card col={12}>
          <Row style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="eyebrow">Apontamento · protocolo AP-1001-A</div>
              <h1 style={{ marginTop: 6 }}>Pico de vazão acima do teto</h1>
              <div className="muted" style={{ marginTop: 4 }}>Indústria Cubatão S/A · ponto 07-1001 · Rio Cubatão</div>
            </div>
            <Row style={{ gap: 8 }}>
              <Pill variant="label">Volume</Pill>
              <Pill variant="warn">grau leve</Pill>
            </Row>
          </Row>
          <hr className="div" />
          {/* campos: natureza · tipo · grau · limite outorgado · medido · detectado/notificado/ciência · prazo · dono */}
          <Grid cols={4}>
            <div>
              <div className="muted" style={{ fontSize: 11 }}>Natureza</div>
              <div className="mono" style={{ color: 'var(--ink)' }}>Exceção detectada</div>
            </div>
            <div>
              <div className="muted" style={{ fontSize: 11 }}>Tipo</div>
              <div className="mono" style={{ color: 'var(--ink)' }}>Volume</div>
            </div>
            <div>
              <div className="muted" style={{ fontSize: 11 }}>Grau</div>
              <div className="mono" style={{ color: 'var(--ink)' }}>leve (Lei 7.663/1991, art. 13)</div>
            </div>
            <div>
              <div className="muted" style={{ fontSize: 11 }}>Limite outorgado</div>
              <div className="mono" style={{ color: 'var(--ink)' }}>45 L/s (instantânea)</div>
            </div>
            <div>
              <div className="muted" style={{ fontSize: 11 }}>Medido</div>
              <div className="mono" style={{ color: 'var(--ink)' }}>pico 53 L/s (118% do teto)</div>
            </div>
            <div>
              <div className="muted" style={{ fontSize: 11 }}>Detectado em</div>
              <div className="mono" style={{ color: 'var(--ink)' }}>04/06 08:20</div>
            </div>
            <div>
              <div className="muted" style={{ fontSize: 11 }}>Notificado em</div>
              <div className="mono" style={{ color: 'var(--ink)' }}>04/06</div>
            </div>
            <div>
              <div className="muted" style={{ fontSize: 11 }}>Ciência em</div>
              <div className="mono" style={{ color: 'var(--ink)' }}>05/06</div>
            </div>
            <div>
              <div className="muted" style={{ fontSize: 11 }}>Prazo de defesa</div>
              <div className="mono" style={{ color: 'var(--ink)' }}>15 dias a partir da ciência (Lei 10.177/1998, art. 63, III)</div>
            </div>
            <div>
              <div className="muted" style={{ fontSize: 11 }}>Dono da proxima acao</div>
              <div className="mono" style={{ color: 'var(--ink)' }}>outorgado</div>
            </div>
          </Grid>
        </Card>

        <Note col={12} style={{ fontSize: 12.5 }}>
          O apontamento cobre detecção, notificação, ciência e acompanhamento da regularização. Lavrar o auto de infração cria um processo vinculado (GESTOR · 09) com número e rito próprios; o apontamento permanece como objeto de detecção e triagem.
        </Note>

        {/* Linha do tempo: 9 fases do modelo de domínio (Fundamentação §4).
            Defesa/recurso/julgamento correm no processo vinculado se houver auto. */}
        <Panel col={8} header={<>Linha do tempo das fases <Sp /><Pill variant="label">9 fases · Fundamentação §4</Pill></>}>
          <Body>
            <div className="list">

              <div className="lrow">
                <div className="lr-top">
                  <span className="lr-title">Detectada</span>
                  <span className="mono faint" style={{ fontSize: 11 }}>04/06 08:20</span>
                </div>
                <div className="lr-sub">Reconciliação telemetria x outorga abriu a exceção (pico 53 L/s acima do teto de 45 L/s).</div>
              </div>

              <div className="lrow" style={{ background: 'var(--act-soft)', margin: '0 -14px', paddingLeft: 14, paddingRight: 14 }}>
                <div className="lr-top">
                  <span className="lr-title">Notificada</span>
                  <span className="pill warn" style={{ fontSize: 10.5 }}>fase atual</span>
                </div>
                <div className="lr-sub">Notificação emitida em 04/06; outorgado tomou ciência em 05/06. Contagem de prazo de defesa iniciada: 15 dias (Lei 10.177/1998, art. 63, III).</div>
              </div>

              <div className="lrow">
                <div className="lr-top">
                  <span className="lr-title faint">Autuada</span>
                  <span className="mono faint" style={{ fontSize: 11 }}>a seguir, se cabivel</span>
                </div>
                <div className="lr-sub faint">Auto de infração lavrado pelo gestor, caso a justificativa seja insuficiente ou haja recusa. Gera o processo vinculado (PAS-...).</div>
              </div>

              <div className="lrow">
                <div className="lr-top">
                  <span className="lr-title faint">Ciencia</span>
                  <span className="mono faint" style={{ fontSize: 11 }}>marco do prazo</span>
                </div>
                <div className="lr-sub faint">Ciência registrada pelo outorgado ou pelo gestor (assistida); data inicia a contagem no processo vinculado.</div>
              </div>

              <div className="lrow">
                <div className="lr-top">
                  <span className="lr-title faint">Em defesa ou recurso</span>
                  <Pill variant="label" style={{ fontSize: 10.5 }}>no processo vinculado</Pill>
                </div>
                <div className="lr-sub faint">Corre no processo sancionador (PAS-...), com prazo de 15 dias para defesa e 15 dias para recurso (Lei 10.177/1998, arts. 44 e 63, III). Recurso sem efeito suspensivo (art. 46).</div>
              </div>

              <div className="lrow">
                <div className="lr-top">
                  <span className="lr-title faint">Em julgamento</span>
                  <Pill variant="label" style={{ fontSize: 10.5 }}>no processo vinculado</Pill>
                </div>
                <div className="lr-sub faint">Decisão motivada em até 20 dias (Lei 10.177/1998, art. 63, VII). Ato do gestor, registrado e datado no processo. <Link to="/gestor/processo">Ver processo vinculado</Link>.</div>
              </div>

              <div className="lrow">
                <div className="lr-top">
                  <span className="lr-title faint">Decidida</span>
                  <span className="mono faint" style={{ fontSize: 11 }}>a seguir</span>
                </div>
                <div className="lr-sub faint">Decisão definitiva registrada; guia de multa emitida se cabivel. O apontamento aguarda comprovação de correção.</div>
              </div>

              <div className="lrow">
                <div className="lr-top">
                  <span className="lr-title faint">Aguardando regularizacao</span>
                  <span className="mono faint" style={{ fontSize: 11 }}>a seguir</span>
                </div>
                <div className="lr-sub faint">Outorgado comprova a correção da irregularidade; gestor verifica e registra.</div>
              </div>

              <div className="lrow">
                <div className="lr-top">
                  <span className="lr-title faint">Encerrada</span>
                  <span className="mono faint" style={{ fontSize: 11 }}>desfecho</span>
                </div>
                <div className="lr-sub faint">Encerramento do apontamento, com trilha completa.</div>
              </div>

            </div>
          </Body>
          <Note style={{ fontSize: 12, margin: 14 }}>As fases Em defesa ou recurso e Em julgamento correm no processo vinculado (PAS-...), com numero, linha do tempo e prazos proprios. O apontamento permanece como objeto de detecção, triagem e acompanhamento da regularização; cada objeto se referencia ao outro.</Note>
        </Panel>

        {/* Verbos do gestor: assimetria de poderes.
            O outorgado so tem: tomar ciência, justificar, anexar, comprovar.
            Os verbos de disposição sao exclusivos do gestor. */}
        <Panel col={4} header={<>Verbos do gestor <Sp /><Pill variant="label">disposicao</Pill></>}>
          <Body>
            <Row style={{ gap: 10, flexDirection: 'column', alignItems: 'stretch' }}>
              <Verb
                label="Notificar"
                fields={['Texto da notificação…', 'Prazo para resposta (dias) ▾']}
                note="A notificação emitida pelo gestor abre o prazo para justificativa do outorgado e fica gravada na trilha com data e autoria."
                confirm="Emitir notificação"
              />
              <Verb
                label="Analisar justificativa"
                fields={['Protocolo da justificativa ▾', 'Parecer do gestor…', 'Decisao ▾  (aceitar / rejeitar / solicitar complemento)']}
                note="A análise é ato datado. Aceitar encaminha ao passo de regularização; rejeitar pode levar à lavratura do auto."
                confirm="Registrar análise"
              />
              <Verb
                label="Lavrar auto de infração"
                fields={['Tipificação legal (art.) ▾', 'Grau confirmado ▾  (leve / grave / gravíssima)', 'Fundamentação do auto…']}
                note="Lavrar cria o processo vinculado (PAS-...) com número, evidência congelada e rito próprio. O apontamento passa a exibir o vínculo."
                confirm="Lavrar e criar processo"
              />
              <Verb
                label="Registrar ciência assistida"
                fields={['Data da ciência assistida ▾', 'Justificativa (motivo de assistência)…']}
                note="Ciência assistida: o gestor registra a data em nome do outorgado, com justificativa, quando a ciência não puder ser feita pelo próprio."
                confirm="Registrar ciência"
              />
              <Verb
                label="Registrar regularização"
                fields={['Comprovante ou protocolo do outorgado ▾', 'Observações do gestor…']}
                note="O gestor verifica a comprovação enviada pelo outorgado e registra a regularização, encaminhando o apontamento ao desfecho."
                confirm="Registrar regularização"
              />
              <Verb
                label="Encerrar"
                variant="sub"
                fields={['Motivação do encerramento ▾', 'Observações…']}
                note="Disponível após regularização confirmada ou decisão definitiva."
                confirm="Encerrar apontamento"
              />
            </Row>
            <Note style={{ fontSize: 12, marginTop: 12 }}>
              Os poderes sao assimétricos: o aplicativo do outorgado oferece tomar ciência, justificar, anexar e comprovar. Os verbos de disposição existem apenas aqui, e cada um gera um registro datado na trilha. <b>Lavrar auto de infração cria um processo vinculado</b> (GESTOR · 09), com numero, linha do tempo, prazos e julgamento próprios.
            </Note>
          </Body>
        </Panel>

        {/* Trilha de auditoria: DataTable com N linhas, busca, paginação */}
        <Panel col={12} header={<>Trilha de auditoria <Sp /><Pill variant="label">quem · quando · qual ato</Pill><Link className="pill" to="/gestor/auditoria">Abrir trilha completa</Link></>}>
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
