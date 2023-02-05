<script lang="ts" setup>
import { POKEMON_LIST_LIMIT } from '../../configs'
import { getPokemons, getPokemonsByText } from '../../services/http/pokemon'
import type { Pokemon } from '../../types'
import PokemonList from '../PokemonList/PokemonList.vue'

const { t } = useI18n()

const pokemons = ref<Pokemon[]>([])
const page = ref<number>(1)
const totalPokemons = ref<number>(0)
const searchText = ref<string>('')

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

async function onSearchPokemons() {
  const text = searchText.value.toLowerCase()

  if (!text) {
    getItems()
    return
  }

  const response = await getPokemonsByText(text)

  if (!response.isOk)
    return

  pokemons.value = response.result
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
    <div class="ss-pokemons-viewer__search">
      <Input
        v-model="searchText"
        :label="t('$components.PokemonsViewer.searchByName')"
        prepend-icon="search"
        name="search-pokemon-by-name"
        @input="onSearchPokemons"
      />
    </div>

    <PokemonList :pokemons="pokemons" />

    <div class="ss-pokemons-viewer__pagination">
      <AppWrap>
        <Pagination
          v-model="page"
          :length="paginationLength"
          name="pokemons-pagination"
          @change="onPaginationChange"
        />
      </AppWrap>
    </div>
  </div>
</template>

<style lang="scss">
$gap: $input-gutter;
$pagination-height: 72px;

.ss-pokemons-viewer__search {
  margin-bottom: $input-gutter;
}

.ss-pokemons-viewer__pagination {
  position: fixed;
  bottom: $page-navigation-height;
  left: 0;
  width: 100%;
  padding: $spacing-4 0 $spacing-3;
  background-color: $color-paper-3;
}
</style>
