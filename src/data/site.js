/**
 * ============================================================================
 * SINGLE SOURCE OF CONTENT FOR THIS DEMONSTRATION SITE
 * ============================================================================
 *
 * EVERYTHING IN THIS FILE IS FICTIONAL PLACEHOLDER CONTENT.
 *
 * "Precision Comfort Heating & Air" is not a real business. The phone number,
 * email address, licence number, service areas, staff, reviews and statistics
 * below were invented for a sales demonstration and must not be presented as
 * factual. Phone numbers use the 555-01xx range reserved for fiction; email
 * uses the reserved `.example` TLD.
 *
 * To rebuild this site for a real HVAC customer, replace the values in this
 * file. No business detail is hard-coded into any component.
 * ============================================================================
 */

export const company = {
  name: 'Precision Comfort',
  fullName: 'Precision Comfort Heating & Air',
  tagline: 'Heating, Cooling & Indoor Air Quality',

  // PLACEHOLDER — fictional 555-01xx number, reserved for fictional use.
  phone: '(555) 555-0142',
  phoneHref: 'tel:+15555550142',
  smsHref: 'sms:+15555550142',

  // PLACEHOLDER — `.example` is a reserved documentation TLD.
  email: 'service@precisioncomfort.example',

  // PLACEHOLDER — not a real contractor licence.
  license: 'Contractor Licence #000000 (placeholder)',

  region: 'the Knoxville area',
  hours: 'Emergency service available 24 hours a day, 7 days a week',
}

/**
 * PLACEHOLDER — every href below points back to the top of this page. A real
 * customer's profile URLs drop straight in here; delete any platform the
 * business does not actually use rather than linking somewhere dead.
 */
export const socials = [
  { id: 'facebook', label: 'Facebook', href: '#top' },
  { id: 'instagram', label: 'Instagram', href: '#top' },
  { id: 'google', label: 'Google Business Profile', href: '#top' },
  { id: 'yelp', label: 'Yelp', href: '#top' },
  { id: 'nextdoor', label: 'Nextdoor', href: '#top' },
  { id: 'youtube', label: 'YouTube', href: '#top' },
  { id: 'tiktok', label: 'TikTok', href: '#top' },
  { id: 'x', label: 'X', href: '#top' },
  { id: 'linkedin', label: 'LinkedIn', href: '#top' },
  { id: 'pinterest', label: 'Pinterest', href: '#top' },
  // These two are real, functional contact channels (not social profiles),
  // reusing the same reserved 555-01xx fiction number as the rest of the site.
  { id: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/15555550142' },
  { id: 'sms', label: 'Text Us', href: company.smsHref },
]

export const nav = [
  { label: 'Services', href: '#all-services' },
  { label: 'Maintenance', href: '#membership' },
  { label: 'Financing', href: '#financing' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'About', href: '#team' },
  { label: 'Contact', href: '#lead-form' },
]

export const hero = {
  headline: ['COMFORT RESTORED.', 'FAST.'],
  sub: 'Expert heating & cooling service from technicians you can trust.',
  emergencyLine: '24/7 Emergency HVAC Service',
  proofLine: ['Same-Day Service', 'Upfront Pricing', 'Licensed & Insured'],
  serviceLine: ['Heating', 'Cooling', 'Indoor Air Quality', '24/7 Emergency Service'],
  targetTemp: 72,
  tempCaption: 'Feels pretty good, doesn’t it?',
  primaryCta: { label: 'Schedule Service', href: '#estimate' },
  secondaryCta: { label: 'Call Now', href: '#lead-form' },
}

/**
 * The site's signature moment: three big, unmissable choices right under the
 * hero. Selecting one reveals a 3-field lead-capture form in place — the
 * fastest possible path from "I have a problem" to "we have your number."
 * `emergency: true` swaps the reveal copy to lean into urgency.
 */
export const quickHelp = {
  eyebrow: 'Quick help',
  title: 'What Can We Help You With?',
  sub: 'Answer a few quick questions and we’ll take it from there.',
  options: [
    { id: 'no-cooling', label: 'AC Isn’t Cooling', icon: 'snow' },
    { id: 'no-heat', label: 'Heat Isn’t Working', icon: 'flame' },
    { id: 'air-quality', label: 'Air Quality / Airflow Problem', icon: 'wind' },
    { id: 'other', label: 'Something Else', icon: 'wrench' },
  ],
  urgencyTitle: 'We can help. How soon do you need service?',
  urgencyOptions: ['Today', 'Tomorrow', 'This Week', 'Just Getting an Estimate'],
  zipTitle: 'What’s your ZIP code?',
  zipSub: 'So we can confirm we cover your area.',
  contactTitle: 'Almost there — how should we reach you?',
  cta: 'Request Service',
}

/**
 * The full service catalog (Air Conditioning / Heating / Heat Pumps / Mini
 * Splits / Indoor Air Quality / Maintenance / Emergency) — the primary
 * services showcase on the page. `size` drives an asymmetric bento layout so
 * the grid doesn't read as equal-size generic cards.
 */
export const serviceCatalog = [
  {
    id: 'catalog-ac',
    title: 'Air Conditioning',
    accent: 'cool',
    icon: 'snow',
    what: 'Repair, replacement and installation for central AC systems.',
    benefit: 'Even cooling in every room, sized right for your home.',
    cta: 'Explore AC Service',
    href: '#estimate',
    size: 'lg',
  },
  {
    id: 'catalog-heating',
    title: 'Heating',
    accent: 'warm',
    icon: 'sun',
    what: 'Furnace repair, installation and seasonal heating maintenance.',
    benefit: 'Dependable warmth through the coldest months.',
    cta: 'Explore Heating',
    href: '#estimate',
    size: 'lg',
  },
  {
    id: 'catalog-heat-pumps',
    title: 'Heat Pumps',
    accent: 'fresh',
    icon: 'gauge',
    what: 'High-efficiency heat pump service, repair and installation.',
    benefit: 'One system, efficient heating and cooling year-round.',
    cta: 'Learn About Heat Pumps',
    href: '#estimate',
    size: 'md',
  },
  {
    id: 'catalog-mini-splits',
    title: 'Ductless Mini Splits',
    accent: 'cool',
    icon: 'wind',
    what: 'Ductless system installation for additions, garages and retrofits.',
    benefit: 'Room-by-room comfort without new ductwork.',
    cta: 'Ask About Mini Splits',
    href: '#estimate',
    size: 'md',
  },
  {
    id: 'catalog-iaq',
    title: 'Indoor Air Quality',
    accent: 'fresh',
    icon: 'leaf',
    what: 'Filtration, purification, humidity control and duct services.',
    benefit: 'Air that feels as good as the temperature.',
    cta: 'Improve My Air',
    href: '#estimate',
    size: 'md',
  },
  {
    id: 'catalog-maintenance',
    title: 'Maintenance',
    accent: 'fresh',
    icon: 'wrench',
    what: 'Seasonal tune-ups that catch small issues before they grow.',
    benefit: 'Fewer breakdowns, longer equipment life.',
    cta: 'Join the Comfort Club',
    href: '#membership',
    size: 'md',
  },
  {
    id: 'catalog-emergency',
    title: 'Emergency Service',
    accent: 'alert',
    icon: 'alert',
    what: '24/7 emergency HVAC repair when a system fails without warning.',
    benefit: 'Help when you need it, not just during business hours.',
    cta: 'Call Now',
    href: '#lead-form',
    size: 'lg',
  },
]

/**
 * "Find the Right Comfort System for Your Home" — premium interactive
 * equipment explorer. Benefits are homeowner-facing outcomes, not spec
 * sheets, per the brief's "consumer product, not contractor list" note.
 */
export const equipment = {
  title: 'Find the Right Comfort System for Your Home',
  sub: 'Every home is different. Explore the main system types and see which fits how you live.',
  options: [
    {
      id: 'central-ac',
      label: 'Central AC',
      icon: 'snow',
      accent: 'cool',
      summary: 'Whole-home cooling through your existing ductwork.',
      benefits: [
        'Even temperatures in every room',
        'Works with your existing ducts',
        'Pairs with a smart thermostat',
      ],
    },
    {
      id: 'heat-pumps',
      label: 'Heat Pumps',
      icon: 'gauge',
      accent: 'fresh',
      summary: 'One system that heats and cools efficiently, year-round.',
      benefits: [
        'Heating and cooling in a single system',
        'Lower operating costs in moderate climates',
        'Modern, quiet outdoor units',
      ],
    },
    {
      id: 'furnaces',
      label: 'Furnaces',
      icon: 'sun',
      accent: 'warm',
      summary: 'Fast, powerful heat for cold-weather reliability.',
      benefits: [
        'Strong performance in the coldest months',
        'Wide range of efficiency tiers',
        'Long service life with regular maintenance',
      ],
    },
    {
      id: 'mini-splits',
      label: 'Ductless Mini Splits',
      icon: 'wind',
      accent: 'cool',
      summary: 'Targeted comfort for rooms your ductwork can’t reach.',
      benefits: [
        'No ductwork required',
        'Independent control room by room',
        'Ideal for additions and older homes',
      ],
    },
    {
      id: 'iaq',
      label: 'Indoor Air Quality',
      icon: 'leaf',
      accent: 'fresh',
      summary: 'Filtration and humidity control that clean the air itself.',
      benefits: [
        'Fewer airborne allergens and dust',
        'More stable indoor humidity',
        'Works alongside any system type',
      ],
    },
  ],
  cta: 'See What Fits My Home',
}

export const wizard = {
  title: 'GET MY ESTIMATE',
  sub: 'Answer a few quick questions for a ballpark recommendation — no pricing promised, just a starting point.',
  ctaLabel: 'Request My Estimate',
  steps: [
    {
      id: 'homeType',
      question: 'What type of home do you have?',
      options: ['House', 'Condo', 'Townhome', 'Other'],
    },
    {
      id: 'size',
      question: 'Approximately how large is your home?',
      options: [
        'Under 1,500 sq. ft.',
        '1,500–2,500 sq. ft.',
        '2,500–3,500 sq. ft.',
        'Over 3,500 sq. ft.',
      ],
    },
    {
      id: 'priority',
      question: 'What matters most?',
      options: [
        'Lowest upfront cost',
        'Lower energy bills',
        'Maximum comfort',
        'Quiet operation',
        'Best overall system',
      ],
    },
    {
      id: 'age',
      question: 'How old is your current system?',
      options: ['Under 5 years', '5–10 years', '10–15 years', '15+ years', 'Not sure'],
    },
    {
      id: 'concern',
      question: 'What’s your primary concern?',
      options: [
        'No heat',
        'No AC',
        'Rising energy bills',
        'Noisy or aging equipment',
        'Poor air quality',
        'Just exploring options',
      ],
    },
  ],
}

/**
 * Illustrative only — maps the priority answer to a system category. No price
 * is quoted anywhere, by design: a real quote requires a load calculation.
 */
export const wizardRecommendations = {
  'Lowest upfront cost':
    'a reliable single-stage system, sized correctly for your home, may be the most sensible starting point.',
  'Lower energy bills':
    'a high-efficiency variable-speed system may be worth considering.',
  'Maximum comfort':
    'a variable-speed system with zoning may be worth considering.',
  'Quiet operation':
    'a variable-speed system with a sound-insulated outdoor unit may be worth considering.',
  'Best overall system':
    'a high-efficiency variable-speed system with smart controls may be worth considering.',
}

// PLACEHOLDER — invented demonstration figures, not performance claims.
export const stats = [
  { value: 4.9, suffix: '', decimals: 1, label: 'Average Customer Rating', stars: true },
  { value: 2500, suffix: '+', label: 'Homes Made Comfortable' },
  { value: null, display: '24/7', label: 'Emergency Service' },
  { value: 100, suffix: '%', label: 'Satisfaction Commitment' },
]

// PLACEHOLDER — invented rating/review count for the demo. `href` points
// back to the top of the page, matching the same placeholder convention used
// for `socials` above, since there is no real Google Business Profile to link.
export const googleReviews = {
  rating: 4.9,
  reviewCount: 214,
  href: '#top',
  ariaLabel: 'Google Business Profile — placeholder link, sample demonstration content',
}

// Horizontal, icon-driven trust indicators — not a stat grid, not a card
// grid. Nothing here is a fabricated number, so it needs no sample-content
// label on its own.
export const trustIndicators = [
  { icon: 'shield', label: 'Licensed & Insured' },
  { icon: 'star', label: '5-Star Service' },
  { icon: 'sliders', label: 'Upfront Pricing' },
  { icon: 'calendar', label: 'Financing Available' },
  { icon: 'check', label: 'Satisfaction Focused' },
  { icon: 'mapPin', label: 'Locally Trusted' },
]

// PLACEHOLDER — invented reviews from invented customers.
export const testimonials = [
  {
    quote:
      'Called first thing in the morning when the AC quit and someone was here before lunch. The tech explained what failed and what it would cost before touching anything.',
    name: 'Dana R.',
    detail: 'Knoxville · AC Repair',
  },
  {
    quote:
      'They put down floor protection, cleaned up completely, and walked me through the new thermostat twice because I asked. The install looks better than the old one ever did.',
    name: 'Marcus T.',
    detail: 'Maryville · System Replacement',
  },
  {
    quote:
      'Our upstairs was always about five degrees warmer than downstairs. After the duct work and the new system, it finally feels like one house.',
    name: 'Priya S.',
    detail: 'Sevierville · Duct & Replacement',
  },
  {
    quote:
      'The bill dropped noticeably over the first summer. Not a miracle, but a real difference, and they set expectations honestly up front.',
    name: 'Ellen W.',
    detail: 'Oak Ridge · High-Efficiency Upgrade',
  },
  {
    quote:
      'What I appreciated most was the communication — text when they were on the way, photos of what they found, and no pressure to buy anything extra.',
    name: 'Tomas L.',
    detail: 'Knoxville · Maintenance Plan',
  },
]

export const transformation = {
  title: 'From Old Equipment to Modern Comfort',
  before: {
    label: 'Before',
    points: [
      'Aging HVAC system',
      'Uneven temperatures',
      'High energy bills',
      'No smart controls',
      'Frequent repairs',
    ],
  },
  after: {
    label: 'After',
    points: [
      'High-efficiency system',
      'Consistent temperatures',
      'Improved energy efficiency',
      'Smart thermostat',
      'Quieter operation',
    ],
  },
}

// PLACEHOLDER — invented service areas, replace with the customer's real ones.
export const serviceAreas = ['Knoxville', 'Maryville', 'Sevierville', 'Oak Ridge']

// PLACEHOLDER — invented staff. Replace with the customer's real team.
// `photo` is an optional imported image (see Hero.jsx's heroFamilyPhoto for
// the pattern) — left empty here because no headshots exist yet. When a real
// photo set ships, import each file in TeamSection.jsx and set it here; the
// component already renders it in place of the monogram when present.
export const team = [
  {
    name: 'Ray Alvarez',
    role: 'Founder & Lead Technician',
    experience: '22 yrs',
    initials: 'RA',
    photo: undefined,
  },
  {
    name: 'Nina Okafor',
    role: 'Service Manager',
    experience: '11 yrs',
    initials: 'NO',
    photo: undefined,
  },
  {
    name: 'Caleb Voss',
    role: 'Installation Lead',
    experience: '14 yrs',
    initials: 'CV',
    photo: undefined,
  },
  {
    name: 'Priya Raman',
    role: 'Air Quality Specialist',
    experience: '8 yrs',
    initials: 'PR',
    photo: undefined,
  },
]

export const membership = {
  title: 'Comfort Without the Surprises.',
  sub: 'A maintenance membership keeps the system tuned, the schedule predictable and the surprises to a minimum.',
  benefits: [
    { title: 'Two seasonal tune-ups', detail: 'One before cooling season, one before heating season.' },
    { title: 'Priority scheduling', detail: 'Members move ahead of the standard queue on busy days.' },
    { title: 'Reduced repair pricing', detail: 'A member rate on repairs, applied automatically.' },
    { title: 'System performance checks', detail: 'Airflow, refrigerant and safety checks each visit.' },
    { title: 'Filter reminders', detail: 'A nudge when it is actually time — not on a generic timer.' },
    { title: 'No overtime fee', detail: 'On qualifying service calls, evenings and weekends included.' },
  ],
  cta: 'Join the Comfort Club',
}

export const financing = {
  title: 'Comfort Now. Flexible Payment Options.',
  sub: 'Flexible financing options may be available for qualified homeowners — ask us when you schedule.',
  points: [
    'Options for repairs, replacements and new installs',
    'Simple application process',
    'Terms depend on approval and qualification',
  ],
  disclaimer:
    'Sample demonstration content. No specific rates, terms or approval are guaranteed here — a real financing partner would supply actual offer details.',
  cta: 'Explore Financing',
}

// Payment methods accepted for standard (non-financed) service — shown as a
// trust row near the financing pitch. Real card-network marks would replace
// these placeholder glyphs on a live customer site.
export const paymentMethods = [
  { id: 'visa', label: 'Visa' },
  { id: 'mastercard', label: 'Mastercard' },
  { id: 'amex', label: 'American Express' },
  { id: 'discover', label: 'Discover' },
  { id: 'paypal', label: 'PayPal' },
  { id: 'applePay', label: 'Apple Pay' },
]

export const efficiency = {
  title: 'Stop Paying to Condition the Outdoors.',
  sub: 'Older equipment does not just run longer — it runs harder, and the difference shows up every month.',
  // Conceptual illustration only. Not a measurement, not a guarantee.
  older: { label: 'Older System', value: 100 },
  modern: { label: 'High-Efficiency System', value: 62 },
  disclaimer:
    'Illustrative comparison only. Actual energy use and savings depend on your equipment, your home, your local climate and how you use the system.',
  cta: 'Explore High-Efficiency Options',
}

export const leadForm = {
  title: 'Book Your Appointment Online',
  sub: 'Pick a date and time that works for you — no phone call required.',
  helpOptions: [
    'No cooling',
    'No heat',
    'Maintenance',
    'New system / replacement',
    'Indoor air quality',
    'Something else',
  ],
  timeWindowOptions: ['Morning (8–11am)', 'Afternoon (12–4pm)', 'Evening (4–7pm)'],
  contactMethods: ['Call', 'Text', 'Email'],
  cta: 'Book My Appointment',
}

export const scheduleSheet = {
  title: 'Let’s get your home comfortable again.',
  needQuestion: 'What do you need help with?',
  needOptions: ['No Cooling', 'No Heat', 'Maintenance', 'New System', 'Air Quality', 'Something Else'],
  timingQuestion: 'Preferred timing',
  timingOptions: ['ASAP', 'Today', 'Tomorrow', 'This Week'],
}

export const bwe = {
  name: 'Business Web Express',
  url: 'https://businesswebexpress.com',
  bannerText: 'HVAC Website Demonstration by Business Web Express',
  bannerCta: 'Get a Website Like This',
  headline: 'Imagine This Built for Your HVAC Company.',
  yours: [
    'Your logo.',
    'Your services.',
    'Your service area.',
    'Your technicians.',
    'Your reviews.',
    'Your customers.',
  ],
  pitch:
    'Business Web Express creates modern custom websites designed to help local businesses turn more website visitors into customers.',
  primaryCta: 'Build My Free Prototype',
  secondaryCta: 'Visit BusinessWebExpress.com',
}

export const footerColumns = [
  {
    title: 'Services',
    links: [
      { label: 'Heating', href: '#all-services' },
      { label: 'Cooling', href: '#all-services' },
      { label: 'Indoor Air Quality', href: '#all-services' },
      { label: 'Maintenance', href: '#membership' },
      { label: 'Emergency Service', href: '#lead-form' },
      { label: 'Financing', href: '#lead-form' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Our Team', href: '#team' },
      { label: 'Service Area', href: '#service-area' },
      { label: 'Reviews', href: '#testimonials' },
      { label: 'Comfort Membership', href: '#membership' },
      { label: 'Request Service', href: '#lead-form' },
    ],
  },
]

export const legalLinks = [
  { label: 'Privacy Policy', href: '#lead-form' },
  { label: 'Terms', href: '#lead-form' },
]

export const demoDisclaimer =
  'This is a demonstration website created by Business Web Express. Company names, reviews, statistics, team members and service information shown on this demonstration may be fictional.'
