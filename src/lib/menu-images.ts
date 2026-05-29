import type { Dish } from "@/data/menu";

export function resolveDishImage(dish: Dish): string {
  return dish.image;
}

export function resolveDishImageAlt(dish: Dish): string {
  return dish.imageAlt;
}