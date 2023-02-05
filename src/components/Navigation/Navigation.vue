<script lang="ts" setup>
interface Link {
  text: string
  path: string
  icon: string
}

interface NavigationProps {
  links: Link[]
}

withDefaults(defineProps<NavigationProps>(), {
  links: () => [],
})
</script>

<template>
  <nav
    class="ss-navigation"
    test-id="navigation"
  >
    <div class="ss-navigation__background" />

    <Button
      v-for="link in links"
      :key="link.path"
      :test-id="link.text.toLowerCase()"
      :to="link.path"
      :icon="link.icon"
      design="secondary"
      type="router-link"
    >
      {{ link.text }}
    </Button>
  </nav>
</template>

<style lang="scss">
.ss-navigation {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  height: $page-navigation-height;
  align-items: center;
  justify-content: center;
  padding: 0 $input-padding;
  gap: $input-padding;

  &:hover {
    .ss-navigation__background {
      opacity: $opacity-dark;
    }
  }
}

.ss-navigation__background {
  position: absolute;
  z-index: -1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: $color-paper-2;
  transition: $transition-base;
}
</style>
