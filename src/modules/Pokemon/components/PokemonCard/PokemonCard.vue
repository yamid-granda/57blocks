<script lang="ts" setup>
import type { Pokemon } from '../../types'
import PokemonImg from '../PokemonImg/PokemonImg.vue'

interface PokemonCardProps {
  pokemon: Pokemon
}

const props = defineProps<PokemonCardProps>()

const emit = defineEmits<{
  (event: 'favorite', value: Pokemon): void
}>()

function onFavoriteClick() {
  emit('favorite', props.pokemon)
}
</script>

<template>
  <div
    class="ss-pokemon-card"
    :class="{
      'ss-pokemon-card--favorite': pokemon.isFavorite,
    }"
    test-id="pokemon-card"
  >
    <Card>
      <div class="ss-pokemon-card__name">
        {{ pokemon.id }}
        {{ pokemon.name }}
      </div>

      <div class="ss-pokemon-card__img">
        <PokemonImg :pokemon="pokemon" />
      </div>

      <div class="ss-pokemon-card__actions">
        <FavoriteButton
          :is-active="pokemon.isFavorite"
          @click.prevent="onFavoriteClick"
        />
      </div>
    </Card>
  </div>
</template>

<style lang="scss">
.ss-pokemon-card {
  &:hover {
    .ss-card {
      background-color: $color-paper-1;
    }
  }
}

.ss-pokemon-card__img {
  width: 116px;
  height: 160px;

  img {
    max-height: 320px;
  }
}

.ss-pokemon-card__actions {
  display: flex;
  justify-content: flex-end;
}

.ss-pokemon-card__name {
  font-weight: $bold;
  text-transform: capitalize;
}
</style>
