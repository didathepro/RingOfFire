import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-game-info',
  imports: [MatCardModule, MatInputModule],
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.scss'
})
export class GameInfoComponent implements OnInit, OnChanges {
  
  cardAction = [
    { title: "Waterfall", description: "Waterfall – Everyone starts drinking at the same time. You can't stop until the person before you does." },
    { title: "You", description: "You – Choose someone to drink." },
    { title: "Me", description: "Me – You have to drink." },
    { title: "Category", description: "Floor – Last person to touch the floor drinks." },
    { title: "Bust a jive", description: "Guys – All men drink." },
    { title: "Chicks", description: "Chicks – All women drink." },
    { title: "Heaven", description: "Heaven – Last person to raise their hand drinks." },
    { title: "Mate", description: "Mate – Pick a drinking buddy. Whenever you drink, they drink too." },
    { title: "Thumbmaster", description: "Rhyme – Say a word, and go around the circle rhyming. First person to fail drinks." },
    { title: "Men", description: "Categories – Pick a category (e.g., types of beer), and go around naming things from that category. First to fail drinks." },
    { title: "Quizmaster", description: "Make a Rule – Create a rule everyone must follow. Breaking it results in a drink." },
    { title: "Never have i ever", description: "Question Master – Until another Queen is drawn, if you ask a question and someone answers, they drink." },
    { title: "Rule", description: "Pour – Pour some of your drink into the King's Cup. The last King drawn drinks the entire cup." }
  ];
  
  title = '';
  description = '';
  @Input() card!: string;
  
  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.card) {
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber-1].title;
      this.description = this.cardAction[cardNumber-1].description;
    }
  }
}
