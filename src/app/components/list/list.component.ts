import { Component, OnInit, Signal } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { CharacterResult } from '../../models/character.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  characters!: Signal<CharacterResult|null>

  name: string = '';

  constructor(
    private readonly _characterService: CharacterService
  ) { }

  ngOnInit(): void {
    this._characterService.search();
    this.characters = this._characterService.characters;
  }

  search() {

    console.log('test')
    this._characterService.search(this.name);
  }
}
