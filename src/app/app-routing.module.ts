import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "",
    loadChildren: () =>
      import("./tabs/tabs.module").then((m) => m.TabsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "settings",
    loadChildren: () =>
      import("./settings/settings.module").then((m) => m.SettingsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "search",
    loadChildren: () =>
      import("./search/search.module").then((m) => m.SearchPageModule),
  },
  {
    path: "library",
    loadChildren: () =>
      import("./library/library.module").then((m) => m.LibraryPageModule),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
