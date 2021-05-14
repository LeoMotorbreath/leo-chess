import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Board} from '../../models/board';
import {Subject} from 'rxjs';
const restartGame$ = new Subject();
export function  getRestartGameStream() {
  return restartGame$;
}
@Component({
  selector: 'app-match-result-modal',
  templateUrl: './match-result-modal.component.html',
  styleUrls: ['./match-result-modal.component.css']
})
export class MatchResultModalComponent {
  board = new Board();
  @Input() text: string = '';
  
  getRestartGameStream() {
    return getRestartGameStream();
  }
  closeModal() {
    restartGame$.next();
  }
}
