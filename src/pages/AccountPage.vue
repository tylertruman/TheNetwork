<template>
  <div class="about text-center">
    <img class="cover-img" :src="account.coverImg" height=200>
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded profile-img" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Account',
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
.profile-img {
  max-width: 100px;
}

.cover-img {
  width: 100%;
  background-position: center;
  object-fit: cover;
}
</style>
