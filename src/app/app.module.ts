import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { MxgraphComponent } from './components/mxgraph/mxgraph.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraphDragItemComponent } from './components/graph-drag-item/graph-drag-item.component';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { GraphEffects } from './store/graph.effects';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ItemListComponent,
    MxgraphComponent,
    GraphDragItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument({
      name: 'MxGraph Store DevTools',
      logOnly: environment.production,
    }) : [],
    EffectsModule.forRoot([GraphEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
