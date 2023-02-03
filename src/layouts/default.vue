<script lang="ts" setup>
import { isUserLoggedIn } from '~/composables/loggedUser'
import { ViewPath } from '~/configs/ViewPath'

const router = useRouter()

if (!isUserLoggedIn.value)
  router.push(ViewPath.LOGIN)
</script>

<template>
  <main>
    <AppContainer>
      <template v-if="isUserLoggedIn">
        <RouterView />
      </template>
    </AppContainer>
  </main>
</template>
