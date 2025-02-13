import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';

@Component({
  selector: 'app-game',
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'] 
})
export class GameComponent implements OnInit {
  pickCardAnimation: boolean = false;
  currentCard: string = '';
  game!: Game;

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
    this.game.playedCards.push(this.currentCard);
    this.pickCardAnimation = true;

    setTimeout(() => {
      this.pickCardAnimation = false;
    },1500)
  }
}
}
