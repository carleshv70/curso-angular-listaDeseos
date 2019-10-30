import { Component } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  lista: Lista[] = [];

  constructor(
    public deseosService: DeseosService,
    private router: Router,
    private alertCtrl: AlertController
  ) {
    this.lista = this.getListas();
    console.log("this.lista");
    console.log(this.lista);
  }

  getListas(){
    return this.deseosService.getListas(false);
  }

  async agregarLista(){
    
    const alert = await this.alertCtrl.create({
      header: 'Nueva lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar')
          }
        },
        {
          text:'Crear',
          handler: ( data ) => {
            if(data.titulo.length === 0){
              return;
            }
            console.log(data);

            // crear la lista
            const listaId:number = this.deseosService.crearLista(data.titulo);

            this.router.navigate(['/tabs/tab1/agregar', listaId]);

          }
        }
      ]
    });

    alert.present();


  }


  
}
