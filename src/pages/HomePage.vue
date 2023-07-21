<template>
  <div v-for="p in posts" :key="p.id" class="my-3 elevation-4">
    <PostCard :postProp="p" />
  </div>
  <PageNav pageProp="home" />
</template>

<script>
import { computed, onMounted, onUnmounted } from 'vue';
import PostCard from '../components/PostCard.vue';
import PageNav from '../components/PageNav.vue';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
import { AppState } from '../AppState.js';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute()

    onMounted(() => {
      getPosts();
    })

    onUnmounted(() => {
      postsService.resetVariables()
    })

    async function getPosts() {
      try {
        await postsService.getPosts(route.query.page);
      }
      catch (error) {
        Pop.error(error.message, "[GETTING POSTS]");
      }
    }

    return {
      posts: computed(() => AppState.posts),
    };
  },
  components: { PostCard, PageNav }
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
