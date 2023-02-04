export interface Pokemon {
  id: string
  name: string
  isFavorite: boolean
}

export interface ApiPokemon {
  name: string
  url: string
}

export interface PokemonApiRes {
  count: number
  next: string | null
  previous: string | null
  results: ApiPokemon[]
}

export interface PokemonRes {
  count: number
  next: string | null
  previous: string | null
  results: Pokemon[]
}

export type PokemonsDic = Record<string, Pokemon>
