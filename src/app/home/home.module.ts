import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../auth/auth.guard';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      { path: 'discover', loadChildren: './discover/discover.module#DiscoverPageModule' },
      { path: 'profile', canActivate: [AuthGuard], loadChildren: './discover/discover.module#DiscoverPageModule' }
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AuthModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {
}
