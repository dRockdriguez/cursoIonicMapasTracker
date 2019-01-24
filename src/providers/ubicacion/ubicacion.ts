import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UsuarioProvider } from '../usuario/usuario';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class UbicacionProvider {

  taxista: AngularFirestoreDocument<any>;
  watch : Subscription;
  constructor(
    public geo: Geolocation,
    public usuarioS: UsuarioProvider,
    public aFS: AngularFirestore
  ) {
  }

  inicializarTax(){
    this.taxista = this.aFS.doc(`/usuarios/${this.usuarioS.clave}`)
  }

  iniciarGeoLocalizacion() {
    this.geo.getCurrentPosition().then((resp) => {
      this.taxista.update({
        lat: resp.coords.latitude,
        lng: resp.coords.longitude,
        clave: this.usuarioS.clave
      });
      this.watch = this.geo.watchPosition().subscribe((data) => {
        this.taxista.update({
          lat: data.coords.latitude,
          lng: data.coords.longitude,
          clave: this.usuarioS.clave
        });
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  detenerWatcher(){
    try {
      this.usuarioS.borrarUsuario();
      this.watch.unsubscribe();
    } catch(e){
      console.error('eeeeeeeeee: ' + e)
    }
  }
}
