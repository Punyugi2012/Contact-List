import { Component, OnInit } from '@angular/core';
import { PersonService } from '../shared/services/person.service';
import { Person } from '../shared/models/person.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  persons: Person[];
  constructor(
    private personService: PersonService
  ) { }
  ngOnInit() {
    this.getPersons();
  }
  getPersons(): void {
    this.personService.getPersons().subscribe(
      (res) => {
        this.persons = res;
        console.log('get success!!');
      }
    );
  }
}
