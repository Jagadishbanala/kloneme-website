import type { JSX } from "react";
import { features, type ScreenKey } from "@/content/features";
import type { FlowId } from "@/content/streamPages";
import { travel } from "@/content/travel";
import { SCREENS } from "../sections/features/Screens";
import f from "../sections/features/features.module.css";
import { Journal, Prep } from "../travel/Screens";
import { Watercolor } from "./screens/Hobbies";
import hb from "./screens/hobbies.module.css";
import { hobbiesScreens } from "@/content/screens/hobbies";
import { WealthHome } from "./screens/Wealth";
import wl from "./screens/wealth.module.css";
import { wealthScreen } from "@/content/screens/wealth";
import { VaultAccess } from "./screens/Vault";
import vl from "./screens/vault.module.css";
import { vaultScreen } from "@/content/screens/vault";
import { Checkups, HealthHome } from "./screens/Health";
import hl from "./screens/health.module.css";
import { healthScreens } from "@/content/screens/health";
import t from "../travel/travel.module.css";

// Every app screen a stream page's phone can show (content/streamPages.ts lists each page's order).
// label: read out with the phone; cls: the screen's background; hold: seconds on screen;
// dark: a dark top, so the status bar is white over it (dark on the light screens).
type Flow = { label: string; Screen: () => JSX.Element; cls: string; hold: number; dark: boolean };

// The Features section's screens, dressed as they are there (dark as they are there too)
const DARK = new Set<ScreenKey>(["travel", "goals", "hobbies", "vault"]);
const feat = (k: ScreenKey, hold = 4.6): Flow => ({
  label: features.screens[k].label,
  Screen: SCREENS[k],
  cls: f[k] ?? "",
  hold,
  dark: DARK.has(k),
});

export const SCREEN_FLOW: Record<FlowId, Flow> = {
  travel: feat("travel", 4.8),
  prep: { label: travel.screens.prep.title, Screen: Prep, cls: t.dark, hold: 4.2, dark: true },
  journal: { label: travel.screens.journal.title, Screen: Journal, cls: t.dark, hold: 4.2, dark: true },
  calendar: feat("calendar"),
  chores: feat("chores"),
  memories: feat("memories"),
  emergency: feat("emergency"),
  goals: feat("goals"),
  hobbies: feat("hobbies"),
  vault: feat("vault"),
  // Rebuilt from the client's prototype for the stream pages (components/streams/screens)
  healthHome: { label: healthScreens.home.label, Screen: HealthHome, cls: hl.bg, hold: 4.8, dark: true },
  checkups: { label: healthScreens.checkups.label, Screen: Checkups, cls: hl.bg, hold: 4.4, dark: false },
  wealthHome: { label: wealthScreen.label, Screen: WealthHome, cls: wl.bg, hold: 4.8, dark: true },
  vaultAccess: { label: vaultScreen.label, Screen: VaultAccess, cls: vl.bg, hold: 4.6, dark: true },
  watercolor: { label: hobbiesScreens.watercolor.label, Screen: Watercolor, cls: hb.bg, hold: 4.6, dark: true },
};
