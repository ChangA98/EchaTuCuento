import { Injectable } from '@angular/core';
import {Cuento} from '../cuento/cuento';
import {Usuario} from '../usuario/usuario';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';

@Injectable()
export class BdService {

  listaCuentos: AngularFireList<any>;
  usuario: AngularFireList<any>;


  constructor( private fb: AngularFireDatabase) {

  }

  getCuentos() {
    this.listaCuentos = this.fb.list('cuentos');
    return this.listaCuentos;
  }

  getUsuario(id: string) {
    return this.fb.list('usuarios', ref => ref.orderByChild('ident').equalTo(id));
  }

  generarUsuario(user: Object, id: string) {
    this.usuario = this.fb.list('usuarios');
    this.usuario.push({
      ident: user.uid,
      nombre: user.displayName,
      email: user.email,
      cuentos: null
    });
    return this.fb.list('usuarios', ref => ref.orderByChild('ident').equalTo(id))[0];
  }

  insertaCuento(cuento: Cuento, usuario: Usuario) {
    delete usuario.$id;
    const fecha = new Date();
    this.listaCuentos.push({
      cuerpo: cuento.cuerpo,
      fecha: fecha.toDateString(),
      numFeliz: 0,
      numTriste: 0,
      imagenURL: '',
      usuario: usuario
    });
  }

}
