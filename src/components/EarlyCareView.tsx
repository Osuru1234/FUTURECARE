import { Bookmark, Check } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  EARLY_CARE_LAB_IMAGE_PATH,
  EARLY_CARE_PLAYBOOKS,
} from '../data/futurecareData';
import { AgeBracket } from '../types/futurecare';
import { ImageWithFallback } from './ImageWithFallback';

interface EarlyCareViewProps {
  savedPlaybookIds: string[];
  onToggleSavePlaybook: (id: string) => void;
  careCoverageAttached: string | null;
  onAttachCareCoverage: (summary: string) => void;
}

const AGE_FILTERS: ('All' | AgeBracket)[] = [
  'All',
  '0–2 Years',
  '3–5 Years',
  '6–8 Years',
];

export function EarlyCareView({
  savedPlaybookIds,
  onToggleSavePlaybook,
  careCoverageAttached,
  onAttachCareCoverage,
}: EarlyCareViewProps) {
  const [selectedAge, setSelectedAge] = useState<'All' | AgeBracket>('All');
  const [childAgeYears, setChildAgeYears] = useState<number>(4);
  const [weeklyHours, setWeeklyHours] = useState<number>(6);
  const [careMode, setCareMode] = useState<'studio' | 'stipend'>('studio');

  const filteredPlaybooks = useMemo(() => {
    if (selectedAge === 'All') return EARLY_CARE_PLAYBOOKS;
    return EARLY_CARE_PLAYBOOKS.filter((item) => item.ageBracket === selectedAge);
  }, [selectedAge]);

  const careEstimate = useMemo(() => {
    const hourlyRate = childAgeYears <= 2 ? 28 : 22;
    const coveredHours = Math.min(weeklyHours, 12);
    const monthlyGrant = coveredHours * hourlyRate * 4;
    const stageLabel =
      childAgeYears <= 2
        ? 'Infant & Toddler Care (0–2 yrs)'
        : childAgeYears <= 5
          ? 'Pre-K STEM Studio (3–5 yrs)'
          : 'Early Primary Lab (6–8 yrs)';
    return {
      hourlyRate,
      coveredHours,
      monthlyGrant,
      stageLabel,
    };
  }, [childAgeYears, weeklyHours]);

  const handleAttachCoverage = () => {
    const summary =
      careMode === 'studio'
        ? `On-Site FutureCare Studio (${careEstimate.stageLabel}) · ${careEstimate.coveredHours} hrs/wk covered`
        : `Verified Local Care Stipend (${careEstimate.stageLabel}) · $${careEstimate.monthlyGrant}/mo grant`;
    onAttachCareCoverage(summary);
  };

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-12">
      {/* Intro Split with Early Learning Lab photo */}
      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
        <div className="flex flex-col justify-center lg:col-span-6">
          <p className="text-sm font-medium text-indigo-800">
            Children Ages 0 to 8 · Dual-Generation Equity
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl [text-wrap:balance]">
            Early Childhood Care &amp; Empowerment Lab (0–8 Years)
          </h1>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            Gender equality starts twice: by keeping mothers and caregivers advancing
            into senior leadership during the critical 0–8 parenting years, and by
            building spatial math, curiosity, and voice in young girls before age
            eight.
          </p>
        </div>

        <div className="lg:col-span-6">
          <div className="h-full min-h-[240px] overflow-hidden rounded-xl border border-slate-200 bg-white">
            <ImageWithFallback
              src={EARLY_CARE_LAB_IMAGE_PATH}
              alt="Young children ages 4 to 7 exploring wooden geometric building blocks and STEM learning kits with an educator"
              fallbackLabel="Ages 0–8 Early Learning Studio"
              className="h-full w-full object-cover lg:h-full"
            />
          </div>
        </div>
      </div>

      {/* Interactive 0–8 Care Coverage & Stipend Calculator */}
      <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6 lg:p-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-xl font-bold text-slate-900">
              0–8 Care Support &amp; Stipend Estimator
            </h2>
            <p className="mt-1.5 text-sm text-slate-600">
              Calculate your covered on-site studio hours or verified local childcare
              reimbursement while attending FutureCare mentorship and workshops.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <label htmlFor="child-age-range">Child Age (0–8 Years)</label>
                  <span className="font-mono text-indigo-800 tabular-nums">
                    {childAgeYears} {childAgeYears === 1 ? 'year' : 'years'} old
                  </span>
                </div>
                <input
                  id="child-age-range"
                  type="range"
                  min={0}
                  max={8}
                  step={1}
                  value={childAgeYears}
                  onChange={(e) => setChildAgeYears(Number(e.target.value))}
                  className="mt-3 w-full accent-indigo-800"
                />
                <div className="mt-1 flex justify-between font-mono text-[11px] text-slate-400 tabular-nums">
                  <span>0 yrs</span>
                  <span>4 yrs</span>
                  <span>8 yrs</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <label htmlFor="weekly-hours-range">Weekly Cohort Hours</label>
                  <span className="font-mono text-indigo-800 tabular-nums">
                    {weeklyHours} hrs / week
                  </span>
                </div>
                <input
                  id="weekly-hours-range"
                  type="range"
                  min={2}
                  max={12}
                  step={1}
                  value={weeklyHours}
                  onChange={(e) => setWeeklyHours(Number(e.target.value))}
                  className="mt-3 w-full accent-indigo-800"
                />
                <div className="mt-1 flex justify-between font-mono text-[11px] text-slate-400 tabular-nums">
                  <span>2 hrs</span>
                  <span>7 hrs</span>
                  <span>12 hrs</span>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-xs font-semibold text-slate-700">
                Preferred Care Format
              </p>
              <div className="mt-2 inline-flex rounded-lg bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setCareMode('studio')}
                  className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                    careMode === 'studio'
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  On-Site Studio Room
                </button>
                <button
                  type="button"
                  onClick={() => setCareMode('stipend')}
                  className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                    careMode === 'stipend'
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Local Care Stipend
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50 p-6 lg:col-span-5">
            <div>
              <p className="text-xs font-semibold text-slate-500">
                Estimated Monthly Coverage
              </p>
              <p className="mt-2 font-mono text-3xl font-semibold tracking-tight text-slate-900 tabular-nums">
                {careMode === 'studio'
                  ? `${careEstimate.coveredHours * 4} hrs / mo`
                  : `$${careEstimate.monthlyGrant.toLocaleString()} / mo`}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Room Assignment: <span className="font-semibold text-slate-800">{careEstimate.stageLabel}</span>{' '}
                · Benchmark value ${careEstimate.hourlyRate}/hr
              </p>
            </div>

            <div className="mt-6 border-t border-slate-200 pt-4">
              {careCoverageAttached ? (
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2 text-xs font-medium text-emerald-900">
                    <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Attached to My Plan: {careCoverageAttached}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAttachCoverage}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100"
                  >
                    Update Care Coverage Preference
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleAttachCoverage}
                  className="w-full rounded-lg bg-indigo-800 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-indigo-900"
                >
                  Attach 0–8 Care Coverage to My Plan
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Age-Bracketed Playbooks (0-2, 3-5, 6-8) */}
      <div className="mt-12">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900">
              Developmental Empowerment Playbooks (Ages 0–8)
            </h2>
            <p className="mt-1.5 text-sm text-slate-600">
              Practical 15-to-45 minute activities curated by early childhood educators
              for home use or FutureCare Studio playrooms.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter playbooks by child age bracket"
            className="flex flex-wrap items-center gap-1 rounded-lg bg-slate-200/70 p-1"
          >
            {AGE_FILTERS.map((age) => {
              const active = selectedAge === age;
              return (
                <button
                  key={age}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedAge(age)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {age === 'All' ? 'All Ages 0–8' : age}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredPlaybooks.map((playbook) => {
            const isSaved = savedPlaybookIds.includes(playbook.id);
            return (
              <article
                key={playbook.id}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 tabular-nums">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-indigo-800">
                        {playbook.ageBracket}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{playbook.domain}</span>
                      <span aria-hidden="true">·</span>
                      <span>{playbook.durationMinutes} min</span>
                    </div>
                  </div>

                  <h3 className="mt-2 font-display text-lg font-bold text-slate-900">
                    {playbook.title}
                  </h3>

                  <div className="mt-3 space-y-2 text-sm text-slate-600">
                    <p>
                      <span className="font-semibold text-slate-800">
                        For children:
                      </span>{' '}
                      {playbook.childOutcome}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-800">
                        For caregivers:
                      </span>{' '}
                      {playbook.caregiverOutcome}
                    </p>
                  </div>

                  <div className="mt-4 border-t border-slate-100 pt-4">
                    <p className="text-xs font-semibold text-slate-800">
                      Guided Steps
                    </p>
                    <ol className="mt-2 space-y-1.5 text-xs leading-relaxed text-slate-600">
                      {playbook.steps.map((step, i) => (
                        <li key={step}>
                          <span className="font-mono font-semibold text-slate-800">
                            {i + 1}.
                          </span>{' '}
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
                  <p className="text-xs text-slate-500">
                    Materials: {playbook.materials.join(' · ')}
                  </p>
                  <button
                    type="button"
                    onClick={() => onToggleSavePlaybook(playbook.id)}
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                      isSaved
                        ? 'border-indigo-800 bg-indigo-50 text-indigo-900'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Bookmark className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{isSaved ? 'Saved to Family Plan' : 'Save Playbook'}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
