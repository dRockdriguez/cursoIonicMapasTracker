import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: any = {};

  constructor(
    public navCtrl: NavController,
    public ubicacion: UbicacionProvider
  ) {
    ubicacion.iniciarGeoLocalizacion();
    ubicacion.inicializarTax();
    this.ubicacion.taxista.valueChanges().subscribe((data) => {
      this.user = data;
    });
  }

  salir(){
    this.ubicacion.detenerWatcher();
    this.navCtrl.setRoot('LoginPage');
  }
}
