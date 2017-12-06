import { Injectable } from '@angular/core';
import {Cuento} from '../cuento/cuento';
import {Usuario} from '../usuario/usuario';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Upload} from './upload';


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

  generarUsuario(user, id: string) {
    this.usuario = this.fb.list('usuarios');
    this.usuario.push({
      ident: user.uid,
      nombre: user.displayName,
      email: user.email,
      cuentos: ['null']
    });
    return this.fb.list('usuarios', ref => ref.orderByChild('ident').equalTo(id))[0];
  }

  insertaCuento(cuento: Cuento, usuario: Usuario, arriba: Upload) {
    const w = usuario.$id;
    delete usuario.$id;
    const fecha = new Date();
    let z = this.listaCuentos.push({
      cuerpo: cuento.cuerpo,
      fecha: fecha.toDateString(),
      numFeliz: 0,
      numTriste: 0,
      imagenURL: arriba.url,
      usuario: usuario
    });
    if ( usuario.cuentos[0] === 'null' ) {
      usuario.cuentos[0] = z.key;
    }
    else {
      let contador = 0;
      for ( let i = 0 ; usuario.cuentos[i] !== undefined ; i++ ) {
        contador++;
      }
      usuario.cuentos[contador] = z.key;
    }
    this.fb.list('usuarios').update(w, {cuentos: usuario.cuentos});
    return usuario;
  }

  sumarFeliz(cuento) {
    this.fb.list('cuentos').update(cuento.$id, {numFeliz: (cuento.numFeliz + 1)});
  }

  sumarTriste(cuento) {
    this.fb.list('cuentos').set(cuento.$id, {
      cuerpo: cuento.cuerpo,
      numTriste: (cuento.numTriste + 1),
      fecha: cuento.fecha,
      imagenURL: cuento.imagenURL,
      usuario: cuento.usuario,
      numFeliz: cuento.numFeliz
    });
  }

}
