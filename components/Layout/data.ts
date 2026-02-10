/* eslint-disable import/prefer-default-export */

import {
  createScoutAction,
  createScoutSection,
  createScoutPage,
} from 'scoutbar';
import PROJECTS_DATA from '../AppData/projects';

export const actions = (theme: () => void) => [
  createScoutAction({
    label: 'Accueil',
    href: '/',
    keyboardShortcut: ['h'],
  }),

  createScoutAction({
    label: 'À propos',
    href: '/#about',
    keyboardShortcut: ['a'],
  }),

  createScoutAction({
    label: 'Contact',
    href: '/#contact',
    keyboardShortcut: ['c'],
  }),

  createScoutAction({
    label: 'Projets',
    href: '/#projects',
    keyboardShortcut: ['p'],
  }),

  createScoutSection({
    label: 'BY Codewonders',

    children: [
      createScoutPage({
        label: 'Projects',
        children: PROJECTS_DATA.map((project) =>
          createScoutAction({
            label: project.title,
            href: project.link,
            description: project.description,
            icon: project.imageUrl,
          })
        ),
      }),
    ],
  }),

  createScoutSection({
    label: 'Preference',

    children: [
      createScoutAction({
        label: 'Change Theme',
        action: () => theme(),
        keyboardShortcut: ['meta', 'l'],
      }),
    ],
  }),
];
