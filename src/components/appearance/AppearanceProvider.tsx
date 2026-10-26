"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  type Appearance,
  DEFAULT_APPEARANCE,
  applyAppearance,
  readAppearance,
  writeAppearance,
} from "@/lib/appearance";

type Ctx = {
  appearance: Appearance;
  update: (patch: Partial<Appearance>) => void;
  reset: () => void;
};

const AppearanceContext = createContext<Ctx | null>(null);

export function AppearanceProvider({ children }: { children: React.ReactNode }) {
  // Server render uses the default; the boot script has already painted the saved
  // values, and this effect syncs React state to them after hydration.
  const [appearance, setAppearance] = useState<Appearance>(DEFAULT_APPEARANCE);

  useEffect(() => {
    setAppearance(readAppearance());
  }, []);

  const commit = useCallback((next: Appearance) => {
    setAppearance(next);
    applyAppearance(next);
    writeAppearance(next);
  }, []);

  const update = useCallback(
    (patch: Partial<Appearance>) => commit({ ...appearance, ...patch }),
    [appearance, commit],
  );
  const reset = useCallback(() => commit(DEFAULT_APPEARANCE), [commit]);

  return (
    <AppearanceContext.Provider value={{ appearance, update, reset }}>
      {children}
    </AppearanceContext.Provider>
  );
}

export function useAppearance() {
  const ctx = useContext(AppearanceContext);
  if (!ctx) throw new Error("useAppearance must be used inside <AppearanceProvider>");
  return ctx;
}
