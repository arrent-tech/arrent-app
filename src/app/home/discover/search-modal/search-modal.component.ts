import { Component, ElementRef, AfterContentInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LandAdvertisementService } from '../../../land-advertisement/land-advertisement.service';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss']
})
export class SearchModalComponent implements AfterContentInit {
  recentSearchesList: string[] = [];
  @Input() searchQuery: string;

  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;

  constructor(
    private modalCtrl: ModalController,
    private landAdvertisementService: LandAdvertisementService,
    private router: Router,
  ) {
    this.landAdvertisementService.listRecentSearches()
      .then(list => this.recentSearchesList = list);
  }

  ngAfterContentInit() {
    this.searchInput.nativeElement.focus();
  }

  close() {
    this.modalCtrl.dismiss({ searchQuery: '' });
  }

  search(recentSearch?) {
    const searchQuery = recentSearch || this.searchQuery;
    if (!recentSearch) {
      this.landAdvertisementService.saveQueryIntoRecentSearches(this.searchQuery);
    }
    this.modalCtrl.dismiss({ searchQuery });
  }
}
