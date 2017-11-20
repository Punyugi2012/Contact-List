import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Person } from '../models/person.model';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json'
  })
};
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
  addPerson(person): Observable<any> {
    return this.http.post<any>(`${this.path}/add-person`, JSON.stringify(person), httpOptions);
  }
  editPerson(firstName, lastName, phone, person): Observable<any> {
    return this.http.put<any>(`${this.path}/edit-person/${firstName}/${lastName}/${phone}`, JSON.stringify(person), httpOptions);
  }
}
