import { Component, ElementRef, AfterContentInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss']
})
export class SearchModalComponent implements AfterContentInit {

  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;

  constructor(private modalCtrl: ModalController) {}

  ngAfterContentInit() {
    this.searchInput.nativeElement.focus();
  }

  close() {
    this.modalCtrl.dismiss();
  }

}
