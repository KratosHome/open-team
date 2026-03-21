export interface ProjectRole {
  title: string;
  rate: number;
}

export interface ProjectTeamMember {
  id: string;
  initials: string;
  color: string;
}

export interface Project {
  id: string;
  title: string;
  status: string;
  tags: string[];
  description: string;
  techStack: string[];
  seekingRoles: ProjectRole[];
  funding: {
    current: number;
    target: number;
  };
  badges: {
    type: 'MVP' | 'Beta' | 'Live';
    complexity: 'Simple' | 'Medium' | 'Advanced';
    deadline: string;
  };
  stats: {
    daysLeft: number;
    openRoles: number;
  };
  team: ProjectTeamMember[];
}

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'EcoTrack',
    status: 'Активний',
    tags: ['Соціальний', 'Mobile App', 'Некомерційний'],
    description:
      'Щоденне відстеження екологічного впливу — вуглецевий слід, споживання ресурсів та заохочення сталих звичок через гейміфікацію.',
    techStack: ['React Native', 'Node.js'],
    seekingRoles: [
      { title: 'Frontend Dev', rate: 15000 },
      { title: 'UI/UX Designer', rate: 12000 },
    ],
    funding: {
      current: 4530,
      target: 40000,
    },
    badges: {
      type: 'MVP',
      complexity: 'Medium',
      deadline: 'Q3 2026',
    },
    stats: {
      daysLeft: 12,
      openRoles: 2,
    },
    team: [
      { id: '1', initials: 'ОК', color: 'bg-blue-500' },
      { id: '2', initials: 'ДЦ', color: 'bg-purple-500' },
      { id: '3', initials: 'АП', color: 'bg-emerald-500' },
    ],
  },
  {
    id: '2',
    title: 'MindMap AI',
    status: 'Активний',
    tags: ['AI Tool', 'EdTech', 'SaaS'],
    description:
      'AI автоматично будує ментальні карти з будь-якого тексту: лекцій, нотаток, статей — допомагає засвоювати знання набагато швидше.',
    techStack: ['Python', 'OpenAI', 'React'],
    seekingRoles: [
      { title: 'ML Engineer', rate: 32000 },
      { title: 'Frontend Dev', rate: 18000 },
    ],
    funding: {
      current: 7200,
      target: 45000,
    },
    badges: {
      type: 'Beta',
      complexity: 'Advanced',
      deadline: 'Q2 2026',
    },
    stats: {
      daysLeft: 8,
      openRoles: 2,
    },
    team: [
      { id: '4', initials: 'АМ', color: 'bg-blue-600' },
      { id: '5', initials: 'БК', color: 'bg-purple-600' },
    ],
  },
  {
    id: '3',
    title: 'FarmLink',
    status: 'Активний',
    tags: ['AgriTech', 'Marketplace', 'Соціальний'],
    description:
      "Прямий зв'язок між фермерами та покупцями — без посередників і переплат. Свіжі продукти від виробника до твого столу.",
    techStack: ['Next.js', 'Node.js', 'MongoDB'],
    seekingRoles: [
      { title: 'Backend Dev', rate: 20000 },
      { title: 'Product Manager', rate: 16000 },
    ],
    funding: {
      current: 11500,
      target: 60000,
    },
    badges: {
      type: 'MVP',
      complexity: 'Medium',
      deadline: 'Q4 2026',
    },
    stats: {
      daysLeft: 21,
      openRoles: 3,
    },
    team: [
      { id: '6', initials: 'РК', color: 'bg-blue-400' },
      { id: '7', initials: 'ОП', color: 'bg-purple-400' },
      { id: '8', initials: 'МВ', color: 'bg-emerald-400' },
    ],
  },
];
