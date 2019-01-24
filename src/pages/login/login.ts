import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides, AlertController, LoadingController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild(Slides) slides: Slides;

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private usuarioS: UsuarioProvider
  ) {
  }

  ionViewDidLoad(){
    this.slides.paginationType = 'progress';
    this.slides.lockSwipes(true);
    this.slides.freeMode = false;
  }

  mostrarInput() {
    this.alertCtrl.create({
      title: 'Ingrese usuario',
      inputs: [{
        name: 'username',
        placeholder: 'Nombre de usuario'
      }],
      buttons: [{
        text: 'Cancelar',
        role: 'Cancel'
      },
      {
        text: 'Aceptar',
        handler: data => {
          console.log(data);
          this.verificarUsuario(data.username)
        }
      }]
    }).present();
  }

  verificarUsuario(clave: string){
    let loading = this.loadingCtrl.create({
      content: 'Comprobando...'
    });

    this.usuarioS.verificaUsuario(clave).then((existe) => {
      loading.dismiss();
      if (existe){
        this.slides.lockSwipes(false);
        this.slides.freeMode = true;
        this.slides.slideNext();
        this.slides.lockSwipes(true);
        this.slides.freeMode = false;
      } else {
        this.alertCtrl.create({
          title: 'Usuario incorrecto',
          subTitle: 'Hable con el administrador o pruebe de nuevo',
          buttons: ['Aceptar']
        }).present();
      }
    });
    loading.present();
  }

  ingresar() {
    this.navCtrl.setRoot(HomePage);
  }
}
