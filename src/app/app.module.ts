import { ReporteComponent } from './components/reporte/reporte.component';
import { MenuComponent } from './components/Menu/menu.component';
import { FacturacionComponent } from './components/Facturacion/facturacion.component';
import { InventarioComponent } from './components/Inventario/inventario.component';
import { routes } from './routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterializeModule } from 'angular2-materialize';

import { AppComponent } from './components/app.component';
import { HomeComponent } from "./components/HomeComponent/home.component";
import { AngularFireModule } from "angularfire2";
import { LoginComponent } from "./components/LoginComponent/login.component";
import {ToastyModule} from 'ng2-toasty';
import { ErrorToastService } from "./services/error-toast.service";
import { MomentModule } from 'angular2-moment';

export const firebaseConfig = {
    apiKey: "AIzaSyDLCtYKosAAPax_9JckWG1PIScTnvGHwKM",
    authDomain: "soda-4cece.firebaseapp.com",
    databaseURL: "https://soda-4cece.firebaseio.com",
    projectId: "soda-4cece",
    storageBucket: "",
    messagingSenderId: "72534379582"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    InventarioComponent,
    FacturacionComponent,
    MenuComponent,
    ReporteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    MaterializeModule,
    AngularFireModule.initializeApp(firebaseConfig),
    ToastyModule.forRoot(),
    MomentModule
  ],
  providers: [ErrorToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
