<script lang="ts" setup>
import type { State } from 'utils/configs'
import type { ComponentPublicInstance } from 'vue'
import { computed, defineAsyncComponent, ref } from 'vue'
import { capitalizeStr } from '~/utils/capitalizeString'

export interface AlertProps {
  state?: State
}

const props = defineProps<AlertProps>()

const Icon = ref<ComponentPublicInstance>()

const iconName = computed<string>(() => {
  const state: State = props.state || 'default'
  const iconsDic: Record<State, string> = {
    danger: 'x',
    warning: 'warning',
    success: 'success',
    info: 'info',
    default: 'message',
  }

  return iconsDic[state]
})

function setIcon() {
  const iconPathName = capitalizeStr(iconName.value)
  Icon.value = defineAsyncComponent(() => import(`../../icons/${iconPathName}Icon.vue`))
}

setIcon()
</script>

<template>
  <div
    class="ss-alert"
    :class="{
      'ss-alert--danger': props.state === 'danger',
      'ss-alert--warning': props.state === 'warning',
      'ss-alert--info': props.state === 'info',
      'ss-alert--success': props.state === 'success',
    }"
  >
    <div class="ss-alert__text">
      <span class="ss-alert__icon">
        <Icon />
      </span>
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
$color-default: $color-gray-3;

.ss-alert {
  display: flex;
  padding: $spacing-7 $spacing-8 $spacing-7 $spacing-7;
  border-radius: $border-radius-base;
  border-left: $spacing-3 solid $color-default;
  background-color: $color-gray-9;
  color: $color-text;
  font-size: $font-size-default;
  transition: $transition-base;
}

.ss-alert__icon {
  position: relative;
  bottom: -$spacing-2;
  display: inline-flex;
  width: $spacing-7;
  height: $spacing-7;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-right: $spacing-5;
  color: $color-default;
  font-size: $font-size-default;
  font-size: $font-size-md;
  line-height: 1;
}

.ss-alert--danger {
  border-left-color: $color-danger;

  .ss-alert__icon {
    background-color: $color-danger;
    color: $color-white;
    font-size: $font-size-default;
  }
}

.ss-alert--success {
  border-left-color: $color-success;

  .ss-alert__icon {
    background-color: $color-success;
    color: $color-white;
    font-size: $font-size-default;
  }
}

.ss-alert--warning {
  border-left-color: $color-warning;

  .ss-alert__icon {
    color: $color-warning;
  }
}

.ss-alert--info {
  border-left-color: $color-info;

  .ss-alert__icon {
    color: $color-info;
  }
}
</style>
