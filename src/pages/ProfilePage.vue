<template>
  <ProfileDetails />
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
import ProfileDetails from '../components/ProfileDetails.vue'
import Pop from '../utils/Pop.js'

export default {
  setup() {
    const route = useRoute();

    onMounted(() => {
      document.documentElement.scrollTop = 0;
      getProfileById();
      getPostsByProfileId();
    })

    onUnmounted(() => {
      postsService.resetVariables();
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
        await postsService.getPostsByProfileId(route.query.page, null, route.params.profileId);
      }
      catch (error) {
        Pop.error(error.message, "[GETTING POSTS BY PROFILE ID]");
      }
    }

    return {
      posts: computed(() => AppState.posts)
    };
  },
  components: { ProfileDetails }
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