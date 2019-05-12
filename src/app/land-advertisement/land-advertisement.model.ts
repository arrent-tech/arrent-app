import * as Parse from 'parse';


export interface LandAdvertisementModel {
  id?: string;
  title?: string;
  description?: string;
  size?: number;
  desiredPayments?: any;
  ranking?: number;
  minimumRentalTime?: number;
  rentalModes?: any;
  cultureRecommendation?: any[];
  landFeatures?: any[];
  isActive?: boolean;
  landDetails?: any;
  ownerId?: any;
  fulltextDescription?: string;
  location?: any;
  readableLocation?: string;
  photos?: string[];
}

export class LandAdvertisement extends Parse.Object {
  constructor(props?: LandAdvertisementModel) {
    super('LandAdvertisement');

    if (props) {
      Object.keys(props).forEach(key => {
        this.set(key, props[key]);
      });
    }
  }
}
