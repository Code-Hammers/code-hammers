import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PeopleComponent } from './pages/people/people.component';
import { WebsitesComponent } from './pages/websites/websites.component';
import { BooksComponent } from './pages/books/books.component';
import { ToolsComponent } from './pages/tools/tools.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PeopleComponent,
    WebsitesComponent,
    BooksComponent,
    ToolsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
