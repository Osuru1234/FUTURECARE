import { ArrowRight } from 'lucide-react';
import {
  EARLY_CARE_LAB_IMAGE_PATH,
  HERO_IMAGE_PATH,
  IMPACT_TESTIMONIALS,
  WORKSHOP_CIRCLE_IMAGE_PATH,
} from '../data/futurecareData';
import { PlatformView } from '../types/futurecare';
import { ImageWithFallback } from './ImageWithFallback';

interface OverviewSectionProps {
  onNavigate: (view: PlatformView) => void;
  onOpenCohortModal: () => void;
}

const IMPACT_METRICS = [
  {
    value: '84%',
    label: 'Leadership promotion rate',
    context: 'Among mentored cohorts within 12 months',
  },
  {
    value: '0–8 yrs',
    label: 'Integrated childcare & play',
    context: 'On-site studio care and stipends for every session',
  },
  {
    value: '1,420+',
    label: 'Active mentor matches',
    context: 'Across executive, STEM, policy, and returnship tracks',
  },
  {
    value: '96%',
    label: 'Workshop completion',
    context: 'Sustained participation for mothers with young children',
  },
];

export function OverviewSection({
  onNavigate,
  onOpenCohortModal,
}: OverviewSectionProps) {
  const go = (view: PlatformView) => {
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-slate-50">
      {/* Hero Split */}
      <section className="mx-auto max-w-[1200px] px-6 pt-10 pb-12 lg:pt-14 lg:pb-16">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <p className="text-sm font-medium text-indigo-800">
                SDG 5 Gender Equality &amp; Early Childhood Alliance
              </p>
              <h1 className="mt-4 font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.08] font-bold tracking-tight text-slate-900 [text-wrap:balance]">
                Bridge the leadership gap without leaving early childhood behind.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">
                FutureCare connects women to senior executive mentorship, practical skill
                workshops, and peer leadership networks—paired directly with supervised
                care and STEM play labs for children ages 0 to 8.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={() => go('mentorship')}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-800 px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-indigo-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-800"
              >
                <span>Explore Mentorship</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go('early-care')}
                className="inline-flex items-center gap-1.5 py-2 text-sm font-semibold text-slate-800 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-indigo-800 hover:decoration-indigo-800 whitespace-nowrap shrink-0"
              >
                Ages 0–8 Care &amp; Playbooks
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-full min-h-[280px] overflow-hidden rounded-xl border border-slate-200 bg-white">
              <ImageWithFallback
                src={HERO_IMAGE_PATH}
                alt="Senior executive mentor and emerging woman leader reviewing strategy documents together in a sunlit modern workspace"
                fallbackLabel="Executive Mentorship Session"
                className="h-full w-full object-cover lg:h-full"
              />
            </div>
          </div>
        </div>

        {/* Full-width 4-column Impact Strip */}
        <div className="mt-10 grid grid-cols-1 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
          {IMPACT_METRICS.map((item) => (
            <div key={item.label} className="p-6">
              <p className="font-mono text-2xl font-semibold tracking-tight text-slate-900 tabular-nums">
                {item.value}
              </p>
              <p className="mt-1.5 font-display text-sm font-semibold text-slate-900">
                {item.label}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                {item.context}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Asymmetric Bento Capabilities */}
      <section className="border-t border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl [text-wrap:balance]">
              Four integrated pillars built around real career and caregiving timelines.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Women frequently exit senior tracks during the first eight years of
              parenthood. FutureCare removes that friction while cultivating early
              confidence and STEM fluency for girls ages 0 to 8.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Pillar 01 - Wide */}
            <article className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/70 p-7 lg:col-span-7">
              <div>
                <p className="font-mono text-xs font-medium text-indigo-800">
                  01. Executive &amp; Career Mentorship
                </p>
                <h3 className="mt-2 font-display text-xl font-bold text-slate-900">
                  1:1 Sponsorship with Sitting VPs, COOs &amp; Policy Directors
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                  Match with vetted leaders across engineering, operations, venture
                  capital, and public policy. Every care-covered time slot includes
                  verified backup care or studio room access for children ages 0 to 8.
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 text-xs text-slate-600">
                <span>6 Senior Mentors Active · Care-Covered Scheduling</span>
                <button
                  type="button"
                  onClick={() => go('mentorship')}
                  className="inline-flex items-center gap-1 font-semibold text-indigo-800 hover:text-indigo-950 whitespace-nowrap shrink-0"
                >
                  <span>Browse Mentors</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </article>

            {/* Pillar 02 - Media Card */}
            <article className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white lg:col-span-5">
              <div className="aspect-[4/3] w-full overflow-hidden border-b border-slate-200">
                <ImageWithFallback
                  src={WORKSHOP_CIRCLE_IMAGE_PATH}
                  alt="Diverse group of women professionals collaborating around a table in a sunlit leadership workshop"
                  fallbackLabel="Leadership Skill Workshops"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <p className="font-mono text-xs font-medium text-indigo-800">
                    02. Skill Workshops
                  </p>
                  <h3 className="mt-1.5 font-display text-lg font-bold text-slate-900">
                    Board Readiness, Equity &amp; Technical Scope
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Interactive 90-to-150 minute working sessions on P&amp;L fluency,
                    compensation negotiation, and early STEM pedagogy.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => go('workshops')}
                  className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-indigo-800 hover:text-indigo-950 whitespace-nowrap shrink-0"
                >
                  <span>View Workshop Schedule</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </article>

            {/* Pillar 03 - Media Card (0-8 Focus) */}
            <article className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white lg:col-span-6">
              <div className="aspect-[4/3] w-full overflow-hidden border-b border-slate-200">
                <ImageWithFallback
                  src={EARLY_CARE_LAB_IMAGE_PATH}
                  alt="Young children ages 4 to 7 with an educator exploring wooden geometric blocks and early STEM kits"
                  fallbackLabel="Ages 0–8 Early Learning Studio"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <p className="font-mono text-xs font-medium text-indigo-800">
                    03. Ages 0–8 Care &amp; Early Empowerment
                  </p>
                  <h3 className="mt-1.5 font-display text-lg font-bold text-slate-900">
                    Developmental Equity from Infancy Through Age Eight
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Access on-site care stipends alongside stage-by-stage playbooks
                    (0–2, 3–5, and 6–8 years) built to nurture spatial reasoning,
                    tactile robotics, and fearless curiosity in young girls.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => go('early-care')}
                  className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-indigo-800 hover:text-indigo-950 whitespace-nowrap shrink-0"
                >
                  <span>Open 0–8 Care &amp; Playbooks</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </article>

            {/* Pillar 04 - Network Card */}
            <article className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/70 p-7 lg:col-span-6">
              <div>
                <p className="font-mono text-xs font-medium text-indigo-800">
                  04. Peer Leadership Circles &amp; Chapters
                </p>
                <h3 className="mt-2 font-display text-xl font-bold text-slate-900">
                  High-Trust Networking Without Late-Night Care Barriers
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                  Most executive networking happens after 6 PM—excluding parents of
                  infants and young children. FutureCare hosts daytime and
                  care-supported chapters across London, New York, Toronto, Berlin,
                  Madrid, and Singapore.
                </p>

                <div className="mt-6 space-y-3 border-t border-slate-200 pt-5 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-800">
                      Executive Mothers &amp; Caregivers Circle
                    </span>
                    <span className="font-mono text-xs text-slate-500 tabular-nums">
                      384 members
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-800">
                      Women Building Deep Tech &amp; AI
                    </span>
                    <span className="font-mono text-xs text-slate-500 tabular-nums">
                      512 members
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-800">
                      Leadership Returnship &amp; Relaunch Guild
                    </span>
                    <span className="font-mono text-xs text-slate-500 tabular-nums">
                      248 members
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 text-xs text-slate-600">
                <span>Weekly Roundtables · Peer Cohort Board</span>
                <button
                  type="button"
                  onClick={() => go('network')}
                  className="inline-flex items-center gap-1 font-semibold text-indigo-800 hover:text-indigo-950 whitespace-nowrap shrink-0"
                >
                  <span>Join a Circle</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Claim-to-Proof Outcomes */}
      <section className="border-t border-slate-200 bg-slate-50 py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900">
                Measured Outcomes Across Cohorts
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Verified transitions from mid-career managers and returning parents into
                executive leadership roles.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {IMPACT_TESTIMONIALS.map((item) => (
              <blockquote
                key={item.id}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-7"
              >
                <p className="text-base leading-relaxed text-slate-700">
                  “{item.quote}”
                </p>
                <footer className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4 text-xs">
                  <div>
                    <p className="font-display font-semibold text-slate-900">
                      {item.name}
                    </p>
                    <p className="text-slate-500">
                      {item.role} · {item.organization}
                    </p>
                  </div>
                  <span className="font-mono font-medium text-indigo-800">
                    {item.metric}
                  </span>
                </footer>
              </blockquote>
            ))}
          </div>

          {/* Cohort Conversion Strip */}
          <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-xl border border-slate-200 bg-white p-8 md:flex-row md:items-center">
            <div className="max-w-xl">
              <h3 className="font-display text-xl font-bold text-slate-900">
                Ready for the Q1 2027 Leadership &amp; Early Care Cohort?
              </h3>
              <p className="mt-1.5 text-sm text-slate-600">
                Reserve your mentorship track, select workshop preferences, and attach
                0–8 childcare coverage in under two minutes.
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenCohortModal}
              className="rounded-lg bg-indigo-800 px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-indigo-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-800"
            >
              Apply to Cohort
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
