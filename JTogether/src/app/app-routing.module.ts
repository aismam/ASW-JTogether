import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './navbar/navbar.component';
import {ProfileComponent} from './profile/profile.component';
import {ModifyActivityComponent} from './modify-activity/modify-activity.component';
import {ModifyProfileComponent} from './modify-profile/modify-profile.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {SettingsComponent} from './settings/settings.component';
import {CreateActivityComponent} from './create-activity/create-activity.component';
import {ParticipatedActivityComponent} from './participated-activity/participated-activity.component';
import {ChatComponent} from './chat/chat.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'home', component: HomeComponent},
  { path: 'navbar', component: NavbarComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'modify-activity', component: ModifyActivityComponent},
  { path: 'modify-profile', component: ModifyProfileComponent},
  { path: 'notifications', component: NotificationsComponent},
  { path: 'settings', component: SettingsComponent},
  { path: 'participated-activity', component: ParticipatedActivityComponent},
  { path: 'create-activity', component: CreateActivityComponent},
  { path: 'chat', component: ChatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
