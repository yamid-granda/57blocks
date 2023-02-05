<script lang="ts" setup>
import { getPokemonById } from '../../services/http/pokemon'
import type { PokemonDetail } from '../../types'
import toggleFavoritePokemon from '../../utils/toggleFavoritePokemon'
import PokemonImg from '../PokemonImg/PokemonImg.vue'

interface PokemonDetailProps {
  id: string
}

const { t } = useI18n()

const props = defineProps<PokemonDetailProps>()

const pokemon = ref<PokemonDetail>({ id: '', name: '', abilities: [], isFavorite: false })
const isLoadingPokemon = ref<boolean>(false)

async function getPokemon() {
  isLoadingPokemon.value = true
  const response = await getPokemonById(props.id)

  if (!response.isOk) {
    isLoadingPokemon.value = false
    return
  }

  pokemon.value = response.result
  isLoadingPokemon.value = false
}

function onFavoriteClick() {
  toggleFavoritePokemon(pokemon.value)
}

function onCreate() {
  getPokemon()
}

onCreate()
</script>

<template>
  <div
    class="ss-pokemon-detail"
    test-id="pokemon-details"
  >
    <template v-if="isLoadingPokemon">
      <Loader />
    </template>

    <template v-else>
      <Card>
        <h1 class="ss-pokemon-detail__title">
          {{ pokemon.id }}  {{ pokemon.name }}
        </h1>

        <div class="ss-pokemon-detail__img">
          <PokemonImg :pokemon="pokemon" />
        </div>

        <h2 class="ss-pokemon-detail__abilities-title">
          {{ t('Abilities') }}

          <FavoriteButton
            :is-active="pokemon.isFavorite"
            @click="onFavoriteClick"
          />
        </h2>

        <ul>
          <li
            v-for="(ability, index) in pokemon.abilities"
            :key="index"
          >
            {{ ability.ability.name }}
          </li>
        </ul>
      </Card>
    </template>
  </div>
</template>

<style lang="scss">
.ss-pokemon-detail {
  max-width: 320px;
  margin: 0 auto;
}

.ss-pokemon-detail__abilities-title {
  display: flex;
  justify-content: space-between;
}

.ss-pokemon-detail__title {
  text-transform: capitalize;
}

.ss-pokemon-detail__img {
  height: 272px;
  padding: $input-gutter;
}
</style>
