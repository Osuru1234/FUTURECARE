import {
  CommunityPost,
  EarlyCarePlaybook,
  Mentor,
  NetworkCircle,
  Workshop,
} from '../types/futurecare';

export const HERO_IMAGE_PATH =
  '/src/assets/images/hero_futurecare_mentorship_1795690598717.jpg';
export const EARLY_CARE_LAB_IMAGE_PATH =
  '/src/assets/images/early_care_learning_lab_1795690598806.jpg';
export const WORKSHOP_CIRCLE_IMAGE_PATH =
  '/src/assets/images/workshop_leadership_circle_1795690598547.jpg';

export const MENTORS: Mentor[] = [
  {
    id: 'mentor-amara',
    name: 'Amara Okafor',
    role: 'VP of Platform Engineering',
    organization: 'Northstar Grid Systems',
    track: 'STEM & Product',
    location: 'London · Hybrid',
    experienceYears: 16,
    promotedMentees: 22,
    careCoveredSlots: true,
    availableSlots: [
      'Tue 10:00 AM GMT · Care-Covered',
      'Thu 1:30 PM GMT · Async + Live',
    ],
    focusAreas: [
      'Staff-to-VP engineering transition',
      'Technical architecture ownership',
      'Navigating leadership during early parenthood',
    ],
    bio: 'Leads 180 engineers across distributed energy infrastructure. Mentors senior women technologists stepping into executive scope while raising children ages 0 to 8.',
    imageUrl: '/src/assets/images/mentor_portrait_amara_1795690599181.jpg',
    initials: 'AO',
  },
  {
    id: 'mentor-elena',
    name: 'Elena Lin-Vance',
    role: 'Chief Operating Officer',
    organization: 'Veridian Health Collective',
    track: 'Executive Leadership',
    location: 'New York · Hybrid',
    experienceYears: 14,
    promotedMentees: 19,
    careCoveredSlots: true,
    availableSlots: [
      'Wed 11:00 AM EST · Care-Covered',
      'Fri 9:30 AM EST · Live Session',
    ],
    focusAreas: [
      'P&L ownership and board reporting',
      'Executive compensation negotiation',
      'Scaling operational teams equitably',
    ],
    bio: 'Scaled clinical operations from 40 to 900 employees. Advises directors and VPs preparing for C-suite appointments and corporate board seats.',
    imageUrl: '/src/assets/images/mentor_portrait_elena_1795690598735.jpg',
    initials: 'EL',
  },
  {
    id: 'mentor-sofia',
    name: 'Dr. Sofia Mendoza',
    role: 'Director of Early Childhood & Gender Policy',
    organization: 'Civic Equity Institute',
    track: 'Policy & Impact',
    location: 'Madrid · Remote',
    experienceYears: 15,
    promotedMentees: 17,
    careCoveredSlots: true,
    availableSlots: [
      'Mon 3:00 PM CET · Care-Covered',
      'Thu 10:30 AM CET · Live Session',
    ],
    focusAreas: [
      'Early childhood (0–8) policy architecture',
      'Public-sector leadership advancement',
      'Workplace care infrastructure design',
    ],
    bio: 'Pediatric neuroscientist and policy architect focusing on how high-quality 0–8 care networks eliminate the mid-career leadership drop-off for mothers.',
    imageUrl: '/src/assets/images/mentor_portrait_sofia_1795690599510.jpg',
    initials: 'SM',
  },
  {
    id: 'mentor-priya',
    name: 'Priya Nair',
    role: 'Managing Partner',
    organization: 'Bridgeway Ventures',
    track: 'Executive Leadership',
    location: 'Singapore · Remote',
    experienceYears: 18,
    promotedMentees: 26,
    careCoveredSlots: false,
    availableSlots: [
      'Tue 4:00 PM SGT · Live Session',
      'Fri 11:00 AM SGT · Live Session',
    ],
    focusAreas: [
      'Founder fundraising and term sheets',
      'Independent board governance',
      'Cross-border market expansion',
    ],
    bio: 'Leads Series A and B investments in women-led enterprise software and family-care technology across Asia-Pacific and Europe.',
    initials: 'PN',
  },
  {
    id: 'mentor-claire',
    name: 'Claire Beaumont',
    role: 'Director of Returnship & Talent Equity',
    organization: 'Mercer Civic Partners',
    track: 'Return-to-Work',
    location: 'Toronto · Hybrid',
    experienceYears: 12,
    promotedMentees: 31,
    careCoveredSlots: true,
    availableSlots: [
      'Wed 10:00 AM EST · Care-Covered',
      'Thu 2:00 PM EST · Care-Covered',
    ],
    focusAreas: [
      'Re-entering leadership after parental leave',
      'Flexible executive role negotiation',
      'Rebuilding sponsor networks',
    ],
    bio: 'Designed structured returnship pipelines for 400+ women returning from caregiving leaves for children ages 0 to 8 without stepping back in seniority.',
    initials: 'CB',
  },
  {
    id: 'mentor-nadia',
    name: 'Nadia Al-Mansoor',
    role: 'Principal AI & Robotics Architect',
    organization: 'Helios Industrial Labs',
    track: 'STEM & Product',
    location: 'Berlin · Hybrid',
    experienceYears: 11,
    promotedMentees: 14,
    careCoveredSlots: true,
    availableSlots: [
      'Mon 11:30 AM CET · Care-Covered',
      'Wed 4:00 PM CET · Async + Live',
    ],
    focusAreas: [
      'Principal IC to engineering director track',
      'Patent strategy & technical publishing',
      'Mentoring young girls (6–8) in early STEM',
    ],
    bio: 'Leads applied robotics safety research and co-founded weekend tactile robotics playgroups for daughters ages 4 to 8.',
    initials: 'NA',
  },
];

export const WORKSHOPS: Workshop[] = [
  {
    id: 'ws-board-readiness',
    title: 'Board Readiness & P&L Fluency for Emerging Executives',
    category: 'Leadership',
    facilitator: 'Elena Lin-Vance',
    facilitatorRole: 'COO, Veridian Health Collective',
    dateLabel: 'Dec 03, 2026',
    timeLabel: '10:00 AM – 12:30 PM',
    durationHours: 2.5,
    format: 'Hybrid · Studio + Care',
    careIncludedAges0to8: true,
    seatsTotal: 32,
    seatsRemaining: 7,
    summary:
      'Translate operational wins into board-level financial narratives, audit committee fluency, and clear governance positioning.',
    syllabus: [
      'Reading quarterly unit-economics decks through an investor lens',
      'Crafting a 90-second executive governance bio',
      'Live peer critique with sitting board directors',
    ],
  },
  {
    id: 'ws-negotiation',
    title: 'Compensation, Equity & Flexible Scope Negotiation',
    category: 'Leadership',
    facilitator: 'Claire Beaumont',
    facilitatorRole: 'Director of Talent Equity',
    dateLabel: 'Dec 08, 2026',
    timeLabel: '1:00 PM – 3:00 PM',
    durationHours: 2,
    format: 'Live Virtual',
    careIncludedAges0to8: true,
    seatsTotal: 45,
    seatsRemaining: 14,
    summary:
      'Practical scripts and compensation modeling to negotiate promotion packages, equity refreshes, and protected caregiving hours.',
    syllabus: [
      'Benchmarking base, equity, and caregiving stipends',
      'Handling pushback on hybrid leadership schedules',
      'Role-played offer counter-proposals in pairs',
    ],
  },
  {
    id: 'ws-stem-architecture',
    title: 'From Senior Specialist to Technical Executive',
    category: 'STEM & Finance',
    facilitator: 'Amara Okafor',
    facilitatorRole: 'VP of Platform Engineering',
    dateLabel: 'Dec 11, 2026',
    timeLabel: '9:30 AM – 12:00 PM',
    durationHours: 2.5,
    format: 'In-Person · Care Included',
    careIncludedAges0to8: true,
    seatsTotal: 28,
    seatsRemaining: 5,
    summary:
      'Bridge the gap between hands-on technical authority and multi-team executive sponsorship in engineering and product.',
    syllabus: [
      'Delegating deep technical decisions without losing credibility',
      'Writing cross-org strategy memos that secure budget',
      'On-site supervised STEM playroom provided for ages 0–8',
    ],
  },
  {
    id: 'ws-early-stem-girls',
    title: 'Raising Confident Problem-Solvers: Girls Ages 3–8 in STEM',
    category: 'Early Empowerment (0–8)',
    facilitator: 'Dr. Sofia Mendoza',
    facilitatorRole: 'Civic Equity Institute',
    dateLabel: 'Dec 15, 2026',
    timeLabel: '11:00 AM – 12:30 PM',
    durationHours: 1.5,
    format: 'Hybrid · Studio + Care',
    careIncludedAges0to8: true,
    seatsTotal: 40,
    seatsRemaining: 11,
    summary:
      'Evidence-based parent and educator workshop on eliminating early gender stereotypes in spatial math, tinkering, and leadership voice before age 8.',
    syllabus: [
      'Why spatial confidence diverges between ages 5 and 7',
      'Praising process and persistence over innate traits',
      'Take-home tactile block and pattern games for ages 3–8',
    ],
  },
  {
    id: 'ws-capital-modeling',
    title: 'Venture Capital, Angel Investing & Financial Independence',
    category: 'STEM & Finance',
    facilitator: 'Priya Nair',
    facilitatorRole: 'Managing Partner, Bridgeway Ventures',
    dateLabel: 'Dec 18, 2026',
    timeLabel: '4:00 PM – 6:00 PM',
    durationHours: 2,
    format: 'Live Virtual',
    careIncludedAges0to8: false,
    seatsTotal: 50,
    seatsRemaining: 19,
    summary:
      'Demystify cap tables, angel syndicate checks, and long-term wealth building to expand women’s representation on both sides of capital.',
    syllabus: [
      'Evaluating early-stage startups and dilution math',
      'Joining women-led angel collectives with accessible minimums',
      'Aligning household wealth planning with career transitions',
    ],
  },
  {
    id: 'ws-care-architecture',
    title: 'Equitable Care Routines & Shared Leadership at Home (0–5)',
    category: 'Early Empowerment (0–8)',
    facilitator: 'Claire Beaumont & Dr. Sofia Mendoza',
    facilitatorRole: 'FutureCare Faculty',
    dateLabel: 'Dec 22, 2026',
    timeLabel: '10:30 AM – 12:00 PM',
    durationHours: 1.5,
    format: 'Hybrid · Studio + Care',
    careIncludedAges0to8: true,
    seatsTotal: 36,
    seatsRemaining: 9,
    summary:
      'Design equitable household care schedules during the intensive 0–5 childhood window so executive growth never stalls.',
    syllabus: [
      'Auditing invisible cognitive load across caregivers',
      'Structuring backup care redundancies for travel and sprints',
      'Developmental milestones from 0 to 5 that foster early autonomy',
    ],
  },
];

export const EARLY_CARE_PLAYBOOKS: EarlyCarePlaybook[] = [
  {
    id: 'play-0-2-sensory',
    title: 'Equitable Care & Sensory Curiosity Lab',
    ageBracket: '0–2 Years',
    domain: 'Attachment & Early Agency',
    durationMinutes: 20,
    caregiverOutcome:
      'Establishes predictable transition routines before parent mentorship calls.',
    childOutcome:
      'Builds secure exploration habits, cause-and-effect awareness, and early vocabulary.',
    steps: [
      'Offer two distinct natural-material objects (wood, woven fabric) and narrate choices calmly.',
      'Practice naming emotions and actions evenly across all children without gendered adjectives.',
      'Use a consistent 5-minute visual chime transition before handing off to a co-caregiver or studio facilitator.',
    ],
    materials: ['Untreated wooden blocks', 'High-contrast picture cards', 'Soft chime timer'],
  },
  {
    id: 'play-0-2-language',
    title: 'Everyday Leadership Voice & Rhythm',
    ageBracket: '0–2 Years',
    domain: 'Language & Turn-Taking',
    durationMinutes: 15,
    caregiverOutcome:
      'Easy 15-minute bonding ritual that fits cleanly between morning standups and care drop-off.',
    childOutcome:
      'Strengthens conversational turn-taking and early self-expression.',
    steps: [
      'Pause 4 full seconds after asking a toddler a simple choice question to honor their response time.',
      'Read board books featuring women builders, scientists, and community leaders.',
      'Mirror facial expressions and validate curiosity when your child points or experiments.',
    ],
    materials: ['Illustrated storybooks', 'Mirror play mat'],
  },
  {
    id: 'play-3-5-spatial',
    title: 'Bridge Builders: Spatial Math & Structural Play',
    ageBracket: '3–5 Years',
    domain: 'Early STEM & Spatial Reasoning',
    durationMinutes: 30,
    caregiverOutcome:
      'Runs smoothly as a supervised small-group activity inside FutureCare Studio rooms during workshops.',
    childOutcome:
      'Closes the early spatial-reasoning gap by encouraging girls ages 3–5 to prototype and test weight-bearing structures.',
    steps: [
      'Pose a concrete challenge: build a bridge wide enough for two toy vehicles to pass.',
      'When a tower falls, ask "What should we adjust on the base?" instead of fixing it for them.',
      'Draw a quick blueprint sketch together before rebuilding to connect paper ideas to 3D space.',
    ],
    materials: ['Unit wooden blocks', 'Measuring tape', 'Sketchpad & crayons'],
  },
  {
    id: 'play-3-5-voice',
    title: 'Story Circle: Speaking Up & Fair Collaboration',
    ageBracket: '3–5 Years',
    domain: 'Confidence & Social Equity',
    durationMinutes: 25,
    caregiverOutcome:
      'Gives preschoolers structured turn-taking skills that support calm group care environments.',
    childOutcome:
      'Normalizes girls taking initiative, leading group play, and resolving fairness disputes verbally.',
    steps: [
      'Assign rotating "project lead" roles during group play so every child practices guiding peers.',
      'Use simple sentence starters: "My idea is..." and "Let’s test both ideas."',
      'Reflect briefly at the end on how each child helped the team succeed.',
    ],
    materials: ['Role badges (wooden tokens)', 'Large floor mat'],
  },
  {
    id: 'play-6-8-robotics',
    title: 'Tactile Logic & First Algorithms (No Screens Needed)',
    ageBracket: '6–8 Years',
    domain: 'Computational Thinking',
    durationMinutes: 40,
    caregiverOutcome:
      'Self-directed 40-minute studio module allowing mothers to complete full 1:1 mentor sessions uninterrupted.',
    childOutcome:
      'Equips girls ages 6–8 with sequencing, debugging, and hypothesis-testing confidence.',
    steps: [
      'Lay out a 5x5 grid on the floor and write step-by-step directional cards to navigate an obstacle.',
      'Intentionally introduce one "bug" card and challenge the group to debug the sequence together.',
      'Have each child explain their logic out loud to a partner for 60 seconds.',
    ],
    materials: ['Grid tape', 'Directional arrow cards', 'Simple programmable floor bot'],
  },
  {
    id: 'play-6-8-civic',
    title: 'Young Changemakers: Mini Community Design Sprint',
    ageBracket: '6–8 Years',
    domain: 'Leadership & Civic Agency',
    durationMinutes: 45,
    caregiverOutcome:
      'Parallel weekend session alongside women’s executive networking roundtables.',
    childOutcome:
      'Teaches girls ages 6–8 to identify a neighborhood problem, interview peers, and pitch a prototype.',
    steps: [
      'Brainstorm one improvement for their school library, park, or classroom.',
      'Build a cardboard or clay prototype and test it with two classmates.',
      'Present a 2-minute explanation during the closing family showcase.',
    ],
    materials: ['Recycled cardboard', 'Masking tape', 'Index cards'],
  },
];

export const NETWORK_CIRCLES: NetworkCircle[] = [
  {
    id: 'circle-exec-mothers',
    name: 'Executive Mothers & Caregivers Circle',
    chapter: 'Global Hybrid · Weekly',
    schedule: 'Thursdays · 12:00 PM – 1:00 PM',
    careSupport: 'On-site 0–8 care in hub cities + stipend eligible',
    memberCount: 384,
    topicFocus: 'C-suite transitions, board pipelines, and protected family schedules',
    description:
      'Confidential peer roundtable for VP, Director, and Founder women navigating high-stakes leadership while parenting children ages 0 to 8.',
  },
  {
    id: 'circle-women-stem',
    name: 'Women Building Deep Tech & AI',
    chapter: 'London, Berlin & Virtual',
    schedule: 'Tuesdays (Bi-weekly) · 5:30 PM – 7:00 PM',
    careSupport: 'Backup evening sitter reimbursement up to $45/session',
    memberCount: 512,
    topicFocus: 'Architecture reviews, principal promotions, and patent co-authorship',
    description:
      'Technical salon connecting staff engineers, researchers, and product leaders for architecture critiques and sponsor referrals.',
  },
  {
    id: 'circle-returners',
    name: 'Leadership Returnship & Career Relaunch Guild',
    chapter: 'New York, Toronto & Virtual',
    schedule: 'Wednesdays · 10:30 AM – 11:30 AM',
    careSupport: 'Daytime infant & toddler (0–3) studio room included',
    memberCount: 248,
    topicFocus: 'Portfolio refresh, mock executive interviews, and direct hiring partner intros',
    description:
      'Structured accountability group for women re-entering senior roles after parental or early-childhood care breaks.',
  },
  {
    id: 'circle-early-ed',
    name: 'Early Childhood (0–8) Founders & Educators Alliance',
    chapter: 'Madrid, Singapore & Virtual',
    schedule: 'Fridays · 1:00 PM – 2:15 PM',
    careSupport: 'Interactive 0–8 play studio open during session',
    memberCount: 196,
    topicFocus: 'Equitable curriculum design, childcare sustainability, and policy advocacy',
    description:
      'Connects early-childhood founders, neuroscientists, and educators building gender-equitable learning spaces for ages 0 to 8.',
  },
];

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    author: 'Hannah Lindqvist',
    role: 'Director of Product, Kestrel Mobility',
    circleName: 'Executive Mothers & Caregivers Circle',
    timestamp: '2 hours ago',
    content:
      'Used the compensation negotiation script from Tuesday’s workshop to secure an on-site childcare stipend for my 3-year-old alongside my VP promotion offer. Happy to share the exact memo structure with anyone preparing for Q1 reviews.',
    repliesCount: 9,
  },
  {
    id: 'post-2',
    author: 'Maya Krishnan',
    role: 'Principal Systems Engineer',
    circleName: 'Women Building Deep Tech & AI',
    timestamp: 'Yesterday',
    content:
      'Brought my 6-year-old daughter to the Saturday Tactile Logic playgroup while attending the Staff-to-VP panel. She spent the whole dinner explaining debugging loops to her grandparents.',
    repliesCount: 14,
  },
];

export const IMPACT_TESTIMONIALS = [
  {
    id: 'proof-1',
    quote:
      'Before FutureCare, I declined two senior director panels because I had no reliable care for my four-year-old twins during evening workshops. Through care-covered mentorship with Elena, I stepped into my VP Operations role within seven months.',
    name: 'Miriam Karanja',
    role: 'VP of Operations',
    organization: 'SolaGrid Logistics',
    metric: 'Promoted to VP in 7 months',
  },
  {
    id: 'proof-2',
    quote:
      'Integrating our 0–8 early STEM playroom directly into the leadership studio changed retention overnight. Mothers no longer choose between high-impact skill building and quality developmental care for their daughters.',
    name: 'Dr. Hannah Cho',
    role: 'Head of Talent Equity',
    organization: 'Kestrel BioSystems',
    metric: '96% cohort completion rate',
  },
];
