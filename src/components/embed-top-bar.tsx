"use client";

import { PpLangSwitcher } from "@/components/pp-lang-switcher";

export function EmbedTopBar() {
  return (
    <div className="fixed right-[max(0.5rem,env(safe-area-inset-right))] top-[max(0.5rem,env(safe-area-inset-top))] z-[70]">
      <PpLangSwitcher className="shadow-md" />
    </div>
  );
}
