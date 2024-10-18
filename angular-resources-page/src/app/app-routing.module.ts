import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PeopleComponent } from './pages/people/people.component';
import { WebsitesComponent } from './pages/websites/websites.component';
import { BooksComponent } from './pages/books/books.component';
import { ToolsComponent } from './pages/tools/tools.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route (Home)
  { path: 'people', component: PeopleComponent },
  { path: 'websites', component: WebsitesComponent },
  { path: 'books', component: BooksComponent },
  { path: 'tools', component: ToolsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
