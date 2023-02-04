<script lang="ts" setup>
import Button from '../Button/Button.vue'

export interface PaginationProps {
  modelValue: number
  name: string
  length: number
  requiresLoadMore?: boolean
  isLoadingMore?: boolean
}

const props = defineProps<PaginationProps>()

const emit = defineEmits<{
  (event: 'update:model-value', value: number): void
  (event: 'change', value: number): void
  (event: 'load-more'): void
}>()

function onChange(event: Event) {
  const target = event.target as HTMLInputElement
  const page = parseInt(target.value)
  emit('update:model-value', page)
  emit('change', page)
}

function pageIsActive(page: number): boolean {
  return props.modelValue === page
}

function onLoadMore() {
  emit('load-more')
}
</script>

<template>
  <div class="ss-pagination">
    <label
      v-for="page in length"
      :key="page"
      :class="{ 'ss-pagination__page--active': pageIsActive(page) }"
      class="ss-pagination__page"
    >
      {{ page }}
      <input
        :value="page"
        :name="name"
        :checked="pageIsActive(page)"
        class="ss-pagination__input"
        type="radio"
        @change="onChange"
      >
    </label>

    <Button
      v-if="requiresLoadMore"
      test-id="load-more"
      :is-loading="props.isLoadingMore"
      design="secondary"
      size="sm"
      icon="plus"
      @click="onLoadMore"
    />
  </div>
</template>

<style lang="scss">
$gutter: $spacing-2;

.ss-pagination {
  display: inline-flex;
  max-width: 100%;
  align-items: center;
  justify-content: flex-start;
  margin: 0 (-$gutter);
  overflow-y: auto;
}

.ss-pagination__page {
  display: flex;
  min-width: $input-height-sm;
  height: $input-height-sm;
  align-items: center;
  justify-content: center;
  padding: $spacing-5 $spacing-4;
  border: $border-base;
  border-color: transparent;
  border-radius: $border-radius-base;
  margin: 0 $gutter;
  cursor: pointer;
  transition: $transition-base;
  user-select: none;
  white-space: nowrap;

  &:hover {
    background-color: $color-white;
  }
}

.ss-pagination__page--active {
  background-color: $color-secondary;
  pointer-events: none;
}

.ss-pagination__input {
  display: none;
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
}
</style>
