import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GestorShell } from '../../components/shell.jsx'
import { Bento, Panel, Note, Pill, Svg, Sp } from '../../components/ui.jsx'

const POINTS = [
  { id: '07-1100', nome: 'Indústria Química Cubatão', meta: 'Cubatão · Industrial · Faixa A', situacao: 'Indício de fraude na medição · gravíssima', mk: 'bad' },
  { id: '07-1042', nome: 'Petroquímica Baixada S/A', meta: 'Cubatão · Industrial · Faixa A', situacao: 'Volume mensal acima do outorgado · grave', mk: 'bad' },
  { id: '07-1001', nome: 'Indústria Cubatão S/A', meta: 'Cubatão · Industrial · Faixa A', situacao: 'Pico de vazão acima do teto · média', mk: 'warn' },
  { id: '07-0830', nome: 'Serviço de Águas de Praia Grande', meta: 'Praia Grande · Abastecimento público · Faixa B', situacao: 'Outorga a vencer · renovar até 17/07', mk: 'warn' },
  { id: '07-0712', nome: 'Laticínios Itanhaém', meta: 'Itanhaém · Industrial · Faixa B', situacao: 'Calibração do hidrômetro vencida · leve', mk: 'warn' },
  { id: '07-0455', nome: 'Indústria Têxtil Mongaguá', meta: 'Mongaguá · Industrial · Faixa C', situacao: 'Sem uso há 2 anos (risco de perecimento)', mk: 'warn' },
]

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
  const [q, setQ] = useState('')
  const needle = q.trim().toLowerCase()
  const shown = needle
    ? POINTS.filter((p) => `${p.id} ${p.nome} ${p.meta} ${p.situacao}`.toLowerCase().includes(needle))
    : POINTS
  return (
    <GestorShell tag="GESTOR · 02" title="Mapa georreferenciado" right="Pontos de exemplo · SIRGAS 2000" active="mapa" top={top}>
      <Note style={{ marginBottom: 16 }}>
        <b>O mapa como entrada para a triagem.</b> Cada ponto aparece com a <b>situação do seu pior apontamento aberto</b>: ponto cheio para apontamento crítico (fraude, infração reincidente), ponto hachurado para algo a vencer ou a justificar, ponto vazado para conforme. O gestor lê o território e desce no ponto; a régua é a mesma da fila de Apontamentos e do Detalhe. A base real de captações entra na etapa de validação; aqui usamos os pontos do cenário sobre as sub-bacias da UGRHI-07.
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
          <div className="dt-toolbar">
            <label className="input search" style={{ minHeight: 34 }}>
              <span className="faint" aria-hidden>⌕</span>
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filtrar ponto / município…" aria-label="Filtrar pontos no mapa" />
            </label>
            <Sp />
            <span className="dt-count muted">{shown.length} de {POINTS.length}</span>
          </div>
          <div style={{ maxHeight: 520, overflow: 'auto' }}>
            {shown.length === 0
              ? <div className="dt-empty muted">Nenhum ponto corresponde ao filtro.</div>
              : shown.map((p) => (
                <Link key={p.id} className="mrow" to="/gestor/detalhe" style={{ padding: '12px 14px', textDecoration: 'none', color: 'inherit' }}>
                  <span className="ico"><i className={`mk ${p.mk}`} /></span>
                  <div className="msp"><b style={{ fontSize: 13, color: 'var(--ink)' }}>{p.id} · {p.nome}</b><div className="muted" style={{ fontSize: 11.5 }}>{p.meta}</div><div className="muted" style={{ fontSize: 11.5, marginTop: 2 }}>{p.situacao}</div></div><span className="faint">›</span>
                </Link>
              ))}
          </div>
        </Panel>

        <Note col={12} style={{ marginTop: 0 }}>
          A situação de cada ponto é a do <b>pior apontamento aberto</b> sobre ele, pela mesma régua das três naturezas: um <b>ato administrativo</b> grave ou gravíssimo, que corre o rito, pinta o ponto de crítico (07-1100, fraude; 07-1042, infração reincidente em defesa); uma <b>exceção</b> a justificar ou um item a vencer deixa o ponto em atenção (07-1001, pico de vazão; 07-0830, renovação; 07-0712, calibração; 07-0455, dormência). Um <b>sinal de gestão</b> isolado, que se autorregula, não muda o pino. Nenhum ponto do cenário está conforme; o estado conforme aparece no Detalhe quando todos os limites do ponto fecham.
        </Note>
      </Bento>
    </GestorShell>
  )
}
