import { Link } from 'react-router-dom'
import { DraftBanner, Phone, Notch, StatusBar, PScroll, AppBar, AppTabBar, HomeBar, PhoneLabel } from '../../components/shell.jsx'
import { Card, Pill, Btn, Note, Row } from '../../components/ui.jsx'

export default function Confirmacao() {
  return (
    <>
      <DraftBanner tag="APP · 04" title="Histórico & confirmação" />

      <div className="wrap">
        <Note style={{ maxWidth: 780, margin: '0 auto 22px' }}>
          <b>O que o histórico registra.</b> Esta aba registra, em ordem, tudo que aconteceu com o ponto: cada <b>declaração</b> (que recebe <b>protocolo</b> próprio), cada <b>apontamento</b> e cada confirmação do outorgado (ciência, justificativa, retificação). As declarações agrupam-se <b>por período</b>, uma leitura por medidor: o período fica completo quando todo medidor ativo declarou, e a completude é derivada do conjunto, ninguém a edita. Nada é apagado; ao baixar, o item fica arquivado com a trilha. À esquerda, o comprovante da declaração enviada; ao centro, o comprovante de ciência de um apontamento; à direita, a linha do tempo do ponto.
        </Note>

        <div className="phone-stage" style={{ justifyContent: 'center' }}>

          {/* RECIBO DA DECLARACAO: every declaration gets its own protocolo */}
          <div>
            <Phone>
              <Notch />
              <StatusBar right="▰▰▱ 4G ▮" />
              <PScroll>
                <div style={{ textAlign: 'center', padding: '18px 0 8px' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', border: '2px solid var(--ink)', color: 'var(--ink)', display: 'grid', placeItems: 'center', margin: '0 auto 12px', fontSize: 28 }}>✓</div>
                  <h2 style={{ fontSize: 18 }}>Declaração registrada</h2>
                  <p className="muted" style={{ fontSize: 13, margin: '6px 0 0' }}>Cada declaração recebe protocolo próprio. Guarde o comprovante.</p>
                </div>

                <Card style={{ padding: 14 }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <b style={{ fontSize: 13, color: 'var(--ink)' }}>Leitura de rotina</b>
                    <Pill variant="ok">Recebida</Pill>
                  </Row>
                  <Row style={{ gap: 6, marginTop: 6, alignItems: 'center' }}>
                    <Pill variant="label" style={{ fontSize: 10.5 }}>Protocolo DCL-07-2026-045112</Pill>
                  </Row>
                  <hr className="div" style={{ margin: '12px 0' }} />
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12.5 }}>Outorga</span><span className="mono" style={{ fontSize: 12.5, color: 'var(--ink)' }}>OUT-07-2025-008842</span></div>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12.5 }}>Medidor</span><span className="mono" style={{ fontSize: 12.5 }}>série H-44107</span></div>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12.5 }}>Leitura</span><span className="mono" style={{ fontSize: 12.5 }}>001 938 m³</span></div>
                  {/* two distinct timestamps: when the dial was read vs when the record entered the system */}
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12.5 }}>Data/hora da leitura</span><span className="mono" style={{ fontSize: 12.5 }}>04/06 · 16:40</span></div>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12.5 }}>Data/hora do cadastro</span><span className="mono" style={{ fontSize: 12.5, color: 'var(--ink)' }}>04/06 · 18:05</span></div>
                </Card>

                <Btn block lg style={{ marginTop: 14 }}>Imprimir comprovante (PDF)</Btn>
                <Btn block sub to="/app/autodeclaracao" style={{ marginTop: 8 }}>Cancelar e refazer · disponível até o fim do dia</Btn>

                {/* declarations grouped by period: one reading per medidor; completeness is derived */}
                <div style={{ marginTop: 16 }}>
                  <div className="eyebrow" style={{ marginBottom: 6 }}>Declarações por período</div>

                  <Card style={{ padding: '4px 12px' }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', padding: '8px 0 2px' }}>
                      <b style={{ fontSize: 12.5, color: 'var(--ink)' }}>maio/2026</b>
                      <Pill variant="ok">completa · 2 de 2</Pill>
                    </Row>
                    <div className="mrow"><span className="mono" style={{ fontSize: 11.5, color: 'var(--ink)', flex: 'none' }}>H-99281</span><div className="msp muted" style={{ fontSize: 11 }}>004 281 m³ · 02/06</div><span className="mono faint" style={{ fontSize: 10.5 }}>DCL-07-2026-044871</span></div>
                    <div className="mrow"><span className="mono" style={{ fontSize: 11.5, color: 'var(--ink)', flex: 'none' }}>H-44107</span><div className="msp muted" style={{ fontSize: 11 }}>001 938 m³ · 04/06</div><span className="mono faint" style={{ fontSize: 10.5 }}>DCL-07-2026-045112</span></div>
                  </Card>

                  <Card style={{ padding: '4px 12px', marginTop: 10 }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', padding: '8px 0 2px' }}>
                      <b style={{ fontSize: 12.5, color: 'var(--ink)' }}>abril/2026</b>
                      <Pill variant="ok">completa · 2 de 2</Pill>
                    </Row>
                    <div className="mrow"><span className="mono" style={{ fontSize: 11.5, color: 'var(--ink)', flex: 'none' }}>H-99281</span><div className="msp muted" style={{ fontSize: 11 }}>004 116 m³ · 05/05</div><span className="mono faint" style={{ fontSize: 10.5 }}>DCL-07-2026-038412</span></div>
                    <div className="mrow"><span className="mono" style={{ fontSize: 11.5, color: 'var(--ink)', flex: 'none' }}>H-44107</span><div className="msp muted" style={{ fontSize: 11 }}>001 893 m³ · 05/05</div><span className="mono faint" style={{ fontSize: 10.5 }}>DCL-07-2026-038413</span></div>
                  </Card>

                  <div className="muted" style={{ fontSize: 11, marginTop: 8 }}>Uma leitura por medidor ativo; o período fica completo quando todas chegam.</div>
                </div>
              </PScroll>
              <AppTabBar active="captacao" />
              <HomeBar />
            </Phone>
            <PhoneLabel>Comprovante · protocolo por declaração · período por medidor</PhoneLabel>
            <Note style={{ marginTop: 14, fontSize: 12, maxWidth: 300 }}>As duas datas são distintas: a da <b>leitura</b> é o momento em que o mostrador foi lido; a do <b>cadastro</b>, o registro no sistema (no modo offline elas divergem). O <b>cancelamento no mesmo dia substitui</b> a declaração mantendo o histórico: a anterior fica gravada como cancelada e a nova recebe outro protocolo. Depois do dia, só a retificação corrige.</Note>
          </div>

          {/* COMPROVANTE: o outorgado tomou ciência de um apontamento */}
          <div>
            <Phone>
              <Notch />
              <StatusBar right="▰▰▱ 4G ▮" />
              <PScroll>
                <div style={{ textAlign: 'center', padding: '18px 0 8px' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', border: '2px solid var(--ink)', color: 'var(--ink)', display: 'grid', placeItems: 'center', margin: '0 auto 12px', fontSize: 28 }}>✓</div>
                  <h2 style={{ fontSize: 18 }}>Ciência registrada</h2>
                  <p className="muted" style={{ fontSize: 13, margin: '6px 0 0' }}>A partir de agora começa a contagem do prazo. Acompanhe no histórico.</p>
                </div>

                <Card style={{ padding: 14 }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <b style={{ fontSize: 13, color: 'var(--ink)' }}>Pico de vazão acima do teto</b>
                    <Pill variant="warn">Notificada</Pill>
                  </Row>
                  <Row style={{ gap: 6, marginTop: 6, alignItems: 'center' }}>
                    <Pill variant="label" style={{ fontSize: 10.5 }}>Exceção · grau média</Pill>
                    <Pill variant="label" style={{ fontSize: 10.5 }}>Volume</Pill>
                  </Row>
                  <hr className="div" style={{ margin: '12px 0' }} />
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12.5 }}>Ponto</span><span className="mono" style={{ fontSize: 12.5, color: 'var(--ink)' }}>07-1001</span></div>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12.5 }}>Limite</span><span className="mono" style={{ fontSize: 12.5 }}>45 L/s</span></div>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12.5 }}>Medido</span><span className="mono" style={{ fontSize: 12.5 }}>pico 53 L/s · 118%</span></div>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12.5 }}>Ciência em</span><span className="mono" style={{ fontSize: 12.5 }}>05/06 · 09:41</span></div>
                  <div className="mrow"><span className="msp muted" style={{ fontSize: 12.5 }}>Prazo</span><span className="mono" style={{ fontSize: 12.5, color: 'var(--ink)' }}>justificar até 25/06</span></div>
                </Card>

                <Btn block lg to="/app/apontamento" style={{ marginTop: 14 }}>Justificar agora →</Btn>
                <Btn block sub style={{ marginTop: 8 }}>Ver comprovante (PDF)</Btn>
              </PScroll>
              <AppTabBar />
              <HomeBar />
            </Phone>
            <PhoneLabel>Comprovante · ciência de um apontamento</PhoneLabel>
            <Note style={{ marginTop: 14, fontSize: 12, maxWidth: 300 }}>A próxima ação é do outorgado: <b>justificar o pico ou comprovar correção</b>. O comprovante registra apenas a ciência; quem encerra o apontamento é sempre o gestor.</Note>
          </div>

          {/* HISTÓRICO: linha do tempo dos apontamentos do ponto */}
          <div>
            <Phone>
              <Notch />
              <StatusBar right="▰▰▰ 5G ▮" />
              <PScroll>
                <AppBar title="Histórico" back />
                <div className="muted" style={{ fontSize: 12, margin: '-6px 0 12px' }}>Indústria Cubatão S/A · ponto 07-1001</div>

                {/* ação pendente em destaque */}
                <Card style={{ padding: 12, borderColor: 'var(--warn)', marginBottom: 14 }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}><b style={{ fontSize: 13, color: 'var(--ink)' }}>Justificativa pendente</b><Pill variant="warn">faltam 18 dias</Pill></Row>
                  <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>Pico de vazão · justificar até 25/06</div>
                  <Btn block to="/app/apontamento" style={{ marginTop: 10 }}>Abrir apontamento</Btn>
                </Card>

                {/* apontamentos do ponto (cada um leva ao detalhe) */}
                <div className="eyebrow" style={{ marginBottom: 6 }}>Apontamentos</div>

                <Link className="mrow" to="/app/apontamento" style={{ textDecoration: 'none' }}>
                  <span className="ico"><i className="mk warn" /></span>
                  <div className="msp">
                    <b style={{ fontSize: 13, color: 'var(--ink)' }}>Pico de vazão acima do teto</b>
                    <div className="muted" style={{ fontSize: 11.5 }}>Exceção · Volume · grau média · <b style={{ color: 'var(--ink)' }}>Notificada</b></div>
                    <div className="faint" style={{ fontSize: 11 }}>desde 04/06 · ciência 05/06 · 53 L/s (teto 45)</div>
                  </div>
                  <span className="faint">›</span>
                </Link>

                <div className="mrow">
                  <span className="ico"><i className="mk ok" /></span>
                  <div className="msp">
                    <b style={{ fontSize: 13, color: 'var(--ink)' }}>Volume anual em risco</b>
                    <div className="muted" style={{ fontSize: 11.5 }}>Sinal de gestão · Volume · <b style={{ color: 'var(--ink)' }}>sem fase</b></div>
                    <div className="faint" style={{ fontSize: 11 }}>desde jun · 58% · projeção 116% · baixa automática se o ritmo baixar</div>
                  </div>
                  <span className="faint">›</span>
                </div>

                <Link className="mrow" to="/app/apontamento" style={{ textDecoration: 'none' }}>
                  <span className="ico"><i className="mk ok" /></span>
                  <div className="msp">
                    <b style={{ fontSize: 13, color: 'var(--ink)' }}>Amostra isolada ausente</b>
                    <div className="muted" style={{ fontSize: 11.5 }}>Exceção · Qualidade do dado · grau leve · <b style={{ color: 'var(--ink)' }}>Encerrada</b></div>
                    <div className="faint" style={{ fontSize: 11 }}>03/06 · 1 lacuna · já retificada</div>
                  </div>
                  <span className="faint">›</span>
                </Link>

                {/* trilha de confirmações do outorgado */}
                <div className="eyebrow" style={{ margin: '16px 0 6px' }}>Confirmações enviadas</div>

                <div className="mrow"><span className="ico">✓</span><div className="msp"><b style={{ fontSize: 13, color: 'var(--ink)' }}>Ciência do pico de vazão</b><div className="muted" style={{ fontSize: 11.5 }}>05/06 · 09:41</div></div><span className="faint">›</span></div>
                <div className="mrow"><span className="ico">✓</span><div className="msp"><b style={{ fontSize: 13, color: 'var(--ink)' }}>Retificação da amostra ausente</b><div className="muted" style={{ fontSize: 11.5 }}>03/06 · 15:35</div></div><span className="faint">›</span></div>
              </PScroll>
              <AppTabBar />
              <HomeBar />
            </Phone>
            <PhoneLabel>Linha do tempo dos apontamentos</PhoneLabel>
            <Note style={{ marginTop: 14, fontSize: 12, maxWidth: 300 }}>A linha do tempo nunca é apagada. Cada item guarda data, autor e anexos; ao baixar, o apontamento fica arquivado com a trilha completa. Os tipos separam o <b>sinal de gestão</b> (tem baixa automática quando o ritmo baixa) da <b>exceção</b> (aguarda justificativa em prazo); só o ato administrativo, quando há, segue rito próprio.</Note>
          </div>

        </div>
      </div>
    </>
  )
}
