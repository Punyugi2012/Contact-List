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
  getPerson(id): Observable<Person> {
    return this.http.get<Person>(`${this.path}/get/${id}`);
  }
  deletePerson(id): Observable<any> {
    return this.http.delete<any>(`${this.path}/delete-person/${id}`);
  }
  addPerson(person): Observable<any> {
    return this.http.post<any>(`${this.path}/add-person`, JSON.stringify(person), httpOptions);
  }
  editPerson(person): Observable<any> {
    return this.http.put<any>(`${this.path}/edit-person/${person.id}`, JSON.stringify(person), httpOptions);
  }
}
