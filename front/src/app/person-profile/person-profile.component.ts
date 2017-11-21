import { NotificationsService } from 'angular4-simple-notifications';
import { CookieService } from 'ngx-cookie-service';
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
  options = {
    position: ['top', 'right'],
    timeOut: 5000,
    lastOnBottom: true
  };
  constructor(
    private route: ActivatedRoute,
    private personService: PersonService,
    private location: Location,
    private router: Router,
    private cookieService: CookieService,
    private notiService: NotificationsService,
  ) {
  }
  ngOnInit() {
    this.getPerson();
  }
  alertEdit() {
    if (this.cookieService.get('edit-state') === 'success') {
      this.notiService.success('Edit Contact', 'success!!');
    } else if (this.cookieService.get('edit-state') === 'not success') {
      this.notiService.error('Edit Contact', 'not success!!');
    }
  }
  getPerson(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.personService.getPerson(id)
      .subscribe(
      (res) => {
        this.alertEdit();
        this.cookieService.deleteAll();
        this.person = res.firstName ? res : null;
        if (!this.person) {
          this.goBack();
        }
      }
    );
  }
  deletePerson(id): void {
    const result = confirm('Are you sure?');
    if (result) {
      this.personService.deletePerson(id).subscribe(
        (res) => {
          if (res === 'success') {
            this.cookieService.set('delete-state', 'success');
          } else {
            this.cookieService.set('delete-state', 'not success');
          }
          this.goBack();
        }
      );
    }
  }
  goBack(): void {
    this.router.navigate(['/home']);
  }

}
