import { Link } from 'react-router-dom'
import { GestorShell } from '../../components/shell.jsx'
import { Bento, Panel, Body, Note, Pill, Btn, Sp, Row, DataTable } from '../../components/ui.jsx'

// guias are the unbounded object here (87 issued in the exercise across the
// 312 outorgas); the rows below are the loaded sample. both origins share the
// same table: multa (processo sancionador) and cobrança pelo uso (períodos).
const GUIAS = [
  { id: 'GR-2026-0291', outorgado: '07-1100 · Indústria Química Cubatão', origem: 'Multa · PAS-07-2026-0007', origemVar: 'bad', valor: 'R$ 90.460,00', venc: '10/07/2026', estado: 'Registrada', acao: 'Ver processo', to: '/gestor/processo' },
  { id: 'GR-2026-0288', outorgado: '07-1042 · Petroquímica Baixada S/A', origem: 'Multa · PAS-07-2025-0019 · em recurso', origemVar: 'bad', valor: 'R$ 45.230,00', venc: '29/05/2026', estado: 'Vencida · 12 dias', estadoVar: 'bad', acao: 'Atualizar (2ª via)', to: '/gestor/processo' },
  { id: 'GR-2026-0275', outorgado: '07-1001 · Indústria Cubatão S/A', origem: 'Cobrança pelo uso · 1º tri/2026', valor: 'R$ 18.940,00', venc: '15/05/2026', estado: 'Quitada · PIX', estadoVar: 'ok', acao: 'Comprovante', to: '/gestor/detalhe' },
  { id: 'GR-2026-0274', outorgado: '07-0830 · Serviço de Águas de Praia Grande', origem: 'Cobrança pelo uso · 1º tri/2026', valor: 'R$ 31.205,00', venc: '15/05/2026', estado: 'Paga · em conciliação', estadoVar: 'act', acao: 'Ver retorno', to: '/gestor/detalhe' },
  { id: 'GR-2026-0269', outorgado: '07-0712 · Laticínios Itanhaém', origem: 'Cobrança pelo uso · 1º tri/2026', valor: 'R$ 2.184,00', venc: '15/05/2026', estado: 'Substituída · ver GR-2026-0301', estadoVar: 'label', acao: 'Ver vínculo', to: '/gestor/detalhe' },
  { id: 'GR-2026-0301', outorgado: '07-0712 · Laticínios Itanhaém', origem: 'Cobrança pelo uso · 1º tri/2026 · 2ª via', valor: 'R$ 2.243,00', venc: '20/06/2026', estado: 'Registrada', acao: 'Acompanhar', to: '/gestor/detalhe' },
  { id: 'GR-2025-0188', outorgado: '07-0455 · Indústria Têxtil Mongaguá', origem: 'Cobrança pelo uso · 4º tri/2025', valor: 'R$ 1.412,00', venc: '15/02/2026', estado: 'Inscrita em dívida ativa', estadoVar: 'bad', acao: 'Ver histórico', to: '/gestor/detalhe' },
  { id: 'GR-2026-0244', outorgado: '07-1001 · Indústria Cubatão S/A', origem: 'Cobrança pelo uso · 4º tri/2025', valor: 'R$ 17.880,00', venc: '15/02/2026', estado: 'Quitada · CNAB', estadoVar: 'ok', acao: 'Comprovante', to: '/gestor/detalhe' },
]

const GUIA_COLS = [
  { key: 'id', label: 'Guia', cls: 'mono' },
  { key: 'outorgado', label: 'Ponto / outorgado' },
  { key: 'origem', label: 'Origem', render: (r) => <Pill variant="label">{r.origem}</Pill> },
  { key: 'valor', label: 'Valor', num: true },
  { key: 'venc', label: 'Vencimento', num: true },
  { key: 'estado', label: 'Situação', render: (r) => <Pill variant={r.estadoVar}>{r.estado}</Pill> },
  { key: 'acao', label: 'Ação', render: (r) => <Link className="pill" to={r.to}>{r.acao}</Link> },
]

const top = (
  <>
    <div className="crumb">Operação / <b style={{ color: 'var(--ink)' }}>Arrecadação</b></div>
    <span className="sp" />
    <div className="input search" style={{ minHeight: 36 }}><span className="faint">Buscar guia, processo, outorgado…</span></div>
    <Pill variant="label">Exercício: 2026</Pill>
  </>
)

export default function Arrecadacao() {
  return (
    <GestorShell tag="GESTOR · 10" title="Arrecadação" active="arrecadacao" top={top} bodyStack>
      <Note>
        <b>A guia de recolhimento é o terceiro objeto da plataforma</b>, emitida em decorrência do apontamento e do processo. Um módulo único serve às duas espécies de receita: a <b>multa</b> do processo sancionador e a <b>cobrança pelo uso da água</b> (Lei estadual 12.183/2005, destinada ao FEHIDRO; na Baixada Santista, Deliberação CBH-BS 157/2009), alimentada pelos volumes validados. A situação da guia muda por <b>conciliação bancária</b>, nunca por edição direta; cada guia carrega boleto registrado (linha digitável), QR de PIX dinâmico, vencimento e o objeto de origem (número do processo ou período de cobrança).
      </Note>

      <Bento>
        {/* the closing table replaces the old kpi cards; it is the boletim idiom,
            and 9,2% is share of value, not of count (4 of 87 guias) */}
        <Panel col={12} header={<>Arrecadação do exercício 2026 <Sp /><Pill variant="label">fechamento por origem</Pill></>}>
          <table className="table">
            <thead><tr><th>Origem</th><th className="num">Emitidas</th><th className="num">Liquidadas</th><th className="num">Vencidas</th><th className="num">Em aberto</th></tr></thead>
            <tbody>
              <tr><td>Cobrança pelo uso</td><td className="num">81</td><td className="num">67</td><td className="num">3</td><td className="num">R$ 67,2 mil</td></tr>
              <tr><td>Multa</td><td className="num">6</td><td className="num">4</td><td className="num">1</td><td className="num">R$ 45,2 mil</td></tr>
              <tr><td><b>Total</b></td><td className="num"><b>87</b></td><td className="num"><b>71</b></td><td className="num"><b>4</b></td><td className="num"><b>R$ 112,4 mil</b></td></tr>
            </tbody>
          </table>
          <Note style={{ margin: 14, fontSize: 12 }}>O valor em aberto corresponde a 9,2% do valor emitido no exercício. Das 71 liquidadas, 68 estão quitadas e 3 pagas aguardam conciliação (retorno CNAB 240 e webhook PIX). As pendências que exigem ato do gestor estão nas filas abaixo: 3 divergências de conciliação e 1 guia apta à dívida ativa.</Note>
        </Panel>

        {/* the ledger: every guia, both origins, lifecycle in the state column */}
        <Panel lead col={12} header={<>Guias de recolhimento <Sp /><Pill variant="label">multa + cobrança pelo uso</Pill><Btn sub to="/gestor/processo" style={{ padding: '6px 12px' }}>Processos sancionadores →</Btn></>}>
          <DataTable
            columns={GUIA_COLS}
            rows={GUIAS}
            search={['id', 'outorgado', 'origem', 'estado']}
            searchPlaceholder="Buscar guia / outorgado / origem / situação…"
            universe={87}
            pageSize={6}
            empty="Nenhuma guia corresponde à busca."
          />
        </Panel>

        <Note col={12}>
          O <b>ciclo de vida</b> está na coluna de situação: emitida → registrada → paga (aguardando conciliação) → quitada; vencida → atualizada (segunda via com encargos, caso GR-2026-0301); substituída ou cancelada, sempre com vínculo à guia que a sucede; e a etapa final, a <b>inscrição em dívida ativa</b>. A multa em recurso (GR-2026-0288) permanece exigível porque o recurso corre <b>sem efeito suspensivo</b> (Portaria DAEE 4.905/2019; prazo parametrizável · conferir DOE); se o recurso for provido após o pagamento, o vínculo guia ↔ processo é o que torna a restituição rastreável.
        </Note>

        {/* emissão: system act triggered by gestor act, never freehand */}
        <Panel col={6} header={<>Emissão <Sp /><Pill variant="label">ato do sistema · disparado pelo gestor</Pill></>}>
          <Body className="list">
            <div className="lrow">
              <div className="lr-top"><span className="lr-title">Multa · PAS-07-2026-0007</span><Pill variant="bad">julgamento definitivo</Pill></div>
              <div className="lr-sub">07-1100 · Indústria Química Cubatão (OUT-07-2023-011001). Valor computado pelo sistema: base × grau (gravíssima) e modificadores, com dobra automática por reincidência em 3 anos quando houver (Resolução ANA 24/2020, art. 27). O gestor <b>confirma a emissão; não digita o valor</b>.</div>
              <Row style={{ marginTop: 8 }}><Btn sub to="/gestor/processo" style={{ padding: '5px 12px' }}>Conferir cômputo</Btn><Btn variant="act" to="/gestor/processo" style={{ padding: '5px 12px' }}>Confirmar emissão · R$ 90.460,00</Btn></Row>
            </div>
            <div className="lrow">
              <div className="lr-top"><span className="lr-title">Cobrança pelo uso · 2º tri/2026</span><Pill>lote periódico</Pill></div>
              <div className="lr-sub">Calculada a partir dos <b>volumes validados</b> do período: 287 de 312 pontos consolidados. Os 25 restantes aguardam validação e entram no lote complementar; nenhuma guia é emitida a partir de volume retido.</div>
              <Row style={{ marginTop: 8 }}><Btn sub style={{ padding: '5px 12px' }}>Prévia do lote</Btn><Btn variant="act" style={{ padding: '5px 12px' }}>Emitir lote do período</Btn></Row>
            </div>
          </Body>
        </Panel>

        {/* inadimplência cut by sub-bacia, same recorte as the dashboard */}
        <Panel col={6} header={<>Inadimplência por sub-bacia <Sp /><Pill variant="label">vencidas ÷ emitidas</Pill></>}>
          <table className="table">
            <thead><tr><th>Sub-bacia</th><th className="num">Guias emitidas</th><th className="num">Vencidas</th><th className="num">Em aberto</th><th>Status</th></tr></thead>
            <tbody>
              <tr><td>Rio Cubatão</td><td className="num">39</td><td className="num">2</td><td className="num">R$ 68,1 mil</td><td><Pill variant="warn">Atenção</Pill></td></tr>
              <tr><td>Rio Itapanhaú</td><td className="num">21</td><td className="num">0</td><td className="num">R$ 0</td><td><Pill variant="ok">Normal</Pill></td></tr>
              <tr><td>Drenagem direta (costeira)</td><td className="num">27</td><td className="num">2</td><td className="num">R$ 44,3 mil</td><td><Pill variant="warn">Atenção</Pill></td></tr>
            </tbody>
          </table>
          <Note style={{ margin: 14, fontSize: 12 }}>O mesmo recorte territorial do dashboard, aplicado à arrecadação: a inadimplência concentrada numa sub-bacia orienta a fiscalização, e o agregado (arrecadação destinada ao FEHIDRO) é o que o portal público recebe, sem dados pessoais.</Note>
        </Panel>

        {/* conciliação queue: what the automatic return could not settle */}
        <Panel col={7} header={<>Fila de conciliação <Sp /><Pill variant="warn">3 divergências</Pill></>}>
          <table className="table">
            <thead><tr><th>Guia</th><th>Outorgado</th><th>Divergência</th><th className="num">Guia × pago</th><th>Resolução</th></tr></thead>
            <tbody>
              <tr>
                <td className="mono">GR-2026-0263</td><td>07-0830 · Serviço de Águas de Praia Grande</td>
                <td><Pill variant="warn">Pagamento a maior</Pill></td>
                <td className="num">R$ 1.248,00 × R$ 1.284,00</td>
                <td><Link className="pill" to="/gestor/detalhe">Resolver com justificativa</Link></td>
              </tr>
              <tr>
                <td className="mono">GR-2026-0258</td><td>07-0712 · Laticínios Itanhaém</td>
                <td><Pill variant="warn">Pagamento a menor</Pill></td>
                <td className="num">R$ 2.184,00 × R$ 2.000,00</td>
                <td><Link className="pill" to="/gestor/detalhe">Resolver com justificativa</Link></td>
              </tr>
              <tr>
                <td className="mono">GR-2026-0269</td><td>07-0712 · Laticínios Itanhaém</td>
                <td><Pill variant="bad">Pagamento após substituição</Pill></td>
                <td className="num">paga a guia substituída</td>
                <td><Link className="pill" to="/gestor/detalhe">Resolver com justificativa</Link></td>
              </tr>
            </tbody>
          </table>
          <Note style={{ margin: 14, fontSize: 12 }}>O retorno bancário (arquivo CNAB 240 ou API de cobrança com webhook; PIX dinâmico com confirmação instantânea) liquida automaticamente o caso normal. O que resta ingressa nesta fila: resolver uma divergência é <b>ato do gestor com justificativa</b>, gravado na trilha como qualquer outro verbo, seja compensar a diferença, exigir complemento ou transferir o pagamento à guia substituta.</Note>
        </Panel>

        {/* dívida ativa: a calendar exception, lands in a queue, never silent */}
        <Panel col={5} header={<>Dívida ativa <Sp /><Pill variant="label">exceção de calendário</Pill></>}>
          <table className="table">
            <thead><tr><th>Guia</th><th>Outorgado</th><th className="num">Vencida há</th><th>Ato</th></tr></thead>
            <tbody>
              <tr>
                <td className="mono">GR-2026-0288</td><td>07-1042 · Petroquímica Baixada S/A</td>
                <td className="num">12 dias</td>
                <td><Link className="pill bad" to="/gestor/processo">Inscrever em dívida ativa</Link></td>
              </tr>
              <tr>
                <td className="mono">GR-2025-0188</td><td>07-0455 · Indústria Têxtil Mongaguá</td>
                <td className="num">115 dias</td>
                <td><Pill variant="bad">Inscrita em 02/06</Pill></td>
              </tr>
            </tbody>
          </table>
          <Note style={{ margin: 14, fontSize: 12 }}>Esgotado o prazo após o vencimento (prazo parametrizável · conferir DOE), o sistema abre a exceção de calendário e a guia <b>é encaminhada a esta fila</b>; a inscrição nunca é automática. O verbo é do gestor, datado e fundamentado, e a guia muda para o estado definitivo preservando o histórico.</Note>
        </Panel>

        <Note col={12}>
          <b>Não há baixa manual de pagamento.</b> A situação da guia muda por conciliação bancária; o ajuste manual existe apenas como <b>ato do gestor com justificativa</b>, gravado na trilha de auditoria como qualquer outro verbo. É a mesma assimetria de poderes das demais telas, aplicada à arrecadação: o outorgado paga e acompanha; emitir, atualizar, resolver divergência e inscrever em dívida ativa são atos do gestor.
        </Note>

        {/* immutable audit trail: system events and gestor acts, interleaved */}
        <Panel col={12} header={<>Trilha de auditoria <Sp /><Pill variant="label" className="mono">imutável</Pill></>}>
          <table className="table"><tbody>
            <tr><td className="mono faint" style={{ fontSize: 11 }}>10/06 07:02</td><td>Sistema conciliou retorno CNAB 240: 14 guias liquidadas, 1 divergência aberta (GR-2026-0258 · pagamento a menor)</td></tr>
            <tr><td className="mono faint" style={{ fontSize: 11 }}>09/06 15:21</td><td>Gestor M. Souza resolveu GR-2026-0263 (pagamento a maior) com justificativa: diferença compensada na guia seguinte</td></tr>
            <tr><td className="mono faint" style={{ fontSize: 11 }}>06/06 10:44</td><td>Sistema emitiu GR-2026-0301 (2ª via com encargos) por ato do gestor, em substituição à GR-2026-0269</td></tr>
            <tr><td className="mono faint" style={{ fontSize: 11 }}>02/06 09:15</td><td>Gestor M. Souza inscreveu GR-2025-0188 em dívida ativa, com fundamento, a partir da fila de exceção de calendário</td></tr>
            <tr><td className="mono faint" style={{ fontSize: 11 }}>29/05 00:00</td><td>Sistema abriu exceção de calendário: GR-2026-0288 vencida sem liquidação (multa · PAS-07-2025-0019)</td></tr>
            <tr><td className="mono faint" style={{ fontSize: 11 }}>15/04 11:30</td><td>Sistema emitiu lote de cobrança 1º tri/2026 (81 guias, volumes validados) confirmado pelo gestor</td></tr>
          </tbody></table>
          <Note style={{ margin: 14, fontSize: 12 }}>A trilha mistura deliberadamente eventos do sistema (conciliação, abertura de exceções) com atos do gestor (resolução de divergência, inscrição em dívida ativa). Como encargos e prazos contam-se de datas certas, cada marco fica gravado e é imutável.</Note>
        </Panel>

      </Bento>
    </GestorShell>
  )
}
