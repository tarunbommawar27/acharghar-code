import mango from "@/assets/mango.jpg";
import lemon from "@/assets/lemon.jpg";
import garlic from "@/assets/garlic.jpg";
import mixed from "@/assets/mixed.jpg";
import chili from "@/assets/chili.jpg";
import chunda from "@/assets/chunda.jpg";
import gongura from "@/assets/gongura.jpg";
import carrot from "@/assets/carrot.jpg";

export type SpiceLevel = "Mild" | "Medium" | "Hot" | "Extra Hot";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  spice: SpiceLevel;
  description: string;
  image: string;
  rating: number;
  ingredients: string;
  pairsWith: string[];
}

export const products: Product[] = [
  {
    id: "mango",
    name: "Mango Pickle",
    category: "Classic",
    price: 9.99,
    spice: "Hot",
    description:
      "Traditional raw mango pickle made with mustard seeds, chili, fenugreek, and aromatic mustard oil.",
    image: mango,
    rating: 4.9,
    ingredients:
      "Raw mango, mustard oil, red chili, mustard seeds, fenugreek, turmeric, asafoetida, salt.",
    pairsWith: ["Rice & dal", "Paratha", "Curd rice"],
  },
  {
    id: "lemon",
    name: "Lemon Pickle",
    category: "Tangy",
    price: 8.99,
    spice: "Medium",
    description:
      "Sun-style lemon pickle with a bold tangy flavor and gently balanced warming spices.",
    image: lemon,
    rating: 4.8,
    ingredients: "Lemon, salt, red chili, turmeric, fenugreek, mustard oil.",
    pairsWith: ["Khichdi", "Curd rice", "Roti"],
  },
  {
    id: "garlic",
    name: "Garlic Pickle",
    category: "Spicy",
    price: 10.99,
    spice: "Hot",
    description:
      "Rich garlic pickle with deep spice notes and a bold homemade taste that lingers.",
    image: garlic,
    rating: 4.7,
    ingredients:
      "Fresh garlic, red chili, mustard oil, fenugreek, vinegar, jaggery, salt.",
    pairsWith: ["Dal rice", "Paratha", "Roti"],
  },
  {
    id: "mixed",
    name: "Mixed Vegetable Pickle",
    category: "Classic",
    price: 9.49,
    spice: "Medium",
    description:
      "Crunchy seasonal vegetables preserved with traditional North Indian spices.",
    image: mixed,
    rating: 4.8,
    ingredients:
      "Carrot, cauliflower, turnip, green chili, mustard oil, spices.",
    pairsWith: ["Paratha", "Puri", "Khichdi"],
  },
  {
    id: "chili",
    name: "Green Chili Pickle",
    category: "Spicy",
    price: 8.49,
    spice: "Extra Hot",
    description: "Fiery whole green chili pickle for true spice lovers.",
    image: chili,
    rating: 4.6,
    ingredients: "Green chili, mustard seeds, fennel, mustard oil, salt, lemon.",
    pairsWith: ["Paratha", "Dal rice", "Curd rice"],
  },
  {
    id: "chunda",
    name: "Sweet Mango Chunda",
    category: "Sweet",
    price: 11.99,
    spice: "Mild",
    description:
      "Gujarati-style sweet mango preserve with a bright tangy finish — sun-cooked and golden.",
    image: chunda,
    rating: 4.9,
    ingredients: "Raw mango, sugar, cumin, cardamom, saffron, salt.",
    pairsWith: ["Thepla", "Puri", "Paratha"],
  },
  {
    id: "gongura",
    name: "Gongura Pickle",
    category: "Andhra",
    price: 12.99,
    spice: "Hot",
    description:
      "Andhra-style sorrel leaf pickle with a bold, earthy, fiery flavor.",
    image: gongura,
    rating: 4.8,
    ingredients:
      "Gongura (sorrel) leaves, red chili, sesame oil, garlic, tamarind, salt.",
    pairsWith: ["Hot rice & ghee", "Idli", "Dosa"],
  },
  {
    id: "carrot",
    name: "Carrot Pickle",
    category: "Seasonal",
    price: 8.99,
    spice: "Medium",
    description: "Fresh carrot pickle with mustard, chili, and tangy spices.",
    image: carrot,
    rating: 4.7,
    ingredients: "Carrot, mustard seeds, red chili, mustard oil, salt, lemon.",
    pairsWith: ["Paratha", "Rice", "Khichdi"],
  },
];

export const categories = [
  "All",
  "Classic",
  "Tangy",
  "Spicy",
  "Sweet",
  "Andhra",
  "Seasonal",
];
export const spiceLevels: SpiceLevel[] = ["Mild", "Medium", "Hot", "Extra Hot"];
