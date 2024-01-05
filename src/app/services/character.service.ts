import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, Signal, WritableSignal, signal } from "@angular/core";
import { md5 } from "js-md5";
import { Character, CharacterResult } from "../models/character.model";

const BASE_URL = 'http://gateway.marvel.com/v1/public/characters';
// ?ts=${ts}&apikey=${this.publicKey}&hash=${hash};

@Injectable({ providedIn: 'root' })
export class CharacterService {

    private _selectedCharacter: WritableSignal<Character|null> = signal(null);
    public get selectedCharacter(): Signal<Character|null> {
        return this._selectedCharacter.asReadonly();
    }

    private _characters: WritableSignal<CharacterResult|null> = signal(null);
    public get characters() : Signal<CharacterResult|null> {
        return this._characters.asReadonly();
    }

    constructor(
        private readonly _httpClient: HttpClient
    ) {}

    search(name: string = '', page = 1) {
        let value: any = {
            offset: (page - 1) * 20,
            limit: 20
        }
        if(name) {
            value = {...value, nameStartsWith: name }
        }
        const params = new HttpParams({fromObject: value})

        this._httpClient.get<CharacterResult>(BASE_URL, {params}).subscribe(data => {
            this._characters.set(data)
        });
    }

    findById(id: number) {
        this._httpClient.get<CharacterResult>(BASE_URL + '/' + id)
            .subscribe(data => {
                const c = data.data.results.find(_ => true)
                if(c) {
                    this._selectedCharacter.set(c)
                }
            })
    }
}