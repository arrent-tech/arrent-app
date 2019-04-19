import * as Parse from 'parse';

export interface LandAdvertisementModel {
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
}

export class LandAdvertisement extends Parse.Object {
  constructor() {
    super('LandAdvertisement');
  }
}
