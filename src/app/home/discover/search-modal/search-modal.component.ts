import { Component, ElementRef, AfterContentInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LandAdvertisementService } from '../../../land-advertisement/land-advertisement.service';
import { LandAdvertisementModel } from '../../../land-advertisement/land-advertisement.model';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss']
})
export class SearchModalComponent implements AfterContentInit {
  landAdvertisementList: LandAdvertisementModel[];
  searchTerm: string;

  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;

  constructor(
    private modalCtrl: ModalController,
    private landAdvertisementService: LandAdvertisementService
  ) {}

  ngAfterContentInit() {
    this.searchInput.nativeElement.focus();
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async listSuggestions() {
    this.searchTerm = this.searchInput.nativeElement.value;
    if (!this.searchInput.nativeElement.value) {
      this.landAdvertisementList = null;
    } else {
      this.landAdvertisementList = await this.landAdvertisementService.listSuggestions(
        this.searchInput.nativeElement.value
      );
    }
  }

  async search() {

  }
}
