import { Injectable } from '@angular/core';
import * as Parse from 'parse';
import { environment } from '../../environments/environment';
import { Facebook } from './facebook';
import { UserData, UserRegisterRequest } from './auth.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser$ = new Subject<Parse.User>();
  private facebookApi;
  private currentUser: Parse.User;

  constructor() {
    this.facebookApi = new Facebook();
    this.facebookApi.init({
      appId: environment.facebookAppId,
      cookie: true,
      xfbml: true,
      version: 'v3.2'
    });
  }

  getUser() {
    return Parse.User.current();
  }

  async signUp(userRegistration: UserRegisterRequest) {
    const user = new Parse.User();

    user.set('username', userRegistration.email);
    user.set('password', userRegistration.password);
    user.set('email', userRegistration.email);
    user.set('phone', '55' + userRegistration.phone);
    user.set('name', userRegistration.fullName.split(' ')[0]);

    await user.signUp(null);
    const userData = new UserData();
    userData.set('fullName', userRegistration.fullName);
    userData.set('ownerId', user);
    await userData.save();
    user.set('privateData', userData);
    this.currentUser = user;
    console.log(user);
    this.currentUser$.next(user);
    return user;
  }

  async login({ username, password }) {
    const user = await Parse.User.logIn(username, password);
    this.currentUser = user;
    this.currentUser$.next(user);
    return user;
  }

  async logout() {
    await Parse.User.logOut();
    this.currentUser = null;
    this.currentUser$.next(null);
  }

  async loginWithFacebook() {
    const fbAuth = await this.facebookApi.login({ scope: 'email,public_profile' });
    const facebookAuthData = {
      id: fbAuth.authResponse.userID,
      access_token: fbAuth.authResponse.accessToken,
    };

    // Request the user from parse
    const toLinkUser = new Parse.User();
    const user = await (toLinkUser as any)._linkWith('facebook', { authData: facebookAuthData });

    if (!user.existed()) {
      const userData = await this.facebookApi.api('/me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture)');
      user.set('username', userData.name);
      user.set('email', userData.email);
      await user.save();
    }
    console.log(user);
  }
}
