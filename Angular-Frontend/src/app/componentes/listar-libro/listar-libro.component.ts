import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-listar-libro',
  templateUrl: './listar-libro.component.html',
  styleUrls: ['./listar-libro.component.css']
})
export class ListarLibroComponent implements OnInit {
  Libros: any;

  constructor(private crudService: CrudService) { }

  // Cuando se cargue la página
  ngOnInit(): void {
    this.crudService.ObtenerLibros().subscribe( respuesta => {
      console.log(respuesta);
      this.Libros = respuesta;
    });
  }

  borrarRegistro(iControl: any, isbn: any) {
    console.log(iControl);
    console.log(isbn);
    if(window.confirm('Realmente deseas eliminar el registro ->' + isbn)) {
      this.crudService.BorrarLibro(isbn).subscribe( respuesta => {
        this.Libros.splice(iControl, 1);
      });
    }
  }
}
