import type { ApiPokemon, Pokemon, PokemonApiRes, PokemonRes, PokemonsDic } from '../../../types'
import { POKEMON_LIST_LIMIT } from '../../../configs'
import { getFavoritePokemonsDicFromLocalStorage } from '../../localStorage/pokemon'
import type { ApiRes } from '~/clients/http'
import { httpGet } from '~/clients/http'
import { ApiPath } from '~/configs/ApiPath'

function parseApiPokemonToPokemon(apiPokemon: ApiPokemon, favoritePokemonsDic: PokemonsDic): Pokemon {
  const urlSplit = apiPokemon.url.split('/')
  const id = urlSplit[urlSplit.length - 2]

  return {
    name: apiPokemon.name,
    id,
    isFavorite: Boolean(favoritePokemonsDic[id]),
  }
}

export interface GetPokemonsConfig {
  offset?: number
}

export async function getPokemons(
  config: GetPokemonsConfig = { offset: 0 },
): Promise<ApiRes<PokemonRes>> {
  const response = await httpGet<PokemonApiRes>(ApiPath.GET_POKEMONS, {
    params: {
      limit: POKEMON_LIST_LIMIT,
      offset: config.offset,
    },
  })

  if (!response.isOk)
    return { isOk: false }

  const favoritePokemonsRes = getFavoritePokemonsDicFromLocalStorage()
  const favoritePokemonsDic = favoritePokemonsRes.isOk ? favoritePokemonsRes.result : {}
  const results = response.result.results.map(pokemon => parseApiPokemonToPokemon(pokemon, favoritePokemonsDic))

  return {
    isOk: true,
    result: {
      ...response.result,
      results,
    },
  }
}
