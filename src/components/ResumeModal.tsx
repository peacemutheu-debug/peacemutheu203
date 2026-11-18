import { useEffect } from 'react';
import { X, Printer } from 'lucide-react';
import { EDUCATION, PROFILE, SKILL_GROUPS } from '../data/portfolio';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

export function ResumeModal({ open, onClose }: ResumeModalProps) {
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl border border-zinc-200 shadow-2xl p-6 sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="no-print flex items-center justify-between gap-4 pb-6 border-b border-zinc-200">
          <span className="text-xs font-medium text-zinc-500">
            Curriculum Vitae Summary · {PROFILE.name}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close curriculum vitae summary"
              className="w-9 h-9 inline-flex items-center justify-center rounded-lg text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="pt-6 space-y-7">
          <div>
            <h2
              id="resume-modal-title"
              className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950"
            >
              {PROFILE.name}
            </h2>
            <p className="mt-1 text-sm text-zinc-600">
              {PROFILE.hometown} · University of Embu (BSc Information Technology) · Age {PROFILE.age}
            </p>
            <p className="mt-1 text-sm font-mono text-zinc-700 tabular-nums">
              {PROFILE.phone} · {PROFILE.email}
            </p>
          </div>

          <div className="pt-5 border-t border-zinc-200">
            <h3 className="text-sm font-semibold text-zinc-950 mb-2">
              Career Objective
            </h3>
            <p className="text-sm text-zinc-700 leading-relaxed">
              {PROFILE.careerObjective} Passionate about problem-solving, taking leadership roles in University of Embu student tech clubs, and applying IT skills to community projects.
            </p>
          </div>

          <div className="pt-5 border-t border-zinc-200">
            <h3 className="text-sm font-semibold text-zinc-950 mb-3">
              Education
            </h3>
            <div className="space-y-4">
              {EDUCATION.map((entry) => (
                <div key={entry.institution} className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <div>
                    <p className="text-sm font-semibold text-zinc-950">
                      {entry.institution}
                    </p>
                    <p className="text-sm text-zinc-600">{entry.qualification}</p>
                  </div>
                  <span className="text-xs font-mono tabular-nums text-zinc-500 shrink-0">
                    {entry.period}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-5 border-t border-zinc-200">
            <h3 className="text-sm font-semibold text-zinc-950 mb-3">
              Core Capabilities & Interests
            </h3>
            <div className="grid sm:grid-cols-3 gap-5">
              {SKILL_GROUPS.map((group) => (
                <div key={group.index}>
                  <p className="text-xs font-semibold text-zinc-900 mb-1.5">
                    {group.title}
                  </p>
                  <ul className="space-y-1 text-xs text-zinc-600">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-zinc-500">
              Personal Interests: {PROFILE.hobby} across Kenya and exploring local community systems.
            </p>
          </div>

          <div className="pt-5 border-t border-zinc-200">
            <h3 className="text-sm font-semibold text-zinc-950 mb-1.5">
              Referee
            </h3>
            <p className="text-sm font-medium text-zinc-900">
              {PROFILE.referee.name}
            </p>
            <p className="text-sm text-zinc-600">
              {PROFILE.referee.role}, {PROFILE.referee.institution}
            </p>
            <p className="text-sm font-mono text-zinc-700 mt-0.5">
              {PROFILE.referee.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
