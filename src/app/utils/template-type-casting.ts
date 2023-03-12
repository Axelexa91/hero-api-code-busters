import { Hero } from "../models/hero";

export function asHeroList(list: any) {
  return list as Hero[];
}

export function asHero(obj: any) {
  return obj as Hero;
}
