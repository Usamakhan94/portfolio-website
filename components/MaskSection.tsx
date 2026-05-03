"use client";

import { useState, ReactNode } from "react";

interface MaskSectionProps {
  defaultComponent: ReactNode;
  maskedComponent: ReactNode;
  maskImage?: string;
  className?: string;
}

const MaskSection = ({
  defaultComponent,
  maskedComponent,
  maskImage = "/cursor.svg  ",
  className = "",
}: MaskSectionProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className={`relative w-full overflow-hidden isolate ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHover(false)}
      onMouseEnter={() => setHover(true)}
    >
      <div className="">
        <div>{defaultComponent}</div>
        <div
          className="absolute inset-0 bg-primary transition-all"
          style={{
            maskImage: `url(${maskImage})`,
            maskSize: `${hover ? "100px 100px" : "0px"}`,
            maskRepeat: "no-repeat",
            maskPosition: `${mousePosition.x / 2}px ${mousePosition.y / 2}px`,
            WebkitMaskImage: `url(${maskImage})`,
            WebkitMaskSize: `${hover ? "100px 100px" : "0px"}`,
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: `${mousePosition.x - 50}px ${mousePosition.y - 50}px`,
          }}
        >
          {maskedComponent}
        </div>
      </div>
    </div>
  );
};

export default MaskSection;
