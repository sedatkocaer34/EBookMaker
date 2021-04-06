import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from '../app/components/auth/auth.component';
import { HomeComponent } from '../app/components/home/home.component';
import { AppComponent } from '../app/app.component';
import { BookComponent } from '../app/components/book/book.component';
import { ProfileComponent } from '../app/components/profile/profile.component';
import { UpdatebookComponent } from './components/updatebook/updatebook.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { AuthGuard } from './helpers/auth';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: HomeComponent,canActivate:[AuthGuard] },
  { path: 'book', component: BookComponent,canActivate:[AuthGuard] },
  { path: 'profile', component: ProfileComponent,canActivate:[AuthGuard] },
  { path: 'updatebook/:bookId', component: UpdatebookComponent,canActivate:[AuthGuard] },
  { path: 'bookdetail/:bookId', component: BookDetailComponent ,canActivate:[AuthGuard]},
  {path:'updatepassword',component:UpdatePasswordComponent,canActivate:[AuthGuard]},
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
