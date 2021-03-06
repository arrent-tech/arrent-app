import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DiscoverPage } from './discover.page';
import { SearchModalComponent } from './search-modal/search-modal.component';
import { LandAdvertisementModule } from '../../land-advertisement/land-advertisement.module';

const routes: Routes = [
  {
    path: '',
    component: DiscoverPage,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    LandAdvertisementModule,
  ],
  declarations: [
    DiscoverPage,
    SearchModalComponent
  ],
  entryComponents: [ SearchModalComponent ]
})
export class DiscoverPageModule {}
