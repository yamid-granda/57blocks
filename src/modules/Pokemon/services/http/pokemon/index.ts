import type {
  ApiPokemon,
  FavoritePokemonsDic,
  Pokemon,
  PokemonApiRes,
  PokemonDetail,
  PokemonRes,
} from '../../../types'
import { POKEMON_LIST_LIMIT } from '../../../configs'
import { getFavoritePokemonsByUserIdFromStorage } from '../../localStorage/pokemon'
import type { ApiRes } from '~/clients/http'
import { httpGet } from '~/clients/http'
import { ApiPath } from '~/configs/ApiPath'
import { getPath } from '~/utils/getPath'
import { loggedUser } from '~/composables/loggedUser'

function parseApiPokemonToPokemon(apiPokemon: ApiPokemon, favoritePokemonsDic: FavoritePokemonsDic): Pokemon {
  const urlSplit = apiPokemon.url.split('/')
  const id = urlSplit[urlSplit.length - 2]

  return {
    name: apiPokemon.name,
    id,
    isFavorite: Boolean(favoritePokemonsDic && favoritePokemonsDic[id]),
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

  const favoritePokemonsRes = getFavoritePokemonsByUserIdFromStorage()
  const favoritePokemonsByUserId = favoritePokemonsRes.isOk ? favoritePokemonsRes.result : {}
  const favoritePokemonsDic = favoritePokemonsByUserId[loggedUser.value.id] || []
  const results = response.result.results.map(pokemon => parseApiPokemonToPokemon(pokemon, favoritePokemonsDic))

  return {
    isOk: true,
    result: {
      ...response.result,
      results,
    },
  }
}

export async function getPokemonById(id: string): Promise<ApiRes<PokemonDetail>> {
  const path = getPath(ApiPath.GET_POKEMON_BY_ID, { params: { pokemonId: id } })
  const response = await httpGet<PokemonDetail>(path)

  if (!response.isOk)
    return { isOk: false }

  const favoritePokemonsRes = getFavoritePokemonsByUserIdFromStorage()
  const favoritePokemonsByUserId = favoritePokemonsRes.isOk ? favoritePokemonsRes.result : {}
  const favoritePokemonsDic = favoritePokemonsByUserId[loggedUser.value.id] || []
  const isFavorite = Boolean(favoritePokemonsDic[id])

  return {
    isOk: true,
    result: {
      ...response.result,
      isFavorite,
    },
  }
}
