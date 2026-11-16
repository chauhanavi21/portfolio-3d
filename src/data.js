import images from './images.json';

export const profile = {
  name: 'Avi Chauhan',
  role: 'Software engineer',
  tagline: 'I build full-stack products, AI agents and cloud systems.',
  intro:
    'Nineteen projects, from a multi-tenant SaaS platform and emergency-relief dispatch to a handwriting model that runs in the browser. Drag the ring, pick one, and read how it works.',
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
    kicker: 'An AI-agent workspace for a small business',
    year: '2026',
    cats: ['AI', '3D & Motion'],
    accent: '#ff5c7a',
    summary:
      'A working app for running a small business with AI agents, plus a visual pitch: a zoomable map of 7 departments, 34 teams and 37 agents, a captioned 67-second walkthrough and a phone morning brief.',
    story:
      'It has two sides. The Work side is a real app with leads, invoices with PDFs, quotes, tickets and a bank reconciler. The Show side is the sales pitch for other owners. The agents are fenced in: there is a kill switch and a dry-run mode, outreach is drafted but never sent, and the model may only raise a ticket’s urgency, never lower it.',
    does: [
      'Seven working agents with permission tiers, a kill switch, dry-run mode and a full audit log',
      'Lead finder on OpenStreetMap, CSV import, an email finder that only reads a business’s own site, and a first-message drafter that never sends',
      'Model-written weekly brief that is thrown away if it contains any number not in the facts it was given',
    ],
    built: [
      'React 18, TypeScript and Zustand in the browser; Node 24 with its built-in SQLite on the server, loopback only',
      'A local Granite model through Ollama, so no business data leaves the computer',
      'Backups with a restore test, Lighthouse and frame-rate measurements, and browser checks in real Chrome',
    ],
    stack: ['React', 'TypeScript', 'Node 24', 'SQLite', 'Ollama', 'Vitest'],
    proof: [{ v: '~576', l: 'test cases' }, { v: '37', l: 'agent roles mapped' }, { v: '93–100', l: 'Lighthouse mobile' }],
    repo: null,
    note: 'Test count is from the test files; the demo numbers on the map are labelled illustrative. The walkthrough runs at about 33 fps with the CPU slowed 4x, which is a known gap.',
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
    slug: 'compliance-tracker',
    title: 'Compliance Tracker',
    kicker: 'Licences, insurance and safety cards',
    year: '2026',
    cats: ['Full-stack', 'Java'],
    accent: '#facc15',
    summary:
      'Know which electricians can legally work today, and prove it to an inspector. It tracks licences, insurance and safety cards, warns before they expire, and refuses to assign a worker to a job they are not cleared for.',
    story:
      'The check that matters is the date of the job, not today’s date. A licence that is valid now but lapses mid-job is refused, with the reason shown. Grant Okafor’s licence runs out five days before the kitchen rewire starts, so assigning him fails and says exactly why. Renewing it fills the new expiry in and keeps the old record as history.',
    does: [
      'Dashboard of who is compliant, expiring or expired, and which required documents are missing',
      'Assignment gate that checks a worker against the job’s dates and stores every refusal with its reasons',
      'Alerts at 90, 30 and 7 days and on expiry, with no duplicates; CSV and PDF reports; read-only auditor links that hide contact details',
    ],
    built: [
      'Java 21, Spring Boot, Spring Security, Spring JDBC and Flyway, with H2 and a PostgreSQL profile',
      'Angular 22 built into the same JAR as the server',
      'Every query is scoped by company; uploads are checked by their content, not their filename',
    ],
    stack: ['Java 21', 'Spring Boot', 'Angular 22', 'Flyway', 'H2 / PostgreSQL'],
    proof: [{ v: '119', l: 'Java tests' }, { v: '71', l: 'Angular tests' }, { v: '19', l: 'real-browser checks' }],
    repo: null,
    note: 'The PostgreSQL profile is written but has not been run against a real PostgreSQL server.',
  },
  {
    slug: 'signallab',
    title: 'SignalLab',
    kicker: 'SLO alert replay studio',
    year: '2026',
    cats: ['Full-stack'],
    accent: '#4ade80',
    summary:
      'Compare the noise, firing duration and detection delay of three alert policies on the same traffic. Inspired by public Google SRE guidance.',
    story:
      'A shorter firing time can come with a longer detection delay, and the only honest way to see that is to replay the same traffic through each policy. I also replayed 26,978 real NASA web requests through it. That check validates the import and a zero-error baseline only, and the page says it cannot prove detection delay or false-positive rates.',
    does: [
      'Replay a seeded 12-hour, three-service scenario and compare five-minute and one-hour burn',
      'Change the SLO or traffic gate and re-run the same seed',
      'Import your own trace as CSV and export the results as JSON',
    ],
    built: [
      'Python with no runtime packages, credentials or build step',
      'The public demo runs the same Python in a browser worker, with temporary per-tab state',
      'CI on Windows and Linux with Chromium, Firefox and WebKit, plus automated accessibility checks',
    ],
    stack: ['Python', 'SQLite', 'JavaScript', 'Playwright', 'GitHub Actions'],
    proof: [{ v: '21', l: 'tests' }, { v: '26,978', l: 'real requests replayed' }, { v: '0', l: 'runtime packages' }],
    repo: 'https://github.com/chauhanavi21/signallab',
    note: 'An independent portfolio project inspired by public guidance. It has no connection to Google.',
  },
  {
    slug: 'tenantledger',
    title: 'TenantLedger',
    kicker: 'Multi-tenant double-entry ledger',
    year: '2026',
    cats: ['Full-stack'],
    accent: '#38bdf8',
    summary:
      'A finance workspace for two fictional organisations. Every transfer commits two integer-cent postings and a hash-linked audit record in one transaction. Inspired by public Microsoft multitenant guidance.',
    story:
      'Money is stored as whole cents, never floats, and a transfer either writes both sides and its audit record or writes nothing. Each audit entry hashes the one before it, so editing history breaks the chain. I replayed 200 real retail lines as constructed internal transfers: totals were conserved, the audit chain stayed valid, and the other tenant’s accounts stayed hidden.',
    does: [
      'Tenant identity decides which accounts a user can read or move money between',
      'Hash-linked audit trail that can be verified',
      'Import and replay historical sale lines as transfers',
    ],
    built: [
      'Python and SQLite with no runtime packages',
      'Public demo runs the same logic in a browser worker, with temporary per-tab state',
      'CI across three browser engines, with separate accessibility and mobile checks',
    ],
    stack: ['Python', 'SQLite', 'JavaScript', 'Playwright', 'GitHub Actions'],
    proof: [{ v: '25', l: 'tests' }, { v: '200', l: 'real lines replayed' }, { v: '2', l: 'tenants isolated' }],
    repo: 'https://github.com/chauhanavi21/tenantledger',
    note: 'The browser demo’s sign-in only illustrates the flow; server-side authentication is in the local app. Independent project, no connection to Microsoft.',
  },
  {
    slug: 'parcelguard',
    title: 'ParcelGuard',
    kicker: 'Order reliability lab',
    year: '2026',
    cats: ['Full-stack'],
    accent: '#fb923c',
    summary:
      'Reserve inventory once, replay a client request, lose a delivery acknowledgement after the consumer commits, and prove recovery makes exactly one fulfilment. Inspired by the AWS Builders’ Library.',
    story:
      'Send the same idempotency key twice and the response replays without changing stock. Change the quantity under the same key and the server returns a conflict. In the historical replay, 200 order lines produced 200 replays and 10 changed-intent conflicts, with 20 lost acknowledgements injected on purpose and recovered with a single effect each.',
    does: [
      'Idempotent reservations with replay and conflict detection',
      'Transactional outbox delivery and lost-acknowledgement recovery',
      'Compare retry strategies on paired synthetic workloads',
    ],
    built: [
      'Python and SQLite with no runtime packages',
      'Public demo runs the same logic in a browser worker, with temporary per-tab state',
      'CI across three browser engines and a historical-data replay check',
    ],
    stack: ['Python', 'SQLite', 'JavaScript', 'Playwright', 'GitHub Actions'],
    proof: [{ v: '25', l: 'tests' }, { v: '200', l: 'order lines replayed' }, { v: '20', l: 'lost acks recovered' }],
    repo: 'https://github.com/chauhanavi21/parcelguard',
    note: 'Duplicates and lost acknowledgements are injected, not observed in the source data. Independent project, no connection to Amazon.',
  },
  {
    slug: 'supplylens',
    title: 'SupplyLens',
    kicker: 'Sourcing decision studio',
    year: '2026',
    cats: ['AI', 'Full-stack'],
    accent: '#2dd4bf',
    summary:
      'Turns a procurement case into three comparable supplier allocations, a reproducible disruption experiment and an evidence-backed decision memo that shows cost, concentration, emissions and delivery risk together.',
    story:
      'The default case has four suppliers, three materials and twelve lanes. The policy-constrained plan cuts planned landed spend by $184,000 (2.71%), but it also raises emissions by 442 tCO₂e and slightly worsens the 5th-percentile delivery, so the tool shows the trade-off instead of hiding it. These are simulated results on fictional data, not realised savings.',
    does: [
      'Linear-programming optimisation with demand, capacity, concentration, lead-time and emissions rules, checked independently for feasibility',
      'Seeded and regional disruption experiments with paired Monte Carlo confidence intervals',
      'Validated JSON import, CSV and JSON export, and exact replay from the command line',
    ],
    built: [
      'Python, FastAPI and SciPy’s HiGHS solver',
      'React front end built into the app',
      'A 24-case predeclared study with a separate evaluation seed, and a memo generated from the saved results',
    ],
    stack: ['Python', 'FastAPI', 'SciPy', 'React', 'pytest'],
    proof: [{ v: '42', l: 'tests' }, { v: '24', l: 'predeclared cases' }, { v: '12', l: 'sourcing lanes' }],
    repo: 'https://github.com/chauhanavi21/supplylens',
    note: 'Independent project using no company or client data, and not affiliated with McKinsey. It has no hosted demo and runs locally.',
  },
  {
    slug: 'quoteline',
    title: 'Quoteline',
    kicker: 'Order book and market-making lab',
    year: '2026',
    cats: ['Full-stack'],
    accent: '#f472b6',
    summary:
      'A limit order book, a market-making simulator, an options pricer with a fitted volatility surface, a delta-hedging simulator and an ETF arbitrage engine, written in OCaml with an interactive browser view.',
    story:
      'Everything runs on simulated data, and it makes no claim about real-market profit. The README lists what went wrong along the way: a simulator that took quadratic time, one that produced no adverse selection, and an order book whose cancels slowed down on deep books until I made them O(log n), about 9.7 times faster. I broke the code on purpose to confirm each test would fail.',
    does: [
      'Price-time priority matching with limit, market, IOC and cancel orders',
      'Avellaneda-Stoikov market maker with profit split into spread, adverse selection and inventory',
      'Black-Scholes, implied volatility, an SVI surface with an arbitrage check, VaR, and a replayable order book in the browser',
    ],
    built: [
      'OCaml with dune; the order book is an immutable structure so replays and forks are simple',
      'Python re-implementations used as independent cross-checks',
      'Plain HTML, CSS and JavaScript view with no framework, and a CI-guarded benchmark',
    ],
    stack: ['OCaml', 'Python', 'JavaScript', 'dune', 'GitHub Actions'],
    proof: [{ v: '73', l: 'test cases' }, { v: '9.7×', l: 'faster after the fix' }, { v: '73,547', l: 'trades cross-checked' }],
    repo: 'https://github.com/chauhanavi21/quoteline',
    note: 'Synthetic data only; the strategy’s edge is a property of my simulator.',
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
  { v: 419 + 282 + 68 + 31 + 119 + 71 + 21 + 25 + 25 + 42 + 73, l: 'Automated tests' },
  { v: 5, l: 'Languages' },
];

export const skills = [
  'Java', 'Spring Boot', '.NET 10', 'ASP.NET Core', 'Angular', 'React', 'TypeScript', 'Three.js',
  'Node.js', 'Python', 'PyTorch', 'ONNX', 'SQLite', 'PostgreSQL', 'Tailwind', 'Docker',
];
