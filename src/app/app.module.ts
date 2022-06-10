import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers, Storage } from '@ionic/storage';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DimensionpopComponent } from './popovers/dimensionpop/dimensionpop.component';
import { SelectPlayerComponent } from './popovers/select-player/select-player.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [AppComponent, DimensionpopComponent, SelectPlayerComponent],
  entryComponents: [DimensionpopComponent, SelectPlayerComponent],
  imports: [
    BrowserModule, 
    IonicStorageModule.forRoot({
      name:'__mydb',
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    }), 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    FormsModule, provideFirebaseApp(() => initializeApp(environment.firebase)), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
