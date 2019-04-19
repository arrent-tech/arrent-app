import { Component, OnInit } from '@angular/core';
import { IonSpinner, LoadingController, NavController, ToastController } from '@ionic/angular';
import { fadeInOnEnterAnimation, fadeInUpOnEnterAnimation } from 'angular-animations';

import { AuthService } from '../auth/auth.service';
import { UserRegisterRequest } from '../auth/auth.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  animations: [
    fadeInOnEnterAnimation({ duration: 350, delay: 100 }),
    fadeInUpOnEnterAnimation({ duration: 350, translate: '10%' }),
  ]
})
export class LoginPage implements OnInit {
  showSignupForm: boolean;
  user: UserRegisterRequest = {
    fullName: null,
    email: null,
    password: null,
  };

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
  ) {}

  ngOnInit() {
  }

  loginWithFacebook() {
    this.authService.loginWithFacebook();
  }

  toggleSignupForm() {
    this.showSignupForm = !this.showSignupForm;
  }

  close() {
    this.navCtrl.back();
  }

  async signUp() {
    const loading = await this.loadingCtrl.create({
      message: 'Cadastrando'
    });
    await loading.present();
    try {
      await this.authService.signUp(this.user);
      this.navCtrl.back();
    } catch (err) {
      console.error(err);
    } finally {
      await loading.dismiss();
    }
  }

}
