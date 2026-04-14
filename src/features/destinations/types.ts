export type Destination = {
  id: string;
  name: string;
  region: string;
  summary: string;
};

export const destinations: Destination[] = [
  {
    id: "reykjavik",
    name: "Reykjavik",
    region: "Iceland",
    summary: "Compact city base for nature access, food, and northern light trips.",
  },
  {
    id: "chefchaouen",
    name: "Chefchaouen",
    region: "Morocco",
    summary: "Blue-washed mountain town with a slower pace and strong local character.",
  },
  {
    id: "valparaiso",
    name: "Valparaíso",
    region: "Chile",
    summary: "Port city with steep hills, murals, and a strong creative scene.",
  },
];
