import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
        children: [
          {
            path: 'discover',
            loadChildren: './discover/discover.module#DiscoverPageModule'
          }
        ]
      },
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
