import {Cuento} from './cuento';
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {BdService} from '../servicios/bd.service';
import {Usuario} from '../usuario/usuario';
import {UsuarioComponent} from '../usuario/usuario.component';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Upload} from '../servicios/upload';
import {UploadService} from '../servicios/upload.service';

@Component({
  selector: 'app-cuento',
  templateUrl: './cuento.component.html',
  styleUrls: ['./cuento.component.css'],
  providers: [BdService, AngularFireAuth]
})
export class CuentoComponent implements OnInit {

  cuentos: Cuento[];
  usuarios: Usuario[];
  enviar: Cuento;
  usuario: Usuario;

  selectedFiles: FileList;
  currentUpload: Upload;

  auth: UsuarioComponent;

  constructor(private BD: BdService, private afAuth: AngularFireAuth, private arriba: UploadService) { }

  anadirCuento(form: NgForm) {
    if (form.value.cuerpo != null) {
      if (form.value.cuerpo.length > 0 && form.value.cuerpo.length < 1000) {
        this.usuario = this.BD.insertaCuento(form.value, this.usuario, this.currentUpload);
      }
      else {
        console.log('Número de caracteres inválido');
      }
      this.enviar = new Cuento();
    }
  }

  detectarArchivo(event) {
    this.selectedFiles = event.target.files;
    this.subir();
  }

  subir() {
    const file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.arriba.pushUpload(this.currentUpload);
  }

  patata() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    let x = this.BD.getUsuario(this.afAuth.auth.currentUser.uid);
    x.snapshotChanges().subscribe(item => {
      this.usuarios = [];
      item.forEach(element => {
        let y = element.payload.toJSON();
        y['$id'] = element.key;
        this.usuarios.push(y as Usuario);
      });
      if (this.usuarios[0] == null) {
        this.usuario = this.BD.generarUsuario(this.afAuth.auth.currentUser, this.afAuth.auth.currentUser.uid);
      }
      else {
        this.usuario = this.usuarios[0];
      }
    });
  }

  sumarFeliz(cuento: Cuento) {
    cuento.numFeliz = cuento.numFeliz++;
    this.BD.sumarFeliz(cuento);
  }

  sumarTriste(cuento: Cuento) {
    cuento.numTriste = cuento.numTriste++;
    this.BD.sumarTriste(cuento);
  }

  ngOnInit() {
    this.auth = new UsuarioComponent(this.BD);
    this.enviar = new Cuento();
    let x = this.BD.getCuentos();
    x.snapshotChanges().subscribe(item =>{
      this.cuentos = [];
      item.forEach(element => {
        let y = element.payload.toJSON();
        y['$id'] = element.key;
        this.cuentos.push(y as Cuento);
      });
    });
  }

}
