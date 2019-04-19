import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [],
  providers: [ AuthGuard, AuthService ],
  imports: [
    CommonModule
  ]
})
export class AuthModule {
}
