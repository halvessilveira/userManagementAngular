import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { LoginComponent } from './login/login.component';
import { UserFormComponent } from './user-form/user-form.component';

import { UserService } from '../services/user.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { StorageService } from 'src/services/storage.service';
import { AuthInterceptorProvider } from 'src/interceptors/auth-interseptor';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserListComponent,
    UserFormComponent
  ],
  providers: [
    UserService,
    AuthenticationService,
    StorageService,
    AuthInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
