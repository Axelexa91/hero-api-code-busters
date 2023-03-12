import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CompareComponent } from "./components/compare/compare.component";
import { CreditsComponent } from "./components/credits/credits.component";
import { SearchComponent } from "./components/search/search.component";

const routes: Routes = [
  { path: "search", component: SearchComponent },
  { path: "compare", component: CompareComponent },
  { path: "credits", component: CreditsComponent },
  { path: "", redirectTo: "/search", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
