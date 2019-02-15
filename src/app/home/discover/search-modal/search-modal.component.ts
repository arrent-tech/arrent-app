import {Component, ElementRef, AfterContentInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss']
})
export class SearchModalComponent implements AfterContentInit {

  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;

  constructor() {}

  ngAfterContentInit() {
    this.searchInput.nativeElement.focus();
  }

}
