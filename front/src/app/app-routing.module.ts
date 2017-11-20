import { EditPersonComponent } from './edit-person/edit-person.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { PersonProfileComponent } from './person-profile/person-profile.component';
import { AddPersonComponent } from './add-person/add-person.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: ContactListComponent
  },
  {
    path: 'profile/:firstName/:lastName/:phone',
    component: PersonProfileComponent
  },
  {
    path: 'add-person',
    component: AddPersonComponent
  },
  {
    path: 'edit-person/:firstName/:lastName/:phone',
    component: EditPersonComponent
  },
  { path: '**', redirectTo: '/home',  pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
