import { Injectable } from '@angular/core';
import * as Parse from 'parse';
import { LandAdvertisementModel, LandAdvertisement } from './land-advertisement.model';

@Injectable({
  providedIn: 'root'
})
export class LandAdvertisementService {

  constructor() {}

  async listSuggestions(terms: string): Promise<LandAdvertisementModel[]> {
    const query = new Parse.Query(LandAdvertisement);
    query.fullText('fulltextDescription', terms);
    const landAdvertisements = await query.find();
    return landAdvertisements.map(land => ({
      title: land.get('title'),
    }));
  }
}
