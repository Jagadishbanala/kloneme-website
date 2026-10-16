import type { Member } from "@/content/features";

// The Health stream's phone screens, rebuilt from the client's prototype (kloneme-prototype.html):
// the Health home (view "v-health": the script's HP data for Maya and the HUP list) and Checkups & alerts
// (view "v-checkups": CK for the week of 21 Sep, ckOver, and the "Later" items in ckRender). The prototype
// calls the companion "Klone"; it is "Klonie" here, as everywhere on the site.

/** A checkup card: its kind tag (with the tag's background and text colours), what, who and when */
export type CheckupCard = {
  kind: string;
  bg: string;
  fg: string;
  title: string;
  meta: string;
  when: string;
  who: Member[];
};

export const healthScreens = {
  home: {
    label: "Health",
    title: "HEALTH",
    motto: "Track. Heal. Thrive.",
    // Maya's health score and the three facts beside the ring
    score: { value: 84, label: "Great" },
    side: [
      { label: "Last checkup", value: "Mar 2026" },
      { label: "Active days", value: "5 / 7" },
      { label: "Water", value: "6 glasses" },
    ],
    vitals: {
      title: "Vitals",
      note: "Logged by you · wearables later",
      heart: { label: "Heart rate", value: "68", unit: "bpm" },
      pressure: { label: "Blood pressure", value: "118/76", band: "Normal" },
      // A bar per night for the last week; bars are drawn against a 10.5-hour night
      sleep: { label: "Sleep", value: "7h 20m", nights: [6.5, 7, 7.4, 6.8, 7.5, 8, 7.3], max: 10.5 },
      steps: { label: "Steps", value: "8,412", count: 8412, goal: 10000, goalLabel: "Goal 10,000" },
    },
    upTitle: "Coming up",
    up: [
      { day: "22", month: "SEP", title: "Cardiology follow-up", meta: "Nana · Dr. Patel · 9:30 am", who: ["G", "D"] },
      { day: "28", month: "SEP", title: "Dental checkup", meta: "Ava · Bright Smiles · 3:30 pm", who: ["A"] },
      { day: "01", month: "OCT", title: "Flu shot", meta: "Leo · school clinic · 4:30 pm", who: ["L"] },
    ] satisfies { day: string; month: string; title: string; meta: string; who: Member[] }[],
  },

  checkups: {
    label: "Checkups & alerts",
    back: "Health",
    title: "Checkups & alerts",
    // The week strip: Tuesday 22 is selected; a dot marks the days with checkups (22 and 24)
    week: [
      { dow: "MON", day: 21, dot: false, on: false },
      { dow: "TUE", day: 22, dot: true, on: true },
      { dow: "WED", day: 23, dot: false, on: false },
      { dow: "THU", day: 24, dot: true, on: false },
      { dow: "FRI", day: 25, dot: false, on: false },
      { dow: "SAT", day: 26, dot: false, on: false },
      { dow: "SUN", day: 27, dot: false, on: false },
    ],
    dayLabel: "Tuesday, Sep 22",
    day: [
      {
        kind: "Clinic visit",
        bg: "#e3f7ff",
        fg: "#026b8f",
        title: "Cardiology follow-up",
        meta: "Nana · Dr. Anil Patel · Summit Heart",
        when: "9:30 am",
        who: ["G", "D"],
      },
    ] satisfies CheckupCard[],
    attentionLabel: "Needs attention",
    attention: [
      {
        kind: "Overdue",
        bg: "#ffe9e6",
        fg: "#a1271e",
        title: "Annual physical",
        meta: "Daniel · was due 31 Aug",
        when: "Pick a time",
        who: ["D"],
      },
    ] satisfies CheckupCard[],
    notNeeded: "Not needed",
    reschedule: "Reschedule",
    laterLabel: "Later",
    later: [
      { kind: "Vaccine", bg: "#f1ebff", fg: "#6a2fe0", title: "Flu shot", meta: "Leo · school clinic", when: "1 Oct", who: ["L"] },
      {
        kind: "Screening",
        bg: "#e3f7ff",
        fg: "#026b8f",
        title: "Eye exam",
        meta: "Maya · Rockridge Optometry",
        when: "14 Oct",
        who: ["M"],
      },
    ] satisfies CheckupCard[],
  },
};
