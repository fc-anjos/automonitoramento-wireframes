import { Link, useNavigate } from 'react-router-dom'
import { GestorShell } from '../../components/shell.jsx'
import { Bento, Panel, Body, Note, Pill, Btn, Row, Sp, DataTable } from '../../components/ui.jsx'

// Estado do ciclo da outorga (Portaria DAEE 1.630/2017, arts. 29-35).
// O ciclo enumera eventos de transição (Renovação, Revisão, Revogação, Extinção,
// Perecimento, Transferência); os estados abaixo descrevem a condição do ato
// vigente resultante dessas transições.
//
// Forma: Autorização (prazo máximo 1 ano, renovável) ou Concessão (prazo maior).
//
// Origem: SOE. O cadastro é espelhado em leitura do Sistema de Outorga
// Eletrônica; este sistema não edita nem cria outorgas.

const PONTOS = [
  {
    id: '07-1100',
    outorga: 'OUT-07-2024-001234',
    forma: 'Concessão',
    validade: '14/03/2029',
    ciclo: 'Vigente', cicloVar: 'ok',
    outorgado: 'Indústria Química Cubatão',
    subbacia: 'Rio Cubatão',
    municipio: 'Cubatão',
    finalidade: 'Industrial',
    faixa: 'A', faixaVar: 'act',
    situacao: 'Ato administrativo · grau gravíssima', situacaoVar: 'bad',
    apont: '1',
  },
  {
    id: '07-1042',
    outorga: 'OUT-07-2023-009871',
    forma: 'Concessão',
    validade: '02/11/2028',
    ciclo: 'Vigente', cicloVar: 'ok',
    outorgado: 'Petroquímica Baixada S/A',
    subbacia: 'Rio Cubatão',
    municipio: 'Cubatão',
    finalidade: 'Industrial',
    faixa: 'A', faixaVar: 'act',
    situacao: 'Ato administrativo · grau grave', situacaoVar: 'bad',
    apont: '1',
  },
  {
    id: '07-1001',
    outorga: 'OUT-07-2022-005543',
    forma: 'Concessão',
    validade: '05/06/2027',
    ciclo: 'Vigente', cicloVar: 'ok',
    outorgado: 'Indústria Cubatão S/A',
    subbacia: 'Rio Cubatão',
    municipio: 'Cubatão',
    finalidade: 'Industrial',
    faixa: 'A', faixaVar: 'act',
    situacao: 'Exceção · grau leve', situacaoVar: 'warn',
    apont: '2 abertos · 1 encerrado',
  },
  {
    id: '07-1003',
    outorga: 'OUT-07-2022-005544',
    forma: 'Concessão',
    validade: '05/06/2027',
    ciclo: 'Vigente', cicloVar: 'ok',
    outorgado: 'Indústria Cubatão S/A',
    subbacia: 'Rio Cubatão',
    municipio: 'Cubatão',
    finalidade: 'Industrial',
    faixa: 'B',
    situacao: 'Conforme', situacaoVar: 'ok',
    apont: '0',
  },
  {
    id: '07-0830',
    outorga: 'OUT-07-2021-003310',
    forma: 'Concessão',
    validade: '19/07/2026',
    ciclo: 'A vencer', cicloVar: 'warn',
    outorgado: 'Serviço de Águas de Praia Grande',
    subbacia: 'Drenagem direta',
    municipio: 'Praia Grande',
    finalidade: 'Abastecimento público',
    faixa: 'B',
    situacao: 'Exceção · prazo de renovação a vencer', situacaoVar: 'warn',
    apont: '1',
  },
  {
    id: '07-0712',
    outorga: 'OUT-07-2020-001889',
    forma: 'Autorização',
    validade: '28/02/2025',
    ciclo: 'Dormente', cicloVar: 'warn',
    outorgado: 'Laticínios Itanhaém',
    subbacia: 'Drenagem direta',
    municipio: 'Itanhaém',
    finalidade: 'Industrial',
    faixa: 'B',
    situacao: 'Exceção · calibração vencida', situacaoVar: 'warn',
    apont: '1',
  },
  {
    id: '07-0455',
    outorga: 'OUT-07-2019-000744',
    forma: 'Autorização',
    validade: '30/09/2024',
    ciclo: 'Sob auto', cicloVar: 'bad',
    outorgado: 'Indústria Têxtil Mongaguá',
    subbacia: 'Drenagem direta',
    municipio: 'Mongaguá',
    finalidade: 'Industrial',
    faixa: 'C',
    situacao: 'Ato administrativo · grau grave', situacaoVar: 'bad',
    apont: '1',
  },
]

const PONTO_COLS = [
  {
    key: 'id',
    label: 'Código do ponto',
    render: (r) => (
      <Link to="/gestor/detalhe" style={{ color: 'var(--ink)', textDecoration: 'none' }}>
        <b>{r.id}</b>
      </Link>
    ),
  },
  {
    key: 'outorga',
    label: 'Outorga',
    render: (r) => <span className="mono" style={{ fontSize: 11.5 }}>{r.outorga}</span>,
  },
  {
    key: 'forma',
    label: 'Forma',
  },
  {
    key: 'validade',
    label: 'Validade',
    num: true,
    render: (r) => <span className="mono">{r.validade}</span>,
  },
  {
    key: 'ciclo',
    label: 'Estado do ciclo',
    render: (r) => <Pill variant={r.cicloVar}>{r.ciclo}</Pill>,
  },
  { key: 'outorgado', label: 'Outorgado' },
  { key: 'subbacia', label: 'Sub-bacia' },
  { key: 'municipio', label: 'Município' },
  { key: 'finalidade', label: 'Finalidade' },
  {
    key: 'faixa',
    label: 'Faixa',
    render: (r) => <Pill variant={r.faixaVar}>{r.faixa}</Pill>,
  },
  {
    key: 'situacao',
    label: 'Situação',
    render: (r) => <Pill variant={r.situacaoVar}>{r.situacao}</Pill>,
  },
  { key: 'apont', label: 'Apontamentos', num: true },
]

const top = (
  <>
    <div className="crumb">Operação / <b style={{ color: 'var(--ink)' }}>Pontos / outorgas</b></div>
    <span className="sp" />
    <Pill variant="label">312 pontos</Pill>
    <Pill variant="warn">6 com apontamento aberto</Pill>
    <Btn sub style={{ padding: '6px 12px' }}>Exportar</Btn>
  </>
)

export default function Pontos() {
  const navigate = useNavigate()
  return (
    <GestorShell tag="GESTOR · 03" title="Pontos / outorgas" active="pontos" top={top}>
      <Bento>
        <Panel lead col={12} header={
          <>
            Pontos / outorgas <Sp />
            <Pill variant="label">situação pelo apontamento mais grave aberto</Pill>
            <Pill variant="label">Origem: SOE</Pill>
          </>
        }>
          <Body style={{ paddingBottom: 0 }}>
            <Row style={{ gap: 18, alignItems: 'flex-start' }}>
              <div>
                <div className="muted" style={{ fontSize: 11, marginBottom: 6 }}>Faixa</div>
                <Row style={{ gap: 6 }}>
                  <Pill variant="act">Todas</Pill>
                  <Pill>A</Pill>
                  <Pill>B</Pill>
                  <Pill>C</Pill>
                </Row>
              </div>
              <div>
                <div className="muted" style={{ fontSize: 11, marginBottom: 6 }}>Sub-bacia</div>
                <Row style={{ gap: 6 }}>
                  <Pill variant="act">Todas</Pill>
                  <Pill>Rio Cubatão</Pill>
                  <Pill>Drenagem direta</Pill>
                </Row>
              </div>
              <div>
                <div className="muted" style={{ fontSize: 11, marginBottom: 6 }}>Estado do ciclo</div>
                <Row style={{ gap: 6 }}>
                  <Pill variant="act">Todos</Pill>
                  <Pill variant="ok">Vigente</Pill>
                  <Pill variant="warn">A vencer</Pill>
                  <Pill variant="warn">Dormente</Pill>
                  <Pill variant="bad">Sob auto</Pill>
                  <Pill>Extinta</Pill>
                </Row>
              </div>
              <div>
                <div className="muted" style={{ fontSize: 11, marginBottom: 6 }}>Forma</div>
                <Row style={{ gap: 6 }}>
                  <Pill variant="act">Todas</Pill>
                  <Pill>Autorização</Pill>
                  <Pill>Concessão</Pill>
                </Row>
              </div>
            </Row>
          </Body>

          <DataTable
            columns={PONTO_COLS}
            rows={PONTOS.map((p) => ({ ...p, onClick: () => navigate('/gestor/detalhe') }))}
            search={['id', 'outorga', 'outorgado', 'municipio', 'finalidade', 'ciclo', 'situacao']}
            searchPlaceholder="Buscar código / outorga / outorgado / município…"
            pageSize={7}
            universe={312}
            empty="Nenhum ponto corresponde à busca."
          />
        </Panel>

        <Note col={8} style={{ marginTop: 4 }}>
          <b>Espelho do cadastro de outorgas (SOE).</b> Esta grade replica, em leitura, os atos de outorga registrados no Sistema de Outorga Eletrônica (SOE) da SP-Águas. O cadastro é de titularidade do SOE; este sistema não edita nem cria outorgas. A tela interna do SiDeCC exibe literalmente <code>Origem: SOE</code> em cada ato, o que confirma a direção do espelhamento. Cada linha é um <b>ponto de captação</b>; o <b>outorgado</b> é o titular e pode deter mais de um ponto (Indústria Cubatão S/A responde por 07-1001 e 07-1003). A <b>situação é do ponto, não do titular</b>: o mesmo outorgado pode ter um ponto sob ato administrativo e outro conforme. A coluna <b>Situação</b> exibe o apontamento aberto mais grave: ato administrativo pesa mais que exceção, que pesa mais que sinal de gestão. A coluna <b>Estado do ciclo</b> reflete o estado do ato de outorga conforme o ciclo da Portaria DAEE 1.630/2017.
        </Note>

        <Note col={4} style={{ marginTop: 4 }}>
          <b>Estados do ciclo da outorga</b> (Portaria DAEE 1.630/2017, arts. 29-35). O ciclo prevê seis transições: Renovação, Revisão, Revogação, Extinção, Perecimento e Transferência. Os estados do ato resultante são: <b>Vigente</b> (em plena validade), <b>A vencer</b> (validade expirando em até 90 dias, aguardando Renovação), <b>Dormente</b> (prazo vencido, sem uso ou pendente de regularização), <b>Sob auto</b> (processo sancionador de Revogação ou Extinção em curso) e <b>Extinta</b> (ato extinto por revogação, perecimento ou extinção formal). Pontos com faixa C sem telemetria obrigatória podem apresentar ciclo Dormente sem apontamento aberto.
        </Note>
      </Bento>
    </GestorShell>
  )
}
