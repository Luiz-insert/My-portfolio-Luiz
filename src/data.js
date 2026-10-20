// Edite aqui o conteúdo do portfólio.
export const profile = {
  name: 'Luiz Gusttavo',
  fullName: 'Luiz Gusttavo Teixeira Braga',
  role: 'Full-Stack Developer',
  bio: 'Crio soluções web end-to-end, automações e integrações de sistemas. Do front-end à infraestrutura, com foco em arquiteturas escaláveis.',
  photo: `${import.meta.env.BASE_URL}img/77738183.jpeg`,
  email: 'Lgusttavo29@gmail.com',
  location: 'Ibirité, MG',
}

export const nav = [
  { label: 'Sobre e Contato', href: '#sobre' },
  { label: 'Vitrine', href: '#vitrine' },
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Formação', href: '#formacao' },
]

export const stats = [
  { value: '3+', label: 'Anos de experiência corporativa' },
  { value: '04', label: 'Projetos na vitrine' },
  { value: '31', label: 'Cursos na Alura' },
]

export const about =
  'Full Stack focado em soluções web end-to-end, automação (RPA) e integrações. Experiência corporativa em dados e inteligência de mercado, com Cloud/DevOps para arquiteturas escaláveis.'

export const showcase = [
  {
    name: 'AutoSegment',
    description:
      'Hub de automação assíncrono: plataforma multi-tenant em nuvem que orquestra processos automatizados em servidores dedicados, com controle do ciclo de vida (iniciar, pausar, editar parâmetros) e monitoramento de status em tempo real.',
    skills: ['React', 'Node.js', 'Python', 'Docker', 'AWS', 'MongoDB (NoSQL)'],
    url: 'https://interface.coddara.com/autosegment/',
  },
  {
    name: 'Spotify Card',
    description: 'Forma simples de consumir a API do Spotify: ao fazer login, retorna as músicas mais escutadas pelo usuário.',
    skills: ['JavaScript', 'HTML', 'CSS'],
    url: 'https://spotify-card-livid.vercel.app/',
  },
  {
    name: 'Coddara Analytics',
    description:
      'Plataforma de web analytics open source, nos moldes do Vercel Analytics e do PostHog: basta colar o script no site. Coleta assíncrona de navegação e dashboards com métricas de visitas, conversão e estabilidade.',
    skills: ['JavaScript', 'Node.js', 'PostgreSQL (SQL)'],
    url: 'https://analytics.coddara.com/',
  },
  {
    name: 'ZapCharge',
    description: 'Landing page fictícia de um produto fictício de carros elétricos, criada para demonstrar habilidade na construção de páginas únicas.',
    skills: ['HTML', 'CSS', 'JavaScript'],
    url: '#', // TODO: trocar pela URL do ZapCharge
  },
]

export const experience = [
  {
    period: 'Ago 2025 — Atual',
    role: 'Desenvolvedor — Inteligência de Mercado',
    company: 'Grupo Inova · John Deere',
    points: [
      'WebApps em Node.js (Express) e React.js para democratizar e escalar, com segurança, o uso de ferramentas internas de inteligência de mercado.',
      'Rotinas de backend (Python/C#) para extração, tratamento massivo e transformação de dados corporativos, consumindo APIs RESTful e Webhooks.',
      'Hiperautomação (RPA) e processamento de imagens/documentos com OCR, ganhando eficiência em rotinas críticas.',
    ],
  },
  {
    period: 'Nov 2022 — 2025',
    role: 'Assistente de Telemetria — Agricultura de Precisão',
    company: 'Grupo Inova · John Deere',
    points: [
      'Ingestão e análise contínua de dados IoT de equipamentos de agricultura de precisão, gerando oportunidades de otimização e redução de custos.',
      'Scripts em Python e C# para automação de interfaces web e rotinas corporativas.',
      'Rotinas em background para validação contínua da saúde dos equipamentos de telemetria.',
    ],
  },
  {
    period: '6 meses',
    role: 'Estagiário de Telemetria — Agricultura de Precisão',
    company: 'Grupo Inova · John Deere',
    points: [
      'Robôs e scripts em Python para processar regras de negócio e disparar alertas e e-mails corporativos.',
      'Consumo de APIs de telemetria para monitorar performance e antecipar falhas sistêmicas.',
    ],
  },
]

export const skills = [
  { group: 'Automação e Programação', items: ['Python', 'C# + .NET', 'Power Automate', 'UiPath'] },
  { group: 'Desenvolvimento Web', items: ['JavaScript', 'HTML', 'CSS', 'React', 'Next.js', 'Node.js', 'Express', 'FastAPI'] },
  { group: 'Banco de Dados', items: ['PostgreSQL (SQL)', 'MongoDB (NoSQL)'] },
  { group: 'Cloud e Infraestrutura', items: ['AWS', 'Docker', 'Azure DevOps', 'GitHub Actions'] },
  { group: 'UI/UX Design', items: ['Figma'] },
]

export const education = [
  { title: 'Análise e Desenvolvimento de Sistemas', place: 'FIAP', note: 'Cursando · Ensino Superior' },
  { title: 'Técnico em Mecatrônica', place: 'Centro 4.0 · Senai Euvaldo Lodi', note: 'Ensino Técnico' },
  { title: 'Alura · 31 cursos', place: 'Front-End, Back-End, DevOps, Data Science', note: 'Cursos relevantes' },
  { title: 'OneBitCode', place: 'FullStack Developer', note: 'Cursos relevantes' },
]

export const languages = ['Português — Nativo', 'Inglês — Básico', 'CNH B (Carros)']

export const contacts = [
  { label: 'GitHub', url: 'https://github.com/Luiz-insert', icon: `${import.meta.env.BASE_URL}img/github-brands.svg` },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/', icon: `${import.meta.env.BASE_URL}img/linkedin-brands.svg` },
  { label: 'WhatsApp', url: 'https://wa.me/5531999036769', icon: `${import.meta.env.BASE_URL}img/whatsapp-brands.svg` },
]
