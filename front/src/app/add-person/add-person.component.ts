import { PersonService } from '../shared/services/person.service';
import { Person } from '../shared/models/person.model';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {
  newPerson = {
    firstName: undefined,
    lastName: undefined,
    email: '-',
    phone: undefined,
    notes: '-'
  };
  constructor(
    private location: Location,
    private personService: PersonService
  ) { }

  ngOnInit() { }
  goBack(): void {
    this.location.back();
  }
  addPerson() {
    this.personService.addPerson(this.newPerson).subscribe(
      (res) => {
         this.goBack();
      }
    );
  }


}
