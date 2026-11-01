export interface BrandMeta {
  name: string;
  slug: string;
  kanji: string;
  origin: string;
  tagline: string;
  description: string;
  category: string;
  image: string;
  bannerImage: string;
  established?: string;
  featured?: boolean;
  aliases: string[];
  keyIngredients?: string[];
  philosophies?: string[];
}

export const ALPHABET_NUMBER_KEYS = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
] as const;

