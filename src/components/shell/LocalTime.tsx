"use client";

import { useEffect, useState } from "react";

function format(timeZone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone,
  }).format(new Date());
}

/** Live clock for site.location. Fixed-width digits so ticking never shifts layout. */
export function LocalTime({ timeZone }: { timeZone: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(format(timeZone));
    const id = setInterval(() => setTime(format(timeZone)), 15_000);
    return () => clearInterval(id);
  }, [timeZone]);

  return (
    <time className="tabular-nums" suppressHydrationWarning>
      {time ?? "--:--"}
    </time>
  );
}
