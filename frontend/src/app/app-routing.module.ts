import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

// Aplicando enrutamiento o angular routing para hace redireccionamiento sin recargar la pagina
const routes: Routes = [
  {
    path: '' ,
    component: LandingPageComponent ,
    //pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
