export interface Character {
    id: number;
    name: string;
    description: string;
    thumbnail: { path: string, extension: string }
}

export interface CharacterResult {
    data: { results: Character[], total: number }
}