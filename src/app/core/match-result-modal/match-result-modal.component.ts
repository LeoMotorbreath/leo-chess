import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
export class MatchResultModalComponent implements OnInit {
  vm: any = {};
  showModal: boolean;
  modalText: string;
  board = new Board();

  ngOnInit() {
    this.board.gameResultStream.subscribe((data: any) => {
      this.vm.showModal = true;
      this.vm.modalText = data.text;
    });
  }

  closeModal() {
    this.vm = {};
    restartGame$.next();
  }

  openModal(text: string) {
    this.modalText = text;
    this.showModal = true;
  }

}
