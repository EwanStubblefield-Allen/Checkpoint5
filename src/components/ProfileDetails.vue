<template>
  <div v-if="profile" class="my-3 elevation-4 p-0">
    <div class="position-relative">
      <img class="large-img position-relative" :src="profile.coverImg" alt="">
      <div class="pic-position">
        <img class="account-pic position-relative" :src="profile.picture" :alt="profile.name">
        <i v-if="profile.graduated" class="d-flex justify-content-center align-items-center mdi mdi-account-school fs-2 gray icon-position"></i>
      </div>
    </div>
    <div class="d-flex justify-content-end px-3">
      <div class="d-flex fs-1">
        <a v-if="profile.github" class="mdi mdi-github px-2 text-dark" :href="profile.github"></a>
        <a v-if="profile.linkedin" class="mdi mdi-linkedin px-2 text-dark" :href="profile.linkedin"></a>
        <a v-if="profile.resume" class="mdi mdi-file-account px-2 text-dark" :href="profile.resume"></a>
      </div>
    </div>
    <div class="py-3 px-4">
      <p class="fs-4">{{ profile.class }}</p>
      <p class="fs-1 fw-bold">{{ profile.name }}</p>
      <p class="gray">{{ profile.bio }}</p>
    </div>
    <div v-if="account.id == profile.id" class="text-end py-3 px-4">
      <button class="px-3 fs-5">Edit</button>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState.js'
import { computed, onMounted } from 'vue'

export default {
  setup() {
    onMounted(() => { })

    return {
      account: computed(() => AppState.account),
      profile: computed(() => AppState.activeProfile),
    }
  }
}
</script>

<style lang="scss" scoped>
.account-pic {
  height: 130px;
  width: 130px;
  border: 3px solid #7EDACF;
  border-radius: 50%;
}

.pic-position {
  position: absolute;
  bottom: -65px;
}
</style>