<script lang="ts" setup>
import Spinner from '../Spinner/Spinner.vue'

interface LoaderProps {
  isInline?: boolean
}

const props = defineProps<LoaderProps>()
</script>

<template>
  <div
    class="ss-loader"
    :class="{
      'ss-loader--inline': props.isInline,
    }"
  >
    <div class="ss-loader__spinner">
      <Spinner />
    </div>
  </div>
</template>

<style lang="scss">
.ss-loader {
  position: relative;
  width: $input-height;
  height: $input-height;
  border-radius: $border-radius-base;
  background-color: $color-gray-9;
  color: $color-text;
  font-size: $spacing-8;

  * + & {
    margin: $input-gutter 0;
  }
}

.ss-loader__spinner {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.ss-loader--inline {
  display: inline-flex;
  width: $spacing-6;
  height: $spacing-6;
  padding: 0;
  margin: $spacing-2 $spacing-3;
  background-color: transparent;
  font-size: $font-size-default;
  vertical-align: top;

  &:first-child {
    margin-left: 0;
  }
}
</style>
