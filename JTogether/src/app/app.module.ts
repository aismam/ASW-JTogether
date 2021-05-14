import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { CreateActivityComponent } from './create-activity/create-activity.component';
import { PartecipatedActivityComponent } from './participated-activity/partecipated-activity.component';
import { SettingsComponent } from './settings/settings.component';
import { ModifyActivityComponent } from './modify-activity/modify-activity.component';
import { ModifyProfileComponent } from './modify-profile/modify-profile.component';
import { EditTextComponent } from './edit-text/edit-text.component';
import { LargeButtonComponent } from './large-button/large-button.component';
import { CardListElementComponent } from './card-list-element/card-list-element.component';
import { CardListComponent } from './card-list/card-list.component';
import { HomeCardComponent } from './home-card/home-card.component';
import { NavigationButtonsComponent } from './navigation-buttons/navigation-buttons.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    NavbarComponent,
    ProfileComponent,
    NotificationsComponent,
    CreateActivityComponent,
    PartecipatedActivityComponent,
    SettingsComponent,
    ModifyActivityComponent,
    ModifyProfileComponent,
    EditTextComponent,
    LargeButtonComponent,
    CardListElementComponent,
    CardListComponent,
    HomeCardComponent,
    NavigationButtonsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
