import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from '../app/components/auth/auth.component';
import { HomeComponent } from '../app/components/home/home.component';
import { AppComponent } from '../app/app.component';
import { BookComponent } from '../app/components/book/book.component';
import { ProfileComponent } from '../app/components/profile/profile.component';
import { UpdatebookComponent } from './components/updatebook/updatebook.component';
const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: HomeComponent },
  { path: 'book', component: BookComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'updatebook/:bookId', component: UpdatebookComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
