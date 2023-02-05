<script lang="ts" setup>
import PokemonDetail from '~/modules/Pokemon/components/PokemonDetail/PokemonDetail.vue'

const route = useRoute()

const pokemonId = route.params.pokemonId as string
</script>

<template>
  <div class="ss-pokemon-detail-page">
    <PokemonDetail :id="pokemonId" />
  </div>
</template>
