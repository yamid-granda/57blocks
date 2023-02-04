import type { Pokemon, PokemonsDic } from '../../../types'
import type { LocalStorageRes } from '~/clients/localStorage'
import { addInLocalStorage, getFromLocalStorage } from '~/clients/localStorage'
import { LocalStorageKey } from '~/configs/LocalStorageKey'

export function getFavoritePokemonsDicFromLocalStorage(): LocalStorageRes<PokemonsDic> {
  return getFromLocalStorage<PokemonsDic>(LocalStorageKey.FAVORITE_POKEMONS)
}

export function addFavoritePokemonInLocalStorage(pokemon: Pokemon): void {
  const response = getFavoritePokemonsDicFromLocalStorage()

  if (!response.isOk) {
    addInLocalStorage(LocalStorageKey.FAVORITE_POKEMONS, {
      [pokemon.id]: pokemon,
    })

    return
  }

  const favoritePokemonsDic = response.result
  favoritePokemonsDic[pokemon.id] = pokemon
  addInLocalStorage(LocalStorageKey.FAVORITE_POKEMONS, favoritePokemonsDic)
}

export function removeFavoritePokemonFromLocalStorage(pokemon: Pokemon): void {
  const response = getFavoritePokemonsDicFromLocalStorage()

  if (!response.isOk)
    return

  const favoritePokemonsDic = response.result
  delete favoritePokemonsDic[pokemon.id]
  addInLocalStorage(LocalStorageKey.FAVORITE_POKEMONS, favoritePokemonsDic)
}
