import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";
import { Story } from "@/components/story";
import { Menu } from "@/components/menu";
import { Gallery } from "@/components/gallery";
import { Guests } from "@/components/guests";
import { Reserve } from "@/components/reserve";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Minoj — Trattoria in Trastevere, Rome" },
      {
        name: "description",
        content:
          "Minoj is a Roman trattoria serving handmade pasta and wood-fired cooking. View the menu, browse the rooms and reserve a table.",
      },
      { property: "og:title", content: "Minoj — Trattoria in Trastevere, Rome" },
      {
        property: "og:description",
        content:
          "Handmade pasta, wood fire and quiet rooms in Trastevere. Reserve your table at Minoj.",
      },
      { property: "og:type", content: "restaurant" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <SiteNav />
      <Hero />
      <Story />
      <Menu />
      <Gallery />
      <Guests />
      <Reserve />
      <SiteFooter />
    </main>
  );
}
