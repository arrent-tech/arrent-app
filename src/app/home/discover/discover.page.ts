import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {SearchModalComponent} from './search-modal/search-modal.component';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async openSearchModal() {
    const modal = await this.modalController.create({
      component: SearchModalComponent
    });

    modal.present();
  }
}
