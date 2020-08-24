import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { MainAppComponent } from './components/main-app/main-app.component';
import { ProtectRoutesAppGuard } from './guards/protect-routes-app.guard';
import { SettingsUserComponent } from './components/settings-user/settings-user.component';
import { GeneraVentaComponent } from './components/genera-venta/genera-venta.component';
import { GeneraCompraComponent } from './components/genera-compra/genera-compra.component';
import { ChangeUserPhotographyComponent } from './components/change-user-photography/change-user-photography.component';

// Aplicando enrutamiento o angular routing para hace redireccionamiento sin recargar la pagina
const routes: Routes = [
  {
    path: '' ,
    component: LandingPageComponent ,
    //pathMatch: 'full'
  } ,
  {
    path: 'auth/login-user' ,
    component: LoginUserComponent
  } ,
  {
    path: 'auth/register-user' ,
    component: RegisterUserComponent
  } ,
  {
    path: 'main/my-profile' ,
    component: MainAppComponent ,
    canActivate: [ProtectRoutesAppGuard]
  } ,
  {
    path: 'main/settings-user' ,
    component: SettingsUserComponent ,
    canActivate: [ProtectRoutesAppGuard]
  } ,
  {
    path: 'main/make-sale' ,
    component: GeneraVentaComponent ,
    canActivate: [ProtectRoutesAppGuard]
  } ,
  {
    path: 'main/make-purchase' ,
    component: GeneraCompraComponent ,
    canActivate: [ProtectRoutesAppGuard]
  } ,
  {
    path: 'main/change-photography' ,
    component: ChangeUserPhotographyComponent ,
    canActivate: [ProtectRoutesAppGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
