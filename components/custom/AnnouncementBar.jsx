// /components/AnnouncementBar.tsx
import React from 'react';
import { ArrowRight } from 'lucide-react';

const AnnouncementBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-[#620c0b] text-white text-sm font-light h-[38px] w-full overflow-hidden">
      <div className="h-full flex justify-center items-center text-center px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <span role="img" aria-label="party popper" className="text-base">🎉</span>
          <span className="font-belleza hidden sm:inline">
            ENVÍO GRATIS DESDE $150.000 COP
          </span>
          <span className="font-belleza inline sm:hidden">
            ENVÍO GRATIS DESDE $150.000 COP
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
