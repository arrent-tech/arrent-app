import { Component, OnInit } from '@angular/core';
import { LandAdvertisementService } from '../land-advertisement.service';
import { ActivatedRoute } from '@angular/router';
import * as Parse from 'parse';
import { LandAdvertisementModel } from '../land-advertisement.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  landDetails: LandAdvertisementModel = {};
  owner: Parse.User;

  constructor(
    private landService: LandAdvertisementService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.restore(params.id);
    });
  }

  ngOnInit() {
  }

  async restore(id) {
    this.landDetails = await this.landService.get(id);
    console.log(this.landDetails);
    this.owner = this.landDetails.ownerId;
  }

  getClickToChatURL() {
    if (this.owner) {
      const message = `Olá ${this.owner.attributes.name}, vi seu anúncio "${this.landDetails.title}" na Arrent e gostaria de saber mais!`;
      return `https://wa.me/${this.owner.attributes.phone}/?text=${message}`;
    }
    return '';
  }
}
