export interface Flasher {
  name: string;
  tagline: string;
  description: string;
  url: string;
  hardware: string[];
}

export const flashers: Flasher[] = [
  {
    name: "ESP32 Marauder (CYD)",
    tagline: "Web Serial Flasher for Cheap Yellow Display",
    description:
      "Browser-based web flasher for installing ESP32 Marauder suite firmware directly onto ESP32-2432S028 (CYD) hardware using Web Serial.",
    url: "https://threathunt.cc/ESP32Marauder-CYD/",
    hardware: ["ESP32-2432S028", "CYD", "Web Serial"],
  },
  {
    name: "PathShield (M5StickS3)",
    tagline: "Web Serial Flasher for M5Stick Series",
    description:
      "Browser-based installer and web flasher for installing PathShield firmware on M5StickS3 / M5StickC PLUS2 hardware directly via Web Serial.",
    url: "https://threathunt.cc/PathShield-M5StickS3/",
    hardware: ["M5StickS3", "M5StickC PLUS2", "Web Serial"],
  },
];
