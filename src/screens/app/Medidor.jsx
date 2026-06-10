import { DraftBanner, Phone, Notch, StatusBar, PScroll, AppBar, AppTabBar, HomeBar, PhoneLabel } from '../../components/shell.jsx'
import { Card, Pill, Btn, Note, Panel, Body, Row, Sp } from '../../components/ui.jsx'

export default function Medidor() {
  return (
    <>
      <DraftBanner tag="APP · 10" title="Medidor · cadastro e ciclo de vida" right="Cadastro pelo outorgado · protocolado como solicitação" />

      <div className="wrap">
        <Note style={{ maxWidth: 760, margin: '0 auto 22px' }}>
          <b>O parque de medidores da captação, mantido pelo próprio outorgado.</b> Uma captação pode ter <b>mais de um medidor</b>, cada qual com tipo, unidade de medida, número de série, fabricante, modelo, diâmetro (DN) e as próprias datas de <b>inclusão</b> e <b>desativação</b>. A leitura é declarada <b>por equipamento</b> (APP · 05), por isso o cadastro precisa existir antes da primeira declaração de cada aparelho. O cadastro, a troca e a desativação entram como <b>solicitação</b>: o outorgado protocola, o gestor confere e defere, e cada despacho fica datado na trilha.
        </Note>

        <div className="phone-stage" style={{ justifyContent: 'center' }}>

          {/* PHONE 1: the equipment registry of one captacao, with lifecycle states and verbs */}
          <div>
            <Phone>
              <Notch />
              <StatusBar right="▰▰▰ 5G ▮" />
              <PScroll>
                <AppBar title="Medidores" back="/app/solicitacoes" />

                <Card style={{ padding: 14 }}>
                  <div className="muted" style={{ fontSize: 12 }}>Outorga · captação</div>
                  <div className="mono" style={{ fontSize: 13, color: 'var(--ink)' }}>OUT-07-2025-008842 · Sítio Boa Vista</div>
                </Card>

                <Btn block style={{ marginTop: 14 }}>+ Cadastrar medidor</Btn>

                {/* one captacao, more than one medidor; each row carries its own lifecycle dates */}
                <Panel style={{ marginTop: 14 }} header={<>Medidores desta captação <Sp /><Pill variant="label">2 ativos · 1 desativado</Pill></>}>
                  <Body>
                    <div className="list">

                      <div className="lrow">
                        <div className="lr-top"><span className="lr-title mono">H-99281 · DN 50</span><Pill variant="ok">ativo</Pill></div>
                        <div className="lr-sub">Hidrômetro · Hidromedição Brasil · WS-50 Woltmann · m³</div>
                        <div className="lr-sub">Incluído em 14/03/2025 · em uso na leitura de rotina</div>
                        <Row style={{ gap: 8, marginTop: 8 }}>
                          <Btn block sub>Trocar</Btn>
                          <Btn block sub>Desativar</Btn>
                        </Row>
                      </div>

                      <div className="lrow">
                        <div className="lr-top"><span className="lr-title mono">H-44107 · DN 25</span><Pill variant="ok">ativo</Pill></div>
                        <div className="lr-sub">Hidrômetro · Medix · MJ-25 multijato · m³</div>
                        <div className="lr-sub">Incluído em 02/08/2025 · em uso na leitura de rotina</div>
                        <Row style={{ gap: 8, marginTop: 8 }}>
                          <Btn block sub>Trocar</Btn>
                          <Btn block sub>Desativar</Btn>
                        </Row>
                      </div>

                      {/* deactivation never deletes: the device keeps its dates and reading history */}
                      <div className="lrow">
                        <div className="lr-top"><span className="lr-title mono faint">H-29553 · DN 32</span><Pill variant="label">desativado</Pill></div>
                        <div className="lr-sub faint">Hidrômetro · Medix · M-32 · m³</div>
                        <div className="lr-sub faint">Incluído em 10/01/2019 · desativado em 14/03/2025 · leitura de remoção registrada</div>
                        <div className="lr-sub faint">Histórico de leituras preservado</div>
                      </div>

                    </div>
                  </Body>
                </Panel>

                {/* the swap pair: typed readings already available in APP · 05 */}
                <Card style={{ marginTop: 14, padding: 12 }}>
                  <b style={{ fontSize: 13, color: 'var(--ink)' }}>Como funciona a troca</b>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12 }}>Medidor que sai</span><span className="mono" style={{ fontSize: 12 }}>leitura de remoção + data de desativação</span></div>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12 }}>Medidor que entra</span><span className="mono" style={{ fontSize: 12 }}>leitura de reinstalação + data de inclusão</span></div>
                  <div className="muted" style={{ fontSize: 11, marginTop: 6 }}>Os dois tipos de leitura já existem na autodeclaração (APP · 05); a série de volumes segue contínua, sem falso retrocesso.</div>
                </Card>
              </PScroll>
              <AppTabBar active="inicio" />
              <HomeBar />
            </Phone>
            <PhoneLabel>Medidores da captação · estados, datas e verbos do ciclo de vida</PhoneLabel>

            <Note style={{ maxWidth: 340, margin: '16px auto 0', fontSize: 12 }}>
              Mais de um medidor por captação é a regra, não a exceção, e a leitura é declarada <b>por equipamento</b>. Desativar <b>não apaga</b>: o medidor muda de estado e preserva as datas e o histórico de leituras, que continuam alimentando a reconciliação dos períodos em que esteve ativo.
            </Note>
          </div>

          {/* PHONE 2: the cadastro form; sidecc equipment fields + installation proof */}
          <div>
            <Phone>
              <Notch />
              <StatusBar right="▰▰▰ 5G ▮" />
              <PScroll>
                <AppBar title="Cadastrar medidor" back />

                <Card style={{ padding: 14 }}>
                  <div className="muted" style={{ fontSize: 12 }}>Outorga · captação</div>
                  <div className="mono" style={{ fontSize: 13, color: 'var(--ink)' }}>OUT-07-2025-008842 · Sítio Boa Vista</div>
                </Card>

                <div className="stack" style={{ marginTop: 14 }}>
                  <label className="field"><span>Tipo</span>
                    <div className="input"><span style={{ color: 'var(--ink)' }}>Hidrômetro · medição direta</span><span className="sp" style={{ flex: 1 }} />▾</div></label>
                  <label className="field"><span>Unidade de medida</span>
                    <div className="input"><span style={{ color: 'var(--ink)' }}>m³</span><span className="sp" style={{ flex: 1 }} />▾</div></label>
                  <label className="field"><span>Número de série</span>
                    <div className="input mono" style={{ color: 'var(--ink)' }}>H-30412</div></label>
                  <label className="field"><span>Fabricante</span>
                    <div className="input" style={{ color: 'var(--ink)' }}>Medix</div></label>
                  <label className="field"><span>Modelo</span>
                    <div className="input mono" style={{ color: 'var(--ink)' }}>MJ-25 multijato</div></label>
                  <label className="field"><span>Diâmetro nominal (DN, mm)</span>
                    <div className="input mono" style={{ color: 'var(--ink)' }}>25</div></label>
                  <label className="field"><span>Data de instalação</span>
                    <div className="input"><span className="mono" style={{ color: 'var(--ink)' }}>10/06/2026</span><span className="sp" style={{ flex: 1 }} />📅</div></label>
                  <label className="field"><span>Leitura inicial (m³)</span>
                    <div className="input mono" style={{ color: 'var(--ink)', fontSize: 16 }}>000 012,___</div></label>

                  {/* installation photo, required: mirrors the comprovacao idiom of APP · 05 */}
                  <div className="field"><span>Foto da instalação (obrigatória)</span>
                    <div className="row" style={{ gap: 10 }}>
                      <div className="card ph ph--img" style={{ flex: 1, minHeight: 96 }}>📷 Toque para<br />fotografar</div>
                      <div className="card ph ph--img" style={{ flex: 1, minHeight: 96 }}>Pré-visualização<br />da foto</div>
                    </div>
                    <div className="muted" style={{ fontSize: 11, marginTop: 4 }}>Mostre o mostrador com a leitura inicial e o número de série legível.</div>
                  </div>
                </div>

                {/* it is a request, not a self-service write: the gestor confers and grants */}
                <Card style={{ marginTop: 14, padding: 12 }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <b style={{ fontSize: 13, color: 'var(--ink)' }}>Entra como solicitação</b>
                    <Pill variant="label">gestor confere e defere</Pill>
                  </Row>
                  <div className="muted" style={{ fontSize: 11, marginTop: 4 }}>O medidor só passa a valer para a declaração após o deferimento; o protocolo e cada despacho ficam datados na trilha.</div>
                </Card>

                <Btn block lg style={{ marginTop: 14 }}>Protocolar cadastro →</Btn>
              </PScroll>
              <AppTabBar active="inicio" />
              <HomeBar />
            </Phone>
            <PhoneLabel>Cadastro do equipamento · campos do medidor + foto da instalação</PhoneLabel>

            <Note style={{ maxWidth: 340, margin: '16px auto 0', fontSize: 12 }}>
              O cadastro não é escrita direta no ponto: o outorgado <b>protocola</b> e o gestor <b>confere e defere</b> na fila de solicitações (GESTOR · 07), com cada despacho datado na trilha. A foto da instalação espelha a comprovação da autodeclaração (APP · 05) e amarra o número de série à leitura inicial.
            </Note>
          </div>

        </div>

        <Note style={{ maxWidth: 760, margin: '22px auto 0' }}>
          A troca registra um par de leituras tipadas: o medidor que sai recebe a <b>leitura de remoção</b> e a data de desativação; o que entra, a <b>leitura de reinstalação</b> e a data de inclusão. É esse par que mantém a série de volumes contínua e auditável, sem que a queda do valor lido entre um aparelho e outro dispare falso retrocesso.
        </Note>

        <Note style={{ maxWidth: 760, margin: '14px auto 0' }}>
          A desativação nunca apaga o equipamento: ele muda de estado e preserva datas e histórico de leituras. Sem medidor ativo, o ponto declara por <b>medição alternativa (volume)</b> até que um novo equipamento seja cadastrado e deferido. Os dias entre remoção e reinstalação são imputados pela regra do volume máximo diário (ver Relatórios), o que torna a janela da troca curta por interesse do próprio outorgado.
        </Note>
      </div>
    </>
  )
}
