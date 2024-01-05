import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, Signal, WritableSignal, signal } from "@angular/core";
import { md5 } from "js-md5";
import { Character, CharacterResult } from "../models/character.model";

const BASE_URL = 'http://gateway.marvel.com/v1/public/characters';
const PUB_KEY = '0f4aa8fd7d4d60a32482f19ad1351e53';
const PRI_KEY = '959c3ed411fc79e5b41b512aa31d5bdbc0da1025';
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
        const ts = new Date().getTime() / 1000;

        let value: any = {
            ts: ts,
            apikey: PUB_KEY,
            hash: this.hashKey(ts),
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
        const ts = new Date().getTime() / 1000;

        let value: any = {
            ts: ts,
            apikey: PUB_KEY,
            hash: this.hashKey(ts),
        }

        const params = new HttpParams({
            fromObject: value
        })

        this._httpClient.get<CharacterResult>(BASE_URL + '/' + id, { params })
            .subscribe(data => {
                const c = data.data.results.find(_ => true)
                if(c) {
                    this._selectedCharacter.set(c)
                }
            })
    }

    private hashKey(ts: number) {
        return md5(`${ts}${PRI_KEY}${PUB_KEY}`);
    }
}