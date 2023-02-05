<script lang="ts" setup></script>

<template>
  <div class="ss-app-container">
    <slot>
      <RouterView v-slot="{ Component }">
        <transition
          mode="out-in"
          enter-from-class="ss-app-container__transition"
          leave-to-class="ss-app-container__transition"
          enter-active-class="ss-app-container__transition-active"
          leave-active-class="ss-app-container__transition-active"
        >
          <component :is="Component" />
        </transition>
      </RouterView>
    </slot>

    <PageNotifications />
  </div>
</template>

<style lang="scss">
.ss-app-container {
  padding: $gutter-page;
}

.ss-app-container__transition {
  filter: blur($spacing-4) sepia(1);
  opacity: 0;
  transform: scale(50%);
}

.ss-app-container__transition-active {
  transition: $transition-base;
  transition-duration: 0.25s;
}

@include lg {
  .ss-app-container {
    padding: $gutter-page-lg;
    border-bottom-width: 0;
  }
}
</style>
