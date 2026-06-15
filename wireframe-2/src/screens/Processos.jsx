import { useState } from 'react'
import { apontamentos, evidenciasProcessuais, multas, processos, usos } from '../data.js'
import { DataTable, FieldGrid } from '../components/ui.jsx'
import IndexWorkspace from '../components/workspace.jsx'

const fases = [
  'Detectada',
  'Notificada',
  'Autuada',
  'Ciência',
  'Em defesa ou recurso',
  'Em julgamento',
  'Decidida',
  'Aguardando regularização',
  'Encerrada',
]

const columns = [
  { key: 'id', label: 'Processo' },
  { key: 'origem', label: 'Apontamento' },
  { key: 'uso', label: 'Uso' },
  { key: 'identificacao', label: 'Identificação SiDeCC', render: (row) => related(row).uso?.identificacao || '-' },
  { key: 'subBacia', label: 'Sub-bacia', render: (row) => related(row).uso?.subBacia || '-' },
  { key: 'municipio', label: 'Município', render: (row) => related(row).uso?.municipio || '-' },
  { key: 'portaria', label: 'Portaria' },
  { key: 'outorgado', label: 'Outorgado' },
  { key: 'fase', label: 'Fase' },
  { key: 'grau', label: 'Grau' },
  { key: 'penalidade', label: 'Penalidade' },
  { key: 'guiaStatus', label: 'Guia', render: (row) => guiaStatus(row) },
  { key: 'financeiro', label: 'Financeiro', render: (row) => financeiroStatus(row) },
  { key: 'regularizacao', label: 'Regularização' },
  { key: 'prazo', label: 'Prazo' },
  { key: 'proximaAcao', label: 'Próxima ação' },
]

const processoRecortes = [
  {
    name: 'Todos',
    sort: [{ field: 'prazo' }, { field: 'fase' }],
    groupBy: 'fase',
    columns: columns.map((column) => column.key),
  },
  {
    name: 'Ciência pendente',
    logic: 'any',
    filters: [
      { field: 'fase', op: 'eq', value: 'Ciência' },
      { field: 'proximaAcao', op: 'contains', value: 'ciência' },
    ],
    sort: [{ field: 'prazo' }, { field: 'outorgado' }],
    groupBy: 'outorgado',
    columns: ['id', 'origem', 'uso', 'outorgado', 'fase', 'prazo', 'proximaAcao'],
  },
  {
    name: 'Defesa / recurso',
    filters: [{ field: 'fase', op: 'eq', value: 'Em defesa ou recurso' }],
    sort: [{ field: 'prazo' }, { field: 'outorgado' }],
    groupBy: 'instancia',
    columns: ['id', 'origem', 'uso', 'outorgado', 'fase', 'grau', 'penalidade', 'prazo', 'proximaAcao'],
  },
  {
    name: 'Em julgamento',
    logic: 'any',
    filters: [
      { field: 'fase', op: 'eq', value: 'Em julgamento' },
      { field: 'proximaAcao', op: 'contains', value: 'decisão' },
    ],
    sort: [{ field: 'prazo' }, { field: 'grau', dir: 'desc' }],
    groupBy: 'grau',
    columns: ['id', 'origem', 'uso', 'outorgado', 'fase', 'grau', 'penalidade', 'prazo', 'proximaAcao'],
  },
  {
    name: 'Guia a emitir',
    filters: [{ field: 'financeiro', op: 'eq', value: 'guia a emitir' }],
    sort: [{ field: 'outorgado' }, { field: 'id' }],
    groupBy: 'penalidade',
    columns: ['id', 'uso', 'outorgado', 'fase', 'penalidade', 'financeiro', 'prazo', 'proximaAcao'],
  },
  {
    name: 'Conciliação',
    logic: 'any',
    filters: [
      { field: 'financeiro', op: 'contains', value: 'aguardando retorno' },
      { field: 'financeiro', op: 'contains', value: 'conciliação' },
    ],
    sort: [{ field: 'prazo' }, { field: 'outorgado' }],
    groupBy: 'financeiro',
    columns: ['id', 'uso', 'outorgado', 'fase', 'penalidade', 'guiaStatus', 'financeiro', 'proximaAcao'],
  },
  {
    name: 'Cobrança coercitiva',
    filters: [{ field: 'financeiro', op: 'eq', value: 'inadimplente' }],
    sort: [{ field: 'prazo' }, { field: 'outorgado' }],
    groupBy: 'outorgado',
    columns: ['id', 'uso', 'outorgado', 'fase', 'penalidade', 'guiaStatus', 'prazo', 'proximaAcao'],
  },
  {
    name: 'Regularização',
    filters: [{ field: 'fase', op: 'eq', value: 'Aguardando regularização' }],
    sort: [{ field: 'prazo' }, { field: 'outorgado' }],
    groupBy: 'regularizacao',
    columns: ['id', 'uso', 'outorgado', 'fase', 'penalidade', 'guiaStatus', 'regularizacao', 'prazo', 'proximaAcao'],
  },
]

const evidenciaCols = [
  { key: 'tipo', label: 'Tipo' },
  { key: 'documento', label: 'Documento' },
  { key: 'origem', label: 'Origem' },
  { key: 'estado', label: 'Estado' },
  { key: 'congeladoEm', label: 'Congelado em' },
  { key: 'integridade', label: 'Integridade' },
]

const retornoCols = [
  { key: 'retorno', label: 'Retorno' },
  { key: 'data', label: 'Data' },
  { key: 'esperado', label: 'Esperado' },
  { key: 'pago', label: 'Pago' },
  { key: 'estado', label: 'Estado' },
]

function related(row) {
  return {
    uso: usos.find((uso) => uso.id === row.uso),
    apontamento: apontamentos.find((apontamento) => apontamento.id === row.origem),
    guia: multas.find((multa) => multa.id === row.guia),
  }
}

function evidenceFor(row) {
  return evidenciasProcessuais.filter((doc) => doc.processo === row.id)
}

function guiaStatus(row) {
  const guia = related(row).guia
  if (!guia) return row.penalidade.includes('multa') ? 'pendente de emissão' : 'não se aplica'
  return `${guia.id} · ${guia.guiaEstado}`
}

function financeiroStatus(row) {
  const guia = related(row).guia
  if (!guia) return row.financeiro
  return `${guia.guiaEstado} · ${guia.conciliacaoEstado} · ${guia.cobrancaEstado}`
}

function hasFrozenEvidence(row) {
  return evidenceFor(row).some((doc) => doc.estado.includes('congelado') || doc.tipo === 'Auto' || doc.tipo === 'Decisão')
}

function financialSettled(row) {
  const guia = related(row).guia
  if (!row.penalidade.includes('multa')) return true
  return guia?.conciliacaoEstado === 'quitada'
}

function returnRows(guia) {
  if (!guia) return []
  return [{
    id: `${guia.id}-retorno`,
    retorno: guia.retornoArrecadador,
    data: guia.dataRetorno,
    esperado: guia.valorEsperado,
    pago: guia.valorPago,
    estado: guia.conciliacaoEstado,
  }]
}

function GateList({ items }) {
  return (
    <div className="workflow-checklist">
      {items.map((item) => (
        <div key={item.label} className={item.met ? 'met' : 'pending'}>
          <span>{item.met ? 'ok' : 'pendente'}</span>
          <b>{item.label}</b>
        </div>
      ))}
    </div>
  )
}

function GuiaPanel({ row }) {
  const { guia } = related(row)

  if (!guia) {
    return (
      <div className="record-fields">
        <FieldGrid items={[
          ['Estado da guia', row.penalidade.includes('multa') ? 'pendente de emissão' : 'não se aplica'],
          ['Valor apurado', row.valorEstimado],
          ['Origem', row.id],
          ['Ato habilitador', row.decisao],
        ]} />
      </div>
    )
  }

  return (
    <div className="payment-workspace">
      <FieldGrid items={[
        ['Guia', guia.id],
        ['Arrecadador', guia.arrecadador],
        ['Documento', guia.documentoArrecadacao],
        ['Código de receita', guia.codigoReceita],
        ['Valor esperado', guia.valorEsperado],
        ['Valor pago', guia.valorPago],
        ['Vencimento', guia.vencimento],
        ['Guia', guia.guiaEstado],
        ['Conciliação', guia.conciliacaoEstado],
        ['Cobrança', guia.cobrancaEstado],
      ]} />

      <div className="payment-rail">
        <div>
          <span>PIX dinâmico</span>
          <b>{guia.pix}</b>
        </div>
        <div>
          <span>Boleto / código de barras</span>
          <b>{guia.linhaDigitavel}</b>
        </div>
      </div>

      <DataTable columns={retornoCols} rows={returnRows(guia)} noSearch compact />
    </div>
  )
}

function renderTab(row, active) {
  const scoped = related(row)

  if (active === 'Rito') {
    const currentPhaseIndex = fases.indexOf(row.fase)

    return (
      <div className="record-fields">
        <div className="timeline">
          {fases.map((fase, idx) => <span key={fase} className={currentPhaseIndex >= idx ? 'on' : ''}>{fase}</span>)}
        </div>
        <FieldGrid items={[
          ['Processo', row.id],
          ['Apontamento origem', row.origem],
          ['Fase', row.fase],
          ['Instância', row.instancia],
          ['Ciência', row.ciencia],
          ['Prazo de defesa', row.dataLimiteDefesa || '-'],
          ['Prazo de decisão', row.dataLimiteDecisao || '-'],
          ['Próxima ação', row.proximaAcao],
        ]} />
      </div>
    )
  }

  if (active === 'Enquadramento') {
    return (
      <div className="record-fields">
        <FieldGrid items={[
          ['Fundamento', row.enquadramento],
          ['Grau', row.grau],
          ['Tipo do fato', row.tipoFato],
          ['Penalidade sugerida', row.penalidade],
          ['Reincidência 3 anos', row.reincidencia],
          ['Atenuantes / agravantes', row.modificadores],
          ['Decisão do gestor', row.decisao],
        ]} />
      </div>
    )
  }

  if (active === 'Evidência') return <DataTable columns={evidenciaCols} rows={evidenceFor(row)} noSearch compact />

  if (active === 'Decisão') {
    return (
      <div className="record-fields">
        <FieldGrid items={[
          ['Natureza do ato', 'decisão administrativa'],
          ['Decisão', row.decisao],
          ['Órgão jurídico', row.juridico],
          ['Efeito do recurso', row.efeitoRecurso],
          ['Publicação / notificação', row.publicacao],
          ['Providência financeira', financeiroStatus(row)],
          ['Providência de cumprimento', row.regularizacao],
        ]} />
      </div>
    )
  }

  if (active === 'Guia / Pagamento') return <GuiaPanel row={row} />

  if (active === 'Regularização') {
    return (
      <div className="record-fields">
        <FieldGrid items={[
          ['Regularização', row.regularizacao],
          ['Correção exigida', row.correcao],
          ['Comprovação', row.comprovacao],
          ['Guia', scoped.guia?.id || 'pendente'],
          ['Financeiro', financeiroStatus(row)],
        ]} />
        <GateList items={[
          { label: 'Correção comprovada', met: row.regularizacao === 'comprovada' },
          { label: 'Financeiro resolvido quando há multa', met: financialSettled(row) },
        ]} />
      </div>
    )
  }

  return (
    <div className="record-fields">
      <FieldGrid items={[
        ['Último ato', row.proximaAcao],
        ['Trilha', row.auditoria],
        ['Guia', scoped.guia?.id || 'pendente'],
        ['Conciliação', scoped.guia?.conciliacaoEstado || '-'],
      ]} />
    </div>
  )
}

function actionTitle(kind) {
  return {
    decision: 'Proferir decisão administrativa',
    issueGuide: 'Emitir guia de multa',
    secondCopy: 'Emitir 2ª via',
    reconcile: 'Registrar divergência de conciliação',
    cadin: 'Encaminhar CADIN / Dívida Ativa',
    close: 'Encerrar processo',
  }[kind] || 'Registrar ato'
}

function actionOutcome(kind) {
  return {
    decision: 'Decidida',
    issueGuide: 'Guia registrada',
    secondCopy: 'Guia atualizada',
    reconcile: 'Divergência em análise',
    cadin: 'Cobrança encaminhada',
    close: 'Encerrada',
  }[kind] || 'Ato registrado'
}

function initialForm(kind, row, guia) {
  if (kind === 'decision') return { resultado: '', penalidade: row.penalidade.includes('multa') ? row.penalidade : '', fundamentacao: '', prazoCumprimento: '' }
  if (kind === 'issueGuide') return { arrecadador: 'SEFAZ-DARE', codigoReceita: '', vencimento: '', observacao: row.id }
  if (kind === 'secondCopy') return { novoVencimento: '', encargos: '', justificativa: '' }
  if (kind === 'reconcile') return { tipo: guia?.divergenciaTipo || '', justificativa: '', encaminhamento: '' }
  if (kind === 'cadin') return { confirmarSemBaixa: false, destino: '', justificativa: '' }
  if (kind === 'close') return { termoEncerramento: '', confirmarArquivamento: false }
  return {}
}

function workflowFields(kind, row, guia) {
  if (kind === 'decision') {
    return [
      { name: 'resultado', label: 'Resultado', type: 'select', options: ['', 'procedente', 'procedente parcial', 'improcedente'] },
      { name: 'penalidade', label: 'Penalidade aplicada', type: 'select', options: ['', 'advertência com prazo', 'multa simples', 'multa diária', 'intervenção administrativa', 'embargo definitivo com revogação'] },
      { name: 'prazoCumprimento', label: 'Prazo de cumprimento', type: 'text', placeholder: '15 dias / não se aplica' },
      { name: 'fundamentacao', label: 'Fundamentação', type: 'textarea' },
    ]
  }

  if (kind === 'issueGuide') {
    return [
      { name: 'arrecadador', label: 'Arrecadador', type: 'select', options: ['', 'SEFAZ-DARE', 'agente arrecadador definido'] },
      { name: 'codigoReceita', label: 'Código de receita', type: 'select', options: ['', 'multa administrativa SP-Águas', 'demais receitas públicas estaduais'] },
      { name: 'vencimento', label: 'Vencimento', type: 'text', placeholder: 'dd/mm/aaaa' },
      { name: 'observacao', label: 'Objeto de origem', type: 'text', placeholder: row.id },
    ]
  }

  if (kind === 'secondCopy') {
    return [
      { name: 'novoVencimento', label: 'Novo vencimento', type: 'text', placeholder: 'dd/mm/aaaa' },
      { name: 'encargos', label: 'Encargos', type: 'select', options: ['', 'aplicar atualização definida', 'sem atualização'] },
      { name: 'justificativa', label: 'Justificativa', type: 'textarea' },
    ]
  }

  if (kind === 'reconcile') {
    return [
      { name: 'tipo', label: 'Tipo de divergência', type: 'select', options: ['', 'pagamento parcial', 'pagamento duplicado', 'guia não localizada', 'valor divergente', 'retorno após substituição'] },
      { name: 'encaminhamento', label: 'Encaminhamento', type: 'select', options: ['', 'manter pendente', 'emitir recolhimento complementar', 'solicitar retificação', 'reconhecer pagamento parcial', 'encaminhar cobrança'] },
      { name: 'justificativa', label: 'Justificativa do gestor', type: 'textarea' },
    ]
  }

  if (kind === 'cadin') {
    return [
      { name: 'destino', label: 'Destino', type: 'select', options: ['', 'CADIN', 'Dívida Ativa', 'CADIN e Dívida Ativa'] },
      { name: 'confirmarSemBaixa', label: 'Confirmo ausência de baixa por retorno do arrecadador', type: 'checkbox' },
      { name: 'justificativa', label: 'Despacho de encaminhamento', type: 'textarea' },
    ]
  }

  if (kind === 'close') {
    return [
      { name: 'termoEncerramento', label: 'Termo de encerramento', type: 'textarea' },
      { name: 'confirmarArquivamento', label: 'Confirmo regularização e financeiro resolvidos', type: 'checkbox' },
    ]
  }

  return []
}

function filled(value) {
  return typeof value === 'boolean' ? value : String(value || '').trim().length > 0
}

function workflowRequirements(kind, row, guia, form) {
  if (kind === 'decision') {
    return [
      { label: 'Pacote probatório congelado', met: hasFrozenEvidence(row) },
      { label: 'Defesa juntada ou prazo processual controlado', met: filled(row.defesa) || row.prazo === 'vencido' },
      { label: 'Resultado informado', met: filled(form.resultado) },
      { label: 'Penalidade compatível com o resultado', met: form.resultado === 'improcedente' || filled(form.penalidade) },
      { label: 'Fundamentação registrada', met: String(form.fundamentacao || '').trim().length >= 12 },
    ]
  }

  if (kind === 'issueGuide') {
    return [
      { label: 'Decisão procedente com multa', met: row.fase === 'Decidida' && row.decisao.includes('procedente') && row.penalidade.includes('multa') },
      { label: 'Guia ainda não emitida', met: !guia },
      { label: 'Valor calculado pelo processo', met: filled(row.valorEstimado) && row.valorEstimado !== 'sem multa nesta fase' },
      { label: 'Arrecadador selecionado', met: filled(form.arrecadador) },
      { label: 'Código de receita selecionado', met: filled(form.codigoReceita) },
      { label: 'Vencimento informado', met: filled(form.vencimento) },
    ]
  }

  if (kind === 'secondCopy') {
    return [
      { label: 'Guia vencida', met: guia?.guiaEstado === 'vencida' },
      { label: 'Novo vencimento informado', met: filled(form.novoVencimento) },
      { label: 'Tratamento de encargos definido', met: filled(form.encargos) },
      { label: 'Justificativa registrada', met: String(form.justificativa || '').trim().length >= 8 },
    ]
  }

  if (kind === 'reconcile') {
    return [
      { label: 'Retorno do arrecadador preservado', met: filled(guia?.retornoArrecadador) && guia?.retornoArrecadador !== '-' },
      { label: 'Valores esperado e pago disponíveis', met: filled(guia?.valorEsperado) && filled(guia?.valorPago) && guia?.valorPago !== '-' },
      { label: 'Tipo de divergência classificado', met: filled(form.tipo) },
      { label: 'Encaminhamento escolhido', met: filled(form.encaminhamento) },
      { label: 'Justificativa registrada', met: String(form.justificativa || '').trim().length >= 8 },
    ]
  }

  if (kind === 'cadin') {
    return [
      { label: 'Guia vencida', met: guia?.guiaEstado === 'vencida' },
      { label: 'Sem baixa de pagamento', met: guia?.conciliacaoEstado === 'sem retorno' },
      { label: 'Cobrança inadimplente', met: guia?.cobrancaEstado === 'inadimplente' },
      { label: 'Destino selecionado', met: filled(form.destino) },
      { label: 'Ausência de baixa confirmada', met: form.confirmarSemBaixa === true },
      { label: 'Despacho registrado', met: String(form.justificativa || '').trim().length >= 8 },
    ]
  }

  if (kind === 'close') {
    return [
      { label: 'Correção comprovada', met: row.regularizacao === 'comprovada' },
      { label: 'Financeiro resolvido quando há multa', met: financialSettled(row) },
      { label: 'Termo registrado', met: String(form.termoEncerramento || '').trim().length >= 8 },
      { label: 'Arquivamento confirmado', met: form.confirmarArquivamento === true },
    ]
  }

  return []
}

function WorkflowForm({ fields, form, onChange }) {
  return (
    <div className="workflow-form">
      {fields.map((field) => (
        <label key={field.name} className={field.type === 'checkbox' ? 'check-field' : undefined}>
          <span>{field.label}</span>
          {field.type === 'select' && (
            <select value={form[field.name] || ''} onChange={(event) => onChange(field.name, event.target.value)}>
              {field.options.map((option) => <option key={option} value={option}>{option || 'Selecionar'}</option>)}
            </select>
          )}
          {field.type === 'textarea' && (
            <textarea value={form[field.name] || ''} onChange={(event) => onChange(field.name, event.target.value)} />
          )}
          {field.type === 'checkbox' && (
            <input type="checkbox" checked={Boolean(form[field.name])} onChange={(event) => onChange(field.name, event.target.checked)} />
          )}
          {(!field.type || field.type === 'text') && (
            <input value={form[field.name] || ''} placeholder={field.placeholder} onChange={(event) => onChange(field.name, event.target.value)} />
          )}
        </label>
      ))}
    </div>
  )
}

function workflowContextItems(kind, row, guia) {
  const items = [
    ['Processo', row.id],
    ['Outorgado', row.outorgado],
    ['Uso', row.uso],
    ['Fase', row.fase],
    ['Penalidade', row.penalidade],
    ['Guia', guia?.id || 'pendente'],
    ['Valor', guia?.valor || row.valorEstimado],
    ['Arrecadador', guia?.arrecadador || 'a definir'],
  ]

  if (guia) {
    items.push(
      ['Estado da guia', guia.guiaEstado],
      ['Conciliação', guia.conciliacaoEstado],
      ['Cobrança', guia.cobrancaEstado],
    )
  }

  if (kind === 'reconcile') {
    items.push(
      ['Retorno do arrecadador', guia?.retornoArrecadador || '-'],
      ['Data do retorno', guia?.dataRetorno || '-'],
      ['Valor esperado', guia?.valorEsperado || '-'],
      ['Valor pago', guia?.valorPago || '-'],
    )
  }

  return items
}

function ActionModal({ action, onClose }) {
  if (!action) return null
  const { row, kind } = action
  const { guia } = related(row)
  const [form, setForm] = useState(() => initialForm(kind, row, guia))
  const fields = workflowFields(kind, row, guia)
  const requirements = workflowRequirements(kind, row, guia, form)
  const canConfirm = requirements.every((item) => item.met)

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }))
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="action-modal workflow-modal" role="dialog" aria-modal="true" aria-label={actionTitle(kind)}>
        <header>
          <div>
            <span>ato do gestor</span>
            <b>{actionTitle(kind)}</b>
          </div>
          <button type="button" onClick={onClose}>Fechar</button>
        </header>

        <div className="workflow-state">
          <div><span>Estado atual</span><b>{row.fase}</b></div>
          <div><span>Estado resultante</span><b>{actionOutcome(kind)}</b></div>
        </div>

        <FieldGrid items={workflowContextItems(kind, row, guia)} />

        <WorkflowForm fields={fields} form={form} onChange={updateField} />

        <div className="modal-doc-list">
          <b>Documentos vinculados</b>
          {evidenceFor(row).map((doc) => (
            <div key={doc.id}>
              <span>{doc.tipo}</span>
              <strong>{doc.documento}</strong>
              <small>{doc.estado}</small>
            </div>
          ))}
        </div>

        <GateList items={requirements} />

        <footer>
          <button className="btn sub" type="button" onClick={onClose}>Cancelar</button>
          <button className="btn" type="button" disabled={!canConfirm} title={!canConfirm ? 'complete as pendências do rito' : undefined} onClick={onClose}>{actionOutcome(kind)}</button>
        </footer>
      </section>
    </div>
  )
}

function processoActions(row, openModal) {
  const guia = related(row).guia
  const hasGuide = Boolean(guia)
  const decided = row.fase === 'Decidida'
  const inDecision = row.fase === 'Em julgamento'
  const inDefense = row.fase === 'Em defesa ou recurso'
  const inRegularization = row.fase === 'Aguardando regularização'
  const guidePending = !hasGuide && row.guia === 'pendente'
  const paymentDivergence = guia?.conciliacaoEstado === 'divergente'
  const coercive = guia?.guiaEstado === 'vencida' && guia?.conciliacaoEstado === 'sem retorno' && guia?.cobrancaEstado === 'inadimplente'
  const closable = inRegularization && row.regularizacao === 'comprovada' && financialSettled(row)

  return [
    { label: 'Proferir decisão administrativa', enabled: inDecision, reason: `fase atual: ${row.fase}`, onClick: () => openModal('decision', row) },
    { label: 'Enviar para julgamento', enabled: inDefense && row.prazo === 'vencido', reason: inDefense ? 'prazo de defesa ainda aberto' : `fase atual: ${row.fase}`, onClick: () => openModal('decision', row) },
    { label: 'Emitir guia de multa', enabled: decided && guidePending && row.penalidade.includes('multa') && row.decisao.includes('procedente'), reason: hasGuide ? 'guia já emitida' : 'aguarda decisão procedente com multa', onClick: () => openModal('issueGuide', row) },
    { label: 'Emitir 2ª via', enabled: guia?.guiaEstado === 'vencida', reason: hasGuide ? 'guia não vencida' : 'guia ainda não emitida', onClick: () => openModal('secondCopy', row) },
    { label: 'Registrar divergência', enabled: paymentDivergence, reason: 'sem divergência de conciliação', onClick: () => openModal('reconcile', row) },
    { label: 'Encaminhar CADIN / Dívida Ativa', enabled: coercive, reason: 'cobrança ainda não atingiu o rito coercitivo', onClick: () => openModal('cadin', row) },
    { label: 'Encerrar processo', enabled: closable, reason: inRegularization ? 'regularização ou financeiro pendente' : 'regularização ainda não iniciada', sub: true, onClick: () => openModal('close', row) },
  ]
}

export default function Processos() {
  const [modalAction, setModalAction] = useState(null)
  const openModal = (kind, row) => setModalAction({ kind, row })

  return (
    <>
      <IndexWorkspace
        dataset="processos"
        title="Autos / Processos"
        meta="rito, julgamento administrativo e multa"
        recortes={processoRecortes}
        rows={processos}
        columns={columns}
        tabs={['Rito', 'Enquadramento', 'Evidência', 'Decisão', 'Guia / Pagamento', 'Regularização', 'Auditoria']}
        defaultTab="Rito"
        rowTitle={(row) => `${row.id} · ${row.fase}`}
        rowSubtitle={() => 'processo selecionado'}
        inspectorItems={(row) => {
          const scoped = related(row)
          return [
            ['Processo', row.id],
            ['Apontamento', row.origem],
            ['Uso', row.uso],
            ['Identificação SiDeCC', scoped.uso?.identificacao || '-'],
            ['Outorgado', row.outorgado],
            ['Fase', row.fase],
            ['Grau', row.grau],
            ['Penalidade', row.penalidade],
            ['Guia', scoped.guia?.id || 'pendente'],
            ['Financeiro', financeiroStatus(row)],
            ['Próxima ação', row.proximaAcao],
          ]
        }}
        scopeItems={(row) => [
          ['Outorgado', row.outorgado],
          ['Uso', row.uso],
          ['Portaria', row.portaria],
          ['Processo', row.id],
          ['Guia', related(row).guia?.id || 'pendente'],
        ]}
        recordActions={(row) => processoActions(row, openModal)}
        renderTab={renderTab}
      />
      <ActionModal action={modalAction} onClose={() => setModalAction(null)} />
    </>
  )
}
