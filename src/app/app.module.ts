import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DimensionpopComponent } from './popovers/dimensionpop/dimensionpop.component';
import { SelectPlayerComponent } from './popovers/select-player/select-player.component';

@NgModule({
  declarations: [AppComponent, DimensionpopComponent, SelectPlayerComponent],
  entryComponents: [DimensionpopComponent, SelectPlayerComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
