import { Component, Signal } from '@angular/core';
import { Character } from '../../models/character.model';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  character!: Signal<Character|null>

  constructor(private _caracterService: CharacterService) {
    this.character = this._caracterService.selectedCharacter;
  }
}
