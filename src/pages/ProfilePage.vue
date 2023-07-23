<template>
  <ProfileDetails v-if="route.query.page == 1 || !route.query.page" />
  <div v-if="profile">
    <PostForm v-if="profile.id == account.id" />
  </div>
  <div v-for="p in posts" :key="p.id" class="my-3 elevation-4">
    <PostCard :postProp="p" />
  </div>
  <PageNav pageProp="profile" />
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { AppState } from '../AppState.js'
import { computed, onMounted, onUnmounted, watchEffect } from 'vue'
import { profilesService } from '../services/ProfilesService.js'
import { postsService } from '../services/PostsService.js'
import ProfileDetails from '../components/ProfileDetails.vue'
import PostForm from '../components/PostForm.vue'
import Pop from '../utils/Pop.js'

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    onMounted(() => {
      let page = route.query.page
      if (!page || page < 1) {
        router.push({ name: 'Profile', query: { page: 1 } })
        page = 1
      }
      document.documentElement.scrollTop = 0;
      getProfileById();
      getPostsByProfileId();
    })

    onUnmounted(() => {
      postsService.resetVariables();
    })

    watchEffect(() => {
      if (AppState.account.id) {
        getPostsByProfileId()
      }
    })


    async function getProfileById() {
      try {
        await profilesService.getProfileById(route.params.profileId);
      }
      catch (error) {
        Pop.error(error.message, "[GETTING PROFILE BY ID]");
      }
    }

    async function getPostsByProfileId() {
      try {
        await postsService.getPostsByProfileId(route.query.page, 0, route.params.profileId);
      }
      catch (error) {
        Pop.error(error.message, "[GETTING POSTS BY PROFILE ID]");
      }
    }

    return {
      route,
      posts: computed(() => AppState.posts),
      profile: computed(() => AppState.activeProfile),
      account: computed(() => AppState.account)
    };
  },
  components: { ProfileDetails, PostForm }
}
</script>

<style lang="scss" scoped>
button {
  background: none;
  border-radius: 5px;
  border: 1px solid #7EDACF;
  color: #7EDACF;
}
</style>