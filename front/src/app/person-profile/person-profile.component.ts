import { PersonService } from '../shared/services/person.service';
import { Component, OnInit } from '@angular/core';
import { Person } from '../shared/models/person.model';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-person-profile',
  templateUrl: './person-profile.component.html',
  styleUrls: ['./person-profile.component.css']
})
export class PersonProfileComponent implements OnInit {
  person: Person = null;
  constructor(
    private route: ActivatedRoute,
    private personService: PersonService
  ) { }

  ngOnInit() {
    this.getPerson();
  }
  getPerson(): void {
    const firstName = this.route.snapshot.paramMap.get('firstName');
    const lastName =  this.route.snapshot.paramMap.get('lastName');
    const phone = this.route.snapshot.paramMap.get('phone');
    this.personService.getPerson(firstName, lastName, phone)
    .subscribe(
      (res) => {
        this.person = res.firstName ? res : null;
        console.log('get success!!');
      }
    );
  }

}
