import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';


import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PagesComponent } from './pages/pages.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './pages/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MessageComponent } from './pages/message/message.component';
import { FriendsComponent } from './pages/friends/friends.component';
import { GroupsComponent } from './pages/groups/groups.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './guard/auth.guard'
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import { EditProfileModalComponent } from './pages/profile/edit-profile-modal/edit-profile-modal.component'

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent,
    HomeComponent,
    HeaderComponent,
    MessageComponent,
    FriendsComponent,
    GroupsComponent,
    ProfileComponent,
    EditProfileModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatGridListModule,
    RouterModule.forRoot([
      {
        path: '',
        component: PagesComponent,
        children: [
          {
            path: '',
            component: HomeComponent,
            outlet: 'child1',
          },
        ],
        canActivate: [AuthGuard],
      },
      {
        path: 'messages',
        component: PagesComponent,
        children: [
          {
            path: '',
            component: MessageComponent,
            outlet: 'child1',
          },
        ],
        canActivate: [AuthGuard],
      },
      {
        path: 'friends',
        component: PagesComponent,
        children: [
          {
            path: '',
            component: FriendsComponent,
            outlet: 'child1',
          },
        ],
        canActivate: [AuthGuard],
      },
      {
        path: 'groups',
        component: PagesComponent,
        children: [
          {
            path: '',
            component: GroupsComponent,
            outlet: 'child1',
          },
        ],
        canActivate: [AuthGuard],
      },
      {
        path: 'profile',
        component: PagesComponent,
        children: [
          {
            path: '',
            component: ProfileComponent,
            outlet: 'child1',
          },
        ],
        canActivate: [AuthGuard],
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ]),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}