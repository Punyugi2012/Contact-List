import { Person } from '../shared/models/person.model';
import { PersonService } from '../shared/services/person.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit {
  person: Person = new Person();
  firstName = '';
  lastName = '';
  phone = '';
  constructor(
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }
  ngOnInit() {
    this.getPerson();
  }
  getPerson(): void {
    this.firstName = this.route.snapshot.paramMap.get('firstName');
    this.lastName = this.route.snapshot.paramMap.get('lastName');
    this.phone = this.route.snapshot.paramMap.get('phone');
    this.personService.getPerson(this.firstName, this.lastName, this.phone)
      .subscribe(
      (res) => {
        if (!res.firstName) {
          this.router.navigate(['/home']);
        }
        this.person = res;
      }
      );
  }
  editPerson(): void {
    this.personService.editPerson(this.firstName, this.lastName, this.phone, this.person).subscribe(
      (res) => {
        this.router.navigate(['/home']);
      }
    );
  }
  goBack() {
    this.location.back();
  }
}
