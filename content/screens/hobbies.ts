// The Hobbies stream's in-app screens, rebuilt from the client's prototype (kloneme-prototype.html):
// the Watercolor view (#v-hobby) with its script data (hobbies[0], months, ART). The prototype calls
// the companion "Klone"; it is "Klonie" on this site.

export const hobbiesScreens = {
  watercolor: {
    label: "Watercolor",
    back: "Hobbies",
    eyebrow: "Creative · count",
    title: "Watercolor",
    // 18 of 30 paintings: the bar under the number fills to count / target
    count: 18,
    target: 30,
    countLabel: "of 30 paintings in 2026",
    pct: "60% of target",
    next: "Next: 20 by 31 Oct",

    chart: {
      title: "Paintings per month",
      // Bar heights are count / max; the last month is the current one
      max: 5,
      months: [
        { month: "May", count: 2 },
        { month: "Jun", count: 4 },
        { month: "Jul", count: 3 },
        { month: "Aug", count: 3 },
        { month: "Sep", count: 2 },
      ],
    },

    // The first nine paintings, newest first (files in public/app/proto/)
    gallery: {
      title: "My paintings",
      more: "All 18",
      paintings: [
        { img: "wc-taj", title: "Taj Mahal reflections" },
        { img: "wc-sunflowers", title: "Tuscan sunflowers" },
        { img: "wc-torii", title: "Torii at high tide" },
        { img: "wc-santorini-sunset", title: "Oia at sunset" },
        { img: "wc-burano", title: "Burano canal" },
        { img: "wc-fjord-cabin", title: "Red cabin, Norway" },
        { img: "wc-lake-boat", title: "Quiet lake, rowboat" },
        { img: "wc-cinque-terre", title: "Cinque Terre" },
        { img: "wc-fuji-pagoda", title: "Fuji in blossom" },
      ],
    },
  },
} as const;
