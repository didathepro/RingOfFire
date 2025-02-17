import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import {ChangeDetectionStrategy, inject, model, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { GameInfoComponent } from '../game-info/game-info.component';

@Component({
  selector: 'app-game',
  imports: [CommonModule,PlayerComponent,MatIconModule,MatButtonModule,MatDialogModule,FormsModule,GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'] 
})

export class GameComponent implements OnInit {
  pickCardAnimation: boolean = false;
  currentCard: string = '';
  game!: Game;
  public dialog = inject(MatDialog);

  ngOnInit(): void {
    this.newGame();  
  }

  newGame(): void {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard(): void {
    if(!this.pickCardAnimation){
    this.currentCard = this.game.stack.pop() as string;
    
    this.pickCardAnimation = true;
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    
    setTimeout(() => {
      this.game.playedCards.push(this.currentCard);
      this.pickCardAnimation = false;
    },1000)
  }
}

openDialog(): void {
  const dialogRef = this.dialog.open(DialogAddPlayerComponent);

  dialogRef.afterClosed().subscribe((name:string) => {
    if(name && name.length>0){
    this.game.players.push(name);
    }
  });
}
}

export interface DialogData {
  animal: string;
  name: string;
}

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'dialog-overview-example',
  templateUrl: 'dialog-overview-example.html',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule,MatDialogModule,FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogOverviewExample {
  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);


}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class DialogOverviewExampleDialog {
  readonly dialogRef = inject(MatDialogRef<DialogOverviewExampleDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
