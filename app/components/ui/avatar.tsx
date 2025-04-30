import * as React from 'react';

export function Avatar({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-sm font-medium">
      {children}
    </div>
  );
}

export function AvatarImage({ src }: { src?: string }) {
  return src ? (
    <img src={src} alt="avatar" className="w-full h-full object-cover" />
  ) : null;
}

export function AvatarFallback({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
