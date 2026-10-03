const config = {
  // TODO: replace the placeholder copy below with real bio/keyword content.
  // "Full-Stack Developer" is a guess — tell me your actual title and I'll set it.
  title: "Milcky Jhones Y. Francisco | Full-Stack Developer",
  description: {
    long: "Portfolio of Milcky Jhones Y. Francisco — a developer building web applications. Browse projects, skills, and experience, and get in touch.",
    short:
      "Portfolio of Milcky Jhones Y. Francisco — projects, skills, and contact.",
  },
  keywords: [
    "Milcky Francisco",
    "portfolio",
    "full-stack developer",
    "web development",
    "web design",
    "React",
    "Next.js",
    "TypeScript",
    "GSAP",
    "Spline",
  ],
  author: "Milcky Jhones Y. Francisco",
  // TODO: REQUIRED before deploy. Left as a deliberately undeliverable address so
  // contact-form submissions can never reach the original template author.
  // Every message from /api/send goes to this value.
  email: "you@example.com",
  // TODO: replace with the real deployment origin. Drives canonical URLs, OG
  // tags, sitemap.xml and robots.txt. example.com is RFC 2606 reserved.
  site: "https://example.com",

  // for github stars button
  githubUsername: "melkeytetss",
  githubRepo: "My_Portfolio",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    linkedin: "https://www.linkedin.com/in/milcky-jhones-francisco-a4b201408/",
    instagram: "https://www.instagram.com/melkeytetss",
    facebook: "https://www.facebook.com/melkeytetssss",
    github: "https://github.com/melkeytetss",
  },
};
export { config };
