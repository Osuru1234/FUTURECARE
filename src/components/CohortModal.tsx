import { Check, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import {
  EARLY_CARE_PLAYBOOKS,
  NETWORK_CIRCLES,
  WORKSHOPS,
} from '../data/futurecareData';
import {
  AgeBracket,
  CohortApplication,
  MentorBooking,
  MentorTrack,
} from '../types/futurecare';

interface CohortModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: CohortApplication | null;
  onSubmitApplication: (app: CohortApplication) => void;
  bookings: MentorBooking[];
  onRemoveBooking: (mentorId: string) => void;
  reservedWorkshopIds: string[];
  onToggleReserveWorkshop: (id: string) => void;
  savedPlaybookIds: string[];
  onToggleSavePlaybook: (id: string) => void;
  joinedCircleIds: string[];
  onToggleJoinCircle: (id: string) => void;
  careCoverageAttached: string | null;
}

export function CohortModal({
  isOpen,
  onClose,
  application,
  onSubmitApplication,
  bookings,
  onRemoveBooking,
  reservedWorkshopIds,
  onToggleReserveWorkshop,
  savedPlaybookIds,
  onToggleSavePlaybook,
  joinedCircleIds,
  onToggleJoinCircle,
  careCoverageAttached,
}: CohortModalProps) {
  const totalItems =
    bookings.length +
    reservedWorkshopIds.length +
    savedPlaybookIds.length +
    joinedCircleIds.length +
    (careCoverageAttached ? 1 : 0);

  const [activeTab, setActiveTab] = useState<'apply' | 'plan'>(
    totalItems > 0 ? 'plan' : 'apply'
  );
  const [fullName, setFullName] = useState(application?.fullName ?? '');
  const [email, setEmail] = useState(application?.email ?? '');
  const [currentRole, setCurrentRole] = useState(application?.currentRole ?? '');
  const [primaryTrack, setPrimaryTrack] = useState<MentorTrack>(
    application?.primaryTrack ?? 'Executive Leadership'
  );
  const [childAgeBracket, setChildAgeBracket] = useState<'None' | AgeBracket>(
    application?.childAgeBracket ?? '3–5 Years'
  );
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('Please enter a valid work or personal email address.');
      return;
    }
    if (!currentRole.trim()) {
      setErrorMsg('Please enter your current role or transition stage.');
      return;
    }

    onSubmitApplication({
      fullName: fullName.trim(),
      email: email.trim(),
      currentRole: currentRole.trim(),
      primaryTrack,
      childAgeBracket,
      submittedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    });
    setErrorMsg('');
  };

  const reservedWorkshops = WORKSHOPS.filter((w) =>
    reservedWorkshopIds.includes(w.id)
  );
  const savedPlaybooks = EARLY_CARE_PLAYBOOKS.filter((p) =>
    savedPlaybookIds.includes(p.id)
  );
  const joinedCircles = NETWORK_CIRCLES.filter((c) =>
    joinedCircleIds.includes(c.id)
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cohort-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs"
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-slate-200 bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2
              id="cohort-modal-title"
              className="font-display text-xl font-bold text-slate-900"
            >
              FutureCare Cohort &amp; Personal Plan
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Manage your Q1 2027 leadership application, mentorship requests, and 0–8
              care coverage.
            </p>
          </div>
          <button
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 inline-flex rounded-lg bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setActiveTab('apply')}
            className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors ${
              activeTab === 'apply'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Cohort Application
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('plan')}
            className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors tabular-nums ${
              activeTab === 'plan'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            My Saved Plan ({totalItems})
          </button>
        </div>

        {activeTab === 'apply' ? (
          application ? (
            <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-6">
              <div className="flex items-start gap-3">
                <Check
                  className="mt-0.5 h-5 w-5 shrink-0 text-emerald-800"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-display text-base font-bold text-emerald-950">
                    Cohort Application Received
                  </h3>
                  <p className="mt-1 text-sm text-emerald-900">
                    Thank you, {application.fullName}. Your {application.primaryTrack}{' '}
                    track application (Care tier: {application.childAgeBracket}) was
                    submitted on {application.submittedAt}.
                  </p>
                  <p className="mt-2 text-xs text-emerald-800">
                    Confirmation sent to {application.email}.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('plan')}
                className="mt-4 rounded-lg bg-emerald-900 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-950"
              >
                Review My Saved Plan
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="cohort-name"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    Full Name
                  </label>
                  <input
                    id="cohort-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      setErrorMsg('');
                    }}
                    placeholder="e.g., Naomi Osei"
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-indigo-800 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cohort-email"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    Email Address
                  </label>
                  <input
                    id="cohort-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrorMsg('');
                    }}
                    placeholder="naomi@company.com"
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-indigo-800 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="cohort-role"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Current Role or Career Stage
                </label>
                <input
                  id="cohort-role"
                  type="text"
                  value={currentRole}
                  onChange={(e) => {
                    setCurrentRole(e.target.value);
                    setErrorMsg('');
                  }}
                  placeholder="e.g., Senior Product Lead returning from parental leave"
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-indigo-800 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="cohort-track"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    Primary Leadership Track
                  </label>
                  <select
                    id="cohort-track"
                    value={primaryTrack}
                    onChange={(e) =>
                      setPrimaryTrack(e.target.value as MentorTrack)
                    }
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-800 focus:outline-none"
                  >
                    <option value="Executive Leadership">Executive Leadership</option>
                    <option value="STEM & Product">STEM &amp; Product</option>
                    <option value="Policy & Impact">Policy &amp; Impact</option>
                    <option value="Return-to-Work">Return-to-Work</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="cohort-child-age"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    Early Care Support Needed (0–8 Years)
                  </label>
                  <select
                    id="cohort-child-age"
                    value={childAgeBracket}
                    onChange={(e) =>
                      setChildAgeBracket(e.target.value as 'None' | AgeBracket)
                    }
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-800 focus:outline-none"
                  >
                    <option value="0–2 Years">0–2 Years (Infant &amp; Toddler)</option>
                    <option value="3–5 Years">3–5 Years (Pre-K STEM Studio)</option>
                    <option value="6–8 Years">6–8 Years (Early Primary Lab)</option>
                    <option value="None">No childcare needed</option>
                  </select>
                </div>
              </div>

              {errorMsg && (
                <p role="alert" className="text-xs font-medium text-red-700">
                  {errorMsg}
                </p>
              )}

              <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-indigo-800 px-5 py-2 text-xs font-semibold text-white hover:bg-indigo-900"
                >
                  Submit Cohort Application
                </button>
              </div>
            </form>
          )
        ) : (
          <div className="mt-5 space-y-5">
            {totalItems === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-center">
                <p className="font-display text-base font-semibold text-slate-900">
                  Your plan is empty
                </p>
                <p className="mt-1 text-xs text-slate-600">
                  Schedule a mentor, reserve a workshop seat, save an ages 0–8
                  playbook, or join a leadership circle to build your roadmap.
                </p>
              </div>
            ) : (
              <>
                {careCoverageAttached && (
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-700">
                      0–8 Care Coverage Plan
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-900">
                      {careCoverageAttached}
                    </p>
                  </div>
                )}

                {bookings.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-slate-700">
                      Mentorship Sessions ({bookings.length})
                    </h3>
                    <div className="mt-2 divide-y divide-slate-200 rounded-lg border border-slate-200">
                      {bookings.map((b) => (
                        <div
                          key={b.mentorId}
                          className="flex items-start justify-between gap-3 p-3.5 text-sm"
                        >
                          <div>
                            <p className="font-semibold text-slate-900">
                              {b.mentorName}
                            </p>
                            <p className="text-xs text-slate-600">
                              {b.slot}
                              {b.needsChildcare0to8
                                ? ' · Ages 0–8 care included'
                                : ''}
                            </p>
                          </div>
                          <button
                            type="button"
                            aria-label={`Remove mentorship request with ${b.mentorName}`}
                            onClick={() => onRemoveBooking(b.mentorId)}
                            className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {reservedWorkshops.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-slate-700">
                      Reserved Workshops ({reservedWorkshops.length})
                    </h3>
                    <div className="mt-2 divide-y divide-slate-200 rounded-lg border border-slate-200">
                      {reservedWorkshops.map((w) => (
                        <div
                          key={w.id}
                          className="flex items-start justify-between gap-3 p-3.5 text-sm"
                        >
                          <div>
                            <p className="font-semibold text-slate-900">{w.title}</p>
                            <p className="text-xs text-slate-600">
                              {w.dateLabel} · {w.timeLabel}
                            </p>
                          </div>
                          <button
                            type="button"
                            aria-label={`Cancel reservation for ${w.title}`}
                            onClick={() => onToggleReserveWorkshop(w.id)}
                            className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {savedPlaybooks.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-slate-700">
                      Saved 0–8 Playbooks ({savedPlaybooks.length})
                    </h3>
                    <div className="mt-2 divide-y divide-slate-200 rounded-lg border border-slate-200">
                      {savedPlaybooks.map((p) => (
                        <div
                          key={p.id}
                          className="flex items-start justify-between gap-3 p-3.5 text-sm"
                        >
                          <div>
                            <p className="font-semibold text-slate-900">{p.title}</p>
                            <p className="text-xs text-slate-600">
                              {p.ageBracket} · {p.domain}
                            </p>
                          </div>
                          <button
                            type="button"
                            aria-label={`Remove ${p.title}`}
                            onClick={() => onToggleSavePlaybook(p.id)}
                            className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {joinedCircles.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-slate-700">
                      Leadership Circles ({joinedCircles.length})
                    </h3>
                    <div className="mt-2 divide-y divide-slate-200 rounded-lg border border-slate-200">
                      {joinedCircles.map((c) => (
                        <div
                          key={c.id}
                          className="flex items-start justify-between gap-3 p-3.5 text-sm"
                        >
                          <div>
                            <p className="font-semibold text-slate-900">{c.name}</p>
                            <p className="text-xs text-slate-600">{c.schedule}</p>
                          </div>
                          <button
                            type="button"
                            aria-label={`Leave ${c.name}`}
                            onClick={() => onToggleJoinCircle(c.id)}
                            className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
