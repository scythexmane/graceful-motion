import { createFileRoute } from "@tanstack/react-router";
import { I18nProvider } from "@/lib/i18n";
import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";
import { Atmosphere } from "@/components/atmosphere";
import { Menu } from "@/components/menu";
import { Guests } from "@/components/guests";
import { Contact } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MINOJ — Family Style Restaurant в Ташкенте" },
      {
        name: "description",
        content:
          "MINOJ — семейный ресторан: zamonaviylik va mazali ta’mni birlashtirgan joy. Меню, атмосфера, отзывы гостей и контакты.",
      },
      { property: "og:title", content: "MINOJ — Family Style Restaurant" },
      {
        property: "og:description",
        content:
          "Семейный ресторан MINOJ: тёплая атмосфера, домашняя кухня и большие столы для компании.",
      },
      { property: "og:type", content: "restaurant" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <I18nProvider>
      <main>
        <SiteNav />
        <Hero />
        <Atmosphere />
        <Menu />
        <Guests />
        <Contact />
        <SiteFooter />
      </main>
    </I18nProvider>
  );
}
