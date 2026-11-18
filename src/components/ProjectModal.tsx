import { useEffect } from 'react';
import { X, ArrowUpRight, Check } from 'lucide-react';
import { ProjectItem } from '../data/portfolio';
import { ResilientImage } from './ResilientImage';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
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
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl border border-zinc-200 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute top-4 right-4 z-10 w-10 h-10 inline-flex items-center justify-center rounded-full bg-white/95 text-zinc-800 hover:text-zinc-950 border border-zinc-200 shadow-sm hover:bg-zinc-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="aspect-[16/9] w-full overflow-hidden bg-zinc-100">
          <ResilientImage
            src={project.image}
            alt={project.imageAlt}
            fallbackTitle={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 font-medium mb-2">
              <span>{project.category}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{project.year}</span>
              <span aria-hidden="true">·</span>
              <span>{project.scope}</span>
            </div>
            <h3
              id="project-modal-title"
              className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950"
            >
              {project.title}
            </h3>
            <p className="mt-3 text-base text-zinc-600 leading-relaxed">
              {project.summary}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-zinc-200">
            <div>
              <h4 className="text-sm font-semibold text-zinc-950 mb-1.5">
                Problem Statement
              </h4>
              <p className="text-sm text-zinc-600 leading-relaxed">
                {project.problemStatement}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-zinc-950 mb-1.5">
                System Approach
              </h4>
              <p className="text-sm text-zinc-600 leading-relaxed">
                {project.systemApproach}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-200">
            <h4 className="text-sm font-semibold text-zinc-950 mb-3">
              Key Capabilities
            </h4>
            <ul className="space-y-2.5">
              {project.highlights.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 text-sm text-zinc-700 leading-relaxed"
                >
                  <Check className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-zinc-500">
              <span className="font-semibold text-zinc-800 mr-2">Tools & Focus:</span>
              <span>{project.tools.join(' · ')}</span>
            </div>

            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <span>Discuss This System</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
