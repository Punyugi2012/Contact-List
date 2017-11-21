import { identifierName } from '@angular/compiler';
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
    const id = this.route.snapshot.paramMap.get('id');
    this.personService.getPerson(id)
      .subscribe(
      (res) => {
        if (!res.firstName) {
          this.router.navigate(['/home']);
        }
        this.person = res;
      }
      );
  }
  deletePerson(id): void {
    const result = confirm('Are you sure?');
    if (result) {
      this.personService.deletePerson(id).subscribe(
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
