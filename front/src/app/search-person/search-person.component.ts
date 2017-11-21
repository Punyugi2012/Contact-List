import { PersonService } from '../shared/services/person.service';
import { Person } from '../shared/models/person.model';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-search-person',
  templateUrl: './search-person.component.html',
  styleUrls: ['./search-person.component.css']
})
export class SearchPersonComponent implements OnInit {
  persons: Person[];
  filteredData: Person[] = [];
  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.getPersons();
  }
  getPersons() {
    this.personService.getPersons().subscribe(
      (res) => {
        this.persons = res;
      }
    );
  }
  updateData(query: string): void {
    if (query) {
      this.filteredData = _.filter(this.persons,
        (person) => person.firstName.indexOf(query) >= 0 ||
          person.phone.indexOf(query) >= 0 ||
          person.lastName.indexOf(query) >= 0
      );
    } else {
      this.filteredData = [];
    }
  }
}
