import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "gliddy — AI trip plans",
    short_name: "gliddy",
    description:
      "Personalized day-by-day trip itineraries with hotels, routes, and maps. No subscription, no account.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAFA",
    theme_color: "#D4442B",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
