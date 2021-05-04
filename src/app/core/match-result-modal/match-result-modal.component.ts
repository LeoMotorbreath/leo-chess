import { Component, OnInit } from '@angular/core';
import {Board} from '../../models/board';

@Component({
  selector: 'app-match-result-modal',
  templateUrl: './match-result-modal.component.html',
  styleUrls: ['./match-result-modal.component.css']
})
export class MatchResultModalComponent implements OnInit {

  showModal: boolean;
  modalText: string;
  board = new Board();

  ngOnInit() {
    this.board.gameResultStream.subscribe((data: any) => {
      this.showModal = true;
      this.modalText = data.text;
    });
  }

  closeModal() {
    this.showModal = false;
    this.modalText = '';
  }

  openModal(text: string) {
    this.modalText = text;
    this.showModal = true;
  }

}
