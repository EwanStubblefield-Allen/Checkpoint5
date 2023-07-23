<template>
  <div v-if="account.id" class="p-3 elevation-4 profile-card sticky-top">
    <router-link :to="{ name: 'Profile', params: { profileId: account.id } }" @click="setActiveProfile()" class=" d-flex justify-content-center position-relative my-3">
      <img class="account-pic position-relative" :src="account.picture" :alt="account.name">
      <i v-if="account.graduated" class="d-flex justify-content-center align-items-center mdi mdi-account-school fs-2 gray icon-position"></i>
    </router-link>
    <div class="py-2">
      <small class="gray">{{ account.class }}</small>
      <p class="fs-4 fw-bold text-break">{{ account.name }}</p>
    </div>
    <div v-if="account.github" class="d-flex align-items-center py-2">
      <a class="mdi mdi-github fs-2 pe-2 text-dark" :href="account.github"></a>
      <p class="text-break">{{ account.github }}</p>
    </div>
    <div v-if="account.linkedin" class="d-flex align-items-center py-2">
      <a class="mdi mdi-linkedin fs-2 pe-2 text-dark" :href="account.linkedin"></a>
      <p class="text-break">{{ account.linkedin }}</p>
    </div>
    <div v-if="account.resume" class="d-flex align-items-center py-2">
      <a class="mdi mdi-file-account fs-2 pe-2 text-dark" :href="account.resume"></a>
      <p class="text-break">{{ account.resume }}</p>
    </div>
  </div>
  <div v-else class="d-flex align-items-center p-3 elevation-4 profile-card">
    <p class="text-break">Log in to see details</p>
  </div>
</template>

<script>
import { AppState } from '../AppState.js'
import { computed } from 'vue'
import { profilesService } from '../services/ProfilesService.js';
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    async function getProfileById(profileId) {
      try {
        await profilesService.getProfileById(profileId);
      }
      catch (error) {
        Pop.error(error.message, "[GETTING PROFILE BY ID]");
      }
    }

    async function getPostsByProfileId(profileId) {
      try {
        await postsService.getPostsByProfileId(1, 0, profileId);
      }
      catch (error) {
        Pop.error(error.message, "[GETTING POSTS BY PROFILE ID]");
      }
    }

    return {
      account: computed(() => AppState.account),

      setActiveProfile() {
        document.documentElement.scrollTop = 0;
        getProfileById(this.account.id);
        getPostsByProfileId(this.account.id);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-card {
  height: 90vh;
}

.account-pic {
  height: 10vw;
  width: 10vw;
  border: 3px solid #7EDACF;
  border-radius: 50%;
  margin-top: 50px;
}

.icon-position {
  height: 37px;
  width: 37px;
  background-color: white;
  border: 1px solid #7EDACF;
  border-radius: 50%;
  position: absolute;
  left: 8vw;
  bottom: 0;
}
</style>