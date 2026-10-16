// The Wealth home screen (Cashflow tab), rebuilt from the client's prototype (kloneme-prototype.html,
// view "v-wealth"): its copy, the last six months from the script's CF data and the asset categories
// from WCATS. The prototype calls the companion "Klone"; it is "Klonie" here, as everywhere on the site.

export type WealthCatIcon = "home" | "chart" | "car" | "bank" | "gem" | "btc";

export const wealthScreen = {
  label: "Wealth",
  title: "WEALTH",
  sub: "Spend. Save. Grow.",
  // The segmented switch; Cashflow is selected
  tabs: ["Finances", "Cashflow"],
  selectedTab: 1,
  // The period pills under it; Monthly is selected
  periods: ["Weekly", "Monthly", "Year"],
  selectedPeriod: 1,
  updated: "Values updated by you · 12 Sep",
  kpis: [
    { label: "Money in", value: "$21,480" },
    { label: "Money out", value: "$15,920" },
    { label: "Net", value: "+$5,560", up: true },
  ],
  // Monthly money in / out (CF in the prototype); bars are drawn against max
  cashflow: {
    months: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    in: [20800, 21200, 24900, 20600, 21300, 21480],
    out: [15200, 16900, 19800, 14700, 15600, 15920],
    max: 25000,
  },
  legend: { in: "In", out: "Out", period: "Last 6 months" },
  categoriesLabel: "Asset categories",
  addAsset: "Add asset",
  // WCATS: the count is split as in the prototype (number on top, word under it)
  categories: [
    { name: "Real estate", icon: "home", count: "2", unit: "properties", value: "$980,000" },
    { name: "Stocks & funds", icon: "chart", count: "14", unit: "holdings", value: "$186,500" },
    { name: "Cars & others", icon: "car", count: "3", unit: "assets", value: "$105,000" },
    { name: "Banking", icon: "bank", count: "4", unit: "accounts", value: "$64,200" },
    { name: "Jewellery & watches", icon: "gem", count: "6", unit: "items", value: "$38,300" },
    { name: "Crypto", icon: "btc", count: "2", unit: "wallets", value: "$12,400" },
  ] satisfies { name: string; icon: WealthCatIcon; count: string; unit: string; value: string }[],
};
