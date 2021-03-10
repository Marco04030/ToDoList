import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatosToDo } from './ToDoList.model';

@Injectable({
  providedIn: 'root'
})
export class ServicioListaService {

  readonly APIUrl="http://localhost:64495/";

  constructor(private http:HttpClient) { }

  addList(val: DatosToDo){
    return this.http.post(this.APIUrl+'api/Lists', val);
    }

  getList(): Observable<DatosToDo[]> {
    return this.http.get<DatosToDo[]>(this.APIUrl+'api/Lists')
  }

  updateList(val: DatosToDo){
    return this.http.put(this.APIUrl + 'api/Lists/' + val.KeyList , val)
  }

  deleteList(val: DatosToDo){
    return this.http.delete(this.APIUrl + 'api/Lists/' + val.KeyList)
  }
}
