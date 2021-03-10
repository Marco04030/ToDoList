import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatListOption } from '@angular/material/list';
import { ModifyListComponentComponent } from './components/modify-list-component/modify-list-component.component';
import { ServicioListaService } from './components/shared/servicio-lista.service';
import { DatosToDo } from './components/shared/ToDoList.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})

export class AppComponent implements OnInit {
  listas: DatosToDo[];
  public form: FormGroup;
  

  constructor(private fb: FormBuilder, private service: ServicioListaService, private dialog: MatDialog){}

  ngOnInit(): void {
    this.service.getList().subscribe(data =>(this.listas = data));
    this.form = this.fb.group({
    Titulo: [''],
    Descripcion: [''],
    FechaCreacion: [''],
    Terminado: [''],
    }) 
  }

  agregarLista(){
    const forma: DatosToDo = this.form.value;
    console.log(forma);

    this.service.addList(forma).subscribe((res) => {});
    this.service.getList().subscribe(data =>(this.listas = data));
  }

  selectionChange(option: MatListOption){
    
    const data = option.value;
    data.Terminado = option.selected;
  
    this.service.updateList(data).subscribe((res) => {});
  }

  onEdit(evento, lista){
    event.stopPropagation();
    this.dialog.open(ModifyListComponentComponent,{
      data: lista
    });
    
  }

  onDelete(evento, lista){
    event.stopPropagation();
    const data = lista;
    this.service.deleteList(data).subscribe((res) => {});
  }


  
}




