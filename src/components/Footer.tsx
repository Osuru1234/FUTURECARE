import { PlatformView } from '../types/futurecare';

interface FooterProps {
  onNavigate: (view: PlatformView) => void;
  onOpenCohortModal: () => void;
}

export function Footer({ onNavigate, onOpenCohortModal }: FooterProps) {
  const go = (view: PlatformView) => {
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <div className="max-w-sm">
            <p className="font-display text-lg font-bold tracking-tight text-slate-900">
              FutureCare
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Aligned with UN Sustainable Development Goal 5: advancing women’s leadership
              equity through mentorship, workshops, and integrated care for children ages
              0 to 8.
            </p>
          </div>

          <div className="flex flex-wrap gap-10 text-sm">
            <div className="flex flex-col gap-2.5">
              <p className="font-display font-semibold text-slate-900">Platform</p>
              <button
                type="button"
                onClick={() => go('mentorship')}
                className="text-left text-slate-600 hover:text-slate-900"
              >
                Mentorship Directory
              </button>
              <button
                type="button"
                onClick={() => go('workshops')}
                className="text-left text-slate-600 hover:text-slate-900"
              >
                Skill Workshops
              </button>
              <button
                type="button"
                onClick={() => go('early-care')}
                className="text-left text-slate-600 hover:text-slate-900"
              >
                Early Care &amp; Playbooks (0–8)
              </button>
              <button
                type="button"
                onClick={() => go('network')}
                className="text-left text-slate-600 hover:text-slate-900"
              >
                Networking Circles
              </button>
            </div>

            <div className="flex flex-col gap-2.5">
              <p className="font-display font-semibold text-slate-900">Participation</p>
              <button
                type="button"
                onClick={onOpenCohortModal}
                className="text-left text-slate-600 hover:text-slate-900"
              >
                Apply to 2027 Cohort
              </button>
              <button
                type="button"
                onClick={() => go('early-care')}
                className="text-left text-slate-600 hover:text-slate-900"
              >
                0–8 Care Stipend Calculator
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>© 2026 FutureCare Initiative. SDG 5 Gender Equality &amp; Early Care Alliance.</p>
          <p>Bridging executive leadership and ages 0–8 developmental equity.</p>
        </div>
      </div>
    </footer>
  );
}
