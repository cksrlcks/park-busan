"use client";

import {
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createContext } from "react";

const StickyContext = createContext<{
  isSticky: boolean;
}>({
  isSticky: false,
});

export const useStickyContext = () => {
  const context = useContext(StickyContext);
  if (!context) {
    throw new Error("useStickyContext must be used within a StickyProvider");
  }
  return context;
};

export default function StickyProvider({ children }: PropsWithChildren) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsSticky(!entry.isIntersecting);
    });

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <StickyContext.Provider
      value={{
        isSticky,
      }}
    >
      <div ref={sentinelRef} />
      {children}
    </StickyContext.Provider>
  );
}
