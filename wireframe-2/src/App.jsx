import { Navigate, Route, Routes } from 'react-router-dom'
import Shell from './components/shell.jsx'
import { acessos, relatorios } from './data.js'
import Apontamentos from './screens/Apontamentos.jsx'
import Dashboard from './screens/Dashboard.jsx'
import GenericTable from './screens/GenericTable.jsx'
import Justificativas from './screens/Justificativas.jsx'
import Outorgados from './screens/Outorgados.jsx'
import Portarias from './screens/Portarias.jsx'
import Processos from './screens/Processos.jsx'
import Usos from './screens/Usos.jsx'

function Page({ children }) {
  return <Shell>{children}</Shell>
}

function reportActions(row) {
  const parametrosOk = row.parametros === 'completos'
  const temLinhas = Number(row.linhas) > 0
  const csv = row.saida.includes('CSV')
  const pdf = row.saida.includes('PDF')
  const parametroReason = row.parametros === 'completos' ? '' : row.parametros

  return [
    { label: 'Gerar relatório', enabled: parametrosOk, reason: parametroReason },
    { label: 'Exportar CSV', enabled: parametrosOk && temLinhas && csv, reason: !csv ? 'saída CSV não prevista' : (!parametrosOk ? parametroReason : 'sem linhas na prévia') },
    { label: 'Exportar PDF', enabled: parametrosOk && temLinhas && pdf, reason: !pdf ? 'saída PDF não prevista' : (!parametrosOk ? parametroReason : 'sem linhas na prévia') },
  ]
}

function adminActions(row) {
  const ativo = row.estado === 'Ativo'
  const usuarioAtual = row.atual === 'sim'
  const protegido = row.protegido !== 'não'
  const convite = row.autenticacao === 'convite eletrônico'

  return [
    { label: 'Criar convite', enabled: true },
    { label: 'Inativar usuário', enabled: ativo && !usuarioAtual && !protegido, reason: !ativo ? 'usuário já inativo' : (usuarioAtual ? 'não pode inativar a própria conta' : 'conta protegida') },
    { label: 'Redefinir acesso', enabled: ativo && convite, reason: !ativo ? 'usuário inativo' : 'recuperação externa pelo gov.br' },
  ]
}

const relatorioRecortes = [
  {
    name: 'Todos',
    sort: [{ field: 'familia' }, { field: 'nome' }],
    groupBy: 'familia',
    columns: ['id', 'nome', 'familia', 'filtros', 'saida', 'linhas', 'ultima'],
  },
  {
    name: 'Volumes',
    filters: [{ field: 'familia', op: 'eq', value: 'Volumes' }],
    sort: [{ field: 'nome' }],
    columns: ['id', 'nome', 'familia', 'filtros', 'saida', 'linhas', 'ultima'],
  },
  {
    name: 'Saúde cadastral',
    filters: [{ field: 'familia', op: 'eq', value: 'Saúde cadastral' }],
    sort: [{ field: 'nome' }],
    columns: ['id', 'nome', 'familia', 'filtros', 'saida', 'linhas', 'ultima'],
  },
  {
    name: 'Telemetria',
    filters: [{ field: 'familia', op: 'eq', value: 'Telemetria' }],
    sort: [{ field: 'nome' }],
    columns: ['id', 'nome', 'familia', 'filtros', 'saida', 'linhas', 'ultima'],
  },
  {
    name: 'Fiscalização',
    filters: [{ field: 'familia', op: 'eq', value: 'Fiscalização' }],
    sort: [{ field: 'nome' }],
    columns: ['id', 'nome', 'familia', 'filtros', 'saida', 'linhas', 'ultima'],
  },
]

const adminRecortes = [
  {
    name: 'Usuários',
    sort: [{ field: 'perfil' }, { field: 'nome' }],
    groupBy: 'perfil',
    columns: ['id', 'nome', 'perfil', 'estado', 'autenticacao', 'ultimo', 'ato'],
  },
  {
    name: 'Perfis',
    sort: [{ field: 'perfil' }, { field: 'nome' }],
    groupBy: 'perfil',
    columns: ['id', 'nome', 'perfil', 'estado', 'autenticacao'],
  },
  {
    name: 'Trilha de auditoria',
    sort: [{ field: 'ultimo', dir: 'desc' }],
    groupBy: 'ato',
    columns: ['id', 'nome', 'perfil', 'estado', 'ultimo', 'ato'],
  },
  {
    name: 'Sessões',
    filters: [{ field: 'ultimo', op: 'present' }],
    sort: [{ field: 'ultimo', dir: 'desc' }],
    groupBy: 'estado',
    columns: ['id', 'nome', 'perfil', 'estado', 'autenticacao', 'ultimo'],
  },
]

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Page><Dashboard /></Page>} />
      <Route path="/usos" element={<Page><Usos /></Page>} />
      <Route path="/mapa" element={<Page><Usos defaultIndexView="Mapa" defaultPanelMode="closed" /></Page>} />
      <Route path="/outorgados" element={<Page><Outorgados /></Page>} />
      <Route path="/portarias" element={<Page><Portarias /></Page>} />
      <Route path="/justificativas" element={<Page><Justificativas /></Page>} />
      <Route path="/apontamentos" element={<Page><Apontamentos /></Page>} />
      <Route path="/processos" element={<Page><Processos /></Page>} />
      <Route path="/autos" element={<Navigate to="/processos" replace />} />
      <Route path="/multas" element={<Navigate to="/processos" replace />} />
      <Route path="/relatorios" element={<Page><GenericTable dataset="relatorios" title="Relatórios" meta="consultas exportáveis" rows={relatorios} columns={[
        { key: 'id', label: 'ID' },
        { key: 'nome', label: 'Relatório' },
        { key: 'familia', label: 'Família' },
        { key: 'filtros', label: 'Filtros' },
        { key: 'saida', label: 'Saída' },
        { key: 'linhas', label: 'Linhas', num: true },
        { key: 'ultima', label: 'Última geração' },
      ]} tabs={['Parâmetros', 'Prévia', 'Gerações', 'Auditoria']} recortes={relatorioRecortes} recordActions={reportActions} /></Page>} />
      <Route path="/admin" element={<Page><GenericTable dataset="acessos" title="Administração" meta="acessos e auditoria" rows={acessos} columns={[
        { key: 'id', label: 'Usuário' },
        { key: 'nome', label: 'Nome' },
        { key: 'perfil', label: 'Perfil' },
        { key: 'estado', label: 'Estado' },
        { key: 'autenticacao', label: 'Autenticação' },
        { key: 'ultimo', label: 'Último acesso' },
        { key: 'ato', label: 'Último ato' },
      ]} tabs={['Conta', 'Permissões', 'Sessões', 'Auditoria']} recortes={adminRecortes} recordActions={adminActions} /></Page>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
