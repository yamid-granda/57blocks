<script lang="ts" setup></script>

<template>
  <div class="ss-card">
    <slot />
  </div>
</template>

<style lang="scss">
.ss-card {
  flex-grow: 1;
  padding: $input-padding;
  border-radius: $border-radius-base;
  background-color: $color-paper-2;
  color: $color-text;
  transition: $transition-base;

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    &:last-child {
      margin-bottom: 0;
    }
  }

  & + & {
    margin-top: $input-padding;
  }
}
</style>
