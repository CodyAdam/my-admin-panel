import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { UsersListComponent } from './users-list/users-list.component';
import {AssociationsListComponent} from "./associations-list/associations-list.component";
import {AssociationInfoComponent} from "./association-info/association-info.component";

const routes: Routes = [
  { path: 'users', component: UsersListComponent, canActivate: [AuthGuard] },
  { path: 'associations', component: AssociationsListComponent, canActivate: [AuthGuard] },
  { path: 'associations/:id', component: AssociationInfoComponent, canActivate: [AuthGuard]},
  { path: '', component: LoginComponent },
  { path: '**', pathMatch: 'full', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
