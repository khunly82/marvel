import { Component, OnInit, Signal, effect, signal } from '@angular/core';
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

  firstPages: number[] = [];
  lastPages: number[] = [];

  name: string = '';

  currentPage = 1;

  constructor(
    private readonly _characterService: CharacterService
  ) { 
    this.characters = this._characterService.characters;
    effect(() => {
      this.firstPages= [];
      this.lastPages = [];
      const nbPages = Math.ceil((this.characters()?.data.total ?? 0) / 20);
      const pages = [...Array(nbPages).keys()].map(key => key+1);
      this.firstPages = [...pages.slice(this.currentPage - 1, this.currentPage + 2)]
      const lastPage = pages.at(-1);
      if(lastPage && pages.length > 4) {
        this.lastPages = [lastPage]
      }
    })
  }

  ngOnInit(): void {
    this._characterService.search();
  }

  search() {
    this.currentPage = 1;
    this._characterService.search(this.name, this.currentPage);
  }

  changePage(page: number) {
    this.currentPage = page;
    this._characterService.search(this.name, page);
  }

  select(id: number) {
    this._characterService.findById(id);
  }
}
