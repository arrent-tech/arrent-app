import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { LoadingController } from '@ionic/angular';
import * as Parse from 'parse';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { LandAdvertisementModel } from '../land-advertisement.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { LandAdvertisementService } from '../land-advertisement.service';
import { GeolocationService } from '../../geolocation/geolocation.service';
import { GeolocationModel } from '../../geolocation/geolocation.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit, OnDestroy {
  searchLocation$ = new Subject<string>();
  searchLocationSubscription: Subscription;
  geolocationResults: GeolocationModel[];

  landDetails: LandAdvertisementModel = {};
  loadedPhotos = [];
  map: any;

  @ViewChild('landForm') landForm: NgForm;
  constructor(
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private landService: LandAdvertisementService,
    private geolocationService: GeolocationService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      this.restore(params.id);
    });
  }

  ngOnInit() {
    this.searchLocationSubscription = this.searchLocation$
      .pipe(debounceTime(400))
      .subscribe(query => this.searchLocation(query));
  }

  ngOnDestroy(): void {
    this.searchLocationSubscription.unsubscribe();
  }

  async restore(id) {
    this.landDetails = await this.landService.get(id);
    this.loadedPhotos = this.landDetails.photos.map(url => ({
      url: url,
      saved: true,
    }));
  }

  async loadPhoto(ev) {
    if (ev.target.files[0]) {
      const file: File = ev.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      const fileData = await getFileData(file);
      this.loadedPhotos.push({
        extension: file.type.split('/')[1],
        data: fileData,
        url: this.sanitizer.bypassSecurityTrustUrl(fileUrl),
        saved: false,
      });
    }
  }

  async publish() {
    const loading = await this.loadingCtrl.create({ message: 'Publicando' });
    loading.present();
    try {
      // @TODO: Move it to a FileCDNService.
      const photosUrl = await Promise.all(this.loadedPhotos.map(async photo => {
        if (!photo.saved) {
          const file = new Parse.File(
            this.authService.getUser().id + '__' + Date.now() + '.' + photo.extension,
            { base64: photo.data.split(',')[1] }
          );
          await file.save();
          return file.url();
        }
        return photo.url;
      }));
      this.landDetails.photos = photosUrl;
      const land = await this.landService.save(this.landDetails);
      this.router.navigateByUrl('/land/' + land.id);
    } catch (e) {
      console.error(e);
    } finally {
      loading.dismiss();
    }
  }

  handleInputSearchLocation(ev) {
    this.searchLocation$.next(ev.target.value);
  }

  async searchLocation(query) {
    this.geolocationResults = await this.geolocationService.searchGeocode(query).toPromise();
  }

  selectGeolocation(geolocation) {
   this.geolocationResults = null;
   this.landDetails.readableLocation = geolocation.display_name;
   this.landDetails.location = {
     latitude: parseFloat(geolocation.lat),
     longitude: parseFloat(geolocation.lon)
   };
  }
}

function getFileData(file): Promise<string | ArrayBuffer> {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise(res => reader.onload = () => res(reader.result));
}
