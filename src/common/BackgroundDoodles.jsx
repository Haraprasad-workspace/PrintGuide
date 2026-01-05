
const DoodleItem = ({ path, className, style }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`absolute transition-all duration-500 ${className}`}
      style={style}
    >
      {path}
    </svg>
  );
};

const BackgroundDoodles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-10] overflow-hidden">

      {/* Background Ambience (Subtle Paper Tint) - Static */}
      <div
        className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-brand-surface-secondary blur-[120px] rounded-full opacity-30"
      />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-brand-surface-primary blur-[140px] rounded-full opacity-20"
      />

      {/* --- DOODLES (Stationery & Print Theme) - Static --- */}

      {/* 1. Printer (Darkest/Focus) */}
      <DoodleItem
        path={<><path d="M6 9V2h12v7" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><path d="M6 14h12v8H6z" /></>}
        className="w-32 h-32 md:w-56 md:h-56 top-[8%] right-[8%] text-brand-text-primary/5"
      />

      {/* 2. Stack of Papers (Medium) */}
      <DoodleItem
        path={<><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></>}
        className="w-24 h-24 md:w-40 md:h-40 top-[35%] left-[3%] text-brand-text-muted/10"
      />

      {/* 3. Scissors (Lighter) */}
      <DoodleItem
        path={<><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><line x1="20" y1="4" x2="8.12" y2="15.88" /><line x1="14.47" y1="14.48" x2="20" y2="20" /><line x1="8.12" y1="8.12" x2="12" y2="12" /></>}
        className="hidden md:block w-32 h-32 bottom-[12%] left-[12%] text-brand-text-disabled/15 rotate-[30deg]"
      />

      {/* 4. Folder (New: Replaces Coffee) */}
      <DoodleItem
        path={<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />}
        className="w-20 h-20 md:w-24 md:h-24 top-[18%] left-[20%] text-brand-text-muted/10 opacity-40 md:opacity-100"
      />

      {/* 5. Paper Plane (Motion element) */}
      <DoodleItem
        path={<path d="M2 12h20M2 12l10-9M2 12l10 9" />}
        className="w-40 h-40 md:w-72 md:h-72 bottom-[2%] right-[2%] text-brand-text-primary/5"
      />

      {/* 6. Pen/Pencil (New: Replaces Squiggle) */}
      <DoodleItem
        path={<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />}
        className="hidden md:block w-24 h-24 top-[55%] right-[25%] text-brand-text-muted/10"
      />

      {/* 7. Document Lines (Background texture) */}
      <DoodleItem
        path={<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></>}
        className="w-20 h-20 md:w-32 md:h-32 bottom-[25%] left-[45%] text-brand-text-disabled/10"
      />

      {/* 8. Ruler (Precision) */}
      <DoodleItem
        path={<><path d="M2 12h20" /><path d="M2 12v6" /><path d="M22 12v6" /><path d="M7 12v4" /><path d="M12 12v4" /><path d="M17 12v4" /></>}
        className="hidden md:block w-48 h-24 top-[5%] left-[40%] text-brand-text-muted/10 rotate-6"
      />

      {/* 9. Paperclip (New: Replaces Shield) */}
      <DoodleItem
        path={<path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />}
        className="w-16 h-16 md:w-20 md:h-20 bottom-[55%] left-[20%] text-brand-text-link/10"
      />

    </div>
  );
};

export default BackgroundDoodles;
