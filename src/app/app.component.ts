import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Board } from './models/board';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'leo-chess';
  board = new Board();
  vm: any = {};
  @ViewChild('temp') modal;


  constructor(private changeDetector : ChangeDetectorRef) {}

  ngOnInit() {
    this.board.gameResultStream.pipe(
      tap((data: any) => {
        this.vm.showModal = true;
        this.changeDetector.detectChanges();
        this.vm.text = data.text;
      }),
      switchMap(() => this.modal.getRestartGameStream())
    ).subscribe(() => {
      this.vm.showModal = false;
      this.vm.modalText = '';
    })
    
  }
}
