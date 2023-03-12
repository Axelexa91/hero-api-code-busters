import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, take, takeUntil } from "rxjs";
import { Hero } from "../models/hero";
import { HeroService } from "./hero.service";

@Injectable({
  providedIn: "root",
})
export class HeroSearchService {
  constructor(private readonly heroService: HeroService) {
    this.heroService.heroList$.subscribe((heroList) => {
      console.debug("[HERO SEARCH SERVICE : new full hero list loaded]");
      this.heroList = heroList;
      this._filteredHeroList$.next(this.heroList);
    });
  }

  private heroList: Hero[] = [];
  activeFilter: keyof Hero | undefined;

  _filteredHeroList$ = new BehaviorSubject<Hero[]>([]);
  filteredHeroList$ = this._filteredHeroList$.asObservable();

  lastSearch = "";

  /**
   * Filter heroes based on the query words (extended search) with a possibility to reduce target to a single property
   * @param query
   */
  search(query: string) {
    console.debug(`[HERO SEARCH SERVICE : searching ${query} with filter : ${this.activeFilter}]`);

    const words = query.split(" ");
    const filteredHeroList = this.heroList.filter((hero) => {
      const target = this.activeFilter ? JSON.stringify(hero[this.activeFilter]) : JSON.stringify(hero);
      return words.every((word) => target.toLowerCase().includes(word.toLowerCase()));
    });
    this._filteredHeroList$.next(filteredHeroList);
    this.lastSearch = query;
  }
}
