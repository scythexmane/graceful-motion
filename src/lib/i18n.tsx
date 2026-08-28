import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const LANGS = ["ru", "uz", "en"] as const;
export type Lang = (typeof LANGS)[number];

export const LANG_LABEL: Record<Lang, string> = {
  ru: "RU",
  uz: "UZ",
  en: "EN",
};

type Dict = {
  nav: { atmosphere: string; menu: string; guests: string; contact: string; book: string };
  hero: { eyebrow: string; title: string; titleSub: string; sub: string; cta: string; menu: string };
  atmosphere: { eyebrow: string; title: string[]; text: string; hint: string };
  menu: {
    eyebrow: string;
    title: string[];
    categories: { key: string; label: string }[];
    items: Record<string, { name: string; note: string; price: string }[]>;
  };
  guests: { eyebrow: string; title: string[]; quotes: { text: string; name: string }[] };
  contact: {
    eyebrow: string;
    title: string[];
    text: string;
    instagram: string;
    taplink: string;
    taplinkNote: string;
    phone: string;
    phoneNote: string;
    location: string;
    locationNote: string;
  };
  footer: { hours: string; hoursLines: string[]; findUs: string; address: string[]; follow: string; top: string; rights: string };
};

const ru: Dict = {
  nav: { atmosphere: "Атмосфера", menu: "Меню", guests: "Отзывы", contact: "Контакты", book: "Забронировать" },
  hero: {
    eyebrow: "Family Style Restaurant",
    title: "MINOJ",
    titleSub: "семейный ресторан",
    sub: "Zamonaviylik va mazali ta’mni birlashtirgan joy",
    cta: "Связаться с нами",
    menu: "Смотреть меню",
  },
  atmosphere: {
    eyebrow: "Атмосфера",
    title: ["Как это", "выглядит"],
    text: "Короткие кадры из зала, кухни и вечеров у нас. Тёплый свет, большие столы и еда, которую хочется делить.",
    hint: "Нажмите, чтобы включить звук",
  },
  menu: {
    eyebrow: "Стол",
    title: ["Наше меню"],
    categories: [
      { key: "starters", label: "Закуски" },
      { key: "main", label: "Горячее" },
      { key: "grill", label: "Гриль" },
      { key: "desserts", label: "Десерты" },
    ],
    items: {
      starters: [
        { name: "Ачик-чучук", note: "Томаты, красный лук, базилик", price: "28 000" },
        { name: "Хумус с лепёшкой", note: "Нут, кунжут, оливковое масло", price: "38 000" },
        { name: "Сырная тарелка", note: "Ассорти сыров, орехи, мёд", price: "72 000" },
        { name: "Салат с телятиной", note: "Томлёная телятина, зелень, соус", price: "56 000" },
      ],
      main: [
        { name: "Плов по-домашнему", note: "Рис девзира, телятина, нут", price: "65 000" },
        { name: "Лагман", note: "Тянутая лапша, овощи, говядина", price: "48 000" },
        { name: "Паста с грибами", note: "Сливочный соус, пармезан", price: "58 000" },
        { name: "Манты", note: "Рубленое мясо, лук, сметана", price: "42 000" },
      ],
      grill: [
        { name: "Шашлык из телятины", note: "Уголь, лук, лепёшка", price: "62 000" },
        { name: "Куриные крылья", note: "Медово-острый маринад", price: "45 000" },
        { name: "Рыба на углях", note: "Дорадо, лимон, травы", price: "95 000" },
        { name: "Овощи гриль", note: "Баклажан, перец, томаты", price: "36 000" },
      ],
      desserts: [
        { name: "Медовик", note: "Домашний, со сметанным кремом", price: "32 000" },
        { name: "Чизкейк", note: "Классический, ягодный соус", price: "38 000" },
        { name: "Чай с сухофруктами", note: "Чайник на компанию", price: "25 000" },
      ],
    },
  },
  guests: {
    eyebrow: "Гости",
    title: ["Что говорят", "наши гости"],
    quotes: [
      { text: "Уютно, вкусно и по-домашнему. Приходим всей семьёй каждую неделю.", name: "Дилноза" },
      { text: "Плов здесь лучший в городе, а обслуживание внимательное и спокойное.", name: "Тимур" },
      { text: "Идеальное место для большой компании — никто не торопит.", name: "Олег" },
      { text: "Красивый интерьер и очень доброжелательный персонал.", name: "Малика" },
    ],
  },
  contact: {
    eyebrow: "Контакты",
    title: ["Приходите", "к нам"],
    text: "Мы всегда на связи. Напишите в Instagram, позвоните или сразу постройте маршрут.",
    instagram: "Instagram",
    taplink: "Taplink",
    taplinkNote: "Все ссылки в одном месте",
    phone: "Телефон",
    phoneNote: "Звонок и бронь стола",
    location: "Локация",
    locationNote: "Построить маршрут",
  },
  footer: {
    hours: "Часы работы",
    hoursLines: ["Пн–Чт  10:00 — 23:00", "Пт–Вс  10:00 — 00:00"],
    findUs: "Как нас найти",
    address: ["Узбекистан, Ташкент", "+998 90 499 99 99"],
    follow: "Мы в сети",
    top: "Наверх",
    rights: "Minoj. Все права защищены",
  },
};

const uz: Dict = {
  nav: { atmosphere: "Atmosfera", menu: "Menyu", guests: "Fikrlar", contact: "Kontaktlar", book: "Bog‘lanish" },
  hero: {
    eyebrow: "Family Style Restaurant",
    title: "MINOJ",
    titleSub: "oilaviy restoran",
    sub: "Zamonaviylik va mazali ta’mni birlashtirgan joy",
    cta: "Biz bilan bog‘laning",
    menu: "Menyuni ko‘rish",
  },
  atmosphere: {
    eyebrow: "Atmosfera",
    title: ["Bu yer", "shunday"],
    text: "Zal, oshxona va oqshomlarimizdan qisqa lavhalar. Iliq yorug‘lik, katta stollar va baham ko‘rgingiz keladigan taomlar.",
    hint: "Ovozni yoqish uchun bosing",
  },
  menu: {
    eyebrow: "Dasturxon",
    title: ["Bizning menyu"],
    categories: [
      { key: "starters", label: "Salatlar" },
      { key: "main", label: "Issiq taomlar" },
      { key: "grill", label: "Gril" },
      { key: "desserts", label: "Shirinliklar" },
    ],
    items: {
      starters: [
        { name: "Achichuk", note: "Pomidor, qizil piyoz, rayhon", price: "28 000" },
        { name: "Xumus va patir", note: "No‘xat, kunjut, zaytun moyi", price: "38 000" },
        { name: "Pishloq assortisi", note: "Pishloqlar, yong‘oq, asal", price: "72 000" },
        { name: "Buzoq go‘shtli salat", note: "Dimlangan go‘sht, ko‘katlar", price: "56 000" },
      ],
      main: [
        { name: "Uyimizdagi palov", note: "Devzira, buzoq go‘shti, no‘xat", price: "65 000" },
        { name: "Lag‘mon", note: "Cho‘zma xamir, sabzavot, go‘sht", price: "48 000" },
        { name: "Qo‘ziqorinli pasta", note: "Qaymoqli sous, parmezan", price: "58 000" },
        { name: "Manti", note: "Maydalangan go‘sht, piyoz, qaymoq", price: "42 000" },
      ],
      grill: [
        { name: "Buzoq kabobi", note: "Cho‘g‘da, piyoz va patir bilan", price: "62 000" },
        { name: "Tovuq qanotlari", note: "Asal-achchiq marinad", price: "45 000" },
        { name: "Cho‘g‘dagi baliq", note: "Dorado, limon, ko‘katlar", price: "95 000" },
        { name: "Gril sabzavotlar", note: "Baqlajon, qalampir, pomidor", price: "36 000" },
      ],
      desserts: [
        { name: "Medovik", note: "Uyda tayyorlangan, qaymoqli krem", price: "32 000" },
        { name: "Chizkeyk", note: "Klassik, rezavor sous bilan", price: "38 000" },
        { name: "Quruq mevali choy", note: "Davraga choynak", price: "25 000" },
      ],
    },
  },
  guests: {
    eyebrow: "Mehmonlar",
    title: ["Mehmonlar", "nima deydi"],
    quotes: [
      { text: "Uyda kabi iliq va mazali. Har hafta oila bilan kelamiz.", name: "Dilnoza" },
      { text: "Shahardagi eng zo‘r palov, xizmat esa juda e’tiborli.", name: "Timur" },
      { text: "Katta davra uchun ideal joy — hech kim shoshirmaydi.", name: "Oleg" },
      { text: "Chiroyli interyer va juda xushmuomala xodimlar.", name: "Malika" },
    ],
  },
  contact: {
    eyebrow: "Kontaktlar",
    title: ["Bizga", "tashrif buyuring"],
    text: "Biz doim aloqadamiz. Instagramda yozing, qo‘ng‘iroq qiling yoki yo‘nalishni oching.",
    instagram: "Instagram",
    taplink: "Taplink",
    taplinkNote: "Barcha havolalar bir joyda",
    phone: "Telefon",
    phoneNote: "Qo‘ng‘iroq va stol bandlash",
    location: "Manzil",
    locationNote: "Yo‘nalishni ochish",
  },
  footer: {
    hours: "Ish vaqti",
    hoursLines: ["Du–Pay  10:00 — 23:00", "Ju–Yak  10:00 — 00:00"],
    findUs: "Manzilimiz",
    address: ["O‘zbekiston, Toshkent", "+998 90 499 99 99"],
    follow: "Ijtimoiy tarmoqlar",
    top: "Yuqoriga",
    rights: "Minoj. Barcha huquqlar himoyalangan",
  },
};

const en: Dict = {
  nav: { atmosphere: "Atmosphere", menu: "Menu", guests: "Guests", contact: "Contact", book: "Get in touch" },
  hero: {
    eyebrow: "Family Style Restaurant",
    title: "MINOJ",
    titleSub: "family restaurant",
    sub: "Zamonaviylik va mazali ta’mni birlashtirgan joy",
    cta: "Get in touch",
    menu: "View the menu",
  },
  atmosphere: {
    eyebrow: "Atmosphere",
    title: ["How it", "feels here"],
    text: "Short clips from the dining room, the kitchen and our evenings. Warm light, big tables and food worth sharing.",
    hint: "Tap to unmute",
  },
  menu: {
    eyebrow: "The table",
    title: ["Our menu"],
    categories: [
      { key: "starters", label: "Starters" },
      { key: "main", label: "Main" },
      { key: "grill", label: "Grill" },
      { key: "desserts", label: "Desserts" },
    ],
    items: {
      starters: [
        { name: "Achichuk salad", note: "Tomato, red onion, basil", price: "28 000" },
        { name: "Hummus & flatbread", note: "Chickpea, sesame, olive oil", price: "38 000" },
        { name: "Cheese board", note: "Selection of cheeses, nuts, honey", price: "72 000" },
        { name: "Veal salad", note: "Slow-cooked veal, herbs, dressing", price: "56 000" },
      ],
      main: [
        { name: "Homemade plov", note: "Devzira rice, veal, chickpeas", price: "65 000" },
        { name: "Lagman", note: "Hand-pulled noodles, beef, vegetables", price: "48 000" },
        { name: "Mushroom pasta", note: "Cream sauce, parmesan", price: "58 000" },
        { name: "Manti", note: "Minced meat, onion, sour cream", price: "42 000" },
      ],
      grill: [
        { name: "Veal skewers", note: "Charcoal, onion, flatbread", price: "62 000" },
        { name: "Chicken wings", note: "Honey and chilli marinade", price: "45 000" },
        { name: "Fish on coals", note: "Dorado, lemon, herbs", price: "95 000" },
        { name: "Grilled vegetables", note: "Aubergine, pepper, tomato", price: "36 000" },
      ],
      desserts: [
        { name: "Medovik", note: "Honey layer cake, sour cream", price: "32 000" },
        { name: "Cheesecake", note: "Classic, berry sauce", price: "38 000" },
        { name: "Dried fruit tea", note: "A pot for the table", price: "25 000" },
      ],
    },
  },
  guests: {
    eyebrow: "Guests",
    title: ["What our", "guests say"],
    quotes: [
      { text: "Warm, homely and delicious. We come with the whole family every week.", name: "Dilnoza" },
      { text: "The best plov in town, and the service is calm and attentive.", name: "Timur" },
      { text: "A perfect place for a big table — nobody ever rushes you.", name: "Oleg" },
      { text: "Beautiful interior and genuinely friendly people.", name: "Malika" },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: ["Come", "and visit"],
    text: "We are always reachable. Message us on Instagram, call, or open the route straight away.",
    instagram: "Instagram",
    taplink: "Taplink",
    taplinkNote: "All our links in one place",
    phone: "Phone",
    phoneNote: "Call us and book a table",
    location: "Location",
    locationNote: "Open directions",
  },
  footer: {
    hours: "Opening hours",
    hoursLines: ["Mon–Thu  10:00 — 23:00", "Fri–Sun  10:00 — 00:00"],
    findUs: "Find us",
    address: ["Tashkent, Uzbekistan", "+998 90 499 99 99"],
    follow: "Follow",
    top: "Back to top",
    rights: "Minoj. All rights reserved",
  },
};

export const DICTS: Record<Lang, Dict> = { ru, uz, en };

export const LINKS = {
  instagram: "https://www.instagram.com/minoj.official",
  taplink:
    "https://taplink.cc/minoj.official.uz?utm_source=ig&utm_medium=social&utm_content=link_in_bio",
  phone: "+998904999999",
  phoneDisplay: "+998 90 499 99 99",
  maps: "https://yandex.uz/maps/-/CTwIAZn8",
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };
const I18nContext = createContext<Ctx>({ lang: "ru", setLang: () => {}, t: ru });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ru");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("minoj-lang") : null;
    if (stored && (LANGS as readonly string[]).includes(stored)) setLang(stored as Lang);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") window.localStorage.setItem("minoj-lang", lang);
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t: DICTS[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
