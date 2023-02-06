<script lang="ts" setup>
import { getFavoritePokemonsByUserIdFromStorage } from '../../services/localStorage/pokemon'
import type { FavoritePokemonsDic, Pokemon } from '../../types'
import PokemonList from '../PokemonList/PokemonList.vue'
import { loggedUser } from '~/composables/loggedUser'

const { t } = useI18n()

const favoritePokemonsByUserId = ref<Record<string, FavoritePokemonsDic>>({})

const pokemons = computed<Pokemon[]>(() => {
  const hasFavoritePokemonsByUserId = Boolean(Object.keys(favoritePokemonsByUserId.value).length)

  if (!hasFavoritePokemonsByUserId)
    return []

  const pokemonsDic = favoritePokemonsByUserId.value[loggedUser.value.id] || {}
  return Object.values(pokemonsDic).map(pokemon => ({ ...pokemon, isFavorite: true }))
})

const hasFavorites = computed(() => Boolean(pokemons.value.length))

function onRemoveFavorite(): void {
  getFavoritesByUserId()
}

function onCreate(): void {
  getFavoritesByUserId()
}

onCreate()

function getFavoritesByUserId(): void {
  const response = getFavoritePokemonsByUserIdFromStorage()

  if (!response.isOk)
    return

  favoritePokemonsByUserId.value = response.result
}
</script>

<template>
  <div
    class="ss-favorite-pokemons"
    test-id="favorite-pokemons"
  >
    <template v-if="hasFavorites">
      <PokemonList
        :pokemons="pokemons"
        @click-favorite="onRemoveFavorite"
      />
    </template>

    <template v-else>
      <Alert state="warning">
        {{ t('$components.FavoritePokemonsViewer.notFoundError') }}
      </Alert>
    </template>
  </div>
</template>
