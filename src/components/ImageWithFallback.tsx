import { useState } from 'react';
import { User } from 'lucide-react';

interface ImageWithFallbackProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackLabel: string;
  initials?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackLabel,
  initials,
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-slate-200/80 to-indigo-100/60 text-slate-700 select-none ${className}`}
      >
        {initials ? (
          <span className="font-display text-xl font-bold tracking-tight text-indigo-900">
            {initials}
          </span>
        ) : (
          <div className="flex flex-col items-center gap-2 px-4 text-center">
            <User className="h-6 w-6 text-indigo-800/70" aria-hidden="true" />
            <span className="text-xs font-medium text-slate-600">{fallbackLabel}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
