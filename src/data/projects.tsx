import AceTernityLogo from "@/components/logos/aceternity";
import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight, ExternalLink, Link2, MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
// Spline has no thesvg entry — keep the Three.js mark as its stand-in.
import { SiThreedotjs } from "react-icons/si";
const BASE_PATH = "/assets/projects-screenshots";

// Renders a brand SVG from /public as a monochrome glyph that inherits the
// surrounding text color (the skill dock styles every icon via currentColor),
// so full-color marks like Mistral flatten to match the rest of the set.
const MaskIcon = ({ src, title }: { src: string; title?: string }) => (
  <span
    role="img"
    aria-label={title}
    className="block bg-current"
    style={{
      width: "1em",
      height: "1em",
      WebkitMaskImage: `url(${src})`,
      maskImage: `url(${src})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
    }}
  />
);

const ProjectsLinks = ({ live, repo }: { live?: string; repo?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      {live && live !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={live}
        >
          <Button variant={"default"} size={"sm"}>
            Visit Website
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
      {repo && repo !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={repo}
        >
          <Button variant={"default"} size={"sm"}>
            Github
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};
// Brand chips sourced from thesvg CLI mono SVGs in /public/assets/logos,
// rendered via MaskIcon so each one inherits the dock's currentColor.
const brand = (title: string, file: string): Skill => ({
  title,
  bg: "black",
  fg: "white",
  icon: <MaskIcon src={`/assets/logos/${file}`} title={title} />,
});
const PROJECT_SKILLS = {
  next: brand("Next.js", "nextdotjs-mono.svg"),
  chakra: brand("Chakra UI", "chakra-ui-mono.svg"),
  node: brand("Node.js", "nodedotjs-mono.svg"),
  python: brand("Python", "python-mono.svg"),
  prisma: brand("Prisma", "prisma-mono.svg"),
  postgres: brand("PostgreSQL", "postgresql-mono.svg"),
  mongo: brand("MongoDB", "mongodb-mono.svg"),
  express: brand("Express", "express-mono.svg"),
  reactQuery: brand("React Query", "react-query-mono.svg"),
  shadcn: brand("shadcn/ui", "shadcn-ui-mono.svg"),
  // Not in the thesvg registry — keep the existing custom logo.
  aceternity: {
    title: "Aceternity",
    bg: "black",
    fg: "white",
    icon: <AceTernityLogo />,
  },
  tailwind: brand("Tailwind", "tailwind-css-mono.svg"),
  docker: brand("Docker", "docker-mono.svg"),
  // Not in the thesvg registry — keep the text mark.
  yjs: {
    title: "Y.js",
    bg: "black",
    fg: "white",
    icon: (
      <span>
        <strong>Y</strong>js
      </span>
    ),
  },
  firebase: brand("Firebase", "firebase-mono.svg"),
  // Firestore and Cloud Functions have no registry marks — text marks, same
  // treatment as the other non-registry brands above.
  firestore: {
    title: "Firestore",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">Fs</span>,
  },
  cloudFunctions: {
    title: "Cloud Functions",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">CF</span>,
  },
  sockerio: brand("Socket.io", "socketdotio-mono.svg"),
  js: brand("JavaScript", "javascript-mono.svg"),
  ts: brand("TypeScript", "typescript-mono.svg"),
  vue: brand("Vue.js", "vuedotjs-mono.svg"),
  react: brand("React.js", "react-mono.svg"),
  sanity: brand("Sanity", "sanity-mono.svg"),
  // Not in the thesvg registry — keep the Three.js stand-in.
  spline: {
    title: "Spline",
    bg: "black",
    fg: "white",
    icon: <SiThreedotjs />,
  },
  gsap: brand("GSAP", "gsap-mono.svg"),
  motion: brand("Motion", "motion.svg"),
  supabase: brand("Supabase", "supabase-mono.svg"),
  trpc: brand("tRPC", "trpc-mono.svg"),
  drizzle: brand("Drizzle ORM", "drizzle-mono.svg"),
  hono: brand("Hono", "hono-mono.svg"),
  redis: brand("Redis / BullMQ", "redis-mono.svg"),
  cloudflare: brand("Cloudflare", "cloudflare-mono.svg"),
  // React Native reuses the React mark.
  reactNative: brand("React Native", "react-mono.svg"),
  betterAuth: brand("Better Auth", "better-auth-mono.svg"),
  // Not in the thesvg registry — keep the text marks.
  zustand: {
    title: "Zustand",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">Zu</span>,
  },
  partykit: {
    title: "PartyKit",
    bg: "black",
    fg: "white",
    icon: <span className="text-base">🎈</span>,
  },
  hocuspocus: {
    title: "Hocuspocus",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">Hp</span>,
  },
  // React Flow ships under the xyflow brand.
  reactFlow: brand("React Flow", "xyflow-mono.svg"),
  codemirror: brand("CodeMirror", "codemirror-mono.svg"),
  // "Satori / sharp" — uses the sharp mark.
  satori: brand("Satori / sharp", "sharp-mono.svg"),
  turborepo: brand("Turborepo", "turborepo-mono.svg"),
  // Vercel AI SDK uses the Vercel mark.
  aiSDK: brand("Vercel AI SDK", "vercel-mono.svg"),
  anthropic: brand("Anthropic Claude", "anthropic-mono.svg"),
  mistral: brand("Mistral AI", "mistral-ai-mono.svg"),
  // Not in the thesvg registry — keep the text mark.
  nextIntl: {
    title: "next-intl",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">i18n</span>,
  },
  // Not in the thesvg registry — keep the text marks.
  expo: {
    title: "Expo",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">Expo</span>,
  },
  // Native Android stack — also not in the registry, same text-mark treatment.
  android: {
    title: "Android",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">An</span>,
  },
  java: {
    title: "Java",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">Java</span>,
  },
  xml: {
    title: "XML",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">XML</span>,
  },
  material: {
    title: "Material Design",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">M</span>,
  },
  mcp: {
    title: "MCP",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">MCP</span>,
  },
};
export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  // Optional card gallery: when 2+ images are given, the card crossfades
  // through them instead of showing `src` statically. `src` stays the poster
  // frame for the reduced-motion / single-image fallback.
  gallery?: string[];
  // Optional CSS backdrop painted when no `bg` wallpaper image exists for this
  // project — a mesh gradient in the reference cards' spirit. Falls back to a
  // neutral dark mesh when omitted.
  bgGradient?: string;
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  live: string;
};

// The template shipped seven of its author's projects. All were removed rather
// than rebranded — presenting his work as yours is not a cosmetic problem. The
// brand chips and helpers above are kept so entries are a drop-in.
//
// To add one: append an object matching `Project`. `id` doubles as the
// wallpaper filename — the card loads /assets/backgrounds/${id}.jpg — so name
// the wallpaper to match or the card renders without one.
const projects: Project[] = [
  {
    id: "smartquiz",
    category: "AI-assisted quiz platform",
    title: "SmartQuiz",
    src: "/assets/projects-screenshots/smartquiz/instructor_dashboard.png",
    screenshots: [
      "instructor_dashboard.png",
      "blooms_taxonomy_analysis.png",
      "blooms_taxonomy_analysis2.png",
      "quiz_review.png",
      "item_analysis.png",
    ],
    gallery: [
      `${BASE_PATH}/smartquiz/instructor_dashboard.png`,
      `${BASE_PATH}/smartquiz/blooms_taxonomy_analysis.png`,
      `${BASE_PATH}/smartquiz/blooms_taxonomy_analysis2.png`,
      `${BASE_PATH}/smartquiz/quiz_review.png`,
      `${BASE_PATH}/smartquiz/item_analysis.png`,
    ],
    // No wallpaper file exists for this project, so the card paints this mesh
    // instead — indigo/violet/cyan over the dashboard's dark navy.
    bgGradient:
      "radial-gradient(120% 90% at 15% 10%, #7c3aed 0%, transparent 55%), " +
      "radial-gradient(100% 90% at 85% 15%, #2563eb 0%, transparent 55%), " +
      "radial-gradient(120% 100% at 80% 90%, #db2777 0%, transparent 55%), " +
      "radial-gradient(100% 100% at 10% 90%, #0891b2 0%, transparent 55%), " +
      "#0f172a",
    skills: {
      frontend: [
        PROJECT_SKILLS.js,
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.tailwind,
      ],
      backend: [PROJECT_SKILLS.python, PROJECT_SKILLS.supabase],
    },
    // Not yet deployed (live: "#") and the repo is private (no github field),
    // so both the Visit and Source buttons hide themselves — no dead links.
    live: "#",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            An AI-assisted quiz creation, Bloom&rsquo;s Taxonomy classification,
            review system, and item analysis platform.
          </TypographyP>
          <TypographyP className="font-mono ">
            SmartQuiz is a web-based quiz management platform for instructors
            that combines AI-assisted quiz creation, Bloom&rsquo;s Taxonomy
            classification, TOS compliance checks, and item analysis in one
            workflow. A FastAPI model service classifies questions into
            Bloom&rsquo;s levels, flags low-confidence items for manual review,
            and helps instructors balance quizzes around the school&rsquo;s
            30/70 LOTS-HOTS requirement. The system also includes quiz analysis
            reports, per-question feedback, PDF export, and a Supabase-backed
            backend for quizzes, attempts, and review data.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">
            AI Bloom&rsquo;s analysis
          </TypographyH3>
          <p className="font-mono mb-2">
            Quiz questions are sent to a Python FastAPI service that classifies
            each item into Bloom&rsquo;s Taxonomy levels and returns
            per-question confidence, thinking order, and review flags — so
            low-confidence classifications surface for instructor review instead
            of silently passing through.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/smartquiz/blooms_taxonomy_analysis.png`,
              `${BASE_PATH}/smartquiz/blooms_taxonomy_analysis2.png`,
            ]}
          />

          <TypographyH3 className="my-4 mt-8">TOS compliance</TypographyH3>
          <p className="font-mono mb-2">
            The results view checks the quiz against the 30% LOTS / 70% HOTS
            Table of Specifications target, making it visible at a glance
            whether a quiz meets the school&rsquo;s required balance before it
            goes out.
          </p>
          <SlideShow images={[`${BASE_PATH}/smartquiz/quiz_review.png`]} />

          <TypographyH3 className="my-4 mt-8">
            Item analysis and review workflow
          </TypographyH3>
          <p className="font-mono mb-2">
            Instructors can review question-level performance, inspect flagged
            items, export Bloom&rsquo;s reports to PDF, and forward analysis
            results for admin review — closing the loop from AI classification
            to approved quiz.
          </p>
          <SlideShow images={[`${BASE_PATH}/smartquiz/item_analysis.png`]} />
        </div>
      );
    },
  },
  {
    id: "buksu-eeu",
    category: "Enterprise Mobile App",
    title: "BUKSU EEU",
    src: "/assets/projects-screenshots/buksu-eeu/landing_page.png",
    screenshots: ["landing_page.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.android,
        PROJECT_SKILLS.java,
        PROJECT_SKILLS.xml,
        PROJECT_SKILLS.material,
      ],
      backend: [
        PROJECT_SKILLS.firebase,
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.firestore,
        PROJECT_SKILLS.cloudFunctions,
      ],
    },
    live: "https://melkeytetss.github.io/BUKSU_EEU_LANDING_PAGE/",
    github: "https://github.com/melkeytetss/Buksu_EEU_Application",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Real-time campus e-commerce and inventory management platform for
            Bukidnon State University.
          </TypographyP>
          <TypographyP className="font-mono ">
            A native Android application on a serverless Firebase backend that
            streamlines official university merchandise sales and stock
            management — sub-second real-time catalog updates,
            ACID-transaction-protected checkouts that prevent stock overselling,
            and automated multi-channel notifications over FCM and Brevo SMTP
            for students and administrators.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">Home</TypographyH3>
          <p className="font-mono mb-2">
            A personalized student portal with dynamic greetings, real-time
            unread notification badges, and a featured promo carousel. Instant
            category filters (All, Apparel, Accessories) and full-text product
            search keep discovery fast, while a persistent bottom nav synced
            with the global cart badge cuts navigation friction.
          </p>
          <SlideShow images={[`${BASE_PATH}/buksu-eeu/home.jpg`]} />

          <TypographyH3 className="my-4 mt-8">Products</TypographyH3>
          <p className="font-mono mb-2">
            An interactive grid catalog showing live inventory with dynamic
            low-stock warnings (&ldquo;Only 5 left&rdquo;), multi-size
            selection, Cloudinary-served media cached through Glide, and
            quick-add cart interactions. An admin suite handles real-time CRUD,
            image uploads, and soft-archive toggles.
          </p>
          <SlideShow images={[`${BASE_PATH}/buksu-eeu/products.jpg`]} />

          <TypographyH3 className="my-4 mt-8">Orders</TypographyH3>
          <p className="font-mono mb-2">
            Tabbed order tracking across All, Pending, Confirmed, and Picked Up
            stages. Checkout runs 2-phase Firestore transactions via{" "}
            <code>db.runTransaction</code> so stock deduction is atomic — no
            overselling under concurrent checkouts. A dual-alert pipeline
            delivers push notifications and Brevo transactional emails the
            moment orders are ready for pickup.
          </p>
          <SlideShow images={[`${BASE_PATH}/buksu-eeu/orders.jpg`]} />
        </div>
      );
    },
  },
];

export default projects;
