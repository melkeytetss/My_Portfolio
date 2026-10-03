import projects from "@/data/projects";
import { Link } from "@/types";

// Nav entries that point at a section which isn't rendered. "About" was dropped:
// there is no #about section, and its preview image doesn't exist in the repo
// either. "Projects" hides itself until src/data/projects.tsx has entries, so
// the menu never scrolls to an empty heading.
const HIDE_PROJECTS = projects.length === 0;

const links: Link[] = [
  {
    title: 'Home',
    href: '/',
    thumbnail: '/assets/nav-link-previews/landing.png'
  },
  {
    title: 'Skills',
    href: '/#skills',
    thumbnail: '/assets/nav-link-previews/skills.png'
  },
  ...(HIDE_PROJECTS
    ? []
    : [
        {
          title: 'Projects',
          href: '/#projects',
          thumbnail: '/assets/nav-link-previews/projects.png',
        },
      ]),
  {
    title: 'Contact',
    href: '/#contact',
    thumbnail: '/assets/nav-link-previews/contact.png'
  }
];

export { links };
