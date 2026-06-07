// Screen registry: single source of truth for routes + the launcher cards.
// `num`/`title`/`blurb` mirror the original index.html launcher copy.
import AppPainel from './screens/app/Painel.jsx'
import AppTelemetria from './screens/app/Telemetria.jsx'
import AppApontamentos from './screens/app/Apontamentos.jsx'
import AppApontamento from './screens/app/Apontamento.jsx'
import AppAutodeclaracao from './screens/app/Autodeclaracao.jsx'
import AppConfirmacao from './screens/app/Confirmacao.jsx'
import AppSolicitacoes from './screens/app/Solicitacoes.jsx'
import GestorDashboard from './screens/gestor/Dashboard.jsx'
import GestorMapa from './screens/gestor/Mapa.jsx'
import GestorPontos from './screens/gestor/Pontos.jsx'
import GestorDetalhe from './screens/gestor/Detalhe.jsx'
import GestorApontamentos from './screens/gestor/Apontamentos.jsx'
import GestorApontamento from './screens/gestor/Apontamento.jsx'
import GestorSolicitacoes from './screens/gestor/Solicitacoes.jsx'
import GestorIngestao from './screens/gestor/Ingestao.jsx'
import GestorCadastro from './screens/gestor/Cadastro.jsx'
import PortalPublico from './screens/portal/Publico.jsx'

export const SURFACES = [
  {
    id: 'app',
    pill: 'mobile',
    heading: '1 · Aplicativo próprio unificado · usuário outorgado',
    blurb: 'Um único app, duas experiências sobre a mesma base. Grandes usuários (Faixa A) acompanham telemetria; pequenos/médios (Faixas B/C) fazem autodeclaração com foto e geolocalização.',
    grid: 4,
  },
  {
    id: 'gestor',
    pill: 'web',
    heading: '2 · Plataforma de consolidação, acompanhamento e alerta · gestor',
    blurb: 'Ferramenta interna de fiscalização da SP-Águas. Base única consolidando telemetria + autodeclaração (substitui SiDeCC / SiDeCC-R).',
    grid: 3,
  },
  {
    id: 'portal',
    pill: 'web · LGPD',
    heading: '3 · Portal público de transparência',
    blurb: 'Superfície pública, dados agregados, sem expor dados pessoais do outorgado.',
    grid: 3,
  },
]

export const SCREENS = [
  { id: 'app-painel', surface: 'app', num: 'APP · 01', path: '/app/painel', title: 'Início', blurb: 'Home roteada por porte: identidade da outorga, status e atalho para o fluxo correto.', Component: AppPainel },
  { id: 'app-telemetria', surface: 'app', num: 'APP · 02', path: '/app/telemetria', title: 'Captação', blurb: 'Telemetria (grandes usuários): série medido × outorgado, vazão e status do equipamento.', Component: AppTelemetria },
  { id: 'app-apontamentos', surface: 'app', num: 'APP · 03', path: '/app/apontamentos', title: 'Apontamentos', blurb: 'Lista dos apontamentos do outorgado: pendências, prazos de ciência e status de resposta.', Component: AppApontamentos },
  { id: 'app-apontamento', surface: 'app', num: 'APP · 04', path: '/app/apontamento', title: 'Apontamento', blurb: 'Um apontamento do lado de quem responde: tipagem, fases, prazo da ciência e verbos de resposta.', Component: AppApontamento },
  { id: 'app-autodeclaracao', surface: 'app', num: 'APP · 05', path: '/app/autodeclaracao', title: 'Autodeclaração', blurb: 'Pequenos/médios: leitura do hidrômetro, modo offline, geolocalização e foto.', Component: AppAutodeclaracao },
  { id: 'app-confirmacao', surface: 'app', num: 'APP · 06', path: '/app/confirmacao', title: 'Histórico', blurb: 'Comprovante de envio, declarações anteriores e pendências em atraso.', Component: AppConfirmacao },
  { id: 'app-solicitacoes', surface: 'app', num: 'APP · 07', path: '/app/solicitacoes', title: 'Solicitações', blurb: 'Renovação antes do vencimento e catálogo de pedidos: ampliação, redução, transferência, dispensa, desativação.', Component: AppSolicitacoes },

  { id: 'gestor-dashboard', surface: 'gestor', num: 'GESTOR · 01', path: '/gestor/dashboard', title: 'Dashboard de fiscalização', blurb: 'KPIs e painéis por usuário, sub-bacia, município, finalidade e faixa de VM.', Component: GestorDashboard },
  { id: 'gestor-mapa', surface: 'gestor', num: 'GESTOR · 02', path: '/gestor/mapa', title: 'Mapa georreferenciado', blurb: 'UGRHI-07 + sub-bacias + pontos de captação (pontos de exemplo).', Component: GestorMapa },
  { id: 'gestor-pontos', surface: 'gestor', num: 'GESTOR · 03', path: '/gestor/pontos', title: 'Pontos / outorgas', blurb: 'Lista filtrável de pontos e outorgas: usuário, sub-bacia, finalidade, faixa de VM e status.', Component: GestorPontos },
  { id: 'gestor-detalhe', surface: 'gestor', num: 'GESTOR · 04', path: '/gestor/detalhe', title: 'Detalhe do ponto / outorgado', blurb: 'Outorga, fonte, VM outorgado × medido, série temporal e equipamento.', Component: GestorDetalhe },
  { id: 'gestor-apontamentos', surface: 'gestor', num: 'GESTOR · 05', path: '/gestor/apontamentos', title: 'Apontamentos', blurb: 'Fila de apontamentos a partir das regras: excesso de volume, ausência de transmissão, fraude, vazão reversa.', Component: GestorApontamentos },
  { id: 'gestor-apontamento', surface: 'gestor', num: 'GESTOR · 06', path: '/gestor/apontamento', title: 'Apontamento (gestor)', blurb: 'A mesma peça do lado de quem dispõe: fases, trilha de auditoria e verbos do gestor (notificar, autuar, julgar, encerrar).', Component: GestorApontamento },
  { id: 'gestor-solicitacoes', surface: 'gestor', num: 'GESTOR · 07', path: '/gestor/solicitacoes', title: 'Solicitações', blurb: 'Fila de pedidos do outorgado: renovação, ampliação, redução, transferência, dispensa e desativação.', Component: GestorSolicitacoes },
  { id: 'gestor-ingestao', surface: 'gestor', num: 'GESTOR · 08', path: '/gestor/ingestao', title: 'Ingestão & qualidade de dados', blurb: 'Estados recebido / validado / consolidado; limites físicos e continuidade de série.', Component: GestorIngestao },
  { id: 'gestor-cadastro', surface: 'gestor', num: 'GESTOR · 09', path: '/gestor/cadastro', title: 'Cadastro & administração', blurb: 'Registro de outorgas, usuários e trilhas de auditoria.', Component: GestorCadastro },

  { id: 'portal-publico', surface: 'portal', num: 'PORTAL · 01', path: '/portal/publico', title: 'Transparência da bacia', blurb: 'Indicadores agregados de uso, mapa público e dados abertos para download.', Component: PortalPublico },
]

export const screensBySurface = (surfaceId) => SCREENS.filter((s) => s.surface === surfaceId)
