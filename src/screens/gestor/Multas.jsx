import { Link } from 'react-router-dom'
import { GestorShell } from '../../components/shell.jsx'
import { Bento, Panel, Body, Note, Pill, Btn, Sp, Row, Verb, DataTable } from '../../components/ui.jsx'

// The only mutation in the ledger: replacing an overdue guia with an updated
// instrument while preserving the original link. Encargos (juros + mora) are
// computed by the system; the gestor confirms, never types the value.
const ATUALIZAR_GUIA = {
  fields: ['Novo vencimento do instrumento atualizado · 30 dias ▾', 'Memória dos encargos (mora + juros) computados pelo sistema'],
  note: 'A guia vencida é substituída por instrumento atualizado com encargos; a guia original permanece vinculada à substituta e preservada na trilha.',
}

// Multa rows only: every row originates from a PAS (processo administrativo
// sancionador). Grau from Lei 7.663/1991 art. 13: leve | grave | gravíssima.
// Situação: Registrada | Vencida | Quitada | Substituída | Inscrita em dívida ativa.
const GUIAS = [
  {
    id: 'GR-2026-0291',
    processo: 'PAS-07-2026-0007',
    outorgado: '07-1100 · Indústria Química Cubatão',
    valor: 'R$ 90.460,00',
    venc: '10/07/2026',
    situacao: 'Registrada',
    acao: 'Ver processo',
    to: '/gestor/processo',
  },
  {
    id: 'GR-2026-0288',
    processo: 'PAS-07-2025-0019 · em recurso',
    processoVar: 'warn',
    outorgado: '07-1042 · Petroquímica Baixada S/A',
    valor: 'R$ 45.230,00',
    venc: '29/05/2026',
    situacao: 'Vencida · 12 dias',
    situacaoVar: 'bad',
    acao: 'Atualizar guia',
    verb: ATUALIZAR_GUIA,
  },
  {
    id: 'GR-2026-0302',
    processo: 'PAS-07-2026-0003',
    outorgado: '07-0830 · Serviço de Águas de Praia Grande',
    valor: 'R$ 12.800,00',
    venc: '20/06/2026',
    situacao: 'Registrada',
    acao: 'Ver processo',
  },
  {
    id: 'GR-2026-0277',
    processo: 'PAS-07-2025-0014',
    outorgado: '07-0712 · Laticínios Itanhaém',
    valor: 'R$ 6.400,00',
    venc: '10/04/2026',
    situacao: 'Quitada · PIX',
    situacaoVar: 'ok',
    acao: 'Comprovante',
  },
  {
    id: 'GR-2026-0265',
    processo: 'PAS-07-2025-0009',
    outorgado: '07-0712 · Laticínios Itanhaém',
    valor: 'R$ 3.200,00',
    venc: '28/02/2026',
    situacao: 'Substituída · saldo preservado',
    situacaoVar: 'label',
    acao: 'Ver vínculo',
  },
  {
    id: 'GR-2026-0266',
    processo: 'PAS-07-2025-0009 · instrumento atualizado',
    outorgado: '07-0712 · Laticínios Itanhaém',
    valor: 'R$ 3.318,00',
    venc: '30/03/2026',
    situacao: 'Quitada · boleto',
    situacaoVar: 'ok',
    acao: 'Comprovante',
  },
  {
    id: 'GR-2025-0188',
    processo: 'PAS-07-2024-0022',
    outorgado: '07-0455 · Indústria Têxtil Mongaguá',
    valor: 'R$ 1.600,00',
    venc: '15/02/2026',
    situacao: 'Inscrita em dívida ativa',
    situacaoVar: 'bad',
    acao: 'Ver histórico',
  },
]

const GUIA_COLS = [
  { key: 'id', label: 'Guia nº', cls: 'mono' },
  { key: 'processo', label: 'Processo (PAS)', render: (r) => <Pill variant={r.processoVar || 'label'}>{r.processo}</Pill> },
  { key: 'outorgado', label: 'Ponto / outorgado' },
  { key: 'valor', label: 'Valor', num: true },
  { key: 'venc', label: 'Vencimento', num: true },
  { key: 'situacao', label: 'Situação', render: (r) => <Pill variant={r.situacaoVar}>{r.situacao}</Pill> },
  {
    key: 'acao', label: 'Ação', render: (r) => r.verb
      ? <Verb pill label={r.acao} {...r.verb} />
      : r.to
        ? <Link className="pill" to={r.to}>{r.acao}</Link>
        : <a className="pill">{r.acao}</a>,
  },
]

const top = (
  <>
    <div className="crumb">Operação / <b style={{ color: 'var(--ink)' }}>Multas</b></div>
    <span className="sp" />
    <div className="input search" style={{ minHeight: 36 }}><span className="faint">Buscar guia, processo, outorgado…</span></div>
    <Pill variant="label">Exercício: 2026</Pill>
  </>
)

export default function Multas() {
  return (
    <GestorShell tag="GESTOR · 10" title="Multas" active="multas" top={top} bodyStack>
      <Note>
        <b>A multa é a única receita tratada nesta plataforma.</b> A emissão é ato do sistema disparado pelo julgamento definitivo do processo sancionador; o valor é computado com base x grau x modificadores, e dobra por reincidência específica nos últimos 3 anos (Lei 7.663/1991, art. 13). Grau em três níveis: leve, grave, gravíssima. O gestor confirma a emissão, não digita o valor. A situação da guia muda por conciliação bancária; ajuste manual existe apenas como ato do gestor com justificativa, gravado na trilha.
      </Note>

      <Bento>

        {/* livro de multas: a grade that scales to N rows, multa rows only */}
        <Panel lead col={12} header={<>Guias de recolhimento <Sp /><Pill variant="label">multas</Pill><Btn sub to="/gestor/processo" style={{ padding: '6px 12px' }}>Processos sancionadores →</Btn></>}>
          <DataTable
            columns={GUIA_COLS}
            rows={GUIAS}
            search={['id', 'processo', 'outorgado', 'situacao']}
            searchPlaceholder="Buscar guia / processo / outorgado / situação…"
            universe={7}
            pageSize={6}
            empty="Nenhuma guia corresponde à busca."
          />
        </Panel>

        <Note col={12}>
          Ciclo de vida na coluna situação: Registrada (emitida, aguardando pagamento) / Vencida (prazo expirado, pendente de atualização ou inscrição) / Quitada (conciliada) / Substituída (instrumento original vinculado ao instrumento atualizado) / Inscrita em dívida ativa. A multa em recurso (GR-2026-0288) permanece exigível porque o recurso corre <b>sem efeito suspensivo</b> (Lei 10.177/1998, art. 46); o prazo de vencimento não se suspende enquanto a 2ª instância decide.
        </Note>

        {/* emissão: system act, confirmed by gestor, never freehand */}
        <Panel col={6} header={<>Emissão pendente de confirmação <Sp /><Pill variant="label">ato do sistema · disparado pelo julgamento definitivo</Pill></>}>
          <Body className="list">
            <div className="lrow">
              <div className="lr-top"><span className="lr-title">PAS-07-2026-0007 · julgamento definitivo</span><Pill variant="bad">gravíssima</Pill></div>
              <div className="lr-sub">07-1100 · Indústria Química Cubatão (OUT-07-2023-011001) · captação continuada acima do volume outorgado</div>
              <Row style={{ marginTop: 8 }}>
                <Btn sub to="/gestor/processo" style={{ padding: '5px 12px' }}>Conferir cômputo</Btn>
                <Verb
                  label="Confirmar emissão · R$ 90.460,00"
                  variant="act"
                  style={{ padding: '5px 12px' }}
                  fields={['Memória do cálculo · base × grau · modificadores', 'Reincidência verificada (últimos 3 anos): não constatada', 'Justificativa da emissão…']}
                  note="O gestor confirma a emissão a partir do valor computado pelo sistema; não é possível alterar o valor nesta tela."
                />
              </Row>
            </div>
            <Note style={{ marginTop: 12, fontSize: 12 }}>O valor é computado pelo sistema: base × grau e modificadores, com dobra automática por reincidência específica nos últimos 3 anos quando constatada (Lei 7.663/1991, art. 13, §2º). Na ausência de reincidência, o valor-base do grau prevalece. O gestor <b>confirma a emissão, não digita o valor</b>.</Note>
          </Body>
        </Panel>

        {/* retornos não conciliados: what automatic return could not settle */}
        <Panel col={6} header={<>Retornos não conciliados <Sp /><Pill variant="warn">1 pendência</Pill></>}>
          <table className="table">
            <thead>
              <tr>
                <th>Guia</th>
                <th>Outorgado</th>
                <th>Divergência</th>
                <th className="num">Esperado × retornado</th>
                <th>Tratativa</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="mono">GR-2026-0302</td>
                <td>07-0830 · Serviço de Águas de Praia Grande</td>
                <td><Pill variant="warn">Valor retornado abaixo do esperado</Pill></td>
                <td className="num">R$ 12.800,00 × R$ 12.200,00</td>
                <td>
                  <Verb
                    pill
                    label="Exigir complemento"
                    fields={['Justificativa da tratativa…', 'Prazo para regularização ▾']}
                    note="A guia permanece pendente até conciliação do valor devido ou ato formal que reconheça a baixa parcial e o saldo restante."
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <Note style={{ margin: 14, fontSize: 12 }}>O retorno bancário (CNAB 240, API de cobrança com webhook, PIX dinâmico) liquida automaticamente apenas o caso normal: guia identificada, valor esperado e instrumento vigente. O que diverge ingressa nesta fila. Nenhum caso desta fila quita ou encerra a obrigação por si só; a tratativa é ato do gestor, com justificativa e saldo registrados na trilha.</Note>
        </Panel>

        {/* dívida ativa: a calendar exception, gestor act, never automatic */}
        <Panel col={5} header={<>Dívida ativa <Sp /><Pill variant="label">exceção de calendário · ato do gestor</Pill></>}>
          <table className="table">
            <thead>
              <tr>
                <th>Guia</th>
                <th>Outorgado</th>
                <th className="num">Vencida há</th>
                <th>Ato</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="mono">GR-2026-0288</td>
                <td>07-1042 · Petroquímica Baixada S/A</td>
                <td className="num">12 dias</td>
                <td>
                  <Verb
                    pill
                    label="Inscrever em dívida ativa"
                    variant="bad"
                    fields={['Justificativa do encaminhamento…']}
                    note="A inscrição encerra a cobrança administrativa e encaminha o crédito à dívida ativa estadual. Ato datado e fundamentado."
                  />
                </td>
              </tr>
              <tr>
                <td className="mono">GR-2025-0188</td>
                <td>07-0455 · Indústria Têxtil Mongaguá</td>
                <td className="num">115 dias</td>
                <td><Pill variant="bad">Inscrita em 02/06</Pill></td>
              </tr>
            </tbody>
          </table>
          <Note style={{ margin: 14, fontSize: 12 }}>Esgotado o prazo institucional após o vencimento, o sistema abre a exceção de calendário e a guia é encaminhada a esta fila. A inscrição em dívida ativa é ato do gestor, datado e fundamentado.</Note>
        </Panel>

        {/* audit trail: system events and gestor acts interleaved */}
        <Panel col={7} header={<>Últimos eventos <Sp /><Pill variant="label">atos e eventos</Pill></>}>
          <table className="table">
            <tbody>
              <tr><td className="mono faint" style={{ fontSize: 11 }}>10/06 07:02</td><td>Sistema conciliou retorno PIX: GR-2026-0277 quitada (R$ 6.400,00 · PAS-07-2025-0014)</td></tr>
              <tr><td className="mono faint" style={{ fontSize: 11 }}>09/06 15:21</td><td>Retorno bancário de GR-2026-0302 abaixo do esperado; aberta pendência de conciliação (R$ 600,00 em falta)</td></tr>
              <tr><td className="mono faint" style={{ fontSize: 11 }}>06/06 10:44</td><td>Sistema emitiu GR-2026-0266 (instrumento atualizado com encargos) por ato do gestor, em substituição à GR-2026-0265</td></tr>
              <tr><td className="mono faint" style={{ fontSize: 11 }}>05/06 16:40</td><td>Julgamento definitivo lavrado em PAS-07-2026-0007; cômputo disponível para confirmação de emissão (GR-2026-0291)</td></tr>
              <tr><td className="mono faint" style={{ fontSize: 11 }}>02/06 09:15</td><td>Gestor M. Souza inscreveu GR-2025-0188 em dívida ativa, com fundamento, a partir da fila de exceção de calendário</td></tr>
              <tr><td className="mono faint" style={{ fontSize: 11 }}>29/05 00:00</td><td>Sistema abriu exceção de calendário: GR-2026-0288 vencida sem liquidação (PAS-07-2025-0019 · em recurso, sem efeito suspensivo)</td></tr>
            </tbody>
          </table>
          <Note style={{ margin: 14, fontSize: 12 }}>A trilha reúne eventos do sistema (conciliação, abertura de exceções de calendário, cômputo de emissão) e atos do gestor (confirmação de emissão, tratativa de retorno, inscrição em dívida ativa).</Note>
        </Panel>

        <Note col={12}>
          <b>Não há baixa manual de pagamento.</b> A situação da guia muda por conciliação bancária; o ajuste manual existe apenas como ato do gestor com justificativa, gravado na trilha. A assimetria de verbos se mantém: o outorgado paga e acompanha pelo aplicativo; confirmar emissão, atualizar guia vencida, tratar retorno não conciliado e inscrever em dívida ativa são atos exclusivos do gestor nesta tela.
        </Note>

      </Bento>
    </GestorShell>
  )
}
