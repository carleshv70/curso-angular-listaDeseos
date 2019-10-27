import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[] = [];

  constructor() {
    console.log("Servicio inicializado.");

    this.cargarStorage();

    // const lista1 = new Lista("Lista de la compra");
    // const lista2 = new Lista("Tareas del hogar");

    // lista2.terminada = false;
    // lista1.terminada = false;

    // this.listas.push(lista1, lista2);
    // console.log(this.listas);
  }

  getListas(terminada: boolean): Lista[] {
    return this.listas
      .filter((value, index) => {
        if (value.terminada == terminada) {
          return value;
        }
      });
  }

  crearLista(titulo: string): number {
    const nuevaLista = new Lista(titulo);
    this.listas.push(nuevaLista);
    this.guardarStorage();
    return nuevaLista.id;
  }

  obtenerLista(listaId:string | number){

    listaId = Number(listaId);

    return this.listas.find( (listaData) => listaData.id === listaId);



  }


  guardarStorage() {
    localStorage.setItem('data', JSON.stringify(this.listas));
  }

  cargarStorage() {
    if (localStorage.getItem('data') != null) {
      this.listas = JSON.parse(localStorage.getItem('data'));
    } else {
      this.listas = [];
    }

  }
}
