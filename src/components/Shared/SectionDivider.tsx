import React from 'react';

const SectionDivider: React.FC = () => {
  return (
    <div
      className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent"
      aria-hidden
    />
  );
};

export default SectionDivider;
