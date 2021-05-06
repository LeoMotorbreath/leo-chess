import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './core/board/board.component';
import { MatchResultModalComponent } from './core/match-result-modal/match-result-modal.component';
import { GameInitModalComponent } from './core/game-init-modal/game-init-modal.component';
import {RouterModule, Routes} from '@angular/router';


const appRoutes: Routes = [
  { path: 'game-HE', component: BoardComponent},
  { path: 'game-EE', component: BoardComponent},
  { path: 'config', component: GameInitModalComponent},
  { path: '**', redirectTo: 'config'}
];


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    MatchResultModalComponent,
    GameInitModalComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
