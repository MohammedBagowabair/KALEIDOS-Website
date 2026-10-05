/** All Unsplash photo IDs below were checked to return HTTP 200. */
export const img = (id: string, w = 800, h?: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ""}&q=72`;

export type Category = "Residential" | "Hospitality" | "Retail" | "Workplace";

export type Project = {
  id: string;
  title: string;
  category: Category;
  city: string;
  year: number;
  area: string;
  duration: string;
  photo: string;
  tone: "coral" | "lime" | "plum" | "cream";
  shape: "tall" | "square";
  hook: string;
  story: string;
  move: string;
  palette: { name: string; hex: string }[];
};

export const PROJECTS: Project[] = [
  {
    id: "saffron-flat",
    title: "Saffron Flat",
    category: "Residential",
    city: "Al Malqa, Riyadh",
    year: 2025,
    area: "186 m²",
    duration: "14 weeks",
    photo: "1618220179428-22790b461013",
    tone: "coral",
    shape: "tall",
    hook: "A rental that stopped feeling rented.",
    story:
      "A young couple with a three-year lease and zero permission to drill. We built everything freestanding: a saffron reading chair, a 4-metre plywood plant shelf, and limewash panels that clip onto the existing walls and leave with them.",
    move: "Removable limewash wall panels — 0 holes drilled, deposit returned in full.",
    palette: [
      { name: "Saffron", hex: "#E8892B" },
      { name: "Fig leaf", hex: "#4E6B3A" },
      { name: "Chalk", hex: "#F3EDE2" },
    ],
  },
  {
    id: "sabr-coffee",
    title: "Sabr Coffee Lab",
    category: "Hospitality",
    city: "Al Balad, Jeddah",
    year: 2024,
    area: "142 m²",
    duration: "11 weeks",
    photo: "1514933651103-005eec06c04b",
    tone: "lime",
    shape: "square",
    hook: "A roastery that glows after Isha.",
    story:
      "Sabr wanted a café that worked at 7am and at 11pm. We split the room into a bright daytime bar and a low, amber night lounge, connected by a copper rail the baristas can roll trays along.",
    move: "One copper tray rail runs 18 metres through both moods of the room.",
    palette: [
      { name: "Burnt copper", hex: "#B5652E" },
      { name: "Coal", hex: "#231B17" },
      { name: "Amber", hex: "#F2A93B" },
    ],
  },
  {
    id: "moonwalk-villa",
    title: "Moonwalk Villa",
    category: "Residential",
    city: "Hittin, Riyadh",
    year: 2024,
    area: "540 m²",
    duration: "26 weeks",
    photo: "1615873968403-89e068629265",
    tone: "plum",
    shape: "square",
    hook: "A family majlis painted deep teal — on purpose.",
    story:
      "Five kids, two grandparents, one rule: nothing precious. We wrapped the majlis in scrubbable deep teal, used performance velvet in rust, and turned the stair landing into a gallery wall the kids curate every Ramadan.",
    move: "A rotating family gallery wall on the stair landing, rehung each season.",
    palette: [
      { name: "Deep teal", hex: "#1F4E4A" },
      { name: "Rust velvet", hex: "#A4512B" },
      { name: "Bone", hex: "#EFE7DA" },
    ],
  },
  {
    id: "halftone",
    title: "Halftone Concept Store",
    category: "Retail",
    city: "Alserkal Avenue, Dubai",
    year: 2025,
    area: "96 m²",
    duration: "8 weeks",
    photo: "1441986300917-64674bd600d8",
    tone: "cream",
    shape: "tall",
    hook: "A shop that rearranges itself every Thursday.",
    story:
      "A streetwear and print shop that drops new stock weekly. Every fixture is on castors and pegboard rails, so the team can reset the full floor in under 40 minutes — we tested it with a stopwatch.",
    move: "100% mobile fixtures — full store reset in 38 minutes.",
    palette: [
      { name: "Riso pink", hex: "#FF48B0" },
      { name: "Galvanised", hex: "#A7A9AC" },
      { name: "Newsprint", hex: "#F4F1EA" },
    ],
  },
  {
    id: "night-palm",
    title: "Night Palm Guesthouse",
    category: "Hospitality",
    city: "AlUla",
    year: 2023,
    area: "12 keys",
    duration: "32 weeks",
    photo: "1542314831-068cd1dbfeeb",
    tone: "coral",
    shape: "tall",
    hook: "Twelve rooms designed around the sunset.",
    story:
      "Every room faces west. We tuned the palette to the hour the sandstone turns red: clay plaster, indigo linen, and pool lighting that shifts from white to ember after Maghrib.",
    move: "Pool lighting on a sunset timer that follows the real local sunset time.",
    palette: [
      { name: "Clay", hex: "#C2643F" },
      { name: "Indigo", hex: "#2B3A67" },
      { name: "Sandstone", hex: "#E3B98A" },
    ],
  },
  {
    id: "plotline",
    title: "Plotline Studios",
    category: "Workplace",
    city: "JAX District, Riyadh",
    year: 2025,
    area: "310 m²",
    duration: "12 weeks",
    photo: "1522708323590-d24dbb6b0267",
    tone: "lime",
    shape: "square",
    hook: "A film studio office with no assigned desks.",
    story:
      "An animation studio of 34 people who are rarely all in. We designed four 'neighbourhoods' — loud, quiet, screening and kitchen — each a different colour, so new hires find their way by hue, not signage.",
    move: "Colour-coded neighbourhoods replaced all wayfinding signage.",
    palette: [
      { name: "Acid lime", hex: "#D6FF3F" },
      { name: "Graphite", hex: "#3A3A40" },
      { name: "Oat", hex: "#E9E1D2" },
    ],
  },
  {
    id: "tide",
    title: "Tide Swim Store",
    category: "Retail",
    city: "Al Khobar",
    year: 2024,
    area: "120 m²",
    duration: "9 weeks",
    photo: "1441984904996-e0b6ba687e04",
    tone: "plum",
    shape: "square",
    hook: "Changing rooms you actually want to photograph.",
    story:
      "A swim and resortwear label on the Corniche. The changing rooms became the hero: rounded tiled pods in seafoam with warm, flattering light — now the most-tagged spot in the store.",
    move: "Tiled changing pods with 2700K face-level lighting — 3× more tagged photos.",
    palette: [
      { name: "Seafoam", hex: "#8FD3C1" },
      { name: "Coral", hex: "#FF5C4D" },
      { name: "Shell", hex: "#FBF3EA" },
    ],
  },
  {
    id: "fieldnote",
    title: "Fieldnote Agency HQ",
    category: "Workplace",
    city: "Al Khobar",
    year: 2023,
    area: "220 m²",
    duration: "10 weeks",
    photo: "1586023492125-27b2c045efd7",
    tone: "cream",
    shape: "tall",
    hook: "A reception that sells the agency in 10 seconds.",
    story:
      "A research agency that hosts clients daily. We stripped the reception to three objects — a mustard lounge chair, a pinned wall of live project notes, and a single sculptural lamp — so the work is the decoration.",
    move: "A live 'field notes' pin wall replaced the logo wall in reception.",
    palette: [
      { name: "Mustard", hex: "#E3A72F" },
      { name: "Paper white", hex: "#F7F5F0" },
      { name: "Ink", hex: "#1B1B1F" },
    ],
  },
];

export const FILTERS: ("All" | Category)[] = ["All", "Residential", "Hospitality", "Retail", "Workplace"];

export const STEPS = [
  {
    n: "01",
    title: "Room Read",
    time: "Week 1",
    text: "A 2-hour visit. We measure, photograph, and ask how you actually live — not how you think you should.",
    out: "Measured plan + 'room diary' of habits",
  },
  {
    n: "02",
    title: "Colour Collision",
    time: "Weeks 2–3",
    text: "Three deliberately different directions, each with real samples on your wall. One safe, one brave, one wild.",
    out: "3 mood boards + physical sample kit",
  },
  {
    n: "03",
    title: "Prototype",
    time: "Weeks 4–6",
    text: "3D walkthrough, joinery drawings and a costed list. We mock up the bravest move at 1:1 before anyone commits.",
    out: "3D tour + drawings + itemised budget",
  },
  {
    n: "04",
    title: "Build",
    time: "Weeks 7–16",
    text: "Our own site lead, weekly photo reports, and makers we've worked with for years — carpenters, upholsterers, metalworkers.",
    out: "Weekly site report every Thursday",
  },
  {
    n: "05",
    title: "Living Test",
    time: "+30 days",
    text: "We come back a month after handover, see what's working, and fix what isn't. Included, not an upsell.",
    out: "Snag visit + styling tweaks",
  },
];

export const SERVICES = [
  { name: "Colour Consult", detail: "2 hours on-site · palette pack · paint & fabric list", price: "SAR 1,800", time: "1 week" },
  { name: "Room Remix", detail: "One room, full design · 3D · shopping list", price: "from SAR 9,500", time: "3–4 weeks" },
  { name: "Whole Home", detail: "Concept to handover · joinery · site management", price: "from SAR 420 / m²", time: "12–26 weeks" },
  { name: "Commercial", detail: "Cafés, retail, offices, guesthouses", price: "Quoted per brief", time: "8–32 weeks" },
];

export const TESTIMONIALS = [
  {
    quote: "We asked for 'not beige' and got a home our friends keep asking to borrow for photos. They stuck to the budget almost to the riyal.",
    name: "Reem & Faisal A.",
    role: "Saffron Flat, Riyadh",
    tone: "coral",
  },
  {
    quote: "Our night sales went up 40% after the lounge opened. The copper rail looked crazy on paper — now it's our signature.",
    name: "Yousef Bakr",
    role: "Founder, Sabr Coffee Lab",
    tone: "lime",
  },
  {
    quote: "They timed the store reset with a stopwatch. That's the kind of studio they are — playful, but obsessive about how it works.",
    name: "Dana Al-Mansoori",
    role: "Halftone, Dubai",
    tone: "cream",
  },
] as const;

export const FAQ = [
  {
    q: "Do you only do bold colour?",
    a: "No — we do intentional colour. Some of our favourite rooms are 90% calm with one brave move. You always see a 'safe' direction too.",
  },
  {
    q: "Can you work with a rental?",
    a: "Yes. About a third of our residential clients rent. We design freestanding, clip-on and removable so your deposit comes back.",
  },
  {
    q: "Where do you work?",
    a: "Based in Riyadh. We take projects across KSA, the UAE and Bahrain, and run remote Colour Consults anywhere.",
  },
  {
    q: "How do payments work?",
    a: "Design fees in three stages (start, concept sign-off, drawings). Build costs are paid directly to makers — we never mark up furniture without telling you.",
  },
];

export const MOODS = [
  {
    id: "plum-night",
    label: "Plum Night",
    wall: "#2A1748",
    floor: "#140822",
    sofa: "#FF5C4D",
    accent: "#D6FF3F",
    rug: "#FFF8F0",
    note: "Deep walls make small rooms feel endless at night. Coral seating pulls the eye in.",
  },
  {
    id: "coral-noon",
    label: "Coral Noon",
    wall: "#FF8A7A",
    floor: "#C9472F",
    sofa: "#FFF8F0",
    accent: "#1A0B2E",
    rug: "#D6FF3F",
    note: "Warm coral walls flatter skin and Gulf daylight. Keep furniture pale and graphic.",
  },
  {
    id: "lime-morning",
    label: "Lime Morning",
    wall: "#F3FFC8",
    floor: "#D9CBB5",
    sofa: "#1A0B2E",
    accent: "#FF5C4D",
    rug: "#B6E62E",
    note: "A softened lime wakes up north-facing rooms. One dark anchor piece keeps it grown-up.",
  },
];
