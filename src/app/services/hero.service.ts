import { HttpClient } from "@angular/common/http";
import { Injectable, SecurityContext } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { BehaviorSubject, mergeMap, Observable, of, switchMap, take, tap } from "rxjs";
import { ALL, BASE_URL, ENDPOINTS, END_IMAGES_URL, END_URL, IMAGES } from "../models/endpoints";
import { Appearance, Biography, Connections, Hero, Images, Powerstats, Work } from "../models/hero";

@Injectable({
  providedIn: "root",
})
export class HeroService {
  _heroList$ = new BehaviorSubject<Hero[]>([]);
  heroList$ = this._heroList$.asObservable();

  constructor(private readonly httpClient: HttpClient, private readonly domSanitizer: DomSanitizer) {
    this.getAllHeroes$()
      .pipe(take(1))
      .subscribe((heroList) => {
        this._heroList$.next(heroList);
      });
  }

  private formatURLByEndpoint(endpoint: Exclude<keyof typeof ENDPOINTS, "ALL">, id: number): string {
    return BASE_URL + ENDPOINTS[endpoint] + String(id) + END_URL;
  }

  getHeroPropertyById$(id: number, property: "ID"): Observable<Hero>;
  getHeroPropertyById$(id: number, property: "POWERSTATS"): Observable<Powerstats>;
  getHeroPropertyById$(id: number, property: "APPEARANCE"): Observable<Appearance>;
  getHeroPropertyById$(id: number, property: "BIOGRAPHY"): Observable<Biography>;
  getHeroPropertyById$(id: number, property: "CONNECTIONS"): Observable<Connections>;
  getHeroPropertyById$(id: number, property: "WORK"): Observable<Work>;
  getHeroPropertyById$(id: number, property: Exclude<keyof typeof ENDPOINTS, "ALL">) {
    console.debug(`[HERO SERVICE : loaded ${property} of hero number ${id}]`);
    return this.httpClient.get(this.formatURLByEndpoint(property, id));
  }

  getAllHeroes$() {
    return this.httpClient.get(BASE_URL + ALL) as Observable<Hero[]>;
  }

  getHeroeImage$(id: number, size: keyof Images) {
    return this.getHeroPropertyById$(id, "ID").pipe(
      switchMap((hero) => {
        const url = hero.images[size] ?? BASE_URL + IMAGES + size + hero.slug + END_IMAGES_URL;
        return of(this.domSanitizer.sanitize(SecurityContext.URL, url));
      })
    );
  }
}
