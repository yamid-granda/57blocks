<script lang="ts" setup>
import { POKEMON_LIST_LIMIT } from '../../configs'
import { getPokemons } from '../../services/http/pokemon'
import type { Pokemon } from '../../types'
import PokemonList from '../PokemonList/PokemonList.vue'

const pokemons = ref<Pokemon[]>([])
const page = ref<number>(1)
const totalPokemons = ref<number>(0)

const paginationLength = computed(() => Math.ceil(totalPokemons.value / POKEMON_LIST_LIMIT))

async function getItems(page = 1) {
  const response = await getPokemons({
    offset: (page - 1) * POKEMON_LIST_LIMIT,
  })

  if (!response.isOk)
    return

  const { result } = response

  totalPokemons.value = result.count
  pokemons.value = result.results
}

function onPaginationChange(page: number) {
  getItems(page)
}

function onCreate() {
  getItems()
}

onCreate()
</script>

<template>
  <div
    class="ss-pokemons-viewer"
    test-id="pokemons-viewer"
  >
    <PokemonList :pokemons="pokemons" />

    <div class="ss-pokemons-viewer__pagination">
      <Pagination
        v-model="page"
        :length="paginationLength"
        name="pokemons-pagination"
        @change="onPaginationChange"
      />
    </div>
  </div>
</template>

<style lang="scss">
$gap: $input-gutter;
$pagination-height: 72px;

.ss-pokemons-viewer__cards {
  display: grid;
  overflow: auto;
  height: calc(100vh - (($gutter-page * 2) + $pagination-height + $page-navigation-height));
  align-content: start;
  gap: $gap;
  grid-template-columns: repeat(auto-fit, minmax(160px, auto));

  .ss-pokemon-card__img {
    display: flex;
    height: 160px;
    align-items: center;
    justify-content: center;
  }
}

.ss-pokemons-viewer__pagination {
  margin-top: $gap;
}

@include lg {
  .ss-pokemons-viewer__cards {
    height: calc(100vh - ($gutter-page-lg + $pagination-height + $page-navigation-height));
  }
}
</style>
