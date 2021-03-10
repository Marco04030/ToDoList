import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ServicioListaService } from '../shared/servicio-lista.service';
import { DatosToDo } from '../../components/shared/ToDoList.model';



@Component({
  selector: 'app-modify-list-component',
  templateUrl: './modify-list-component.component.html',
  styleUrls: ['./modify-list-component.component.css']
})
export class ModifyListComponentComponent implements OnInit {

public form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,  private fb: FormBuilder, private service: ServicioListaService,) { }
 
  ngOnInit(): void {
    this.form = this.fb.group({
      KeyList: [this.data.KeyList],
      Titulo: [this.data.Titulo],
      Descripcion: [this.data.Descripcion],
      FechaCreacion: [this.data.FechaCreacion],
      Terminado: [this.data.Terminado],
      })      
  }

  guardar(){
    this.service.updateList(this.form.value as DatosToDo).subscribe((res) => {});
  }

}
