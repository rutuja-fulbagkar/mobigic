import { RegisterComponent } from './components/authentication/register/register.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './components/dashboard/landingpage/landingpage.component';
import { loginGuard } from './login.guard';

const routes: Routes = [
  {path: 'authentication/login', component: LoginComponent},
{path: 'authentication/register', component: RegisterComponent},
{path: '', component: LandingpageComponent , canActivate:[loginGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
