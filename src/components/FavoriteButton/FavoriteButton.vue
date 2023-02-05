<script lang="ts" setup>
interface FavoriteButtonProps {
  isActive?: boolean
}

const props = defineProps<FavoriteButtonProps>()
</script>

<template>
  <Button
    class="ss-favorite-button"
    :class="{
      'ss-favorite-button--active': props.isActive,
    }"
    icon="heart"
    design="secondary"
    size="sm"
    test-id="favorite"
  />
</template>

<style lang="scss">
.ss-favorite-button--active {
  path {
    fill: $color-danger;
    stroke: $color-danger;
  }
}
</style>
