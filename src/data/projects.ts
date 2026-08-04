export interface Project {
  name: string;
  tagline: string;
  description: string;
  repoUrl: string;
  tech: string[];
}

export const projects: Project[] = [
  {
    name: "Sovereign Watch",
    tagline: "Distributed multi-INT fusion center",
    description:
      "Self-hosted platform that fuses ADS-B, AIS, satellite, radio, and OSINT telemetry into unified tactical and analytical views — no cloud dependency, all local processing.",
    repoUrl: "https://github.com/d3mocide/Sovereign_Watch",
    tech: ["React", "FastAPI", "TimescaleDB", "Deck.gl"],
  },
  {
    name: "MeshRF",
    tagline: "RF propagation & link analysis for LoRa mesh",
    description:
      "Professional-grade propagation and link analysis for LoRa mesh networks (Meshtastic, Reticulum), with a physics-based terrain engine and coverage heatmaps.",
    repoUrl: "https://github.com/d3mocide/MeshRF",
    tech: ["React", "Leaflet", "Python", "WebAssembly"],
  },
  {
    name: "Vertex",
    tagline: "Local-first situational awareness dashboard",
    description:
      "Map-centric dashboard aggregating ADS-B, AIS, P25 radio, and mesh network data into one tactical interface, tuned to run on a Raspberry Pi 5.",
    repoUrl: "https://github.com/d3mocide/Vertex",
    tech: ["React", "FastAPI", "PostGIS", "MapLibre"],
  },
  {
    name: "Faraday",
    tagline: "Parametric radio case generator",
    description:
      "Browser-based tool for designing 3D-printable enclosures for RF gear, with board presets for RTL-SDR, Heltec V3, T-Beam, and Pi Zero.",
    repoUrl: "https://github.com/d3mocide/Faraday",
    tech: ["React", "Three.js", "Manifold-3D"],
  },
  {
    name: "Skywave",
    tagline: "HF propagation & space weather dashboard",
    description:
      "Self-hosted dashboard for amateur radio operators tracking HF propagation, ionospheric conditions, and space weather, with full offline capability.",
    repoUrl: "https://github.com/d3mocide/Skywave",
    tech: ["React", "TypeScript", "FastAPI", "Leaflet"],
  },
  {
    name: "DedDrop",
    tagline: "Wardriving & telemetry uploader",
    description:
      "Passive telemetry dead-drop that collects ADS-B feeds and LoRa wardriving data, then ships HMAC-signed batches upstream with a live monitoring dashboard.",
    repoUrl: "https://github.com/d3mocide/DedDrop",
    tech: ["Python", "Docker"],
  },
];
