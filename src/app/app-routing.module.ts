import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserListComponent } from "./components/user-list/user-list.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", component: UserListComponent, pathMatch: "full" },
  { path: "users", component: UserListComponent, pathMatch: "full" },
  { path: "**", redirectTo: "/" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
