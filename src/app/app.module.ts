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
import { provideFirestore,getFirestore, enableIndexedDbPersistence } from '@angular/fire/firestore';
import { SelectCategoryComponent } from './popovers/select-category/select-category.component';
import { GameConclusionComponent } from './popovers/game-conclusion/game-conclusion.component';
import { ScoreComponent } from './popovers/score/score.component';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { SafesecurityPipe } from './pipes/safesecurity.pipe';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx'

@NgModule({
  declarations: [AppComponent, DimensionpopComponent, SelectPlayerComponent, SelectCategoryComponent, GameConclusionComponent, ScoreComponent, SafesecurityPipe,],
  entryComponents: [DimensionpopComponent, SelectPlayerComponent, GameConclusionComponent, ScoreComponent], 
  imports: [
    BrowserModule, 
    IonicStorageModule.forRoot({
      name:'__mydb',
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    }), 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    FormsModule, provideFirebaseApp(() => initializeApp(environment.firebase)), provideAuth(() => getAuth()), 
    provideFirestore(() => {
      const firestore = getFirestore();
      enableIndexedDbPersistence(firestore);
      return firestore;
    } )],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ScreenOrientation, SafesecurityPipe, PreviewAnyFile],
  bootstrap: [AppComponent],
})
export class AppModule {}
