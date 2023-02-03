<script lang="ts" setup>
import Alert from '~/components/Alert/Alert.vue'
import { pageNotifications } from '~/composables/pageNotifications'

const onClickNotification = (index: number) => {
  pageNotifications.value.splice(index, 1)
}
</script>

<template>
  <div class="ss-page-notifications">
    <transition-group name="ss-page-notification-">
      <div
        v-for="(notification, index) in pageNotifications"
        :key="notification.id"
        class="ss-page-notification"
      >
        <div class="ss-page-notification__alert">
          <Alert
            :state="notification.type"
            @click="onClickNotification(index)"
            @touchcancel="onClickNotification(index)"
          >
            {{ notification.message }}
          </Alert>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<style lang="scss">
.ss-page-notifications {
  position: fixed;
  z-index: $z-index-notification;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: $width-mobile-l;
  pointer-events: none;

  .ss-alert {
    box-shadow: $box-shadow-base;
    cursor: pointer;
    pointer-events: all;
  }
}

.ss-page-notification {
  display: flex;
  max-height: 90vh;
  justify-content: flex-end;
  transition: $transition-base;
}

.ss-page-notification__alert {
  margin: 0 $spacing-6 $spacing-6;
}

.ss-page-notification--enter-active,
.ss-page-notification--leave-active {
  opacity: 0.666;
}

.ss-page-notification--enter-active {
  height: auto;
}

.ss-page-notification--leave-active {
  height: 0;
}

.ss-page-notification--enter-from,
.ss-page-notification--leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
