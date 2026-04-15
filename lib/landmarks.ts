export interface Landmark {
  id: string;
  name: string;
  description: string;
  lat: number;
  lng: number;
  icon: string;
}

export const TULSA_LANDMARKS: Landmark[] = [
  {
    id: "meadow-gold",
    name: "Meadow Gold Sign",
    description: "Iconic neon sign at 11th & Quaker.",
    lat: 36.1486,
    lng: -95.9861,
    icon: "🥛"
  },
  {
    id: "golden-driller",
    name: "The Golden Driller",
    description: "76-foot tall oil man at Expo Square.",
    lat: 36.1336,
    lng: -95.9312,
    icon: "👷"
  },
  {
    id: "buck-atom",
    name: "Buck Atom's Cosmic Curios",
    description: "Home of Buck Atom, Space Cowboy.",
    lat: 36.1480,
    lng: -95.9737,
    icon: "🤠"
  },
  {
    id: "mother-road-market",
    name: "Mother Road Market",
    description: "First food hall in Oklahoma on 11th St.",
    lat: 36.1484,
    lng: -95.9715,
    icon: "🍔"
  },
  {
    id: "cyrus-avery",
    name: "Cyrus Avery Plaza",
    description: "Memorial to the 'Father of Route 66'.",
    lat: 36.1429,
    lng: -96.0047,
    icon: "🌉"
  },
  {
    id: "blue-whale",
    name: "Blue Whale of Catoosa",
    description: "Whimsical waterfront landmark east of Tulsa.",
    lat: 36.1937,
    lng: -95.7331,
    icon: "🐋"
  }
];

export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // Earth's radius in meters
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
            Math.cos(phi1) * Math.cos(phi2) *
            Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}
