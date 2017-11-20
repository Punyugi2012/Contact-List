import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Person } from '../models/person.model';

@Injectable()
export class PersonService {
  path = 'http://localhost:4000/person';
  constructor(
    private http: HttpClient
  ) { }
  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.path}/get-all`);
  }
  getPerson(firstName, lastName, phone): Observable<Person> {
    return this.http.get<Person>(`${this.path}/get/${firstName}/${lastName}/${phone}`);
  }
  deletePerson(firstName, lastName, phone): Observable<any> {
    return this.http.delete<any>(`${this.path}/delete-person/${firstName}/${lastName}/${phone}`);
  }
}
