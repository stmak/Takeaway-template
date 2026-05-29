type BundleSeed = {
  id: string;
  name: string;
  category: "Bundles";
  price: number;
  ingredients: string;
  description: string;
  popular: boolean;
  image: string;
  imageAlt: string;
  serves: string;
  badge: string;
  includes: string[];
};

const makeBundleSvg = (name: string, badge: string): string => {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 440" role="img" aria-label="${name}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#F59E0B" />
        <stop offset="100%" stop-color="#FCD34D" />
      </linearGradient>
    </defs>
    <rect width="600" height="440" rx="28" fill="url(#bg)" />
    <text x="52" y="74" fill="rgba(255,255,255,0.9)" font-family="Georgia, serif" font-size="24" letter-spacing="2">${badge}</text>
    <text x="52" y="378" fill="rgba(255,255,255,0.96)" font-family="Georgia, serif" font-size="34">${name}</text>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export const bundleMeals: BundleSeed[] = [
  {
    id: "bundle-solo-feast",
    name: "Fortune House Solo Feast",
    category: "Bundles",
    price: 15.8,
    ingredients: "Chicken chow mein, egg fried rice, vegetable spring rolls",
    description:
      "A neatly judged solo supper with smoky noodles, fluffy rice and a crisp starter for one very happy night in.",
    popular: true,
    image: makeBundleSvg("Solo Feast", "One Person Meal"),
    imageAlt: "One person Chinese takeaway bundle with chow mein, spring rolls and egg fried rice",
    serves: "Serves 1",
    badge: "One person meal",
    includes: ["Chicken Chow Mein", "Egg Fried Rice", "2 Vegetable Spring Rolls"],
  },
  {
    id: "bundle-supper-for-two",
    name: "Fortune House Supper for Two",
    category: "Bundles",
    price: 31.8,
    ingredients: "Aromatic crispy duck, pancakes, beef in black bean sauce, special fried rice, salt and pepper chips",
    description:
      "A proper sharing order with duck pancakes, glossy black bean beef and enough favourites to make Friday feel rather grand.",
    popular: true,
    image: makeBundleSvg("Supper for Two", "Two Person Meal"),
    imageAlt: "Two person Chinese takeaway bundle with crispy duck, black bean beef, rice and chips",
    serves: "Serves 2",
    badge: "Two person meal",
    includes: [
      "Aromatic Crispy Duck with Pancakes",
      "Beef with Green Pepper in Black Bean Sauce",
      "Special Fried Rice",
      "Salt and Pepper Chips",
    ],
  },
  {
    id: "bundle-banquet-for-four",
    name: "Fortune House Banquet for Four",
    category: "Bundles",
    price: 63.5,
    ingredients: "Duck, sweet and sour chicken, shredded chilli beef, king prawn chow mein, egg fried rice, ribs",
    description:
      "The big-table centrepiece: glossy classics, noodles, rice and starters arranged for a lively family-style banquet.",
    popular: true,
    image: makeBundleSvg("Banquet for Four", "Four Person Banquet"),
    imageAlt: "Four person Chinese takeaway banquet with duck, chicken, beef, noodles, rice and starters",
    serves: "Serves 4",
    badge: "Four person banquet",
    includes: [
      "Aromatic Crispy Duck",
      "Sweet and Sour Chicken Hong Kong Style",
      "Shredded Chilli Beef",
      "King Prawn Chow Mein",
      "Egg Fried Rice",
      "Salt and Pepper Ribs",
      "Vegetable Spring Rolls",
    ],
  },
];