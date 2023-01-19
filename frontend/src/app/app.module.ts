import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'home',
        component: PagesComponent,
        children: [
          {
            path: '',
            component: HomeComponent,
            outlet: 'child1',
          },
        ],
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
      },
      {
        path: '',
        component: LoginComponent,
      },
    ]),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
