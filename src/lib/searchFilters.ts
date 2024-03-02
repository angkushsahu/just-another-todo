export const filterValues = [
   { value: "all", title: "All" },
   { value: "priority", title: "Priority" },
   { value: "regular", title: "Regular" },
] as const;

export const markValues = [
   { value: "all", title: "All" },
   { value: "done", title: "Done" },
   { value: "not-done", title: "Not Done" },
] as const;

export type FilterValuesType = (typeof filterValues)[number]["value"];
export type MarkedValuesType = (typeof markValues)[number]["value"];
