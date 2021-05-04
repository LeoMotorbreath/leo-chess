import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './core/board/board.component';
import { MatchResultModalComponent } from './core/match-result-modal/match-result-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    MatchResultModalComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
