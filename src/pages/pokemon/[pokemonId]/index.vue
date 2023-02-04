<script lang="ts" setup>
const route = useRoute()
</script>

<template>
  <div>
    {{ route.params.pokemonId }}
  </div>
</template>
