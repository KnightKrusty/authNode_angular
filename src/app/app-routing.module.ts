import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupComponent } from './signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserSigngupComponent } from './user-signgup/user-signgup.component';

const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent },
  {path: 'signup/:magictoken', component: UserSigngupComponent},
  {path: 'profile', component: UserProfileComponent},
  {path: 'forgotpassword', component: ForgotPasswordComponent},
  {path: 'resetpassword/:resettoken', component: ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
