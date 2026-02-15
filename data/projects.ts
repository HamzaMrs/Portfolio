const PROJECTS_DATA = [
  {
    title: 'Cloudify',
    description: 'Plateforme de location de nuages en temps réel avec visualisation cartographique (projet absurde).',
    about:
      'Cloudify est une application full-stack microservices permettant de louer des nuages virtuels (Cumulonimbus, Stratus, Cirrus) avec authentification JWT, suivi en temps réel et interface cartographique interactive. Architecture 4-tiers conteneurisée avec Docker.',
    imageUrl: '/Videos/Cloudify.mov',
    github: 'https://github.com/HamzaMrs/Cloudify',
    technologies: [
      'React',
      'TypeScript',
      'Node.js',
      'Express',
      'MySQL',
      'Docker',
      'Tailwind CSS',
      'Leaflet',
      'JWT',
      'Vite'
    ],
  },
  {
    title: 'Streamza',
    description: 'Site de streaming style Netflix avec recherche, favoris et bandes-annonces intégrées.',
    about:
      'Streamza est une application web inspirée de Netflix, développée en JavaScript Vanilla avec l\'API TMDB. Fonctionnalités : découverte de films tendances et populaires, recherche par titre, système de favoris en localStorage, lecteur de trailers YouTube, personnalisation de thème, et hero slider avec parallax.',
    link: 'https://hamzamrs.github.io/Streamza/',
    imageUrl: '/Videos/Streamza.mov',
    github: 'https://github.com/HamzaMrs/Streamza',
    technologies: [
      'JavaScript',
      'HTML',
      'CSS',
      'TMDB API'
    ],
  },
  {
    title: 'StreamzaX',
    description: 'Application web de découverte de films avec recherche, favoris et lecteur de bandes-annonces.',
    about:
      'StreamzaX est une plateforme de streaming moderne intégrant l\'API TMDB pour explorer des films tendances, populaires, mieux notés et à venir. Fonctionnalités : système de favoris, recherche en temps réel, visualisation de bandes-annonces YouTube, et architecture React avec hooks personnalisés et Context API.',
    github: 'https://github.com/HamzaMrs/StreamzaX',
    imageUrl: '/Videos/StreamzaX.mov',
    technologies: [
      'React',
      'JavaScript',
      'CSS',
      'Vite',
      'TMDB API',
      'TypeScript'
    ],
  },
  {
    title: 'Kanban',
    description: 'Application de gestion de tâches avec drag & drop et multi-tableaux.',
    github: 'https://github.com/HamzaMrs/Kanban',
    about:
      'Kanban est une application de gestion de projet construite avec React et Redux Toolkit. Fonctionnalités : création de multiples tableaux (boards), CRUD complet sur tâches et colonnes, système de sous-tâches avec progression, drag & drop intuitif entre colonnes, gestion des statuts, et interface responsive avec mode sombre.',
    link: 'https://HamzaMrs.github.io/Kanban',
    imageUrl: '/Videos/Kanban.mov',
    technologies: [
      'React',
      'Redux Toolkit',
      'JavaScript',
      'CSS',
      'UUID'
    ],
  },
];

export default PROJECTS_DATA;
