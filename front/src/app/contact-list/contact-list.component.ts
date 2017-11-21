import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { PersonService } from '../shared/services/person.service';
import { Person } from '../shared/models/person.model';
import { NotificationsService } from 'angular4-simple-notifications';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  persons: Person[];
  lengthOfPersons = 0;
  p = 1;
  options = {
    position: ['top', 'right'],
    timeOut: 5000,
    lastOnBottom: true
  };
  constructor(
    private personService: PersonService,
    private notiService: NotificationsService,
    private cookieService: CookieService

  ) { }
  ngOnInit() {
    this.getPersons();
  }
  alertAdd() {
    if (this.cookieService.get('add-state') === 'success') {
      this.notiService.success('Add Contact', 'success!!');
    } else if (this.cookieService.get('add-state') === 'success') {
      this.notiService.error('Add Contact', 'not success!!');
    }
  }
  alertDelete() {
    if (this.cookieService.get('delete-state') === 'success') {
      this.notiService.success('Delete Contact', 'success!!');
    } else if (this.cookieService.get('delete-state') === 'success') {
      this.notiService.error('Delete Contact', 'not success!!');
    }
  }
  getPersons(): void {
    this.personService.getPersons().subscribe(
      (res) => {
        this.persons = res;
        this.lengthOfPersons = this.persons.length;
        this.alertAdd();
        this.alertDelete();
        this.cookieService.deleteAll();
      }
    );
  }
}
