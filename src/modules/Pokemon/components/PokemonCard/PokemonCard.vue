<script lang="ts" setup>
import type { Pokemon } from '../../types'

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
      <div class="ss-pokemon-card__img">
        <img
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemon.id}.png`"
          :alt="pokemon.name"
          onerror="this.src='https://www.svgrepo.com/show/276264/pokeball-pokemon.svg'"
        >
      </div>

      <div class="ss-pokemon-card__info">
        <div class="ss-pokemon-card__name">
          {{ pokemon.id }}
          {{ pokemon.name }}
        </div>

        <div class="ss-pokemon-card__actions">
          <Button
            class="ss-pokemon-card__favorite"
            icon="heart"
            design="secondary"
            size="sm"
            test-id="favorite"
            @click="onFavoriteClick"
          />
        </div>
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

.ss-pokemon-card__info {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding-top: $spacing-6;
  border-top: $border-base;
  margin-top: $spacing-4;
}

.ss-pokemon-card__name {
  text-transform: capitalize;
}

.ss-pokemon-card--favorite {
  .ss-pokemon-card__favorite {
    path {
      fill: $color-danger;
      stroke: $color-danger;
    }
  }
}

.ss-pokemon-card__actions {
  margin-left: $spacing-3;
}
</style>
