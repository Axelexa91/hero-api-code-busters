import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatOptionSelectionChange } from "@angular/material/core";
import { Subject, take, takeUntil } from "rxjs";
import { Hero, Images, Powerstats } from "src/app/models/hero";
import { HeroSearchService } from "src/app/services/hero-search.service";
import { HeroService } from "src/app/services/hero.service";
import { getProps } from "src/app/utils/object";
import { asHero, asHeroList } from "src/app/utils/template-type-casting";

type Side = "left" | "right";
@Component({
  selector: "app-compare",
  templateUrl: "./compare.component.html",
  styleUrls: ["./compare.component.scss"],
})
export class CompareComponent implements OnInit, OnDestroy {
  readonly asHeroList = asHeroList;
  readonly asHero = asHero;
  readonly getProps = getProps;

  private readonly unsubscribe = new Subject<void>();
  constructor(private readonly heroSearchService: HeroSearchService, private readonly heroService: HeroService) {}

  private side: Side = "left";

  filteredOptions: { [side in Side]: Hero[] } = {
    left: [],
    right: [],
  };

  displayedHero: { [side in Side]: Hero | undefined } = {
    left: undefined,
    right: undefined,
  };

  ngOnInit() {
    this.heroSearchService.filteredHeroList$.pipe(takeUntil(this.unsubscribe)).subscribe((filteredHeroList) => {
      this.filteredOptions[this.side] = filteredHeroList;
    });
  }

  search(query: string, side: Side) {
    this.side = side;
    this.heroSearchService.search(query);
  }

  selectHero(heroId: number, side: Side) {
    this.heroService
      .getHeroPropertyById$(heroId, "ID")
      .pipe(take(1))
      .subscribe((hero) => {
        this.displayedHero[side] = hero;
      });
  }

  autoCompleteDisplayMethod(hero: Hero) {
    return hero.name;
  }

  isStronger(side: Side, stat: keyof Powerstats) {
    return (
      (this.displayedHero[side === "left" ? "left" : "right"]?.powerstats[stat] ?? 0) >
      (this.displayedHero[side === "left" ? "right" : "left"]?.powerstats[stat] ?? 0)
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }
}
