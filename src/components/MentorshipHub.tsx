import { Calendar, Check, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { MENTORS } from '../data/futurecareData';
import { Mentor, MentorBooking, MentorTrack } from '../types/futurecare';
import { ImageWithFallback } from './ImageWithFallback';

interface MentorshipHubProps {
  bookings: MentorBooking[];
  onBookMentor: (booking: MentorBooking) => void;
}

const TRACK_FILTERS: ('All' | MentorTrack)[] = [
  'All',
  'Executive Leadership',
  'STEM & Product',
  'Policy & Impact',
  'Return-to-Work',
];

export function MentorshipHub({ bookings, onBookMentor }: MentorshipHubProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState<'All' | MentorTrack>('All');
  const [careCoveredOnly, setCareCoveredOnly] = useState(false);
  const [activeMentor, setActiveMentor] = useState<Mentor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [goalInput, setGoalInput] = useState('');
  const [needsChildcare0to8, setNeedsChildcare0to8] = useState(true);
  const [formError, setFormError] = useState('');

  const filteredMentors = useMemo(() => {
    return MENTORS.filter((mentor) => {
      if (selectedTrack !== 'All' && mentor.track !== selectedTrack) return false;
      if (careCoveredOnly && !mentor.careCoveredSlots) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          mentor.name.toLowerCase().includes(q) ||
          mentor.role.toLowerCase().includes(q) ||
          mentor.organization.toLowerCase().includes(q) ||
          mentor.focusAreas.some((f) => f.toLowerCase().includes(q));
        if (!matches) return false;
      }
      return true;
    });
  }, [searchQuery, selectedTrack, careCoveredOnly]);

  const openBookingModal = (mentor: Mentor) => {
    setActiveMentor(mentor);
    setSelectedSlot(mentor.availableSlots[0] ?? '');
    setGoalInput('');
    setNeedsChildcare0to8(mentor.careCoveredSlots);
    setFormError('');
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeMentor) return;
    if (!selectedSlot) {
      setFormError('Please select a session time slot.');
      return;
    }
    if (goalInput.trim().length < 8) {
      setFormError('Please describe your mentorship goal in at least a few words.');
      return;
    }
    onBookMentor({
      mentorId: activeMentor.id,
      mentorName: activeMentor.name,
      slot: selectedSlot,
      goal: goalInput.trim(),
      needsChildcare0to8,
      bookedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    });
    setActiveMentor(null);
  };

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-12">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl [text-wrap:balance]">
          Executive &amp; Career Mentorship Directory
        </h1>
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          Connect directly with vetted women leaders for 1:1 sponsorship. Filter by
          career track or select care-covered time slots designed for parents of
          children ages 0 to 8.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="mt-8 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="tablist"
          aria-label="Filter mentors by track"
          className="flex flex-wrap items-center gap-1 rounded-lg bg-slate-100 p-1"
        >
          {TRACK_FILTERS.map((track) => {
            const active = selectedTrack === track;
            return (
              <button
                key={track}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedTrack(track)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {track === 'All' ? 'All Tracks' : track}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            aria-pressed={careCoveredOnly}
            onClick={() => setCareCoveredOnly((prev) => !prev)}
            className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              careCoveredOnly
                ? 'border-indigo-800 bg-indigo-50 text-indigo-900'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>0–8 Care-Covered Slots Only</span>
          </button>

          <div className="relative min-w-[230px]">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search name, role, or skill..."
              aria-label="Search mentors"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pr-3 pl-9 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-800 focus:bg-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Mentor Grid */}
      {filteredMentors.length === 0 ? (
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-12 text-center">
          <p className="font-display text-lg font-semibold text-slate-900">
            No mentors match those filters
          </p>
          <p className="mt-1.5 text-sm text-slate-600">
            Clear your search query or track filter to view all available executive mentors.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedTrack('All');
              setCareCoveredOnly(false);
              setSearchQuery('');
            }}
            className="mt-5 rounded-lg bg-indigo-800 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-900"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredMentors.map((mentor) => {
            const existingBooking = bookings.find((b) => b.mentorId === mentor.id);
            return (
              <article
                key={mentor.id}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6"
              >
                <div>
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-slate-200">
                      <ImageWithFallback
                        src={mentor.imageUrl}
                        alt={`Portrait of ${mentor.name}, ${mentor.role}`}
                        fallbackLabel={mentor.name}
                        initials={mentor.initials}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-display text-lg font-bold text-slate-900 truncate">
                        {mentor.name}
                      </h2>
                      <p className="text-sm font-medium text-slate-700">
                        {mentor.role}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {mentor.organization} · {mentor.location}
                      </p>
                    </div>
                  </div>

                  {/* Unboxed metadata row */}
                  <div className="mt-4 flex flex-wrap items-center gap-2 border-y border-slate-100 py-2.5 text-xs text-slate-600 tabular-nums">
                    <span>{mentor.track}</span>
                    <span aria-hidden="true">·</span>
                    <span>{mentor.promotedMentees} mentees promoted</span>
                    {mentor.careCoveredSlots && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="font-medium text-indigo-800">
                          0–8 Care-Covered
                        </span>
                      </>
                    )}
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    {mentor.bio}
                  </p>

                  <ul className="mt-4 space-y-1.5 text-xs text-slate-700">
                    {mentor.focusAreas.map((area) => (
                      <li key={area} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 border-t border-slate-200 pt-4">
                  <p className="font-mono text-xs text-slate-500">
                    Next slot: {mentor.availableSlots[0]}
                  </p>
                  {existingBooking ? (
                    <div className="mt-3 flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-xs font-medium text-emerald-900">
                      <span className="inline-flex items-center gap-1.5">
                        <Check className="h-4 w-4" aria-hidden="true" />
                        Requested ({existingBooking.slot.split('·')[0].trim()})
                      </span>
                      <button
                        type="button"
                        onClick={() => openBookingModal(mentor)}
                        className="font-semibold underline hover:text-emerald-950"
                      >
                        Update
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openBookingModal(mentor)}
                      className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-800 px-4 py-2.5 text-xs font-semibold text-white transition-colors duration-150 hover:bg-indigo-900 whitespace-nowrap"
                    >
                      <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Schedule 1:1 Mentorship</span>
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Booking Modal */}
      {activeMentor && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs"
        >
          <div className="w-full max-w-lg rounded-xl border border-slate-200 bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2
                  id="booking-modal-title"
                  className="font-display text-xl font-bold text-slate-900"
                >
                  Request Mentorship with {activeMentor.name}
                </h2>
                <p className="mt-0.5 text-xs text-slate-500">
                  {activeMentor.role} · {activeMentor.organization}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close modal"
                onClick={() => setActiveMentor(null)}
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmBooking} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Select Available Time Slot
                </label>
                <div className="mt-2 space-y-2">
                  {activeMentor.availableSlots.map((slot) => (
                    <label
                      key={slot}
                      className={`flex cursor-pointer items-center justify-between rounded-lg border px-3.5 py-2.5 text-sm transition-colors ${
                        selectedSlot === slot
                          ? 'border-indigo-800 bg-indigo-50/60 text-indigo-950 font-medium'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{slot}</span>
                      <input
                        type="radio"
                        name="mentor-slot"
                        value={slot}
                        checked={selectedSlot === slot}
                        onChange={() => setSelectedSlot(slot)}
                        className="accent-indigo-800"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="mentorship-goal"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Primary Career or Leadership Goal
                </label>
                <textarea
                  id="mentorship-goal"
                  rows={3}
                  value={goalInput}
                  onChange={(e) => {
                    setGoalInput(e.target.value);
                    setFormError('');
                  }}
                  placeholder="Example: Preparing for Q2 VP engineering promotion panel and negotiating hybrid scope."
                  className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-800 focus:outline-none"
                />
              </div>

              <label className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3.5 text-sm">
                <input
                  type="checkbox"
                  checked={needsChildcare0to8}
                  onChange={(e) => setNeedsChildcare0to8(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-indigo-800"
                />
                <span>
                  <span className="block font-medium text-slate-900">
                    Include Ages 0–8 Care Coverage for this session
                  </span>
                  <span className="mt-0.5 block text-xs text-slate-600">
                    Reserves an on-site FutureCare Studio playroom spot or triggers a
                    45-minute backup sitter reimbursement.
                  </span>
                </span>
              </label>

              {formError && (
                <p role="alert" className="text-xs font-medium text-red-700">
                  {formError}
                </p>
              )}

              <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-4">
                <button
                  type="button"
                  onClick={() => setActiveMentor(null)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-indigo-800 px-5 py-2 text-xs font-semibold text-white hover:bg-indigo-900"
                >
                  Confirm Session Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
