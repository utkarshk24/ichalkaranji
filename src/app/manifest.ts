import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ichalkaranji — The Manchester of Maharashtra",
    short_name: "Ichalkaranji",
    description: "Independent trilingual city information portal for Ichalkaranji, Kolhapur district.",
    start_url: "/en",
    display: "standalone",
    background_color: "#fbf8f3",
    theme_color: "#1e3a8a",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
