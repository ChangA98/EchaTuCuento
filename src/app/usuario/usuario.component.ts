import { Component, OnInit } from '@angular/core';
import {Usuario} from './usuario';
import { Observable } from 'rxjs/Observable';
import {AngularFireList} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {BdService} from '../servicios/bd.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers: [AngularFireAuth]
})
export class UsuarioComponent implements OnInit {

  usuarios: Usuario[];
  usuario: Usuario;
  token: Observable<String>;

  constructor(private BD: BdService) { }

  ngOnInit() {
  }


}
