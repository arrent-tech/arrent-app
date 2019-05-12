import { Injectable } from '@angular/core';
import * as Parse from 'parse';
import { Storage } from '@ionic/storage';
import { LandAdvertisementModel, LandAdvertisement } from './land-advertisement.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LandAdvertisementService {
  static STORAGE_RECENT_SEARCHES = 'LandAdvertisement_recentSearches';

  constructor(
    private storage: Storage,
    private authService: AuthService,
  ) {}

  async search(terms: string): Promise<LandAdvertisementModel[]> {
    const query = new Parse.Query<LandAdvertisement>(LandAdvertisement);
    query.fullText('fulltextDescription', terms);
    const landAdvertisements = await query.find();
    console.log(landAdvertisements);
    return landAdvertisements.map(land => ({
      id: land.id,
      ...land.attributes
    }));
  }

  async save(landModel: LandAdvertisementModel): Promise<LandAdvertisementModel> {
    landModel.ownerId = this.authService.getUser().toPointer();
    landModel.location = new Parse.GeoPoint(landModel.location);
    landModel.fulltextDescription =
      landModel.title + ' ' +
      landModel.description + ' ' +
      landModel.readableLocation;

    const land = new LandAdvertisement(landModel);
    await land.save();
    return {
      id: land.id,
      ...land.attributes
    };
  }

  async getFromUser(): Promise<LandAdvertisementModel[]> {
    const user = this.authService.getUser();
    if (user) {
      const query = new Parse.Query<LandAdvertisement>(LandAdvertisement);
      query.equalTo('ownerId', user.toPointer());
      const lands = await query.find();

      return lands.map(land => ({
        id: land.id,
        ...land.attributes
      }));
    }
    return [];
  }

  async get(id) {
    const query = new Parse.Query<LandAdvertisement>(LandAdvertisement);
    const land = await query.get(id);
    return {
      id: land.id,
      ...land.attributes
    };
  }

  async listRecentSearches() {
    return (await this.storage.get(LandAdvertisementService.STORAGE_RECENT_SEARCHES)) || [];
  }

  async saveQueryIntoRecentSearches(query: string) {
    const list = await this.listRecentSearches();
    if (list.indexOf(query) === -1) {
      list.push(query);
    }
    await this.storage.set(LandAdvertisementService.STORAGE_RECENT_SEARCHES, list);
  }

}
