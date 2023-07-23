<template>
  <div v-if="account.id">
    <PostForm />
  </div>
  <div v-for="p in posts" :key="p.id" class="my-3 elevation-4">
    <PostCard :postProp="p" />
  </div>
  <PageNav pageProp="home" />
</template>

<script>
import { computed, onMounted, onUnmounted, watchEffect } from 'vue';
import { postsService } from '../services/PostsService.js';
import { AppState } from '../AppState.js';
import { useRoute, useRouter } from 'vue-router';
import PostForm from '../components/PostForm.vue';
import PostCard from '../components/PostCard.vue';
import PageNav from '../components/PageNav.vue';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()

    onMounted(() => {
      let page = route.query.page
      if (!page || page < 1) {
        router.push({ name: 'Home', query: { page: 1 } })
        page = 1
      }
      getPosts(page);
    })

    onUnmounted(() => {
      postsService.resetVariables()
    })

    watchEffect(() => {
      if (AppState.account.id) {
        getPosts(route.query.page)
      }
    })

    async function getPosts(page) {
      try {
        await postsService.getPosts(page, 0);
      }
      catch (error) {
        Pop.error(error.message, "[GETTING POSTS]");
      }
    }

    return {
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account)
    };
  },
  components: { PostCard, PageNav, PostForm }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
