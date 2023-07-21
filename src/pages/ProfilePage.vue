<template>
  <div v-if="profile" class="my-3 elevation-4 p-0">
    <img class="large-img" :src="profile.coverImg" alt="">
    <div class="d-flex justify-content-between px-3">
      <div class="d-flex align-items-end">
        <img class="account-pic pic-position" :src="profile.picture" :alt="profile.name">
        <i v-if="profile.graduated" class="mdi mdi-account-school px-2 fs-1 bg-white gray rounded-circle"></i>
      </div>
      <div class="d-flex fs-1">
        <a v-if="profile.github" class="mdi mdi-github px-2 text-dark" :href="profile.github"></a>
        <a v-if="profile.linkedin" class="mdi mdi-linkedin px-2 text-dark" :href="profile.linkedin"></a>
        <a v-if="profile.resume" class="mdi mdi-file-account px-2 text-dark" :href="profile.resume"></a>
      </div>
    </div>
    <div class="py-3 px-4">
      <p class="fs-3">{{ profile.class }}</p>
      <p class="fs-1 fw-bold">{{ profile.name }}</p>
      <p class="gray">{{ profile.bio }}</p>
    </div>
    <div v-if="account.id == profile.id" class="text-end py-3 px-4">
      <button class="px-3 fs-5">Edit</button>
    </div>
  </div>
  <div v-for="p in posts" :key="p.id" class="col-12 my-3 elevation-4">
    <PostCard :postProp="p" />
  </div>
  <PageNav pageProp="profile" />
</template>

<script>
import { useRoute } from 'vue-router'
import { AppState } from '../AppState.js'
import { computed, onMounted, onUnmounted } from 'vue'
import { profilesService } from '../services/ProfilesService.js'
import { postsService } from '../services/PostsService.js'
import Pop from '../utils/Pop.js'

export default {
  setup() {
    const route = useRoute()

    onMounted(() => {
      document.documentElement.scrollTop = 0
      getProfileById()
      getPostsByProfileId()
    })

    onUnmounted(() => {
      postsService.resetVariables()
    })

    async function getProfileById() {
      try {
        await profilesService.getProfileById(route.params.profileId)
      } catch (error) {
        Pop.error(error.message, '[GETTING PROFILE BY ID]')
      }
    }

    async function getPostsByProfileId() {
      try {
        await postsService.getPostsByProfileId(route.query.page, null, route.params.profileId)
      } catch (error) {
        Pop.error(error.message, '[GETTING POSTS BY PROFILE ID]')
      }
    }

    return {
      account: computed(() => AppState.account),
      profile: computed(() => AppState.activeProfile),
      posts: computed(() => AppState.posts)
    }
  }
}
</script>

<style lang="scss" scoped>
// @media (min-width: 768px) {
//   .pic-position {
//     // FIXME Get positioning of account
//     position: absolute;
//     top: ;
//     right: 50%;
//   }
// }

button {
  background: none;
  border-radius: 5px;
  border: 1px solid #7EDACF;
  color: #7EDACF;
}
</style>