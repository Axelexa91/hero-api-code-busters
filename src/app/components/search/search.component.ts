import { Component, OnInit } from "@angular/core";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { Observable } from "rxjs";
import { Hero } from "src/app/models/hero";
import { HeroSearchService } from "src/app/services/hero-search.service";
import { HeroService } from "src/app/services/hero.service";
import { getProps } from "src/app/utils/object";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  readonly getProps = getProps;
  constructor(private readonly heroSearchService: HeroSearchService) {}

  filteredHeroList$ = this.heroSearchService.filteredHeroList$;

  ngOnInit() {
    this.heroSearchService.search("");
  }

  sortStats(hero: Hero) {
    if (!hero?.powerstats) return ["unknown"];
    return Object.keys(hero.powerstats).sort((statName, otherStatName) => {
      return hero.powerstats[statName] - hero.powerstats[otherStatName];
    });
  }
}
