import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {
  user: any;
  userSubscription: Subscription;

  constructor(private auth: AuthService) {
    this.userSubscription = this.auth.currentUser$.subscribe(user => this.user = user);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async logout() {
    await this.auth.logout();
  }
}
