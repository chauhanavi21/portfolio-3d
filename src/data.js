import images from './images.json';

export const profile = {
  name: 'Avi Chauhan',
  role: 'Software engineer',
  tagline: 'I build full-stack products, AI agents and cloud systems.',
  intro:
    'Thirteen projects, from a multi-tenant SaaS platform and emergency-relief dispatch to a handwriting model that runs in the browser. Drag the ring, pick one, and read how it works.',
  email: 'chauhanavi2311@gmail.com',
  github: 'https://github.com/chauhanavi21',
  linkedin: 'https://www.linkedin.com/in/developeravichauhan',
  resume: '/Avi_Chauhan_Resume.pdf',
  location: 'Baton Rouge, LA',
};

export const categories = ['All', 'Full-stack', 'AI', 'E-commerce', '3D & Motion', 'Java', '.NET'];

/*
 * Every claim below comes from the project's own README or from a run done while building this site.
 * `repo` is only set when the GitHub repository is public.
 * `proof` is a measured fact (tests, counts) so the card can show a number, not an adjective.
 */
const raw = [
  {
    slug: 'saas-platform',
    title: 'SaasPlatform',
    kicker: 'Multi-tenant SaaS starter',
    year: '2026',
    cats: ['Full-stack', '.NET'],
    accent: '#2dd4bf',
    summary:
      'A multi-tenant workspace app: register a company, invite a team, run projects on a drag-and-drop board. Every company’s data is isolated from every other’s.',
    story:
      'The hard part of SaaS is not the screens, it is trust. Each company gets its own private slice of data, sessions rotate their refresh tokens, and replaying a stolen token signs the thief out everywhere. I wrote the tests first for the scary parts, including one that deliberately removes a security filter to prove the tests would catch it.',
    does: [
      'Register a company and become its first admin; invite teammates with one-time, expiring links',
      'Kanban board with priorities, assignees, due dates, comments and overdue flags',
      'Live dashboard and activity feed; light, dark or system theme',
    ],
    built: [
      'ASP.NET Core (.NET 10) in Clean Architecture layers: Api → Infrastructure → Application → Domain',
      'EF Core on SQLite with tenant query filters; JWT access tokens plus rotating hashed refresh tokens',
      'Angular 21 standalone components and signals, Tailwind 3.4, FluentValidation, built-in rate limiting',
    ],
    stack: ['.NET 10', 'Angular 21', 'EF Core', 'SQLite', 'JWT', 'Tailwind'],
    proof: [{ v: '68', l: 'automated tests' }, { v: '2', l: 'roles enforced in API' }, { v: '7 days', l: 'invite expiry' }],
    repo: 'https://github.com/chauhanavi21/Saas_company',
  },
  {
    slug: 'clinic',
    title: 'Clinic Management',
    kicker: 'Appointments, notes, billing',
    year: '2026',
    cats: ['Full-stack', '.NET'],
    accent: '#38bdf8',
    summary:
      'The back office of a small clinic: scheduling, patient records, signed clinical notes, prescriptions, invoices and insurance claims, with role-based access for five kinds of staff.',
    story:
      'A clinic is a pile of rules that must never be broken: no double-booked doctor, no prescription that clashes with an allergy, no editing a signed note. I made each rule a tested behaviour. The API has no interface yet because I built the dangerous parts first and the screens come last.',
    does: [
      'Booking with conflict detection, reschedule, cancel, time off and a waitlist',
      'Visits with vitals, SOAP notes that lock when signed, diagnoses, procedures, prescriptions with allergy and interaction checks',
      'Invoices from signed visits, payments, refunds and an insurance-claim status machine',
    ],
    built: [
      '.NET 10 Clean Architecture API with EF Core migrations on SQLite and JWT auth',
      'Append-only audit trail on every sensitive change',
      'Tests run the real API in-process with a controllable clock, so daylight-saving days and refill timing are exact',
    ],
    stack: ['.NET 10', 'EF Core', 'SQLite', 'JWT', 'xUnit'],
    proof: [{ v: '419', l: 'passing tests' }, { v: '5 of 6', l: 'phases built' }, { v: '5', l: 'staff roles' }],
    repo: null,
    note: 'Cover is real test output: this project is API-only so far.',
  },
  {
    slug: 'reliefops',
    title: 'ReliefOps',
    kicker: 'Emergency relief coordination',
    year: '2026',
    cats: ['Full-stack', 'Java'],
    accent: '#f97316',
    summary:
      'Turns incident reports into real team assignments: reserve supplies and shelter beds, track field dispatches, and record the help delivered.',
    story:
      'When a disaster hits, the failure is usually coordination, not goodwill: two teams sent to one street, a shelter that is already full. ReliefOps makes a dispatch a transaction, so a team, its supplies and a shelter bed are reserved together or not at all.',
    does: [
      'Command center with incident pins on a Chicago map, shelter capacity, stock alerts and team availability',
      'Dispatch board: plan, reserve, depart, confirm delivery, or cancel before departure',
      'Administrator, coordinator and viewer roles; every change leaves an audit event',
    ],
    built: [
      'Spring Boot with Spring Security sessions and Flyway migrations',
      'H2 for the local demo, PostgreSQL-ready',
      'Audit events are written in the same transaction as the change they describe',
    ],
    stack: ['Java 21', 'Spring Boot', 'Flyway', 'H2 / PostgreSQL', 'Spring Security'],
    proof: [{ v: '3', l: 'user roles' }, { v: '30 s', l: 'dashboard refresh' }, { v: '9', l: 'working modules' }],
    repo: null,
  },
  {
    slug: 'repairdesk',
    title: 'RepairDesk',
    kicker: 'Repair-shop workflow',
    year: '2026',
    cats: ['Full-stack', 'Java'],
    accent: '#22c55e',
    summary:
      'For independent phone, laptop and console repair shops: device intake, estimates the customer approves, parts used, progress, printable invoices and receipts.',
    story:
      'A repair shop’s daily problem is keeping devices, customers, approvals and money in agreement. Customers get a private tracking link where they approve or decline an estimate, so the shop never works on a repair nobody agreed to pay for.',
    does: [
      'Work orders, a four-column repair board and a parts catalog with reserved and on-hand counts',
      'Versioned estimates with exact-cent maths and tax in basis points',
      'Customer portal: progress, current estimate, approve or decline, invoice balance, no login needed',
    ],
    built: [
      'Spring Boot, JDBC and Flyway, served with no front-end build step',
      'Exact-cent money handling instead of floating point',
      'Owner and technician roles with session sign-in',
    ],
    stack: ['Java 21', 'Spring Boot', 'JDBC', 'Flyway', 'H2 / PostgreSQL'],
    proof: [{ v: '4', l: 'repair stages' }, { v: '0', l: 'floats in money' }, { v: '1 link', l: 'for customers' }],
    repo: 'https://github.com/chauhanavi21/repairdesk',
  },
  {
    slug: 'sales-dashboard',
    title: 'Sales & Team Dashboard',
    kicker: 'Orders, customers, reports',
    year: '2026',
    cats: ['Full-stack', 'Java'],
    accent: '#60a5fa',
    summary:
      'Orders, customers, stock and daily reports in one place, with sign-in and an admin area. One server runs a Java API and the Angular app together.',
    story:
      'One rule shapes every screen: everyone can add, only an administrator can change or remove. It is enforced by the server, not just hidden in the interface, and a deleted order goes to a recycle bin instead of vanishing.',
    does: [
      'Revenue, paid orders and average order versus the previous period, with year-on-year charts',
      'PDF invoices, partial payments and refunds, CSV import with a validation preview',
      'Suppliers, purchase orders, gross-profit reporting and a notification centre',
    ],
    built: [
      'Java 17 REST API with Jackson, SQLite, PBKDF2 passwords and cookie sessions',
      'Angular 19 standalone components and signals with Tailwind, in light and dark themes',
      'Browser suite runs against the real backend',
    ],
    stack: ['Java 17', 'Angular 19', 'SQLite', 'Tailwind', 'Maven'],
    proof: [{ v: '282', l: 'backend tests' }, { v: '171', l: 'browser checks' }, { v: '34', l: 'unit tests' }],
    repo: null,
  },
  {
    slug: 'threads',
    title: 'Threads',
    kicker: 'Clothing store',
    year: '2026',
    cats: ['Full-stack', 'E-commerce'],
    accent: '#d9774b',
    summary:
      'A full-stack clothing shop: filters, colour and size pickers, a bag with a free-shipping meter, accounts, checkout, and an admin area.',
    story:
      'Stock is counted per size and colour, so a size sold out in one colour is crossed out for that colour only. The look follows fashion references: warm cream paper, near-black ink and one terracotta accent.',
    does: [
      'Three departments, garment-type filters with counts, search and sorting kept in the URL',
      'Colour and size pickers with low-stock warnings and a touch-swipe slider',
      'Accounts, checkout with a shipping address, order history and an admin area',
    ],
    built: [
      'React with Vite and Tailwind on the front',
      'Node and Express on the back with Node’s built-in SQLite',
      'Runs entirely on one machine with no paid service',
    ],
    stack: ['React', 'Vite', 'Express 5', 'SQLite', 'Tailwind'],
    proof: [{ v: '3', l: 'departments' }, { v: '360px', l: 'smallest layout' }, { v: '0', l: 'paid services' }],
    repo: 'https://github.com/chauhanavi21/thread_web',
  },
  {
    slug: 'bloom',
    title: 'Bloom',
    kicker: 'Skincare & haircare store',
    year: '2026',
    cats: ['Full-stack', 'E-commerce'],
    accent: '#fb923c',
    summary:
      'A skin, hair and body shop with a rotating-headline hero, a clickable product showcase, filters, a cart and sign-in.',
    story:
      'The hero card lets you swap the showcase product, pick a quantity and add to cart without leaving the page. I checked every page at 320, 390, 768, 1024 and 1440 pixels so nothing scrolls sideways.',
    does: [
      'Hero with a rotating headline word and a round product showcase',
      '26 seeded products, category and type filters, sorting, search, and shareable URLs',
      'Product pages with ingredients, low-stock warning and a “you may also like” row',
    ],
    built: [
      'React (Vite) with Tailwind 3.4',
      'Node and Express with built-in SQLite, JWT sign-in',
      'All motion switches off for visitors who prefer reduced motion',
    ],
    stack: ['React', 'Vite', 'Express 5', 'SQLite', 'JWT'],
    proof: [{ v: '26', l: 'products' }, { v: '5', l: 'widths checked' }, { v: '4', l: 'grid columns on desktop' }],
    repo: 'https://github.com/chauhanavi21/skin_web',
  },
  {
    slug: 'aurora-atlas',
    title: 'Aurora Atlas',
    kicker: 'Storefront with a 3D jacket',
    year: '2026',
    cats: ['E-commerce', '3D & Motion', 'Full-stack'],
    accent: '#34d399',
    summary:
      'A clothing store whose homepage holds a Three.js jacket, backed by a Node server, a local database, customer accounts, guest checkout and store administration.',
    story:
      'The homepage keeps a 3D jacket you can turn, while the shopping pages use real photographs so products are easy to judge. Saved lists merge when a guest signs in, and repeated checkout clicks return the same order instead of charging twice.',
    does: [
      '70 products and 191 saved photos, with search, galleries, zoom and size-aware stock checks',
      'Server-held bags that follow your account across devices',
      'Cash-on-delivery checkout, private order history and an authenticated admin',
    ],
    built: [
      'Three.js scene on the homepage',
      'Node’s built-in HTTP, crypto and SQLite, with no web framework',
      'Idempotent checkout and HttpOnly session cookies',
    ],
    stack: ['Three.js', 'Node 24', 'SQLite', 'HTML/CSS', 'JavaScript'],
    proof: [{ v: '70', l: 'products' }, { v: '191', l: 'product photos' }, { v: '0', l: 'web frameworks' }],
    repo: 'https://github.com/chauhanavi21/aurora-atlas',
  },
  {
    slug: 'halo',
    title: 'HALO',
    kicker: '3D product page',
    year: '2026',
    cats: ['3D & Motion'],
    accent: '#3dffb0',
    summary:
      'A desk lamp with a glass dome that holds a living aurora. Explore it in 3D, pull it apart, choose a sky and add it to the bag.',
    story:
      'There are no 3D model files and no textures: the whole lamp is built from code in Three.js. Scroll and it separates into five parts, each labelled, then comes back together. The configurator changes the aurora colour and glow live.',
    does: [
      'Scroll-driven exploded view with five labelled parts',
      'Configurator for aurora colour, finish, brightness and a breathing mode, with a live price',
      'Bag and specs chapters in a single page',
    ],
    built: [
      'Plain JavaScript and Three.js, lamp geometry generated in code',
      'No build step and no external assets',
      'Respects reduced-motion preferences',
    ],
    stack: ['Three.js', 'JavaScript', 'GLSL', 'CSS'],
    proof: [{ v: '0', l: 'model files' }, { v: '5', l: 'explodable parts' }, { v: '4', l: 'aurora skies' }],
    repo: null,
  },
  {
    slug: 'company-map',
    title: 'The Company Map',
    kicker: 'An AI-agent platform, explained',
    year: '2026',
    cats: ['AI', '3D & Motion'],
    accent: '#ff5c7a',
    summary:
      'A whole company on one page: 7 departments, 34 teams and 37 jobs, each one an agent with a written job description. Includes a scripted, captioned walkthrough and a phone-sized morning brief.',
    story:
      'Instead of describing AI agents, I show a roofing contractor’s company running on them. Click any job to see what it reads, what it writes and what it is allowed to do. The walkthrough is driven frame by frame so it can be recorded perfectly.',
    does: [
      'A company map you can zoom into, department by department, with search and an agent drawer per job',
      'A timed walkthrough with live captions across sales, operations, office and intelligence',
      'A phone lock-screen “morning brief” and an email, Slack and push digest',
    ],
    built: [
      'React 18, TypeScript, Zustand and Framer Motion',
      'A deterministic timeline engine, so any second can be rendered on demand',
      'Vitest tests for the data, search, timeline and flow engines. All demo numbers are labelled illustrative.',
    ],
    stack: ['React', 'TypeScript', 'Zustand', 'Framer Motion', 'Vitest'],
    proof: [{ v: '7', l: 'departments' }, { v: '34', l: 'teams' }, { v: '37', l: 'agents' }],
    repo: null,
  },
  {
    slug: 'agentforge',
    title: 'AgentForge',
    kicker: 'An agent built from scratch',
    year: '2026',
    cats: ['AI'],
    accent: '#facc15',
    summary:
      'An AI agent with no third-party API and no runtime dependencies, which scales into a company of role-specialised agents that turn one mission into a full set of business documents.',
    story:
      'The agent works offline on day one with its own planner and memory. Pointing it at a hosted model is a config change, and it falls back to the built-in brain if the provider fails. I ran it on “an AI tutoring service for schools” and it produced six documents plus a report.',
    does: [
      'Decide → act → observe loop with bounded steps and a fallback brain',
      'Company mode: analyst, strategist, product, marketing, CFO and CEO working over a task graph',
      'Safe calculator, sandboxed files, document writer, and a local authenticated HTTP API',
    ],
    built: [
      'Pure Python; TF-IDF memory retrieval written from scratch',
      'Brain chain: free hosted model → OpenAI-compatible → local Ollama → built-in offline brain',
      'Calculator parses an AST rather than calling eval',
    ],
    stack: ['Python', 'TF-IDF', 'HTTP API', 'CLI', 'pytest'],
    proof: [{ v: '31', l: 'passing tests' }, { v: '6', l: 'agent roles' }, { v: '0', l: 'runtime dependencies' }],
    repo: 'https://github.com/chauhanavi21/open_aiagent',
    note: 'Cover is real output from a company run: this project has no UI.',
  },
  {
    slug: 'inkcomplete',
    title: 'InkComplete',
    kicker: 'Handwriting autocomplete',
    year: '2026',
    cats: ['AI'],
    accent: '#c2410c',
    summary:
      'Write the first letters of a word by hand and get ranked suggestions for the full word. The recogniser is a small neural network that runs in your browser.',
    story:
      'A single unclear letter should not hide the right word, so the decoder scores every word in a 50,000-word list using the model’s full probabilities for each letter, not just its top guess. When you fix a wrong letter, the sample is kept and can be used to fine-tune the model on your own handwriting.',
    does: [
      'Segments pen strokes into letters, recognises each, and ranks completions with a faded “ghost” suggestion',
      'Tap a wrong letter to correct it; accepted words save your samples',
      'Fine-tuning refuses to deploy if general accuracy drops by more than two points',
    ],
    built: [
      'CNN trained on EMNIST Letters in PyTorch, exported to ONNX and run with ONNX Runtime Web',
      'Word score = sum of log-probabilities of letters + a weight on word frequency',
      'Small local-only Python server for saving samples',
    ],
    stack: ['PyTorch', 'ONNX', 'JavaScript', 'EMNIST', 'Python'],
    proof: [{ v: '50k', l: 'word lexicon' }, { v: '26', l: 'letter classes' }, { v: '28×28', l: 'input pixels' }],
    repo: null,
  },
  {
    slug: 'portfolio-2d',
    title: 'Portfolio (2D)',
    kicker: 'The first version of this site',
    year: '2026',
    cats: ['Full-stack', '3D & Motion'],
    accent: '#e08a3c',
    summary:
      'A scrolling single-page portfolio with an animated canvas background, count-up metrics and a data-driven layout. This 3D site is its successor.',
    story:
      'Every section reads from one data file, so changing a project or a number means editing one place. The hero background is hand-written canvas animation rather than a library.',
    does: [
      'Hero, work, skills, process, impact reel, experience, education and FAQ',
      'Rotating metric cards and horizontal result reel',
      'Collapsible mobile menu and reduced-motion support',
    ],
    built: ['React 19 with Vite', 'Tailwind 3.4 and Motion', 'Hand-written Canvas 2D animation'],
    stack: ['React 19', 'Vite', 'Tailwind', 'Motion', 'Canvas 2D'],
    proof: [{ v: '11', l: 'sections' }, { v: '1', l: 'data file' }, { v: '0', l: 'canvas libraries' }],
    repo: 'https://github.com/chauhanavi21/Portfolio',
  },
];

export const projects = raw.map((p, i) => ({
  ...p,
  index: i,
  image: images[p.slug],
}));

export const stats = [
  { v: projects.length, l: 'Projects' },
  { v: 419 + 282 + 68 + 31, l: 'Automated tests' },
  { v: 5, l: 'Languages' },
];

export const skills = [
  'Java', 'Spring Boot', '.NET 10', 'ASP.NET Core', 'Angular', 'React', 'TypeScript', 'Three.js',
  'Node.js', 'Python', 'PyTorch', 'ONNX', 'SQLite', 'PostgreSQL', 'Tailwind', 'Docker',
];
