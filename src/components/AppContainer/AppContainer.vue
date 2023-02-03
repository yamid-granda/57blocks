<script lang="ts" setup></script>

<template>
  <div class="ss-app-container">
    <slot />

    <PageNotifications />
  </div>
</template>

<style lang="scss">
.ss-app-container {
  padding: $spacing-6 $gutter-page $gutter-page;
}

@include lg {
  .ss-app-container {
    padding: $gutter-page-lg;
    border-bottom-width: 0;
  }
}
</style>
