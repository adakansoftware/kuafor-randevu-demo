export type Review = {
  name: string;
  time: string;
  rating: number;
  text: string;
};

export const reviews: Review[] = [
  {
    name: "Ayşe K.",
    time: "2 hafta önce",
    rating: 5,
    text: "Randevu almak çok kolaydı. Salon tertemiz, ekip ilgili. Kesim tam istediğim gibi oldu.",
  },
  {
    name: "Elif D.",
    time: "1 ay önce",
    rating: 5,
    text: "İlk kez geldim ve çok memnun kaldım. Kullanılan ürünler kaliteli, işlem hızlı ve özenliydi.",
  },
  {
    name: "Merve S.",
    time: "3 hafta önce",
    rating: 4,
    text: "Çalışanlar çok nazik. Fiyat/performans gayet iyi. Tekrar geleceğim.",
  },
];