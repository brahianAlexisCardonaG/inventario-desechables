import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentaComponent } from './modules/venta/venta.component';
import { ProductoComponent } from './modules/producto/producto.component';
import { LogginComponent } from './modules/loggin/loggin.component';
import { AuthGuard } from './core/guards/auth-guard';
import { PageNotFoundComponent } from './modules/shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: LogginComponent
  },
  {
    canActivate:[AuthGuard],
    path: 'gestionar-inventario',
    component: ProductoComponent
  },
  {
    canActivate:[AuthGuard],
    path: 'listado-ventas',
    component: VentaComponent
  },
  {
    canActivate:[AuthGuard],
    path: 'realizar-ventas',
    component: ProductoComponent
  },
  {
    canActivate:[AuthGuard],
    path: 'page-not-found',
    component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
