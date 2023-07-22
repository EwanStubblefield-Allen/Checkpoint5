<template>
  <div class="d-flex align-items-center">
    <router-link :to="{ name: 'Profile', params: { profileId: profileProp.id } }" class="position-relative p-3">
      <img class="account-pic position-relative" :src="profileProp.picture" :alt="profileProp.name">
      <i v-if="profileProp.graduated" class="d-flex justify-content-center align-items-center mdi mdi-account-school fs-2 gray icon-position"></i>
    </router-link>
    <div class="px-3">
      <p>{{ profileProp.class }}</p>
      <p class="fs-3 fw-bold">{{ profileProp.name }}</p>
    </div>
  </div>
</template>

<script>
import { Profile } from '../models/Profile.js'

export default {
  props: {
    profileProp: {
      type: Profile,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.account-pic {
  height: 80px;
  width: 80px;
  border: 3px solid #7EDACF;
  border-radius: 50%;
}
</style>