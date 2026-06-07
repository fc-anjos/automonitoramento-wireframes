import { Link } from 'react-router-dom'
import { DraftBanner, Phone, Notch, StatusBar, PScroll, AppBar, AppTabBar, HomeBar, PhoneLabel } from '../../components/shell.jsx'
import { Card, Pill, Note, Panel, Body, Row, Sp } from '../../components/ui.jsx'

export default function Apontamentos() {
  return (
    <>
      <DraftBanner tag="APP · 04" title="Meus apontamentos (visão do outorgado)" right="Grandes usuários · Faixa A" />

      <div className="wrap">
        <Note style={{ maxWidth: 760, margin: '0 auto 22px' }}>
          <b>A lista do outorgado.</b> Reúne os achados sobre o ponto deste usuário, cada um com seu tom e a próxima ação. Os três não têm a mesma natureza: o pico de vazão é uma <b>exceção</b> (o sistema detectou e pede justificativa em prazo, sem presumir infração); o orçamento anual é um <b>sinal de gestão</b> (nada foi excedido, é um aviso para reduzir o ritmo, e por isso não tem grau); a amostra ausente já foi encerrada. Cada linha abre o detalhe, onde o outorgado responde, sem nunca dar baixa.
        </Note>

        <div className="phone-stage" style={{ justifyContent: 'center' }}>
          <div>
            <Phone>
              <Notch />
              <StatusBar right="▰▰▰ 5G ▮" />
              <PScroll>
                <AppBar title="Apontamentos" back="/app/painel" />

                <Card style={{ padding: '12px 14px' }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span className="eyebrow">Ponto 07-1001</span>
                    <span className="mono faint" style={{ fontSize: 11 }}>Indústria Cubatão S/A</span>
                  </Row>
                  <Row style={{ gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                    <Pill variant="warn">1 a justificar</Pill>
                    <Pill variant="label">1 sinal de gestão</Pill>
                    <Pill variant="ok">1 encerrada</Pill>
                  </Row>
                </Card>

                {/* LISTA dos apontamentos do usuário */}
                <Panel style={{ marginTop: 14 }} header={<>Sobre o seu ponto <Sp /><Pill variant="label">3</Pill></>}>
                  <Body>
                    <div className="list">

                      {/* Exceção · pico de vazão · pede justificativa */}
                      <Link className="lrow" to="/app/apontamento" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                        <div className="lr-top">
                          <span className="lr-title">Pico de vazão acima do teto</span>
                          <span className="pill warn">justifique até 25/06</span>
                        </div>
                        <div className="lr-sub">
                          <span className="pill label" style={{ padding: '0 7px', fontSize: 10.5 }}>Exceção</span>
                          <span style={{ marginLeft: 6 }}>Volume · grau média · fase Notificada · pico 53 L/s (teto 45)</span>
                        </div>
                      </Link>

                      {/* Sinal de gestão · volume anual · sem grau */}
                      <Link className="lrow" to="/app/apontamento" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                        <div className="lr-top">
                          <span className="lr-title">Volume anual em risco</span>
                          <span className="pill label">reduzir o ritmo</span>
                        </div>
                        <div className="lr-sub">
                          <span className="pill label" style={{ padding: '0 7px', fontSize: 10.5 }}>Sinal de gestão</span>
                          <span style={{ marginLeft: 6 }}>Volume · sem grau · desde jun · 58% · projeção 116%</span>
                        </div>
                      </Link>

                      {/* Exceção encerrada · amostra ausente · grau leve */}
                      <Link className="lrow" to="/app/apontamento" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                        <div className="lr-top">
                          <span className="lr-title faint">Amostra isolada ausente</span>
                          <span className="pill ok">encerrada</span>
                        </div>
                        <div className="lr-sub">
                          <span className="pill label" style={{ padding: '0 7px', fontSize: 10.5 }}>Exceção</span>
                          <span style={{ marginLeft: 6 }}>Qualidade do dado · grau leve · 03/06 · 1 lacuna, retificada</span>
                        </div>
                      </Link>

                    </div>
                  </Body>
                </Panel>

              </PScroll>
              <AppTabBar active="apontamentos" />
              <HomeBar />
            </Phone>
            <PhoneLabel>Lista do outorgado · cada linha abre o detalhe</PhoneLabel>
          </div>
        </div>

        <Note style={{ maxWidth: 760, margin: '22px auto 0' }}>
          <b>Por que os tons diferem.</b> O tom de cada linha carrega o comportamento: a exceção em curso pede uma resposta em prazo (auto-baixa se corrigida ou aguarda justificativa); o sinal de gestão não cobra prazo, só orienta; o encerrado fica como registro. Nada nesta tela presume infração nem permite ao outorgado encerrar um apontamento, esses verbos são de outra instância.
        </Note>
      </div>
    </>
  )
}
