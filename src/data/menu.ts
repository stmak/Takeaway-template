import { resolveDishImage, resolveDishImageAlt } from "@/lib/menu-images";

export type MenuCategory =
  | "Starters"
  | "Soups"
  | "Chicken"
  | "Beef"
  | "Duck & Seafood"
  | "Rice & Noodles";

export type Dish = {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  ingredients: string;
  description: string;
  popular: boolean;
  image: string;
  imageAlt: string;
};

const categoryArtwork: Record<MenuCategory, { motif: string; hueA: string; hueB: string }> = {
  Starters: { motif: "fan", hueA: "38 82% 52%", hueB: "48 78% 60%" },
  Soups: { motif: "bowl", hueA: "34 68% 50%", hueB: "44 72% 58%" },
  Chicken: { motif: "wok", hueA: "28 72% 48%", hueB: "38 82% 56%" },
  Beef: { motif: "cleaver", hueA: "22 66% 42%", hueB: "32 76% 52%" },
  "Duck & Seafood": { motif: "wave", hueA: "195 48% 42%", hueB: "36 74% 56%" },
  "Rice & Noodles": { motif: "chopsticks", hueA: "42 55% 48%", hueB: "48 72% 60%" },
};

const makeDishImage = (name: string, category: MenuCategory, popular: boolean) => {
  const art = categoryArtwork[category];
  const border = popular ? "42 85% 58%" : "38 30% 68%";
  const label = name.length > 22 ? `${name.slice(0, 20)}…` : name;
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 440" role="img" aria-label="${label}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="hsl(${art.hueA})" />
        <stop offset="100%" stop-color="hsl(${art.hueB})" />
      </linearGradient>
      <radialGradient id="plate" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="rgba(255,252,245,0.95)" />
        <stop offset="100%" stop-color="rgba(250,242,225,0.78)" />
      </radialGradient>
    </defs>
    <rect width="600" height="440" rx="28" fill="url(#bg)" />
    <rect x="18" y="18" width="564" height="404" rx="22" fill="none" stroke="hsl(${border})" stroke-width="3" stroke-dasharray="14 10" opacity="0.9" />
    <ellipse cx="300" cy="238" rx="176" ry="110" fill="url(#plate)" />
    <ellipse cx="300" cy="238" rx="132" ry="78" fill="rgba(180,120,40,0.15)" />
    <text x="52" y="74" fill="rgba(255,252,245,0.92)" font-family="Georgia, serif" font-size="26" letter-spacing="2">${category.toUpperCase()}</text>
    <text x="52" y="378" fill="rgba(255,252,245,0.96)" font-family="Georgia, serif" font-size="34">${label}</text>
    <text x="52" y="408" fill="rgba(255,245,230,0.78)" font-family="Arial, sans-serif" font-size="16">${art.motif} • crafted for the takeaway table</text>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const menuSeeds = [
  // Starters (5)
  { name: "Crispy Seaweed", category: "Starters" as MenuCategory, price: 4.2, ingredients: "shredded greens, sesame seeds, sweet seasoning", description: "A sweet-salty little crunch bomb that disappears faster than the kettle boils.", popular: false },
  { name: "Vegetable Spring Rolls", category: "Starters" as MenuCategory, price: 4.6, ingredients: "cabbage, carrot, glass noodles, crisp pastry", description: "Golden, crackly and packed with veggie goodness for a proper opening act.", popular: false },
  { name: "Salt and Pepper Ribs", category: "Starters" as MenuCategory, price: 6.9, ingredients: "pork ribs, garlic, chilli, onion", description: "Sticky fingers guaranteed with these punchy, moreish ribs.", popular: true },
  { name: "Salt and Pepper Chicken Wings", category: "Starters" as MenuCategory, price: 6.4, ingredients: "chicken wings, garlic, spring onion, chilli", description: "Crispy, feisty and built for people who like their starters to swagger.", popular: false },
  { name: "Salt and Pepper Chips", category: "Starters" as MenuCategory, price: 4.8, ingredients: "chips, garlic, onion, chilli, five-spice", description: "A cult takeaway side with chip-shop comfort and wok-side attitude.", popular: true },

  // Soups (5)
  { name: "Chicken and Sweetcorn Soup", category: "Soups" as MenuCategory, price: 4.5, ingredients: "shredded chicken, sweetcorn, egg ribbons, stock", description: "Silky, cosy and exactly the sort of spoonful that warms up a rainy UK evening.", popular: false },
  { name: "Hot and Sour Soup", category: "Soups" as MenuCategory, price: 4.8, ingredients: "tofu, bamboo shoots, mushroom, egg, vinegar, pepper", description: "Tangy, peppery and full of lively little kicks in every sip.", popular: false },
  { name: "Crab Meat and Sweetcorn Soup", category: "Soups" as MenuCategory, price: 4.9, ingredients: "crab meat, sweetcorn, egg ribbons, stock", description: "Sweet, delicate and wonderfully soothing with a seaside wink.", popular: false },
  { name: "Won Ton Soup", category: "Soups" as MenuCategory, price: 5.2, ingredients: "pork wontons, greens, clear broth", description: "Plump dumplings bobbing in a clean, savoury broth — comfort by the bowl.", popular: false },
  { name: "Vegetable Tofu Soup", category: "Soups" as MenuCategory, price: 4.6, ingredients: "tofu, napa cabbage, carrot, mushroom, broth", description: "Gentle, fragrant and full of clean, homely flavour.", popular: false },

  // Chicken (5)
  { name: "Sweet and Sour Chicken Hong Kong Style", category: "Chicken" as MenuCategory, price: 8.9, ingredients: "battered chicken, pineapple, peppers, onion, sweet and sour sauce", description: "A glossy, tangy crowd-pleaser that lands somewhere between comfort food and celebration.", popular: true },
  { name: "Chicken Chow Mein", category: "Chicken" as MenuCategory, price: 8.8, ingredients: "egg noodles, chicken, beansprouts, onion", description: "A UK takeaway superstar loaded with smoky noodles and wok-tossed comfort.", popular: true },
  { name: "Chicken Curry", category: "Chicken" as MenuCategory, price: 8.6, ingredients: "chicken, onion, peas, curry sauce", description: "A chip-dipping, rice-loving favourite with mellow spice and silky sauce.", popular: true },
  { name: "Kung Po Chicken", category: "Chicken" as MenuCategory, price: 9.2, ingredients: "chicken, peanuts, peppers, chilli, onion", description: "Nutty, saucy and cheekily spicy with loads of wok-fired personality.", popular: false },
  { name: "Chicken with Green Pepper in Black Bean Sauce", category: "Chicken" as MenuCategory, price: 9.1, ingredients: "chicken, green pepper, onion, fermented black beans", description: "Deep, savoury black bean flavour makes this one a proper takeaway heavyweight.", popular: false },

  // Beef (5)
  { name: "Beef with Green Pepper in Black Bean Sauce", category: "Beef" as MenuCategory, price: 9.4, ingredients: "beef, green pepper, onion, fermented black beans", description: "A UK takeaway hero with punchy sauce and tender slices of beef.", popular: true },
  { name: "Beef Chow Mein", category: "Beef" as MenuCategory, price: 9.2, ingredients: "egg noodles, beef, beansprouts, onion", description: "Smoky noodles and savoury beef make this one pure late-night satisfaction.", popular: false },
  { name: "Shredded Chilli Beef", category: "Beef" as MenuCategory, price: 9.6, ingredients: "crispy shredded beef, chilli, carrot, sweet sticky glaze", description: "A sweet-hot crunch monster and one of the nation's most-ordered favourites.", popular: true },
  { name: "Beef Curry", category: "Beef" as MenuCategory, price: 9.3, ingredients: "beef, onion, peas, curry sauce", description: "Rich, warming and brilliant with chips, rice or both.", popular: false },
  { name: "Beef with Broccoli", category: "Beef" as MenuCategory, price: 9.3, ingredients: "beef, broccoli, ginger, light sauce", description: "Tender beef and bright broccoli in a clean, glossy sauce.", popular: false },

  // Duck & Seafood (5)
  { name: "Aromatic Crispy Duck", category: "Duck & Seafood" as MenuCategory, price: 12.9, ingredients: "half duck, pancakes, cucumber, spring onion, hoisin", description: "The big-night centrepiece with crisp skin and build-your-own pancake fun.", popular: true },
  { name: "King Prawn Chow Mein", category: "Duck & Seafood" as MenuCategory, price: 9.9, ingredients: "egg noodles, king prawns, beansprouts, onion", description: "Big juicy prawns and smoky noodles make this one a proper treat.", popular: false },
  { name: "Squid with Salt and Pepper", category: "Duck & Seafood" as MenuCategory, price: 9.8, ingredients: "squid, garlic, chilli, onion, five-spice", description: "Tender-crisp squid with that addictive salt-and-pepper sparkle.", popular: false },
  { name: "King Prawn Curry", category: "Duck & Seafood" as MenuCategory, price: 10.1, ingredients: "king prawns, onion, peas, curry sauce", description: "Silky curry sauce turns juicy prawns into a comfort-food winner.", popular: false },
  { name: "Sweet and Sour King Prawn", category: "Duck & Seafood" as MenuCategory, price: 10.1, ingredients: "king prawns, peppers, pineapple, onion, sweet and sour sauce", description: "Tangy, glossy and packed with juicy bites of prawn.", popular: false },

  // Rice & Noodles (5)
  { name: "Egg Fried Rice", category: "Rice & Noodles" as MenuCategory, price: 4.4, ingredients: "rice, egg, spring onion, peas", description: "One of the true icons of the UK Chinese order: simple, fluffy and endlessly lovable.", popular: true },
  { name: "Special Fried Rice", category: "Rice & Noodles" as MenuCategory, price: 8.9, ingredients: "rice, chicken, pork, prawns, egg, peas", description: "A proper all-in favourite packed with little treasures in every spoonful.", popular: true },
  { name: "Singapore Chow Mein", category: "Rice & Noodles" as MenuCategory, price: 9.1, ingredients: "thin noodles, chicken, prawns, curry spices, peppers", description: "A spicy-tinted takeaway legend with plenty of wok perfume.", popular: true },
  { name: "Special Chow Mein", category: "Rice & Noodles" as MenuCategory, price: 9.3, ingredients: "egg noodles, chicken, pork, prawns, vegetables", description: "The greatest-hits version of chow mein, piled high and full of flavour.", popular: false },
  { name: "Vegetable Chow Mein", category: "Rice & Noodles" as MenuCategory, price: 7.7, ingredients: "egg noodles, cabbage, carrot, beansprouts, onion", description: "A cheerful wok-tossed noodle classic with plenty of crunch.", popular: false },
] as const;

export const categories: MenuCategory[] = [
  "Starters",
  "Soups",
  "Chicken",
  "Beef",
  "Duck & Seafood",
  "Rice & Noodles",
];

export const menu: Dish[] = menuSeeds.map((dish) => ({
  ...dish,
  id: slugify(dish.name),
  image: resolveDishImage({
    ...dish,
    id: slugify(dish.name),
    image: makeDishImage(dish.name, dish.category, dish.popular),
    imageAlt: `${dish.name} illustrated menu artwork`,
  } as Dish),
  imageAlt: resolveDishImageAlt({
    ...dish,
    id: slugify(dish.name),
    image: makeDishImage(dish.name, dish.category, dish.popular),
    imageAlt: `${dish.name} illustrated menu artwork`,
  } as Dish),
}));

export const popularityReference =
  "Popular badges are based on recurring UK takeaway favourites widely highlighted in British ordering roundups and menus.";

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}