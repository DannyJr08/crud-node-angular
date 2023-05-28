import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudService } from 'src/app/service/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-libro',
  templateUrl: './agregar-libro.component.html',
  styleUrls: ['./agregar-libro.component.css']
})
export class AgregarLibroComponent {
  formularioDeLibros: FormGroup;

  constructor(public formulario:FormBuilder,
    private crudService: CrudService,
    private ruteador: Router) {
    this.formularioDeLibros = this.formulario.group({
      isbn:[''],
      titulo:[''],
      autor:[''],
      anio:[''],
      editorial:['']
    });
  }

  enviarDatos(): any{
    console.log("Presionaste enviar datos");
    console.log(this.formularioDeLibros.value);
    this.crudService.AgregarLibro(this.formularioDeLibros.value).subscribe( respuesta => {
      this.ruteador.navigateByUrl('/listar-libro');
    });
  }

}
