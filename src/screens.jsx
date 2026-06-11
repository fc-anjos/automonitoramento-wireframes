// Screen registry: single source of truth for routes + the launcher cards.
// `num`/`title`/`blurb` mirror the original index.html launcher copy.
import AppInicio from './screens/app/Inicio.jsx'
import AppCaptacao from './screens/app/Captacao.jsx'
import AppApontamentos from './screens/app/Apontamentos.jsx'
import AppApontamento from './screens/app/Apontamento.jsx'
import AppAutodeclaracao from './screens/app/Autodeclaracao.jsx'
import AppHistorico from './screens/app/Historico.jsx'
import AppSolicitacoes from './screens/app/Solicitacoes.jsx'
import AppJustificativas from './screens/app/Justificativas.jsx'
import AppDefesa from './screens/app/Defesa.jsx'
import AppMultas from './screens/app/Multas.jsx'
import AppMedidor from './screens/app/Medidor.jsx'
import GestorDashboard from './screens/gestor/Dashboard.jsx'
import GestorMapa from './screens/gestor/Mapa.jsx'
import GestorPontos from './screens/gestor/Pontos.jsx'
import GestorDetalhe from './screens/gestor/Detalhe.jsx'
import GestorApontamentos from './screens/gestor/Apontamentos.jsx'
import GestorApontamento from './screens/gestor/Apontamento.jsx'
import GestorSolicitacoes from './screens/gestor/Solicitacoes.jsx'
import GestorJustificativas from './screens/gestor/Justificativas.jsx'
import GestorAcessos from './screens/gestor/Acessos.jsx'
import GestorOutorgados from './screens/gestor/Outorgados.jsx'
import GestorProcesso from './screens/gestor/Processo.jsx'
import GestorMultas from './screens/gestor/Multas.jsx'
import GestorRelatorios from './screens/gestor/Relatorios.jsx'
import GestorAuditoria from './screens/gestor/Auditoria.jsx'
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
  { id: 'app-inicio', surface: 'app', num: 'APP · 01', path: '/app/inicio', title: 'Início', blurb: 'Aterrissagem fina de situação sobre a barra de recursos: identidade, prazos e atalhos. Não é central de ações.', Component: AppInicio },
  { id: 'app-apontamentos', surface: 'app', num: 'APP · 02', path: '/app/apontamentos', title: 'Apontamentos', blurb: 'O índice do outorgado: pendências, prazos de ciência e status de resposta dos seus apontamentos.', Component: AppApontamentos },
  { id: 'app-apontamento', surface: 'app', num: 'APP · 03', path: '/app/apontamento', title: 'Apontamento', blurb: 'A ficha do lado de quem responde: fases, prazo da ciência e verbos de resposta (justificar, anexar, comprovar).', Component: AppApontamento },
  { id: 'app-autodeclaracao', surface: 'app', num: 'APP · 04', path: '/app/autodeclaracao', title: 'Declaração', blurb: 'Autodeclaração por período: leitura por medidor com Tipos de Declaração, caixa Medidor Zerado e status Registrado.', Component: AppAutodeclaracao },
  { id: 'app-historico', surface: 'app', num: 'APP · 05', path: '/app/historico', title: 'Histórico', blurb: 'Consulta dos Dados Declarados em grade: leitura, protocolo, cadastro, medidor, volume diário, tipo e status Registrado.', Component: AppHistorico },
  { id: 'app-captacao', surface: 'app', num: 'APP · 06', path: '/app/captacao', title: 'Captação', blurb: 'Telemetria do grande usuário: três séries Captado · Outorgado · Permitido, Estado de Vazão e Situação da Transmissão.', Component: AppCaptacao },
  { id: 'app-solicitacoes', surface: 'app', num: 'APP · 07', path: '/app/solicitacoes', title: 'Solicitações', blurb: 'Catálogo de pedidos e índice das minhas solicitações: outorga, equipamento e interligação à telemetria (COT-R).', Component: AppSolicitacoes },
  { id: 'app-justificativas', surface: 'app', num: 'APP · 08', path: '/app/justificativas', title: 'Justificativas', blurb: 'Abrir e acompanhar a justificativa de ausência de declaração: Aguardando avaliação, Aprovado, Reprovado.', Component: AppJustificativas },
  { id: 'app-defesa', surface: 'app', num: 'APP · 09', path: '/app/defesa', title: 'Defesa e recurso', blurb: 'O processo sancionador do lado do outorgado: ciência, defesa no prazo, recurso sem efeito suspensivo e cumprimento.', Component: AppDefesa },
  { id: 'app-multas', surface: 'app', num: 'APP · 10', path: '/app/multas', title: 'Multas', blurb: 'Pagar multas do processo sancionador: linha digitável, PIX, vencimento e vínculo ao processo. Única receita do sistema.', Component: AppMultas },
  { id: 'app-medidor', surface: 'app', num: 'APP · 11', path: '/app/medidor', title: 'Medidor', blurb: 'Cadastro e ciclo de vida do equipamento pelo outorgado: vários por captação, troca por remover/reinstalar, desativação sem apagar.', Component: AppMedidor },

  { id: 'gestor-dashboard', surface: 'gestor', num: 'GESTOR · 01', path: '/gestor/dashboard', title: 'Dashboard de fiscalização', blurb: 'Panorama por exceção: apontamentos, processos, volume captado × outorgado e recorte por sub-bacia.', Component: GestorDashboard },
  { id: 'gestor-mapa', surface: 'gestor', num: 'GESTOR · 02', path: '/gestor/mapa', title: 'Mapa georreferenciado', blurb: 'A mesma lista de pontos como lente geográfica: pino pelo pior apontamento aberto sobre cada ponto.', Component: GestorMapa },
  { id: 'gestor-pontos', surface: 'gestor', num: 'GESTOR · 03', path: '/gestor/pontos', title: 'Pontos / outorgas', blurb: 'O índice da outorga: grade larga do cadastro espelhado do SOE, com situação pelo apontamento mais grave.', Component: GestorPontos },
  { id: 'gestor-detalhe', surface: 'gestor', num: 'GESTOR · 04', path: '/gestor/detalhe', title: 'Detalhe do ponto / outorgado', blurb: 'A ficha da outorga, em abas por faceta: Identidade, Medição e volumes, Telemetria, Medidores, Declaração, Apontamentos.', Component: GestorDetalhe },
  { id: 'gestor-apontamentos', surface: 'gestor', num: 'GESTOR · 05', path: '/gestor/apontamentos', title: 'Apontamentos', blurb: 'O índice da fila: grade larga ordenável por natureza, tipo, grau, fase, prazo e ponto.', Component: GestorApontamentos },
  { id: 'gestor-apontamento', surface: 'gestor', num: 'GESTOR · 06', path: '/gestor/apontamento', title: 'Apontamento (gestor)', blurb: 'A ficha do apontamento: campos rotulados, linha do tempo das 9 fases e verbos de disposição do gestor.', Component: GestorApontamento },
  { id: 'gestor-solicitacoes', surface: 'gestor', num: 'GESTOR · 07', path: '/gestor/solicitacoes', title: 'Solicitações', blurb: 'Uma fila de despacho: pedidos do outorgado sobre outorga, equipamento e canal, com os verbos do gestor.', Component: GestorSolicitacoes },
  { id: 'gestor-justificativas', surface: 'gestor', num: 'GESTOR · 08', path: '/gestor/justificativas', title: 'Justificativas', blurb: 'Fila própria de avaliação das justificativas de ausência de declaração: Aguardando avaliação, Aprovado, Reprovado.', Component: GestorJustificativas },
  { id: 'gestor-processo', surface: 'gestor', num: 'GESTOR · 09', path: '/gestor/processo', title: 'Processo sancionador', blurb: 'A ficha do processo: enquadramento, rito de 9 fases com prazos, evidência congelada e penalidade.', Component: GestorProcesso },
  { id: 'gestor-multas', surface: 'gestor', num: 'GESTOR · 10', path: '/gestor/multas', title: 'Multas', blurb: 'O livro de multas do processo sancionador: processo, outorgado, valor, vencimento e situação. Única receita do sistema.', Component: GestorMultas },
  { id: 'gestor-outorgados', surface: 'gestor', num: 'GESTOR · 11', path: '/gestor/outorgados', title: 'Outorgados', blurb: 'A base de usuários do aplicativo: contas de outorgado por CNPJ/CPF, vinculadas ao ponto. Distinta do cadastro da outorga e do acesso interno.', Component: GestorOutorgados },
  { id: 'gestor-acessos', surface: 'gestor', num: 'GESTOR · 12', path: '/gestor/acessos', title: 'Acessos', blurb: 'Acesso interno da equipe SP-Águas: contas internas, perfis de permissão e credenciais, com atos rastreáveis na trilha.', Component: GestorAcessos },
  { id: 'gestor-relatorios', surface: 'gestor', num: 'GESTOR · 13', path: '/gestor/relatorios', title: 'Relatórios e exportações', blurb: 'Catálogo de cortes exportáveis: saúde cadastral em tabela, fiscalização, volumes e consolidações.', Component: GestorRelatorios },
  { id: 'gestor-auditoria', surface: 'gestor', num: 'GESTOR · 14', path: '/gestor/auditoria', title: 'Auditoria', blurb: 'A trilha imutável como tela própria: todo ato de disposição e evento do sistema, com quem, quando e qual ato.', Component: GestorAuditoria },

  { id: 'portal-publico', surface: 'portal', num: 'PORTAL · 01', path: '/portal/publico', title: 'Transparência da bacia', blurb: 'Indicadores agregados de uso, finalidade, mapa público e dados abertos, sem expor dados pessoais (LGPD).', Component: PortalPublico },
]

export const screensBySurface = (surfaceId) => SCREENS.filter((s) => s.surface === surfaceId)
