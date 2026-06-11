import { FieldGrid } from '../components/ui.jsx'
import IndexWorkspace from '../components/workspace.jsx'

export default function GenericTable({
  dataset,
  title,
  meta,
  rows,
  columns,
  tabs = ['Dados', 'Histórico', 'Auditoria'],
  actions = [],
  recordActions,
  recortes,
  views = ['Todos', 'Aguardando ação', 'Recentes'],
}) {
  function renderGenericTab(row, active) {
    if (title === 'Relatórios') {
      return (
        <div className="record-fields">
          <FieldGrid items={[
            ['Aba', active],
            ['Relatório', row.nome],
            ['Família', row.familia],
            ['Parâmetros', row.parametros],
            ['Filtros', row.filtros],
            ['Saída prevista', row.saida],
            ['Linhas na prévia', row.linhas],
            ['Dados pessoais', row.dadosPessoais],
            ['Última geração', row.ultima],
          ]} />
        </div>
      )
    }

    if (title === 'Administração') {
      return (
        <div className="record-fields">
          <FieldGrid items={[
            ['Aba', active],
            ['Usuário', row.nome],
            ['Perfil', row.perfil],
            ['Estado', row.estado],
            ['Autenticação', row.autenticacao],
            ['E-mail', row.email],
            ['Usuário atual', row.atual],
            ['Proteção', row.protegido],
            ['Último acesso', row.ultimo],
            ['Último ato', row.ato],
          ]} />
        </div>
      )
    }

    return (
      <div className="record-fields">
        <FieldGrid items={[
          ['Aba', active],
          ...Object.entries(row || {}).map(([k, v]) => [k, v]),
        ]} />
      </div>
    )
  }

  return (
    <IndexWorkspace
      dataset={dataset}
      title={title}
      meta={meta}
      rows={rows}
      columns={columns}
      tabs={tabs}
      actions={actions}
      recortes={recortes}
      views={views}
      rowTitle={(row) => row.nome || row.id}
      rowSubtitle={() => `${title.toLowerCase()} selecionado`}
      inspectorItems={(row) => Object.entries(row || {}).slice(0, 9).map(([k, v]) => [k, v])}
      scopeItems={(row) => [[title, row.nome || row.id], ['Registro', row.id]]}
      recordActions={recordActions}
      renderTab={renderGenericTab}
    />
  )
}
