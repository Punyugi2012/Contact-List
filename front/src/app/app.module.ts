import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PersonService } from './shared/services/person.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { PersonProfileComponent } from './person-profile/person-profile.component';
import { AddPersonComponent } from './add-person/add-person.component';
import { EditPersonComponent } from './edit-person/edit-person.component';
import { AppRoutingModule } from './/app-routing.module';
import { SearchPersonComponent } from './search-person/search-person.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactListComponent,
    PersonProfileComponent,
    AddPersonComponent,
    EditPersonComponent,
    SearchPersonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule
  ],
  providers: [
    PersonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
