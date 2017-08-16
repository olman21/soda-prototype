import { ReporteComponent } from './components/reporte/reporte.component';
import { MenuComponent } from './components/Menu/menu.component';
import { InventarioComponent } from './components/Inventario/inventario.component';
import { FacturacionComponent } from './components/Facturacion/facturacion.component';
import { AppComponent } from './components/app.component';
import { Route } from "@angular/router";
import { HomeComponent } from "./components/HomeComponent/home.component";
import { LoginComponent } from "./components/LoginComponent/login.component";
export const routes: Route[] = [
  {
    path: '',
    redirectTo: 'facturar',
    pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent,
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'facturar', component: FacturacionComponent,
  },
  {
    path: 'inventario', component: InventarioComponent,
  },
  {
    path: 'menu', component: MenuComponent,
  },
  {
    path: 'reporte', component: ReporteComponent,
  },
  {
    path: 'order/:id', component: FacturacionComponent,
  },
  // All else fails - go home!
  { path: '**', redirectTo:''}
];