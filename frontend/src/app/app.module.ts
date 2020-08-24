import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

// Modulos Importados Manualmente
import { FormsModule } from '@angular/forms';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { MainAppComponent } from './components/main-app/main-app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ProtectRoutesAppGuard } from './guards/protect-routes-app.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { SettingsUserComponent } from './components/settings-user/settings-user.component';
import { GeneraVentaComponent } from './components/genera-venta/genera-venta.component';
import { GeneraCompraComponent } from './components/genera-compra/genera-compra.component';
import { ChangeUserPhotographyComponent } from './components/change-user-photography/change-user-photography.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    LandingPageComponent,
    LoginUserComponent,
    RegisterUserComponent,
    MainAppComponent,
    SettingsUserComponent,
    GeneraVentaComponent,
    GeneraCompraComponent,
    ChangeUserPhotographyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,//
    HttpClientModule,//
    ReactiveFormsModule,//
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [ // Los guards se declaran aqui
    ProtectRoutesAppGuard ,
    {
      provide: HTTP_INTERCEPTORS ,
      useClass: TokenInterceptorService ,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
