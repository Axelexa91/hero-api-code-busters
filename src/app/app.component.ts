import { Component, ElementRef, ViewChild } from "@angular/core";
import { HeroSearchService } from "./services/hero-search.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor(private readonly heroSearchService: HeroSearchService) {}
  title = "Hero thingie";

  @ViewChild("searchInput") searchInput: ElementRef<HTMLInputElement> | undefined;

  clearInput() {
    if (this.searchInput) this.searchInput.nativeElement.value = "";
    this.heroSearchService.search("");
  }

  focusOnSearch() {
    setTimeout(() => {
      if (this.searchInput) this.searchInput.nativeElement.focus();
    }, 0);
  }

  search(event: Event) {
    this.heroSearchService.search((event.target as HTMLInputElement).value);
  }
}
