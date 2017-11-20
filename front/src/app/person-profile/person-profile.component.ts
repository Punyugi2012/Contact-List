import { PersonService } from '../shared/services/person.service';
import { Component, OnInit } from '@angular/core';
import { Person } from '../shared/models/person.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-person-profile',
  templateUrl: './person-profile.component.html',
  styleUrls: ['./person-profile.component.css']
})
export class PersonProfileComponent implements OnInit {
  person: Person;
  constructor(
    private route: ActivatedRoute,
    private personService: PersonService,
    private location: Location,
    private router: Router
  ) {
  }
  ngOnInit() {
    this.getPerson();
  }
  getPerson(): void {
    const firstName = this.route.snapshot.paramMap.get('firstName');
    const lastName = this.route.snapshot.paramMap.get('lastName');
    const phone = this.route.snapshot.paramMap.get('phone');
    this.personService.getPerson(firstName, lastName, phone)
      .subscribe(
      (res) => {
        if (!res.firstName) {
          this.router.navigate(['/home']);
        }
        this.person = res;
      }
      );
  }
  deletePerson(firstName, lastName, phone): void {
    const result = confirm('Are you sure?');
    if (result) {
      this.personService.deletePerson(firstName, lastName, phone).subscribe(
        (res) => {
          this.location.back();
        }
      );
    }
  }
  goBack(): void {
    this.location.back();
  }

}
