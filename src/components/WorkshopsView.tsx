import { Check, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { WORKSHOPS } from '../data/futurecareData';
import { WorkshopCategory } from '../types/futurecare';

interface WorkshopsViewProps {
  reservedWorkshopIds: string[];
  onToggleReserveWorkshop: (workshopId: string) => void;
}

const CATEGORIES: ('All' | WorkshopCategory)[] = [
  'All',
  'Leadership',
  'STEM & Finance',
  'Early Empowerment (0–8)',
];

export function WorkshopsView({
  reservedWorkshopIds,
  onToggleReserveWorkshop,
}: WorkshopsViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | WorkshopCategory>(
    'All'
  );
  const [careOnly, setCareOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSyllabusId, setExpandedSyllabusId] = useState<string | null>(
    WORKSHOPS[0].id
  );

  const filteredWorkshops = useMemo(() => {
    return WORKSHOPS.filter((ws) => {
      if (selectedCategory !== 'All' && ws.category !== selectedCategory) return false;
      if (careOnly && !ws.careIncludedAges0to8) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          ws.title.toLowerCase().includes(q) ||
          ws.facilitator.toLowerCase().includes(q) ||
          ws.summary.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [selectedCategory, careOnly, searchQuery]);

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-12">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl [text-wrap:balance]">
          Career Advancement &amp; Early Empowerment Workshops
        </h1>
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          Practical working sessions on board governance, compensation negotiation,
          technical leadership, and raising confident girls ages 0 to 8.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="mt-8 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="tablist"
          aria-label="Filter workshops by category"
          className="flex flex-wrap items-center gap-1 rounded-lg bg-slate-100 p-1"
        >
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat === 'All' ? 'All Workshops' : cat}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            aria-pressed={careOnly}
            onClick={() => setCareOnly((prev) => !prev)}
            className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              careOnly
                ? 'border-indigo-800 bg-indigo-50 text-indigo-900'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>0–8 On-Site Care Included</span>
          </button>

          <div className="relative min-w-[220px]">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topic or facilitator..."
              aria-label="Search workshops"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pr-3 pl-9 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-800 focus:bg-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Workshop List */}
      {filteredWorkshops.length === 0 ? (
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-12 text-center">
          <p className="font-display text-lg font-semibold text-slate-900">
            No workshops match your filters
          </p>
          <p className="mt-1.5 text-sm text-slate-600">
            Try clearing your search or switching back to all workshop categories.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setCareOnly(false);
              setSearchQuery('');
            }}
            className="mt-5 rounded-lg bg-indigo-800 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-900"
          >
            Show All Workshops
          </button>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {filteredWorkshops.map((ws) => {
            const isReserved = reservedWorkshopIds.includes(ws.id);
            const isExpanded = expandedSyllabusId === ws.id;
            const seatsLeft = isReserved
              ? Math.max(0, ws.seatsRemaining - 1)
              : ws.seatsRemaining;

            return (
              <article
                key={ws.id}
                className="rounded-xl border border-slate-200 bg-white p-6"
              >
                <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
                  <div className="max-w-2xl">
                    {/* Unboxed metadata row */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 tabular-nums">
                      <span className="font-medium text-indigo-800">
                        {ws.category}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{ws.dateLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{ws.timeLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{ws.format}</span>
                      {ws.careIncludedAges0to8 && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="font-medium text-slate-800">
                            Ages 0–8 Care Provided
                          </span>
                        </>
                      )}
                    </div>

                    <h2 className="mt-2 font-display text-xl font-bold text-slate-900">
                      {ws.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {ws.summary}
                    </p>
                    <p className="mt-3 text-xs text-slate-500">
                      Led by <span className="font-medium text-slate-800">{ws.facilitator}</span>{' '}
                      · {ws.facilitatorRole}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-col items-start gap-3 lg:items-end">
                    <p className="font-mono text-xs text-slate-600 tabular-nums">
                      {seatsLeft} of {ws.seatsTotal} seats open
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        onClick={() =>
                          setExpandedSyllabusId(isExpanded ? null : ws.id)
                        }
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 whitespace-nowrap"
                      >
                        <span>Syllabus</span>
                        {isExpanded ? (
                          <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
                        ) : (
                          <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => onToggleReserveWorkshop(ws.id)}
                        className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap ${
                          isReserved
                            ? 'border border-emerald-200 bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
                            : 'bg-indigo-800 text-white hover:bg-indigo-900'
                        }`}
                      >
                        {isReserved ? (
                          <>
                            <Check className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Seat Reserved · Cancel</span>
                          </>
                        ) : (
                          <span>Reserve Workshop Seat</span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-5 border-t border-slate-200 pt-4">
                    <p className="text-xs font-semibold text-slate-800">
                      Session Agenda &amp; Practical Takeaways ({ws.durationHours} hrs)
                    </p>
                    <ol className="mt-2.5 grid grid-cols-1 gap-2.5 text-sm text-slate-600 md:grid-cols-3">
                      {ws.syllabus.map((item, idx) => (
                        <li
                          key={item}
                          className="rounded-lg border border-slate-200 bg-slate-50/70 p-3.5"
                        >
                          <span className="font-mono text-xs font-semibold text-indigo-800">
                            0{idx + 1}.
                          </span>{' '}
                          <span>{item}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
