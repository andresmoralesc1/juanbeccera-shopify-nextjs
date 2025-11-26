// /components/AnnouncementBar.tsx
import React from 'react';

type AnnouncementBarProps = {
  text?: string;
  enabled?: boolean;
};

const AnnouncementBar = ({
  text = 'ENVÍO GRATIS DESDE $150.000 COP',
  enabled = true
}: AnnouncementBarProps) => {
  if (!enabled) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-[#620c0b] text-white text-sm font-light h-[38px] w-full overflow-hidden">
      <div className="h-full flex justify-center items-center text-center px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <span role="img" aria-label="announcement" className="text-base">🎉</span>
          <span className="font-belleza hidden sm:inline">
            {text}
          </span>
          <span className="font-belleza inline sm:hidden">
            {text}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
