import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';
import { LogincomponentComponent } from './components/logincomponent/logincomponent.component';
import { ListaFacturasComponent } from './components/lista-facturas/lista-facturas.component';
import { UserGuard } from './guards/user.guard'
import { ForgottenComponent } from './forgotten/forgotten.component';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/Home',
    pathMatch: 'full'
  },
  {
    path: 'Home',
    component: LogincomponentComponent
  },
  {
    path: 'listado',
    component:ListaFacturasComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'forgotten',
    component: ForgottenComponent,
    data: { user: 'userid' }
  }
];

export const appRoutingProviders: any[] = [
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
