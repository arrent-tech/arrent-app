import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SearchModalComponent } from './search-modal/search-modal.component';
import { LandAdvertisementService } from '../../land-advertisement/land-advertisement.service';
import { LandAdvertisementModel } from '../../land-advertisement/land-advertisement.model';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  searchQuery: string;
  searchResults: LandAdvertisementModel[];
  userLandAdvertisements: LandAdvertisementModel[];

  constructor(
    private modalCtrl: ModalController,
    private landService: LandAdvertisementService
  ) {}

  async ngOnInit() {
    this.userLandAdvertisements = await this.landService.getFromUser();
  }

  async openSearchModal() {
    this.searchResults = null;
    const modal = await this.modalCtrl.create({
      component: SearchModalComponent,
      componentProps: {
        searchQuery: this.searchQuery,
      }
    });

    modal.present();
    modal.onDidDismiss()
      .then(({ data }) => {
        if (data.searchQuery) {
          this.search(data.searchQuery);
        }
      });
  }

  async search(query) {
    this.searchQuery = query;
    this.searchResults = await this.landService.search(query);
  }
}
