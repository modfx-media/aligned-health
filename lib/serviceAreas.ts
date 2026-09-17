import type { CityLocation } from "@/lib/locations";
import type { Service } from "@/lib/services";

/**
 * Content-generation layer for the /areas-we-serve city x service pages.
 *
 * Every locally flavored sentence weaves in a real fact from CityLocation
 * (freeway, landmark, neighborhood, drive time) so ~420 generated pages
 * stay honest. No invented statistics.
 */

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function pick<T>(options: readonly T[], hash: number, salt: number): T {
  return options[(hash + salt) % options.length];
}

function driveClause(location: CityLocation): string {
  if (location.home) {
    return "right here in Laguna Hills";
  }
  return `about ${location.driveMinutes} minutes from ${location.name} via ${location.freeway}`;
}

export interface CityOverviewContent {
  intro: string;
  commuteNote: string;
  localStory: string;
  localFaq: { q: string; a: string };
  extraFaqs: ReadonlyArray<{ q: string; a: string }>;
}

const CITY_INTRO_TEMPLATES: ReadonlyArray<(location: CityLocation) => string> = [
  (l) =>
    `If you live near ${l.landmark} and you are tired of being in and out of a visit in ten minutes, our Laguna Hills clinic is ${driveClause(l)}. Dr. Dustin Hack and Dr. Tara Hadden still run one-on-one sessions — adjustment, muscle work, and a plan you can actually follow.`,
  (l) =>
    `${l.name} patients from the ${l.neighborhood} area come to Aligned Health when back pain, a stiff neck, or a sports tweak stops responding to stretching at home. The office is ${driveClause(l)}, close enough for a real care plan instead of a one-off.`,
  (l) =>
    `We see a steady share of ${l.name} residents every week. The drive in, ${driveClause(l)}, is the kind of trip people keep making because the visit itself is unhurried — not because we advertised a gimmick.`,
  (l) =>
    l.home
      ? `Looking for a chiropractor in Laguna Hills who will actually treat you, not rush you? We are at 26071 Merit Circle, a short hop from ${l.landmark}. Most PPO plans are accepted; we verify coverage before you book.`
      : `Looking for a chiropractor who will treat you if you live in ${l.name}? We are based at 26071 Merit Circle in Laguna Hills, ${driveClause(l)} from ${l.landmark}. Most PPO plans are accepted; we verify coverage before you book.`,
];

const CITY_COMMUTE_TEMPLATES: ReadonlyArray<(location: CityLocation) => string> = [
  (l) =>
    l.home
      ? `Our office is in Laguna Hills, so if you live nearby you are already close.`
      : `Most ${l.name} patients take ${l.freeway}. Door-to-door it is roughly ${l.driveMinutes} minutes outside of peak traffic.`,
  (l) =>
    l.home
      ? `Being based in Laguna Hills means we know this office, and this neighborhood, better than anyone.`
      : `From the ${l.neighborhood} area of ${l.name}, expect around ${l.driveMinutes} minutes via ${l.freeway} to reach Merit Circle.`,
];

const CITY_STORY_TEMPLATES: ReadonlyArray<(location: CityLocation) => string> = [
  (l) =>
    `People driving in from ${l.name} are often desk workers with a tight neck, parents who lifted one too many car seats, or athletes who want to stay in the game. We do not run a mill. You see a doctor, not a rotation of assistants, and we will tell you if chiropractic is the wrong next step.`,
  (l) =>
    `A lot of ${l.name} patients arrive after they have already tried rest, a heating pad, and “it should loosen up.” If the joint is stuck or a disc is irritated, stretching alone rarely fixes it. That is the conversation we have on visit one.`,
  (l) =>
    `We keep the same hours for ${l.name} commuters as we do for Laguna Hills locals: early mornings most weekdays, Saturday by appointment. If you need us to check a PPO plan (Aetna, Anthem, Blue Shield of CA, United, Cigna), call (949) 557-7208 before you drive over.`,
];

const CITY_FAQ_TEMPLATES: ReadonlyArray<(location: CityLocation) => { q: string; a: string }> = [
  (l) => ({
    q: `Do you see patients from ${l.name}?`,
    a: `Yes. ${l.name} is one of the communities we treat every week, including people who live near ${l.neighborhood}. The drive is ${driveClause(l)}. You do not need a referral to book.`,
  }),
  (l) => ({
    q: `How far is Aligned Health from ${l.name}?`,
    a: l.home
      ? `Our office is in Laguna Hills, so if you live nearby you are already close.`
      : `Aligned Health is ${driveClause(l)}. Most ${l.name} patients treat it as a normal part of their week, not a special trip.`,
  }),
  (l) => ({
    q: `Is Aligned Health convenient if I live near ${l.landmark}?`,
    a: `It should be. We are ${driveClause(l)}. Patients near ${l.landmark} come in for both one-off recovery sessions and ongoing care plans.`,
  }),
];

function extraCityFaqs(location: CityLocation): Array<{ q: string; a: string }> {
  return [
    {
      q: `Does PPO insurance cover a chiropractor if I live in ${location.name}?`,
      a: `Most PPO plans we see from ${location.name} patients cover medically necessary chiropractic care, usually with a copay after the deductible. We accept Aetna, Meritain, Anthem Blue Cross, Blue Shield of CA, United Healthcare, and Cigna. Call (949) 557-7208 and we will verify your benefits before you book so there are no surprises.`,
    },
    {
      q: `Can a chiropractor help a pinched nerve if I am coming from ${location.name}?`,
      a: `Often, yes — if the irritation is mechanical. A “pinched nerve” is usually a joint, disc, or tight muscle crowding a nerve root. We screen for red flags (progressive weakness, bowel or bladder changes, fever, unexplained weight loss) first. If it is in our scope, we use adjustments, decompression when needed, and soft-tissue work. If it is not, we send you to the right specialist instead of guessing.`,
    },
    {
      q: `How much is a chiropractor visit without insurance if I drive from ${location.name}?`,
      a: `Cash-pay is available. We do not post a single number because a first visit includes the exam, and follow-ups are shorter. Call (949) 557-7208 before you leave ${location.name} and we will quote the cash-pay amount for that day. HSA, FSA, and HRA cards are welcome.`,
    },
  ];
}

export function buildCityOverview(location: CityLocation): CityOverviewContent {
  const hash = hashString(location.slug);
  return {
    intro: pick(CITY_INTRO_TEMPLATES, hash, 0)(location),
    commuteNote: pick(CITY_COMMUTE_TEMPLATES, hash, 1)(location),
    localStory: pick(CITY_STORY_TEMPLATES, hash, 3)(location),
    localFaq: pick(CITY_FAQ_TEMPLATES, hash, 2)(location),
    extraFaqs: extraCityFaqs(location),
  };
}

export interface ServiceAreaContent {
  metaTitle: string;
  metaDescription: string;
  intro: string;
  localStory: string;
  whyChooseUs: string[];
  localFaq: { q: string; a: string };
  extraFaqs: ReadonlyArray<{ q: string; a: string }>;
  commuteNote: string;
  structuralVariant: 0 | 1 | 2;
}

const COMBO_INTRO_TEMPLATES: ReadonlyArray<
  (service: Service, location: CityLocation) => string
> = [
  (s, l) =>
    `If you are looking for ${s.label.toLowerCase()} near ${l.name}, you do not have to sit in a crowded waiting room for a two-minute visit. Aligned Health is ${driveClause(l)}. ${l.name} patients near ${l.landmark} come here for ${s.short.toLowerCase()} with a doctor in the room the whole time.`,
  (s, l) =>
    `${s.label} is one of 14 things we can do on site for people driving in from ${l.name}. The office sits ${driveClause(l)}, which is close enough for ${l.neighborhood} residents to keep a real schedule instead of “I’ll go when it gets bad.”`,
  (s, l) =>
    `For ${l.name} residents near ${l.neighborhood}, ${s.label.toLowerCase()} at Aligned Health means hands-on care, not a rushed appointment. Our office is ${driveClause(l)}. Most PPO plans are accepted.`,
  (s, l) =>
    `Patients from ${l.name}, including those near ${l.landmark}, make the trip ${driveClause(l)} for ${s.label.toLowerCase()}. We would rather you know what we can and cannot fix on visit one than sell you a 20-visit package you do not need.`,
];

const COMBO_STORY_TEMPLATES: ReadonlyArray<
  (service: Service, location: CityLocation) => string
> = [
  (s, l) =>
    `A typical first visit from ${l.name} runs about 45 minutes: history, exam, and — when it is appropriate — ${s.label.toLowerCase()} that day. Follow-ups are shorter. If you are coming from ${l.neighborhood}, we will work around commute traffic rather than pretending everyone lives next door.`,
  (s, l) =>
    `We pair ${s.label.toLowerCase()} with whatever else the tissue actually needs — percussion, decompression, scraping, red light — so a ${l.name} patient is not sent across town for a second stop. That only works because all 14 services live in the same Laguna Hills suite.`,
  (s, l) =>
    `${s.label} is not a miracle. It helps when the problem is mechanical. If you have a red flag (new bowel or bladder changes, fever with back pain, unexplained weight loss, or weakness that is getting worse), we will not adjust first and ask later. ${l.name} patients get the same screening as everyone else.`,
];

const COMBO_WHY_TEMPLATES: ReadonlyArray<
  (service: Service, location: CityLocation) => string
> = [
  (s, l) =>
    `A straightforward drive from ${l.neighborhood}. Most ${l.name} patients reach us ${driveClause(l)}.`,
  (s, l) =>
    `${s.label} sits next to 13 other on-site modalities, so ${l.name} patients do not need a second appointment across town.`,
  (s, l) =>
    s.benefits[0]?.replace(/&rsquo;/g, "\u2019") ??
    `Straightforward, evidence-informed care for ${l.name} patients.`,
  (s, l) =>
    `We already treat people commuting in via ${l.freeway}, so we know the hours that actually work for ${l.name} residents.`,
];

const COMBO_FAQ_TEMPLATES: ReadonlyArray<
  (service: Service, location: CityLocation) => { q: string; a: string }
> = [
  (s, l) => ({
    q: `Do you offer ${s.label.toLowerCase()} for patients coming from ${l.name}?`,
    a: `Yes. ${l.name} residents, including people near ${l.landmark}, come in for ${s.label.toLowerCase()} every week. The drive is ${driveClause(l)}. No referral needed.`,
  }),
  (s, l) => ({
    q: `How far is Aligned Health from ${l.name} for ${s.label.toLowerCase()}?`,
    a: l.home
      ? `We are based in Laguna Hills, so if you are local you are already close.`
      : `Aligned Health is ${driveClause(l)}. Most ${l.name} patients treat it as a normal part of their week.`,
  }),
  (s, l) => ({
    q: `Can I combine ${s.label.toLowerCase()} with other services in one visit?`,
    a: `Yes. Most ${l.name} patients pair ${s.label.toLowerCase()} with one or two other modalities in the same appointment, so the ${driveClause(l)} trip covers more ground.`,
  }),
];

const COMBO_COMMUTE_TEMPLATES: ReadonlyArray<(location: CityLocation) => string> = [
  (l) =>
    l.home
      ? `No commute needed — our office is in Laguna Hills.`
      : `Expect roughly ${l.driveMinutes} minutes via ${l.freeway} from the ${l.neighborhood} area of ${l.name}.`,
  (l) =>
    l.home
      ? `Laguna Hills is home turf. You are not driving to another city for care.`
      : `From ${l.name}, ${l.freeway} is the most direct route in, about ${l.driveMinutes} minutes door-to-door.`,
];

function extraComboFaqs(
  service: Service,
  location: CityLocation,
): Array<{ q: string; a: string }> {
  return [
    {
      q: `Will my PPO cover ${service.label.toLowerCase()} if I live in ${location.name}?`,
      a: `Often yes, when it is medically necessary. We verify Aetna, Anthem, Blue Shield of CA, United, Cigna, and Meritain before the first visit. Call (949) 557-7208 from ${location.name} and we will tell you the copay before you get in the car.`,
    },
    {
      q: `What should I wear to ${service.label.toLowerCase()} if I am driving from ${location.name}?`,
      a: `Clothes you can move in. Skip the suit jacket. First visits run about 45 minutes; follow-ups are shorter. If you are coming from ${location.neighborhood}, give yourself a few extra minutes on ${location.freeway} at rush hour.`,
    },
    {
      q: `Is ${service.label} the right next step if I live in ${location.name}?`,
      a: `${service.intro.lead.replace(/&rsquo;/g, "\u2019").replace(/&[a-z]+;/g, "")} We will tell you on visit one whether it is the right tool, or whether you need something else in the same office — or a referral.`,
    },
  ];
}

export function buildServiceAreaContent(
  service: Service,
  location: CityLocation,
): ServiceAreaContent {
  const hash = hashString(`${location.slug}::${service.slug}`);

  return {
    metaTitle: `${service.label} in ${location.name}, CA · Aligned Health`,
    metaDescription: location.home
      ? `${service.label} in Laguna Hills with one-on-one visits. Most PPO plans verified before you book.`
      : `${service.label} for ${location.name} patients at our Laguna Hills office — about ${location.driveMinutes} minutes via ${location.freeway}. Most PPO plans accepted.`,
    intro: pick(COMBO_INTRO_TEMPLATES, hash, 0)(service, location),
    localStory: pick(COMBO_STORY_TEMPLATES, hash, 6)(service, location),
    whyChooseUs: [
      pick(COMBO_WHY_TEMPLATES, hash, 1)(service, location),
      pick(COMBO_WHY_TEMPLATES, hash, 2)(service, location),
      pick(COMBO_WHY_TEMPLATES, hash, 3)(service, location),
    ],
    localFaq: pick(COMBO_FAQ_TEMPLATES, hash, 4)(service, location),
    extraFaqs: extraComboFaqs(service, location),
    commuteNote: pick(COMBO_COMMUTE_TEMPLATES, hash, 5)(location),
    structuralVariant: (hash % 3) as 0 | 1 | 2,
  };
}

export interface ServiceAreaCombo {
  service: Service;
  location: CityLocation;
}

export function getAllServiceAreaCombos(
  services: readonly Service[],
  locations: readonly CityLocation[],
): ServiceAreaCombo[] {
  const combos: ServiceAreaCombo[] = [];
  for (const location of locations) {
    for (const service of services) {
      combos.push({ service, location });
    }
  }
  return combos;
}
