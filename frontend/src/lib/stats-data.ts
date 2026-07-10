/**
 * Single source of truth for company stats shown across the site
 * (Hero, MetricsBar, Footer trust block). Prevents the numbers from
 * drifting between components — see CLAUDE.md "Data conventions".
 */

export interface Stat {
    id: string;
    value: number;
    prefix?: string;
    suffix: string;
    display: string;
    label: string;
}

export const stats: Stat[] = [
    {
        id: "satisfaction",
        value: 100,
        suffix: "%",
        display: "100%",
        label: "Client satisfaction",
    },
    {
        id: "projects",
        value: 15,
        suffix: "+",
        display: "15+",
        label: "Projects delivered",
    },
    {
        id: "response-time",
        value: 1,
        prefix: "<",
        suffix: " hr",
        display: "<1 hr",
        label: "Avg response time",
    },
    {
        id: "delivery-time",
        value: 2,
        suffix: " wk",
        display: "2 wk",
        label: "Avg delivery time",
    },
    {
        id: "countries",
        value: 12,
        suffix: "+",
        display: "12+",
        label: "Countries served",
    },
    {
        id: "solutions",
        value: 6,
        suffix: "",
        display: "6",
        label: "Solutions offered",
    },
];

export function getStat(id: string): Stat {
    const stat = stats.find((s) => s.id === id);
    if (!stat) throw new Error(`Unknown stat id: ${id}`);
    return stat;
}
