import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import {environment} from '../environments/environment';
import {BdService} from './servicios/bd.service';
import { UsuarioComponent } from './usuario/usuario.component';
import { CuentoComponent } from './cuento/cuento.component';
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  {path: '', component: CuentoComponent},
  {path: 'usuario', component: UsuarioComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    CuentoComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    BdService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
