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
  editPerson(): void {
    this.personService.editPerson(this.person).subscribe(
      (res) => {
        this.router.navigate([`/profile/${this.person.id}`]);
      }
    );
  }
  goBack() {
    this.location.back();
  }
}
