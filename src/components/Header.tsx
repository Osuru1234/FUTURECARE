import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { PlatformView } from '../types/futurecare';

interface HeaderProps {
  activeView: PlatformView;
  onNavigate: (view: PlatformView) => void;
  onOpenCohortModal: () => void;
  planCount: number;
}

const NAV_ITEMS: { id: PlatformView; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'mentorship', label: 'Mentorship' },
  { id: 'workshops', label: 'Workshops' },
  { id: 'early-care', label: 'Early Care 0–8' },
  { id: 'network', label: 'Network' },
];

export function Header({
  activeView,
  onNavigate,
  onOpenCohortModal,
  planCount,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelectView = (view: PlatformView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => handleSelectView('overview')}
          className="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-800"
        >
          FutureCare
        </button>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectView(item.id)}
                className={`relative py-1 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-800 ${
                  isActive
                    ? 'text-indigo-800 font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-[17px] h-0.5 bg-indigo-800"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCohortModal}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-indigo-800 px-4 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:bg-indigo-900 whitespace-nowrap shrink-0 tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-800"
          >
            {planCount > 0 ? `My Plan (${planCount})` : 'Join Cohort'}
          </button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 md:hidden hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-indigo-800"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-6 py-4 md:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectView(item.id)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-900 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCohortModal();
              }}
              className="mt-2 w-full rounded-lg bg-indigo-800 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-indigo-900"
            >
              {planCount > 0 ? `My Plan (${planCount})` : 'Join Cohort'}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
