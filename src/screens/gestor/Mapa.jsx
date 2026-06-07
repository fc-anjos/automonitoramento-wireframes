import { Link } from 'react-router-dom'
import { GestorShell } from '../../components/shell.jsx'
import { Bento, Panel, Note, Pill, Svg, Sp } from '../../components/ui.jsx'

const top = (
  <>
    <div className="crumb">Operação / <b style={{ color: 'var(--ink)' }}>Mapa</b></div>
    <span className="sp" />
    <Pill>Sub-bacia: todas</Pill>
    <Pill>Finalidade: todas</Pill>
    <Pill variant="act">Situação: todas</Pill>
  </>
)

export default function Mapa() {
  return (
    <GestorShell tag="GESTOR · 02" title="Mapa georreferenciado" right="Pontos de exemplo · SIRGAS 2000" active="mapa" top={top}>
      <Note style={{ marginBottom: 16 }}>
        <b>O mapa é uma entrada para a triagem, não um painel de cores.</b> Cada ponto aparece com a <b>situação do seu pior apontamento aberto</b>: ponto cheio para apontamento crítico (fraude, infração reincidente), ponto hachurado para algo a vencer ou a justificar, ponto vazado para conforme. O gestor lê o território e desce no ponto; a régua é a mesma da fila de Apontamentos e do Detalhe. A base real de captações entra na etapa de validação; aqui usamos os pontos do cenário sobre as sub-bacias da UGRHI-07.
      </Note>

      <Bento>
        <Panel lead col={8} header={<>UGRHI-07 · Baixada Santista <Sp /><span className="mono faint" style={{ fontSize: 11 }}>EPSG:4674 · SIRGAS 2000</span></>}>
          <div style={{ position: 'relative' }}>
            <Svg src="wireframe-mapa-bacia.svg" ratio="760/577" label="Mapa esboçado da UGRHI-07: sub-bacias e pontos de exemplo" style={{ borderBottom: '1.5px solid var(--ink)' }} />
          </div>
          <div className="body legend">
            <span><i className="mk ok" />Conforme</span>
            <span><i className="mk warn" />A vencer / a justificar / sem transmissão</span>
            <span><i className="mk bad" />Apontamento crítico</span>
          </div>
        </Panel>

        <Panel col={4} header={<>Pontos no mapa <Sp /><Pill variant="label">6 do cenário</Pill></>}>
          <div style={{ maxHeight: 520, overflow: 'auto' }}>
            <Link className="mrow" to="/gestor/detalhe" style={{ padding: '12px 14px', textDecoration: 'none', color: 'inherit' }}>
              <span className="ico"><i className="mk bad" /></span>
              <div className="msp"><b style={{ fontSize: 13, color: 'var(--ink)' }}>07-1100 · Indústria Química Cubatão</b><div className="muted" style={{ fontSize: 11.5 }}>Cubatão · Industrial · Faixa A</div><div className="muted" style={{ fontSize: 11.5, marginTop: 2 }}>Indício de fraude na medição · gravíssima</div></div><span className="faint">›</span></Link>
            <Link className="mrow" to="/gestor/detalhe" style={{ padding: '12px 14px', textDecoration: 'none', color: 'inherit' }}>
              <span className="ico"><i className="mk bad" /></span>
              <div className="msp"><b style={{ fontSize: 13, color: 'var(--ink)' }}>07-1042 · Petroquímica Baixada S/A</b><div className="muted" style={{ fontSize: 11.5 }}>Cubatão · Industrial · Faixa A</div><div className="muted" style={{ fontSize: 11.5, marginTop: 2 }}>Volume mensal acima do outorgado · grave</div></div><span className="faint">›</span></Link>
            <Link className="mrow" to="/gestor/detalhe" style={{ padding: '12px 14px', textDecoration: 'none', color: 'inherit' }}>
              <span className="ico"><i className="mk warn" /></span>
              <div className="msp"><b style={{ fontSize: 13, color: 'var(--ink)' }}>07-1001 · Indústria Cubatão S/A</b><div className="muted" style={{ fontSize: 11.5 }}>Cubatão · Industrial · Faixa A</div><div className="muted" style={{ fontSize: 11.5, marginTop: 2 }}>Pico de vazão acima do teto · média</div></div><span className="faint">›</span></Link>
            <Link className="mrow" to="/gestor/detalhe" style={{ padding: '12px 14px', textDecoration: 'none', color: 'inherit' }}>
              <span className="ico"><i className="mk warn" /></span>
              <div className="msp"><b style={{ fontSize: 13, color: 'var(--ink)' }}>07-0830 · Serviço de Águas de Praia Grande</b><div className="muted" style={{ fontSize: 11.5 }}>Praia Grande · Abastecimento público · Faixa B</div><div className="muted" style={{ fontSize: 11.5, marginTop: 2 }}>Outorga a vencer · renovar até 17/07</div></div><span className="faint">›</span></Link>
            <Link className="mrow" to="/gestor/detalhe" style={{ padding: '12px 14px', textDecoration: 'none', color: 'inherit' }}>
              <span className="ico"><i className="mk warn" /></span>
              <div className="msp"><b style={{ fontSize: 13, color: 'var(--ink)' }}>07-0712 · Laticínios Itanhaém</b><div className="muted" style={{ fontSize: 11.5 }}>Itanhaém · Industrial · Faixa B</div><div className="muted" style={{ fontSize: 11.5, marginTop: 2 }}>Calibração do hidrômetro vencida · leve</div></div><span className="faint">›</span></Link>
            <Link className="mrow" to="/gestor/detalhe" style={{ padding: '12px 14px', textDecoration: 'none', color: 'inherit' }}>
              <span className="ico"><i className="mk warn" /></span>
              <div className="msp"><b style={{ fontSize: 13, color: 'var(--ink)' }}>07-0455 · Indústria Têxtil Mongaguá</b><div className="muted" style={{ fontSize: 11.5 }}>Mongaguá · Industrial · Faixa C</div><div className="muted" style={{ fontSize: 11.5, marginTop: 2 }}>Sem uso há 2 anos (risco de perecimento)</div></div><span className="faint">›</span></Link>
          </div>
        </Panel>

        <Note col={12} style={{ marginTop: 0 }}>
          A situação de cada ponto é a do <b>pior apontamento aberto</b> sobre ele, pela mesma régua das três naturezas: um <b>ato administrativo</b> grave ou gravíssimo, que corre o rito, pinta o ponto de crítico (07-1100, fraude; 07-1042, infração reincidente em defesa); uma <b>exceção</b> a justificar ou um item a vencer deixa o ponto em atenção (07-1001, pico de vazão; 07-0830, renovação; 07-0712, calibração; 07-0455, dormência). Um <b>sinal de gestão</b> isolado, que se autorregula, não muda o pino. Nenhum ponto do cenário está conforme; o estado conforme aparece no Detalhe quando todos os limites do ponto fecham.
        </Note>
      </Bento>
    </GestorShell>
  )
}
